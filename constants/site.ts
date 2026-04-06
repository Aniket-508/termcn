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
    LONG: "A collection of beautifully designed, accessible, and customizable terminal UI components. Built on Ink. Works with shadcn/ui.",
    SHORT: "Beautiful terminal UIs, made simple",
  },
  KEYWORDS: [
    "terminal",
    "ink",
    "react terminal",
    "next.js terminal",
    "shadcn",
    "component registry",
    "react components",
    "next.js",
    "npx shadcn add",
  ] as const,
  NAME: "termcn",
  OG_IMAGE: `${getBaseUrl()}/og.jpg`,
  URL: getBaseUrl(),
};
