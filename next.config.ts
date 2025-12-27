import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Blog is now integrated in landing (monorepo)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;

