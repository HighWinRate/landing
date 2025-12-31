import { getPosts } from '@/lib/payload';
import BlogList from '@/components/blog/BlogList';
import Pagination from '@/components/blog/Pagination';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'وبلاگ | High Win Rate',
  description: 'مقالات و راهنماهای کاربردی در زمینه معاملات و استراتژی‌های معاملاتی',
};

// Force dynamic rendering to always get fresh data from Payload
export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 6;

export default async function BlogPage() {
  try {
    const { posts, total, totalPages } = await getPosts(1, POSTS_PER_PAGE);

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

