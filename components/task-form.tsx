'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { createTask, updateTask, fetchLearners } from '@/lib/api-client';
import { toast } from 'sonner';

interface TaskFormProps {
  taskId?: string;
  initialTask?: {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    assignedTo: string[];
  };
  onSuccess?: () => void;
}

export function TaskForm({ taskId, initialTask, onSuccess }: TaskFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    status: initialTask?.status || 'todo',
    priority: initialTask?.priority || 'medium',
    dueDate: initialTask?.dueDate || '',
    assignedTo: initialTask?.assignedTo || [],
  });
  const [learners, setLearners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchLearners()
      .then(setLearners)
      .catch((error) => {
        console.error('[v0] Error fetching learners:', error);
        toast.error('Failed to load learners');
      })
      .finally(() => setIsFetching(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLearnerToggle = (learnerId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(learnerId)
        ? prev.assignedTo.filter(id => id !== learnerId)
        : [...prev.assignedTo, learnerId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      if (taskId) {
        await updateTask(taskId, formData);
        toast.success('Task updated successfully!');
      } else {
        await createTask(formData);
        toast.success('Task created successfully!');
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/tasks');
      }
    } catch (error) {
      console.error('[v0] Error saving task:', error);
      toast.error(taskId ? 'Failed to update task' : 'Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{taskId ? 'Edit Task' : 'Create New Task'}</CardTitle>
        <CardDescription>
          {taskId ? 'Update task details and assignments' : 'Create a new task for your team'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Learn React Hooks"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what needs to be done..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <Label>Assign to Learners</Label>
            {isFetching ? (
              <p className="text-sm text-muted-foreground">Loading learners...</p>
            ) : learners.length === 0 ? (
              <p className="text-sm text-muted-foreground">No learners available</p>
            ) : (
              <div className="space-y-2">
                {learners.map(learner => (
                  <div key={learner.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={learner.id}
                      checked={formData.assignedTo.includes(learner.id)}
                      onCheckedChange={() => handleLearnerToggle(learner.id)}
                    />
                    <Label htmlFor={learner.id} className="font-normal cursor-pointer">
                      {learner.name} ({learner.email})
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : taskId ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
