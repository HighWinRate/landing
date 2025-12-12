# راهنمای سریع رفع مشکل CORS

## مشکل: محصولات در Landing نمایش داده نمی‌شوند

### علت
Backend فقط به originهای مشخص شده در `FRONTEND_URL` اجازه دسترسی می‌دهد. Landing در پورت 3003 اجرا می‌شود اما در `FRONTEND_URL` نیست.

### راه‌حل سریع

1. **فایل `.env` در Backend را باز کنید**:
   ```bash
   cd backend
   nano .env
   # یا
   code .env
   ```

2. **`FRONTEND_URL` را به‌روزرسانی کنید**:
   ```env
   FRONTEND_URL=http://localhost:3001,http://localhost:3002,http://localhost:3003
   ```

3. **Backend را restart کنید**:
   ```bash
   # اگر با npm run start:dev اجرا می‌کنید
   # Ctrl+C برای توقف
   npm run start:dev
   
   # یا اگر با ./start-dev.sh اجرا می‌کنید
   ./start-dev.sh
   ```

4. **Landing را refresh کنید** (F5)

### بررسی

بعد از restart، در Console مرورگر (F12) باید لاگ‌های زیر را ببینید:
- `[API] Fetching: http://localhost:3000/product`
- `[API] Response status: 200 OK`
- `[API] Response data: [...]`

### اگر هنوز کار نکرد

1. **بررسی کنید که Backend در حال اجرا است**:
   ```bash
   curl http://localhost:3000/health
   ```

2. **بررسی کنید که Landing در حال اجرا است**:
   ```bash
   curl http://localhost:3003
   ```

3. **Console مرورگر را بررسی کنید** (F12 > Console)

4. **Network Tab را بررسی کنید** (F12 > Network > product)

