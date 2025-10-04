import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group bg-card rounded-lg shadow-smooth overflow-hidden hover-lift hover-glow transition-all">
      <div className="aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-3">{project.name}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
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
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Site
              </a>
            </Button>
          )}
          {project.github && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
