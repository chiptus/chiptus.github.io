import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { ProjectsData } from "@/types/data";

interface ProjectsProps {
  projects: ProjectsData;
}

export const Projects = ({ projects: projectsData }: ProjectsProps) => {
  const [selectedTech, setSelectedTech] = useState("All");
  const { projects } = projectsData;

  const allTechs = [
    "All",
    ...Array.from(new Set(projects.flatMap((p) => p.tech))).sort(),
  ];

  const filteredProjects =
    selectedTech === "All"
      ? projects
      : projects.filter((p) => p.tech.some((t) => t.includes(selectedTech)));

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
            Side Projects
          </h2>
          <p className="text-lg text-muted-foreground mb-12 font-mono">
            Personal projects & experiments
          </p>

          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-8">
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 border-brutal border-foreground font-mono text-sm uppercase tracking-wide transition-all ${
                    selectedTech === tech
                      ? "bg-primary text-primary-foreground shadow-brutal"
                      : "bg-background hover:shadow-brutal-hover"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
