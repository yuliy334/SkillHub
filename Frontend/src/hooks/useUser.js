import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../Api/user/user.api";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => updateUser(userData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      const savedUser = JSON.parse(localStorage.getItem("user_profile") || "{}");
      localStorage.setItem(
        "user_profile",
        JSON.stringify({ ...savedUser, ...variables })
      );
    },
  });
};
