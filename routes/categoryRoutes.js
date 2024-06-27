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
import {validation} from "../middlewares/validation.js";
import {verifyAdmin} from "../middlewares/verifyAdmin.js";
import {checkPermission} from "../middlewares/checkPermission.js";

//validations
import {createCategorySchema} from "../validations/categorySchemas.js";

const router = express.Router()

//crud

router.get("/", getCategories)
router.get("/:id", validateMongoDbId, getCategory)
router.post("/", verifyAdmin,checkPermission("create_category"), validation(createCategorySchema), createCategory)
router.put("/:id", verifyAdmin, checkPermission("update_category"), validateMongoDbId, validation(createCategorySchema), updateCategory)
router.delete("/:id", verifyAdmin, checkPermission("delete_category"), validateMongoDbId, deleteCategory)

export default router