import { TaskForm } from '@/components/task-form';

export default function NewTaskPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create New Task</h1>
          <p className="text-muted-foreground">Add a new task for your team to work on</p>
        </div>

        <div className="max-w-2xl">
          <TaskForm />
        </div>
      </div>
    </main>
  );
}
