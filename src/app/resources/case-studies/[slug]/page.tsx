import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Button, Container, CtaBand } from "@/components/ui";
import ZoomImages from "@/components/ZoomImages";
import { caseStudies, caseStudy } from "@/lib/caseStudies";
import { CaseCardView, CaseTags } from "../CaseStudyBrowser";

type Props = { params: Promise<{ slug: string }> };

// Empty imports from WordPress: send visitors to the same client's full story
const MOVED: Record<string, string> = {
  boat: "boats-strategic-alliance-with-comprinno-for-robust-infrastructure-management",
  lightmetrics: "a-winning-formula-lightmetrics-and-comprinnos-collaboration-for-operational-brilliance",
  "mantle-labs": "mantle-labs-building-a-gen-ai-infrastructure-for-carbon-credit-calculation",
};

export function generateStaticParams() {
  return caseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = caseStudy((await params).slug);
  if (!c) return {};
  return { title: c.title, description: c.description, alternates: { canonical: `/resources/case-studies/${c.slug}` } };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  if (MOVED[slug]) redirect(`/resources/case-studies/${MOVED[slug]}`);
  const c = caseStudy(slug);
  if (!c) notFound();

  // Headline band: real numbers from the story first, then plain facts (never invented figures)
  const band = [
    ...c.metrics,
    { value: c.service, label: "What we delivered" },
    { value: c.industry, label: "Industry" },
    ...c.builtWith.slice(0, 2).map((b) => ({ value: b, label: "Built on" })),
  ].slice(0, 4);

  const related = [
    ...caseStudies().filter((x) => x.slug !== c.slug && x.service === c.service),
    ...caseStudies().filter((x) => x.slug !== c.slug && x.service !== c.service),
  ].slice(0, 3);

  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="flex flex-col items-center py-12 text-center sm:py-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
            <Link href="/resources/case-studies" className="underline underline-offset-2 hover:text-ink">Customer stories</Link>
            <span className="mx-2">/</span>
            <span>{c.industry}</span>
          </nav>
          <div className="mt-4 flex justify-center"><CaseTags industry={c.industry} service={c.service} /></div>
          <h1 className="mt-4 max-w-4xl text-[clamp(1.8rem,4.2vw,3rem)] font-semibold leading-[1.12]">{c.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{c.description}</p>
        </Container>
      </section>

      {/* NUMBERS BAND */}
      <section className="brand-dark py-10">
        <Container>
          <dl className="grid grid-cols-2 gap-px lg:grid-cols-4">
            {band.map((b, i) => (
              <div key={i} className="border-l border-white/15 px-5 py-2">
                <dt className={`font-semibold text-white ${b.value.length > 14 ? "text-lg leading-snug" : "text-3xl"}`}>{b.value}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-[#a3a9d6]">{b.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* BODY */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-14">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-line">
                <p className="border-b border-line px-4 py-3 font-mono text-[0.7rem] font-semibold uppercase tracking-widest text-ink">At a glance</p>
                <dl className="divide-y divide-line px-4 text-sm">
                  {[
                    ["Client", c.client],
                    ["Industry", c.industry],
                    ["Service", c.service],
                    ...(c.builtWith.length ? [["Built with", c.builtWith.join(", ")]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="py-3">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{k}</dt>
                      <dd className="mt-1 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <nav aria-label="On this page" className="mt-6 hidden lg:block">
                <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">On this page</p>
                <ul className="mt-2 border-l border-line">
                  {c.sections.map((s) => (
                    <li key={s.id}><a href={`#${s.id}`} className="cs-toc">{s.label}</a></li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 border border-line bg-surface p-4">
                <p className="font-semibold text-ink">Planning something similar?</p>
                <Button href="/contact" className="mt-3 !min-h-10">Talk to an expert →</Button>
              </div>
            </aside>

            <article className="min-w-0"><ZoomImages>
              {c.sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-24 [&+&]:mt-14">
                  <p className="font-mono text-[0.7rem] uppercase tracking-widest text-[#006bc9]">{String(i + 1).padStart(2, "0")} · {s.label}</p>
                  <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{s.label}</h2>
                  <div className={`cs-prose mt-5 ${s.id === "results" ? "cs-results" : ""}`}>
                    <MDXRemote source={s.body} options={{ mdxOptions: { remarkPlugins: [remarkGfm], format: "md" } }} />
                  </div>
                </section>
              ))}
            </ZoomImages></article>
          </div>
        </Container>
      </section>

      {/* MORE */}
      <section className="border-y border-line bg-surface py-14 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal">More <strong className="font-semibold">customer stories</strong></h2>
            <Link href="/resources/case-studies#stories" className="text-sm font-semibold text-ink underline underline-offset-4">All stories →</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <CaseCardView key={r.slug} c={{ slug: r.slug, title: r.title, client: r.client, industry: r.industry, service: r.service }} />)}
          </div>
        </Container>
      </section>

      <CtaBand
        title={<>Planning something <strong>similar?</strong></>}
        desc="Tell us where you are and what you want to achieve. An expert will reply within 24 to 48 hours."
        steps={[]}
      />
    </div>
  );
}
