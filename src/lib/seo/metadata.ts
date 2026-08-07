import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false
}: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined
    }
  };
}
