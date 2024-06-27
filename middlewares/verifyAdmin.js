import jwt from "jsonwebtoken";
import {sendErrorResponse} from "../helper/responses.js";
import Admin from "../models/Admin.js";

export const verifyAdmin = async (req, res, next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    try {
        if (token == null) sendErrorResponse("لطفا ابتدا وارد حساب کاربری خود شوید.", 401)

        jwt.verify(token, process.env.JWT_SECRET_ADMIN, async (err, decode) => {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: "توکن شما منقضی شده است."
                })
                // sendErrorResponse("توکن منقضی شده است.", 422)
            }
            // console.log(decode);
            const admin = await Admin.findOne({email: decode?.email}).select(["-password"]).populate("role")
            req.admin = admin
            next()
        })
    } catch (err) {
        next(err)
    }
}