import React from "react";

interface JourneyTimelineProps {
  milestones: Array<{
    year: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export const JourneyTimeline = ({ milestones }: JourneyTimelineProps) => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
            Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-16 font-mono">
            10+ years of building things that matter
          </p>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-brutal border-foreground bg-background flex items-center justify-center shadow-brutal group-hover:shadow-brutal-hover transition-all">
                    <milestone.icon className="h-8 w-8" />
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-4" />
                  )}
                </div>

                <div className="flex-1 pb-12">
                  <div className="font-mono text-sm text-muted-foreground mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
