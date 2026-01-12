import express from "express";
import { protect } from "../middleware/middleware.auth.js";
import { addAdvert, deleteAdvert, updateAdvertSkills } from "../controllers/advert.controller.js";
import {protectAdvert} from "../middleware/middleware.IsAdvertOwner.js";

const adverRouter = express.Router();

adverRouter.post("/", protect, addAdvert);
adverRouter.delete("/:advertId", protect, protectAdvert, deleteAdvert);
adverRouter.patch("/:advertId", protect, protectAdvert, updateAdvertSkills);


export default adverRouter;