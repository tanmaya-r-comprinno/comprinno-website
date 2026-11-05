import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, CtaBand, FeatureCard, PageHero, Section, SectionHead } from "@/components/ui";
import { IconTile } from "@/components/Icon";
import { ImageSlot } from "@/components/Illustrations";
import { getProduct, products } from "@/content/products";

// Tevico has its own page at /tevico
export function generateStaticParams() {
  return products.filter((p) => p.slug !== "tevico").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.name}: ${p.tagline}`, description: p.desc, alternates: { canonical: `/products/${p.slug}` } };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p || p.slug === "tevico") notFound();
  const others = products.filter((o) => o.slug !== p.slug);

  return (
    <>
      <PageHero
        eyebrow={`Products / ${p.name}`}
        title={`${p.name}: ${p.tagline}`}
        desc={p.desc}
        visual={<ImageSlot label={`${p.name} product screenshot`} />}
      >
        <Button href="/contact">Book a demo →</Button>
        <Button href="/products" variant="ghost">All products</Button>
      </PageHero>

      <Section>
        <SectionHead eyebrow="What it does" title="Three things, done well" />
        <div className="grid gap-4 md:grid-cols-3">
          {p.features.map((f, i) => (
            <FeatureCard key={`${f.title}-${i}`} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="More products" title="The rest of the family" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Link key={o.slug} href={o.href} className="card block">
              <IconTile name={o.icon} />
              <h3 className="mt-4 font-semibold">{o.name}</h3>
              <p className="mt-1 text-sm text-muted">{o.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand title={`See ${p.name} in action`} label="Book a demo" />
    </>
  );
}
