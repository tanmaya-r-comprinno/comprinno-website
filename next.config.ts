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
        // Agent discovery (RFC 8288): site index, API catalog (RFC 9727) and AI catalog.
        source: "/((?!api/|_next/).*)",
        headers: [
          {
            key: "Link",
            value: [
              '</llms.txt>; rel="describedby"; type="text/plain"',
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/ai-catalog.json>; rel="ai-catalog"',
            ].join(", "),
          },
        ],
      },
    ];
  },
  // Discovery documents for AI agents (src/app/api/agents). Listed one by one so
  // nothing else under /.well-known (e.g. certificate challenges) is affected.
  async rewrites() {
    return [
      "/.well-known/mcp/server-card.json",
      "/.well-known/api-catalog",
      "/.well-known/ai-catalog.json",
      "/.well-known/poppy.json",
      "/.well-known/agent-skills/index.json",
      "/.well-known/agent-skills/:name/SKILL.md",
    ].map((source) => ({ source, destination: source.replace("/.well-known/", "/api/agents/") }));
  },
  // Agent routes read src/content at request time on Vercel.
  outputFileTracingIncludes: {
    "/api/md/*": ["./src/content/**/*"],
    "/llms.txt": ["./src/content/**/*"],
    "/mcp": ["./src/content/**/*"],
  },
};

export default nextConfig;
