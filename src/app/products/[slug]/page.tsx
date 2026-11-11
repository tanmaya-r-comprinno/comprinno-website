import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Br, Button, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import LogoMarquee from "@/components/LogoMarquee";
import { getProduct, products } from "@/content/products";

// Every current product has its own dedicated page (tevico, veriq, voxsphere, decivo).
// This route only serves products added to content without one.
const DEDICATED = new Set(["tevico", "voxsphere", "veriq", "decivo"]);
const routed = () => products.filter((p) => !DEDICATED.has(p.slug));

export function generateStaticParams() {
  // Cache Components requires at least one param; "_" resolves to notFound().
  const params = routed().map((p) => ({ slug: p.slug }));
  return params.length ? params : [{ slug: "_" }];
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
  if (!p || DEDICATED.has(p.slug)) notFound();
  const others = products.filter((o) => o.slug !== p.slug);

  return (
    <>
      <PageHero eyebrow={`Products · ${p.category}`} title={`${p.name}: ${p.tagline}`} desc={p.desc}>
        <Button href="/contact">Book a demo →</Button>
      </PageHero>

      <LogoMarquee />

      {/* WHAT IT DOES */}
      <Section>
        <SectionHead
          eyebrow="What it does"
          title={<>Three things, <strong>done well</strong>.</>}
          desc={`The core of ${p.name}, built to run in production from day one.`}
        />
        <ol className="path-row lg:!grid-cols-3">
          {p.features.map((f) => (
            <li key={f.title}>
              <div className="path-card">
                <span className="path-mark" aria-hidden="true">{f.title.split(" ")[0]}</span>
                <IconTile name={f.icon} />
                <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* PRODUCT SCREEN */}
      <Section tone="surface">
        <SectionHead eyebrow="Product tour" title={<>See <strong>{p.name}</strong> at work.</>} desc="A walkthrough of the product on real workflows, booked around your team." />
        <div className="mx-auto max-w-5xl border border-line-strong bg-bg p-3">
          <div className="flex aspect-[16/8] items-center justify-center border border-dashed border-line-strong bg-surface font-mono text-xs text-muted">
            {p.name} product screen
          </div>
        </div>
      </Section>

      {/* MORE PRODUCTS */}
      <Section>
        <SectionHead eyebrow="More products" title={<>The rest of <strong>the family</strong>.</>} desc="Every Comprinno product runs on the same secure foundation." />
        <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={o.href} className="move-tile group">
                <span className="move-tile-top">
                  <span className="move-tile-icon" aria-hidden="true"><Icon name={o.icon} className="h-5 w-5" /></span>
                </span>
                <span>
                  <span className="move-tile-title block">{o.name}</span>
                  <span className="mt-1 block text-sm font-normal text-muted">{o.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={<>See <strong>{p.name}</strong><Br /> in action.</>}
        desc="Book a demo. You'll see the product on your own use case before you commit."
        steps={["30-min demo call", "Fit check on your workflows", "A pilot plan you can act on"]}
        label="Book a demo"
      />
    </>
  );
}
