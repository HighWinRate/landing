import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { Users } from './collections/Users';
import { Posts } from './collections/Posts';
import { Authors } from './collections/Authors';
import { Categories } from './collections/Categories';
import { Media } from './collections/Media';

// Get database configuration from environment variables
// Supports both connection string and individual variables (like backend)
const getDatabaseConfig = () => {
  // Prefer connection string if available
  const connectionString = 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.SUPABASE_DB_URL || 
    process.env.DATABASE_URL;

  if (connectionString) {
    // Add SSL parameters to connection string if not already present
    let finalConnectionString = connectionString;
    if (!connectionString.includes('sslmode=')) {
      const separator = connectionString.includes('?') ? '&' : '?';
      finalConnectionString = `${connectionString}${separator}sslmode=require`;
    }
    
    // For Supabase, we need to disable SSL certificate verification
    // Similar to backend approach: use ssl config in pool (like pg.Client)
    return {
      pool: {
        connectionString: finalConnectionString,
        // SSL configuration for Supabase (same as backend pg.Client approach)
        ssl: {
          rejectUnauthorized: false, // Supabase uses self-signed certificates
        },
      },
    };
  }

  // Fallback to individual variables
  // Try to get host from POSTGRES_HOST or extract from SUPABASE_URL
  let host = process.env.POSTGRES_HOST;
  if (!host) {
    // Try to extract host from SUPABASE_URL
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      try {
        const url = new URL(supabaseUrl);
        // Convert Supabase URL to database host
        // e.g., https://xxxxx.supabase.co -> db.xxxxx.supabase.co
        const hostname = url.hostname.replace(/^([^.]+)\./, 'db.');
        host = hostname;
      } catch (e) {
        // If URL parsing fails, try to extract manually
        const match = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/);
        if (match) {
          host = `db.${match[1]}.supabase.co`;
        }
      }
    }
  }

  const port = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432;
  const user = process.env.POSTGRES_USER || 'postgres';
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DATABASE || process.env.POSTGRES_DB || 'postgres';

  // If we have all required individual variables, construct connection string
  // Note: password is still required for database connection
  if (host && user && password && database) {
    // Add SSL parameters to connection string for Supabase
    const connectionString = `postgresql://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}?sslmode=require`;
    
    // For Supabase, we need to disable SSL certificate verification
    return {
      pool: {
        connectionString,
        // SSL configuration for Supabase
        // Note: postgresAdapter passes this directly to pg.Pool
        ssl: {
          rejectUnauthorized: false, // Supabase uses self-signed certificates
        },
      },
    };
  }

  // If no configuration found, return empty (will show error)
  return {
    pool: {
      connectionString: '',
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
};

// Get PAYLOAD_SECRET - will be validated at runtime, not build time
// This allows the build to complete even if secret is not set (for CI/CD)
const payloadSecret = process.env.PAYLOAD_SECRET || 'dummy-secret-for-build-time-only';

// Get database config with SSL support (same approach as backend)
const dbConfig = getDatabaseConfig();

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts, Authors, Categories, Media],
  editor: lexicalEditor({}),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  db: postgresAdapter(dbConfig),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3003',
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3003',
    'http://localhost:3003',
  ],
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3003',
    'http://localhost:3003',
  ],
});

