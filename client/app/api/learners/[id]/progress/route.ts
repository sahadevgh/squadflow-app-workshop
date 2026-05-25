import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL ?? 'http://localhost:8000/api';

// GET /api/learners/:id/progress
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const res = await fetch(`${BACKEND_API_BASE_URL}/learners/${id}/progress`, { cache: 'no-store' });
    if (res.status === 404) {
      return NextResponse.json(
        { error: 'Learner not found' },
        { status: 404 }
      );
    }
    if (!res.ok) {
      throw new Error('Failed to fetch learner progress from server');
    }
    const progress = await res.json();
    return NextResponse.json(progress);
  } catch (error) {
    console.error('[v0] Error in GET /api/learners/:id/progress:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while fetching learner progress' },
      { status: 503 }
    );
  }
}
