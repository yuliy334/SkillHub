import express from "express";
import { addSkill, getAll } from "../controllers/skill.controller.js";
import { protect } from "../middleware/middleware.auth.js";

const skillRoutes = express.Router();
skillRoutes.get("/getall", getAll);
skillRoutes.post("/", protect, addSkill);


export default skillRoutes;