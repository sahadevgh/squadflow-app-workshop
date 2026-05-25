'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRole } from '@/app/context/role-context';
import { DashboardCards } from '@/components/dashboard-cards';
import { TaskList } from '@/components/task-list';
import { LearnerDashboard } from '@/components/learner-dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { fetchDashboardSummary, fetchTasks, deleteTask } from '@/lib/api-client';
import { toast } from 'sonner';

export default function Dashboard() {
  const { role, selectedLearnerId } = useRole();
  const [summary, setSummary] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [summaryData, tasksData] = await Promise.all([
        fetchDashboardSummary(),
        fetchTasks(),
      ]);
      setSummary(summaryData);
      setTasks(tasksData);
      console.log('Dashboard data loaded');
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
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
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  // Show learner dashboard if in learner mode
  if (role === 'learner' && selectedLearnerId) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <LearnerDashboard learnerId={selectedLearnerId} />
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Workshop Dashboard</h1>
          <p className="text-muted-foreground">Welcome to SquadFlow - Your team task & learner progress tracker</p>
        </div>

        {summary && (
          <div className="mb-8">
            <DashboardCards
              totalTasks={summary.totalTasks}
              completedTasks={summary.completedTasks}
              inProgressTasks={summary.inProgressTasks}
              todoTasks={summary.todoTasks}
              totalLearners={summary.totalLearners}
              completionRate={summary.completionRate}
            />
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Recent Tasks</h2>
            <Link href="/tasks/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </Link>
          </div>

          {tasks.length > 0 ? (
            <TaskList tasks={tasks.slice(0, 5)} onDelete={handleDeleteTask} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No tasks yet. Create one to get started!</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mb-8">
          <Link href="/tasks">
            <Button variant="outline" className="w-full">
              View All Tasks
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
