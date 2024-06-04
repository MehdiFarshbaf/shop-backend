import Permission from "../models/Permission.js";

export const getAllPermissions = async (req, res, next) => {
    try {
        const permissions = await Permission.find()
        res.status(200).json({
            success: true,
            total: permissions.length,
            permissions
        })
    } catch (err) {
        next(err)
    }
}