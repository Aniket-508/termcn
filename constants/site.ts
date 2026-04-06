export const FALLBACK_SITE_ORIGIN = "https://termcn.vercel.app" as const;

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

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
  ogImage: `${getBaseUrl()}/og.jpg`,
  url: getBaseUrl(),
};
