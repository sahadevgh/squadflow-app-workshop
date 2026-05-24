import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers, Users, Zap, Code2, GitBranch } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-foreground/70">Learn full-stack development</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-balance">
            Master System Architecture <span className="bg-gradient-to-r from-accent to-accent/50 bg-clip-text text-transparent">By Building</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto text-balance">
            SquadFlow is a full-stack workshop app that teaches you how real systems work. Manage tasks, track learner progress, and explore the architecture that powers modern applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-base h-12 px-8">
                Launch Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/system-map">
              <Button variant="outline" size="lg" className="gap-2 text-base h-12 px-8">
                <Code2 className="w-4 h-4" />
                See Architecture
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-foreground/10 bg-foreground/2 hover:border-accent/30 transition-colors">
              <Zap className="w-8 h-8 mb-4 text-accent mx-auto" />
              <h3 className="font-semibold mb-2">Full-Stack Ready</h3>
              <p className="text-sm text-foreground/60">Frontend, backend API, and database - all in one place to learn from.</p>
            </div>

            <div className="p-6 rounded-xl border border-foreground/10 bg-foreground/2 hover:border-accent/30 transition-colors">
              <Users className="w-8 h-8 mb-4 text-accent mx-auto" />
              <h3 className="font-semibold mb-2">Track Learners</h3>
              <p className="text-sm text-foreground/60">Monitor progress of team members and see completion rates in real-time.</p>
            </div>

            <div className="p-6 rounded-xl border border-foreground/10 bg-foreground/2 hover:border-accent/30 transition-colors">
              <Layers className="w-8 h-8 mb-4 text-accent mx-auto" />
              <h3 className="font-semibold mb-2">Understand Layers</h3>
              <p className="text-sm text-foreground/60">See how data flows from UI through APIs to persistence, explained.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-20 px-4 border-t border-foreground/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What You&apos;ll Learn</h2>

          <div className="space-y-6">
            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">API Design Patterns</h3>
                <p className="text-foreground/60">Explore how REST APIs are built with request validation, error handling, and proper HTTP methods.</p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Data Persistence</h3>
                <p className="text-foreground/60">Understand how data flows from the UI through API routes to file-based storage and back.</p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Full-Stack Integration</h3>
                <p className="text-foreground/60">See how frontend components talk to backend routes, with TypeScript types keeping everything safe.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-foreground/60 mb-6">Ready to dive in? Start with the dashboard and explore the codebase.</p>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
