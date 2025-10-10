import {
  Terminal,
  Brain,
  Rocket,
  Sparkles,
  Code,
  Heart,
  Camera,
  Mountain,
  Book,
  Briefcase,
  Music,
  Coffee,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  Brain,
  Rocket,
  Sparkles,
  Code,
  Heart,
  Camera,
  Mountain,
  Book,
  Briefcase,
  Music,
  Coffee,
};

export function getIconComponent(iconName: string): LucideIcon {
  const icon = iconMap[iconName];
  if (!icon) {
    console.warn(`Icon "${iconName}" not found, using default`);
    return Code; // fallback icon
  }
  return icon;
}
