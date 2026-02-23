import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSchedule,
  addScheduleSlot,
  deleteScheduleSlot,
  updateScheduleSlot,
} from "../Api/schedule/schedule.api";

export const useSchedule = (enabled = true) => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: getSchedule,
    enabled,
  });
};

export const useAddScheduleSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ start, end }) => addScheduleSlot(start, end),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};

export const useDeleteScheduleSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteScheduleSlot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};

export const useUpdateScheduleSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, start, end }) => updateScheduleSlot(id, start, end),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
};
