import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, CtaBand, Eyebrow } from "@/components/ui";
import GridGlow from "@/components/GridGlow";
import ArtTile, { tileFor } from "@/components/ArtTile";
import { formatDate, posts, TOPICS } from "@/lib/blog";
import BlogBrowser from "./BlogBrowser";
import { Author, Newsletter, TopicTag } from "./BlogParts";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical guides from Comprinno experts on AWS migration, modernization, security, compliance, FinOps and applied AI.",
  alternates: { canonical: "/resources/blog" },
};

export default function BlogPage() {
  const all = posts();
  const [latest, ...rest] = all;
  const recent = rest.slice(0, 3);
  const cards = all.map(({ slug, title, topic, author, role, initials, publishedAt }) => ({ slug, title, topic, author, role, initials, publishedAt, date: formatDate(publishedAt) }));
  const topics = TOPICS.filter((t) => cards.some((c) => c.topic === t));

  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>Insights</Eyebrow>
            <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
              Cloud and AI insights <strong className="sweep">from people</strong> <strong>who do the work.</strong>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Practical guides from Comprinno experts on AWS migration, modernization, security, compliance, FinOps and applied AI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="#newsletter">Subscribe to CloudScape</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* LATEST + RECENT */}
      {latest && (
        <section className="border-b border-line bg-surface py-14 sm:py-20">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
              {/* Latest: image-led feature card */}
              <Link href={`/resources/blog/${latest.slug}`} className="card group flex flex-col !p-0">
                <ArtTile variant={tileFor(latest.slug)} fill className="aspect-[16/7] !border-0 !border-b !border-line" />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.68rem] uppercase tracking-widest text-[#006bc9]">Latest</span>
                    <TopicTag topic={latest.topic} />
                    <span className="ml-auto font-mono text-[0.68rem] text-muted">{formatDate(latest.publishedAt)}</span>
                  </div>
                  <h2 className="mt-4 text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold leading-snug transition-colors group-hover:text-[#006bc9]">{latest.title}</h2>
                  <p className="mt-3 line-clamp-2 leading-relaxed text-muted">{latest.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <Author name={latest.author} role={latest.role} initials={latest.initials} small />
                    <span className="text-sm font-semibold text-ink">Read article <span className="go">→</span></span>
                  </div>
                </div>
              </Link>

              {/* Recently published: compact rows with thumbnails */}
              <div className="flex flex-col">
                <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">Recently published</p>
                <ol className="mt-3 flex flex-1 flex-col gap-3">
                  {recent.map((p) => (
                    <li key={p.slug} className="flex-1">
                      <Link href={`/resources/blog/${p.slug}`} className="card group flex h-full items-center gap-4 !p-3">
                        <ArtTile variant={tileFor(p.slug)} fill className="aspect-[16/11] w-28 shrink-0 sm:w-32" />
                        <span className="min-w-0">
                          <TopicTag topic={p.topic} />
                          <span className="mt-2 block line-clamp-2 font-semibold leading-snug text-ink transition-colors group-hover:text-[#006bc9]">{p.title}</span>
                          <span className="mt-1 block text-xs text-muted">{p.author} · {formatDate(p.publishedAt)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ALL ARTICLES */}
      <section id="articles" className="scroll-mt-20 py-14 sm:py-20">
        <Container>
          <BlogBrowser cards={cards} topics={topics} />
        </Container>
      </section>

      <Newsletter />

      <CtaBand
        title={<>Planning your next <strong>cloud or AI project?</strong></>}
        desc="Talk to the people who write these guides. An expert will reply within 24 to 48 hours."
        steps={[]}
      />
    </div>
  );
}
