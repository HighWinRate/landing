# راهنمای جامع مدیریت رنگ‌ها در Landing

این راهنما به شما کمک می‌کند تا رنگ‌های مناسب برای light و dark mode را به درستی تنظیم کنید.

## 🎯 Theme Management

این پروژه از **next-themes** برای مدیریت theme استفاده می‌کند. این کتابخانه:
- ✅ مدیریت خودکار localStorage
- ✅ SSR-safe (بدون flash)
- ✅ پشتیبانی از system preference
- ✅ ساده و قابل اعتماد

### استفاده از Theme

```tsx
import { useTheme } from 'next-themes';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

## 🎨 سیستم رنگ یکپارچه

### قوانین طلایی

1. **همیشه از `dark:` variant استفاده کنید**
   - هر `text-*` باید `dark:text-*` هم داشته باشد
   - هر `bg-*` باید `dark:bg-*` هم داشته باشد

2. **Gradient ها باید theme-aware باشند**
   - Light mode: gradient روشن (`from-primary-100 to-primary-300`)
   - Dark mode: gradient تیره (`from-primary-500 to-primary-700`)

3. **Text روی gradient تیره باید سفید باشد**
   - Light mode gradient روشن: `text-primary-800` یا `text-primary-900`
   - Dark mode gradient تیره: `text-white`

## 📋 Pattern های استاندارد

### 1. Background ساده
```tsx
// ✅ درست
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">متن</p>
</div>
```

### 2. Gradient Box
```tsx
// ✅ درست - Light mode روشن، Dark mode تیره
<div className="bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700">
  <h2 className="text-primary-800 dark:text-white">عنوان</h2>
  <p className="text-primary-900 dark:text-primary-100">متن</p>
</div>

// ❌ اشتباه - همیشه تیره
<div className="bg-gradient-to-br from-primary-500 to-primary-700">
  <p className="text-white">متن</p>
</div>
```

### 3. Card
```tsx
// ✅ درست
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
  <h3 className="text-gray-900 dark:text-white font-bold">عنوان</h3>
  <p className="text-gray-600 dark:text-gray-300">متن توضیحات</p>
</div>
```

### 4. Button
```tsx
// ✅ درست - Solid button
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
  دکمه
</button>

// ✅ درست - Outline button (مهم: از text-primary-600 استفاده کنید نه text-primary-700)
<button className="px-4 py-2 bg-transparent border-2 border-primary-600 dark:border-white text-primary-600 dark:text-white rounded-lg hover:bg-primary-600 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300">
  دکمه
</button>

// ⚠️ نکته مهم: در outline buttons همیشه از text-primary-600 استفاده کنید
// چون در hover state باید text-white باشد که contrast بهتری دارد
```

### 5. Hero Section
```tsx
// ✅ درست
<section className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-primary-900 dark:via-primary-800 dark:to-primary-950">
  <h1 className="text-gray-900 dark:text-white">عنوان اصلی</h1>
  <p className="text-gray-700 dark:text-primary-100">توضیحات</p>
</section>
```

## 🔍 Checklist برای بررسی

قبل از commit کردن، این موارد را بررسی کنید:

- [ ] همه `text-*` classes دارای `dark:text-*` هستند
- [ ] همه `bg-*` classes دارای `dark:bg-*` هستند
- [ ] همه gradient ها در light mode روشن هستند
- [ ] هیچ `text-white` بدون `dark:` variant وجود ندارد
- [ ] هیچ gradient تیره در light mode وجود ندارد

## 🛠️ Utility Functions

از `lib/color-utils.ts` می‌توانید استفاده کنید:

```tsx
import { colorClasses, getGradientClasses } from '@/lib/color-utils';

// استفاده از color classes
<div className={colorClasses.text.primary}>
  متن
</div>

// استفاده از gradient
const gradient = getGradientClasses('light');
<div className={gradient.bg}>
  <h2 className={gradient.text}>عنوان</h2>
</div>
```

## 🎯 مثال‌های واقعی

### About Component - Gradient Box
```tsx
// ✅ درست
<div className="bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700 rounded-2xl p-8">
  <div className="text-6xl font-bold text-primary-700 dark:text-white">85%+</div>
  <div className="text-2xl font-semibold text-primary-800 dark:text-white">نرخ برد</div>
  <p className="text-primary-900 dark:text-primary-100">توضیحات</p>
</div>
```

### Hero Section
```tsx
// ✅ درست
<section className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-primary-900 dark:via-primary-800 dark:to-primary-950">
  <h1 className="text-gray-900 dark:text-white">عنوان</h1>
  <p className="text-gray-700 dark:text-primary-100">توضیحات</p>
</section>
```

## ⚠️ مشکلات رایج

### مشکل 1: متن سفید روی background روشن
```tsx
// ❌ اشتباه
<div className="bg-white">
  <p className="text-white">متن</p>
</div>

// ✅ درست
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">متن</p>
</div>
```

### مشکل 2: Gradient تیره در light mode
```tsx
// ❌ اشتباه
<div className="bg-gradient-to-br from-primary-500 to-primary-700">
  <p className="text-white">متن</p>
</div>

// ✅ درست
<div className="bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-500 dark:to-primary-700">
  <p className="text-primary-800 dark:text-white">متن</p>
</div>
```

### مشکل 3: فراموش کردن dark variant
```tsx
// ❌ اشتباه
<div className="bg-white">
  <p className="text-gray-900">متن</p>
</div>

// ✅ درست
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">متن</p>
</div>
```

## 📚 منابع

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- فایل `lib/color-utils.ts` برای utility functions

