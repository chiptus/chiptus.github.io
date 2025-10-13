import {
  CheckCircle2Icon,
  ExternalLink,
  FileTextIcon,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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
        <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight">
          {project.name}
        </h3>
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

        {/* <CaseStudy caseStudy={project.caseStudy} /> */}

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

function CaseStudy({ caseStudy }: { caseStudy: Project["caseStudy"] }) {
  if (!caseStudy) return null;

  return (
    <Accordion type="single" collapsible className="w-full relative mb-6">
      <AccordionItem value="case-study" className="border-0">
        <AccordionTrigger>
          <FileTextIcon /> View Case Study
        </AccordionTrigger>

        <AccordionContent className="absolute bg-white">
          <section>
            <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">
              Problem
            </h4>
            <p className="text-muted-foreground mb-4">{caseStudy.problem}</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">
              Solution
            </h4>
            <p className="text-muted-foreground mb-4">{caseStudy.solution}</p>
          </section>

          <section>
            <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">
              Impact
            </h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-3">
              {caseStudy.impact.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2Icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
