import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '../payload.config';

let cachedPayload: any = null;

// This function should only be used in server components/API routes
export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload;
  }
  
  cachedPayload = await getPayloadHMR({ config });
  return cachedPayload;
}

// Helper function to get the base URL for images
export function getPayloadImageUrl(image: any): string {
  if (!image) return '';
  
  // If image is a string (URL), return it
  if (typeof image === 'string') {
    return image;
  }
  
  // If image is an object with url property
  if (image.url) {
    const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3003';
    return `${baseUrl}${image.url}`;
  }
  
  // If image has a filename, construct URL
  if (image.filename) {
    const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3003';
    return `${baseUrl}/media/${image.filename}`;
  }
  
  return '';
}

// Query functions for blog posts
export async function getPosts(page: number = 1, limit: number = 6) {
  const payload = await getPayloadClient();
  const skip = (page - 1) * limit;
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit,
    skip,
    sort: '-publishedAt',
    depth: 2, // Include related author and categories
  });
  
  return {
    posts: result.docs,
    total: result.totalDocs,
    totalPages: result.totalPages,
  };
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
    limit: 1,
    depth: 2,
  });
  
  return result.docs[0] || null;
}

export async function getAllPostSlugs() {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 1000,
    select: {
      slug: true,
    },
  });
  
  return result.docs.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function getCategories() {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'categories',
    sort: 'title',
  });
  
  return result.docs;
}

export async function getCategoryBySlug(slug: string) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  
  return result.docs[0] || null;
}

export async function getPostsByCategory(categorySlug: string) {
  const payload = await getPayloadClient();
  
  // First get the category
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          categories: {
            contains: category.id,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
  });
  
  return result.docs || [];
}

export async function getAuthors() {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'authors',
    sort: 'name',
  });
  
  return result.docs;
}

export async function getAuthorBySlug(slug: string) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'authors',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  });
  
  return result.docs[0] || null;
}

export async function getPostsByAuthor(authorSlug: string) {
  const payload = await getPayloadClient();
  
  // First get the author
  const author = await getAuthorBySlug(authorSlug);
  if (!author) return [];
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          author: {
            equals: author.id,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
  });
  
  return result.docs || [];
}

export async function getRelatedPosts(currentPostId: string, categoryIds: string[], limit: number = 3) {
  const payload = await getPayloadClient();
  
  if (categoryIds.length === 0) {
    return [];
  }
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          id: {
            not_equals: currentPostId,
          },
        },
        {
          categories: {
            in: categoryIds,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
    limit,
    sort: '-publishedAt',
    depth: 2,
  });
  
  return result.docs || [];
}

