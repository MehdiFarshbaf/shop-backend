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
    const { name, permissions } = req.body
    try {
        // check exist role
        const exsitRole = await Role.findById(req.params.id)

        if (!exsitRole) sendErrorResponse('نقشی با این شناسه یافت نشد.', 404)

        // check super admin role
        if (exsitRole.key === 'super_admin') sendErrorResponse("نقش ادمین اصلی غیر قابل ویرایش است.", 422)

        // update role
        const newRole = await Role.findByIdAndUpdate(req.params.id, { name, permissions }, { new: true })


        res.json({
            success: true,
            message: "ویرایش نقش موفقیت آمیز بود.",
            role: newRole
        })
    } catch (err) {
        next(err)
    }
}
export const deleteRole = async (req, res, next) => {
    try {
        // check role exist
        const existRole = await Role.findById(req.params.id).populate("admins")
        if (!existRole) sendErrorResponse("نقشی با این شناسه یافت نشد.", 404)

        // check super admin role
        if (existRole.key == "super_admin") sendErrorResponse("امکان حذف نقش سوپر ادمین نیست", 403)

        if (existRole.admins.length > 0) sendErrorResponse("تعدادی مدیران دارای این مجوز هستن", 422)

        // delete role
        const role = await Role.findByIdAndDelete(req.params.id)

        res.json({
            success: true,
            message: `نقش ${role.name} با موفقیت حذف شد.`,
        })
    } catch (err) {
        next(err)
    }
}

