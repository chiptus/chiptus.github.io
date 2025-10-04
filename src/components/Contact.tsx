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
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            I'm currently seeking opportunities in AI, education, or health sectors. 
            Feel free to reach out if you'd like to connect!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-card p-6 rounded-lg shadow-smooth hover-lift hover-glow transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <link.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{link.label}</h3>
                <p className="text-sm text-muted-foreground">{link.value}</p>
              </a>
            ))}
          </div>

          <Button
            size="lg"
            asChild
            className="shadow-glow"
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
