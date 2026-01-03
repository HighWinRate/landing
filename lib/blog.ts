import { createClient } from '@supabase/supabase-js';
import { getPublicStorageUrl } from './storage';

// Initialize Supabase client for reading blog data
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'blog',
  },
});

// Types based on Payload CMS collections
export interface Author {
  id: string;
  name: string;
  slug: string;
  image?: Media | string;
  bio?: any; // Rich text content
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  parent?: Category | string;
  color?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  url: string;
  filename: string;
  alt?: string;
  caption?: string;
  folder?: string;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: { url: string };
    card?: { url: string };
    hero?: { url: string };
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  author?: Author | null;
  mainImage?: Media | string;
  excerpt?: string;
  content: any; // Rich text content (Lexical JSON)
  body?: any; // Alias for backwards compatibility
  categories?: Category[];
  tags?: { tag: string }[];
  relatedPosts?: (Post | string)[];
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  published_date?: string; // DB field name
  featured?: boolean;
  readingTime?: number;
  viewCount?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: { keyword: string }[];
    ogImage?: Media | string;
    noIndex?: boolean;
    noFollow?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// Helper to get image URL from Media object
export function getImageUrl(image: Media | string | undefined | null): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  // If it's a full URL already
  if (
    image.url &&
    (image.url.startsWith('http') || image.url.startsWith('https'))
  ) {
    return image.url;
  }

  // Fallback: if we have a filename, construct the Supabase Storage URL
  // The custom adapter in landing/storage/supabase-storage.ts prepends 'media/'
  if (image.filename) {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'blog-media';
    return getPublicStorageUrl(bucket, `media/${image.filename}`) || '';
  }

  return image.url || '';
}

// Get published posts with pagination
export async function getPosts(
  page: number = 1,
  limit: number = 6
): Promise<{
  posts: Post[];
  total: number;
  totalPages: number;
}> {
  const offset = (page - 1) * limit;

  // Get total count
  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  // Get posts with media and categories
  // Note: we map DB columns (snake_case) to our interface (camelCase)
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      mainImage:featured_image_id(*),
      author:author_id(*),
      categories:posts_rels(categories(*))
    `
    )
    .eq('status', 'published')
    .order('published_date', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0, totalPages: 0 };
  }

  // Map data to our Post interface
  const posts = (data || []).map((post: any) => {
    // Parse content if it's a JSON string
    let contentData = post.content;
    if (typeof contentData === 'string') {
      try {
        contentData = JSON.parse(contentData);
      } catch (e) {
        console.error('Error parsing content data:', e);
      }
    }

    return {
      ...post,
      publishedAt: post.published_date || post.publishedAt,
      mainImage: post.mainImage,
      content: contentData,
      body: contentData, // Alias for backwards compatibility
      author: post.author
        ? {
            ...post.author,
            name: post.author.name || post.author.email, // Fallback to email
          }
        : null,
      categories:
        post.categories
          ?.map((rel: any) => ({
            ...rel.categories,
            title: rel.categories?.name, // Map name to title
          }))
          .filter((c: any) => c.id) || [],
    };
  });

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    posts: (posts as Post[]) || [],
    total,
    totalPages,
  };
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      mainImage:featured_image_id(*),
      author:author_id(*),
      categories:posts_rels(categories(*)),
      seo_ogImage:seo_og_image_id(*)
    `
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .limit(1);

  if (error || !posts || posts.length === 0) {
    console.error('Error fetching post:', error);
    return null;
  }

  const post = posts[0] as any;

  // Parse content if it's a JSON string
  let contentData = post.content;
  if (typeof contentData === 'string') {
    try {
      contentData = JSON.parse(contentData);
    } catch (e) {
      console.error('Error parsing content data:', e);
    }
  }

  // Parse SEO data if it's a JSON string
  let seoData = post.seo;
  if (typeof seoData === 'string') {
    try {
      seoData = JSON.parse(seoData);
    } catch (e) {
      console.error('Error parsing SEO data:', e);
    }
  }

  return {
    ...post,
    publishedAt: post.published_date || post.publishedAt,
    mainImage: post.mainImage,
    content: contentData,
    body: contentData, // Alias for backwards compatibility
    readingTime: post.readingTime || post.reading_time,
    viewCount: post.viewCount || post.view_count,
    seo: seoData,
    author: post.author
      ? {
          ...post.author,
          name: post.author.name || post.author.email,
        }
      : null,
    categories:
      post.categories
        ?.map((rel: any) => ({
          ...rel.categories,
          title: rel.categories?.name,
        }))
        .filter((c: any) => c.id) || [],
  } as Post;
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }

  return (posts || []).map((post) => ({ slug: post.slug }));
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return (categories as Category[]) || [];
}

// Get category by slug
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .limit(1);

  if (error || !categories || categories.length === 0) {
    console.error('Error fetching category:', error);
    return null;
  }

  return categories[0] as Category;
}

// Get posts by category
export async function getPostsByCategory(
  categorySlug: string
): Promise<Post[]> {
  // First get the category ID
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  // Payload uses a junction table for many-to-many relationships
  // The table is named: posts_categories (or similar based on Payload's naming)
  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      mainImage:media(*),
      categories!inner(*)
    `
    )
    .eq('status', 'published')
    .eq('categories.id', category.id)
    .order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }

  return (posts as Post[]) || [];
}

// Get all authors
export async function getAuthors(): Promise<Author[]> {
  const { data: authors, error } = await supabase
    .from('authors')
    .select(
      `
      *,
      image:media(*)
    `
    )
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching authors:', error);
    return [];
  }

  return (authors as Author[]) || [];
}

// Get author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const { data: authors, error } = await supabase
    .from('authors')
    .select(
      `
      *,
      image:media(*)
    `
    )
    .eq('slug', slug)
    .limit(1);

  if (error || !authors || authors.length === 0) {
    console.error('Error fetching author:', error);
    return null;
  }

  return authors[0] as Author;
}

// Get posts by author
export async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  // First get the author
  const author = await getAuthorBySlug(authorSlug);
  if (!author) return [];

  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      author:authors(*),
      mainImage:media(*),
      categories(*)
    `
    )
    .eq('status', 'published')
    .eq('author', author.id)
    .order('publishedAt', { ascending: false });

  if (error) {
    console.error('Error fetching posts by author:', error);
    return [];
  }

  return (posts as Post[]) || [];
}

// Get related posts
export async function getRelatedPosts(
  currentPostId: string,
  categoryIds: string[],
  limit: number = 3
): Promise<Post[]> {
  if (categoryIds.length === 0) return [];

  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      mainImage:media(*),
      categories!inner(*)
    `
    )
    .eq('status', 'published')
    .neq('id', currentPostId)
    .in('categories.id', categoryIds)
    .order('published_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  return (posts as Post[]) || [];
}

// Get featured posts
export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      mainImage:featured_image_id(*),
      categories:posts_rels(categories(*))
    `
    )
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }

  return (data || []).map((post: any) => ({
    ...post,
    publishedAt: post.published_date,
    mainImage: post.mainImage,
    categories:
      post.categories
        ?.map((rel: any) => ({
          ...rel.categories,
          title: rel.categories?.name,
        }))
        .filter((c: any) => c.id) || [],
  })) as Post[];
}
