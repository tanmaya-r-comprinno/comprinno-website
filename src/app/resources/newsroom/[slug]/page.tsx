import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import NewsBanner from "@/components/NewsBanner";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container, CtaBand } from "@/components/ui";
import { newsDate, release, releases } from "@/lib/news";
import { KindTag, NewsRowView } from "../NewsParts";
import Share from "../../blog/Share";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return releases().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = release((await params).slug);
  if (!r) return {};
  const url = `/resources/newsroom/${r.slug}`;
  const description = r.lead.slice(0, 160);
  return {
    title: r.title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: r.title, description, publishedTime: r.date, ...(r.image ? { images: [r.image] } : {}) },
    twitter: { card: r.image ? "summary_large_image" : "summary", title: r.title, description },
  };
}

export default async function ReleasePage({ params }: Props) {
  const r = release((await params).slug);
  if (!r) notFound();
  const path = `/resources/newsroom/${r.slug}`;
  const more = releases().filter((x) => x.slug !== r.slug).slice(0, 3);

  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="py-12 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
                <Link href="/resources/newsroom" className="underline underline-offset-2 hover:text-ink">Newsroom</Link>
                <span className="mx-2">/</span><span>{r.kind}</span>
              </nav>
              <div className="mt-4 flex gap-2"><span className="cs-tag"><i className="bg-[#ffbb00]" />Announcement</span><KindTag kind={r.kind} /></div>
              <h1 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.12]">{r.title}</h1>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-[0.72rem] uppercase tracking-widest text-muted">{r.place} · {newsDate(r.date)} · {r.minutes} min read</p>
                <Share title={r.title} path={path} />
              </div>
            </div>
            <div className="aspect-[16/11] overflow-hidden border border-line">
              <NewsBanner title={r.title} kind={r.kind} />
            </div>
          </div>
        </Container>
      </section>

      {/* BODY */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_17rem] lg:gap-14">
            <article className="cs-prose blog-prose min-w-0">
              <p><strong>{r.place.split(",")[0]}</strong>: {r.lead}</p>
              {r.body && <MDXRemote source={r.body} options={{ mdxOptions: { remarkPlugins: [remarkGfm], format: "md" } }} />}
              {r.quote && (
                <figure className="mt-8 border-l-[3px] border-[#ffbb00] bg-surface p-6">
                  <blockquote className="text-lg leading-relaxed text-ink">“{r.quote.text}”</blockquote>
                  <figcaption className="mt-4 text-sm"><span className="font-semibold text-ink">{r.quote.name}</span><span className="text-muted"> · {r.quote.role}</span></figcaption>
                </figure>
              )}
              <p className="mt-8 border-l-[3px] border-[#006bc9] bg-surface px-5 py-4">Planning a cloud, data or AI project on AWS? <Link href="/contact" className="font-semibold">Talk to our team →</Link></p>
            </article>
            <aside className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">About Comprinno</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">Comprinno is an AWS Premier Tier Services Partner headquartered in Bengaluru, with offices in Pune, the United States and the United Kingdom. It helps fintech, healthcare, SaaS and enterprise teams migrate, modernize, run and secure AWS, and put AI into production.</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* MORE */}
      <section className="border-y border-line bg-surface py-14 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal">More <strong className="font-semibold">news</strong></h2>
            <Link href="/resources/newsroom" className="text-sm font-semibold text-ink underline underline-offset-4">All news →</Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => <NewsRowView key={m.slug} r={{ slug: m.slug, title: m.title, kind: m.kind, date: m.date, dateLabel: newsDate(m.date), image: m.image }} />)}
          </ul>
        </Container>
      </section>

      <CtaBand title={<>Work with an AWS <strong>Premier Tier Partner.</strong></>} desc="Talk to our AWS team about your next data, cloud or AI project." label="Talk to our AWS team" steps={[]} />
    </div>
  );
}
