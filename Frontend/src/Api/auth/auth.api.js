import api from "../api";

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const logIn = async ({ email, password }) => {
  const res = await api.post(
    "/auth/login",
    { email, password },
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const logOut = async () => {
  await api.post("/auth/logout");
};

export const refresh = async () => {
  const res = await api.get("/auth/refresh");
  return res.data;
};

export const fetchCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
