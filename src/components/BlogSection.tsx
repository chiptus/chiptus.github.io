import { PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BlogSection = () => {
  return (
    <section id="blog" className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border-brutal border-foreground bg-background p-12 shadow-brutal text-center">
            <div className="w-16 h-16 border-brutal border-foreground bg-background flex items-center justify-center mx-auto mb-6 shadow-brutal">
              <PenTool className="h-8 w-8" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">
              Blog
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 font-mono">
              Coming Soon
            </p>
            
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm planning to write about AI development, React patterns, and lessons learned 
              from 10+ years of building web applications. Subscribe to get notified when I publish.
            </p>

            <Button
              size="lg"
              className="border-brutal border-foreground shadow-brutal hover:shadow-brutal-hover transition-all uppercase tracking-wide"
            >
              Notify Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
