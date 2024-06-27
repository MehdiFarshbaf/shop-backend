export const profilePhotoUpload = async (req, res, next) => {
    try {
        console.log(req.file)
        res.json({
            success: true,
            message: "upload"
        })
    } catch (err) {
        next(err)
    }
}