import Link from 'next/link';
import Image from 'next/image';
// Helper function to get image URL (client-side safe)
function getPayloadImageUrl(image: any): string {
  if (!image) return '';
  
  if (typeof image === 'string') {
    return image;
  }
  
  if (image.url) {
    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || 'http://localhost:3003';
    return `${baseUrl}${image.url}`;
  }
  
  if (image.filename) {
    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || 'http://localhost:3003';
    return `${baseUrl}/media/${image.filename}`;
  }
  
  return '';
}
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Post {
  id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  mainImage?: any;
  author?:
    | {
    id: string;
    name: string;
    slug: string;
    image?: any;
      }
    | null;
  categories?: Array<{
    id: string;
    title: string;
    slug: string;
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
          const mainImageUrl = post.mainImage ? getPayloadImageUrl(post.mainImage) : null;

          return (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                {mainImageUrl && (
                  <div className="relative w-full h-40">
                    <Image
                      src={mainImageUrl}
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

