import { getCategoryBySlug, getPostsByCategory } from '@/lib/blog';
import BlogList from '@/components/blog/BlogList';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = typeof resolvedParams.slug === 'string' ? resolvedParams.slug : resolvedParams.slug?.[0] || '';
  
  if (!slug) {
    return {
      title: 'دسته‌بندی یافت نشد',
    };
  }
  
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'دسته‌بندی یافت نشد',
    };
  }

  const title = `${category.title}`;
  const description = category.description || `مقالات و پست‌های مرتبط با ${category.title} در وبلاگ High Win Rate`;
  const url = `https://highwinrate.com/blog/category/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'fa_IR',
      siteName: 'High Win Rate',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = typeof resolvedParams.slug === 'string' ? resolvedParams.slug : resolvedParams.slug?.[0] || '';
  
  if (!slug) {
    notFound();
  }
  
  const category = await getCategoryBySlug(slug);
  const posts = await getPostsByCategory(slug);

  if (!category) {
    notFound();
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: category.title,
        item: `https://highwinrate.com/blog/category/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {category.title}
            </h1>
            {category.description && (
              <p className="text-lg text-muted-foreground">
                {category.description}
              </p>
            )}
          </div>
          <BlogList posts={posts} />
        </div>
      </div>
    </>
  );
}

