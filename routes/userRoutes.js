import express from "express";

//controllers
import {
    deleteUser,
    forgetPassword,
    getAllUsers,
    getProfile,
    getUser,
    loginUser,
    registerUser,
    updateProfile
} from "../controllers/userController.js";

//middlewares
import { validation } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/verifyToken.js";

//validations
import { loginValidation, registerValidation, updateProfileValidation } from "../validations/userSchemas.js";

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:id", getUser)
router.post("/register", validation(registerValidation), registerUser)
router.post("/login", validation(loginValidation), loginUser)
router.get("/profile", verifyToken, getProfile)
router.put("/forget-password", forgetPassword)
router.put("/profile", verifyToken, validation(updateProfileValidation), updateProfile)
router.delete("/:id", deleteUser)

export default router