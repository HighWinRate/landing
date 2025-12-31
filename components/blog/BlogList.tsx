import BlogCard from './BlogCard';

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

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          هنوز پستی منتشر نشده است.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} imagePosition={index % 2 === 0 ? 'right' : 'left'} />
      ))}
    </div>
  );
}

