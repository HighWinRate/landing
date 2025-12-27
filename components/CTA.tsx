'use client';

import Link from 'next/link';
import { FRONTEND_URLS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          آماده شروع هستید؟
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          همین حالا ثبت‌نام کنید و به بهترین استراتژی‌های معاملاتی دسترسی پیدا
          کنید
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href={FRONTEND_URLS.register}>
              ثبت‌نام رایگان
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={FRONTEND_URLS.products}>
              مشاهده محصولات
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
