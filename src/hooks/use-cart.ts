"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, getCart, removeFromCart, updateCart } from "@/lib/api/cart";
import { queryKeys } from "@/lib/api/query-keys";

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart(),
    queryFn: getCart
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
  });
}

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCart(itemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart() })
  });
}
