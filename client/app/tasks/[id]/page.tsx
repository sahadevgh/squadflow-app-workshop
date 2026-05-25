'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TaskForm } from '@/components/task-form';
import { fetchTask } from '@/lib/api-client';
import { toast } from 'sonner';

export default function EditTaskPage() {
  const params = useParams();
  const taskId = params.id as string;
  const [task, setTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTask(taskId);
      setTask(data);
      console.log('Task loaded:', taskId);
    } catch (error) {
      console.error('Error loading task:', error);
      toast.error('Failed to load task');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading task...</p>
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Task not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Task</h1>
          <p className="text-muted-foreground">Update task details and assignments</p>
        </div>

        <div className="max-w-2xl">
          <TaskForm taskId={taskId} initialTask={task} />
        </div>
      </div>
    </main>
  );
}
