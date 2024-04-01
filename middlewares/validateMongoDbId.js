import mongoose from "mongoose";

export const validateMongoDbId = async (req, res, next) => {
    const {id} = req.params
    try {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) {
            const error = new Error("شناسه معتبر نمی باشد.")
            error.statusCode = 422
            throw error
        }
        next()
    } catch (err) {
        next(err)
    }


}