import { PortableTextBlock } from '@portabletext/types';

/**
 * محاسبه زمان خواندن پست بر اساس تعداد کلمات
 * فرض: متوسط 200 کلمه در دقیقه
 */
export function calculateReadingTime(body: PortableTextBlock[]): number {
  if (!body || !Array.isArray(body)) {
    return 1;
  }

  let wordCount = 0;

  // شمارش کلمات در تمام block ها
  body.forEach((block) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          // شمارش کلمات (فارسی و انگلیسی)
          const words = child.text.trim().split(/\s+/).filter((w: string) => w.length > 0);
          wordCount += words.length;
        }
      });
    }
  });

  // متوسط 200 کلمه در دقیقه
  const readingTime = Math.ceil(wordCount / 200);
  return readingTime > 0 ? readingTime : 1;
}

/**
 * فرمت کردن زمان خواندن به فارسی
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '۱ دقیقه';
  }
  return `${minutes} دقیقه`;
}

