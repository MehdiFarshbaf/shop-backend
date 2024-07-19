import jwt from "jsonwebtoken";

// import models
import Role from "../models/Role.js";
import Admin from "../models/Admin.js";

// helpers
import { sendErrorResponse } from "../helper/responses.js";
import { comparePassword, createOTP, hashed } from "../helper/authHelper.js";
import { handleDeleteFile, storeImage } from "../helper/storeImage.js";
import { transporter } from "./sendEmail.js";



export const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find().populate("role").select(["-password"])

        res.status(200).json({
            success: true,
            admins,
            total: admins.length
        })
    } catch (err) {
        next(err)
    }
}

export const getAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id).populate("role").select(["-password"])
        if (!admin) sendErrorResponse("مدیری با این شناسه یافت نشد.", 404)
        res.status(200).json({
            success: true,
            admin
        })
    } catch (err) {
        next(err)
    }
}


export const createAdmin = async (req, res, next) => {
    const { email, fullname, mobile, password, role_id } = req.body

    try {

        //check role
        const selectRole = await Role.findById(role_id)
        if (!selectRole) sendErrorResponse("شناسه دسته بندی نامعتبر است.", 422)

        const existAdmin = await Admin.findOne({ email })
        if (existAdmin) sendErrorResponse("مدیری با این ایمیل قبلا ثبت نام کرده است.", 422)

        const hashedPassword = await hashed(password)

        const admin = await Admin.create({ email, password: hashedPassword, fullname, mobile, role_id })
        res.status(201).json({
            success: true,
            message: "مدیر جدید با موفقیت ایجاد شد."
        })
    } catch (err) {
        next(err)
    }
}
export const deleteAdmin = async (req, res, next) => {
    try {
        if (req.params.id == req.admin._id) {
            sendErrorResponse("شما نمیتوانید خودتان را حذف کنید.", 422)
        } else {
            const findAdmin = await Admin.findById(req.params.id).populate("role")
            if (!findAdmin) sendErrorResponse("مدیری با این شناسه یافت نشد.", 404)

            if (findAdmin.role.name === 'super admin') {
                const admins = await Admin.find().populate('role')
                const filterSuperAdmins = admins.filter(admin => admin.role.name === 'super admin')
                if (filterSuperAdmins.length > 1) {
                    const admin = await Admin.findByIdAndDelete(req.params.id)
                    res.status(200).json({
                        success: true,
                        message: `${admin.fullname} با موفقیت حذف شد.`
                    })
                } else {
                    sendErrorResponse("حداقل باید یک ادمین در سیستم باشد.", 422)
                }
            } else {
                const admin = await Admin.findByIdAndDelete(req.params.id)
                res.status(200).json({
                    success: true,
                    message: `${admin.fullname} با موفقیت حذف شد.`
                })
            }
        }

    } catch (err) {
        next(err)
    }
}
export const updateAdmin = async (req, res, next) => {
    const { email, fullname, mobile, role_id } = req.body
    try {
        if (req.params.id == req.admin._id) {
            sendErrorResponse("شما نمیتوانید خودتان را ویرایش کنید.", 422)
        } else {
            // check role
            const selectRole = await Role.findById(role_id)
            if (!selectRole) sendErrorResponse("شناسه دسته بندی نامعتبر است.", 422)

            // check exit admin
            const existAdmin = await Admin.findById(req.params.id)
            if (!existAdmin) sendErrorResponse('مدیری با این شناسه یافت نشد.', 404)

            // update admin
            await Admin.findByIdAndUpdate(req.params.id, { email, fullname, mobile, role_id })

            res.status(200).json({
                success: true,
                message: 'ویرایش مدیر موفقیت آمیز بود.'
            })
        }

    } catch (err) {
        next(err)
    }
}

