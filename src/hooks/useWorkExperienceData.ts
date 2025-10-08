import { useQuery } from "@tanstack/react-query";
import portainerImg from "@/assets/portainer.jpg";
import cnvrgImg from "@/assets/cnvrg.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/portainer.jpg": portainerImg,
  "/src/assets/cnvrg.jpg": cnvrgImg,
};

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  tech: string[];
  link?: string;
  image: string;
}

interface WorkExperienceData {
  experiences: WorkExperience[];
}

const fetchWorkExperienceData = async (): Promise<WorkExperienceData> => {
  const response = await fetch("/data/work-experience.json");
  if (!response.ok) {
    throw new Error("Failed to fetch work experience data");
  }
  const data = await response.json();
  
  return {
    experiences: data.experiences.map((exp: WorkExperience & { image: string }) => ({
      ...exp,
      image: imageMap[exp.image],
    })),
  };
};

export const useWorkExperienceData = () => {
  return useQuery({
    queryKey: ["work-experience"],
    queryFn: fetchWorkExperienceData,
  });
};
