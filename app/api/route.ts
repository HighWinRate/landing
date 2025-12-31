import { NextResponse } from 'next/server';

// Handle requests to /api (redirect to /api/payload)
export async function GET() {
  return NextResponse.json(
    { message: 'Payload CMS API is available at /api/payload' },
    { status: 200 }
  );
}

export async function POST() {
  return NextResponse.json(
    { message: 'Payload CMS API is available at /api/payload' },
    { status: 200 }
  );
}

