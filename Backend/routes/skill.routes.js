import express from "express";

import { addSkill } from "../controllers/skill.controller.js";

const skillRoutes = express.Router();
// userRoutes.get("/getall", getAll);
skillRoutes.post("/", addSkill);


export default skillRoutes;