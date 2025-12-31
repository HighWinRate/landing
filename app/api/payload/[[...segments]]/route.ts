import { REST_GET, REST_POST } from '@payloadcms/next/routes';
import config from '@/payload.config';
import { NextRequest } from 'next/server';

const restGet = REST_GET(config);
const restPost = REST_POST(config);

export async function GET(request: NextRequest, context: { params: Promise<{ segments?: string[] }> }) {
  const params = await context.params;
  return restGet(request, { params: Promise.resolve({ slug: params.segments }) });
}

export async function POST(request: NextRequest, context: { params: Promise<{ segments?: string[] }> }) {
  const params = await context.params;
  return restPost(request, { params: Promise.resolve({ slug: params.segments }) });
}

