import express from "express";
// import { getAll } from "../controllers/schedule.controller.js";
import { protect } from "../middleware/middleware.auth.js";
import { addSchedule, deleteSchedule, getAllSchedule, updateSchedule } from "../controllers/schedule.controller.js";


const scheduleRoutes = express.Router();

scheduleRoutes.get("/", protect, getAllSchedule);
scheduleRoutes.post("/", protect, addSchedule);
scheduleRoutes.delete("/",protect, deleteSchedule);
scheduleRoutes.patch("/",protect,updateSchedule);

export default scheduleRoutes;