import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignedTo: string[];
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Learner {
  id: string;
  name: string;
  email: string;
  tasksCompleted: number;
  tasksAssigned: number;
  joinDate: string;
}

export interface Database {
  tasks: Task[];
  learners: Learner[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '..', '..', 'database', 'data.json');

function normalizeDatabase(data: unknown): Database {
  const candidate = (data && typeof data === 'object') ? (data as Partial<Database>) : {};

  return {
    tasks: Array.isArray(candidate.tasks) ? candidate.tasks : [],
    learners: Array.isArray(candidate.learners) ? candidate.learners : [],
  };
}

// Initialize or read database
function initializeDB(): Database {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      return normalizeDatabase(JSON.parse(data));
    }
  } catch {
    console.log('Could not read existing database, creating new one');
  }

  // Return empty database
  return { tasks: [], learners: [] };
}

// Save database to file
export function saveDB(db: Database): void {
  const normalized = normalizeDatabase(db);
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(normalized, null, 2));
  console.log('Database saved to', DB_PATH);
}

// Get all data
let db = initializeDB();

export function getDatabase(): Database {
  return db;
}

export function setDatabase(newDb: Database): void {
  db = normalizeDatabase(newDb);
  saveDB(db);
}

// Task operations
export function getAllTasks(): Task[] {
  return db.tasks;
}

export function getTaskById(id: string): Task | undefined {
  return db.tasks.find(task => task.id === id);
}

export function createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
  const newTask: Task = {
    ...task,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.tasks.push(newTask);
  saveDB(db);
  console.log('Task created:', newTask.id);
  return newTask;
}

export function updateTask(id: string, updates: Partial<Task>): Task | undefined {
  const task = db.tasks.find(t => t.id === id);
  if (!task) return undefined;

  const updated = {
    ...task,
    ...updates,
    id: task.id, // prevent id change
    createdAt: task.createdAt, // prevent createdAt change
    updatedAt: new Date().toISOString(),
  };

  const index = db.tasks.findIndex(t => t.id === id);
  db.tasks[index] = updated;
  saveDB(db);
  console.log('Task updated:', id);
  return updated;
}

export function deleteTask(id: string): boolean {
  const index = db.tasks.findIndex(t => t.id === id);
  if (index === -1) return false;

  db.tasks.splice(index, 1);
  saveDB(db);
  console.log('Task deleted:', id);
  return true;
}

// Learner operations
export function getAllLearners(): Learner[] {
  return db.learners;
}

export function getLearnerById(id: string): Learner | undefined {
  return db.learners.find(learner => learner.id === id);
}

export function createLearner(learner: Omit<Learner, 'id' | 'joinDate'>): Learner {
  const newLearner: Learner = {
    ...learner,
    id: uuidv4(),
    joinDate: new Date().toISOString(),
  };
  db.learners.push(newLearner);
  saveDB(db);
  console.log('Learner created:', newLearner.id);
  return newLearner;
}

// Calculate learner progress
export function getLearnerProgress(learnerId: string) {
  const learner = db.learners.find(l => l.id === learnerId);
  if (!learner) return null;

  const assignedTasks = db.tasks.filter((task) =>
    Array.isArray(task.assignedTo) && task.assignedTo.includes(learnerId)
  );
  const completedTasks = assignedTasks.filter(t => t.status === 'completed');
  const inProgressTasks = assignedTasks.filter(t => t.status === 'in-progress');

  return {
    ...learner,
    assignedTasks: assignedTasks.length,
    completedTasks: completedTasks.length,
    inProgressTasks: inProgressTasks.length,
    completionRate: assignedTasks.length > 0
      ? Math.round((completedTasks.length / assignedTasks.length) * 100)
      : 0,
  };
}

// Dashboard summary
export function getDashboardSummary() {
  const allTasks = db.tasks;
  const completedTasks = allTasks.filter(t => t.status === 'completed');
  const inProgressTasks = allTasks.filter(t => t.status === 'in-progress');
  const todoTasks = allTasks.filter(t => t.status === 'todo');

  return {
    totalTasks: allTasks.length,
    completedTasks: completedTasks.length,
    inProgressTasks: inProgressTasks.length,
    todoTasks: todoTasks.length,
    totalLearners: db.learners.length,
    completionRate: allTasks.length > 0
      ? Math.round((completedTasks.length / allTasks.length) * 100)
      : 0,
  };
}
