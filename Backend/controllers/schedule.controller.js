export const getAllSchedule = async (req, res) => {
  try {
    const schedule = req.user.schedule;

    return res.status(200).json(schedule);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const addSchedule = async (req, res) => {
  try {
    const { start, end } = req.body;
    const newStart = new Date(start);
    const newEnd = new Date(end);

    if (isNaN(newStart) || isNaN(newEnd)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const isOverlapping = req.user.schedule.some((entry) => {
      return newStart < entry.end && newEnd > entry.start;
    });

    if (isOverlapping) {
      return res.status(409).json({
        message: "Schedule conflict: This time slot is already taken.",
      });
    }

    await req.user.schedule.push({ start: newStart, end: newEnd });
    const createdSlot = req.user.schedule[req.user.schedule.length - 1];

    await req.user.save();

    return res.status(200).json({
      message: "New slot has been added to your schedule",
      createSlot: createdSlot,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
export const deleteSchedule = async (req, res) => {
  try {
    
    const { id } = req.body; 

    if (!id) {
      return res.status(400).json({ message: "ID is required to delete an entry" });
    }

    const isExisting = req.user.schedule.id(id);

    if (!isExisting) {
      return res.status(404).json({ 
        message: "This slot does not exist in your schedule" 
      });
    }

    req.user.schedule.pull(id);

    await req.user.save();

    return res.status(200).json({ 
      message: "Time deleted from schedule",
      deletedId: id 
    });

  } catch (error) {
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};
export const updateSchedule = async (req, res) => {
  try {
    const { id, start, end } = req.body;
    const newStart = new Date(start);
    const newEnd = new Date(end);

    if (isNaN(newStart) || isNaN(newEnd) || newStart >= newEnd) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const scheduleEntry = req.user.schedule.id(id);
    if (!scheduleEntry) {
      return res.status(404).json({ message: "Schedule slot not found" });
    }

    const isOverlapping = req.user.schedule.some((entry) => {
      if (entry._id.toString() === id) return false;

      return newStart < entry.end && newEnd > entry.start;
    });

    if (isOverlapping) {
      return res.status(409).json({
        message: "Schedule conflict: This time slot is already taken.",
      });
    }

    scheduleEntry.start = newStart;
    scheduleEntry.end = newEnd;

    await req.user.save();

    return res.status(200).json({
      message: "Schedule updated successfully",
      updatedSlot: scheduleEntry,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
