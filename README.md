# Landing Page - High Win Rate

لندینگ پیج جداگانه برای High Win Rate که مستقل از frontend اصلی است.

## 🚀 راه‌اندازی سریع

### روش 1: استفاده از اسکریپت (پیشنهادی)

```bash
./start-dev.sh
```

### روش 2: راه‌اندازی دستی

```bash
# نصب dependencies
npm install

# ایجاد فایل .env (در صورت نیاز)
cp env.example.txt .env

# راه‌اندازی سرور توسعه
npm run dev
```

لندینگ پیج در آدرس **http://localhost:3003** در دسترس خواهد بود.

## 📋 ویژگی‌ها

- ✅ طراحی مدرن و حرفه‌ای
- ✅ پشتیبانی از Dark Mode (با next-themes)
- ✅ نمایش محصولات از Backend
- ✅ Blog integrated (Payload CMS with Supabase)
- ✅ کاملاً Responsive
- ✅ بهینه‌سازی شده برای SEO
- ✅ انیمیشن‌های نرم و جذاب

## 🔧 تنظیمات

### متغیرهای محیطی

فایل `.env` را ایجاد کنید و متغیرهای زیر را تنظیم کنید:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Frontend URL (برای لینک‌های ورود/ثبت‌نام/محصولات)
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3001

# Payload CMS Configuration (برای Blog)
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3003
POSTGRES_URL=postgresql://user:password@host:port/database
```

**⚠️ برای Production (Vercel/Deployment):**
در Vercel یا platform deploy، این environment variables را تنظیم کنید:

```env
NEXT_PUBLIC_API_URL=https://api.highwinrate.com
NEXT_PUBLIC_FRONTEND_URL=https://app.highwinrate.com
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=https://highwinrate.com
POSTGRES_URL=postgresql://user:password@host:port/database
```

**نکته**: Landing page در `https://highwinrate.com` (بدون www) deploy می‌شود.

### پورت‌ها

- **Landing Page**: 3003
- **Frontend (User App)**: 3001
- **Admin Panel**: 3002
- **Backend API**: 3000

## 📁 ساختار پروژه

```
landing/
├── app/
│   ├── layout.tsx      # Layout اصلی
│   ├── page.tsx        # صفحه اصلی
│   ├── blog/           # Blog routes (integrated)
│   │   ├── page.tsx    # /blog
│   │   ├── [slug]/     # /blog/[slug]
│   │   ├── category/   # /blog/category/[slug]
│   │   └── author/     # /blog/author/[slug]
│   └── globals.css     # استایل‌های全局
├── components/
│   ├── Navbar.tsx      # نوار ناوبری
│   ├── Hero.tsx        # بخش Hero
│   ├── Features.tsx    # ویژگی‌ها
│   ├── About.tsx       # درباره ما
│   ├── Products.tsx    # محصولات
│   ├── Testimonials.tsx # نظرات کاربران
│   ├── CTA.tsx         # Call to Action
│   ├── Footer.tsx      # فوتر
│   ├── ThemeProvider.tsx # Theme Provider (next-themes)
│   ├── ThemeToggle.tsx # Theme Toggle Button
│   └── blog/           # Blog components
│       ├── BlogPost.tsx
│       ├── BlogList.tsx
│       └── BlogCard.tsx
├── lib/
│   ├── api.ts          # API Client
│   ├── payload.ts      # Payload Client
│   └── color-utils.ts  # Color utilities
├── collections/        # Payload Collections
│   ├── Posts.ts
│   ├── Authors.ts
│   ├── Categories.ts
│   └── Media.ts
├── payload.config.ts   # Payload Configuration
└── public/             # فایل‌های استاتیک
```

## 🎨 کامپوننت‌ها

### Hero

بخش اصلی لندینگ با عنوان و دکمه‌های CTA

### Features

نمایش ویژگی‌های اصلی سرویس (6 ویژگی)

### About

بخش درباره ما با آمار و مزایا

### Products

نمایش محصولات از Backend API (حداکثر 6 محصول)

### Testimonials

نظرات کاربران (3 نظر نمونه)

### CTA

بخش دعوت به اقدام برای ثبت‌نام

### Footer

فوتر با لینک‌های مفید

## 🔗 لینک‌ها و اتصال به Frontend

### ⚠️ مهم: جریان کاربری

لندینگ پیج و Frontend اصلی به صورت **دو طرفه** به هم متصل هستند:

