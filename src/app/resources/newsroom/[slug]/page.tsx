import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Button, CtaBand, Section } from "@/components/ui";
import { getAllNews, getNewsItem } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return {};
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    alternates: { canonical: `/resources/newsroom/${slug}` },
  };
}

export default async function NewsItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  const { frontmatter: fm, content } = item;

  return (
    <>
      <section className="hero-block border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/resources/newsroom" className="hover:text-ink transition-colors">
              Newsroom
            </Link>
            <span>/</span>
            <span className="tag capitalize">{fm.newsType ?? "Announcement"}</span>
          </div>

          <h1 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-[1.2]">
            {fm.title}
          </h1>
          <p className="mt-4 text-base text-muted">{fm.description}</p>
          {fm.publishedAt && (
            <time dateTime={fm.publishedAt} className="mt-4 block text-sm text-muted">
              {new Date(fm.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-slate prose-lg max-w-none
            prose-headings:tracking-tight
            prose-a:text-ink prose-a:underline hover:prose-a:no-underline
            prose-code:bg-surface prose-code:px-1 prose-code:py-0.5 prose-code:text-sm
            prose-pre:bg-surface prose-pre:border prose-pre:border-line">
            <MDXRemote
              source={content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>

          <div className="mt-10 border-t border-line pt-6">
            <Button href="/resources/newsroom" variant="ghost">
              ← Newsroom
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title={<>Want to know <strong>more</strong>?</>}
        desc="Talk to the Comprinno team."
        href="/contact"
        label="Contact us"
      />
    </>
  );
}
