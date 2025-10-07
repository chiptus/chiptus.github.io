import { useQuery } from "@tanstack/react-query";
import { Terminal, Rocket, Brain, Briefcase, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  Rocket,
  Brain,
  Briefcase,
};

export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const fetchMilestonesData = async (): Promise<Milestone[]> => {
  const response = await fetch("/data/milestones.json");
  if (!response.ok) {
    throw new Error("Failed to fetch milestones data");
  }
  const data = await response.json();
  
  return data.map((milestone: { year: string; title: string; description: string; icon: string }) => ({
    ...milestone,
    icon: iconMap[milestone.icon],
  }));
};

export const useMilestonesData = () => {
  return useQuery({
    queryKey: ["milestones"],
    queryFn: fetchMilestonesData,
  });
};
