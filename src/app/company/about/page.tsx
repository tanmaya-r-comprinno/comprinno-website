import type { Metadata } from "next";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import { leadership } from "@/content/company";
import { site } from "@/lib/site";
import GridGlow from "@/components/GridGlow";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Comprinno is a cloud and AI company headquartered in Bengaluru, and an AWS Premier Tier Services Partner. We help teams migrate, modernize, run and secure their cloud, and put AI into production.",
  alternates: { canonical: "/company/about" },
};

// Hidden for now (kept, not deleted): leadership, offices and the numbers band.
const SHOW_HIDDEN = false as boolean;


const values: { title: string; desc: string; icon: IconName }[] = [
  { title: "Competency", desc: "We pursue mastery and turn deep expertise into real outcomes.", icon: "rocket" },
  { title: "Innovation", desc: "We challenge the default, test new ideas and scale what works.", icon: "spark" },
  { title: "Gratitude", desc: "We recognize every opportunity and every contribution, big or small.", icon: "heart" },
  { title: "Professionalism", desc: "We act with integrity, respect and clear communication in every interaction.", icon: "users" },
  { title: "Trustworthiness", desc: "We act with transparency and honesty to build long-term trust.", icon: "shield" },
  { title: "Purpose", desc: "We focus our time and resources on outcomes that move the needle.", icon: "check" },
];

const fourP: { title: string; desc: string; icon: IconName }[] = [
  { title: "People", desc: "Certified cloud, security and AI specialists who care about customer outcomes.", icon: "users" },
  { title: "Processes", desc: "Repeatable frameworks, from migration factories to DevSecOps pipelines, that deliver consistent results at scale.", icon: "loop" },
  { title: "Products", desc: "Our own AI products: Tevico for cloud operations, VeriQ for due-diligence questionnaires, VoxSphere for support and outbound calls, and Weave for agentic process transformation.", icon: "cube" },
  { title: "Partners", desc: "Long-term technology alliances that extend what we can deliver for our customers.", icon: "puzzle" },
];

// TODO: the source page marks these "Pending approval", and they differ from figures used elsewhere on the site (750+ clients, 1,000+ projects, 150+ certifications). Confirm before showing.
const numbers = [
  { value: "212+", label: "Clients" },
  { value: "282+", label: "Projects delivered" },
  { value: "42+", label: "Certifications" },
];

// TODO: answers drafted from page copy — confirm.
const faqs = [
  { q: "Who we are", a: "Comprinno is a cloud and AI company headquartered in Bengaluru, founded in 2013, and an AWS Premier Tier Services Partner. We help teams migrate, modernize, run and secure their cloud, and put AI into production." },
  { q: "Where we work", a: "From offices in Bengaluru and Pune, with a presence in the US and UK, we work with fintech, healthcare, SaaS and enterprise teams around the world." },
  { q: "What we build", a: "Alongside our services, we build our own AI products: Tevico for cloud operations, VeriQ for due-diligence questionnaires, VoxSphere for voice agents and Weave for agentic process transformation." },
];

export default function AboutPage() {
  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>About Comprinno</Eyebrow>
            <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
              From launch <strong className="sweep">to ascent.</strong>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              A cloud and AI company from Bengaluru, helping teams migrate, modernize, run and secure their cloud, and put AI into production.
            </p>
            <div className="mt-8">
              <Button href="/contact">Talk to our team →</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* PURPOSE */}
      <Section>
        <SectionHead eyebrow="Our purpose" title={<>Why we <strong>do this work.</strong></>} />
        <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
          <div className="card">
            <IconTile name="rocket" />
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-muted">Our mission</p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-ink">Be our customers&apos; most trusted technology partner.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Keep our customers focused on growth while we take charge of the cloud and everything behind it.</p>
          </div>
          <div className="card">
            <IconTile name="eye" />
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-muted">Our vision</p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-ink">Become the world&apos;s most trusted brand for cloud, data and AI solutions.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Earn that trust one engagement, one environment and one outcome at a time.</p>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section tone="surface">
        <SectionHead eyebrow="Our values" title={<>What we <strong>stand for.</strong></>} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="card">
              <IconTile name={v.icon} />
              <h3 className="mt-4 font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4P */}
      <Section>
        <SectionHead eyebrow="Our edge" title={<>The <strong>4P framework.</strong></>} desc="Four things that shape how we deliver, every engagement." />
        <ol className="path-row">
          {fourP.map((p, i) => (
            <li key={p.title}>
              <div className="path-card">
                <span className="path-mark" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <IconTile name={p.icon} />
                <h3 className="mt-4 text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {SHOW_HIDDEN && (
        <>
          {/* NUMBERS (pending approval) */}
          <Section>
            <dl className="stats stats-3 bg-bg">
              {numbers.map((st) => (
                <div key={st.label} className="stat">
                  <dt className="stat-label">{st.label}</dt>
                  <dd className="stat-num">{st.value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* LEADERSHIP */}
          <Section>
            <SectionHead eyebrow="Leadership" title={<>The <strong>people</strong> behind it.</>} />
            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {leadership.map((p) => (
                <div key={p.name} className="card">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm font-medium text-ink-2">{p.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.bio}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* OFFICES */}
          <Section>
            <SectionHead eyebrow="Offices" title={<><strong>Bengaluru and Pune</strong>,<Br /> serving the world.</>} />
            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
              {site.offices.map((o) => (
                <div key={o.label} className="card">
                  <h3 className="flex items-center gap-2 font-semibold"><Icon name="pin" className="h-4 w-4 shrink-0 text-muted" />{o.city} · {o.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{o.address}</p>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions about <strong className="font-semibold">Comprinno</strong>?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Who we are, where we work and what we build.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Planning your next <strong>cloud or AI project</strong>?</>}
        desc="Tell us where you are in your cloud journey and what you want to achieve. We'll help you plan the next step."
        label="Talk to our team"
      />
    </div>
  );
}
