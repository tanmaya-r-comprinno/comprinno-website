import type { NextConfig } from "next";

const isProduction =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://comprinno.net") === "https://comprinno.net";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  compress: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/tevico", destination: "/products/tevico", permanent: true },
      { source: "/products", destination: "/products/tevico", permanent: true },
      { source: "/case-studies", destination: "/resources/case-studies", permanent: true },
      { source: "/case-studies/:slug", destination: "/resources/case-studies/:slug", permanent: true },
      { source: "/blog", destination: "/resources/blog", permanent: true },
      { source: "/newsroom", destination: "/resources/newsroom", permanent: true },
      { source: "/about", destination: "/company/about", permanent: true },
      { source: "/careers", destination: "/company/careers", permanent: true },
      { source: "/products/navitus", destination: "/products/tevico", permanent: true },
      { source: "/products/decivo", destination: "/products/weave", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Commit SHA injected by the deploy workflow; lets CI verify the live site.
          { key: "X-Deploy-Sha", value: process.env.DEPLOY_SHA ?? "dev" },
          ...(isProduction ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
      {
        // Agent discovery (RFC 8288): point agents at the plain-text site index.
        source: "/((?!api/|_next/).*)",
        headers: [{ key: "Link", value: '</llms.txt>; rel="describedby"; type="text/plain"' }],
      },
    ];
  },
  // /llms.txt and the Markdown route read src/content at request time on Vercel.
  outputFileTracingIncludes: {
    "/api/md/*": ["./src/content/**/*"],
    "/llms.txt": ["./src/content/**/*"],
  },
};

export default nextConfig;
