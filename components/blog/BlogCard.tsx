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
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        {post.mainImage && (
          <div className="relative w-full h-48">
            <Image
              src={urlFor(post.mainImage).width(600).height(300).url()}
              alt={post.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {post.excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge variant="secondary" className="text-xs">
                      {category.title}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {post.author && (
                <Link
                  href={`/blog/author/${post.author.slug.current}`}
                  className="hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.author.name}
                </Link>
              )}
              {publishedDate && <span>{publishedDate}</span>}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

