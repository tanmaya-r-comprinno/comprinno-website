import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Br } from "@/components/ui";
import BookingCard from "./BookingCard";
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

const Tag = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <span className={`inline-flex items-center gap-2 border px-2 py-1 font-mono text-[.65rem] uppercase tracking-[.12em] ${dark ? "border-neutral-600 text-neutral-300" : "border-neutral-400 text-neutral-700"}`}>
    <i className={`h-1.5 w-1.5 ${dark ? "bg-neutral-300" : "bg-neutral-900"}`} />{children}
  </span>
);

const Placeholder = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`grid place-items-center border border-dashed border-neutral-400 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgb(0_0_0/0.04)_6px,rgb(0_0_0/0.04)_12px)] font-mono text-[.6rem] uppercase tracking-[.14em] text-neutral-500 ${className}`}>{label}</div>
);

const stats = [
  { v: "Premier", l: "AWS partner tier" },
  { v: "750+", l: "Clients" },
  { v: "1,000+", l: "Projects delivered" },
  { v: "150+", l: "AWS certifications" },
];

const premier = [
  { k: "01 · Pilot", t: "Pilot to production, faster", d: "Early access to AWS programs and service teams, so your agents ship on infrastructure built to carry them." },
  { k: "02 · Fund", t: "Funding that lowers your risk", d: "Premier partners can pass AWS investment programs on to customers. We’ll tell you what your project qualifies for." },
  { k: "03 · Run", t: "Delivery AWS has audited", d: "Architecture, security and governance held to AWS’s own bar, from day zero to the last mile." },
];

const fundingSteps = [
  { t: "Check eligibility", d: "We match your workload, project type and spend to AWS programs." },
  { t: "Build the case", d: "We prepare the business case and the plan AWS needs to review." },
  { t: "Apply together", d: "We submit and manage the application with AWS." },
  { t: "Deliver and claim", d: "We deliver the project and claim the funding on your behalf." },
];

const badges = ["Migration", "Security", "Resilience", "Generative AI", "Data and Analytics", "DevOps", "Cloud Operations", "Level 1 MSSP"];

const outcomes = [
  { k: "Modernization", v: "95%+", d: "of services now serverless or managed", c: "MediBuddy", href: "/resources/case-studies/medibuddy" },
  { k: "Cost optimization", v: "40%", d: "lower cloud costs over a year", c: "boAt", href: "/resources/case-studies/boats-strategic-alliance-with-comprinno-for-robust-infrastructure-management" },
  { k: "Migration", v: "Near real-time", d: "MongoDB sync after moving from Azure Cosmos DB to AWS", c: "PocoCare", href: "/resources/case-studies/pococare-cloud-migration-migrating-from-azure-cosmos-db-to-aws-with-near-real-time-mongodb-synchronization" },
];

// TODO(marketing): replace each placeholder with an approved quote (wording, name, role and written permission).
// Paired with the customers already shown in the outcomes above.
const testimonials = [{ company: "MediBuddy" }, { company: "boAt" }, { company: "PocoCare" }];

