import { NextRequest, NextResponse } from 'next/server';
import { getAllLearners, createLearner as dbCreateLearner } from '@/server/db';

// GET /api/learners
export async function GET(request: NextRequest) {
  try {
    const learners = getAllLearners();
    return NextResponse.json(learners);
  } catch (error) {
    console.error('[v0] Error in GET /api/learners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learners' },
      { status: 500 }
    );
  }
}

// POST /api/learners
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const learner = dbCreateLearner({
      name,
      email,
      tasksCompleted: 0,
      tasksAssigned: 0,
    });

    return NextResponse.json(learner, { status: 201 });
  } catch (error) {
    console.error('[v0] Error in POST /api/learners:', error);
    return NextResponse.json(
      { error: 'Failed to create learner' },
      { status: 500 }
    );
  }
}
