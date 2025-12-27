import Link from 'next/link';
import { FRONTEND_URLS, BLOG_URLS } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">High Win Rate</h3>
            <p className="text-muted-foreground">
              فروشگاه آنلاین استراتژی‌های معاملاتی با نرخ برد بالا
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">لینک‌های مفید</h4>
            <ul className="space-y-2">
              <li>
                <Link href={FRONTEND_URLS.products} className="text-muted-foreground hover:text-foreground transition-colors">
                  محصولات
                </Link>
              </li>
              <li>
                <Link
                  href={BLOG_URLS.home}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  وبلاگ
                </Link>
              </li>
              <li>
                <Link href={FRONTEND_URLS.login} className="text-muted-foreground hover:text-foreground transition-colors">
                  ورود
                </Link>
              </li>
              <li>
                <Link href={FRONTEND_URLS.register} className="text-muted-foreground hover:text-foreground transition-colors">
                  ثبت‌نام
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">پشتیبانی</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  تماس با ما
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  سوالات متداول
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  راهنما
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">تماس با ما</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>📧 info@highwinrate.com</li>
              <li>📱 +98 912 345 6789</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />
        <div className="text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} High Win Rate. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}

