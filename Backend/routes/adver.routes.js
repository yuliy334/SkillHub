import express from "express";
import { protect } from "../middleware/middleware.auth.js";
import {
  addAdvert,
  addDeal,
  deleteAdvert,
  getMyAdverts,
  updateAdvertSkills,
  getAllAdverts,
} from "../controllers/advert.controller.js";
import { protectAdvert } from "../middleware/middleware.IsAdvertOwner.js";
import { protectDeal } from "../middleware/middleware.isDealOwner.js";
import { get } from "http";

const adverRouter = express.Router();

adverRouter.get("/myAdverts", protect, getMyAdverts);
adverRouter.get("/", protect, getAllAdverts);
adverRouter.post("/", protect, addAdvert);
adverRouter.delete("/:advertId", protect, protectAdvert, deleteAdvert);
adverRouter.patch("/:advertId", protect, protectAdvert, updateAdvertSkills);

adverRouter.post("/:advertId/deals", protect, addDeal);
adverRouter.delete("/:advertId/deals/:dealId", protect, protectDeal, deleteDeal);

export default adverRouter;
