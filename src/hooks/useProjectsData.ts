import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/components/ProjectCard";
import portainerImg from "@/assets/portainer.jpg";
import myplaceImg from "@/assets/myplace.jpg";
import getuplineImg from "@/assets/getupline.jpg";
import cnvrgImg from "@/assets/cnvrg.jpg";
import cobwebsImg from "@/assets/cobwebs.jpg";
import dwarvenRealmsImg from "@/assets/dwarven-realms.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/portainer.jpg": portainerImg,
  "/src/assets/myplace.jpg": myplaceImg,
  "/src/assets/getupline.jpg": getuplineImg,
  "/src/assets/cnvrg.jpg": cnvrgImg,
  "/src/assets/cobwebs.jpg": cobwebsImg,
  "/src/assets/dwarven-realms.jpg": dwarvenRealmsImg,
};

interface ProjectsData {
  featuredProject: Project;
  projects: Project[];
  allTechs: string[];
}

const fetchProjectsData = async (): Promise<ProjectsData> => {
  const response = await fetch("/data/projects.json");
  if (!response.ok) {
    throw new Error("Failed to fetch projects data");
  }
  const data = await response.json();
  
  return {
    featuredProject: {
      ...data.featuredProject,
      image: imageMap[data.featuredProject.image],
    },
    projects: data.projects.map((project: Project & { image: string }) => ({
      ...project,
      image: imageMap[project.image],
    })),
    allTechs: data.allTechs,
  };
};

export const useProjectsData = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectsData,
  });
};
