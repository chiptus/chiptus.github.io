import { ProjectCard, type Project } from "./ProjectCard";
import portainerImg from "@/assets/portainer.jpg";
import myplaceImg from "@/assets/myplace.jpg";
import getuplineImg from "@/assets/getupline.jpg";
import cnvrgImg from "@/assets/cnvrg.jpg";
import cobwebsImg from "@/assets/cobwebs.jpg";
import dwarvenRealmsImg from "@/assets/dwarven-realms.jpg";

const projects: Project[] = [
  {
    name: "Portainer",
    description: "Led frontend migration to React for a comprehensive container management platform used by thousands of developers worldwide.",
    tech: ["React", "TypeScript", "Docker", "Kubernetes"],
    link: "https://www.portainer.io",
    image: portainerImg,
  },
  {
    name: "myplace",
    description: "AI-powered bot that helps users build and customize landing pages through natural conversation.",
    tech: ["React", "AI/ML", "Node.js", "WebSockets"],
    image: myplaceImg,
  },
  {
    name: "getupline",
    description: "Festival companion app providing real-time schedules, maps, and social features for event attendees.",
    tech: ["React Native", "Firebase", "Maps API"],
    image: getuplineImg,
  },
  {
    name: "cnvrg.io",
    description: "Enterprise ML operations platform enabling data scientists to build, train, and deploy machine learning models at scale.",
    tech: ["React", "Python", "Kubernetes", "TensorFlow"],
    link: "https://cnvrg.io",
    image: cnvrgImg,
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

export const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
