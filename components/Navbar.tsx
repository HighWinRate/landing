'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Note: Since Landing and Frontend are on different origins (ports 3003 and 3001),
  // we can't directly check Frontend's localStorage. 
  // The buttons will always be visible, but Frontend will handle the redirect
  // if user tries to access /register while logged in.

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
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              ویژگی‌ها
            </Link>
            <Link href="#products" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              محصولات
            </Link>
            <Link
              href="http://localhost:3001/login"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              ورود
            </Link>
            <Link
              href="http://localhost:3001/register"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              ثبت‌نام
            </Link>
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
            <Link href="http://localhost:3001/login" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600">
              ورود
            </Link>
            <Link href="http://localhost:3001/register" className="block py-2 text-primary-600 font-semibold">
              ثبت‌نام
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

