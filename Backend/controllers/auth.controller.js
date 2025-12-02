import User from '../models/user.module.js';
import bcrypt from 'bcrypt';
import express from "express";
import { validateRegister, validateLogin } from "../validations/auth.schema.js"


export const register = async (req, res) => {
    const { success, error } = validateRegister(req.body);
    if (!success) {
        return res.status(400).json(error.issues[0].message);
    }
    const { name, email, password } = req.body;
    let check = await User.findOne({ email });
    if (check) {
        return res.status(409).json("email is exist");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    if (!user) {
        return res.status(500).json("unexepted error");
    }
    return res.status(201).json({ success: true, message: "user created", account: { name, email } });
}

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
    return res.status(200).json({ success: true, account: { name: check.name, email: check.email } });


}



