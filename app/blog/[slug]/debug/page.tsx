import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export default async function DebugPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug =
    typeof resolvedParams.slug === 'string'
      ? resolvedParams.slug
      : resolvedParams.slug?.[0] || '';

  if (!slug) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Link href={`/blog/${slug}`} className="text-blue-500 hover:underline">
          ← بازگشت به پست
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-8">Debug: {post.title}</h1>

        <div className="space-y-6">
          <div className="border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Post Object Keys</h2>
            <pre className="text-xs bg-muted p-2 rounded overflow-auto">
              {JSON.stringify(Object.keys(post), null, 2)}
            </pre>
          </div>

          <div className="border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Content Type</h2>
            <p>Type: {typeof post.content}</p>
            <p>Is null: {post.content === null ? 'Yes' : 'No'}</p>
            <p>Is undefined: {post.content === undefined ? 'Yes' : 'No'}</p>
          </div>

          <div className="border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Content Data</h2>
            <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-96">
              {JSON.stringify(post.content, null, 2)}
            </pre>
          </div>

          <div className="border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Full Post Object</h2>
            <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-96">
              {JSON.stringify(post, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

