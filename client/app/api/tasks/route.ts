import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL ?? 'http://localhost:8000/api';

// GET /api/tasks
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.toString();
    const backendUrl = query
      ? `${BACKEND_API_BASE_URL}/tasks?${query}`
      : `${BACKEND_API_BASE_URL}/tasks`;
    const res = await fetch(backendUrl, { cache: 'no-store' });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch tasks from server' },
        { status: res.status }
      );
    }

    const tasks = await res.json();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error in GET /api/tasks:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while fetching tasks' },
      { status: 503 }
    );
  }
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      return NextResponse.json(
        { error: errorBody?.error || 'Failed to create task on server' },
        { status: res.status }
      );
    }

    const task = await res.json();
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/tasks:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while creating task' },
      { status: 503 }
    );
  }
}
