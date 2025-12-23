import jwt from "jsonwebtoken";
import User from "../models/user.module.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};