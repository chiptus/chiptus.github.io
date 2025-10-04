import { useState } from "react";
import { ProjectCard, type Project } from "./ProjectCard";
import { FeaturedProject } from "./FeaturedProject";
import portainerImg from "@/assets/portainer.jpg";
import myplaceImg from "@/assets/myplace.jpg";
import getuplineImg from "@/assets/getupline.jpg";
import cnvrgImg from "@/assets/cnvrg.jpg";
import cobwebsImg from "@/assets/cobwebs.jpg";
import dwarvenRealmsImg from "@/assets/dwarven-realms.jpg";

const featuredProject: Project = {
  name: "Portainer",
  description: "Led frontend migration to React for a comprehensive container management platform used by thousands of developers worldwide.",
  tech: ["React", "TypeScript", "Docker", "Kubernetes"],
  link: "https://www.portainer.io",
  image: portainerImg,
  caseStudy: {
    problem: "Legacy AngularJS codebase was becoming difficult to maintain and scale. The team needed to modernize the frontend while maintaining feature parity and zero downtime.",
    solution: "Architected and led a phased migration to React with TypeScript. Implemented a micro-frontend approach allowing gradual migration. Created shared component library and established modern dev practices.",
    impact: ["Reduced bug reports by 40%", "Improved page load times by 60%", "Enabled 3x faster feature development", "Used by 500K+ developers"],
  },
};

const projects: Project[] = [
  {
    name: "myplace",
    description: "AI-powered bot that helps users build and customize landing pages through natural conversation.",
    tech: ["React", "AI/ML", "Node.js", "WebSockets"],
    image: myplaceImg,
  },
  {
    name: "cnvrg.io",
    description: "Enterprise ML operations platform enabling data scientists to build, train, and deploy machine learning models at scale.",
    tech: ["React", "Python", "Kubernetes", "TensorFlow"],
    link: "https://cnvrg.io",
    image: cnvrgImg,
  },
  {
    name: "getupline",
    description: "Festival companion app providing real-time schedules, maps, and social features for event attendees.",
    tech: ["React Native", "Firebase", "Maps API"],
    image: getuplineImg,
  },
  {
    name: "Cobwebs",
    description: "Intelligent web crawler system with machine learning capabilities for data extraction and analysis.",
    tech: ["Node.js", "Python", "ML", "MongoDB"],
    image: cobwebsImg,
  },
  {
    name: "Dwarven Realms",
    description: "Fantasy game development project using Unreal Engine, featuring rich environments and engaging gameplay.",
    tech: ["Unreal Engine", "C++", "Blueprints", "3D Modeling"],
    image: dwarvenRealmsImg,
  },
];

const allTechs = ["All", "React", "TypeScript", "AI/ML", "Python", "Node.js", "Kubernetes"];

export const Projects = () => {
  const [selectedTech, setSelectedTech] = useState("All");

  const filteredProjects = selectedTech === "All" 
    ? projects 
    : projects.filter(p => p.tech.some(t => t.includes(selectedTech)));

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground mb-12 font-mono">
            Selected work from 10+ years of development
          </p>

          <FeaturedProject project={featuredProject} />

          <div className="mt-16 mb-8">
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">More Projects</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 border-brutal border-foreground font-mono text-sm uppercase tracking-wide transition-all ${
                    selectedTech === tech
                      ? "bg-primary text-primary-foreground shadow-brutal"
                      : "bg-background hover:shadow-brutal-hover"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
