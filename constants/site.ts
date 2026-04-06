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
  AUTHOR: {
    NAME: "Aniket Pawar",
    TWITTER: "@alaymanguy",
  },
  DESCRIPTION: {
    LONG: "termcn is a shadcn-compatible component registry: publish UI blocks and install them with the shadcn CLI.",
    SHORT: "A shadcn-compatible component registry",
  },
  KEYWORDS: [
    "termcn",
    "shadcn",
    "component registry",
    "react components",
    "tailwind",
    "next.js",
    "npx shadcn add",
  ] as const,
  NAME: "termcn",
  OG_IMAGE: `${getBaseUrl()}/og.jpg`,
  URL: getBaseUrl(),
};
