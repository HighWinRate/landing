'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
        {post.mainImage && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
            <Image
              src={urlFor(post.mainImage).width(600).height(300).url()}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader className="flex-1">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {post.excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="mt-auto space-y-3">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug.current}
                    href={`/blog/category/${category.slug.current}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                      {category.title}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
              {post.author && (
                <Link
                  href={`/blog/author/${post.author.slug.current}`}
                  className="hover:text-foreground transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.author.name}
                </Link>
              )}
              {publishedDate && (
                <span className="text-muted-foreground/70">{publishedDate}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

