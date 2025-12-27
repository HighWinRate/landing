export default function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              درباره High Win Rate
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              High Win Rate یک پلتفرم تخصصی برای ارائه استراتژی‌های معاملاتی با نرخ برد بالا است.
              ما با تیمی از متخصصان بازارهای مالی، بهترین استراتژی‌ها را انتخاب و تست می‌کنیم.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              تمام استراتژی‌های ما با بکتست کامل و در بازارهای واقعی تست شده‌اند. ما فقط
              استراتژی‌هایی را ارائه می‌دهیم که نرخ برد بالای 85% داشته باشند.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">تست شده در بازار واقعی</h3>
                  <p className="text-gray-600 dark:text-gray-300">تمام استراتژی‌ها در شرایط واقعی بازار تست شده‌اند</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">پشتیبانی کامل</h3>
                  <p className="text-gray-600 dark:text-gray-300">تیم پشتیبانی ما همیشه آماده کمک به شماست</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">به‌روزرسانی مداوم</h3>
                  <p className="text-gray-600 dark:text-gray-300">استراتژی‌ها به صورت مداوم به‌روزرسانی می‌شوند</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="text-6xl font-bold text-primary-700 dark:text-white">85%+</div>
                <div className="text-2xl font-semibold text-primary-800 dark:text-white">نرخ برد متوسط</div>
                <p className="text-primary-900 dark:text-primary-100">
                  استراتژی‌های ما با نرخ برد بالای 85% در بازارهای مختلف تست شده‌اند
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-300">معامله بکتست شده</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

