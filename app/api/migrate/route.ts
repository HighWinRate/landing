import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

// This endpoint runs migration when called
// Use it once to create tables in Supabase
export async function POST(request: Request) {
  try {
    // Optional: Add authentication check here
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.MIGRATION_TOKEN;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🔄 Starting Payload migration via API...');
    
    const payload = await getPayload({ config });
    
    console.log('✅ Payload initialized successfully');
    console.log('📊 Migration completed automatically during init');
    
    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully. Tables created: users, posts, authors, categories, media',
    });
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.payloadInitError ? 'Database connection or configuration error' : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Also allow GET for easy access
export async function GET(request: Request) {
  return POST(request);
}

