import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  author?: {
    name: string;
    slug: { current: string };
    image?: any;
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
  }>;
}

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const publishedDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'd MMMM yyyy')
    : '';

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {post.mainImage && (
          <div className="relative w-full h-48">
            <Image
              src={urlFor(post.mainImage).width(600).height(300).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}
          <div className="mt-auto">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug.current}
                    href={`/blog/category/${category.slug.current}`}
                    className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              {post.author && (
                <Link
                  href={`/blog/author/${post.author.slug.current}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.author.name}
                </Link>
              )}
              {publishedDate && <span>{publishedDate}</span>}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

