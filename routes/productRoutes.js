import express from "express";

//controllers
import {createProduct, getProducts} from "../controllers/productController.js";

//middlewares
import {verifyToken} from "../middlewares/verifyToken.js";
import {validation} from "../middlewares/validation.js";

//schemas
import {createProductSchema} from "../validations/productSchemas.js";

const router = express.Router()

//crud product
router.get("/", getProducts)
router.post("/", verifyToken, validation(createProductSchema), createProduct)

export default router