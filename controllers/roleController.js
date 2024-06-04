import Role from "../models/Role.js";
import {sendErrorResponse} from "../helper/responses.js";

export const getAllRole = async (req, res, next) => {
    try {
        const roles = await Role.find()
        res.status(200).json({
            success: true,
            roles
        })
    } catch (err) {
        next(err)
    }
}
export const createRole = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: "create role"
        })
    } catch (err) {
        next(err)
    }
}
export const getRoleById = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id)
        if (!role) sendErrorResponse("نقشی با این شناسه یافت نشد.", 404)
        res.status(200).json({
            success: true,
            role
        })
    } catch (err) {
        next(err)
    }
}
export const updateRole = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: "update role"
        })
    } catch (err) {
        next(err)
    }
}
export const deleteRole = async (req, res, next) => {
    try {
        res.json({
            success: true,
            message: "delete role"
        })
    } catch (err) {
        next(err)
    }
}