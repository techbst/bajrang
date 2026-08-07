export type AnalyticsEvent =
  | { name: "product_viewed"; productId: string }
  | { name: "add_to_cart"; productId: string; quantity: number }
  | { name: "begin_checkout"; cartId: string }
  | { name: "purchase"; orderId: string; value: number; currency: string };

export function trackEvent(event: AnalyticsEvent) {
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event.name);
  }
}
