import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllTasks, 
  getTaskById, 
  createTask as dbCreateTask, 
  updateTask as dbUpdateTask,
  deleteTask as dbDeleteTask 
} from '@/server/db';

// GET /api/tasks
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');

    const tasks = getAllTasks();
    
    if (status) {
      const filtered = tasks.filter(t => t.status === status);
      return NextResponse.json(filtered);
    }

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('[v0] Error in GET /api/tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, assignedTo, priority, dueDate } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const task = dbCreateTask({
      title,
      description,
      status: 'todo',
      assignedTo: assignedTo || [],
      priority: priority || 'medium',
      dueDate: dueDate || '',
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('[v0] Error in POST /api/tasks:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
