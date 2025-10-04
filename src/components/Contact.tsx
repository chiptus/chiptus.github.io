import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "chiptus@gmail.com",
      href: "mailto:chiptus@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/chiptus",
      href: "https://github.com/chiptus",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/chiptus",
      href: "http://linkedin.com/in/chiptus",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground mb-12 font-mono">
            Open to opportunities in AI, education, or health sectors
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-background border-brutal border-foreground p-6 shadow-brutal hover:shadow-brutal-hover transition-all group"
              >
                <div className="w-12 h-12 border-brutal border-foreground bg-background flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/10 transition-colors">
                  <link.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2 uppercase tracking-tight">{link.label}</h3>
                <p className="text-sm text-muted-foreground font-mono">{link.value}</p>
              </a>
            ))}
          </div>

          <Button
            size="lg"
            asChild
            className="border-brutal border-foreground shadow-brutal hover:shadow-brutal-hover transition-all uppercase tracking-wide w-full md:w-auto"
          >
            <a href="mailto:chiptus@gmail.com">
              Send Me a Message
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
