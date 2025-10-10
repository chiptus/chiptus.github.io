import { ExternalLink, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

interface WorkExperienceProps {
  workExperience: {
    experiences: Array<{
      role: string;
      company: string;
      period: string;
      description: string;
      tech: string[];
      image: string;
      link?: string;
      achievements?: string[];
    }>;
  };
}

export const WorkExperience = ({ workExperience }: WorkExperienceProps) => {
  return (
    <section id="work" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground mb-12 font-mono">
            Professional roles & achievements
          </p>

          <div className="space-y-12">
            {workExperience.experiences.map((exp, index) => (
              <article
                key={index}
                className="border-brutal border-foreground bg-card overflow-hidden group"
              >
                <div className="grid md:grid-cols-[300px_1fr] gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <img
                      src={exp.image}
                      alt={`${exp.company} project`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-tight">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground font-mono mb-2">
                          <Briefcase className="h-4 w-4" />
                          <span className="font-semibold">{exp.company}</span>
                          <span>•</span>
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      {exp.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="shrink-0"
                        >
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit
                          </a>
                        </Button>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 uppercase tracking-wide text-sm">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 border-brutal border-foreground bg-background font-mono text-xs uppercase tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
