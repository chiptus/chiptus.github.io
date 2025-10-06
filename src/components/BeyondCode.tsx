import { useInterestsData } from "@/hooks/useInterestsData";

export const BeyondCode = () => {
  const { data: interests, isLoading, error } = useInterestsData();

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-center font-mono">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !interests) {
    return null;
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
            Beyond Code
          </h2>
          <p className="text-lg text-muted-foreground mb-12 font-mono">
            What makes me tick outside of development
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="border-brutal border-foreground bg-background p-6 shadow-brutal hover:shadow-brutal-hover transition-all"
              >
                <div className="w-12 h-12 border-brutal border-foreground bg-primary/10 flex items-center justify-center mb-4">
                  <interest.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-2 uppercase tracking-tight">
                  {interest.title}
                </h3>
                <p className="text-muted-foreground">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
