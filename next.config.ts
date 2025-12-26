import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Blog URL از environment variable (برای proxy کردن به Ghost server)
    // در development: http://localhost:3004
    // در production: https://blog-internal.highwinrate.com (یا هر URL دیگری که Ghost روی آن deploy شده)
    const blogUrl = process.env.BLOG_URL || process.env.NEXT_PUBLIC_BLOG_URL || 'http://localhost:3004';
    
    return [
      {
        // تمام درخواست‌های /blog/* را به Ghost server proxy می‌کند
        source: '/blog/:path*',
        destination: `${blogUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;

