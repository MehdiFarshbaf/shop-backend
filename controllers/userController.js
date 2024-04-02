import User from "../models/User.js";
import {comparePassword, hashed} from "../helper/authHelper.js";
import {sendErrorResponse} from "../helper/responses.js";
import jwt from 'jsonwebtoken'

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password")
        res.json({
            success: true,
            users
        })
    } catch (err) {
        next(err)
    }
}

export const registerUser = async (req, res, next) => {
    const {firstName, lastName, email, username, password, mobile, address} = req.body
    try {
        const existUser = await User.findOne({email})
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
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) sendErrorResponse("کاربری با این ایمیل یافت نشد.", 404)

        const match = await comparePassword(password, user.password)
        if (!match) sendErrorResponse("گذرواژه اشتباه است.", 401)

        const token = await jwt.sign({}, process.env.JWT_SECRET, {
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