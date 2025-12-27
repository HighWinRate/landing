import { client, postsQuery, isSanityConfigured } from '@/lib/sanity';
import BlogList from '@/components/blog/BlogList';
import BlogDebug from '@/components/blog/BlogDebug';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'وبلاگ | High Win Rate',
  description: 'مقالات و راهنماهای کاربردی در زمینه معاملات و استراتژی‌های معاملاتی',
};

async function getPosts() {
  if (!isSanityConfigured()) {
    console.error('❌ Sanity is not configured!');
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    return [];
  }
  try {
    console.log('✅ Fetching posts from Sanity...');
    const posts = await client.fetch(postsQuery);
    console.log(`✅ Found ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error('❌ Failed to fetch posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const isConfigured = isSanityConfigured();
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            وبلاگ High Win Rate
          </h1>
          <p className="text-lg text-muted-foreground">
            مقالات و راهنماهای کاربردی در زمینه معاملات
          </p>
        </div>

        {/* Debug Panel - همیشه نمایش داده می‌شود */}
        <BlogDebug 
          isConfigured={isConfigured}
          projectId={projectId}
          postsCount={posts.length}
        />

        <BlogList posts={posts} />
      </div>
    </div>
  );
}

