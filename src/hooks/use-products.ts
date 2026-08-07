"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts, type ProductQuery } from "@/lib/api/products";
import { queryKeys } from "@/lib/api/query-keys";

export function useProducts(query: Partial<ProductQuery> = {}) {
  return useQuery({
    queryKey: queryKeys.products(query),
    queryFn: () => getProducts(query)
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => getProduct(slug),
    enabled: Boolean(slug)
  });
}
