import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Button, CtaBand, Section } from "@/components/ui";
import { getAllPosts, getPost } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/resources/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { frontmatter: fm, content } = post;

  return (
    <>
      {/* Hero */}
      <section className="hero-block border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/resources/blog" className="hover:text-ink transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-ink truncate max-w-xs">{fm.category}</span>
          </div>

          <span className="tag">{fm.category}</span>
          <h1 className="mt-4 text-[clamp(1.6rem,4vw,2.75rem)] font-semibold leading-[1.15]">
            {fm.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{fm.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            {fm.author && <span>{fm.author}</span>}
            {fm.authorDesignation && (
              <span className="text-muted/60">{fm.authorDesignation}</span>
            )}
            {fm.publishedAt && (
              <time dateTime={fm.publishedAt}>
                {new Date(fm.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
            {fm.readingTime && <span>{fm.readingTime} min read</span>}
          </div>
        </div>
      </section>

      {/* Article body */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-slate prose-lg max-w-none
            prose-headings:tracking-tight
            prose-a:text-ink prose-a:underline hover:prose-a:no-underline
            prose-code:before:content-none prose-code:after:content-none
            prose-code:bg-surface prose-code:px-1 prose-code:py-0.5 prose-code:text-sm
            prose-pre:bg-surface prose-pre:border prose-pre:border-line">
            <MDXRemote
              source={content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>

          {/* Tags */}
          {fm.tags && fm.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
              {fm.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="mt-10 border-t border-line pt-6">
            <Button href="/resources/blog" variant="ghost">
              ← Back to blog
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title={<>Interested in <strong>working with us</strong>?</>}
        desc="Talk to a cloud and AI expert about your next project."
      />
    </>
  );
}
