import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://highwinrate.com'),
  title: {
    default: "High Win Rate - استراتژی‌های معاملاتی حرفه‌ای",
    template: "%s | High Win Rate",
  },
  description: "فروشگاه آنلاین استراتژی‌های معاملاتی با نرخ برد بالا. دوره‌های آموزشی، فایل‌های حرفه‌ای و راهنمای معاملات کریپتو و فارکس.",
  keywords: ["معاملات", "استراتژی معاملاتی", "فارکس", "کریپتو", "تریدینگ", "آموزش معاملات", "سیگنال معاملاتی", "نرخ برد بالا"],
  authors: [{ name: "High Win Rate Team" }],
  creator: "High Win Rate",
  publisher: "High Win Rate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://highwinrate.com",
    siteName: "High Win Rate",
    title: "High Win Rate - استراتژی‌های معاملاتی حرفه‌ای",
    description: "فروشگاه آنلاین استراتژی‌های معاملاتی با نرخ برد بالا. دوره‌های آموزشی، فایل‌های حرفه‌ای و راهنمای معاملات کریپتو و فارکس.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "High Win Rate - استراتژی‌های معاملاتی حرفه‌ای",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "High Win Rate - استراتژی‌های معاملاتی حرفه‌ای",
    description: "فروشگاه آنلاین استراتژی‌های معاملاتی با نرخ برد بالا",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

