import type { Metadata } from "next";
import Link from "next/link";
import { Br, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { cases } from "@/content/cases";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Real results from cloud migration, modernization, managed operations and AI projects.",
  alternates: { canonical: "/resources/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero eyebrow="Case studies" title="Results from the field" desc="Migrations, modernizations, managed operations and AI projects, sorted by outcome." />
      <Section>
        <SectionHead
          eyebrow="Results"
          title={<><strong>Production results</strong>,<Br /> not pilots.</>}
          desc="Real outcomes from teams we have worked with."
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link key={c.slug} href={`/resources/case-studies/${c.slug}`} className="card flex flex-col">
              <span className="tag self-start">{c.track}</span>
              <h2 className="mt-3 text-lg font-semibold">{c.client}</h2>
              <p className="mt-1 text-sm font-medium text-ink-2 lg:min-h-[2.75em]">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.result}</p>
              <span className="mt-auto pt-5 text-sm font-medium text-ink">Read more <span className="go">→</span></span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand title={<>Want results <strong>like these</strong>?</>} desc="Tell us about your project and we'll show you what's possible." />
    </>
  );
}
