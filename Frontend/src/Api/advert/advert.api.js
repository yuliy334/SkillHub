import api from "../api";

export const createAdvert = async (advertData) => {
  const res = await api.post("/advert", advertData);
  return res.data;
};

export const getMyAdverts = async () => {
  const res = await api.get("/advert/myAdverts");
  return res.data;
};

export const getAllAdverts = async () => {
  const res = await api.get("/adverts");
  return res.data;
};

export const deleteAdvert = async (advertId) => {
  const res = await api.delete(`/advert/${advertId}`);
  return res.data;
};
