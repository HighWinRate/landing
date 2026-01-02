'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getActiveProducts, LandingProduct } from '@/lib/data/products';
import { getPublicStorageUrl } from '@/lib/storage';
import { FRONTEND_URLS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function Products() {
  const [products, setProducts] = useState<LandingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getActiveProducts();
        setProducts(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'خطا در بارگذاری محصولات';
        setError(errorMessage);
        console.error('Error fetching landing products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const getThumbnailUrl = (product: LandingProduct) => {
    if (!product.thumbnail) {
      return null;
    }

    if (product.thumbnail.startsWith('http')) {
      return product.thumbnail;
    }

    return getPublicStorageUrl('thumbnails', product.thumbnail) ?? product.thumbnail;
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-destructive">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            محصولات محبوب
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            بهترین استراتژی‌های معاملاتی با بالاترین نرخ برد
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-muted-foreground">
            محصولی یافت نشد
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const thumbnailUrl = getThumbnailUrl(product);
              const finalPrice = product.discountedPrice || product.price;
              const hasDiscount =
                product.discountedPrice &&
                product.discountedPrice < product.price;

              return (
                <Card key={product.id}>
                  {thumbnailUrl ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      {hasDiscount && (
                        <Badge className="bg-destructive">
                          تخفیف
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <span className="text-6xl">📈</span>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      {product.category && (
                        <Badge variant="secondary">
                          {product.category.name}
                        </Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-bold">
                          {product.winrate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">
                      {product.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {hasDiscount ? (
                          <>
                            <span className="text-2xl font-bold">
                              {formatPrice(finalPrice)} تومان
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold">
                            {formatPrice(product.price)} تومان
                          </span>
                        )}
                      </div>
                    </div>

                    {product.backtest_trades_count && (
                      <div className="text-sm text-muted-foreground mb-4">
                        📊{' '}
                        {product.backtest_trades_count.toLocaleString('fa-IR')}{' '}
                        معامله بکتست شده
                      </div>
                    )}

                    <Button asChild className="w-full">
                      <Link href={FRONTEND_URLS.productDetail(product.id)}>
                        مشاهده جزئیات
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href={FRONTEND_URLS.products}>
                مشاهده همه محصولات
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
