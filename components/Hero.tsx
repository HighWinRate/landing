'use client';

import Link from 'next/link';
import { FRONTEND_URLS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-muted/50 to-background overflow-hidden pt-16 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
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

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="text-4xl font-bold mb-2">
                85%+
              </div>
              <div className="text-muted-foreground">
                نرخ برد متوسط
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-4xl font-bold mb-2">
                1000+
              </div>
              <div className="text-muted-foreground">
                معامله بکتست شده
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-4xl font-bold mb-2">
                500+
              </div>
              <div className="text-muted-foreground">
                کاربر راضی
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}
