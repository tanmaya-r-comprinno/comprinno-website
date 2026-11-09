import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Checklist, CtaBand, ExpandSteps, Faq, PageHero, Section, SectionHead, StackCards } from "@/components/ui";
import { IconTile, offeringIcons, problemIcons, processIcons } from "@/components/Icon";
import { serviceViz } from "@/components/Illustrations";
import OfferingCard from "@/components/OfferingCard";
import { getService, services } from "@/content/services";
import { getCase } from "@/content/cases";

export function generateStaticParams() {
  // migrate, modernize and manage have their own dedicated pages
  return services.filter((s) => !["migrate", "modernize", "manage"].includes(s.slug)).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: `${s.verb}: ${s.title}`, description: s.intro, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const cases = s.caseSlugs.map(getCase).filter((c) => c !== undefined);
  const Viz = serviceViz[s.slug];

  return (
    <>
      <PageHero eyebrow={`Services / ${s.verb}`} title={s.title} desc={s.tagline} visual={<Viz />}>
        <Button href="/contact">{s.cta} →</Button>
      </PageHero>

      <Section>
        <SectionHead eyebrow="What you get" title="Four building blocks" desc={s.intro} />
        <StackCards>
          {s.offerings.map((o, i) => (
            <OfferingCard
              key={o.title}
              icon={offeringIcons[s.slug]?.[i] ?? "cube"}
              title={o.title}
              desc={o.desc}
              cta={`Talk to us about ${o.title}`}
            />
          ))}
        </StackCards>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="The problem" title="What usually gets in the way" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.challenges.map((c, ci) => (
            <div key={c.title} className="card">
              <IconTile name={problemIcons[s.slug]?.[ci] ?? "alert"} />
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Process" title="How it runs" />
        <ExpandSteps items={s.process} icons={processIcons[s.slug] ?? ["search", "layers", "code", "rocket", "loop"]} />
      </Section>

      {s.plans && (
        <Section tone="surface">
          <SectionHead eyebrow="Plans" title="Pick the coverage you need" desc="All plans include Tevico Premium and a dedicated technical account manager." />
          <div className="grid gap-4 md:grid-cols-3">
            {s.plans.map((p, pi) => (
              <div key={p.name} className="card">
                <IconTile name={(["check", "layers", "shield"] as const)[pi % 3]} />
                <h3 className="mt-4 text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 font-mono text-sm text-ink-2">{p.coverage}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.adds}</p>
                <p className="mt-3 text-xs text-muted">Reporting: {p.reporting}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section tone={s.plans ? "plain" : "surface"}>
        <SectionHead eyebrow="Included" title="Every engagement includes" />
        <Checklist items={s.includes} />
        <ul className="mt-8 flex flex-wrap gap-2">
          {s.scope.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
      </Section>

      {cases.length > 0 && (
        <Section tone={s.plans ? "surface" : "plain"}>
          <SectionHead eyebrow="Results" title="Delivered for teams like yours" />
          <div className="grid gap-4 md:grid-cols-3">
            {cases.map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card block">
                <span className="tag">{c.track}</span>
                <h3 className="mt-4 font-semibold">{c.client}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.result}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section tone={s.plans || cases.length === 0 ? "plain" : "surface"}>
        <SectionHead eyebrow="FAQ" title="Questions, answered" />
        <Faq items={s.faqs} />
      </Section>

      <CtaBand label={s.cta} />
    </>
  );
}
