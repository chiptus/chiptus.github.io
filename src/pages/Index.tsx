import { useLoaderData } from "@tanstack/react-router";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WorkExperience } from "@/components/WorkExperience";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { NowSection } from "@/components/NowSection";
import { BeyondCode } from "@/components/BeyondCode";
import { Projects } from "@/components/Projects";
import { BlogSection } from "@/components/BlogSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getIconComponent } from "@/lib/icon-mapper";

const Index = () => {
  const data = useLoaderData({ from: "/" });

  if (!data || !data.hero) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono">Loading...</p>
      </div>
    );
  }

  const social = data.hero.social;
  const links = social
    ? [
        {
          icon: MailIcon,
          label: "Email",
          value: social.email,
          href: `mailto:${social.email}`,
        },
        {
          icon: GithubIcon,
          label: "GitHub",
          value: social.github.replace("https://", ""),
          href: social.github,
        },
        {
          icon: LinkedinIcon,
          label: "LinkedIn",
          value: social.linkedin.replace("http://", "").replace("https://", ""),
          href: social.linkedin,
        },
      ]
    : [];

  // Map icon strings to components
  const milestonesWithIcons = data.milestones.map((milestone) => ({
    ...milestone,
    icon: getIconComponent(milestone.icon),
  }));

  const interestsWithIcons = data.interests.map((interest) => ({
    ...interest,
    icon: getIconComponent(interest.icon),
  }));

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero hero={data.hero} />
        <WorkExperience workExperience={data.workExperience} />
        <JourneyTimeline milestones={milestonesWithIcons} />
        <NowSection now={data.now} />
        <BeyondCode interests={interestsWithIcons} />
        <Projects projects={data.projects} />
        <BlogSection />
        <Contact links={links} social={social} />
      </main>
      <Footer links={links} />
    </div>
  );
};

export default Index;
