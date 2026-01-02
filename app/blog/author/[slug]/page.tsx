import { getAuthorBySlug, getPostsByAuthor, getImageUrl } from '@/lib/blog';
import BlogList from '@/components/blog/BlogList';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import LexicalRenderer from '@/components/blog/LexicalRenderer';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = typeof resolvedParams.slug === 'string' ? resolvedParams.slug : resolvedParams.slug?.[0] || '';
  
  if (!slug) {
    return {
      title: 'نویسنده یافت نشد',
    };
  }
  
  const author = await getAuthorBySlug(slug);
  
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
  const resolvedParams = await params;
  const slug = typeof resolvedParams.slug === 'string' ? resolvedParams.slug : resolvedParams.slug?.[0] || '';
  
  if (!slug) {
    notFound();
  }
  
  const author = await getAuthorBySlug(slug);
  const posts = await getPostsByAuthor(slug);

  if (!author) {
    notFound();
  }
  
  const authorImageUrl = author.image ? getImageUrl(author.image) : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-lg shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {authorImageUrl && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={authorImageUrl}
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
                  <LexicalRenderer data={author.bio} />
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

