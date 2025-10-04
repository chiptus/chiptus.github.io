import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image: string;
  caseStudy?: {
    problem: string;
    solution: string;
    impact: string[];
  };
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group bg-background border-brutal border-foreground shadow-brutal hover:shadow-brutal-hover transition-all overflow-hidden">
      <div className="aspect-video overflow-hidden border-b-brutal border-foreground">
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight">{project.name}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs border-brutal border-foreground bg-background font-mono uppercase"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.link && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="border-brutal border-foreground uppercase tracking-wide text-xs"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Visit
              </a>
            </Button>
          )}
          {project.github && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="border-brutal border-foreground uppercase tracking-wide text-xs"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
