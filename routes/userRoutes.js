import express from "express";

//controllers
import {getAllUsers, loginUser, registerUser} from "../controllers/userController.js";

//middlewares
import {validation} from "../middlewares/validation.js";

//validations
import {loginValidation, registerValidation} from "../validations/userValidat6ions.js";

const router = express.Router()

router.get("/", getAllUsers)
router.post("/register", validation(registerValidation), registerUser)
router.post("/login", validation(loginValidation), loginUser)

export default router