import express from "express";

// controllers
import {createFAQ, deleteFAQ, getAllFAQ, getFAQ, updateFAQ} from "../controllers/faqController.js";

// middlewares
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";
import {verifyAdmin} from "../middlewares/verifyAdmin.js";
import {checkPermission} from "../middlewares/checkPermission.js";
import {validation} from "../middlewares/validation.js";

// schemas
import {createFAQSchema} from "../validations/faqSchame.js";


const router = express.Router()

router.get("/", getAllFAQ)
router.get("/:id", validateMongoDbId, getFAQ)

router.post("/", verifyAdmin, checkPermission('create_faq'), validation(createFAQSchema), createFAQ)
router.put("/:id", verifyAdmin, checkPermission('update_faq'), validateMongoDbId, validation(createFAQSchema), updateFAQ)
router.delete("/:id", verifyAdmin, checkPermission('delete_faq'), validateMongoDbId, deleteFAQ)

export default router