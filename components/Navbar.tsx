'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FRONTEND_URLS, BLOG_URLS } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const authButtonHref = isAuthenticated
    ? FRONTEND_URLS.dashboard
    : FRONTEND_URLS.login;
  const authButtonText = isAuthenticated ? 'داشبورد' : 'ورود';

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              High Win Rate
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#features"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              ویژگی‌ها
            </Link>
            <Link
              href="#products"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              محصولات
            </Link>
            <Link
              href={BLOG_URLS.home}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              وبلاگ
            </Link>
            <ThemeToggle />
            {!isLoading && (
              <Button asChild>
                <Link href={authButtonHref}>{authButtonText}</Link>
              </Button>
            )}
          </div>

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
                    href={BLOG_URLS.home}
                    className="font-medium text-sm hover:underline"
                  >
                    وبلاگ
                  </a>
                  <a
                    href={authButtonHref}
                    className="font-medium text-sm hover:underline"
                  >
                    {authButtonText}
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
