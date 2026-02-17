import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { register, logIn, logOut, refresh } from "../Api/auth/auth.api";

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => register(userData),
    onSuccess: (data) => {
      console.log("Registered successfully", data);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) => logIn(credentials),
    onSuccess: (userData) => {
      localStorage.setItem("user_profile", JSON.stringify(userData.account));
      queryClient.setQueryData(["user"], userData.account);
        
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      localStorage.removeItem("user_profile");

      queryClient.setQueryData(["user"], null);
      
      queryClient.clear();
      
      console.log("Logged out successfully");
    },
  });
};

export const useRefresh = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: refresh,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
