export const addSchedule = async (req, res) => {
  const userId = req.user.name;
  return res.status(200).json({ success: true, userId });
};
