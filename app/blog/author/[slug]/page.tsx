import { client, authorBySlugQuery, postsByAuthorQuery, isSanityConfigured } from '@/lib/sanity';
import BlogList from '@/components/blog/BlogList';
import { notFound } from 'next/navigation';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

async function getAuthor(slug: string) {
  if (!isSanityConfigured()) {
    return null;
  }
  try {
    const author = await client.fetch(authorBySlugQuery, { slug });
    return author;
  } catch (error) {
    console.error('Failed to fetch author:', error);
    return null;
  }
}

async function getPostsByAuthor(slug: string) {
  if (!isSanityConfigured()) {
    return [];
  }
  try {
    const posts = await client.fetch(postsByAuthorQuery, { slug });
    return posts;
  } catch (error) {
    console.error('Failed to fetch posts by author:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0] || '';
  
  if (!slug) {
    return {
      title: 'نویسنده یافت نشد',
    };
  }
  
  const author = await getAuthor(slug);
  
  if (!author) {
    return {
      title: 'نویسنده یافت نشد',
    };
  }

  return {
    title: `${author.name} | High Win Rate Blog`,
    description: author.bio ? 'نویسنده وبلاگ High Win Rate' : undefined,
  };
}

export default async function AuthorPage({ params }: Props) {
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0] || '';
  
  if (!slug) {
    notFound();
  }
  
  const author = await getAuthor(slug);
  const posts = await getPostsByAuthor(slug);

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-lg shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {author.image && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(author.image).width(128).height(128).url()}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold mb-4">
                {author.name}
              </h1>
              {author.bio && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <PortableText value={author.bio} />
                </div>
              )}
              {author.socialLinks && (
                <div className="flex gap-4 justify-center md:justify-start mt-6">
                  {author.socialLinks.twitter && (
                    <a
                      href={author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                  {author.socialLinks.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {author.socialLinks.github && (
                    <a
                      href={author.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">
            مقالات {author.name}
          </h2>
          <BlogList posts={posts} />
        </div>
      </div>
    </div>
  );
}

