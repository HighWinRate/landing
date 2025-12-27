import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "High Win Rate - استراتژی‌های معاملاتی حرفه‌ای",
  description: "فروشگاه آنلاین استراتژی‌های معاملاتی با نرخ برد بالا. دوره‌های آموزشی، فایل‌های حرفه‌ای و راهنمای معاملات.",
  keywords: ["معاملات", "استراتژی معاملاتی", "فارکس", "کریپتو", "تریدینگ"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

