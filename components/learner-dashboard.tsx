'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string[];
}

interface Learner {
  id: string;
  name: string;
  tasksCompleted: number;
  tasksAssigned: number;
}

export function LearnerDashboard({ learnerId }: { learnerId: string }) {
  const [learner, setLearner] = useState<Learner | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLearnerData();
  }, [learnerId]);

  const loadLearnerData = async () => {
    setIsLoading(true);
    try {
      const [learnerRes, tasksRes] = await Promise.all([
        fetch(`/api/learners/${learnerId}/progress`),
        fetch('/api/tasks'),
      ]);

      const learnerData = await learnerRes.json();
      const allTasks = await tasksRes.json();

      // Filter tasks assigned to this learner
      const learnerTasks = allTasks.filter((task: Task) =>
        task.assignedTo.includes(learnerId)
      );

      setLearner(learnerData);
      setTasks(learnerTasks);
    } catch (error) {
      console.error('[v0] Failed to load learner data:', error);
      toast.error('Failed to load your tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update task');

      setTasks(tasks.map(t =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ));

      toast.success(`Task moved to ${newStatus.replace('-', ' ')}`);
    } catch (error) {
      console.error('[v0] Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading your tasks...</p>
      </div>
    );
  }

  if (!learner) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Learner not found</p>
        </CardContent>
      </Card>
    );
  }

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {learner.name}!</h1>
        <p className="text-muted-foreground mt-2">
          You have {todoTasks.length} pending task{todoTasks.length !== 1 ? 's' : ''} and {completedTasks.length} completed.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{todoTasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Waiting to start</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{inProgressTasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently working on</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Well done!</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks by Status */}
      {todoTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">To Do</h2>
          <div className="space-y-3">
            {todoTasks.map(task => (
              <Card key={task.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline" className="capitalize">
                          {task.priority} priority
                        </Badge>
                        {task.dueDate && (
                          <Badge variant="outline" className="text-xs">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, 'in-progress')}
                        className="gap-2"
                      >
                        <Clock className="w-4 h-4" />
                        Start
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {inProgressTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">In Progress</h2>
          <div className="space-y-3">
            {inProgressTasks.map(task => (
              <Card key={task.id} className="border-blue-500/20 bg-blue-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline" className="capitalize">
                          {task.priority} priority
                        </Badge>
                        {task.dueDate && (
                          <Badge variant="outline" className="text-xs">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, 'completed')}
                        className="gap-2"
                        variant="default"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Complete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Completed</h2>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <Card key={task.id} className="border-green-500/20 bg-green-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <h3 className="font-semibold line-through opacity-60">{task.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 opacity-60">{task.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Circle className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="font-semibold">No tasks assigned yet</p>
              <p className="text-sm text-muted-foreground">Check back later for new assignments</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