const products = [
  { n: "Tevico", d: "Cloud governance, cost and security visibility", href: "/products/tevico" },
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
    <div className="bg-white text-neutral-900">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <W className="flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">Comprinno</span>
            <span className="hidden border border-neutral-400 px-1.5 py-0.5 font-mono text-[.58rem] uppercase tracking-[.1em] text-neutral-600 sm:inline">AWS Premier Tier Services Partner</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={tel} className="hidden text-sm text-neutral-700 hover:text-neutral-900 md:inline">{site.phone}</a>
            <a href="#book" className="bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-700">Book a consultation</a>
          </div>
        </W>
      </header>

      {/* HERO */}
      <section className="border-b border-neutral-200 bg-[linear-gradient(rgb(0_0_0/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(0_0_0/0.04)_1px,transparent_1px)] bg-[size:48px_48px]">
        <W className="grid items-center gap-10 py-14 lg:grid-cols-[1.25fr_1fr] lg:py-20">
          <div>
            <Tag>AWS Premier Tier Services Partner</Tag>
            <h1 className="mt-5 [text-wrap:wrap] text-[clamp(2.1rem,4.4vw,3.2rem)] font-light leading-[1.08] tracking-tight">
              Build on AWS with a<Br /> <strong className="bg-neutral-200 px-1 font-bold">Premier Tier</strong> <strong className="font-bold">partner.</strong>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg">We migrate, modernize and manage AWS, and build AI agents for production.</p>
            <ul className="mt-6 grid gap-2.5 text-sm text-neutral-800">
              {["Book a call with a solutions architect in two quick steps", "A scoped plan and AWS funding options on a 30-minute call", "A pilot built to go to production"].map((t) => (
                <li key={t} className="flex gap-2"><span aria-hidden="true">✓</span>{t}</li>
              ))}
            </ul>
          </div>
          <BookingCard />
        </W>
      </section>

      {/* STATS + LOGOS */}
      <section className="bg-neutral-900 text-white">
        <W className="py-10">
          <dl className="grid grid-cols-2 gap-y-6 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="flex flex-col-reverse gap-1 border-l border-neutral-700 px-4 first:border-l-0 [&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l">
                <dt className="text-sm text-neutral-400">{s.l}</dt>
                <dd className="text-3xl font-semibold tracking-tight">{s.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="shrink-0 font-mono text-[.62rem] uppercase tracking-[.14em] text-neutral-400">Trusted by 750+ brands</p>
            <div className="grid flex-1 grid-cols-3 gap-2 sm:grid-cols-6">
              {Array.from({ length: 6 }, (_, i) => <div key={i} className="grid h-10 place-items-center border border-dashed border-neutral-600 font-mono text-[.58rem] uppercase tracking-[.14em] text-neutral-500">Logo</div>)}
            </div>
          </div>
        </W>
      </section>

      {/* WHAT PREMIER MEANS */}
      <section className="bg-neutral-50 py-16 sm:py-20">
        <W>
          <div className="text-center">
            <Tag>What Premier means for you</Tag>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-light leading-tight">From pilot to production, <strong className="font-bold">with AWS behind every step.</strong></h2>
            <p className="mt-3 text-neutral-600">Three things change for your project the day you work with a Premier partner.</p>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {premier.map((p) => (
              <div key={p.k} className="border border-neutral-200 border-t-2 border-t-neutral-900 bg-white p-6">
                <p className="font-mono text-[.65rem] uppercase tracking-[.12em] text-neutral-500">{p.k}</p>
                <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.d}</p>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* FUNDING CHECK */}
      <section id="funding" className="py-16 sm:py-20">
        <W>
          <Tag>Funding check</Tag>
          <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-light leading-tight">Could AWS help <strong className="font-bold">pay for your project?</strong></h2>
          <p className="mt-2 mb-8 text-neutral-600">Answer three questions. Takes under a minute.</p>
          <FundingCheck />

          <div className="mt-16 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <h3 className="text-2xl font-light">How AWS funding works <strong className="font-bold">with us</strong></h3>
            <p className="text-sm text-neutral-500">You focus on the project. We handle the paperwork with AWS.</p>
          </div>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {fundingSteps.map((s, i) => (
              <li key={s.t} className="border border-neutral-200 p-5">
                <p className="font-mono text-[.65rem] uppercase tracking-[.12em] text-neutral-500">Step {String(i + 1).padStart(2, "0")}</p>
                <h4 className="mt-2 font-semibold">{s.t}</h4>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </W>
      </section>

      {/* CREDENTIALS */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <W>
          <p className="font-mono text-[.65rem] uppercase tracking-[.14em] text-neutral-500">Verified by AWS</p>
          {/* TODO(owner): the AWS page lists 7 competencies plus Level 1 MSSP as a program; confirm the count and names. */}
          <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2.4rem)] font-light leading-tight">8 AWS Competencies. <strong className="font-bold">MSP and Well-Architected partner.</strong></h2>
          <a href="https://partners.amazonaws.com/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">Verify on the AWS Partner Network ↗</a>
          <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {badges.map((b) => (
              <li key={b} className="border border-neutral-200 bg-white p-3">
                <Placeholder label="Badge" className="aspect-[4/3]" />
                <p className="mt-3 font-mono text-[.58rem] uppercase tracking-[.12em] text-neutral-500">Competency</p>
                <p className="mt-0.5 text-sm font-semibold leading-snug">{b}</p>
              </li>
            ))}
          </ul>
        </W>
      </section>

      {/* OUTCOMES */}
      <section className="py-16 sm:py-20">
        <W>
          <div className="text-center">
            <Tag>Customer outcomes</Tag>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-light">Results, <strong className="font-bold">not promises.</strong></h2>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.c} className="flex flex-col border border-neutral-200 p-6">
                <p className="font-mono text-[.62rem] uppercase tracking-[.12em] text-neutral-500">{o.k}</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight">{o.v}</p>
                <p className="mt-2 text-neutral-700">{o.d}</p>
                <div className="mt-auto flex items-center justify-between border-t border-neutral-200 pt-4 text-sm">
                  <span className="font-semibold">{o.c}</span>
                  <Link href={o.href} className="font-semibold hover:underline">Read the story →</Link>
                </div>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* TESTIMONIALS: placeholders until approved customer quotes are supplied (never write these ourselves) */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <W>
          <div className="text-center">
            <Tag>What customers say</Tag>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-light">In their <strong className="font-bold">own words.</strong></h2>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.company} className="flex flex-col border border-neutral-200 bg-white p-6">
                <span aria-hidden="true" className="font-serif text-5xl leading-none text-neutral-300">“</span>
                <blockquote className="mt-2 flex-1 text-neutral-800">
                  Customer quote goes here: one or two sentences on what changed after working with Comprinno, in the customer&apos;s own words.
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-200 pt-4">
                  <Placeholder label="Photo" className="h-11 w-11 shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">Name</span>
                    <span className="block text-xs text-neutral-500">Role, {t.company}</span>
                  </span>
                  <span className="ml-auto shrink-0 border border-neutral-400 px-1.5 py-0.5 font-mono text-[.55rem] uppercase tracking-[.1em] text-neutral-500">Placeholder</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </W>
      </section>

      {/* PRODUCTS */}
      <section className="bg-neutral-900 py-14 text-white">
        <W>
          <p className="font-mono text-[.62rem] uppercase tracking-[.14em] text-neutral-400">Why we start faster</p>
          <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.1rem)] font-light !text-white">We bring our own products, <strong className="font-bold">built on AWS.</strong></h2>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link key={p.n} href={p.href} className="border border-neutral-700 p-4 transition hover:border-neutral-400">
                <span className="block font-semibold">{p.n} →</span>
                <span className="mt-1 block text-sm text-neutral-400">{p.d}</span>
              </Link>
            ))}
          </div>
        </W>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-16 sm:py-20">
        <W className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-light">Before you <strong className="font-bold">book</strong></h2>
            <p className="mt-2 text-neutral-600">Quick answers to what teams ask first.</p>
          </div>
          <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}<span className="font-mono text-neutral-500 transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </W>
      </section>

      {/* FINAL CTA */}
      <section className="bg-neutral-900 py-16 text-white sm:py-20">
        <W>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-light !text-white">Bring us the project. <strong className="font-bold">We’ll bring AWS.</strong></h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-3">
            {["A solutions architect reviews your brief within 1 business day.", "You get a 30-minute call with a scoped plan and funding options.", "We start a pilot built to go to production."].map((t, i) => (
              <li key={t} className="flex gap-3 border border-neutral-700 p-4 text-sm"><span className="font-mono text-neutral-400">{String(i + 1).padStart(2, "0")}</span>{t}</li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#book" className="bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-200">Book my consultation →</a>
            <a href={tel} className="text-sm underline underline-offset-4">or call {site.phone}</a>
          </div>
        </W>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200">
        <W className="flex flex-col gap-3 py-6 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-neutral-900">Comprinno</span>
            <span className="font-mono text-[.6rem] uppercase tracking-[.1em] text-neutral-500">ISO 27001 · SOC 2 Type II</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="underline underline-offset-2">comprinno.net</Link>
            <Link href="/privacy-policy" className="underline underline-offset-2">Privacy policy</Link>
            <span>© 2026 Comprinno Technologies</span>
          </div>
        </W>
      </footer>
    </div>
  );
}
