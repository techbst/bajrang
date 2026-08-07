import { apiClient } from "./client";
import type { Order } from "@/types/ecommerce";

export async function createCheckoutSession(cartId: string) {
  return apiClient.post<{ checkoutId: string }>("/checkout", { cartId });
}

export async function getOrder(orderId: string) {
  return apiClient.get<Order>(`/orders/${encodeURIComponent(orderId)}`);
}
