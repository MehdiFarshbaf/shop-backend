import Role from "../models/Role.js";
import { sendErrorResponse } from "../helper/responses.js";

export const getAllRole = async (req, res, next) => {
    try {
        // const roles = await Role.find({ "name": { $ne: 'super admin' } })
        const roles = await Role.find()
        res.status(200).json({
            success: true,
            roles,
            total: roles.length
        })
    } catch (err) {
        next(err)
    }
}
export const createRole = async (req, res, next) => {
    const { name, permissions } = req.body
    try {

        const exsitRole = await Role.findOne({ name })
        console.log(exsitRole);
        if (!exsitRole) {
            const role = await Role.create({ name, permissions })
            res.json({
                success: true,
                message: `نقش ${name} با موفقیت ایجاد شد.`,
                role
            })
        } else {
            sendErrorResponse(`نقشی با نام ${name} موجود است.`, 422)
        }

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

        const existRole = await Role.findById(req.params.id)

        if (!existRole) sendErrorResponse("نقشی با این شناسه یافت نشد.", 404)
        if (existRole.key == "super_admin") sendErrorResponse("امکان حذف نقش سوپر ادمین نیست", 403)

        const role = await Role.findByIdAndDelete(req.params.id)

        res.json({
            success: true,
            message: `نقش ${role.name} با موفقیت حذف شد.`
        })
    } catch (err) {
        next(err)
    }
}