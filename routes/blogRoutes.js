import express from "express";

//controllers
import {createBlogs, deleteBlog, getBlog, getBlogs, updateBlogs} from "../controllers/blogControllers.js";

//middlewares
import {validation} from "../middlewares/validation.js";
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";
import {verifyAdmin} from "../middlewares/verifyAdmin.js";
import {checkPermission} from "../middlewares/checkPermission.js";

//validations
import {createBlogSchema} from "../validations/blogSchemas.js";
import {checkIdFor} from "../middlewares/checkIdFor.js";


const router = express.Router()

//crud blog
router.get("/", getBlogs)
router.get("/:id", validateMongoDbId, getBlog)
router.post("/", verifyAdmin, checkPermission("create_blog"), checkIdFor("category", "دسته بندی"), validation(createBlogSchema), createBlogs)
router.put("/:id", verifyAdmin, checkPermission("update_blog"), validateMongoDbId, validation(createBlogSchema), updateBlogs)
router.delete("/:id", verifyAdmin, checkPermission("delete_blog"), validateMongoDbId, deleteBlog)
export default router