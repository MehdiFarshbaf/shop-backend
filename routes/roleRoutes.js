import express from "express";

//controllers
import {createRole, deleteRole, getAllRole, getRoleById, updateRole} from "../controllers/roleController.js";

//middlewares
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";
import {verifyAdmin} from "../middlewares/verifyAdmin.js";
import {checkPermission} from "../middlewares/checkPermission.js";

const router = express.Router()

//crud roles
router.get("/", getAllRole)
router.get("/:id", validateMongoDbId, getRoleById)
router.post("/", verifyAdmin, checkPermission("create_role"), createRole)
router.put("/", verifyAdmin, checkPermission("update_role"), updateRole)
router.delete("/", verifyAdmin, checkPermission("delete_role"), deleteRole)
export default router