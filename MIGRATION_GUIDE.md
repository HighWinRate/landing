# راهنمای اجرای Migration برای Payload CMS

## مشکل: جداول در Supabase وجود ندارند

اگر خطای `relation "posts" does not exist` می‌گیرید، یعنی migration اجرا نشده است.

## راه حل 1: اجرای Migration در Vercel (پیشنهادی) ⭐

### روش A: استفاده از Vercel CLI

```bash
# 1. نصب Vercel CLI (اگر ندارید)
npm i -g vercel

# 2. Login به Vercel
vercel login

# 3. Pull environment variables
cd landing
vercel env pull .env.local

# 4. اجرای migration
npm run payload:migrate
```

### روش B: استفاده از Vercel Dashboard

1. به Vercel Dashboard بروید
2. پروژه `landing` را انتخاب کنید
3. به **Settings** > **Functions** بروید
4. یک **Serverless Function** ایجاد کنید یا از **Deployments** > **Functions** استفاده کنید
5. یا از **Deployments** > **View Function Logs** استفاده کنید

### روش C: استفاده از Vercel CLI در Terminal

```bash
# در terminal محلی
vercel --prod
# بعد از deploy، migration را اجرا کنید
vercel env pull .env.local
npm run payload:migrate
```

## راه حل 2: اجرای Migration محلی

اگر environment variables را در `.env` تنظیم کرده‌اید:

```bash
cd landing
npm run payload:migrate
```

**نکته:** مطمئن شوید که `.env` شامل این متغیرها است:
```env
PAYLOAD_SECRET=your-secret-key
POSTGRES_URL=postgresql://...
# یا
POSTGRES_HOST=db.xxxxx.supabase.co
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DATABASE=postgres
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## راه حل 3: استفاده از Admin Panel (خودکار)

Payload به صورت خودکار migration را اجرا می‌کند وقتی:
1. Environment variables در Vercel تنظیم شده‌اند
2. به `/admin` برای اولین بار دسترسی پیدا می‌کنید
3. Payload initialization انجام می‌شود

**⚠️ اما:** در Vercel، این ممکن است کار نکند چون serverless functions stateless هستند.

## راه حل 4: ایجاد جداول دستی (فقط در صورت نیاز)

اگر هیچ کدام از روش‌های بالا کار نکرد، می‌توانید جداول را دستی ایجاد کنید:

1. به Supabase Dashboard بروید
2. به **SQL Editor** بروید
3. Payload از Drizzle ORM استفاده می‌کند و schema پیچیده است
4. بهتر است از migration استفاده کنید

## ✅ بعد از Migration

بعد از اجرای موفق migration، باید این جداول در Supabase ایجاد شوند:

- `users` - کاربران
- `posts` - پست‌های بلاگ
- `authors` - نویسندگان
- `categories` - دسته‌بندی‌ها
- `media` - فایل‌های رسانه‌ای
- `payload_migrations` - تاریخچه migration ها
- `payload_preferences` - تنظیمات Payload

## 🔍 بررسی Migration

برای بررسی وضعیت migration:

```bash
# در Supabase SQL Editor
SELECT * FROM payload_migrations;
```

یا:

```bash
npm run payload migrate:status
```

## 🚨 مشکل رایج

**خطا:** `relation "posts" does not exist`

**راه حل:**
1. مطمئن شوید که environment variables در Vercel تنظیم شده‌اند
2. Migration را اجرا کنید (روش 1)
3. یا به `/admin` بروید و Payload خودکار migration را اجرا می‌کند

## 📝 نکات مهم

- Migration فقط یک بار باید اجرا شود
- بعد از migration، جداول در Supabase ایجاد می‌شوند
- برای تغییر schema، باید migration جدید ایجاد کنید
- در Vercel، migration باید بعد از deploy اجرا شود

