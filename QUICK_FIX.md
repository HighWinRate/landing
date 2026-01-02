# راهنمای سریع حل مشکل نمایش محصولات

## مشکل: محصولات در Landing نمایش داده نمی‌شوند

### علت

- متغیرهای `NEXT_PUBLIC_SUPABASE_URL` یا `NEXT_PUBLIC_SUPABASE_ANON_KEY` تنظیم نشده‌اند.
- جدول `products` داده فعال ندارد (`is_active=false` یا ردیفی موجود نیست).
- thumbnail به bucket `thumbnails` اشاره نمی‌کند یا فایل حذف شده است.

### راه‌حل سریع

1. فایل `.env` لندینگ را باز کنید و مقادیر زیر را تنظیم کنید:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. در داشبورد Supabase، جدول `products` را بررسی کنید و مطمئن شوید حداقل یک ردیف `is_active=true` دارد.

3. اگر تصویر thumbnail نمایش داده نمی‌شود، مسیر آن در bucket `thumbnails` را بررسی کنید و در صورت نیاز آن را دوباره آپلود کنید.

4. Landing را ری‌استارت کنید (Ctrl+C و `npm run dev`).

### بررسی

1. با `curl` درخواست ساده به REST API بفرستید:

   ```bash
   curl -H "apikey: your-anon-key" \
        -H "Authorization: Bearer your-anon-key" \
        "https://your-project.supabase.co/rest/v1/products?select=id,title&limit=1"
   ```

   پاسخ باید لیستی از محصولات فعال را برگرداند.

2. در Console مرورگر (F12)، دنبال لاگ‌هایی باشید که از `landing/lib/data/products.ts` نشأت می‌گیرند و مطمئن شوید خطایی مثل `401` یا `403` وجود ندارد.

3. در تب Network، درخواست `rest/v1/products` را بررسی کنید، status code و هدرها را ببینید.

اگر هنوز مشکل حل نشد، مطمئن شوید Supabase پروژه‌تان محدودیتی برای Origin ندارد و از `https://` استفاده می‌کنید.

