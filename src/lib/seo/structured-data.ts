import { siteConfig } from "@/config/site";
import type { Product } from "@/types/ecommerce";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.url),
    sku: product.inventory.sku,
    offers: {
      "@type": "Offer",
      price: product.price.amount,
      priceCurrency: product.price.currency,
      availability: product.inventory.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock"
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating.ratingValue,
          reviewCount: product.rating.reviewCount
        }
      : undefined
  };
}
