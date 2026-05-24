import { NextRequest, NextResponse } from 'next/server';
import { getDashboardSummary } from '@/server/db';

// GET /api/dashboard/summary
export async function GET(request: NextRequest) {
  try {
    const summary = getDashboardSummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error('[v0] Error in GET /api/dashboard/summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard summary' },
      { status: 500 }
    );
  }
}
