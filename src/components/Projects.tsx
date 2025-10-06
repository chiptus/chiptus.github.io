import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { FeaturedProject } from "./FeaturedProject";
import { useProjectsData } from "@/hooks/useProjectsData";

export const Projects = () => {
  const [selectedTech, setSelectedTech] = useState("All");
  const { data, isLoading, error } = useProjectsData();

  if (isLoading) {
    return (
      <section id="projects" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-center font-mono">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id="projects" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-center font-mono text-destructive">Error loading projects</p>
          </div>
        </div>
      </section>
    );
  }

  const { featuredProject, projects, allTechs } = data;
  
  const filteredProjects = selectedTech === "All" 
    ? projects 
    : projects.filter(p => p.tech.some(t => t.includes(selectedTech)));

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground mb-12 font-mono">
            Selected work from 10+ years of development
          </p>

          <FeaturedProject project={featuredProject} />

          <div className="mt-16 mb-8">
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">More Projects</h3>
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
