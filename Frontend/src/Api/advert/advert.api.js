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

export const getAdvertById = async (advertId) => {
  const res = await api.get(`/advert/${advertId}`);
  return res.data;
};

export const createDeal = async (advertId, dealData) => {
  const res = await api.post(`/advert/${advertId}/deals`, dealData);
  return res.data;
};

export const deleteAdvert = async (advertId) => {
  const res = await api.delete(`/advert/${advertId}`);
  return res.data;
};

export const acceptDeal = async (advertId, dealId) => {
  const res = await api.patch(`/advert/${advertId}/deals/${dealId}/accept`);
  return res.data;
};

export const rejectDeal = async (advertId, dealId) => {
  const res = await api.patch(`/advert/${advertId}/deals/${dealId}/reject`);
  return res.data;
};
