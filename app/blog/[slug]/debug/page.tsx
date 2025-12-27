import { client, postsQuery, isSanityConfigured } from '@/lib/sanity';

export default async function DebugPage() {
  if (!isSanityConfigured()) {
    return <div>Sanity not configured</div>;
  }

  try {
    const posts = await client.fetch(postsQuery);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug: All Posts</h1>
        <div className="space-y-4">
          {posts.map((post: any) => (
            <div key={post._id} className="border p-4 rounded">
              <h2 className="font-bold">{post.title}</h2>
              <p>Slug: <code>{post.slug?.current}</code></p>
              <p>URL: <code>/blog/{post.slug?.current}</code></p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error: {String(error)}</div>;
  }
}

