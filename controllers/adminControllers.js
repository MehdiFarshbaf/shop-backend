import Admin from "../models/Admin.js";
import fs from 'fs'
import * as path from 'path'
import {sendErrorResponse} from "../helper/responses.js";
import {comparePassword, hashed} from "../helper/authHelper.js";
import jwt from "jsonwebtoken";

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
export const createAdmin = async (req, res, next) => {
    const {email, fullname, mobile, password} = req.body
    try {

        const existAdmin = await Admin.findOne({email})
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

        const admin = await Admin.create({email, password: hashedPassword, url, image: fileName, fullname, mobile})
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
        const findAdmin = await Admin.findById(req.params.id)
        if (!findAdmin) sendErrorResponse("مدیری با این شناسه یافت نشد.", 404)

        const admin = await Admin.findByIdAndDelete(req.params.id).select(["-password"])
        res.status(200).json({
            success: true,
            message: `${admin.fullname} با موفقیت حذف شد.`
        })
    } catch (err) {
        next(err)
    }
}
export const updateProfileAdmin = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: "update admin profile"
        })
    } catch (err) {
        next(err)
    }
}

export const loginAdmin = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const admin = await Admin.findOne({email}).populate("role")
        if (!admin) sendErrorResponse("مدیری با این ایمیل یافت نشد.", 404)

        const match = await comparePassword(password, admin.password)
        if (!match) sendErrorResponse("گذرواژه اشتباه است.", 401)

        const token = await jwt.sign({adminId: admin._id, email: admin.email}, process.env.JWT_SECRET_ADMIN, {
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