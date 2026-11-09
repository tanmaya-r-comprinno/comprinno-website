import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { cases, getCase } from "@/content/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return { title: `${c.client}: ${c.title}`, description: c.result, alternates: { canonical: `/resources/case-studies/${c.slug}` } };
}

export default async function CasePage({ params }: PageProps<"/resources/case-studies/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  return (
    <>
      <PageHero eyebrow={`Case study · ${c.track}`} title={c.title} desc={c.client}>
        <Button href="/resources/case-studies" variant="ghost">← All case studies</Button>
      </PageHero>
      <Section>
        <SectionHead
          eyebrow="Outcome"
          title={<>What <strong>changed</strong>.</>}
          desc="The full write-up is coming soon. Talk to us for the detailed story."
        />
        {/* TODO(content): full challenge / solution / results write-up per case, from comprinno.net */}
        <div className="card mx-auto max-w-2xl text-center">
          <p className="label">Result</p>
          <p className="mt-2 text-xl font-medium text-ink">{c.result}</p>
        </div>
      </Section>
      <CtaBand title={<>Facing a <strong>similar challenge</strong>?</>} desc="Talk to the team that delivered this project." />
    </>
  );
}
