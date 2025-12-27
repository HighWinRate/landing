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
import { Menu } from 'lucide-react';

export default function Navbar() {
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
    <nav className="fixed top-0 w-full backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              High Win Rate
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              ویژگی‌ها
            </Link>
            <Link href="#products" className="text-foreground hover:text-primary transition-colors font-medium">
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
                <Link href={authButtonHref}>
                  {authButtonText}
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>منو</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
                    ویژگی‌ها
                  </Link>
                  <Link href="#products" className="text-foreground hover:text-primary transition-colors font-medium">
                    محصولات
                  </Link>
                  <Link
                    href={BLOG_URLS.home}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    وبلاگ
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">تم:</span>
                    <ThemeToggle />
                  </div>
                  {!isLoading && (
                    <Button asChild className="w-full">
                      <Link href={authButtonHref}>
                        {authButtonText}
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

