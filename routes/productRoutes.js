import express from "express";

//controllers
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from "../controllers/productController.js";

//middlewares
import {validation} from "../middlewares/validation.js";
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";
import {verifyAdmin} from "../middlewares/verifyAdmin.js";
import {checkPermission} from "../middlewares/checkPermission.js";

//schemas
import {createProductSchema} from "../validations/productSchemas.js";


const router = express.Router()

//crud product
router.get("/", getProducts)
router.get("/:id", validateMongoDbId, getProduct)
router.put("/:id", verifyAdmin, checkPermission("update_product"), validateMongoDbId, validation(createProductSchema), updateProduct)
router.post("/", verifyAdmin, checkPermission("create_product"), validation(createProductSchema), createProduct)
router.delete("/:id", verifyAdmin, checkPermission("delete_product"), validateMongoDbId, deleteProduct)

export default router