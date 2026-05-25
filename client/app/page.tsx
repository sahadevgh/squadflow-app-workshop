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
            Manage Workshop Tasks <span className="bg-gradient-to-r from-accent to-accent/50 bg-clip-text text-transparent">and Learner Progress</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto text-balance">
            SquadFlow helps teams organize tasks, track learner progress, and collaborate on workshop projects. A complete task management system built with modern full-stack technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-base h-12 px-8">
                Launch Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/tasks">
              <Button variant="outline" size="lg" className="gap-2 text-base h-12 px-8">
                <Code2 className="w-4 h-4" />
                View All Tasks
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-foreground/10 bg-foreground/2 hover:border-accent/30 transition-colors">
              <Zap className="w-8 h-8 mb-4 text-accent mx-auto" />
              <h3 className="font-semibold mb-2">Manage Tasks</h3>
              <p className="text-sm text-foreground/60">Create, assign, and track tasks with priority levels, status updates, and real-time progress.</p>
            </div>

            <div className="p-6 rounded-xl border border-foreground/10 bg-foreground/2 hover:border-accent/30 transition-colors">
              <Users className="w-8 h-8 mb-4 text-accent mx-auto" />
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-foreground/60">Monitor learner completion rates and see who&apos;s working on what at a glance.</p>
            </div>

            <div className="p-6 rounded-xl border border-foreground/10 bg-foreground/2 hover:border-accent/30 transition-colors">
              <Layers className="w-8 h-8 mb-4 text-accent mx-auto" />
              <h3 className="font-semibold mb-2">Inspect Code</h3>
              <p className="text-sm text-foreground/60">Explore the full-stack codebase and see how modern web applications are structured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-foreground/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Core Features</h2>

          <div className="space-y-6">
            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Task Management</h3>
                <p className="text-foreground/60">Create, edit, and delete tasks. Set priority levels, track status (todo, in progress, completed), and search across all tasks instantly.</p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Learner Tracking</h3>
                <p className="text-foreground/60">View all team members and their progress. See completion rates, assigned tasks, and individual performance at a glance.</p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Dashboard Overview</h3>
                <p className="text-foreground/60">Get a quick summary of key metrics: total tasks, completed tasks, team members, and overall completion rate in one view.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-foreground/10">
            <h3 className="text-2xl font-bold mb-6 text-center">Built with Modern Tech</h3>
            <p className="text-center text-foreground/60 mb-8 max-w-2xl mx-auto">
              SquadFlow is a complete, real-world application built with Next.js, React, TypeScript, and file-based storage. Explore the source code, understand API design, and see how data flows through a full-stack system.
            </p>
            <div className="flex justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Start Using SquadFlow
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
