import api from "../api";

export const createAdvert = async (advertData) => {
  const res = await api.post("/advert", advertData);
  return res.data;
};
