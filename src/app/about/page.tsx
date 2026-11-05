import type { Metadata } from "next";
import { CtaBand, FeatureCard, PageHero, Section, SectionHead, StackCards, Stat } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { ImageSlot } from "@/components/Illustrations";
import { fourP, leadership, stats, timeline, values } from "@/content/company";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Founded in Bengaluru in 2013. An AWS Premier Tier Partner helping teams migrate, modernize, manage and maximize the cloud.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company / about"
        title="Named for a paper plane: agile, ambitious, built to fly."
        desc="AWS Premier Tier Partner, Bengaluru. Since 2013."
        visual={<ImageSlot label="team photo" />}
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card">
            <IconTile name="rocket" />
            <p className="mt-4 label">Mission</p>
            <p className="mt-2 text-lg text-ink">Be our customers&apos; most trusted technology partner, so they focus on growth while we manage the cloud and everything behind it.</p>
          </div>
          <div className="card">
            <IconTile name="eye" />
            <p className="mt-4 label">Vision</p>
            <p className="mt-2 text-lg text-ink">Become one of the most trusted brands for cloud solutions and operations worldwide.</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="Our story" title="A decade on the cloud" />
        <StackCards>
          {timeline.map((t, ti) => (
            <div key={t.year} className="card flex items-start gap-5">
              <IconTile name={(["rocket", "puzzle", "cloud", "shield", "check"] as const)[ti % 5]} className="shrink-0" />
              <div>
                <p className="font-mono text-2xl font-semibold text-ink">{t.year}</p>
                <p className="mt-2 text-sm leading-relaxed sm:text-base">{t.text}</p>
              </div>
            </div>
          ))}
        </StackCards>
      </Section>

      <Section>
        <SectionHead eyebrow="The 4P framework" title="People. Processes. Products. Partners." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fourP.map((p, i) => (
            <FeatureCard key={p.title} icon={(["users", "loop", "cube", "puzzle"] as const)[i]} title={p.title} desc={p.desc} />
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {values.map((v) => (
            <li key={v} className="tag">{v}</li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="Leadership" title="The people behind it" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((p) => (
            <div key={p.name} className="card">
              {/* portrait placeholder; final photos come later */}
              <div className="mb-4 flex aspect-square items-center justify-center rounded-md border border-line bg-surface text-line-strong" aria-hidden="true">
                <Icon name="user" className="h-16 w-16" />
              </div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm font-medium text-ink-2">{p.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Offices" title="Bengaluru and Pune, serving the world" />
        <div className="grid gap-4 sm:grid-cols-2">
          {site.offices.map((o) => (
            <div key={o.label} className="card">
              <h3 className="flex items-center gap-2 font-semibold"><Icon name="pin" className="h-4 w-4 shrink-0 text-muted" />{o.city} · {o.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{o.address}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
