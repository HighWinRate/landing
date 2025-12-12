/**
 * Constants and environment-based configuration
 */

// Frontend URL from environment variable
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001';

// Blog URL from environment variable
export const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL || 'http://localhost:3004';

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

// Blog URL
export const BLOG_URLS = {
  home: BLOG_URL,
} as const;

