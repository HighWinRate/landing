# راه حل مشکل SSL برای Supabase

## مشکل

خطای "self-signed certificate in certificate chain" هنگام اتصال به Supabase PostgreSQL.

## راه حل (مشابه Backend)

در backend، از `NODE_TLS_REJECT_UNAUTHORIZED=0` استفاده می‌شود. همین روش را در Payload هم می‌توانیم استفاده کنیم.

### روش 1: Environment Variable در Vercel (پیشنهادی)

در Vercel Dashboard:
1. Settings > Environment Variables
2. اضافه کنید:
   ```env
   NODE_TLS_REJECT_UNAUTHORIZED=0
   ```
3. Redeploy کنید

### روش 2: در کد (فعلاً اعمال شده)

کد به صورت خودکار SSL config را در `pool` تنظیم می‌کند:
```typescript
ssl: {
  rejectUnauthorized: false,
}
```

اما اگر هنوز کار نمی‌کند، از روش 1 استفاده کنید.

## مقایسه با Backend

- **Backend**: TypeORM از connection string استفاده می‌کند و SSL config ندارد
- **Payload**: `postgresAdapter` از `pg.Pool` استفاده می‌کند و نیاز به SSL config دارد

## نکته امنیتی

`NODE_TLS_REJECT_UNAUTHORIZED=0` SSL certificate verification را غیرفعال می‌کند. این برای Supabase قابل قبول است چون:
- Supabase یک سرویس معتبر است
- اتصال از طریق HTTPS انجام می‌شود
- فقط certificate verification غیرفعال شده است

