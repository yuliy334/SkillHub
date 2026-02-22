import api from "../api";

export const getSkills = async () => {
  const res = await api.get("/skill/getall");
  return res.data;
};
