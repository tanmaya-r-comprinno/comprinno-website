import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Br, Eyebrow, Faq, CtaBand } from "@/components/ui";
import { IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";
import Credentials from "@/components/Credentials";
import ParticleWave from "@/components/ParticleWave";
import ProductDiagram from "@/components/ProductDiagram";
import RainField from "@/components/RainField";
import ArtTile from "@/components/ArtTile";
import { caseStudy } from "@/lib/caseStudies";
import { serviceIcon } from "@/lib/caseStudyIcons";
import FooterArt from "@/components/FooterArt";
import HubSpotForm from "./HubSpotForm";
import FundingCheck from "./FundingCheck";

/**
 * AWS campaign landing page (low fidelity): black and white, placeholder boxes for logos and badges.
 * Swap placeholders for real assets once the visual direction is approved.
 */
export const metadata: Metadata = {
  title: "Build on AWS with a Premier Tier partner",
  description: "Book a call with a solutions architect: a scoped plan, AWS funding options and a pilot built to go to production.",
};

const tel = `tel:${site.phone.replace(/\s/g, "")}`;

const W = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;

const Tag = ({ children }: { children: string }) => <span className="inline-flex"><Eyebrow>{children}</Eyebrow></span>;

const stats = [
  { v: "Premier", l: "AWS partner tier" },
  { v: "750+", l: "Clients" },
  { v: "1,000+", l: "Projects delivered" },
  { v: "150+", l: "AWS certifications" },
];

const premier = [
  { icon: "rocket" as IconName, k: "01 · Pilot", t: "Pilot to production, faster", d: "Early access to AWS programs and service teams, so your agents ship on infrastructure built to carry them." },
  { icon: "coin" as IconName, k: "02 · Fund", t: "Funding that lowers your risk", d: "Premier partners can pass AWS investment programs on to customers. We’ll tell you what your project qualifies for." },
  { icon: "shield" as IconName, k: "03 · Run", t: "Delivery AWS has audited", d: "Architecture, security and governance held to AWS’s own bar, from day zero to the last mile." },
];

const fundingSteps = [
  { t: "Check eligibility", d: "We match your workload, project type and spend to AWS programs." },
  { t: "Build the case", d: "We prepare the business case and the plan AWS needs to review." },
  { t: "Apply together", d: "We submit and manage the application with AWS." },
  { t: "Deliver and claim", d: "We deliver the project and claim the funding on your behalf." },
];

const badges = ["AWS Migration Competency", "AWS Security Competency", "AWS Resilience Competency", "AWS Generative AI Competency", "AWS Data & Analytics Competency", "AWS DevOps Competency", "AWS Cloud Operations Competency", "AWS Level 1 MSSP"];

const outcomes = [
  { icon: "layers" as IconName, k: "Modernization", v: "95%+", d: "of services now serverless or managed", c: "MediBuddy", href: "/resources/case-studies/medibuddy" },
  { icon: "coin" as IconName, k: "Cost optimization", v: "40%", d: "lower cloud costs over a year", c: "boAt", href: "/resources/case-studies/boats-strategic-alliance-with-comprinno-for-robust-infrastructure-management" },
  { icon: "migrate" as IconName, k: "Migration", v: "Near real-time", d: "MongoDB sync after moving from Azure Cosmos DB to AWS", c: "PocoCare", href: "/resources/case-studies/pococare-cloud-migration-migrating-from-azure-cosmos-db-to-aws-with-near-real-time-mongodb-synchronization" },
];

// Same card data as the home page "Outcomes": title, client, track and picture come from the case study itself
const proof = outcomes.flatMap((o) => {
  const slug = o.href.split("/").pop()!;
  const c = caseStudy(slug);
  return c ? [{ metric: o.v, what: o.d, title: c.title, client: c.client, track: `${c.industry} · ${c.service}`, href: o.href, icon: serviceIcon[c.service] ?? o.icon, art: { slug, title: c.title, about: c.service, industry: c.industry } }] : [];
});

// Adapted from the customers' Tevico testimonials, reworded to speak about Comprinno.
// TODO(marketing): get each customer to approve the reworded quote before the campaign goes live.
const testimonials = [
  { area: "CloudOps", result: "SOC 2 compliance", quote: "Making cloud infrastructure compliant with global standards like SOC 2 can be complex and resource-intensive. Comprinno made it simple for us, and quickly.", name: "Swapnil Baokar", role: "Cloud Compliance Leader", company: "Mantle Labs" },
  { area: "FinOps", result: "~40% cost reduction", quote: "Comprinno simplified our AWS FinOps to a great extent. With constant compliance requirements, we needed a trusted cloud partner, and we found one.", name: "Reynolds Samuel", role: "Cloud Governance Leader", company: "boAt" },
  { area: "Security + Governance", result: "360° risk and health view, 24x7", quote: "We get sharp, actionable insights on our AWS costs and security. With Comprinno, staying on top of our AWS cloud health has never been easier.", name: "Ashok Ranadive", role: "CEO and Co-founder", company: "Carbon Minus" },
];

const products = [
  { n: "Tevico", d: "Cloud governance, cost and security visibility", href: "/platform" },
  { n: "VoxSphere", d: "Real-time voice AI agents on Amazon Bedrock AgentCore", href: "/products/voxsphere" },
  { n: "VeriQ", d: "Due-diligence questionnaires answered with citations", href: "/products/veriq" },
  { n: "Weave", d: "Multi-agent business workflows · early access", href: "/products/weave" },
];

// TODO(owner): confirm these answers before the campaign goes live.
const faqs = [
  { q: "What does Premier Tier mean?", a: "Premier Tier is the highest level of the AWS Partner Network for services partners. It reflects AWS-validated delivery experience, certified people and customer success on AWS." },
  { q: "Will our AWS accounts stay ours?", a: "Yes. You own your AWS accounts, data and billing. We work through access you grant and can remove at any time." },
  { q: "Which AWS programs can we use?", a: "It depends on your workload, project type and spend. Common options include the Migration Acceleration Program (MAP) and proof-of-concept funding. We check eligibility on the first call." },
  { q: "Where do you work?", a: "Our teams are in Pune and Bengaluru, and we work with customers in India, the US and the UK." },
];

export default function AwsCampaign() {
  return (
    <div className="brand bg-white text-ink">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <W className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3" aria-label="Comprinno home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/comprinno-logo.webp" alt="Comprinno" width={600} height={125} className="h-7 w-auto mix-blend-multiply" />
            <span className="hidden border-l border-line pl-3 font-mono text-[.6rem] uppercase tracking-[.12em] text-[#006bc9] sm:inline">AWS Premier Tier Services Partner</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href={tel} className="hidden text-sm text-ink-2 hover:text-[#006bc9] md:inline">{site.phone}</a>
            <a href="#book" className="btn btn-primary !px-4 !py-2 text-sm">Book a consultation</a>
          </div>
        </W>
      </header>

      {/* HERO: home-page grid with glowing corners */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <W className="grid items-center gap-10 py-14 lg:grid-cols-[1.25fr_1fr] lg:py-20">
          <div>
            <Tag>AWS Premier Tier Services Partner</Tag>
            <h1 className="mt-5 [text-wrap:wrap] text-[clamp(2.1rem,4.4vw,3.2rem)] font-normal leading-[1.08] tracking-tight">
              Build on AWS with a<Br /> <strong className="sweep font-bold">Premier Tier</strong> <strong className="font-bold">partner.</strong>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">We migrate, modernize and manage AWS, and build AI agents for production.</p>
            <ul className="mt-6 grid gap-2.5 text-sm text-ink-2">
              {["Book a call with a solutions architect in two quick steps", "A scoped plan and AWS funding options on a 30-minute call", "A pilot built to go to production"].map((t) => (
                <li key={t} className="flex gap-2"><span aria-hidden="true" className="font-semibold text-[#006bc9]">✓</span>{t}</li>
              ))}
            </ul>
          </div>
          <HubSpotForm formId="b9532498-3580-473e-82a5-e33c6be43433" />
        </W>
      </section>

      {/* TRUSTED BY: home-page client logo marquee */}
      <LogoMarquee />

      {/* STATS: home-page numbers band */}
      <section className="brand-dark py-12 sm:py-14">
        <W>
          <dl className="stats">
            {stats.map((st) => {
              const m = st.v.match(/^([\d,]+)(.*)$/);
              return (
                <div key={st.l} className="stat">
                  <dt className="stat-label">{st.l}</dt>
                  <dd className="stat-num">{m ? m[1] : st.v}<span className="stat-suffix">{m?.[2]}</span></dd>
                </div>
              );
            })}
          </dl>
        </W>
      </section>

      {/* WHAT PREMIER MEANS: home-page cards */}
      <section className="bg-surface py-16 sm:py-20">
        <W>
          <div className="text-center">
            <Tag>What Premier means for you</Tag>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal leading-tight">From pilot to production, <strong>with AWS behind every step.</strong></h2>
            <p className="mt-3 text-muted">Three things change for your project the day you work with a Premier partner.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {premier.map((p) => (
              <div key={p.k} className="card">
                <IconTile name={p.icon} />
                <p className="mt-4 font-mono text-[.65rem] uppercase tracking-[.12em] text-muted">{p.k}</p>
                <h3 className="mt-1 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* FUNDING CHECK */}
      <section id="funding" className="py-16 sm:py-20">
        <W>
          <Tag>Funding check</Tag>
          <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal leading-tight">Could AWS help <strong>pay for your project?</strong></h2>
          <p className="mt-2 mb-8 text-muted">Answer three questions. Takes under a minute.</p>
          <FundingCheck />

          <div className="mt-16">
            <h3 className="text-2xl font-normal">How AWS funding works <strong className="font-semibold text-[#006bc9]">with us</strong></h3>
            <p className="mt-2 text-muted">You focus on the project. We handle the paperwork with AWS.</p>
          </div>
          {/* home-page "How we work" steps, without the repeat loop */}
          <div className="mt-10"><FlowLoop items={fundingSteps.map((x) => ({ title: x.t, desc: x.d }))} icons={["search", "chart", "mail", "check"]} repeat={false} /></div>
        </W>
      </section>

      {/* CREDENTIALS: home-page badge cards */}
      <section className="bg-surface py-16 sm:py-20">
        <W>
          <div className="text-center">
            <Tag>Verified by AWS</Tag>
            {/* TODO(owner): the AWS page lists 7 competencies plus Level 1 MSSP as a program; confirm the count and names. */}
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal leading-tight">8 AWS Competencies. <strong>MSP and Well-Architected partner.</strong></h2>
          </div>
          <div className="mt-10"><Credentials items={badges} /></div>
          <p className="mt-8 text-center">
            <a href="https://partners.amazonaws.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#006bc9] underline underline-offset-4">Verify on the AWS Partner Network ↗</a>
          </p>
        </W>
      </section>

      {/* OUTCOMES: home-page cards */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <W>
          <div className="text-center">
            <Tag>Customer outcomes</Tag>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal">Results, <strong>not promises.</strong></h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {proof.map((p) => (
              <Link key={p.href} href={p.href} className="card flex flex-col">
                <div className="flex items-center justify-between">
                  <IconTile name={p.icon} />
                  <span className="tag">{p.track}</span>
                </div>
                <ArtTile art={p.art} className="mt-5" />
                <p className="mt-5 font-semibold leading-snug text-ink">{p.title}</p>
                <p className="mb-5 mt-1 text-sm text-muted">{p.client}</p>
                <div className="outcome-result">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Key result</p>
                  <p className="outcome-num mt-2">{p.metric}</p>
                  <p className="mt-1.5 min-h-[2.75em] text-sm leading-snug text-ink-2">{p.what}</p>
                </div>
                <p className="mt-5 text-sm font-medium text-ink">Read the story <span className="go">→</span></p>
              </Link>
            ))}
          </div>
        </W>
      </section>

      {/* TESTIMONIALS: customer quotes adapted from their Tevico testimonials */}
      <section className="relative overflow-hidden border-y border-line bg-surface py-16 sm:py-20">
        <RainField />
        <W className="relative">
          <div className="text-center">
            <Tag>What customers say</Tag>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal">In their <strong>own words.</strong></h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.company} className="card flex flex-col">
                <p className="font-mono text-[.65rem] uppercase tracking-[.12em] text-[#006bc9]">{t.area}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{t.result}</p>
                <span aria-hidden="true" className="mt-4 font-serif text-5xl leading-none text-[#9cc6ee]">“</span>
                <blockquote className="mt-2 flex-1 text-ink-2">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                  <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center bg-[#e8f2fc] text-sm font-semibold text-[#006bc9]">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted">{t.role}, {t.company}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </W>
      </section>

      {/* PRODUCTS: home-page product cards on the particle wave */}
      <section className="relative overflow-hidden bg-surface py-16 sm:py-20">
        <ParticleWave />
        <W className="relative">
          <div className="text-center">
            <Tag>Why we start faster</Tag>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal">We bring our own products, <strong>built on AWS.</strong></h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link key={p.n} href={p.href} className="card group flex flex-col !p-0 overflow-hidden">
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-line"><ProductDiagram product={p.n} /></div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-semibold">{p.n}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
                  <span className="mt-auto pt-6 text-sm font-medium text-ink underline underline-offset-4">Explore {p.n} <span className="go">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </W>
      </section>

      {/* FAQ: home-page FAQ */}
      <section className="py-16 sm:py-20">
        <W className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <Tag>FAQ</Tag>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal">Before you <strong>book</strong></h2>
            <p className="mt-2 text-muted">Quick answers to what teams ask first.</p>
          </div>
          <Faq items={faqs} />
        </W>
      </section>

      {/* FINAL CTA: home-page closing band */}
      <CtaBand
        eyebrow="Let's talk"
        title={<>Bring us the project. <strong>We’ll bring AWS.</strong></>}
        steps={["A solutions architect reviews your brief within 1 business day.", "You get a 30-minute call with a scoped plan and funding options.", "We start a pilot built to go to production."]}
        label="Book my consultation"
        href="#book"
      />

      {/* FOOTER: site footer look with the launch art */}
      <footer className="relative overflow-hidden bg-[#050a2e] text-white">
        <W className="relative z-10 flex flex-col gap-6 pt-14 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" aria-label="Comprinno home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src="/brand/comprinno-logo-white.webp" alt="Comprinno" width={600} height={125} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
            <p className="mt-3 font-mono text-[.65rem] uppercase tracking-[.1em] text-white/60">ISO 27001 · SOC 2 Type II</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-white/80">
            <a href={tel} className="hover:text-[#ffbb00]">{site.phone}</a>
            <Link href="/" className="hover:text-[#ffbb00]">comprinno.net</Link>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbb00]">LinkedIn</a>
          </div>
        </W>
        <div className="pointer-events-none relative z-0 -mt-2 aspect-[4/1] w-full sm:-mt-8 lg:-mt-20" aria-hidden="true">
          <FooterArt />
        </div>
        <div className="relative z-10 border-t border-white/10 bg-[#050a2e]">
          <W className="flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/60">
            <p>© 2026 Comprinno Technologies. All rights reserved.</p>
            <Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link>
          </W>
        </div>
      </footer>
    </div>
  );
}
