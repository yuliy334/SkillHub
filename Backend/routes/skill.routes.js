import express from "express";

import { addSkill,getAll } from "../controllers/skill.controller.js";
import { verifyToken } from "../middleware/middleware.verifyJwt.js";

const skillRoutes = express.Router();
skillRoutes.get("/getall", getAll);
skillRoutes.post("/", verifyToken, addSkill);


export default skillRoutes;