import User from "../models/User.js";
import { comparePassword, hashed } from "../helper/authHelper.js";
import { sendErrorResponse } from "../helper/responses.js";
import jwt from 'jsonwebtoken'

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password")

        res.json({
            success: true,
            users,
            total: users.length
        })

    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password")

        if (!user) sendErrorResponse("کاربری با این شناسه یافت نشد.", 404)
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        next(err)
    }
}

export const registerUser = async (req, res, next) => {
    const { firstName, lastName, email, username, password, mobile, address } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (existUser) sendErrorResponse("کاربری با این ایمیل قبلا ثبت نام کرده است.", 422)

        const hashedPassword = await hashed(password)
        await User.create({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            mobile,
            address
        })
        res.status(201).json({
            success: true,
            message: "ثبت نام موفقیت آمیز بود.",
        })
    } catch (err) {
        next(err)
    }

}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) sendErrorResponse("کاربری با این ایمیل یافت نشد.", 404)

        const match = await comparePassword(password, user.password)
        if (!match) sendErrorResponse("گذرواژه اشتباه است.", 401)

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_USER, {
            expiresIn: "7d"
        })
        res.status(200).json({
            success: true,
            message: "خوش آمدید.",
            token,
            profile: {
                id: user._id,
                fullname: user.fullname,
                firstName: user.firstName,
                lastName: user.lastName,
                mobile: user.mobile,
                address: user.address,
                isAdmin: user.isAdmin
            }
        })
    } catch (err) {
        next(err)
    }
}

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select(["-password"])
        res.status(200).json({
            profile: user
        })
    } catch (err) {
        next(err)
    }
}

export const forgetPassword = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) sendErrorResponse("کاربری با این ایمیل یافت نشد.", 404)
        const hashedPassword = await hashed(password)
        await User.findByIdAndUpdate(user._id, { password: hashedPassword })
        res.status(200).json({
            success: true,
            message: "گذرواژه با موفقیت تغییر کرد."
        })
    } catch (err) {
        next(err)
    }
}

export const updateProfile = async (req, res, next) => {
    const { firstName, lastName, username, address, email, mobile } = req.body
    try {
        const profile = await User.findByIdAndUpdate(req.userId, {
            firstName,
            lastName,
            username,
            address,
            email,
            mobile
        }, { new: true }).select(["-password"])
        res.status(200).json({
            success: true,
            message: "پروفایل با موفقیت ویرایش شد.",
            profile
        })
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) sendErrorResponse("کاربری با این شناسه یافت نشد.", 404)

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: `${user.fullname} با موفقیت حذف شد.`
        })
    } catch (err) {
        next(err)
    }
}