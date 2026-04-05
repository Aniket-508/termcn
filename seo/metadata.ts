import type { Metadata } from "next";

import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";

interface CreatePageMetadataOptions {
  description?: string;
  noIndex?: boolean;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogTitle?: string;
  ogType?: "article" | "website";
  path: string;
  title: string;
}

export const createPageMetadata = (
  options: CreatePageMetadataOptions
): Metadata => {
  const {
    description,
    noIndex = false,
    ogDescription,
    ogImage,
    ogImageAlt,
    ogTitle,
    ogType = "website",
    path,
    title,
  } = options;

  const canonical = path.startsWith("/") ? path : `/${path}`;
  const resolvedOgImage = ogImage ?? `/og${canonical === "/" ? "" : canonical}`;
  const resolvedTitle = ogTitle ?? title;

  return {
    alternates: {
      canonical,
    },
    description,
    openGraph: {
      description: ogDescription ?? description,
      images: [
        {
          alt: ogImageAlt ?? resolvedTitle,
          height: 630,
          url: resolvedOgImage,
          width: 1200,
        },
      ],
      locale: "en_US",
      siteName: SITE.name,
      title: resolvedTitle,
      type: ogType,
      url: `${SITE.url}${canonical}`,
    },
    title,
    twitter: {
      card: "summary_large_image",
      creator: SITE.author.twitter,
      description: ogDescription ?? description,
      images: [resolvedOgImage],
      site: SITE.author.twitter,
      title: resolvedTitle,
    },
    ...(noIndex && {
      robots: {
        follow: false,
        index: false,
      },
    }),
  };
};

export const baseMetadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.name,
  },
  applicationName: SITE.name,
  authors: [{ name: SITE.author.name, url: LINK.GITHUB }],
  category: "technology",
  creator: SITE.author.name,
  description: SITE.description,
  keywords: [...SITE.keywords],
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
  publisher: SITE.author.name,
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.author.twitter,
    description: SITE.description,
    images: [SITE.ogImage],
    site: SITE.author.twitter,
    title: SITE.name,
  },
};
