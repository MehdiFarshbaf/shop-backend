import express from "express";

//controllers
import {getProducts} from "../controllers/productController.js";

const router = express.Router()

//crud product
router.get("/", getProducts)

export default router