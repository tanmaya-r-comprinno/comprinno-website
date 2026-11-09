import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { cases } from "@/content/cases";
import { partnerPages, products } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "", "/industries", "/products/tevico", "/resources/case-studies", "/resources/blog", "/resources/newsroom",
    "/about", "/careers", "/contact", "/privacy-policy", "/partnerships",
  ];
  const paths = [
    ...staticPaths,
    ...products.filter((p) => p.slug !== "tevico").map((p) => `/products/${p.slug}`),
    ...partnerPages.map((p) => `/partnerships/${p.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...cases.map((c) => `/resources/case-studies/${c.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
