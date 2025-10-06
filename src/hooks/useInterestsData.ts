import { useQuery } from "@tanstack/react-query";
import { Music, Mountain, Coffee, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Music,
  Mountain,
  Coffee,
};

export interface Interest {
  icon: LucideIcon;
  title: string;
  description: string;
}

const fetchInterestsData = async (): Promise<Interest[]> => {
  const response = await fetch("/src/data/interests.json");
  if (!response.ok) {
    throw new Error("Failed to fetch interests data");
  }
  const data = await response.json();
  
  return data.map((interest: { icon: string; title: string; description: string }) => ({
    ...interest,
    icon: iconMap[interest.icon],
  }));
};

export const useInterestsData = () => {
  return useQuery({
    queryKey: ["interests"],
    queryFn: fetchInterestsData,
  });
};
