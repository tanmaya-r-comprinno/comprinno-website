import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Button, Container } from "@/components/ui";
import ZoomImages from "@/components/ZoomImages";
import { formatDate, post, posts, slugify } from "@/lib/blog";
import { Author, Newsletter, PostCardView, TopicTag } from "../BlogParts";
import Share from "../Share";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = post((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.description, alternates: { canonical: `/resources/blog/${p.slug}` } };
}

const text = (n: ReactNode): string => (typeof n === "string" || typeof n === "number" ? String(n) : Array.isArray(n) ? n.map(text).join("") : n && typeof n === "object" && "props" in n ? text((n as { props: { children?: ReactNode } }).props.children) : "");

// h2s get ids so the "On this page" links can jump to them
const mdx = {
  h2: ({ children }: { children?: ReactNode }) => <h2 id={slugify(text(children))}>{children}</h2>,
};

export default async function BlogPost({ params }: Props) {
  const p = post((await params).slug);
  if (!p) notFound();
  const path = `/resources/blog/${p.slug}`;
  const more = [...posts().filter((x) => x.slug !== p.slug && x.topic === p.topic), ...posts().filter((x) => x.slug !== p.slug && x.topic !== p.topic)].slice(0, 3);

  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
            <Link href="/resources/blog" className="underline underline-offset-2 hover:text-ink">Insights</Link>
            <span className="mx-2">/</span>
            <span>{p.topic}</span>
          </nav>
          <div className="mt-4"><TopicTag topic={p.topic} /></div>
          <h1 className="mt-4 max-w-4xl text-[clamp(1.8rem,4.2vw,3rem)] font-semibold leading-[1.12]">{p.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{p.description}</p>
          <div className="mt-8 flex max-w-4xl flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <Author name={p.author} role={`${formatDate(p.publishedAt)} · ${p.minutes} min read`} initials={p.initials} />
            </span>
            <Share title={p.title} path={path} />
          </div>
        </Container>
      </section>

      {/* BODY */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_17rem] lg:gap-16">
            <article className="cs-prose blog-prose min-w-0">
              <ZoomImages><MDXRemote source={p.body} components={mdx} options={{ mdxOptions: { remarkPlugins: [remarkGfm], format: "md" } }} /></ZoomImages>

              {/* ABOUT THE AUTHOR: one slim line */}
              <div className="mt-10 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-[#c9e0f6] bg-[#e3f0fc] font-mono text-[0.68rem] font-semibold text-[#006bc9]">{p.initials}</span>
                <p className="!mt-0 text-sm leading-snug text-muted">Written by <span className="font-semibold text-ink">{p.author}</span>{p.role !== "Comprinno" && <>, {p.role}</>}</p>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              {p.headings.length > 1 && (
                <nav aria-label="On this page">
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">On this page</p>
                  <ul className="mt-2 border-l border-line">
                    {p.headings.map((h) => <li key={h.id}><a href={`#${h.id}`} className="cs-toc">{h.text}</a></li>)}
                  </ul>
                </nav>
              )}
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-widest text-muted">Share</p>
              <div className="mt-2"><Share title={p.title} path={path} /></div>
              <div className="mt-6 border border-line bg-surface p-4">
                <p className="font-semibold text-ink">Need help with this?</p>
                <p className="mt-1 text-sm text-muted">Talk to the team behind this guide.</p>
                <Button href="/contact" className="mt-3 !min-h-10">Talk to an expert →</Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* MORE */}
      <section className="border-t border-line bg-surface py-14 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal">More <strong className="font-semibold">articles</strong></h2>
            <Link href="/resources/blog#articles" className="text-sm font-semibold text-ink underline underline-offset-4">All articles →</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m, i) => <PostCardView key={m.slug} art={(i * 3 + 1) % 10} p={{ slug: m.slug, title: m.title, topic: m.topic, author: m.author, role: m.role, initials: m.initials, publishedAt: m.publishedAt, date: formatDate(m.publishedAt) }} />)}
          </div>
        </Container>
      </section>

      <Newsletter />
    </div>
  );
}
