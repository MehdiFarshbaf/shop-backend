import Category from "../models/Category.js";
import User from "../models/User.js";

export const getDashboardData = async (req, res, next) => {
    try {
        const categories = await Category.find()
        const users = await User.find().select(["-password"])
        res.status(200).json({
            success: true,
            users,
            categories
        })
    } catch (err) {
        next(err)
    }
}