import { z } from "zod";
import { apiClient } from "./client";
import type { Product } from "@/types/ecommerce";

export const productQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1)
});

export type ProductQuery = z.infer<typeof productQuerySchema>;

export async function getProducts(query: Partial<ProductQuery> = {}) {
  return apiClient.get<Product[]>("/products", { query });
}

export async function getProduct(slug: string) {
  return apiClient.get<Product>(`/products/${encodeURIComponent(slug)}`);
}
