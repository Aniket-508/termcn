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
      siteName: SITE.NAME,
      title: resolvedTitle,
      type: ogType,
      url: `${SITE.URL}${canonical}`,
    },
    title,
    twitter: {
      card: "summary_large_image",
      creator: SITE.AUTHOR.TWITTER,
      description: ogDescription ?? description,
      images: [resolvedOgImage],
      site: SITE.AUTHOR.TWITTER,
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
    title: SITE.NAME,
  },
  applicationName: SITE.NAME,
  authors: [{ name: SITE.AUTHOR.NAME, url: LINK.PORTFOLIO }],
  category: "technology",
  creator: SITE.AUTHOR.NAME,
  description: SITE.DESCRIPTION.LONG,
  keywords: [...SITE.KEYWORDS],
  metadataBase: new URL(SITE.URL),
  openGraph: {
    description: SITE.DESCRIPTION.LONG,
    images: [
      {
        alt: SITE.NAME,
        height: 630,
        url: SITE.OG_IMAGE,
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: SITE.NAME,
    title: SITE.NAME,
    type: "website",
    url: SITE.URL,
  },
  publisher: SITE.AUTHOR.NAME,
  title: {
    default: SITE.NAME,
    template: `%s | ${SITE.NAME}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.AUTHOR.TWITTER,
    description: SITE.DESCRIPTION.LONG,
    images: [SITE.OG_IMAGE],
    site: SITE.AUTHOR.TWITTER,
    title: SITE.NAME,
  },
};
