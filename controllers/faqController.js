import FAQ from "../models/FAQ.js";
import {sendErrorResponse} from "../helper/responses.js";

export const getAllFAQ = async (req, res, next) => {
    try {
        const faqs = await FAQ.find()
        res.status(200).json({
            success: true, faqs,
            total: faqs.length
        })
    } catch (err) {
        next(err)
    }
}

export const getFAQ = async (req, res, next) => {
    try {
        const {id} = req.params
        const faq = await FAQ.findById(id)
        if (!faq) sendErrorResponse("سوال متداولی با این شناسه یافت نشد.", 404)
        res.status(200).json({
            success: true,
            faq
        })
    } catch (err) {
        next(err)
    }
}

export const createFAQ = async (req, res, next) => {
    try {
        const {question, answer} = req.body
        const faq = await FAQ.create({question, answer})
        res.status(201).json({
            success: true,
            message: "سوال متداول با موفقیت ایجاد شد."
        })
    } catch (err) {
        next()
    }
}

export const updateFAQ = async (req, res, next) => {
    try {
        const {answer, question} = req.body
        const faq = await FAQ.findById(req.params.id)
        if (!faq) sendErrorResponse("سوال متداولی با این شناسه یافت نشد.", 404)

        const newFAQ = await FAQ.findByIdAndUpdate(req.params.id, {answer, question}, {new: true})

        res.status(200).json({
            success: true,
            message: "ویرایش موفقیت آمیز بود.",
            faq: newFAQ
        })

    } catch (err) {
        next(err)
    }
}

export const deleteFAQ = async (req, res, next) => {
    try {
        const faq = await FAQ.findById(req.params.id)
        if (!faq) sendErrorResponse("سوال متداولی با این شناسه یافت نشد.", 404)

        await FAQ.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "حذف موفقیت آمیز بود.",
            faq
        })
    } catch (err) {
        next(err)
    }
}