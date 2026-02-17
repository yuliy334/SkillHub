import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (error.config.url.includes('/auth/refresh')) {
        localStorage.removeItem("user_profile");
        window.location.href = "/auth"; 
        return Promise.reject(error);
      }
      
      originalRequest._retry = true;

      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {}, { 
          withCredentials: true 
        });

        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;