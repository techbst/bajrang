import { apiClient } from "./client";
import type { Cart } from "@/types/ecommerce";

export type CartMutationInput = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export async function getCart() {
  return apiClient.get<Cart>("/cart");
}

export async function addToCart(input: CartMutationInput) {
  return apiClient.post<Cart>("/cart/items", input);
}

export async function updateCart(itemId: string, quantity: number) {
  return apiClient.patch<Cart>(`/cart/items/${encodeURIComponent(itemId)}`, {
    quantity
  });
}

export async function removeFromCart(itemId: string) {
  return apiClient.delete<Cart>(`/cart/items/${encodeURIComponent(itemId)}`);
}
