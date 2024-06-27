import multer from 'multer'


const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb({
            message: "فرمت مورد استفاده مجاز نیست."
        }, false)
    }
}

export const photoUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {fileSize: 500000}
})
