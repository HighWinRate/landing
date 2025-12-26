/**
 * Constants and environment-based configuration
 */

// Frontend URL from environment variable
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001';

// Helper functions for building URLs
export const getFrontendUrl = (path: string = '') => {
  const baseUrl = FRONTEND_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// Common Frontend URLs
export const FRONTEND_URLS = {
  home: getFrontendUrl('/'),
  login: getFrontendUrl('/login'),
  register: getFrontendUrl('/register'),
  products: getFrontendUrl('/products'),
  productDetail: (id: string) => getFrontendUrl(`/products/${id}`),
  dashboard: getFrontendUrl('/dashboard'),
} as const;

// Blog URLs - استفاده از /blog برای SEO بهتر (Next.js Rewrite)
// در production، Next.js rewrite این را به BLOG_URL (Ghost server) proxy می‌کند
export const BLOG_URLS = {
  home: '/blog', // برای SEO بهتر، از /blog استفاده می‌کنیم (نه subdomain)
} as const;

