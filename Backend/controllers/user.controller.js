import User from '../models/user.module.js';


export const getAll = async (req, res) => {
    const users = await User.find().select("-password");
    return res.status(200).json({success: true, users});
}