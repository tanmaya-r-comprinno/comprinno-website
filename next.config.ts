import type { NextConfig } from "next";
// Old WordPress URLs -> their new home (generated from the old site's sitemap).
import { oldSiteRedirects } from "./src/lib/oldSiteRedirects";
import wordpressRedirects from "./src/content/wordpressRedirects.json";

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
      ...oldSiteRedirects,
      { source: "/tevico", destination: "/products/tevico", permanent: true },
      { source: "/products", destination: "/products/tevico", permanent: true },
      { source: "/case-studies", destination: "/resources/case-studies", permanent: true },
      { source: "/case-studies/:slug", destination: "/resources/case-studies/:slug", permanent: true },
      // old comprinno.net paths still linked from imported articles and search results
      { source: "/case-study/building-a-secure-pci-dss-complaint-infrastructure-on-aws-cloud-for-leading-fintech-company", destination: "/resources/case-studies/comprinno-enables-pcidss-compliance-security-for-fintech-pos-payments-leader", permanent: true },
      { source: "/case-study/:slug", destination: "/resources/case-studies/:slug", permanent: true },
      { source: "/application-modernization", destination: "/services/modernize", permanent: true },
      { source: "/well-architected-eks-package", destination: "/services/modernize", permanent: true },
      { source: "/cloud-migration", destination: "/services/migrate", permanent: true },
      { source: "/cloud-migration/cloud-migration-strategy", destination: "/resources/blog/what-is-cloud-migration-strategy-process-and-tools", permanent: true },
      { source: "/cloud-security/:slug", destination: "/resources/blog/:slug", permanent: true },
      { source: "/uncategorized/optimizing-aws-eks-costs", destination: "/resources/blog/optimizing-aws-eks-costs-1-best-practices-and-strategies-in-2024", permanent: true },
      { source: "/uncategorized/:slug", destination: "/resources/blog/:slug", permanent: true },
      { source: "/blog", destination: "/resources/blog", permanent: true },
      { source: "/newsroom", destination: "/resources/newsroom", permanent: true },
      { source: "/about", destination: "/company/about", permanent: true },
      { source: "/careers", destination: "/company/careers", permanent: true },
      { source: "/products/navitus", destination: "/products/tevico", permanent: true },
      { source: "/products/decivo", destination: "/products/weave", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      ...wordpressRedirects,
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
      // OAuth (src/lib/oauth.ts); 404 unless OAUTH_SIGNING_KEY is configured
      "/.well-known/oauth-authorization-server",
      "/.well-known/oauth-protected-resource",
      "/.well-known/oauth-protected-resource/mcp",
      "/.well-known/jwks.json",
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
