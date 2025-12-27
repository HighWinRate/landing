'use client';

import Link from 'next/link';
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

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Menu</Button>
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
                    href="/blog"
                    className="font-medium text-sm hover:underline"
                  >
                    وبلاگ
                  </a>
                  <a
                    href="/login"
                    className="font-medium text-sm hover:underline"
                  >
                    ورود
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
