'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface LearnerProgressProps {
  name: string;
  email: string;
  assignedTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  completionRate: number;
}

export function LearnerProgress({
  name,
  email,
  assignedTasks,
  completedTasks,
  inProgressTasks,
  completionRate,
}: LearnerProgressProps) {
  const pendingTasks = assignedTasks - completedTasks - inProgressTasks;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{email}</CardDescription>
          </div>
          <Badge variant="outline">{completionRate}%</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold">{completedTasks} of {assignedTasks} completed</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <p className="text-lg font-semibold">{completedTasks}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-muted-foreground">In Progress</span>
            </div>
            <p className="text-lg font-semibold">{inProgressTasks}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <p className="text-lg font-semibold">{pendingTasks}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
