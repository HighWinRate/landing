'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { FRONTEND_URLS, BLOG_URLS } from '@/lib/constants';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            High Win Rate
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline"
            >
              ویژگی‌ها
            </Link>
            <Link
              href="#products"
              className="text-sm font-medium hover:underline"
            >
              محصولات
            </Link>
            <Link
              href={BLOG_URLS.home}
              className="text-sm font-medium hover:underline"
            >
              وبلاگ
            </Link>
            <Link
              href={FRONTEND_URLS.login}
              className="text-sm font-medium hover:underline"
            >
              ورود
            </Link>
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 p-4">
                  <a
                    href="#features"
                    className="font-medium text-sm hover:underline"
                  >
                    ویژگی‌ها
                  </a>
                  <a
                    href="#products"
                    className="font-medium text-sm hover:underline"
                  >
                    محصولات
                  </a>
                  <a
                    href={BLOG_URLS.home}
                    className="font-medium text-sm hover:underline"
                  >
                    وبلاگ
                  </a>
                  <a
                    href={FRONTEND_URLS.login}
                    className="font-medium text-sm hover:underline"
                  >
                    ورود
                  </a>
                  <ThemeToggle />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
