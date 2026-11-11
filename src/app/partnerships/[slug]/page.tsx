import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Br, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { IconTile } from "@/components/Icon";
import { partnerPages, visiblePartners } from "@/content/products";

const find = (slug: string) => visiblePartners.find((p) => p.slug === slug);

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
        eyebrow={`${p.name} partnership`}
        title={`Comprinno × ${p.name}`}
        desc={p.desc}
      />
      <Section>
        {/* TODO(content): partnership details, use cases and case studies per partner */}
        <SectionHead
          eyebrow="Other partners"
          title={<>The rest of <strong>the stack</strong>.</>}
          desc={`The partners we build with alongside ${p.name}.`}
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-3">
          {visiblePartners.filter((o) => o.slug !== p.slug).map((o) => (
            <Link key={o.slug} href={o.href} className="card block">
              <IconTile name={o.icon} />
              <h3 className="mt-4 font-semibold">{o.name}</h3>
              <p className="mt-1 text-sm text-muted">{o.badge}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand title={<>Planning a project with<Br /> <strong>{p.name}</strong>?</>} desc="Talk to us about how the partnership can help your team." />
    </>
  );
}
