import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const saveToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export function ThemeToggle() {
  return <ClientOnlyThemeToggle />;
}

export const ClientOnlyThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = getFromStorage("theme");
    return (stored as "light" | "dark") || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    saveToStorage("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};
