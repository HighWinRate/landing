import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { calculateReadingTime, formatReadingTime } from '@/lib/blog-utils';
import { Clock } from 'lucide-react';
import LexicalRenderer from './LexicalRenderer';
// Helper function to get image URL (client-side safe)
function getPayloadImageUrl(image: any): string {
  if (!image) return '';

  if (typeof image === 'string') {
    return image;
  }

  if (image.url) {
    const baseUrl =
      process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL ||
      process.env.PAYLOAD_PUBLIC_SERVER_URL ||
      'http://localhost:3003';
    return `${baseUrl}${image.url}`;
  }

  if (image.filename) {
    const baseUrl =
      process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL ||
      process.env.PAYLOAD_PUBLIC_SERVER_URL ||
      'http://localhost:3003';
    return `${baseUrl}/media/${image.filename}`;
  }

  return '';
}

interface Post {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  body: any;
  author?: {
    id: string;
    name: string;
    slug: string;
    image?: any;
    bio?: any;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  categories?: Array<{
    id: string;
    title: string;
    slug: string;
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
  // For Lexical, we'll estimate reading time based on text content
  const readingTime = post.body ? 5 : 1; // Default estimate, can be improved
  const readingTimeText = formatReadingTime(readingTime);

  const mainImageUrl = post.mainImage
    ? getPayloadImageUrl(post.mainImage)
    : null;
  const authorImageUrl = post.author?.image
    ? getPayloadImageUrl(post.author.image)
    : null;

  return (
    <article>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl mb-4 leading-tight">
            {post.title}
          </CardTitle>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* اطلاعات پست */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
            {post.author && (
              <Link
                href={`/blog/author/${post.author.slug}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                {authorImageUrl && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border">
                    <Image
                      src={authorImageUrl}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="font-medium">{post.author.name}</span>
              </Link>
            )}
            {publishedDate && (
              <>
                <span className="text-muted-foreground/50">•</span>
                <time dateTime={post.publishedAt}>{publishedDate}</time>
              </>
            )}
            <span className="text-muted-foreground/50">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTimeText} مطالعه</span>
            </div>
          </div>

          {/* دسته‌بندی‌ها */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category.id || category.slug}
                  href={`/blog/category/${category.slug}`}
                >
                  <Badge
                    variant="secondary"
                    className="hover:bg-secondary/80 transition-colors"
                  >
                    {category.title}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardHeader>

        {mainImageUrl && (
          <div className="relative w-full h-96 mb-6">
            <Image
              src={mainImageUrl}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <CardContent className="px-6 py-8">
          <article className="max-w-none">
            {post.body && <LexicalRenderer data={post.body} />}
          </article>
        </CardContent>

        {post.author && (
          <>
            <Separator className="my-6" />
            <CardContent className="px-6 py-6">
              <div className="flex items-start gap-4">
                {authorImageUrl && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
                    <Image
                      src={authorImageUrl}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/blog/author/${post.author.slug}`}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {post.author.name}
                    </Link>
                  </div>
                  {post.author.bio && (
                    <div className="mt-2 text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
                      <LexicalRenderer data={post.author.bio} />
                    </div>
                  )}
                  {post.author.socialLinks && (
                    <div className="flex gap-4 mt-4">
                      {post.author.socialLinks.twitter && (
                        <a
                          href={post.author.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Twitter
                        </a>
                      )}
                      {post.author.socialLinks.linkedin && (
                        <a
                          href={post.author.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}
                      {post.author.socialLinks.github && (
                        <a
                          href={post.author.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </article>
  );
}
