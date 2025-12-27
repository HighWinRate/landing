import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  body: any;
  author?: {
    name: string;
    slug: { current: string };
    image?: any;
    bio?: any;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
    description?: string;
  }>;
}

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const publishedDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'd MMMM yyyy')
    : '';

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <header className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {post.excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {post.author && (
            <Link
              href={`/blog/author/${post.author.slug.current}`}
              className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {post.author.image && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span>{post.author.name}</span>
            </Link>
          )}
          {publishedDate && <span>•</span>}
          {publishedDate && <span>{publishedDate}</span>}
        </div>
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.categories.map((category) => (
              <Link
                key={category.slug.current}
                href={`/blog/category/${category.slug.current}`}
                className="text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded hover:bg-primary-200 dark:hover:bg-primary-800"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.mainImage && (
        <div className="relative w-full h-96">
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="px-6 py-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>

      {post.author && (
        <footer className="px-6 py-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-start gap-4">
            {post.author.image && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(post.author.image).width(64).height(64).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <Link
                href={`/blog/author/${post.author.slug.current}`}
                className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
              >
                {post.author.name}
              </Link>
              {post.author.bio && (
                <div className="mt-2 prose prose-sm dark:prose-invert max-w-none">
                  <PortableText value={post.author.bio} />
                </div>
              )}
              {post.author.socialLinks && (
                <div className="flex gap-4 mt-4">
                  {post.author.socialLinks.twitter && (
                    <a
                      href={post.author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Twitter
                    </a>
                  )}
                  {post.author.socialLinks.linkedin && (
                    <a
                      href={post.author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                  )}
                  {post.author.socialLinks.github && (
                    <a
                      href={post.author.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </footer>
      )}
    </article>
  );
}

