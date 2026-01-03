import { getPosts, getAllPostSlugs, getCategories } from '@/lib/blog';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://highwinrate.com';

  try {
    // دریافت تمام پست‌ها
    const slugs = await getAllPostSlugs();
    const categories = await getCategories();

    // ساخت XML برای sitemap
    const blogPostsXml = slugs
      .map((post) => {
        return `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
      })
      .join('');

    // اضافه کردن صفحات دسته‌بندی
    const categoriesXml = categories
      .map((category) => {
        return `
    <url>
      <loc>${baseUrl}/blog/category/${category.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`;
      })
      .join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>${blogPostsXml}${categoriesXml}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

