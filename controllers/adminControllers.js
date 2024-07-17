import Admin from "../models/Admin.js";
import fs from 'fs'
import * as path from 'path'
import { sendErrorResponse } from "../helper/responses.js";
import { comparePassword, hashed } from "../helper/authHelper.js";
import jwt from "jsonwebtoken";
import { log } from "console";
import Role from "../models/Role.js";

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
    const { email, fullname, mobile, password, role } = req.body

    try {

        //check role
        const selectRole = await Role.findById(role)
        if (!selectRole) sendErrorResponse("شناسه دسته بندی نامعتبر است.", 422)

        const existAdmin = await Admin.findOne({ email })
        if (existAdmin) sendErrorResponse("مدیری با این ایمیل قبلا ثبت نام کرده است.", 422)

        const hashedPassword = await hashed(password)

        let fileName = ""
        let url = ""
        if (req.files != null) {
            const file = req.files.file
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            const dateNow = Math.round(Date.now())
            fileName = dateNow + ext
            const allowTypes = ['.jpg', '.jpeg', '.png']

            if (!allowTypes.includes(ext.toLowerCase())) sendErrorResponse("فرمت عکس مجاز نیست.", 422)
            if (fileSize > 2000000) sendErrorResponse("حجم تصویر نباید بیشتر از 2 مگابایت باشد.", 422)

            url = `${req.protocol}://${req.get("host")}/admin/${fileName}`

            await file.mv(`./public/admin/${fileName}`, async (err) => {

                if (err) {
                    res.status(422).json({
                        success: false,
                        message: err.message
                    })
                }
            })
        }

        const admin = await Admin.create({ email, password: hashedPassword, url, image: fileName, fullname, mobile, role: selectRole })
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
    const { email, fullname, mobile, role } = req.body
    try {

        // check role
        const selectRole = await Role.findById(role)
        if (!selectRole) sendErrorResponse("شناسه دسته بندی نامعتبر است.", 422)

        // check exit admin
        const existAdmin = await Admin.findById(req.params.id)
        if (!existAdmin) sendErrorResponse('مدیری با این شناسه یافت نشد.', 404)

        // update admin
        await Admin.findByIdAndUpdate(req.params.id, { email, fullname, mobile, role })

        res.status(200).json({
            success: true,
            message: 'ویرایش مدیر موفقیت آمیز بود.'
        })
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
                image: admin.url,
                role: admin.role,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt
            }
        })
    } catch (err) {
        next(err)
    }
}