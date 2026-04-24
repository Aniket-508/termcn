import { createMDX } from "fumadocs-mdx/next";

/** Turbopack requires project-relative alias targets (not absolute paths). */
const opentuiJsxRuntimeTurbo = "./lib/opentui-bridge/react-jsx-runtime.ts";
const opentuiJsxDevRuntimeTurbo =
  "./lib/opentui-bridge/react-jsx-dev-runtime.ts";

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    viewTransition: true,
  },
  headers() {
    const link = [
      '</.well-known/api-catalog>; rel="api-catalog"',
      '</openapi.json>; rel="service-desc"',
      '</docs>; rel="service-doc"',
      '</.well-known/agent-skills/index.json>; rel="describedby"',
    ].join(", ");

    return [{ headers: [{ key: "Link", value: link }], source: "/" }];
  },
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
    resolveAlias: {
      "@opentui/react/jsx-dev-runtime": opentuiJsxDevRuntimeTurbo,
      "@opentui/react/jsx-runtime": opentuiJsxRuntimeTurbo,
      ink: "ink-web",
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
