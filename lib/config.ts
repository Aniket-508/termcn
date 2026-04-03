export const siteKeywords = [
  "termcn",
  "shadcn",
  "component registry",
  "react components",
  "tailwind",
  "next.js",
  "npx shadcn add",
] as const

export const siteConfig = {
  name: "termcn",
  url: "https://termcn.vercel.app",
  ogImage: "https://termcn.vercel.app/og.jpg",
  description:
    "termcn is a shadcn-compatible component registry: publish UI blocks and install them with the shadcn CLI.",
  licenseUrl: "https://opensource.org/licenses/MIT",
  links: {
    github: "https://github.com/termcn/termcn",
  },
  navItems: [
    {
      label: "Docs",
      href: "/docs",
    },
  ],
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
