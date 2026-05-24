'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRole } from '@/app/context/role-context';
import { TaskList } from '@/components/task-list';
import { LearnerTaskView } from '@/components/learner-task-view';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchTasks, deleteTask, fetchLearners } from '@/lib/api-client';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

export default function TasksPage() {
  const { role, selectedLearnerId } = useRole();
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [learner, setLearner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect learner to dashboard if trying to access tasks page
    if (role === 'learner') {
      router.push('/dashboard');
      return;
    }
    loadTasks();
  }, [role, router]);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
      console.log('[v0] Tasks loaded:', data.length);
    } catch (error) {
      console.error('[v0] Error loading tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('[v0] Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">Manage all team tasks and assignments</p>
          </div>
          <Link href="/tasks/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </Link>
        </div>

        <TaskList tasks={tasks} onDelete={handleDeleteTask} isLoading={isLoading} />
      </div>
    </main>
  );
}
