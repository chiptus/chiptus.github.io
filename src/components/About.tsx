import { Code2, Laptop, Lightbulb } from "lucide-react";

export const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Expertise",
      description: "Proficient in React, TypeScript, Node.js, and modern web frameworks",
    },
    {
      icon: Laptop,
      title: "10+ Years Experience",
      description: "Led multiple successful projects from concept to production",
    },
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "Passionate about AI, education technology, and health solutions",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About Me
          </h2>

          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            I'm a full-stack developer with over a decade of experience building 
            innovative web applications. My expertise spans from leading frontend 
            migrations to developing complex ML operations platforms. Currently seeking 
            opportunities in AI, education, or health sectors where I can make a 
            meaningful impact.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-smooth hover-lift hover-glow transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
