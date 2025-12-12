const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  winrate: number;
  discountedPrice?: number;
  discountExpiresAt?: string;
  thumbnail?: string;
  trading_style?: string;
  trading_session?: string;
  keywords?: string[];
  backtest_trades_count?: number;
  is_active?: boolean;
  category?: {
    id: string;
    name: string;
  };
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[API] Fetching: ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      console.log(
        `[API] Response status: ${response.status} ${response.statusText}`
      );
      console.log(
        `[API] Response headers:`,
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[API] Error response:`, errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`[API] Response data:`, data);
      return data;
    } catch (error) {
      console.error(`[API] Fetch error:`, error);
      // اگر خطای network باشد (Failed to fetch)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(
          `نمی‌توان به Backend متصل شد. لطفاً مطمئن شوید که:
1. Backend در حال اجرا است (${this.baseUrl})
2. CORS در Backend تنظیم شده است (FRONTEND_URL باید شامل http://localhost:3003 باشد)
3. Backend را restart کرده‌اید`
        );
      }
      throw error;
    }
  }

  async getProducts(): Promise<Product[]> {
    return this.fetch<Product[]>('/product');
  }

  async getProduct(id: string): Promise<Product> {
    return this.fetch<Product>(`/product/${id}`);
  }

  async getCategories(): Promise<Category[]> {
    return this.fetch<Category[]>('/categories?active=true');
  }

  getProductThumbnailUrl(productId: string): string {
    return `${this.baseUrl}/product/${productId}/thumbnail`;
  }
}

export const apiClient = new ApiClient();
