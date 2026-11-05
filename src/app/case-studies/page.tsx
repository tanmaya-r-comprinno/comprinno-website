import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Section, StackCards } from "@/components/ui";
import { cases } from "@/content/cases";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Real results from cloud migration, modernization, managed operations and AI projects.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero eyebrow="Resources / case studies" title="Results from the field" desc="Migrations, modernizations, managed operations and AI projects, by outcome." />
      <Section>
        <StackCards>
          {cases.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card block">
              <span className="tag">{c.track}</span>
              <h2 className="mt-3 text-lg font-semibold">{c.client}</h2>
              <p className="mt-1 text-sm font-medium text-ink-2">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.result}</p>
            </Link>
          ))}
        </StackCards>
      </Section>
      <CtaBand />
    </>
  );
}
