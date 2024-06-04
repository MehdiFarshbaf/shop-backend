import Category from "../models/Category.js";
import {sendErrorResponse} from "../helper/responses.js";
import {handleDeleteFile, storeImage} from "../helper/storeImage.js";

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().populate("admin", "-password")
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
    const {name} = req.body
    try {
        const {fileName, url} = await storeImage(req, res, next, "category")
        const category = await Category.create({name, url, image: fileName, admin: req.admin._id})
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
        const category = await Category.findById(req.params.id).populate("admin", "-password")
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
    const {name} = req.body
    try {
        let fileName = ""
        let url = ""
        const category = await Category.findById(req.params.id)
        if (!category) sendErrorResponse("دسته بندی با این شناسه یافت نشد.", 404)
        if (req.files === null) {
            fileName = category.image
            url = category.url
        } else {
            await handleDeleteFile("category", category.image)
            const {fileName: newFileName, url: newUrl} = await storeImage(req, res, next, "category")
            fileName = newFileName
            url = newUrl
        }
        await Category.findByIdAndUpdate(req.params.id, {name, image: fileName, url, admin: req.admin._id})
        res.status(200).json({
            success: true,
            message: `ویرایش دسته بندی ${name} موفقیت آمیز بود.`
        })
    } catch (err) {
        next(err)
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) sendErrorResponse("دسته بندی با این شناسه یافت نشد.", 404)
        await handleDeleteFile("category", category.image)
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
