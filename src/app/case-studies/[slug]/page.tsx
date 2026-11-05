import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, CtaBand, PageHero, Section } from "@/components/ui";
import { cases, getCase } from "@/content/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return { title: `${c.client}: ${c.title}`, description: c.result, alternates: { canonical: `/case-studies/${c.slug}` } };
}

export default async function CasePage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  return (
    <>
      <PageHero eyebrow={`Case study / ${c.track}`} title={c.title} desc={c.client}>
        <Button href="/case-studies" variant="ghost">← All case studies</Button>
      </PageHero>
      <Section>
        <div className="card max-w-2xl">
          <p className="label">Outcome</p>
          <p className="mt-2 text-xl font-medium text-ink">{c.result}</p>
        </div>
        {/* TODO(content): full challenge / solution / results write-up per case, from comprinno.net */}
        <p className="mt-6 max-w-2xl text-sm text-muted">The full write-up for this project is coming soon. Talk to us for the detailed story.</p>
      </Section>
      <CtaBand />
    </>
  );
}
