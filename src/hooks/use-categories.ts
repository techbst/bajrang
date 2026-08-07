"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "@/lib/api/categories";
import { queryKeys } from "@/lib/api/query-keys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories(),
    queryFn: getCategories
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: queryKeys.category(slug),
    queryFn: () => getCategory(slug),
    enabled: Boolean(slug)
  });
}
