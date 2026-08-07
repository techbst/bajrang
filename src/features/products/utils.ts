import type { Product } from "@/types/ecommerce";

export function isProductAvailable(product: Product) {
  return product.status === "active" && product.inventory.isAvailable;
}
