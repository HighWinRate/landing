import { client, postBySlugQuery, postSlugsQuery, isSanityConfigured } from '@/lib/sanity';
import BlogPost from '@/components/blog/BlogPost';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

async function getPost(slug: string) {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    const post = await client.fetch(postBySlugQuery, { slug });
    return post;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const slugs = await client.fetch(postSlugsQuery);
    return slugs.map((item: { slug: string }) => ({
      slug: item.slug,
    }));
  } catch (error) {
    // If Sanity is not configured or no posts exist, return empty array
    console.warn('Failed to fetch post slugs:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'پست یافت نشد',
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogPost post={post} />
      </div>
    </div>
  );
}

