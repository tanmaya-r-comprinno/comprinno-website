import type { Metadata } from "next";
import { CtaBand, Faq, PageHero, Section, SectionHead, StackCards } from "@/components/ui";
import { IconTile } from "@/components/Icon";
import { industries, industryFaqs } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "Cloud and AI for retail, life sciences, healthcare, fintech, SaaS and tech-led enterprises.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Regulated or fast-moving, we've shipped there."
        desc="Compliance complexity, legacy systems, data silos and peak load show up everywhere. Our approach is the same: assess and align, architect for compliance, build and migrate, secure and prove, then scale and optimize."
      />
      <Section>
        <StackCards>
          {industries.map((i, n) => (
            <article key={i.slug} id={i.slug} className="card scroll-mt-24">
              <IconTile name={(["bag", "dna", "heart", "bank", "rocket", "building"] as const)[n % 6]} />
              <h2 className="mt-4 text-xl font-semibold">{i.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{i.focus}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{i.proof}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {i.caps.map((c) => (
                  <li key={c} className="tag">{c}</li>
                ))}
              </ul>
            </article>
          ))}
        </StackCards>
      </Section>
      <Section tone="surface">
        <SectionHead eyebrow="Regulation" title="Compliance questions we hear most" />
        <Faq items={industryFaqs} />
      </Section>
      <CtaBand />
    </>
  );
}
