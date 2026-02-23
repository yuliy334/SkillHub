import api from "../api";

export const getSkills = async () => {
  const res = await api.get("/skill/getall");
  return res.data;
};

export const addSkill = async (skillData) => {
  const res = await api.post("/skill", skillData);
  return res.data;
};
