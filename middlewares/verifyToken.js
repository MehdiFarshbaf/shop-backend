// import jwt from "jsonwebtoken";
//
// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers["authorization"]
//     const token = authHeader && authHeader.split(" ")[1]
//     // console.log(authHeader);
//     try {
//         if (token == null) {
//             const error = new Error("لطفا ابتدا وارد حساب کاربری خود شوید.")
//             error.statusCode = 401
//
//             next(error)
//         }
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
//             // console.log(decode);
//             // if (err) return res.sendStatus(403)
//             if (err) {
//                 // console.log("monghzi");
//                 const error = new Error("توکن منقضی شده است.")
//                 error.statusCode = 403
//                 next(error)
//             }
//             req.userId = decode.userId
//             next()
//         })
//     } catch (err) {
//         next(err)
//     }
// }