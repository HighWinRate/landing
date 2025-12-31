import { handleEndpoints } from 'payload';
import { formatAdminURL } from 'payload/shared';
import config from '@/payload.config';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ segments?: string[] }> }) {
  const awaitedConfig = await config;
  const params = await context.params;
  const path = formatAdminURL({
    apiRoute: awaitedConfig.routes.api,
    path: params.segments ? `/${params.segments.join('/')}` : undefined,
  });
  
  const response = await handleEndpoints({
    config,
    path,
    request,
  });
  
  return response;
}

export async function POST(request: NextRequest, context: { params: Promise<{ segments?: string[] }> }) {
  const awaitedConfig = await config;
  const params = await context.params;
  const path = formatAdminURL({
    apiRoute: awaitedConfig.routes.api,
    path: params.segments ? `/${params.segments.join('/')}` : undefined,
  });
  
  const response = await handleEndpoints({
    config,
    path,
    request,
  });
  
  return response;
}

