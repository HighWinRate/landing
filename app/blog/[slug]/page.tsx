import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  getImageUrl,
} from '@/lib/blog';
import BlogPost from '@/components/blog/BlogPost';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

// Enable dynamic rendering for new posts (render at request time)
export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs
      .map((item) => ({
        slug: item.slug,
      }))
      .filter((p) => p.slug);
  } catch (error) {
    console.warn('Failed to fetch post slugs:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug =
    typeof resolvedParams.slug === 'string'
      ? resolvedParams.slug
      : resolvedParams.slug?.[0] || '';

  if (!slug) {
    return {
      title: 'پست یافت نشد',
    };
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'پست یافت نشد',
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description =
    post.seo?.metaDescription ||
    post.excerpt ||
    'مقالات و راهنماهای کاربردی در زمینه معاملات';

  // ساخت URL تصویر
  const image = post.mainImage ? getImageUrl(post.mainImage) : undefined;

  const url = `https://highwinrate.com/blog/${slug}`;

  const authorNames = post.author?.name
    ? [post.author.name]
    : post.author?.slug
      ? [post.author.slug]
      : [];

  return {
    title,
    description,
    keywords: post.seo?.keywords?.map((k: any) => k.keyword || k).join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'High Win Rate',
      images: image
        ? [{ url: image, width: 1200, height: 600, alt: post.title }]
        : [],
      locale: 'fa_IR',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: authorNames,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug =
    typeof resolvedParams.slug === 'string'
      ? resolvedParams.slug
      : resolvedParams.slug?.[0] || '';

  if (!slug) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const categoryIds =
    post.categories?.map((cat: any) => cat.id || cat).filter(Boolean) || [];
  const relatedPosts =
    categoryIds.length > 0 ? await getRelatedPosts(post.id, categoryIds) : [];

  // ساخت JSON-LD برای Article Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.seo?.metaDescription,
    image: post.mainImage ? getImageUrl(post.mainImage) : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'High Win Rate Team',
      url: post.author?.slug
        ? `https://highwinrate.com/blog/author/${post.author.slug}`
        : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'High Win Rate',
      logo: {
        '@type': 'ImageObject',
        url: 'https://highwinrate.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://highwinrate.com/blog/${slug}`,
    },
    keywords: post.seo?.keywords?.map((k: any) => k.keyword || k).join(', '),
    articleSection: post.categories?.map((c) => c.title).join(', '),
    inLanguage: 'fa',
    url: `https://highwinrate.com/blog/${slug}`,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BackButton />
          <BlogPost post={post} />
          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </div>
      </div>
    </>
  );
}

function BackButton() {
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
    >
      <ArrowRight className="h-4 w-4" />
      بازگشت به بلاگ
    </Link>
  );
}