export const loginAdmin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const admin = await Admin.findOne({ email }).populate("role")
        if (!admin) sendErrorResponse("مدیری با این ایمیل یافت نشد.", 404)

        const match = await comparePassword(password, admin.password)
        if (!match) sendErrorResponse("گذرواژه اشتباه است.", 401)

        const token = await jwt.sign({ adminId: admin._id, email: admin.email }, process.env.JWT_SECRET_ADMIN, {
            expiresIn: "7d"
        })

        res.json({
            success: true,
            message: `${admin.fullname} عزیز در نقش ${admin.role.name} وارد شده اید.`,
            token,
            profile: {
                id: admin._id,
                email: admin.email,
                fullname: admin.fullname,
                mobile: admin.mobile,
                image: admin.image,
                url: admin.url,
                role: admin.role,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt
            }
        })
    } catch (err) {
        next(err)
    }
}

export const updateProfileAdmin = async (req, res, next) => {
    try {
        const { fullname, email, mobile } = req.body
        const adminId = req.admin.id
        let fileName = ""
        let url = ""

        // find admin and check exist admin
        const existAmdin = await Admin.findById(adminId)
        if (!existAmdin) sendErrorResponse("مدیری با این شناسه یافت نشد.", 404)

        // check image
        if (req.files === null) {
            fileName = existAmdin.image
            url = existAmdin.url
        } else {
            await handleDeleteFile("admin", existAmdin.image)
            const { fileName: newFileName, url: newUrl } = await storeImage(req, res, next, "admin")
            fileName = newFileName
            url = newUrl
        }

        // update admin
        const admin = await Admin.findByIdAndUpdate(adminId, {
            fullname,
            email,
            mobile,
            url,
            image: fileName
        }, { new: true }).select(["-password"]).populate('role')

        res.status(200).json({
            success: true,
            message: 'ویرایش پروفایل موفقیت آمیز بود.',
            profile: admin
        })

    } catch (err) {
        next(err)
    }
}

export const changePasswordAdmin = async (req, res, next) => {
    try {
        const { password, newPassword } = req.body
        const adminId = req.admin.id

        // find admin and check exist admin
        const admin = await Admin.findById(adminId)
        if (!admin) sendErrorResponse("مدیری با این شناسه یافت نشد.", 404)

        // compare password
        const match = await comparePassword(password, admin.password)
        if (!match) sendErrorResponse("گذرواژه اشتباه است.", 401)

        // hash password
        const hashedPassword = await hashed(newPassword)

        // update password
        admin.password = hashedPassword
        admin.save()

        res.status(200).json({
            success: true,
            message: 'گذرواژه شما با موفقیت تغییر کرد.'
        })
    } catch (err) {
        next(err)
    }
}
export const forgotPasswordAdmin = async (req, res, next) => {
    const { email } = req.body
    try {
        // find admin and check exist admin
        const admin = await Admin.findOne({ email })
        if (!admin) sendErrorResponse("مدیری با این ایمیل یافت نشد.", 404)

        const otp = await createOTP()
        admin.otp = otp
        admin.passwordResetExpireOTP = Date.now() + 30 * 60 * 1000
        await admin.save()

        const resetUrl = `
        <p>کد زیر برای تغییر رمز عبور استفاده کنید</p>
        <p>${otp}</p>`
        const details = {
            from: "resetPassword@gmail.com",
            to: email,
            subject: "تغییر رمز عبور",
            "html": resetUrl
        }

        await transporter.sendMail(details)
        res.status(200).json({
            success: true,
            message: `کد ارسال شده به ایمیلتان را وارد کنید.`,

        })
    } catch (err) {
        next(err)
    }
}

export const resetPasswordAdmin = async (req, res, next) => {
    const { password, otp, email } = req.body

    try {
        const admin = await Admin.findOne({ email, passwordResetExpireOTP: { $gt: new Date() } })
        if (!admin) sendErrorResponse("jjjکد شما منقضی شده است.", 422)

        if (otp == admin.otp) {
            const hashPassword = await hashed(password)
            admin.password = hashPassword
            admin.otp = undefined
            admin.passwordResetExpireOTP = undefined
            await admin.save()

            res.json({
                success: true,
                message: "پسورد با موفقیت تغییر کرد."
            })

        } else {
            sendErrorResponse("کد وارد شده اشتباه است.", 422)
        }

    } catch (err) {
        next(err)
    }
}