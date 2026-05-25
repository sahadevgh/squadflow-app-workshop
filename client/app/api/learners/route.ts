import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL ?? 'http://localhost:8000/api';


// GET /api/learners
export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${BACKEND_API_BASE_URL}/learners`, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch learners from server' },
        { status: res.status }
      );
    }
    const learners = await res.json();
    return NextResponse.json(learners);
  } catch (error) {
    console.error('Error in GET /api/learners:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while fetching learners' },
      { status: 503 }
    );
  }
}

// POST /api/learners
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_API_BASE_URL}/learners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to create learner on server' },
        { status: res.status }
      );
    }
    const learner = await res.json();
    return NextResponse.json(learner, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/learners:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while creating learner' },
      { status: 503 }
    );
  }
}
