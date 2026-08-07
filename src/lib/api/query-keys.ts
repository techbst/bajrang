export const queryKeys = {
  products: (query?: Record<string, unknown>) => ["products", query ?? {}] as const,
  product: (slug: string) => ["products", slug] as const,
  categories: () => ["categories"] as const,
  category: (slug: string) => ["categories", slug] as const,
  cart: () => ["cart"] as const
};
