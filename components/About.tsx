import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              درباره High Win Rate
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              High Win Rate یک پلتفرم تخصصی برای ارائه استراتژی‌های معاملاتی با نرخ برد بالا است.
              ما با تیمی از متخصصان بازارهای مالی، بهترین استراتژی‌ها را انتخاب و تست می‌کنیم.
            </p>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              تمام استراتژی‌های ما با بکتست کامل و در بازارهای واقعی تست شده‌اند. ما فقط
              استراتژی‌هایی را ارائه می‌دهیم که نرخ برد بالای 85% داشته باشند.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">تست شده در بازار واقعی</h3>
                  <p className="text-muted-foreground">تمام استراتژی‌ها در شرایط واقعی بازار تست شده‌اند</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">پشتیبانی کامل</h3>
                  <p className="text-muted-foreground">تیم پشتیبانی ما همیشه آماده کمک به شماست</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">به‌روزرسانی مداوم</h3>
                  <p className="text-muted-foreground">استراتژی‌ها به صورت مداوم به‌روزرسانی می‌شوند</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Card className="bg-gradient-to-br from-muted to-muted/50 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="text-6xl font-bold text-primary">85%+</div>
                <div className="text-2xl font-semibold">نرخ برد متوسط</div>
                <p className="text-muted-foreground">
                  استراتژی‌های ما با نرخ برد بالای 85% در بازارهای مختلف تست شده‌اند
                </p>
              </CardContent>
            </Card>
            <Card className="absolute -bottom-6 -left-6">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-muted-foreground">معامله بکتست شده</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

