import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = "October 2025";
  const techStack = ["React", "TypeScript", "Tailwind", "Three.js"];

  return (
    <footer className="py-12 border-t-brutal border-foreground bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 uppercase tracking-tight">Built With</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs border-brutal border-foreground bg-background font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-mono">
                Last updated: {lastUpdated}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/chiptus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="http://linkedin.com/in/chiptus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:chiptus@gmail.com"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              
            </div>
          </div>

          <div className="border-t-brutal border-foreground pt-6 text-center">
            <p className="text-muted-foreground font-mono text-sm">
              © {currentYear} Chaim Lev-Ari
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
