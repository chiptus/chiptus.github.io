import { ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Project } from "./ProjectCard";

interface FeaturedProjectProps {
  project: Project;
}

export const FeaturedProject = ({ project }: FeaturedProjectProps) => {
  if (!project.caseStudy) return null;

  return (
    <article className="bg-background border-brutal border-foreground shadow-brutal p-8 mb-16">
      <div className="inline-block px-3 py-1 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wide mb-6">
        Featured Case Study
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-video overflow-hidden border-brutal border-foreground mb-6">
            <img
              src={project.image}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-3xl font-bold mb-4 uppercase tracking-tight">{project.name}</h3>
          
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

          {project.link && (
            <Button
              asChild
              className="border-brutal border-foreground shadow-brutal hover:shadow-brutal-hover transition-all uppercase tracking-wide"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Project
              </a>
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">Problem</h4>
            <p className="text-muted-foreground">{project.caseStudy.problem}</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">Solution</h4>
            <p className="text-muted-foreground">{project.caseStudy.solution}</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3 uppercase tracking-tight">Impact</h4>
            <ul className="space-y-2">
              {project.caseStudy.impact.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};
