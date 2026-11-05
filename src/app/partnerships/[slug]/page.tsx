import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { partnerPages } from "@/content/products";

const find = (slug: string) => partnerPages.find((p) => p.slug === slug);

// AWS has its own richer page at /partnerships/aws
export function generateStaticParams() {
  return partnerPages.filter((p) => p.slug !== "aws").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/partnerships/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return {};
  return { title: `${p.name} partnership`, description: p.desc, alternates: { canonical: `/partnerships/${p.slug}` } };
}

export default async function PartnerPage({ params }: PageProps<"/partnerships/[slug]">) {
  const { slug } = await params;
  const p = find(slug);
  if (!p || p.slug === "aws") notFound();
  return (
    <>
      <PageHero
        eyebrow={`Partnerships / ${p.name}`}
        title={`Comprinno × ${p.name}`}
        desc={p.desc}
        visual={
          <div className="flex aspect-[16/10] items-center justify-center gap-6 rounded-md border border-dashed border-line-strong bg-surface">
            <span className="text-xl font-semibold text-ink">Comprinno</span>
            <span className="font-mono text-muted">×</span>
            <Icon name={p.icon} className="h-8 w-8 text-ink-2" />
            <span className="text-xl font-semibold text-ink">{p.name}</span>
          </div>
        }
      >
        <Button href="/contact">Talk to us →</Button>
      </PageHero>
      <Section>
        {/* TODO(content): partnership details, use cases and case studies per partner */}
        <SectionHead eyebrow="Other partners" title="The rest of the stack" />
        <div className="grid gap-4 sm:grid-cols-3">
          {partnerPages.filter((o) => o.slug !== p.slug).map((o) => (
            <Link key={o.slug} href={o.href} className="card block">
              <IconTile name={o.icon} />
              <h3 className="mt-4 font-semibold">{o.name}</h3>
              <p className="mt-1 text-sm text-muted">{o.badge}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
