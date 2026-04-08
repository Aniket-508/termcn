import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  redirects() {
    return [
      {
        destination: "/docs/components/ink/:category/:component",
        permanent: true,
        source: "/docs/components/:category((?!ink|opentui)[^/]+)/:component",
      },
    ];
  },
  turbopack: {
    resolveAlias: { ink: "ink-web" },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
