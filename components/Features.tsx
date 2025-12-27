import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'استراتژی‌های تست شده',
      description: 'تمام استراتژی‌ها با بکتست کامل و نتایج واقعی ارائه می‌شوند',
    },
    {
      icon: '🎓',
      title: 'دوره‌های آموزشی جامع',
      description: 'دوره‌های کامل با محتوای ویدیویی و فایل‌های راهنما',
    },
    {
      icon: '💎',
      title: 'نرخ برد بالا',
      description: 'استراتژی‌هایی با نرخ برد بالای 85% که در بازارهای واقعی تست شده‌اند',
    },
    {
      icon: '🔒',
      title: 'دسترسی امن',
      description: 'سیستم امنیتی کامل برای محافظت از محتوای شما',
    },
    {
      icon: '📱',
      title: 'دسترسی همیشه',
      description: 'دسترسی به محتوا از هر زمان و مکان با اتصال به اینترنت',
    },
    {
      icon: '💳',
      title: 'پرداخت امن',
      description: 'پرداخت با ارز دیجیتال و سیستم امن برای تراکنش‌ها',
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            چرا High Win Rate؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ما بهترین استراتژی‌های معاملاتی را با بالاترین استانداردهای کیفیت ارائه می‌دهیم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <CardTitle className="text-2xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

