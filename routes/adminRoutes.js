import express from "express";

//controllers
import {
    changePasswordAdmin,
    createAdmin,
    deleteAdmin,
    getAdmin,
    getAllAdmins,
    loginAdmin,
    updateAdmin,
    updateProfileAdmin
} from "../controllers/adminControllers.js";

//middleware
import { validation } from "../middlewares/validation.js";
import { validateMongoDbId } from "../middlewares/validateMongoDbId.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

//validations
import { adminCreateSchema, adminUpdateSchema, loginAdminSchema,changePasswordSchema } from "../validations/adminSchemas.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router()

router.put("/profile", verifyAdmin, validation(adminUpdateSchema), updateProfileAdmin)
router.put("/change-password",verifyAdmin,validation(changePasswordSchema),changePasswordAdmin)
router.get("/", verifyAdmin, checkPermission('admins'), getAllAdmins)
router.get("/:id", verifyAdmin, checkPermission('admins'), getAdmin)
router.post("/", verifyAdmin, checkPermission('create_admin'), validation(adminCreateSchema), createAdmin)
router.delete("/:id", verifyAdmin, checkPermission('delete_admin'), validateMongoDbId, deleteAdmin)
router.post("/login", validation(loginAdminSchema), loginAdmin)
router.put("/:id", verifyAdmin, checkPermission('update_admin'), validateMongoDbId, validation(adminUpdateSchema), updateAdmin)

export default router