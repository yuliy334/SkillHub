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
    return res.status(500).json({ message: "unexepted error"});
  }
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User deleted successfully" });
};
