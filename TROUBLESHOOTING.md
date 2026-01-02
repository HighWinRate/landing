# راهنمای عیب‌یابی Landing Page

## خطای "Failed to fetch"

این خطا معمولاً به این معنی است که Landing نمی‌تواند به Supabase دسترسی پیدا کند (محیط یا شبکه).

### 1. مقادیر محیطی بررسی نشده‌اند

**بررسی**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**راه‌حل**:

- مقادیر فوق را در `.env` لندینگ وارد کنید.
- پس از به‌روزرسانی فایل env، `npm run dev` را ری‌استارت کنید.

### 2. Supabase پاسخ نمی‌دهد

**بررسی**:

```bash
curl -H "apikey: your-anon-key" \
     -H "Authorization: Bearer your-anon-key" \
     "https://your-project.supabase.co/rest/v1/products?select=id&limit=1"
```

اگر status غیر از 200 دریافت کردید، مطمئن شوید پروژه Supabase فعال است و `Anon Key` صحیح است.

### 3. Cache مرورگر یا env قدیمی

- کش مرورگر را پاک کنید.
- اگر env را بدون ری‌استارت تغییر داده‌اید، سرور توسعه را ببندید و دوباره اجرا کنید.

## بررسی سریع

### 1. بررسی Supabase

```bash
curl -H "apikey: your-anon-key" \
     -H "Authorization: Bearer your-anon-key" \
     "https://your-project.supabase.co/rest/v1/products?select=id&limit=1"
```

اگر لیستی برنگشت، `products` یا `Anon Key` را در داشبورد Supabase بررسی کنید.

### 2. بررسی Landing

```bash
cd landing
npm run dev
# یا npm run dev -- --hostname 0.0.0.0
```

اگر صفحه در http://localhost:3003 باز نمی‌شود، پیام خطا را در کنسول ببینید.

### 3. بررسی thumbnailها

اگر تصاویر محصول نمایش داده نمی‌شوند، مسیر `thumbnail` را در Supabase Storage با URL عمومی بررسی کنید:

```
https://your-project.supabase.co/storage/v1/object/public/thumbnails/{path}
```

## مراحل عیب‌یابی

1. ✅ `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` به‌روز هستند؟
2. ✅ Supabase جدول `products` را برمی‌گرداند؟
3. ✅ مرورگر خطای 403/401 یا 404 نمی‌دهد؟
4. ✅ سرور dev را ری‌استارت کرده‌اید تا env جدید بارگذاری شود؟

## خطاهای رایج

### "Cannot connect to Supabase"

- مقدار `NEXT_PUBLIC_SUPABASE_URL` را بررسی کنید.
- اگر پروژه Supabase غیرفعال شده، آن را دوباره فعال کنید.

### "403 Forbidden" یا "401 Unauthorized"

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` را از داشبورد Supabase بگیرید و env را به‌روزرسانی کنید.
- اگر key منقضی شده، یک `New Project API key` بسازید.

### "404 Not Found"

- مسیر `/rest/v1/products` را در Supabase بررسی کنید که جدول وجود داشته باشد.
- اگر از شرط‌هایی مثل `is_active` استفاده می‌کنید، مطمئن شوید حداقل یک ردیف `true` دارد.

### "Network Error"

- مطمئن شوید اینترنت و DNS به Supabase دسترسی دارند.
- فایروال یا پروکسی را چک کنید که درخواست‌ها را بلاک نکند.

