import { supabase } from '@/lib/supabase';

export interface LandingProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  winrate: number;
  discountedPrice?: number;
  discountExpiresAt?: string;
  thumbnail?: string;
  trading_style?: string;
  backtest_trades_count?: number;
  is_active?: boolean;
  category?: {
    id: string;
    name: string;
  } | null;
}

interface RawProductRow extends LandingProduct {
  category?: {
    id: string;
    name: string;
  };
}

export async function getActiveProducts(limit = 6): Promise<LandingProduct[]> {
  const { data, error } = await supabase
    .from<RawProductRow>('products')
    .select(`
      id,
      title,
      description,
      price,
      winrate,
      discountedPrice,
      discountExpiresAt,
      thumbnail,
      trading_style,
      backtest_trades_count,
      is_active,
      category:categories(id, name)
    `)
    .neq('is_active', false)
    .order('sort_order', { ascending: true })
    .limit(limit);

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return data.map((product) => ({
    ...product,
    category: product.category ?? null,
  }));
}

