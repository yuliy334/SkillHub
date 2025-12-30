import express from "express";
import {getAll, DeleteUser} from "../controllers/user.controller.js";
import { protect } from "../middleware/middleware.auth.js";



const userRoutes = express.Router();
// userRoutes.get("/getall", getAll);
userRoutes.delete("/", protect, DeleteUser);


export default userRoutes;