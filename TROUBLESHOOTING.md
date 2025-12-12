# راهنمای عیب‌یابی Landing Page

## خطای "Failed to fetch"

این خطا معمولاً به این معنی است که:

### 1. Backend در حال اجرا نیست

**بررسی**:

```bash
# در terminal
curl http://localhost:3000/health
```

**راه‌حل**:

```bash
cd backend
npm run start:dev
# یا
./start-dev.sh
```

### 2. مشکل CORS

**بررسی**:

- Console مرورگر را باز کنید (F12)
- خطای CORS را ببینید

**راه‌حل**:

1. فایل `.env` در Backend را باز کنید
2. `FRONTEND_URL` را به‌روزرسانی کنید:
   ```env
   FRONTEND_URL=http://localhost:3001,http://localhost:3002,http://localhost:3003
   ```
3. Backend را restart کنید

### 3. URL API اشتباه است

**بررسی**:

- فایل `.env` در Landing را بررسی کنید:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:3000
  ```

**راه‌حل**:

- اگر URL اشتباه است، آن را اصلاح کنید
- Landing را restart کنید

## بررسی سریع

### 1. بررسی Backend

```bash
curl http://localhost:3000/health
# باید پاسخ {"status":"ok"} بدهد
```

### 2. بررسی API Products

```bash
curl http://localhost:3000/product
# باید لیست محصولات را برگرداند
```

### 3. بررسی Landing

```bash
# در Landing
npm run dev
# باید در http://localhost:3003 اجرا شود
```

## مراحل عیب‌یابی

1. ✅ Backend در حال اجرا است؟
2. ✅ `FRONTEND_URL` در Backend شامل `http://localhost:3003` است؟
3. ✅ `NEXT_PUBLIC_API_URL` در Landing درست است؟
4. ✅ Landing را restart کرده‌اید؟
5. ✅ Backend را restart کرده‌اید؟

## خطاهای رایج

### "Cannot connect to Backend"

- Backend را start کنید
- پورت 3000 را بررسی کنید

### "CORS policy blocked"

- `FRONTEND_URL` را در Backend به‌روزرسانی کنید
- Backend را restart کنید

### "404 Not Found"

- URL API را بررسی کنید
- Endpoint در Backend موجود است؟

### "Network Error"

- اینترنت را بررسی کنید
- Firewall را بررسی کنید
