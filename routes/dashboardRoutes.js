import express from "express";

//controllers
import {getDashboardData} from "../controllers/dashboardController.js";

const router = express.Router()

router.get("/", getDashboardData)
export default router