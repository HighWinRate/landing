'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { getImageUrl } from '@/lib/blog';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
  author?: {
    id: string;
    name: string;
    slug: string;
    image?: any;
  };
  categories?: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
}

interface BlogCardProps {
  post: Post;
  imagePosition?: 'left' | 'right';
}

export default function BlogCard({ post, imagePosition = 'right' }: BlogCardProps) {
  const publishedDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'd MMMM yyyy')
    : '';

  const isImageLeft = imagePosition === 'left';
  const mainImageUrl = post.mainImage ? getImageUrl(post.mainImage) : null;

  return (
    <Link href={`/blog/${post.slug}`} className="block w-full">
      <Card className="w-full hover:shadow-lg transition-shadow group">
        <div className={`flex flex-col md:flex-row ${isImageLeft ? 'md:flex-row-reverse' : ''}`}>
          {/* تصویر */}
          {mainImageUrl && (
            <div className="relative w-full md:w-2/5 h-64 md:h-64 flex-shrink-0">
              <Image
                src={mainImageUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          {/* محتوا */}
          <div className="flex-1 flex flex-col p-6">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
              {post.excerpt && (
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              )}
              
              {/* دسته‌بندی‌ها */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category) => (
                    <Link
                      key={category.id || category.slug}
                      href={`/blog/category/${category.slug}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Badge variant="secondary" className="text-xs">
                        {category.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
              {post.author && (
                <Link
                  href={`/blog/author/${post.author.slug}`}
                  className="hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.author.name}
                </Link>
              )}
              {publishedDate && <span>{publishedDate}</span>}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

