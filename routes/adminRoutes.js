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
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router()

router.get("/", verifyAdmin, checkPermission('admins'), getAllAdmins)
router.get("/:id", verifyAdmin, checkPermission('admins'), getAdmin)
router.post("/", verifyAdmin, checkPermission('create_admin'), validation(adminCreateSchema), createAdmin)
router.delete("/:id", verifyAdmin, checkPermission('delete_admin'), validateMongoDbId, deleteAdmin)
router.put("/:id", verifyAdmin, checkPermission('update_admin'), validateMongoDbId, validation(adminUpdateSchema), updateAdmin)

router.post("/login", validation(loginAdminSchema), loginAdmin)
export default router