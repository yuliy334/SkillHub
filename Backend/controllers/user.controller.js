import { email, jwt } from "zod";
import User from "../models/user.module.js";

export const getAll = async (req, res) => {
  const users = await User.find().select("-password");
  return res.status(200).json({ success: true, users });
};
export const DeleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ email: req.user.email });
  } catch (error) {
    return res.status(500).json({ message: "unexepted error" });
  }
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User deleted successfully" });
};

export const UpdateUser = async (req, res) => {
  const allowedUpdates = ["name", "lastName", "aboutMe"];

  const filteredBody = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      filteredBody[key] = req.body[key];
    }
  });

  if (Object.keys(filteredBody).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  try {
    const result = await User.updateOne(
      { email: req.user.email },
      { $set: filteredBody }, 
      { runValidators: true } 
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unexpected error" });
  }
};
