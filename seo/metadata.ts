import type { Metadata } from "next"

import { siteConfig, siteKeywords } from "@/lib/config"

export interface CreatePageMetadataOptions {
  description: string
  noIndex?: boolean
  ogType?: "article" | "website"
  path: string
  title: string
}

/**
 * Per-route metadata (merges with root `baseMetadata` from the App Router).
 */
export function createPageMetadata(
  options: CreatePageMetadataOptions
): Metadata {
  const { description, noIndex, ogType = "website", path, title } = options
  const pathname = path.startsWith("/") ? path : `/${path}`
  const ogImageUrl = `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`
  const pageUrl =
    pathname === "/"
      ? siteConfig.url
      : `${siteConfig.url.replace(/\/$/, "")}${pathname}`

  return {
    alternates: {
      canonical: pathname,
    },
    description,
    openGraph: {
      description,
      images: [{ url: ogImageUrl }],
      title,
      type: ogType,
      url: pageUrl,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [ogImageUrl],
      title,
    },
    ...(noIndex
      ? {
          robots: {
            follow: false,
            index: false,
          },
        }
      : {}),
  }
}

const defaultOgImage = {
  alt: siteConfig.name,
  height: 630,
  url: siteConfig.ogImage,
  width: 1200,
}

export const baseMetadata: Metadata = {
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
  category: "technology",
  creator: siteConfig.name,
  description: siteConfig.description,
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
  keywords: [...siteKeywords],
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    description: siteConfig.description,
    images: [defaultOgImage],
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: siteConfig.url,
  },
  publisher: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    title: siteConfig.name,
  },
}