#### Landing → Frontend (برای عملیات کاربری)

لندینگ پیج به frontend اصلی در پورت 3001 لینک می‌شود:

- **ثبت‌نام**: `http://localhost:3001/register`
  - دکمه "ثبت‌نام رایگان" در CTA section
  - دکمه "ثبت‌نام" در Navbar
- **ورود**: `http://localhost:3001/login`
  - دکمه "ورود" در Navbar
- **مشاهده محصولات**: `http://localhost:3001/products`
  - دکمه "مشاهده محصولات" در Hero section
  - دکمه "مشاهده محصولات" در CTA section
  - لینک "محصولات" در Navbar
- **جزئیات محصول**: `http://localhost:3001/products/[id]`
  - کارت‌های محصول در Products section

#### Frontend → Landing (برای صفحه اصلی)

Frontend اصلی صفحه اصلی خودش (`/`) را به Landing Page redirect می‌کند:

- **صفحه اصلی Frontend** (`http://localhost:3001/`): به `http://localhost:3003` redirect می‌شود
- **لوگو در Navbar**: به `http://localhost:3003` لینک می‌شود

**هدف**: کاربرانی که مستقیماً به Frontend می‌آیند، ابتدا Landing را می‌بینند و سپس می‌توانند به Frontend برای استفاده از سرویس برگردند.

### 📋 خلاصه جریان کاربری

```
کاربر → Landing (3003) → Frontend (3001) برای ثبت‌نام/ورود/خرید
کاربر → Frontend (3001) → Redirect به Landing (3003) → سپس به Frontend برمی‌گردد
```

## 📝 نکات مهم

1. **جدا بودن از Frontend**: لندینگ پیج کاملاً مستقل است و تغییرات آن روی frontend اصلی تأثیری ندارد
2. **API Connection**: لندینگ پیج به Backend API در پورت 3000 متصل می‌شود
3. **Dark Mode**: پشتیبانی کامل از Dark Mode با next-themes (system preference + manual toggle)
4. **Blog**: Blog integrated شده در `/blog` route (Payload CMS with Supabase)
4. **CORS**: مطمئن شوید که `FRONTEND_URL` در Backend شامل `http://localhost:3003` است
5. **لینک‌ها**:
   - Landing همیشه به Frontend (3001) برای عملیات کاربری لینک می‌شود
   - Frontend صفحه اصلی به Landing (3003) redirect می‌شود
   - این یک جریان دو طرفه است برای تجربه کاربری بهتر
6. **مشکلات UI**: برای مشکلات UI/UX به [landing-guide.md](../docs/landing-guide.md) مراجعه کنید

## 🛠️ دستورات

```bash
# Development
npm run dev

# Build
npm run build

# Start Production
npm run start

# Lint
npm run lint

# Payload Admin Panel (برای مدیریت محتوای Blog)
# دسترسی در http://localhost:3003/admin
```

## 🎨 Theme Management

این پروژه از **next-themes** برای مدیریت theme استفاده می‌کند:

- ✅ پشتیبانی از system preference
- ✅ ذخیره خودکار در localStorage
- ✅ SSR-safe (بدون flash)
- ✅ Toggle button در Navbar

برای جزئیات بیشتر، به [THEME-SETUP.md](./THEME-SETUP.md) مراجعه کنید.

## 📝 Blog

Blog در این پروژه integrated شده و در route `/blog` در دسترس است:

- **Payload CMS**: برای مدیریت محتوا
- **Supabase PostgreSQL**: برای ذخیره‌سازی داده‌ها
- **Next.js**: برای نمایش محتوا
- **SEO Optimized**: همه در یک domain (`highwinrate.com/blog`)

برای مدیریت محتوا:
- دسترسی به Admin Panel: `http://localhost:3003/admin`
- ابتدا باید یک کاربر admin ایجاد کنید

برای جزئیات بیشتر، به [COLOR-GUIDE.md](./COLOR-GUIDE.md) مراجعه کنید.
```

## 📦 Dependencies

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- next-themes (Theme Management)
- Payload CMS (Blog)
- @payloadcms/db-postgres (PostgreSQL adapter)
- @payloadcms/richtext-lexical (Rich text editor)

---

**نکته**: این لندینگ پیج برای نمایش و جذب کاربران طراحی شده است و کاربران برای استفاده از سرویس باید به frontend اصلی (پورت 3001) بروند.
