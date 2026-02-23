import Advert from "../models/advert.module.js";
import User from "../models/user.module.js";
import Skill from "../models/skill.module.js";

export const addAdvert = async (req, res) => {
  try {
    const { userWanted, userOffers } = req.body;
    if (!req.user.id) {
      return res.status(400).json({ message: "userId is required" });
    }

    const newAdvert = new Advert({
      userId: req.user.id,
      userWanted: userWanted || [],
      userOffers: userOffers || [],
      deals: [],
    });

    const savedAdvert = await newAdvert.save();

    return res
      .status(201)
      .json({ newAdvert: savedAdvert, message: "advert created" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating advert" });
  }
};

export const deleteAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;

    await Advert.deleteOne({ _id: advertId });

    return res.status(201).json({ message: "advert deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting advert" });
  }
};

export const updateAdvertSkills = async (req, res) => {
  try {
    const { advertId } = req.params;
    const { userWanted, userOffers } = req.body;
    const updatedAdvert = await Advert.findByIdAndUpdate(
      advertId,
      {
        userWanted: userWanted,
        userOffers: userOffers,
      },
      { new: true, runValidators: true },
    );

    if (!updatedAdvert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    res.status(200).json({ updatedAdvert, message: "advert skill updated" });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const addDeal = async (req, res) => {
  const { advertId } = req.params;
  const { requestorWanted, requestorOffers, scheduleSlotId } = req.body;
  const requesterId = req.user.id;

  try {
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }
    if (advert.userId.toString() === requesterId) {
      return res
        .status(400)
        .json({ message: "Cannot create a deal on your own advert" });
    }
    const advertOwner = await User.findById(advert.userId);
    const slot = advertOwner.schedule.id(scheduleSlotId);
    if (!slot) {
      return res
        .status(404)
        .json({ message: "Schedule slot not found in your profile" });
    }
    const newDeal = {
      requesterId,
      requestorWanted,
      requestorOffers,
      scheduleSlotId,
      startTime: slot.start,
      endTime: slot.end,
      status: "pending",
    };
    advert.deals.push(newDeal);
    await advert.save();
    return res
      .status(201)
      .json({ message: "Deal added successfully", deal: newDeal });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding deal", error: error.message });
  }
};

export const getMyDeals = async (req, res) => {
  try {
    const userId = req.user.id;
    const adverts = await Advert.find({ "deals.requesterId": userId })
      .populate("userId", "name lastName email")
      .populate("userWanted userOffers", "name")
      .lean();

    const myDeals = [];
    for (const advert of adverts) {
      const owner = advert.userId;
      const myDealsInAdvert = (advert.deals || []).filter(
        (d) => d.requesterId && d.requesterId.toString() === userId
      );
      for (const deal of myDealsInAdvert) {
        myDeals.push({
          deal: {
            _id: deal._id,
            status: deal.status,
            startTime: deal.startTime,
            endTime: deal.endTime,
            requestorWanted: deal.requestorWanted,
            requestorOffers: deal.requestorOffers,
          },
          advertId: advert._id,
          advertSkills: {
            offers: advert.userOffers || [],
            wants: advert.userWanted || [],
          },
          owner: {
            name: owner?.name,
            lastName: owner?.lastName,
            ...(deal.status === "accepted" && owner?.email && { email: owner.email }),
          },
        });
      }
    }

    for (const item of myDeals) {
      if (item.deal.requestorWanted?.length) {
        item.deal.requestorWanted = await Skill.find({ _id: { $in: item.deal.requestorWanted } }).select("name").lean();
      }
      if (item.deal.requestorOffers?.length) {
        item.deal.requestorOffers = await Skill.find({ _id: { $in: item.deal.requestorOffers } }).select("name").lean();
      }
    }

    return res.status(200).json({ myDeals });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching your deals" });
  }
};

export const getMyAdverts = async (req, res) => {
  try {
    const userId = req.user.id;
    const adverts = await Advert.find({ userId })
      .populate({
        path: "deals",
        populate: [
          { path: "requestorWanted", select: "name" },
          { path: "requestorOffers", select: "name" },
          { path: "requesterId", select: "name" },
        ],
      })
      .populate("userWanted", "name")
      .populate("userOffers", "name")
      .lean();// с монгуса на джаез
    return res.status(200).json({ adverts });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching adverts" });
  }
};
export const getAdvertById = async (req, res) => {
  try {
    const { advertId } = req.params;
    const advert = await Advert.findById(advertId)
      .select("-deals")
      .populate({
        path: "userId",
        select: "name lastName schedule",
      })
      .populate("userWanted userOffers", "name")
      .lean();

    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    return res.status(200).json(advert);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching advert" });
  }
};

export const getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find()
      .select("-deals")
      .populate({
        path: "userId",
        select: "_id name lastName",
      })
      .populate("userWanted userOffers", "name")
      .lean();

    return res.status(200).json({ adverts });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching adverts",
    });
  }
};
export const deleteDeal = async (req, res) => {
  try {
    const { advertId, dealId } = req.params;
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }
    const deal = advert.deals.id(dealId);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    advert.deals.pull(dealId);
    await advert.save();
    return res.status(200).json({ message: "Deal deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting deal" });
  }
};
export const acceptDeal = async (req, res) => {
  try {
    const { advertId, dealId } = req.params;
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }
    const deal = advert.deals.id(dealId);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    deal.status = "accepted";
    await advert.save();
    return res.status(200).json({ message: "Deal accepted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error accepting deal" });
  }
};

export const rejectDeal = async (req, res) => {
  try {
    const { advertId, dealId } = req.params;
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }
    const deal = advert.deals.id(dealId);

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    deal.status = "rejected";
    await advert.save();
    return res.status(200).json({ message: "Deal rejected successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error rejecting deal" });
  }
};
