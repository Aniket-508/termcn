import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
      url: siteConfig.url,
    },
  ];

  // Dynamic documentation pages from fumadocs
  const docPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: page.url === "/docs" ? 0.9 : 0.8,
    url: `${siteConfig.url}${page.url}`,
  }));

  return [...staticPages, ...docPages];
}
