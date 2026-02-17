import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from "../Api/auth/auth.api";

export const useUser = () => {
  const savedUser = localStorage.getItem("user_profile");

  return useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    enabled: !!savedUser, 
    initialData: () => {
      return savedUser ? JSON.parse(savedUser) : undefined;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};