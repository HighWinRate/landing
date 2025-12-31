import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  // Blog is now integrated in landing (monorepo) and uses Payload CMS
  images: {
    remotePatterns: [
      // Add your image domains here if needed
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

