import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on cloud, operations and agentic AI from the Comprinno team.",
  alternates: { canonical: "/resources/blog" },
};

// TODO(content): import posts from comprinno.net/blogs-and-articles (add a SectionHead + .card grid once posts exist).
export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Notes from the operations floor" desc="Articles on cloud, operations and agentic AI. Posts are being moved over from our current site." />
      <CtaBand title={<>Can&apos;t wait for <strong>the next post</strong>?</>} desc="Ask a cloud expert your question directly." />
    </>
  );
}
