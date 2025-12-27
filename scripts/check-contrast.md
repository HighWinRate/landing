# راهنمای بررسی Contrast و رنگ‌ها

## قوانین کلی برای رنگ‌ها

### 1. Background های تیره (Dark Backgrounds)
- **Light Mode**: استفاده از gradient روشن (`from-primary-100 to-primary-300`)
- **Dark Mode**: استفاده از gradient تیره (`from-primary-500 to-primary-700`)
- **Text**: در light mode از `text-primary-800` یا `text-primary-900` استفاده کنید
- **Text**: در dark mode از `text-white` استفاده کنید

### 2. Background های روشن (Light Backgrounds)
- **Light Mode**: `bg-white` یا `bg-gray-50`
- **Dark Mode**: `bg-gray-800` یا `bg-gray-900`
- **Text**: همیشه `text-gray-900 dark:text-white`

### 3. Gradient Boxes
```tsx
// ✅ درست - Light mode روشن، Dark mode تیره
<div className="bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700">
  <div className="text-primary-800 dark:text-white">متن</div>
</div>

// ❌ اشتباه - همیشه تیره
<div className="bg-gradient-to-br from-primary-500 to-primary-700">
  <div className="text-white">متن</div>
</div>
```

### 4. Cards و Boxes
```tsx
// ✅ درست
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
  <h3 className="text-gray-900 dark:text-white">عنوان</h3>
  <p className="text-gray-600 dark:text-gray-300">متن</p>
</div>
```

## Checklist برای هر کامپوننت

- [ ] همه `text-white` باید `dark:text-white` هم داشته باشند
- [ ] همه `bg-gradient` باید برای light mode روشن باشند
- [ ] همه `text-gray-*` باید `dark:text-*` هم داشته باشند
- [ ] همه `bg-*` باید `dark:bg-*` هم داشته باشند
- [ ] هیچ gradient تیره در light mode نباید باشد

## Pattern های استاندارد

### Hero Section
```tsx
<section className="bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-primary-900 dark:via-primary-800 dark:to-primary-950">
  <h1 className="text-gray-900 dark:text-white">عنوان</h1>
</section>
```

### Card
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
  <h3 className="text-gray-900 dark:text-white">عنوان</h3>
  <p className="text-gray-600 dark:text-gray-300">متن</p>
</div>
```

### Gradient Box
```tsx
<div className="bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700">
  <div className="text-primary-800 dark:text-white">متن</div>
</div>
```

