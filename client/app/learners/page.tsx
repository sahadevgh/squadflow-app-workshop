'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/app/context/role-context';
import { LearnerProgress } from '@/components/learner-progress';
import { createLearner, fetchLearners, fetchLearnerProgress } from '@/lib/api-client';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

export default function LearnersPage() {
  const { role } = useRole();
  const router = useRouter();
  const [learners, setLearners] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<Map<string, any>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    // Redirect learner to dashboard if trying to access learners page
    if (role === 'learner') {
      router.replace('/dashboard');
      return;
    }
    loadLearners();
  }, [role, router]);

  const loadLearners = async () => {
    setIsLoading(true);
    try {
      const learnersData = await fetchLearners();
      setLearners(learnersData);
      
      // Load progress for each learner
      const progress = new Map();
      for (const learner of learnersData) {
        try {
          const learnerProgress = await fetchLearnerProgress(learner.id);
          progress.set(learner.id, learnerProgress);
        } catch (error) {
          console.error('[v0] Error loading progress for learner:', learner.id);
        }
      }
      setProgressData(progress);
      console.log('[v0] Learners loaded:', learnersData.length);
    } catch (error) {
      console.error('[v0] Error loading learners:', error);
      toast.error('Failed to load learners');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLearner = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await createLearner({
        name: formData.name.trim(),
        email: formData.email.trim(),
      });
      toast.success('Learner created successfully');
      setFormData({ name: '', email: '' });
      setIsCreateOpen(false);
      await loadLearners();
    } catch (error) {
      console.error('[v0] Error creating learner:', error);
      toast.error('Failed to create learner');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading learners...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Learner Progress</h1>
            <p className="text-muted-foreground">Track the progress of all workshop participants</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="shrink-0">
                <Plus className="mr-2 h-4 w-4" />
                Add Learner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Learner</DialogTitle>
                <DialogDescription>
                  Create a learner profile so they can be assigned tasks and tracked on this page.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <Input
                  placeholder="Learner name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  type="email"
                  placeholder="Learner email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button onClick={handleCreateLearner} disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Learner'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {learners.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No learners yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {learners.map(learner => {
              const progress = progressData.get(learner.id);
              if (!progress) return null;

              return (
                <LearnerProgress
                  key={learner.id}
                  name={progress.name}
                  email={progress.email}
                  assignedTasks={progress.assignedTasks}
                  completedTasks={progress.completedTasks}
                  inProgressTasks={progress.inProgressTasks}
                  completionRate={progress.completionRate}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
