# Environment Variables برای Vercel (highwinrate.com)

## ⚠️ متغیرهای ضروری برای Production

این متغیرها را در Vercel Dashboard > Settings > Environment Variables اضافه کنید:

### 1. Payload CMS

```env
PAYLOAD_SECRET=your-generated-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=https://highwinrate.com
```

**نحوه تولید PAYLOAD_SECRET:**
```bash
openssl rand -base64 32
```

### 2. Database (Supabase)

```env
POSTGRES_HOST=db.xxxxxxxxxxxxx.supabase.co
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-database-password
POSTGRES_DATABASE=postgres
```

یا از Connection String:

```env
POSTGRES_URL=postgresql://postgres:password@db.xxxxxxxxxxxxx.supabase.co:5432/postgres?sslmode=require
```

### 3. SSL Configuration

```env
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### 4. Supabase Storage (برای Media uploads)

```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=media
```

### 5. سایر متغیرها (اگر نیاز دارید)

```env
NEXT_PUBLIC_API_URL=https://api.highwinrate.com
NEXT_PUBLIC_FRONTEND_URL=https://app.highwinrate.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📋 Checklist

- [ ] `PAYLOAD_SECRET` تنظیم شده
- [ ] `PAYLOAD_PUBLIC_SERVER_URL=https://highwinrate.com` تنظیم شده
- [ ] `POSTGRES_PASSWORD` تنظیم شده
- [ ] `POSTGRES_HOST` یا `POSTGRES_URL` تنظیم شده
- [ ] `NODE_TLS_REJECT_UNAUTHORIZED=0` تنظیم شده
- [ ] `SUPABASE_SERVICE_ROLE_KEY` تنظیم شده (برای Storage)
- [ ] Bucket `media` در Supabase Storage ایجاد شده

## 🚀 بعد از تنظیم Environment Variables

1. **Redeploy** کنید در Vercel
2. **Migration را اجرا کنید:**
   - می‌توانید از Vercel CLI استفاده کنید
   - یا از Supabase SQL Editor جداول را دستی ایجاد کنید
3. **تست کنید:**
   - به `https://highwinrate.com/admin` بروید
   - یک کاربر admin ایجاد کنید
   - محتوا ایجاد کنید

## ⚠️ مهم

- `PAYLOAD_PUBLIC_SERVER_URL` باید دقیقاً `https://highwinrate.com` باشد (با https)
- برای تغییرات در Environment Variables، باید Redeploy کنید
- Migration باید بعد از اولین deploy اجرا شود

