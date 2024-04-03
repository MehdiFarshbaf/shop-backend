import express from "express";

//controllers
import {createBlogs, deleteBlog, getBlog, getBlogs, updateBlogs} from "../controllers/blogControllers.js";

//middlewares
import {validation} from "../middlewares/validation.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";

//validations
import {createBlogSchema} from "../validations/blogSchemas.js";

const router = express.Router()

//crud blog
router.get("/", getBlogs)
router.get("/:id", validateMongoDbId, getBlog)
router.post("/", verifyToken, validation(createBlogSchema), createBlogs)
router.put("/:id", verifyToken, validateMongoDbId, validation(createBlogSchema), updateBlogs)
router.delete("/:id", verifyToken, validateMongoDbId, deleteBlog)
export default router