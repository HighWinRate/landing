import { client, postBySlugQuery, postSlugsQuery, relatedPostsQuery, isSanityConfigured } from '@/lib/sanity';
import BlogPost from '@/components/blog/BlogPost';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Enable dynamic rendering for new posts (render at request time)
export const dynamic = 'force-dynamic';

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
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0] || '';
  
  if (!slug) {
    return {
      title: 'پست یافت نشد',
    };
  }
  
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'پست یافت نشد',
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || 'مقالات و راهنماهای کاربردی در زمینه معاملات';
  
  // ساخت URL تصویر از Sanity
  let image: string | undefined;
  if (post.mainImage?.asset) {
    const asset = post.mainImage.asset;
    if (asset._ref) {
      const ref = asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp');
      image = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${ref}?w=1200&h=600&fit=crop`;
    } else if (asset.url) {
      image = asset.url;
    }
  }
  
  const url = `https://highwinrate.com/blog/${slug}`;

  return {
    title,
    description,
    keywords: post.seo?.keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'High Win Rate',
      images: image ? [{ url: image, width: 1200, height: 600, alt: post.title }] : [],
      locale: 'fa_IR',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
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

async function getRelatedPosts(currentPost: any) {
  if (!isSanityConfigured() || !currentPost) {
    return [];
  }
  
  try {
    // گرفتن _ref از categories
    const categoryIds = currentPost.categories?.map((cat: any) => {
      // اگر reference مستقیم است
      if (cat._ref) return cat._ref;
      // اگر object است و _id دارد
      if (cat._id) return cat._id;
      return null;
    }).filter(Boolean) || [];
    
    if (categoryIds.length === 0) {
      return [];
    }
    
    const related = await client.fetch(relatedPostsQuery, {
      currentId: currentPost._id,
      categoryIds,
    });
    return related || [];
  } catch (error) {
    console.error('Failed to fetch related posts:', error);
    return [];
  }
}

export default async function PostPage({ params }: Props) {
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0] || '';
  
  if (!slug) {
    notFound();
  }
  
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogPost post={post} />
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </div>
    </div>
  );
}

