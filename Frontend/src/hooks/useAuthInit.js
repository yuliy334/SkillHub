import { useEffect, useState } from "react";
import axios from "axios";

export const useAuthInit = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user_profile");
    if (!savedUser) {
      setIsReady(true);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
        withCredentials: true,
      })
      .then(() => {
        setIsReady(true);
      })
      .catch(() => {
        localStorage.removeItem("user_profile");
        setIsReady(true);
      });
  }, []);

  return isReady;
};
