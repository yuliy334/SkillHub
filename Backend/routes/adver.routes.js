import express from "express";
import { protect } from "../middleware/middleware.auth.js";
import {
  addAdvert,
  addDeal,
  deleteAdvert,
  getMyAdverts,
  getAdvertById,
  updateAdvertSkills,
  getAllAdverts,
} from "../controllers/advert.controller.js";
import { protectAdvert } from "../middleware/middleware.IsAdvertOwner.js";
import { protectDeal } from "../middleware/middleware.isDealOwner.js";
import { deleteDeal } from "../controllers/advert.controller.js";
import { acceptDeal } from "../controllers/advert.controller.js";
import { rejectDeal } from "../controllers/advert.controller.js";

const adverRouter = express.Router();
adverRouter.use(protect);

adverRouter.get("/myAdverts", getMyAdverts);
adverRouter.get("/", getAllAdverts);
adverRouter.get("/:advertId", getAdvertById);
adverRouter.post("/", addAdvert);
adverRouter.delete("/:advertId", protectAdvert, deleteAdvert);
adverRouter.patch("/:advertId", protectAdvert, updateAdvertSkills);

adverRouter.post("/:advertId/deals", addDeal);
adverRouter.delete("/:advertId/deals/:dealId", protectDeal, deleteDeal);

adverRouter.patch("/:advertId/deals/:dealId/accept", protectAdvert, acceptDeal);
adverRouter.patch("/:advertId/deals/:dealId/reject", protectAdvert, rejectDeal);
export default adverRouter;
