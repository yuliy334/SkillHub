import express from "express";

import { addSkill,getAll } from "../controllers/skill.controller.js";

const skillRoutes = express.Router();
skillRoutes.get("/getall", getAll);
skillRoutes.post("/", addSkill);


export default skillRoutes;