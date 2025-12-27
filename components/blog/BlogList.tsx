import BlogCard from './BlogCard';

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
        <BlogCard key={post._id} post={post} imagePosition={index % 2 === 0 ? 'right' : 'left'} />
      ))}
    </div>
  );
}

