import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { visiblePartners, products } from "@/content/products";
import { posts } from "@/lib/blog";
import { caseStudies, movedCaseStudies } from "@/lib/caseStudies";
import { releases } from "@/lib/news";

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
    // Match detail-page visibility and omit imported stories that redirect.
    ...caseStudies().filter((cs) => !movedCaseStudies[cs.slug]).map((cs) => `/resources/case-studies/${cs.slug}`),
    ...posts().map((p) => `/resources/blog/${p.slug}`),
    ...releases().map((n) => `/resources/newsroom/${n.slug}`),
  ];

  // No verified modification dates are maintained for every page. Omit lastmod
  // rather than marking unchanged content as updated on every request/build.
  return [...new Set(paths)].map((p) => ({
    url: `${site.url}${p}`,
  }));
}
