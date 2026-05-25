import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL ?? 'http://localhost:8000/api';

// GET /api/dashboard/summary
export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${BACKEND_API_BASE_URL}/dashboard/summary`, { cache: 'no-store' });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch dashboard summary from server' },
        { status: res.status }
      );
    }

    const summary = await res.json();
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error in GET /api/dashboard/summary:', error);
    return NextResponse.json(
      { error: 'Backend server unavailable while fetching dashboard summary' },
      { status: 503 }
    );
  }
}
