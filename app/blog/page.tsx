import { clientNoCache, postsQueryPaginated, postsCountQuery, isSanityConfigured } from '@/lib/sanity';
import BlogList from '@/components/blog/BlogList';
import Pagination from '@/components/blog/Pagination';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'وبلاگ | High Win Rate',
  description: 'مقالات و راهنماهای کاربردی در زمینه معاملات و استراتژی‌های معاملاتی',
};

// Force dynamic rendering to always get fresh data from Sanity
export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 6;

async function getPosts(page: number = 1) {
  if (!isSanityConfigured()) {
    return { posts: [], total: 0 };
  }
  try {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    
    const [posts, total] = await Promise.all([
      clientNoCache.fetch(postsQueryPaginated, { start, end }),
      clientNoCache.fetch(postsCountQuery),
    ]);
    
    return { posts, total };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return { posts: [], total: 0 };
  }
}

export default async function BlogPage() {
  const { posts, total } = await getPosts(1);
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
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
  );
}

