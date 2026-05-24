import { SystemDiagram } from '@/components/system-diagram';

export default function SystemMapPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">System Architecture</h1>
          <p className="text-muted-foreground">Understanding SquadFlow&apos;s architecture and how data flows through the system</p>
        </div>

        <SystemDiagram />
      </div>
    </main>
  );
}
