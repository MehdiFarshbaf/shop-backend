import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            success: true,
            products
        })
    } catch (err) {
        next(err)
    }
}