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
    console.error('❌ Sanity is not configured');
    return null;
  }
  try {
    console.log('🔍 Fetching post with slug:', slug);
    
    // Try exact match first
    let post = await client.fetch(postBySlugQuery, { slug });
    
    if (!post) {
      console.warn('⚠️ No post found with exact slug match, trying alternative query...');
      // Try alternative query format
      const altQuery = `*[_type == "post" && slug.current == "${slug}"][0]`;
      post = await client.fetch(altQuery);
    }
    
    if (!post) {
      console.warn('⚠️ No post found with slug:', slug);
      // Try to find all posts to see what slugs exist
      const allPosts = await client.fetch(`*[_type == "post"] { slug, title }`);
      console.log('📋 All available posts:', allPosts.map((p: any) => ({ 
        slug: p.slug?.current || p.slug, 
        title: p.title 
      })));
    } else {
      console.log('✅ Post found:', post.title);
    }
    
    return post;
  } catch (error) {
    console.error('❌ Failed to fetch post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const slugs = await client.fetch(postSlugsQuery);
    console.log('📋 generateStaticParams - Found slugs:', JSON.stringify(slugs, null, 2));
    
    const params = slugs.map((item: any) => {
      // Handle both formats: { slug: "value" } or { slug: { current: "value" } }
      let slugValue: string;
      if (typeof item.slug === 'string') {
        slugValue = item.slug;
      } else if (item.slug?.current) {
        slugValue = item.slug.current;
      } else {
        console.warn('⚠️ Invalid slug format:', item);
        return null;
      }
      console.log('📋 Mapping slug:', slugValue);
      return { slug: slugValue };
    }).filter(Boolean);
    
    console.log('📋 generateStaticParams - Returning params:', params);
    return params;
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
  
  console.log('📄 PostPage called with params:', params);
  console.log('📄 Extracted slug:', slug);
  
  if (!slug) {
    console.error('❌ No slug provided');
    notFound();
  }
  
  const post = await getPost(slug);

  if (!post) {
    console.error('❌ Post not found, calling notFound()');
    notFound();
  }
  
  console.log('✅ Rendering post:', post.title);

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

