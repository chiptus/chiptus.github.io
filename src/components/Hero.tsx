import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scene3D } from "./Scene3D";
import type { HeroData } from "@/types/data";

interface HeroProps {
  hero: HeroData;
}

export const Hero = ({ hero }: HeroProps) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <Scene3D />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
              {hero.name}
            </h1>
            <div className="border-l-4 border-primary pl-6 mb-8">
              <p className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-tight">
                {hero.title}
              </p>
              <p className="text-lg text-muted-foreground font-mono">
                {hero.skills}
              </p>
            </div>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="border-brutal border-foreground shadow-brutal hover:shadow-brutal-hover transition-all uppercase tracking-wide"
            >
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brutal border-foreground uppercase tracking-wide"
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={hero.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={hero.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${hero.social.email}`}
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
