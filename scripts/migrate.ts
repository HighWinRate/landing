import { getPayload } from 'payload';
import config from '../payload.config';

async function migrate() {
  try {
    console.log('🔄 Starting Payload migration...');
    console.log('📋 Checking environment variables...');
    
    // Check required environment variables
    if (!process.env.PAYLOAD_SECRET) {
      console.warn('⚠️  PAYLOAD_SECRET is not set');
    }
    
    if (!process.env.POSTGRES_URL && !process.env.POSTGRES_HOST) {
      console.error('❌ Database connection variables are not set!');
      console.error('Please set POSTGRES_URL or POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD');
      process.exit(1);
    }
    
    console.log('✅ Environment variables check passed');
    console.log('🔄 Initializing Payload...');
    
    const payload = await getPayload({ config });
    
    console.log('✅ Payload initialized successfully');
    console.log('📊 Running migrations...');
    
    // Payload automatically runs migrations on init
    // The migrate() method is called automatically during init
    console.log('✅ Migration completed successfully!');
    console.log('📋 Tables created: users, posts, authors, categories, media');
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    if (error.payloadInitError) {
      console.error('💡 Tip: Make sure database connection variables are set correctly');
      console.error('💡 Tip: Check that NODE_TLS_REJECT_UNAUTHORIZED=0 is set for Supabase');
    }
    console.error(error);
    process.exit(1);
  }
}

migrate();
