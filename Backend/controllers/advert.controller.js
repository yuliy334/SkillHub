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
      { new: true, runValidators: true }
    );

    if (!updatedAdvert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    res.status(200).json({updatedAdvert, message:"advert skill updated"});
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
