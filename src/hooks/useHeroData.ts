import { useQuery } from "@tanstack/react-query";

export interface HeroData {
  name: string;
  title: string;
  skills: string;
  description: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}

const fetchHeroData = async (): Promise<HeroData> => {
  const response = await fetch("/data/hero.json");
  if (!response.ok) {
    throw new Error("Failed to fetch hero data");
  }
  return response.json();
};

export const useHeroData = () => {
  return useQuery({
    queryKey: ["hero"],
    queryFn: fetchHeroData,
  });
};
