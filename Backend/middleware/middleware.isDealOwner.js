import Advert from "../models/advert.module.js";

export const protectDeal = async (req, res, next) => {
  try {
    const { advertId } = req.params;

    if (advertId) {
      const advert = await Advert.findById(advertId);
      const dealId = req.params.dealId;
      const deal = advert.deals.id(dealId);

      if (!deal) {
        return res.status(404).json({ message: "Deal not found" });
      }

      if (!deal.requesterId.equals(req.user._id)) {
        return res
          .status(403)
          .json({ message: "Permission denied: Not your deal" });
      }
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Server error during owner check" });
  }
};
