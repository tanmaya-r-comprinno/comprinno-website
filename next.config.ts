import type { NextConfig } from "next";
import { oldSiteRedirects } from "./src/lib/oldSiteRedirects";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  compress: true,
  // smaller image payloads: AVIF first, WebP fallback, cached a month on the server
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 2592000 },
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
      // campaign pages moved under /campaign/<year>/
      { source: "/campaign-2026/aws", destination: "/campaign/2026/AWS/AWS-Premier-Tier-Services-Partner", permanent: true },
      { source: "/recruitment-2026/sdr", destination: "/campaign/2026/recruit-sdr", permanent: true },
      { source: "/tevico", destination: "/platform", permanent: true },
      { source: "/products", destination: "/products/veriq", permanent: true },
      { source: "/products/tevico", destination: "/platform", permanent: true },
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
      { source: "/products/navitus", destination: "/platform", permanent: true },
      { source: "/products/decivo", destination: "/products/weave", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
    ];
  },
  async headers() {
    // static images in /public are not content-hashed: cache a week, then revalidate in the background
    const assetCache = { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" };
    return [
      ...["images", "clients", "partners", "badges", "products", "brand", "careers", "about"].map((dir) => ({
        source: `/${dir}/:path*`,
        headers: [assetCache],
      })),
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
