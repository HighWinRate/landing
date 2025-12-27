import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Check if Sanity is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_API_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_API_DATASET || 'production';

export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset: dataset,
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN, // Optional: for authenticated requests
});

// Client without CDN for fresh data (used in blog pages with force-dynamic)
export const clientNoCache = createClient({
  projectId: projectId || 'placeholder',
  dataset: dataset,
  useCdn: false, // No CDN cache for fresh data
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
});

// Helper to check if Sanity is configured
export const isSanityConfigured = () => {
  return !!projectId && projectId !== 'placeholder';
};

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ queries
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    slug,
    image
  },
  categories[]->{
    title,
    slug
  }
}`;

// Query with pagination
export const postsQueryPaginated = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    slug,
    image
  },
  categories[]->{
    title,
    slug
  }
}`;

// Count total posts
export const postsCountQuery = `count(*[_type == "post" && defined(slug.current)])`;

// Query with better error handling and case-insensitive matching
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body,
  author->{
    name,
    slug,
    image,
    bio,
    socialLinks
  },
  categories[]->{
    _id,
    _ref,
    title,
    slug,
    description
  },
  seo
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)][] {
  "slug": slug.current
}`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`;

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description
}`;

export const postsByCategoryQuery = `*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    slug,
    image
  }
}`;

export const authorsQuery = `*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  bio
}`;

export const authorBySlugQuery = `*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  image,
  bio,
  socialLinks
}`;

export const postsByAuthorQuery = `*[_type == "post" && author->slug.current == $slug] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  categories[]->{
    title,
    slug
  }
}`;

export const relatedPostsQuery = `*[_type == "post" && _id != $currentId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  author->{
    name,
    slug,
    image
  },
  categories[]->{
    title,
    slug
  }
}`;

