import express from "express";

//controllers
import { createRole, deleteRole, getAllRole, getRoleById, updateRole } from "../controllers/roleController.js";

//middlewares
import { validateMongoDbId } from "../middlewares/validateMongoDbId.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { validation } from './../middlewares/validation.js';

// validations
import { createRoleSchema } from "../validations/roleSchema.js";

const router = express.Router()

//crud roles
router.get("/", getAllRole)
// router.get("/:id", validateMongoDbId, getRoleById)
router.get("/:id", validateMongoDbId, getRoleById)
// router.post("/", verifyAdmin, checkPermission("create_role"), validation(createRoleSchema), createRole)
router.post("/", verifyAdmin, validation(createRoleSchema), createRole)
// router.put("/", verifyAdmin, validateMongoDbId, checkPermission("update_role"), updateRole)
router.put("/", verifyAdmin, validateMongoDbId, updateRole)
// router.delete("/:id", verifyAdmin, validateMongoDbId, checkPermission("delete_role"), deleteRole)
router.delete("/:id", verifyAdmin, validateMongoDbId, deleteRole)
export default router