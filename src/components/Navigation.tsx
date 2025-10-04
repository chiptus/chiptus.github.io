import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-smooth"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            CL
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Journey
            </button>
            <button
              onClick={() => scrollToSection("now")}
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Now
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
