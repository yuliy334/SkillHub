import api from "../api";

export const getSchedule = async () => {
  const res = await api.get("/schedule");
  return res.data;
};

export const addScheduleSlot = async (start, end) => {
  const res = await api.post("/schedule", { start, end });
  return res.data;
};

export const deleteScheduleSlot = async (id) => {
  const res = await api.delete("/schedule", { data: { id } });
  return res.data;
};
