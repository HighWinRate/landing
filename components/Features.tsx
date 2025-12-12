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
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            چرا High Win Rate؟
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ما بهترین استراتژی‌های معاملاتی را با بالاترین استانداردهای کیفیت ارائه می‌دهیم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

