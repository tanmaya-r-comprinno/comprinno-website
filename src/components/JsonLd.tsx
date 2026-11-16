import { site } from "@/lib/site";

/** Structured data for search engines. Content must match what the page shows. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Comprinno Technologies",
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.emails.general,
  telephone: site.phone,
  sameAs: [site.social.linkedin, site.social.x, site.social.instagram],
};

export function articleLd(a: { title: string; description: string; path: string; publishedAt: string; author: string; section: string }) {
  const url = `${site.url}${a.path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.description,
      datePublished: a.publishedAt,
      author: { "@type": a.author === "Comprinno team" ? "Organization" : "Person", name: a.author },
      publisher: { "@type": "Organization", name: "Comprinno Technologies", logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` } },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: a.section, item: `${site.url}${a.path.split("/").slice(0, 3).join("/")}` },
        { "@type": "ListItem", position: 3, name: a.title, item: url },
      ],
    },
  ];
}
