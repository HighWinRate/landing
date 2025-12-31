# راهنمای راه‌اندازی Payload CMS

## 📋 متغیرهای محیطی مورد نیاز

### 1. PAYLOAD_SECRET
یک کلید مخفی تصادفی برای امنیت Payload. این کلید برای:
- رمزنگاری session ها
- امنیت API endpoints
- امنیت Admin Panel

**نحوه تولید:**
```bash
# در ترمینال
openssl rand -base64 32
# یا
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**مثال:**
```env
PAYLOAD_SECRET=your-generated-secret-key-here-min-32-chars
```

### 2. PAYLOAD_PUBLIC_SERVER_URL
آدرس کامل سرور Next.js که Payload روی آن اجرا می‌شود.

**برای Development:**
```env
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3003
```

**برای Production:**
```env
PAYLOAD_PUBLIC_SERVER_URL=https://highwinrate.com
# یا
PAYLOAD_PUBLIC_SERVER_URL=https://www.highwinrate.com
```

**چرا نیاز است؟**
- Payload از این URL برای ساخت URLهای کامل API استفاده می‌کند
- برای ساخت URL تصاویر و فایل‌های آپلود شده
- Admin Panel از این URL برای ارتباط با API استفاده می‌کند
- برای تنظیمات CORS و CSRF

**⚠️ مهم:** این URL باید دقیقاً همان آدرسی باشد که Next.js app شما روی آن اجرا می‌شود.

### 3. Database Configuration (دو روش)

#### روش 1: استفاده از متغیرهای جداگانه Supabase (پیشنهادی) ⭐

این روش بهتر است چون با متغیرهای Supabase که احتمالاً قبلاً تنظیم کرده‌اید هماهنگ است:

```env
POSTGRES_HOST=db.xxxxxxxxxxxxx.supabase.co
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-database-password
POSTGRES_DATABASE=postgres
```

**نحوه دریافت از Supabase:**
1. به داشبورد Supabase بروید
2. به Settings > Database بروید
3. در بخش "Connection string" اطلاعات زیر را پیدا کنید:
   - **Host**: `db.xxxxxxxxxxxxx.supabase.co`
   - **Port**: `5432` (یا `6543` برای connection pooling)
   - **Database**: معمولاً `postgres`
   - **User**: معمولاً `postgres`
   - **Password**: رمز عبور database شما

#### روش 2: استفاده از Connection String

```env
POSTGRES_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

**نحوه دریافت:**
1. به داشبورد Supabase بروید
2. به Settings > Database بروید
3. در بخش "Connection string" گزینه "URI" را انتخاب کنید
4. Connection string را کپی کنید

**⚠️ نکته:** اگر از connection string استفاده می‌کنید، رمز عبور را در URL encode کنید (مخصوصاً اگر کاراکترهای خاص دارد).

#### اولویت استفاده:

کد به ترتیب زیر سعی می‌کند:
1. `POSTGRES_URL` (connection string)
2. `POSTGRES_PRISMA_URL`
3. `POSTGRES_URL_NON_POOLING`
4. `SUPABASE_DB_URL`
5. `DATABASE_URL`
6. متغیرهای جداگانه (`POSTGRES_HOST`, `POSTGRES_USER`, ...)

## 🚀 مراحل راه‌اندازی

### مرحله 1: ایجاد فایل .env

```bash
cd landing
cp env.example.txt .env
```

### مرحله 2: تنظیم متغیرهای محیطی

فایل `.env` را باز کنید و مقادیر را تنظیم کنید:

```env
# Payload Configuration
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3003

# Database (Supabase) - Method 1: Individual variables (recommended)
POSTGRES_HOST=db.xxxxxxxxxxxxx.supabase.co
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-database-password
POSTGRES_DATABASE=postgres

# Or Method 2: Connection string
# POSTGRES_URL=postgresql://postgres:password@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

### مرحله 3: اجرای Migration

برای ایجاد جداول در پایگاه داده:

```bash
npm run payload migrate
```

یا اگر دستور `payload` در package.json نیست:

```bash
npx payload migrate
```

### مرحله 4: راه‌اندازی سرور

```bash
npm run dev
```

### مرحله 5: دسترسی به Admin Panel

1. به آدرس `http://localhost:3003/admin` بروید
2. اولین بار که وارد می‌شوید، باید یک کاربر admin ایجاد کنید:
   - Email
   - Password
   - Name (اختیاری)

### مرحله 6: ایجاد محتوا

بعد از ورود به Admin Panel:

1. **ایجاد Author:**
   - به بخش "Authors" بروید
   - "Create New" را کلیک کنید
   - Name, Slug, Image, Bio و Social Links را پر کنید

2. **ایجاد Category:**
   - به بخش "Categories" بروید
   - "Create New" را کلیک کنید
   - Title, Slug و Description را پر کنید

3. **ایجاد Post:**
   - به بخش "Posts" بروید
   - "Create New" را کلیک کنید
   - تمام فیلدها را پر کنید:
     - Title
     - Slug (خودکار از Title ساخته می‌شود)
     - Author (از لیست انتخاب کنید)
     - Main Image
     - Categories (می‌توانید چند تا انتخاب کنید)
     - Published At
     - Excerpt
     - Body (Rich Text Editor)
     - SEO (اختیاری)
     - Status: "Published" را انتخاب کنید

## 🔍 بررسی صحت تنظیمات

### بررسی اتصال به پایگاه داده

```bash
# تست اتصال
npm run payload migrate:status
```

### بررسی Admin Panel

- آدرس: `http://localhost:3003/admin`
- باید صفحه ورود یا داشبورد را ببینید

### بررسی API

- API Endpoint: `http://localhost:3003/api/payload/posts`
- باید JSON response ببینید

## 🐛 عیب‌یابی

### مشکل: "PAYLOAD_SECRET is required"

**راه حل:** مطمئن شوید که `PAYLOAD_SECRET` در فایل `.env` تنظیم شده است.

### مشکل: "Database connection failed"

**راه حل:**
1. بررسی کنید که متغیرهای database صحیح هستند:
   - اگر از connection string استفاده می‌کنید: `POSTGRES_URL` را بررسی کنید
   - اگر از متغیرهای جداگانه استفاده می‌کنید: `POSTGRES_HOST`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE` را بررسی کنید
2. بررسی کنید که Supabase project شما active است
3. بررسی کنید که IP شما در Supabase whitelist است (برای production)
4. بررسی کنید که رمز عبور درست است (اگر در connection string است، باید URL encoded باشد)

### مشکل: "Cannot find module 'payload'"

**راه حل:**
```bash
npm install
```

### مشکل: Admin Panel باز نمی‌شود

**راه حل:**
1. بررسی کنید که سرور در حال اجرا است (`npm run dev`)
2. بررسی کنید که `PAYLOAD_PUBLIC_SERVER_URL` صحیح است
3. بررسی console برای خطاها

## 📝 نکات مهم

1. **PAYLOAD_SECRET:** هرگز این کلید را در Git commit نکنید
2. **PAYLOAD_PUBLIC_SERVER_URL:** در production باید URL کامل با https باشد
3. **POSTGRES_URL:** از connection pooling استفاده کنید برای performance بهتر
4. **Migration:** فقط یک بار اجرا کنید (برای ایجاد جداول)

## 🔗 لینک‌های مفید

- [Payload Documentation](https://payloadcms.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

