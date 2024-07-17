import express from "express";

//controllers
import {
    createAdmin,
    deleteAdmin,
    getAdmin,
    getAllAdmins,
    loginAdmin,
    updateAdmin
} from "../controllers/adminControllers.js";

//middleware
import { validation } from "../middlewares/validation.js";
import { validateMongoDbId } from "../middlewares/validateMongoDbId.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

//validations
import { adminCreateSchema, adminUpdateSchema, loginAdminSchema } from "../validations/adminSchemas.js";

const router = express.Router()

router.get("/", verifyAdmin, getAllAdmins)
router.get("/:id", verifyAdmin, getAdmin)
router.post("/", verifyAdmin, validation(adminCreateSchema), createAdmin)
router.delete("/:id", verifyAdmin, validateMongoDbId, deleteAdmin)
router.put("/:id", verifyAdmin, validateMongoDbId, validation(adminUpdateSchema), updateAdmin)

router.post("/login", validation(loginAdminSchema), loginAdmin)
export default router