import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRequest =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register");
    if (isAuthRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");
      if (isRefreshRequest) {
        localStorage.removeItem("user_profile");
        window.location.href = "/auth";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = axios
          .get(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
            withCredentials: true,
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        await refreshPromise;
        return api(originalRequest);
      } catch (refreshError) {
        const status = refreshError.response?.status;
        const isSessionInvalid = status === 401 || status === 403;
        if (isSessionInvalid) {
          localStorage.removeItem("user_profile");
          window.location.href = "/auth";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;