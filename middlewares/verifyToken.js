import jwt from "jsonwebtoken";
import {sendErrorResponse} from "../helper/responses.js";

export const verifyToken = async (req, res, next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    try {
        if (token == null) sendErrorResponse("لطفا ابتدا وارد حساب کاربری خود شوید.", 401)

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) sendErrorResponse("توکن منقضی شده است.", 403)
            req.userId = decode.userId
            next()
        })
    } catch (err) {
        next(err)
    }
}