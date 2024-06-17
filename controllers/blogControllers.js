import Blog from "../models/Blog.js";
import {sendErrorResponse} from "../helper/responses.js";
import Category from "../models/Category.js";


export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate("category", ["name", "url"])

        res.status(200).json({
            success: true,
            blogs,
            total: blogs.length
        })
    } catch (err) {
        next(err)
    }
}
export const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) sendErrorResponse("پستی با این شناسه یافت نشد.", 404)

        res.status(200).json({
            success: true,
            blog
        })
    } catch (err) {
        next(err)
    }
}
export const createBlogs = async (req, res, next) => {
    const {title, description, shortDescription, mainImage, category_id} = req.body
    try {

        const exitCategory = await Category.findById(category_id)
        if (!exitCategory) sendErrorResponse("دسته بندی با این شناسه یافت نشد.", 404)

        const blog = await Blog.create({
            title,
            description,
            shortDescription,
            mainImage,
            writer: req.admin.fullname,
            category_id
        })

        res.status(201).json({
            success: true,
            message: `پست ${title} با موفقیت ایجاد شد.`,
            blog
        })
    } catch (err) {
        next(err)
    }
}
export const updateBlogs = async (req, res, next) => {
    const {title, description, shortDescription, mainImage, writer, category} = req.body
    try {
        const findBlog = await Blog.findById(req.params.id)
        if (!findBlog) sendErrorResponse("پستی با این شناسه یافت نشد.", 404)
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            title,
            description,
            shortDescription,
            mainImage,
            writer,
            category
        }, {new: true})

        res.status(200).json({
            success: true,
            message: "ویرایش پست موفقیت آمیز بود.",
            blog
        })
    } catch (err) {
        next(err)
    }
}
export const deleteBlog = async (req, res, next) => {
    try {
        const findBlog = await Blog.findById(req.params.id)
        if (!findBlog) sendErrorResponse("پستی با این شناسه یافت نشد.", 404)
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: `پست ${findBlog.title} با موفقیت حذف شد.`
        })
    } catch (err) {
        next(err)
    }
}