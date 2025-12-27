import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">مقالات مرتبط</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const publishedDate = post.publishedAt
            ? format(new Date(post.publishedAt), 'd MMMM yyyy')
            : '';

          return (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                {post.mainImage && (
                  <div className="relative w-full h-40">
                    <Image
                      src={urlFor(post.mainImage).width(400).height(200).url()}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-lg">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 text-sm">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto text-xs text-muted-foreground">
                    {publishedDate}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

