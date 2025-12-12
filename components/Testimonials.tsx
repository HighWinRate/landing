export default function Testimonials() {
  const testimonials = [
    {
      name: 'علی احمدی',
      role: 'معامله‌گر حرفه‌ای',
      content: 'استراتژی‌های High Win Rate واقعاً عالی هستند. نرخ برد بالای 85% که در بکتست دیدم، در معاملات واقعی هم تأیید شد.',
      rating: 5,
    },
    {
      name: 'سارا محمدی',
      role: 'معامله‌گر تازه‌کار',
      content: 'دوره‌های آموزشی خیلی کامل و واضح هستند. حتی برای کسی مثل من که تازه شروع کرده، خیلی مفید بود.',
      rating: 5,
    },
    {
      name: 'رضا کریمی',
      role: 'معامله‌گر باتجربه',
      content: 'کیفیت استراتژی‌ها و پشتیبانی عالی. یکی از بهترین سرمایه‌گذاری‌هایی که انجام دادم.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            نظرات کاربران
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            کاربران ما چه می‌گویند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

