import { SerializedEditorState } from 'lexical';

/**
 * محاسبه زمان خواندن پست بر اساس تعداد کلمات
 * فرض: متوسط 200 کلمه در دقیقه
 */
export function calculateReadingTime(body: SerializedEditorState | any): number {
  if (!body) {
    return 1;
  }

  let wordCount = 0;

  // برای Lexical، باید از root node شروع کنیم
  const countWordsInNode = (node: any): void => {
    if (!node) return;

    // اگر node متن دارد
    if (node.text) {
      const words = node.text.trim().split(/\s+/).filter((w: string) => w.length > 0);
      wordCount += words.length;
    }

    // اگر children دارد، بازگشتی بررسی کن
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => countWordsInNode(child));
    }
  };

  // شروع از root
  if (body.root) {
    countWordsInNode(body.root);
  } else if (body.children) {
    body.children.forEach((child: any) => countWordsInNode(child));
  }

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

