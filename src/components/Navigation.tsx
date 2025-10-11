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
          <a
            href="#home"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            CL
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Journey
            </a>
            <a
              href="#now"
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Now
            </a>
            <a
              href="#projects"
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Projects
            </a>
            {/* <a
              href="#blog"
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Blog
            </a> */}
            <a
              href="#contact"
              className="font-mono text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
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
