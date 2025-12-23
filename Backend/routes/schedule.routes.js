import express from "express";
// import { getAll } from "../controllers/schedule.controller.js";
import { protect } from "../middleware/middleware.auth.js";
import { addSchedule } from "../controllers/schedule.controller.js";


const scheduleRoutes = express.Router();
// scheduleRoutes.get("/", protect, getAll);
scheduleRoutes.post("/", protect, addSchedule);

export default scheduleRoutes;