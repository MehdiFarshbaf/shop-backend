import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mehdifarshbaf92@gmail.com",
        pass: "iahvspgpsgxmsnvr"
    }
})

export const sendEmailMessage = async (req, res, next) => {
    const { to, subject, message, email } = req.body
    try {
        let details = {
            from: email,
            to,
            subject,
            html: `
            <h1>عنوان پیام : ${subject}</h1>
            <p style="color:blue;text-align:center;">${message}</p>
            <p>این پیام از طرف ${email} است.</p>
            `
        }
        await transporter.sendMail(details)
        res.status(200).json({
            success: true,
            message: "ایمیل با موفقیت ارسال شد."
        })
    } catch (err) {
        next(err)
    }
}