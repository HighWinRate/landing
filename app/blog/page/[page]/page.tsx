import { client, postsQueryPaginated, postsCountQuery, isSanityConfigured } from '@/lib/sanity';
import BlogList from '@/components/blog/BlogList';
import Pagination from '@/components/blog/Pagination';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'وبلاگ | High Win Rate',
  description: 'مقالات و راهنماهای کاربردی در زمینه معاملات و استراتژی‌های معاملاتی',
};

const POSTS_PER_PAGE = 6;

type Props = {
  params: { page: string };
};

async function getPosts(page: number) {
  if (!isSanityConfigured()) {
    return { posts: [], total: 0 };
  }
  try {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    
    const [posts, total] = await Promise.all([
      client.fetch(postsQueryPaginated, { start, end }),
      client.fetch(postsCountQuery),
    ]);
    
    return { posts, total };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return { posts: [], total: 0 };
  }
}

export default async function BlogPagePage({ params }: Props) {
  const resolvedParams = await params;
  const page = parseInt(resolvedParams.page) || 1;
  
  if (page < 1) {
    notFound();
  }

  const { posts, total } = await getPosts(page);
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  if (page > totalPages && totalPages > 0) {
    notFound();
  }

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
          <Pagination currentPage={page} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}

