import express from "express";

//controllers
import {
    createAdmin,
    deleteAdmin,
    getAllAdmins,
    loginAdmin,
    updateProfileAdmin
} from "../controllers/adminControllers.js";

//middleware
import {validation} from "../middlewares/validation.js";
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";

//validations
import {adminSchema, loginAdminSchema} from "../validations/adminSchemas.js";

const router = express.Router()

router.get("/", getAllAdmins)
router.post("/", validation(adminSchema), createAdmin)
router.delete("/:id", validateMongoDbId, deleteAdmin)
router.put("/:id", validateMongoDbId, updateProfileAdmin)

router.post("/login",validation(loginAdminSchema), loginAdmin)
export default router