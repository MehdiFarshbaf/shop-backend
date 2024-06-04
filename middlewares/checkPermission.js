import {sendErrorResponse} from "../helper/responses.js";

export const checkPermission = permission => async (req, res, next) => {
    try {
        const admin = req.admin
        const permissions = admin.role.permissions
        const result = await permissions.findIndex(p => p.key == permission)
        if (result < 0) {
            sendErrorResponse("شما مجوز این درخواست را ندارید.", 403)
        }
        next()
    } catch (err) {
        next(err)
    }

}