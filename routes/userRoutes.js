import express from "express";

//controllers
import {getAllUsers, getProfile, loginUser, registerUser} from "../controllers/userController.js";

//middlewares
import {validation} from "../middlewares/validation.js";
import {verifyToken} from "../middlewares/verifyToken.js";

//validations
import {loginValidation, registerValidation} from "../validations/userValidat6ions.js";

const router = express.Router()

router.get("/", getAllUsers)
router.post("/register", validation(registerValidation), registerUser)
router.post("/login", validation(loginValidation), loginUser)
router.get("/profile", verifyToken, getProfile)

export default router