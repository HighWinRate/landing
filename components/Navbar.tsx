'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FRONTEND_URLS, BLOG_URLS } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Determine the button href and text based on auth status
  const authButtonHref = isAuthenticated ? FRONTEND_URLS.dashboard : FRONTEND_URLS.login;
  const authButtonText = isAuthenticated ? 'داشبورد' : 'ورود';

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              High Win Rate
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Link href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              ویژگی‌ها
            </Link>
            <Link href="#products" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              محصولات
            </Link>
            <Link
              href={BLOG_URLS.home}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              وبلاگ
            </Link>
            <ThemeToggle />
            {!isLoading && (
              <Link
                href={authButtonHref}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {authButtonText}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <Link href="#features" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600">
              ویژگی‌ها
            </Link>
            <Link href="#products" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600">
              محصولات
            </Link>
            <Link
              href={BLOG_URLS.home}
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600"
            >
              وبلاگ
            </Link>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">تم:</span>
              <ThemeToggle />
            </div>
            {!isLoading && (
              <Link 
                href={authButtonHref} 
                className="block py-2 text-primary-600 dark:text-primary-400 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {authButtonText}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

