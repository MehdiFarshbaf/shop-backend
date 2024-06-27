import * as path from "path";
import fs from "fs";

import {sendErrorResponse} from "./responses.js";
import {allowTypesImages} from "../config/config.js";


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
    const url = `${req.protocol}://${req.get("host")}/${address}/${fileName}`

    if (!allowTypesImages.includes(ext.toLowerCase())) sendErrorResponse("فرمت عکس مجاز نیست.", 422)
    if (fileSize > 2000000) sendErrorResponse("حجم تصویر نباید بیشتر از 2 مگابایت باشد.", 422)
    try {
        await file.mv(`./public/${address}/${fileName}`, async (err) => {
            if (err) {
                console.log("error in store image", err)
                res.status(422).json({
                    success: false,
                    type: "store",
                    message: err.message
                })
            }
        })
        return {fileName, url}
    } catch (err) {
        console.log("run catch in storage", err)
        next(err)
    }
}

export const handleDeleteFile = async (type, fileName) => {
    const filePath = `./public/${type}/${fileName}`
    if (fs.existsSync(filePath)) {
        await fs.unlinkSync(filePath)
    } else {
        console.log("not file")
    }
    // try {
    //     await fs.unlinkSync(filePath)
    // } catch (err) {
    //     throw err
    // }

}