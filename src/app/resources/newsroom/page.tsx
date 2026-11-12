import type { Metadata } from "next";
import Link from "next/link";
import NewsBanner from "@/components/NewsBanner";
import { Container, CtaBand, Eyebrow } from "@/components/ui";
import GridGlow from "@/components/GridGlow";
import RainField from "@/components/RainField";
import { KINDS, newsDate, releases } from "@/lib/news";
import NewsBrowser from "./NewsBrowser";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press releases, AWS milestones and partner news from Comprinno.",
  alternates: { canonical: "/resources/newsroom" },
};

export default function NewsroomPage() {
  const all = releases();
  const [latest] = all;
  const rows = all.slice(1).map((r) => ({ slug: r.slug, title: r.title, kind: r.kind, date: r.date, dateLabel: newsDate(r.date), image: r.image }));
  const kinds = KINDS.filter((k) => rows.some((r) => r.kind === k));

  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>Newsroom</Eyebrow>
            <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
              News and milestones <strong className="sweep">from Comprinno.</strong>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">Press releases, AWS milestones and partner news from Comprinno.</p>
          </div>
        </Container>
      </section>

      {/* LATEST RELEASE */}
      {latest && (
        <section className="relative overflow-hidden border-b border-line bg-surface py-8 sm:py-10">
          {/* existing site motion: falling light */}
          <RainField />
          <Container className="relative">
            <Link href={`/resources/newsroom/${latest.slug}`} className="group grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-[#ffbb00] px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-[#1c1c1c]">Latest release</span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{latest.kind} · {newsDate(latest.date)}</span>
                </div>
                <h2 className="mt-4 text-[clamp(1.4rem,2.8vw,2.1rem)] font-semibold leading-tight text-ink transition-colors group-hover:text-[#006bc9]">{latest.title}</h2>
                <p className="mt-3 line-clamp-2 max-w-2xl text-muted">{latest.lead}</p>
                <span className="btn btn-primary mt-5">Read the announcement <span className="go">→</span></span>
              </div>
              <div className="aspect-[16/9] overflow-hidden border border-line">
                <NewsBanner title={latest.title} kind={latest.kind} className="transition duration-500 group-hover:scale-[1.03]" />
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* ALL NEWS + SIDEBAR */}
      <section className="py-14 sm:py-20">
        <Container>
          <NewsBrowser rows={rows} kinds={kinds} />
        </Container>
      </section>

      <CtaBand
        title={<>Planning a cloud, <strong>data or AI project?</strong></>}
        desc="Work with an AWS Premier Tier Services Partner. An expert will reply within 24 to 48 hours."
        steps={[]}
      />
    </div>
  );
}
