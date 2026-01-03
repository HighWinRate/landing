import { getPosts } from '@/lib/blog';
import BlogList from '@/components/blog/BlogList';
import Pagination from '@/components/blog/Pagination';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'وبلاگ',
  description: 'مقالات و راهنماهای کاربردی در زمینه معاملات، استراتژی‌های معاملاتی، تحلیل تکنیکال و فاندامنتال. آموزش فارکس و کریپتو برای تریدرهای حرفه‌ای.',
  keywords: ['بلاگ معاملات', 'آموزش تریدینگ', 'استراتژی معاملاتی', 'تحلیل تکنیکال', 'تحلیل فاندامنتال'],
  openGraph: {
    title: 'وبلاگ High Win Rate',
    description: 'مقالات و راهنماهای کاربردی در زمینه معاملات و استراتژی‌های معاملاتی',
    url: 'https://highwinrate.com/blog',
    type: 'website',
    locale: 'fa_IR',
    siteName: 'High Win Rate',
    images: [
      {
        url: '/og-image-blog.png',
        width: 1200,
        height: 630,
        alt: 'وبلاگ High Win Rate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'وبلاگ High Win Rate',
    description: 'مقالات و راهنماهای کاربردی در زمینه معاملات',
  },
  alternates: {
    canonical: 'https://highwinrate.com/blog',
  },
};

// Force dynamic rendering to always get fresh data from Payload
export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 6;

export default async function BlogPage() {
  try {
    const { posts, total, totalPages } = await getPosts(1, POSTS_PER_PAGE);

    // JSON-LD برای Blog Section
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'وبلاگ High Win Rate',
      description: 'مقالات و راهنماهای کاربردی در زمینه معاملات و استراتژی‌های معاملاتی',
      url: 'https://highwinrate.com/blog',
      inLanguage: 'fa',
      publisher: {
        '@type': 'Organization',
        name: 'High Win Rate',
        logo: {
          '@type': 'ImageObject',
          url: 'https://highwinrate.com/logo.png',
        },
      },
    };

    // Breadcrumb Schema
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'خانه',
          item: 'https://highwinrate.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'وبلاگ',
          item: 'https://highwinrate.com/blog',
        },
      ],
    };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              وبلاگ High Win Rate
            </h1>
            <p className="text-lg text-muted-foreground">
              مقالات و راهنماهای کاربردی در زمینه معاملات
            </p>
          </div>

          <BlogList posts={posts} />
          
          {totalPages > 1 && (
            <Pagination currentPage={1} totalPages={totalPages} />
          )}
        </div>
      </div>
    </>
  );
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return (
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-muted-foreground">خطا در بارگذاری پست‌ها</p>
          </div>
        </div>
      </div>
    );
  }
}

