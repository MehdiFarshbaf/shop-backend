import path from "path";
import fs from "fs";
import {sendErrorResponse} from "./responses.js";
import {allowTypesImages, baseURL} from "../config/config.js";


export const storeImage = async (req, res, next, address, required = true) => {
    // try {
    if (req.files == null) {
        sendErrorResponse("انتخاب تصویر الزامی است.", 422)
    }
    // const file = req.files.file
    const file = req.files.image
    const fileSize = await file.data.length
    const ext = path.extname(file.name)
    const dateNow = Math.round(Date.now())
    const fileName = dateNow + ext

    // for local
    // const url = `${req.protocol}://${req.get("host")}/${address}/${fileName}`

    // for server
    const url = process.env.NODE_ENV === "production" ? `${baseURL}/${address}/${fileName}` : `${req.protocol}://${req.get("host")}/${address}/${fileName}`


    if (!allowTypesImages.includes(ext.toLowerCase())) sendErrorResponse("فرمت عکس مجاز نیست.", 422)
    if (fileSize > 2000000) sendErrorResponse("حجم تصویر نباید بیشتر از 2 مگابایت باشد.", 422)
    try {
        await file.mv(`./public/${address}/${fileName}`, async (err) => {
            if (err) {
                res.status(422).json({
                    success: false,
                    type: "store",
                    message: err.message
                })
            }
        })
        return {fileName, url}
    } catch (err) {
        next(err)
    }
}

export const handleDeleteFile = async (type, fileName) => {
    const filePath = `./public/${type}/${fileName}`
    if (fs.existsSync(filePath) && fileName !="") {
        await fs.unlinkSync(filePath)
    } else {
        console.log("not file")
    }
}