import type { Metadata } from "next";
import { Br, CtaBand, FeatureCard, PageHero, Section, SectionHead, Stat } from "@/components/ui";
import { Icon, IconTile } from "@/components/Icon";
import { fourP, leadership, stats, timeline, values } from "@/content/company";
import { site } from "@/lib/site";
import RainField from "@/components/RainField";

export const metadata: Metadata = {
  title: "About us",
  description: "Founded in Bengaluru in 2013. A Premier Tier cloud partner helping teams migrate, modernize, manage and maximize the cloud.",
  alternates: { canonical: "/company/about" },
};

const storyIcons = ["rocket", "puzzle", "cloud", "shield", "check"] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Named for a paper plane: agile, ambitious, built to fly."
        desc="Premier Tier cloud partner, based in Bengaluru since 2013."
      />

      <Section>
        <SectionHead
          eyebrow="Why we exist"
          title={<>Your <strong>most trusted</strong><Br /> technology partner.</>}
          desc="You focus on growth. We manage the cloud and everything behind it."
        />
        <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
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

      <Section tone="surface" background={<RainField />}>
        <SectionHead
          eyebrow="Our story"
          title={<>A <strong>decade</strong> on the cloud.</>}
          desc="From a Bengaluru start-up to a Premier Tier partner, one milestone at a time."
        />
        <ol className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {timeline.map((t, i) => (
            <li key={t.year} className="card">
              <IconTile name={storyIcons[i % storyIcons.length]} />
              <p className="mt-4 font-mono text-2xl font-semibold text-ink">{t.year}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHead
          eyebrow="The 4P framework"
          title={<><strong>People. Processes.</strong><Br /> Products. Partners.</>}
          desc="Four pillars that shape how we hire, work and build."
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fourP.map((p, i) => (
            <FeatureCard key={p.title} icon={(["users", "loop", "cube", "puzzle"] as const)[i]} title={p.title} desc={p.desc} />
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {values.map((v) => (
            <li key={v} className="tag">{v}</li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHead
          eyebrow="Leadership"
          title={<>The <strong>people</strong> behind it.</>}
          desc="The team that sets our direction and keeps us accountable."
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((p) => (
            <div key={p.name} className="card">
              {/* portrait placeholder; final photos come later */}
              <div className="mb-4 flex aspect-square items-center justify-center border border-line bg-surface text-line-strong" aria-hidden="true">
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
        <SectionHead
          eyebrow="Offices"
          title={<><strong>Bengaluru and Pune</strong>,<Br /> serving the world.</>}
          desc="Two offices in India, with customers around the globe."
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
          {site.offices.map((o) => (
            <div key={o.label} className="card">
              <h3 className="flex items-center gap-2 font-semibold"><Icon name="pin" className="h-4 w-4 shrink-0 text-muted" />{o.city} · {o.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{o.address}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title={<>Want to <strong>work with us</strong>?</>} desc="Tell us where you are today and we'll map the next step." />
    </>
  );
}
