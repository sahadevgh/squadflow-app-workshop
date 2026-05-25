// API client utility for making requests to the Next.js API routes

const API_BASE_URL = '/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function readErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.error === 'string' && data.error.length > 0) {
      return data.error;
    }
  } catch {
    // Ignore non-JSON error bodies and use the fallback message.
  }

  return `${fallback} (${res.status})`;
}

// ============ TASKS ============

export async function fetchTasks(status?: string): Promise<any[]> {
  try {
    const url = status ? `${API_BASE_URL}/tasks?status=${status}` : `${API_BASE_URL}/tasks`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to fetch tasks'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error fetching tasks:', error);
    throw error;
  }
}

export async function fetchTask(id: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to fetch task'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error fetching task:', error);
    throw error;
  }
}

export async function createTask(task: {
  title: string;
  description: string;
  assignedTo?: string[];
  priority?: string;
  dueDate?: string;
}): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to create task'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error creating task:', error);
    throw error;
  }
}

export async function updateTask(id: string, updates: Partial<any>): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to update task'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to delete task'));
  } catch (error) {
    console.error('[v0] Error deleting task:', error);
    throw error;
  }
}

// ============ LEARNERS ============

export async function fetchLearners(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/learners`);
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to fetch learners'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error fetching learners:', error);
    throw error;
  }
}

export async function fetchLearner(id: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/learners/${id}`);
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to fetch learner'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error fetching learner:', error);
    throw error;
  }
}

export async function fetchLearnerProgress(id: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/learners/${id}/progress`);
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to fetch learner progress'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error fetching learner progress:', error);
    throw error;
  }
}

export async function createLearner(learner: {
  name: string;
  email: string;
}): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/learners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(learner),
    });
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to create learner'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error creating learner:', error);
    throw error;
  }
}

// ============ DASHBOARD ============

export async function fetchDashboardSummary(): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/summary`);
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to fetch dashboard summary'));
    return res.json();
  } catch (error) {
    console.error('[v0] Error fetching dashboard summary:', error);
    throw error;
  }
}
