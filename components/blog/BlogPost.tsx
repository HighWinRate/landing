import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl mb-4">
          {post.title}
        </CardTitle>
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-6">
            {post.excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {post.author && (
            <Link
              href={`/blog/author/${post.author.slug.current}`}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
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
              >
                <Badge variant="secondary">
                  {category.title}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardHeader>

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

      <CardContent className="px-6 py-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={post.body} />
        </div>
      </CardContent>

      {post.author && (
        <>
          <Separator />
          <CardContent className="px-6 py-8 bg-muted/50">
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
                  className="text-lg font-semibold hover:text-primary transition-colors"
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
                        className="text-primary hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                    {post.author.socialLinks.linkedin && (
                      <a
                        href={post.author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {post.author.socialLinks.github && (
                      <a
                        href={post.author.socialLinks.github}
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
          </CardContent>
        </>
      )}
    </Card>
  );
}

