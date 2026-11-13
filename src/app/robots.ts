import type { MetadataRoute } from "next";
import { isProduction, site } from "@/lib/site";

// Content Signals (https://contentsignals.org): how AI systems may use the content.
//   search   - may appear in search results
//   ai-input - may be used to answer questions in AI tools (with the page as a source)
//   ai-train - may be used to train AI models
const PRODUCTION_SIGNALS = "search=yes, ai-input=yes, ai-train=yes";
const STAGING_SIGNALS = "search=no, ai-input=no, ai-train=no";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/", other: { "Content-Signal": STAGING_SIGNALS } } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"], other: { "Content-Signal": PRODUCTION_SIGNALS } },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
