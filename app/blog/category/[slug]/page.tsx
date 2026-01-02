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

  return {
    title: `${category.title} | High Win Rate Blog`,
    description: category.description,
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

  return (
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
  );
}

