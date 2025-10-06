import { Sparkles, MapPin, Calendar } from "lucide-react";
import { useNowData } from "@/hooks/useNowData";

export const NowSection = () => {
  const { data, isLoading, error } = useNowData();

  if (isLoading) {
    return (
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-center font-mono">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return null;
  }

  const { lastUpdated, currentWork, learning, status } = data;
  
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border-brutal border-foreground bg-background p-8 shadow-brutal">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-4xl font-bold uppercase tracking-tight flex items-center gap-3">
                <Sparkles className="h-8 w-8" />
                Now
              </h2>
              <div className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {lastUpdated}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-2 uppercase tracking-tight">Currently Working On</h3>
                <p className="text-muted-foreground">
                  {currentWork}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2 uppercase tracking-tight">Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {learning.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border-brutal border-foreground bg-background font-mono text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-2 uppercase tracking-tight flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Status
                </h3>
                <p className="text-muted-foreground">
                  {status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
