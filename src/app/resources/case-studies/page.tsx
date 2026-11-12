import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, CtaBand, Eyebrow } from "@/components/ui";
import GridGlow from "@/components/GridGlow";
import ArtTile, { tileFor } from "@/components/ArtTile";
import { caseStudies, SERVICES } from "@/lib/caseStudies";
import CaseStudyBrowser, { CaseTags } from "./CaseStudyBrowser";

export const metadata: Metadata = {
  title: "Customer stories",
  description: "See how companies use Comprinno to migrate, modernize, secure their cloud and put AI into production.",
  alternates: { canonical: "/resources/case-studies" },
};

// Lead with a production AI story
const FEATURED = "ai-enabled-shopfloor-video-intelligence";

export default function CaseStudiesPage() {
  const all = caseStudies();
  const featured = all.find((c) => c.slug === FEATURED) ?? all.find((c) => c.service === "Generative AI") ?? all[0];
  const cards = all.filter((c) => c.slug !== featured.slug).map(({ slug, title, client, industry, service }) => ({ slug, title, client, industry, service }));
  const services = SERVICES.filter((s) => cards.some((c) => c.service === s));
  const facts = featured.metrics.length >= 2
    ? featured.metrics.slice(0, 2)
    : [...featured.metrics, { value: featured.industry, label: "Industry" }, { value: featured.builtWith[0] ?? "AWS", label: "Built on" }].slice(0, 2);

  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>Customer stories</Eyebrow>
            <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
              Real results, <strong className="sweep">from cloud</strong> to <strong>AI in production.</strong>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              See how companies use Comprinno to migrate, modernize, secure their cloud and put AI into production.
            </p>
            <div className="mt-8">
              <Button href="/contact">Talk to an expert →</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      <section className="py-14 sm:py-20">
        <Container>
          <Link href={`/resources/case-studies/${featured.slug}`} className="cs-featured group">
            <div className="brand-dark cs-featured-copy">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-[#a3a9d6]">Featured story</p>
              <div className="mt-3"><CaseTags industry={featured.industry} service={featured.service} /></div>
              <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight text-white">{featured.title}</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-[#d9dcf5]">{featured.description}</p>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-2xl font-semibold text-white sm:text-3xl">{f.value}</dt>
                    <dd className="mt-1 max-w-[14rem] text-xs leading-snug text-[#a3a9d6]">{f.label}</dd>
                  </div>
                ))}
              </dl>
              <span className="btn btn-primary mt-8 self-start">Read the story <span className="go">→</span></span>
            </div>
            <ArtTile variant={tileFor(featured.slug)} fill className="cs-featured-art" />
          </Link>
        </Container>
      </section>

      {/* ALL */}
      <section id="stories" className="scroll-mt-20 pb-14 sm:pb-20">
        <Container>
          <CaseStudyBrowser cards={cards} services={services} />
        </Container>
      </section>

      <CtaBand
        title={<>Want results <strong>like these?</strong></>}
        desc="Tell us where you are and what you want to achieve. An expert will reply within 24 to 48 hours."
        steps={[]}
      />
    </div>
  );
}
