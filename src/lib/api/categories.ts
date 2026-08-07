import { apiClient } from "./client";
import type { Category } from "@/types/ecommerce";

export async function getCategories() {
  return apiClient.get<Category[]>("/categories");
}

export async function getCategory(slug: string) {
  return apiClient.get<Category>(`/categories/${encodeURIComponent(slug)}`);
}
