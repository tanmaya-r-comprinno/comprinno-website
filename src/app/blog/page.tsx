import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on cloud, operations and agentic AI from the Comprinno team.",
  alternates: { canonical: "/blog" },
};

// TODO(content): import posts from comprinno.net/blogs-and-articles. Consider MDX files in /src/content/blog.
export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Resources / blog" title="Notes from the operations floor" desc="Articles on cloud, operations and agentic AI. Posts are being migrated from our current site." />
      <Section>
        <div className="card max-w-xl text-sm text-muted">Articles coming soon.</div>
      </Section>
    </>
  );
}
