import express from "express";

//controllers
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory
} from "../controllers/categoryController.js";

//middlewares
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {validation} from "../middlewares/validation.js";

//validations
import {createCategorySchema} from "../validations/categorySchemas.js";

const router = express.Router()

//crud
router.get("/", getCategories)
router.get("/:id", validateMongoDbId, getCategory)
router.post("/", verifyToken, validation(createCategorySchema), createCategory)
router.put("/:id", verifyToken, validateMongoDbId, validation(createCategorySchema), updateCategory)
router.delete("/:id", verifyToken, validateMongoDbId, deleteCategory)

export default router