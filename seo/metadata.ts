import type { Metadata } from "next";

import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";

export interface CreatePageMetadataOptions {
  description: string;
  noIndex?: boolean;
  ogType?: "article" | "website";
  path: string;
  title: string;
}

export const createPageMetadata = (
  options: CreatePageMetadataOptions
): Metadata => {
  const { description, noIndex, ogType = "website", path, title } = options;
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const ogImageUrl = `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
  const pageUrl =
    pathname === "/" ? SITE.url : `${SITE.url.replace(/\/$/, "")}${pathname}`;

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
  };
};

export const baseMetadata: Metadata = {
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: LINK.PORTFOLIO }],
  category: "technology",
  creator: SITE.name,
  description: SITE.description,
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
  keywords: [...SITE.keywords],
  manifest: `${SITE.url}/site.webmanifest`,
  metadataBase: new URL(SITE.url),
  openGraph: {
    description: SITE.description,
    images: [
      {
        alt: SITE.name,
        height: 630,
        url: SITE.ogImage,
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: SITE.name,
    title: SITE.name,
    type: "website",
    url: SITE.url,
  },
  publisher: SITE.name,
  title: {
    default: SITE.name,
    template: `%s - ${SITE.name}`,
  },
  twitter: {
    card: "summary_large_image",
    description: SITE.description,
    images: [SITE.ogImage],
    title: SITE.name,
  },
};
