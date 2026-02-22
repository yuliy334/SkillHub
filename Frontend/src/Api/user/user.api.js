import api from "../api";

export const updateUser = async (userData) => {
  const res = await api.patch("/users", userData);
  return res.data;
};
