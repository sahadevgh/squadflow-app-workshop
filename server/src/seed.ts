import { createTask, createLearner } from './db.js';

export function seedDatabase() {
  console.log('[v0] Seeding database with sample data...');

  // Create learners
  const learner1 = createLearner({
    name: 'Aabidat Aliu',
    email: 'dawuni@example.com',
    tasksCompleted: 3,
    tasksAssigned: 5,
  });

  const learner2 = createLearner({
    name: 'Elijah Dokorugu',
    email: 'elijah@example.com',
    tasksCompleted: 2,
    tasksAssigned: 4,
  });

  const learner3 = createLearner({
    name: 'Usman Maryam',
    email: 'usman@example.com',
    tasksCompleted: 1,
    tasksAssigned: 3,
  });

  // Create tasks
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  createTask({
    title: 'Setup development environment',
    description: 'Install Node.js, npm, and VS Code',
    status: 'completed',
    assignedTo: [learner1.id],
    priority: 'high',
    dueDate: now.toISOString().split('T')[0],
  });

  createTask({
    title: 'Learn React fundamentals',
    description: 'Study components, props, and hooks',
    status: 'in-progress',
    assignedTo: [learner1.id, learner2.id],
    priority: 'high',
    dueDate: tomorrow.toISOString().split('T')[0],
  });

  createTask({
    title: 'Build a todo list app',
    description: 'Create a simple todo app with React',
    status: 'todo',
    assignedTo: [learner1.id, learner2.id, learner3.id],
    priority: 'medium',
    dueDate: nextWeek.toISOString().split('T')[0],
  });

  createTask({
    title: 'Understand REST APIs',
    description: 'Learn how to make API calls from React',
    status: 'completed',
    assignedTo: [learner2.id],
    priority: 'medium',
    dueDate: now.toISOString().split('T')[0],
  });

  createTask({
    title: 'Deploy app to Vercel',
    description: 'Learn how to deploy Next.js apps',
    status: 'todo',
    assignedTo: [learner3.id],
    priority: 'low',
    dueDate: nextWeek.toISOString().split('T')[0],
  });

  createTask({
    title: 'Study TypeScript basics',
    description: 'Learn types, interfaces, and generics',
    status: 'in-progress',
    assignedTo: [learner2.id, learner3.id],
    priority: 'medium',
    dueDate: tomorrow.toISOString().split('T')[0],
  });

  createTask({
    title: 'Review code best practices',
    description: 'Learn about clean code and design patterns',
    status: 'todo',
    assignedTo: [learner1.id],
    priority: 'low',
    dueDate: nextWeek.toISOString().split('T')[0],
  });

  console.log('[v0] Database seeding complete!');
}
