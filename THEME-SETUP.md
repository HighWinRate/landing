# راهنمای Theme Management با next-themes

این پروژه از **next-themes** برای مدیریت theme استفاده می‌کند.

## 📦 نصب

```bash
npm install next-themes
```

## 🔧 تنظیمات

### 1. ThemeProvider

`components/ThemeProvider.tsx` از next-themes استفاده می‌کند:

```tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
```

### 2. Layout

در `app/layout.tsx`:

```tsx
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 3. استفاده در کامپوننت‌ها

```tsx
'use client';

import { useTheme } from 'next-themes';

export default function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current theme: {theme}
      Resolved: {resolvedTheme}
    </button>
  );
}
```

## ✨ ویژگی‌ها

- ✅ **SSR-safe**: بدون flash در صفحه
- ✅ **System preference**: از تنظیمات سیستم استفاده می‌کند
- ✅ **localStorage**: ذخیره خودکار preference
- ✅ **TypeScript**: پشتیبانی کامل از types
- ✅ **ساده**: API ساده و قابل فهم

## 🎨 Tailwind CSS

next-themes با Tailwind CSS به صورت کامل کار می‌کند:

```tsx
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">متن</p>
</div>
```

## 📚 مستندات

- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [COLOR-GUIDE.md](./COLOR-GUIDE.md) - راهنمای رنگ‌ها

