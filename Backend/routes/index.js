import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";
import scheduleRoutes from "./schedule.routes.js";
import skillRoutes from "./skill.routes.js";
import adverRouter from "./adver.routes.js";
import { getAllAdverts } from "../controllers/advert.controller.js";

const router = express.Router();

router.get("/adverts", getAllAdverts);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/skill", skillRoutes);
router.use("/advert",adverRouter);

export default router;