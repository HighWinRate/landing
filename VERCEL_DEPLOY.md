# راهنمای Deploy در Vercel

## ⚠️ متغیرهای محیطی ضروری

برای deploy موفق در Vercel، باید این متغیرهای محیطی را در Vercel تنظیم کنید:

### 1. Payload CMS

```env
PAYLOAD_SECRET=your-generated-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.com
```

**نحوه تولید PAYLOAD_SECRET:**
```bash
openssl rand -base64 32
# یا
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Database (Supabase)

**روش 1: استفاده از متغیرهای جداگانه (پیشنهادی)**

```env
POSTGRES_HOST=db.xxxxxxxxxxxxx.supabase.co
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-database-password
POSTGRES_DATABASE=postgres
```

**روش 2: استفاده از Connection String**

```env
POSTGRES_URL=postgresql://postgres:password@db.xxxxxxxxxxxxx.supabase.co:5432/postgres?sslmode=require
```

**⚠️ مهم:** اگر از connection string استفاده می‌کنید، حتماً `?sslmode=require` را اضافه کنید.

**روش 3: استفاده از Supabase URL (host خودکار استخراج می‌شود)**

```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
# یا
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-database-password
POSTGRES_DATABASE=postgres
```

### 3. SSL Configuration (برای Supabase)

کد به صورت خودکار SSL را برای Supabase تنظیم می‌کند. اما اگر هنوز خطای "self-signed certificate" دارید:

**راه حل اضافی:** می‌توانید این environment variable را اضافه کنید:

```env
PGSSLMODE=require
```

### 4. سایر متغیرها

```env
NEXT_PUBLIC_API_URL=https://api.highwinrate.com
NEXT_PUBLIC_FRONTEND_URL=https://app.highwinrate.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📋 مراحل Deploy در Vercel

### مرحله 1: تنظیم Environment Variables

1. به داشبورد Vercel بروید
2. پروژه خود را انتخاب کنید
3. به **Settings** > **Environment Variables** بروید
4. تمام متغیرهای بالا را اضافه کنید

**⚠️ مهم:** 
- `PAYLOAD_SECRET` را حتماً تنظیم کنید (بدون آن build fail می‌شود)
- `POSTGRES_PASSWORD` را حتماً تنظیم کنید
- برای Production و Preview هر دو تنظیم کنید

### مرحله 2: Build Settings

Vercel به صورت خودکار از فایل `vercel.json` استفاده می‌کند که شامل:

```json
{
  "buildCommand": "npm install --legacy-peer-deps && npm run build",
  "installCommand": "npm install --legacy-peer-deps"
}
```

این فایل مشکل peer dependency را حل می‌کند.

### مرحله 3: Deploy

بعد از تنظیم متغیرها، deploy کنید:

1. Push کنید به Git repository
2. Vercel به صورت خودکار deploy می‌کند
3. یا می‌توانید از داشبورد Vercel "Redeploy" کنید

## 🔍 بررسی مشکلات

### خطا: "missing secret key"

**علت:** `PAYLOAD_SECRET` تنظیم نشده است.

**راه حل:**
1. به Vercel Settings > Environment Variables بروید
2. `PAYLOAD_SECRET` را اضافه کنید
3. یک secret key تولید کنید:
   ```bash
   openssl rand -base64 32
   ```
4. Redeploy کنید

### خطا: "Database connection failed"

**علت:** متغیرهای database تنظیم نشده یا اشتباه است.

**راه حل:**
1. بررسی کنید که `POSTGRES_PASSWORD` تنظیم شده است
2. بررسی کنید که `POSTGRES_HOST` یا `SUPABASE_URL` تنظیم شده است
3. بررسی کنید که IP Vercel در Supabase whitelist است (برای production)

### خطا: "self-signed certificate in certificate chain"

**علت:** Supabase از SSL استفاده می‌کند و Node.js نمی‌تواند certificate را verify کند.

**راه حل:**
1. کد به صورت خودکار SSL را تنظیم می‌کند
2. اگر هنوز خطا دارید، بررسی کنید که:
   - آخرین version کد را دارید (SSL config اضافه شده)
   - `POSTGRES_URL` شامل `?sslmode=require` است (اگر از connection string استفاده می‌کنید)
   - یا environment variable `PGSSLMODE=require` را اضافه کنید
3. Redeploy کنید

### خطا: Peer dependency conflict

**علت:** Next.js 16 با Payload 3.69.0 conflict دارد.

**راه حل:** فایل `vercel.json` و `.npmrc` این مشکل را حل می‌کنند. مطمئن شوید که این فایل‌ها commit شده‌اند.

## ✅ Checklist قبل از Deploy

- [ ] `PAYLOAD_SECRET` تنظیم شده
- [ ] `PAYLOAD_PUBLIC_SERVER_URL` تنظیم شده (URL کامل production)
- [ ] `POSTGRES_PASSWORD` تنظیم شده
- [ ] `POSTGRES_HOST` یا `SUPABASE_URL` تنظیم شده
- [ ] `POSTGRES_USER` تنظیم شده (یا default: 'postgres')
- [ ] `POSTGRES_DATABASE` تنظیم شده (یا default: 'postgres')
- [ ] اگر از `POSTGRES_URL` استفاده می‌کنید، `?sslmode=require` اضافه شده
- [ ] فایل `vercel.json` commit شده
- [ ] فایل `.npmrc` commit شده (اختیاری، vercel.json کافی است)

## 🚀 بعد از Deploy

1. **اجرای Migration:**
   ```bash
   # در Vercel CLI یا از طریق terminal
   npx payload migrate
   ```

2. **دسترسی به Admin Panel:**
   - آدرس: `https://your-domain.com/admin`
   - اولین بار باید یک کاربر admin ایجاد کنید

3. **ایجاد محتوا:**
   - Authors
   - Categories
   - Posts

## 📝 نکات مهم

- **PAYLOAD_SECRET:** هرگز این را در Git commit نکنید
- **POSTGRES_PASSWORD:** هرگز این را در Git commit نکنید
- **PAYLOAD_PUBLIC_SERVER_URL:** باید URL کامل production باشد (با https)
- برای تغییرات در Environment Variables، باید Redeploy کنید
- **SSL:** کد به صورت خودکار SSL را برای Supabase تنظیم می‌کند
