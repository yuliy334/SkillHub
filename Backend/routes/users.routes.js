import express from "express";
import {getAll} from "../controllers/user.controller.js";


const userRoutes = express.Router();
userRoutes.get("/getall", getAll);


export default userRoutes;