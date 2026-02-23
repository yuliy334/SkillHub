import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkills, addSkill } from "../Api/skill/skill.api";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const data = await getSkills();
      return data.skills || [];
    },
  });
};

export const useAddSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillData) => addSkill(skillData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};
