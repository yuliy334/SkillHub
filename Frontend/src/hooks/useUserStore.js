import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../Api/auth/auth.api";

export const useUser = () => {
  const savedUser = localStorage.getItem("user_profile");

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await fetchCurrentUser();
      localStorage.setItem("user_profile", JSON.stringify(data));
      return data;
    },
    enabled: !!savedUser,
    initialData: () => {
      return savedUser ? JSON.parse(savedUser) : undefined;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};