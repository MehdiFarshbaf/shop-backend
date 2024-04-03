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

export const createProduct = async (req, res, next) => {
    const {
        title, description, shortDescription, price, discount, mainImage,
        // subImage,
        model,
        quantity,
        speciality,
        category,
        Pcode,
        sendingType
    } = req.body
    const createPcode = len => {
        Math.random().toString(36).substring(2, len + 2)
    }
    try {
        const product = await Product.create({
            title, description, shortDescription, price, discount, mainImage,
            model,
            quantity,
            speciality,
            category,
            Pcode: createPcode(2),
            sendingType
        })

        res.status(201).json({
            success: true,
            message: `محصول ${title} ایجاد شد.`
        })
    } catch (err) {
        next(err)
    }
}