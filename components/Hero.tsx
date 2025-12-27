'use client';

import Link from 'next/link';
import { FRONTEND_URLS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            استراتژی‌های معاملاتی
            <br />
            <span className="text-primary">
              با نرخ برد بالا
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            دسترسی به بهترین استراتژی‌های معاملاتی، دوره‌های آموزشی حرفه‌ای و
            فایل‌های راهنما برای موفقیت در بازارهای مالی
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg">
              <Link href={FRONTEND_URLS.products}>
                مشاهده محصولات
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">
                ویژگی‌ها
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
