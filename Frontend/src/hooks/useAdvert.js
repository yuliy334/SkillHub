import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdvert } from "../Api/advert/advert.api";

export const useCreateAdvert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (advertData) => createAdvert(advertData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adverts"] });
      queryClient.invalidateQueries({ queryKey: ["myAdverts"] });
    },
  });
};
