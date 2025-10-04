import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scene3D } from "./Scene3D";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-pattern"
    >
      <Scene3D />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <div className="font-mono text-sm text-muted-foreground mb-4">
              $ whoami
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
              Chaim Lev-Ari
            </h1>
            <div className="border-l-4 border-primary pl-6 mb-8">
              <p className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-tight">
                Full-Stack Developer
              </p>
              <p className="text-lg text-muted-foreground font-mono">
                React • TypeScript • AI/ML • 10+ years
              </p>
            </div>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Building scalable applications at the intersection of AI, education, and health tech. 
              Led major frontend migrations and developed ML platforms used by thousands.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="border-brutal border-foreground shadow-brutal hover:shadow-brutal-hover transition-all uppercase tracking-wide"
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-brutal border-foreground uppercase tracking-wide"
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/chiptus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="http://linkedin.com/in/chiptus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:chiptus@gmail.com"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
