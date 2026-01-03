import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  // Organization Schema for better SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'High Win Rate',
    url: 'https://highwinrate.com',
    logo: 'https://highwinrate.com/logo.png',
    description: 'فروشگاه آنلاین استراتژی‌های معاملاتی با نرخ برد بالا. دوره‌های آموزشی، فایل‌های حرفه‌ای و راهنمای معاملات.',
    sameAs: [
      // شبکه‌های اجتماعی خود را اینجا اضافه کنید
      // 'https://twitter.com/highwinrate',
      // 'https://instagram.com/highwinrate',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['fa', 'en'],
    },
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'High Win Rate',
    url: 'https://highwinrate.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://highwinrate.com/blog?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <About />
        <div id="products">
          <Products />
        </div>
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  );
}

