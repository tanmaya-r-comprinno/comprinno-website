import type { NextConfig } from "next";

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
        ],
      },
    ];
  },
};

export default nextConfig;
