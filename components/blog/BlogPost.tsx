import { PortableText, PortableTextComponents } from '@portabletext/react';
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

// Custom components for PortableText to ensure proper styling
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-10 mb-6 text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-semibold mt-3 mb-2 text-foreground">{children}</h6>,
    normal: ({ children }) => <p className="leading-relaxed mb-4 text-foreground">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-r-4 border-primary pr-4 italic my-6 bg-muted/50 py-4 text-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary no-underline hover:underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full h-96 my-6 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Blog image'}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc my-4 pl-6 text-foreground">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal my-4 pl-6 text-foreground">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-2 text-foreground">{children}</li>,
    number: ({ children }) => <li className="my-2 text-foreground">{children}</li>,
  },
};

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
        <article className="max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
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

