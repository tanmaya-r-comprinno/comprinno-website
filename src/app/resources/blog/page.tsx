import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { getAllPosts, getBlogCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on cloud, operations and agentic AI from the Comprinno team.",
  alternates: { canonical: "/resources/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getBlogCategories();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the operations floor"
        desc="Engineering, strategy and AI insights from the Comprinno team."
      />

      <Section>
        {/* Category filter chips */}
        {categories.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="tag">{cat}</span>
            ))}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/resources/blog/${post.slug}`}
              className="card flex flex-col"
            >
              <span className="tag self-start">{post.frontmatter.category ?? "AWS"}</span>
              <h2 className="mt-3 text-base font-semibold leading-snug line-clamp-2">
                {post.frontmatter.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2 flex-1">
                {post.frontmatter.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <span>{post.frontmatter.author ?? "Comprinno"}</span>
                <span>·</span>
                <time dateTime={post.frontmatter.publishedAt}>
                  {new Date(post.frontmatter.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                {post.frontmatter.readingTime && (
                  <>
                    <span>·</span>
                    <span>{post.frontmatter.readingTime} min</span>
                  </>
                )}
              </div>
              <span className="mt-4 text-sm font-medium text-ink">
                Read more <span className="go">→</span>
              </span>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-muted py-16">No posts yet. Check back soon.</p>
        )}
      </Section>

      <CtaBand
        title={<>Can&apos;t wait for <strong>the next post</strong>?</>}
        desc="Ask a cloud expert your question directly."
      />
    </>
  );
}
