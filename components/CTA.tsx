'use client';

import Link from 'next/link';
import { FRONTEND_URLS } from '@/lib/constants';

export default function CTA() {
  // Note: Since Landing and Frontend are on different origins (ports 3003 and 3001),
  // we can't directly check Frontend's localStorage.
  // The register button will always be visible, but Frontend will handle the redirect
  // if user tries to access /register while logged in.

  return (
    <section className="py-20 bg-gradient-to-r from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          آماده شروع هستید؟
        </h2>
        <p className="text-xl text-gray-700 dark:text-primary-100 mb-8 max-w-2xl mx-auto">
          همین حالا ثبت‌نام کنید و به بهترین استراتژی‌های معاملاتی دسترسی پیدا
          کنید
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={FRONTEND_URLS.register}
            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-primary-50 hover:text-primary-800 transition-all duration-300 transform hover:scale-105"
          >
            ثبت‌نام رایگان
          </Link>
          <Link
            href={FRONTEND_URLS.products}
            className="px-8 py-4 bg-transparent border-2 border-primary-600 dark:border-white text-primary-600 dark:text-white font-semibold rounded-lg hover:!bg-primary-700 hover:!text-white dark:hover:!bg-white dark:hover:!text-gray-900 transition-all duration-300"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </section>
  );
}
