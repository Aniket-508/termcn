export const FALLBACK_SITE_ORIGIN = "https://termcn.vercel.app" as const;

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN);

const normalizedBase = baseUrl.replace(/\/$/, "");

export const SITE = {
  author: {
    name: "Aniket Pawar",
    twitter: "@alaymanguy",
  },
  description:
    "termcn is a shadcn-compatible component registry: publish UI blocks and install them with the shadcn CLI.",
  keywords: [
    "termcn",
    "shadcn",
    "component registry",
    "react components",
    "tailwind",
    "next.js",
    "npx shadcn add",
  ] as const,
  name: "termcn",
  ogImage: `${normalizedBase}/og.jpg`,
  url: normalizedBase,
};
