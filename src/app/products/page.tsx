import type { Metadata } from "next";
import Link from "next/link";
import { Br, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Comprinno's AI products: Tevico, Navitus, VeriQ, VoxSphere and more.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const [hero, ...rest] = products;
  return (
    <>
      <PageHero eyebrow="Our products" title="AI products, built from a decade of operations" desc="Agents that do real work, with humans in control." />

      <Section>
        <SectionHead
          eyebrow="Flagship"
          title={<>Meet <strong>{hero.name}</strong>.</>}
          desc={hero.tagline}
        />
        <Link href={hero.href} className="card group grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="tag">flagship · {hero.category}</span>
            <div className="mt-5 flex items-center gap-4">
              <span className="icon-tile !h-16 !w-16"><Icon name={hero.icon} className="h-8 w-8" /></span>
              <h3 className="text-3xl font-semibold sm:text-4xl">{hero.name}</h3>
            </div>
            <p className="mt-4 text-lg text-ink-2">{hero.tagline}</p>
            <span className="mt-6 inline-block text-sm font-medium text-ink">Explore {hero.name} <span className="go">→</span></span>
          </div>
          <ul className="grid gap-3">
            {hero.features.map((f) => (
              <li key={f.title} className="flex flex-wrap items-center gap-x-4 gap-y-1 border border-line bg-surface p-3">
                <Icon name={f.icon} className="h-5 w-5 text-ink-2" />
                <span className="font-medium text-ink">{f.title}</span>
                <span className="text-sm text-muted">{f.desc}</span>
              </li>
            ))}
          </ul>
        </Link>
      </Section>

      <Section tone="surface">
        <SectionHead
          eyebrow="The family"
          title={<>More products,<Br /> <strong>same standards</strong>.</>}
          desc="Each one is built on the same production-ready foundation."
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p) => (
            <Link key={p.slug} href={p.href} className={`card flex flex-col ${p.status ? "border-dashed" : ""}`}>
              <div className="flex items-center justify-between">
                <IconTile name={p.icon} />
                <span className="tag">{p.category}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              <span className="mt-auto pt-6 text-sm font-medium text-ink">Learn more <span className="go">→</span></span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand title={<>Which agent should<Br /> <strong>work for you</strong>?</>} desc="See the products in action and find the right fit for your team." label="Book a product demo" />
    </>
  );
}
