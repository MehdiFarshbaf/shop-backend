import mongoose from "mongoose";

export const checkIdFor = (idField, name) => async (req, res, next) => {
    try {
        const isValid = mongoose.Types.ObjectId.isValid(req.body[idField])
        if (!isValid) {
            const error = new Error(`شناسه برای ${name} معتبر نمی باشد.`)
            error.statusCode = 422
            throw error
        }
        next()
    } catch (err) {
        next(err)
    }


}