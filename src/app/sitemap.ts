import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteConfig.url}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${siteConfig.url}/search`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6
    }
  ];
}
