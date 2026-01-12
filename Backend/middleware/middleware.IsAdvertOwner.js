import jwt from "jsonwebtoken";
import User from "../models/user.module.js";
import Advert from "../models/advert.module.js";

export const protectAdvert = async (req, res, next) => {

  try {

    const { advertId } = req.params;

    if (advertId) {
      const advert = await Advert.findById(advertId);

      if (!advert) {
        return res.status(404).json({ message: "Advert not found" });
      }

      if (!advert.userId.equals(req.user._id)) {
        return res
          .status(403)
          .json({ message: "Permission denied: Not your advert" });
      }
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Server error during owner check" });
  }
};
