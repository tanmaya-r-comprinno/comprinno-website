import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { visiblePartners, products } from "@/content/products";
import { getAllPosts, getAllCaseStudies, getAllNews } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/industries",
    "/products/tevico",
    "/resources/case-studies",
    "/resources/blog",
    "/resources/newsroom",
    "/resources/free-genai-consulting",
    "/resources/aws-lift",
    "/company/about",
    "/company/careers",
    "/contact",
    "/privacy-policy",
  ];

  const paths = [
    ...staticPaths,
    ...products.filter((p) => p.slug !== "tevico").map((p) => `/products/${p.slug}`),
    ...visiblePartners.map((p) => `/partnerships/${p.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    // Dynamic content
    ...getAllCaseStudies().map((cs) => `/resources/case-studies/${cs.slug}`),
    ...getAllPosts().map((p) => `/resources/blog/${p.slug}`),
    ...getAllNews().map((n) => `/resources/newsroom/${n.slug}`),
  ];

  return paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
  }));
}
