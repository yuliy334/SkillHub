import User from "../models/user.module.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { validateRegister, validateLogin } from "../validations/auth.schema.js";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export const register = async (req, res) => {
  const { success, error } = validateRegister(req.body);
  if (!success) {
    return res.status(400).json(error.issues[0].message);
  }
  const { name, lastName, email, password } = req.body;
  let check = await User.findOne({ email });
  if (check) {
    return res.status(409).json("email is exist");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    lastName,
    email,
    password: hashedPassword,
  });
  if (!user) {
    return res.status(500).json("unexepted error");
  }

  const tokens = generateTokens({ id: user._id, email: user.email });

  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "user created",
    account: { name, lastName, email },
  });
};

export const login = async (req, res) => {
  const { success, error } = validateLogin(req.body);
  if (!success) {
    return res.status(400).json(error.issues[0].message);
  }
  const { email, password } = req.body;

  let check = await User.findOne({ email });
  if (!check) {
    return res.status(401).json("incorect data");
  }
  const isValid = await bcrypt.compare(password, check.password);
  if (!isValid) {
    return res.status(401).json("incorect data");
  }
  return res
    .status(200)
    .json({ success: true, account: { name: check.name, email: check.email } });
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json("Access Denied");

  try {
    const verified = jwt.verify(refreshToken, REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: verified.id, email: verified.email },
      ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json("Invalid Refresh Token");
  }
};
