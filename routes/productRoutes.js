import express from "express";

//controllers
import {createProduct, deleteProduct, getProduct, getProducts} from "../controllers/productController.js";

//middlewares
import {verifyToken} from "../middlewares/verifyToken.js";
import {validation} from "../middlewares/validation.js";
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";

//schemas
import {createProductSchema} from "../validations/productSchemas.js";

const router = express.Router()

//crud product
router.get("/", getProducts)
router.get("/:id", validateMongoDbId, getProduct)
router.post("/", verifyToken, validation(createProductSchema), createProduct)
router.delete("/:id", validateMongoDbId, deleteProduct)

export default router