import express from "express";
// import multer from "multer";

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
import { checkIdFor } from "../middlewares/checkIdFor.js";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/products/")
//     },
//     filename: function (req, file, cb) {
//         const uniqueName = Date.now()
//         cb(null, uniqueName + file.originalname)
//     }
// })
//
// const uploads = multer({
//     storage
// }).fields([
//     {name: 'mainImage', maxCount: 1},
//     {name: 'subImage', maxCount: 10}
// ])

const router = express.Router()

//crud product
router.get("/", getProducts)
router.get("/:id", validateMongoDbId, getProduct)

router.post("/", verifyAdmin, checkPermission("create_product"),  checkIdFor("category_id", "دسته بندی"),validation(createProductSchema),  createProduct)

router.put("/:id", verifyAdmin, checkPermission("update_product"), validateMongoDbId, validation(createProductSchema), updateProduct)



router.delete("/:id", verifyAdmin, checkPermission("delete_product"), validateMongoDbId, deleteProduct)

export default router