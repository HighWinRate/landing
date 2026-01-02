import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  // Blog reads data from Supabase (managed by blog-admin)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
      },
    ],
  },
  // Exclude Node.js modules from client bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        readline: false,
        tls: false,
        worker_threads: false,
        child_process: false,
        crypto: false,
        stream: false,
        util: false,
        path: false,
        os: false,
        net: false,
        dns: false,
        http: false,
        https: false,
        zlib: false,
        buffer: false,
        events: false,
        string_decoder: false,
        url: false,
        querystring: false,
      };
    }
    return config;
  },
};

export default withPayload(nextConfig);

