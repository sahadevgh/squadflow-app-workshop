import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL ?? 'http://localhost:8000/api';

// GET /api/learners/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const res = await fetch(`${BACKEND_API_BASE_URL}/learners/${id}`, { cache: 'no-store' });

    if (res.status === 404) {
      return NextResponse.json(
        { error: 'Learner not found' },
        { status: 404 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch learner from server' },
        { status: res.status }
      );
    }

    const learner = await res.json();
    return NextResponse.json(learner);
  } catch (error) {
    console.error('[v0] Error in GET /api/learners/:id:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while fetching learner' },
      { status: 503 }
    );
  }
}
