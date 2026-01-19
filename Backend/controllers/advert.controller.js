import Advert from "../models/advert.module.js";

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
    return res
      .status(500)
      .json({ message: "Error creating advert", error: error.message });
  }
};

export const deleteAdvert = async (req, res) => {
  try {
    const { advertId } = req.params;

    await Advert.deleteOne({ _id: advertId });

    return res.status(201).json({ message: "advert deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting advert", error: error.message });
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
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export const addDeal = async (req, res) => {
  const { advertId } = req.params;
  const { requestorWanted, requestorOffers } = req.body;
  const requesterId = req.user.id;

  try {
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }
    const newDeal = {
      requesterId,
      requestorWanted,
      requestorOffers,
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

export const getMyAdverts = async (req, res) => {
  try {
    const userId = req.user.id;
    const adverts = await Advert.find({ userId });
    return res.status(200).json({ adverts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching adverts", error: error.message });
  }
};
export const getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find()
      .select('-deals')
      .populate({
        path: 'userId',
        select: 'name lastName',
      })
      .populate('userWanted userOffers', 'name')
      .lean();

    return res.status(200).json({ adverts });
  } catch (error) {
    return res.status(500).json({ 
      message: "Error fetching adverts", 
      error: error.message 
    });
  }
};
