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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <WorkExperience />
        <JourneyTimeline />
        <NowSection />
        <BeyondCode />
        <Projects />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
