import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/products", "/category", "/search"],
        disallow: ["/account", "/checkout", "/cart", "/admin", "/api"]
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}
