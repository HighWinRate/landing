# راهنمای robots.txt برای High Win Rate

## مشکل قبلی و راه‌حل

### ❌ مشکل

فایل robots.txt قبلی حاوی خطای syntax بود:

```
Crawl-delay: 1  # این دستور توسط Google پشتیبانی نمی‌شود!
```

### ✅ راه‌حل

این دستور حذف شد چون:

1. **Google از `Crawl-delay` پشتیبانی نمی‌کند** و باعث خطای invalid syntax می‌شود
2. فقط Bing و چند بات دیگر از آن استفاده می‌کنند
3. Google به طور خودکار crawl rate را مدیریت می‌کند

منبع: [Semrush - Robots.txt Guide](https://www.semrush.com/blog/beginners-guide-robots-txt/)

## فایل فعلی (صحیح)

```txt
# robots.txt for High Win Rate
# Learn more: https://developers.google.com/search/docs/crawling-indexing/robots/intro

# Rules for all search engines
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /blog/check-tables/

# Sitemaps
Sitemap: https://highwinrate.com/sitemap.xml
Sitemap: https://highwinrate.com/blog-sitemap.xml
```

## توضیح دستورات

### User-agent: \*

- اعمال قوانین برای **تمام** موتورهای جستجو
- `*` یعنی همه بات‌ها

### Disallow Rules

```txt
Disallow: /api/              # بلاک کردن APIها
Disallow: /admin/            # بلاک کردن پنل ادمین
Disallow: /_next/            # بلاک کردن فایل‌های Next.js
Disallow: /blog/check-tables/ # بلاک کردن صفحات debug
```

### Sitemap

```txt
Sitemap: https://highwinrate.com/sitemap.xml
Sitemap: https://highwinrate.com/blog-sitemap.xml
```

معرفی sitemap‌ها به موتورهای جستجو برای crawling بهتر

## ❌ دستوراتی که نباید استفاده کنید

### 1. Crawl-delay

```txt
Crawl-delay: 1  # ❌ Google پشتیبانی نمی‌کند!
```

**چرا؟**

- Google از این دستور پشتیبانی نمی‌کند
- باعث خطای syntax می‌شود
- فقط Bing و چند بات دیگر می‌فهمند

**جایگزین:**

- Google خودش crawl rate را مدیریت می‌کند
- در Google Search Console می‌توانید درخواست کاهش سرعت بدهید

### 2. Allow: /

```txt
Allow: /  # ❌ غیرضروری است!
```

**چرا؟**

- به طور پیش‌فرض همه چیز مجاز است
- فقط وقتی لازمه که بخواهید استثنا برای یک Disallow ایجاد کنید

**مثال صحیح:**

```txt
Disallow: /products/
Allow: /products/featured/  # ✅ استثنا برای یک زیرپوشه
```

### 3. Noindex در robots.txt

```txt
Noindex: /private/  # ❌ کار نمی‌کند!
```

**چرا؟**

- `Noindex` دستور robots.txt نیست
- باید در `meta tags` استفاده شود

**جایگزین:**

```html
<meta name="robots" content="noindex" />
```

## 🎯 Best Practices

### ✅ انجام بدهید:

1. سینتکس ساده و استاندارد استفاده کنید
2. فقط دستورات پشتیبانی شده توسط Google را بکار ببرید
3. با کامنت‌ها (#) توضیحات اضافه کنید
4. Sitemap را در انتها قرار بدهید
5. فایل را در `/public/robots.txt` قرار بدهید

### ❌ انجام ندهید:

1. از `Crawl-delay` استفاده نکنید
2. `Allow: /` غیرضروری ننویسید
3. از robots.txt برای noindex استفاده نکنید
4. منابع مهم (CSS, JS) را بلاک نکنید
5. Wildcard (`*`, `$`) را بدون دقت استفاده نکنید

## 🔍 تست کردن

### 1. Google Search Console

```
Search Console > Crawl > robots.txt Tester
```

URL: https://search.google.com/search-console

### 2. دستی

بررسی کنید:

```
https://highwinrate.com/robots.txt
```

### 3. با ابزارهای آنلاین

- [Robots.txt Checker by Merkle](https://technicalseo.com/tools/robots-txt/)
- [Google's Robots Testing Tool](https://search.google.com/test/robots-txt)

## 🚨 خطاهای رایج

### خطا 1: Invalid Syntax

```txt
Crawl-delay: 1  # ❌ Google نمی‌فهمد
```

**راه‌حل:** حذف کنید

### خطا 2: بلاک کردن منابع مهم

```txt
Disallow: /assets/  # ❌ CSS/JS رو بلاک می‌کنه!
```

**راه‌حل:** فقط مسیرهای غیرضروری را بلاک کنید

### خطا 3: فاصله اضافی

```txt
User-agent:*  # ❌ بعد از : باید space باشه
```

**راه‌حل:**

```txt
User-agent: *  # ✅ صحیح
```

## 📚 منابع بیشتر

- [Google Robots.txt Specifications](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Semrush Robots.txt Guide](https://www.semrush.com/blog/beginners-guide-robots-txt/)
- [Moz Beginner's Guide](https://moz.com/learn/seo/robotstxt)

## ✅ چک‌لیست نهایی

- [x] فایل در `/public/robots.txt` قرار دارد
- [x] سینتکس صحیح است (بدون Crawl-delay)
- [x] Sitemap‌ها معرفی شده‌اند
- [x] مسیرهای حساس بلاک شده‌اند
- [x] منابع مهم (CSS/JS) بلاک نشده‌اند
- [ ] در Google Search Console تست شده
- [ ] در production بررسی شده: https://highwinrate.com/robots.txt

موفق باشید! 🚀
