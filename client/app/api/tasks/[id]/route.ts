import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL ?? 'http://localhost:8000/api';

// GET /api/tasks/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const res = await fetch(`${BACKEND_API_BASE_URL}/tasks/${id}`, { cache: 'no-store' });

    if (res.status === 404) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch task from server' },
        { status: res.status }
      );
    }

    const task = await res.json();
    return NextResponse.json(task);
  } catch (error) {
    console.error('[v0] Error in GET /api/tasks/:id:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while fetching task' },
      { status: 503 }
    );
  }
}

// PUT /api/tasks/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const res = await fetch(`${BACKEND_API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 404) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to update task on server' },
        { status: res.status }
      );
    }

    const task = await res.json();
    return NextResponse.json(task);
  } catch (error) {
    console.error('[v0] Error in PUT /api/tasks/:id:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while updating task' },
      { status: 503 }
    );
  }
}

// DELETE /api/tasks/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const res = await fetch(`${BACKEND_API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });

    if (res.status === 404) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to delete task on server' },
        { status: res.status }
      );
    }

    const data = await res.json().catch(() => ({ success: true, id }));
    return NextResponse.json(data);
  } catch (error) {
    console.error('[v0] Error in DELETE /api/tasks/:id:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while deleting task' },
      { status: 503 }
    );
  }
}
