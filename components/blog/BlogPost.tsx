import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { calculateReadingTime, formatReadingTime } from '@/lib/blog-utils';
import { Clock } from 'lucide-react';

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
  const readingTime = calculateReadingTime(post.body);
  const readingTimeText = formatReadingTime(readingTime);

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
                href={`/blog/author/${post.author.slug.current}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                {post.author.image && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border">
                    <Image
                      src={urlFor(post.author.image).width(32).height(32).url()}
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
                  key={category.slug.current}
                  href={`/blog/category/${category.slug.current}`}
                >
                  <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors">
                    {category.title}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardHeader>

      {post.mainImage && (
        <div className="relative w-full h-96 mb-6">
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <CardContent className="px-6 py-8">
        <article className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4 prose-headings:text-foreground 
          prose-h1:text-4xl prose-h1:font-bold prose-h1:mt-10 prose-h1:mb-6 
          prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 
          prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 
          prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2 
          prose-h5:text-lg prose-h5:font-semibold prose-h5:mt-4 prose-h5:mb-2 
          prose-h6:text-base prose-h6:font-semibold prose-h6:mt-3 prose-h6:mb-2 
          prose-p:leading-relaxed prose-p:mb-4 prose-p:text-foreground 
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
          prose-strong:font-semibold prose-strong:text-foreground 
          prose-ul:list-disc prose-ul:my-4 prose-ul:pl-6 
          prose-ol:list-decimal prose-ol:my-4 prose-ol:pl-6 
          prose-li:my-2 prose-li:text-foreground 
          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 
          prose-blockquote:border-r-4 prose-blockquote:border-primary prose-blockquote:pr-4 prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:bg-muted/50 prose-blockquote:py-4 
          prose-code:text-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded 
          prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg">
          <PortableText value={post.body} />
        </article>
      </CardContent>

      {post.author && (
        <>
          <Separator className="my-6" />
          <CardContent className="px-6 py-6">
            <div className="flex items-start gap-4">
              {post.author.image && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
                  <Image
                    src={urlFor(post.author.image).width(64).height(64).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Link
                    href={`/blog/author/${post.author.slug.current}`}
                    className="text-lg font-semibold hover:text-primary transition-colors"
                  >
                    {post.author.name}
                  </Link>
                </div>
                {post.author.bio && (
                  <div className="mt-2 text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
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

