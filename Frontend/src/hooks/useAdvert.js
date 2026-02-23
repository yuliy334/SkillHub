import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdvert,
  getMyAdverts,
  getAllAdverts,
  getAdvertById,
  createDeal,
  deleteAdvert,
  acceptDeal,
  rejectDeal,
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

export const useAllAdverts = (enabled = true) => {
  return useQuery({
    queryKey: ["adverts"],
    queryFn: async () => {
      const data = await getAllAdverts();
      return data.adverts || [];
    },
    enabled,
  });
};

export const useAdvertById = (advertId, enabled = true) => {
  return useQuery({
    queryKey: ["advert", advertId],
    queryFn: () => getAdvertById(advertId),
    enabled: !!advertId && enabled,
  });
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ advertId, dealData }) => createDeal(advertId, dealData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adverts"] });
      queryClient.invalidateQueries({ queryKey: ["advert", variables.advertId] });
      queryClient.invalidateQueries({ queryKey: ["myAdverts"] });
    },
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

export const useAcceptDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ advertId, dealId }) => acceptDeal(advertId, dealId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAdverts"] });
    },
  });
};

export const useRejectDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ advertId, dealId }) => rejectDeal(advertId, dealId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAdverts"] });
    },
  });
};
