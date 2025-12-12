'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          آماده شروع هستید؟
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          همین حالا ثبت‌نام کنید و به بهترین استراتژی‌های معاملاتی دسترسی پیدا
          کنید
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="http://localhost:3001/register"
            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-primary-50 hover:text-primary-800 transition-all duration-300 transform hover:scale-105"
          >
            ثبت‌نام رایگان
          </Link>
          <Link
            href="http://localhost:3001/products"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </section>
  );
}
