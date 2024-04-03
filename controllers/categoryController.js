import Category from "../models/Category.js";
import {sendErrorResponse} from "../helper/responses.js";

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.status(200).json({
            success: true,
            categories,
            total: categories.length
        })
    } catch (err) {
        next(err)
    }
}
export const createCategory = async (req, res, next) => {
    const {name, image} = req.body
    try {
        const category = await Category.create({name, image})
        res.status(201).json({
            success: true,
            message: `دسته بندی ${name} ایجاد شد.`,
            category
        })
    } catch (err) {
        next(err)
    }
}

export const getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) sendErrorResponse("دسته بندی با این شناسه یافت نشد.", 404)

        res.status(200).json({
            success: true,
            category
        })
    } catch (err) {
        next(err)
    }
}

export const updateCategory = async (req, res, next) => {
    const {name, image} = req.body
    try {
        const category = await Category.findById(req.params.id)
        if (!category) sendErrorResponse("دسته بندی با این شناسه یافت نشد.", 404)
        await Category.findByIdAndUpdate(req.params.id, {name, image})
        res.status(200).json({
            success: true,
            message: "ویرایش دسته بندی موفقیت آمیز بود."
        })
    } catch (err) {
        next(err)
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) sendErrorResponse("دسته بندی با این شناسه یافت نشد.", 404)
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: `دسته بندی ${category?.name} حذف شد.`,
            category
        })
    } catch (err) {
        next(err)
    }
}
