import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdvert,
  getMyAdverts,
  deleteAdvert,
} from "../Api/advert/advert.api";

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

export const useMyAdverts = (enabled = true) => {
  return useQuery({
    queryKey: ["myAdverts"],
    queryFn: async () => {
      const data = await getMyAdverts();
      return data.adverts || [];
    },
    enabled,
  });
};

export const useDeleteAdvert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (advertId) => deleteAdvert(advertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adverts"] });
      queryClient.invalidateQueries({ queryKey: ["myAdverts"] });
    },
  });
};
