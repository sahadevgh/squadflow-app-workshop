import { NextRequest, NextResponse } from 'next/server';
import { getLearnerProgress } from '@/server/db';

// GET /api/learners/:id/progress
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const progress = getLearnerProgress(id);
    
    if (!progress) {
      return NextResponse.json(
        { error: 'Learner not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(progress);
  } catch (error) {
    console.error('[v0] Error in GET /api/learners/:id/progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learner progress' },
      { status: 500 }
    );
  }
}
