import Product from "../models/Product.js";
import {sendErrorResponse} from "../helper/responses.js";

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            success: true,
            products,
            total: products.length
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

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) sendErrorResponse("محصولی با این شناسه یافت نشد.", 404)

        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        next(err)
    }
}

export const updateProduct = async (req, res, next) => {
    const {
        title, description, shortDescription, price, discount, mainImage,
        model,
        quantity,
        speciality,
        category,
        sendingType
    } = req.body
    try {
        const product = await Product.findById(req.params.id)
        if (!product) sendErrorResponse("محصولی با این شناسه یافت نشد.", 404)
        const updateP = await Product.findByIdAndUpdate(req.params.id, {
            title, description, shortDescription, price, discount, mainImage,
            model,
            quantity,
            speciality,
            category,
            sendingType
        }, {new: true})

        res.status(200).json({
            success: true,
            message: "ویرایش محصول موفقیت آمیز بود.",
            product: updateP
        })
    } catch (err) {
        next(err)
    }
}
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) sendErrorResponse("محصولی با این شناسه یافت نشد.", 404)

        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: `محصول ${product.title} با موفقیت پاک شد.`
        })
    } catch (err) {
        next(err)
    }
}