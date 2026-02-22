import { useQuery } from "@tanstack/react-query";
import { getSkills } from "../Api/skill/skill.api";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const data = await getSkills();
      return data.skills || [];
    },
  });
};
