import type { Metadata } from "next";
import Link from "next/link";
import { Mrs_Saint_Delafield } from "next/font/google";
import Image from "next/image";
import { Button, Eyebrow } from "@/components/ui";
import ArtTile from "@/components/ArtTile";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import RainField from "@/components/RainField";
import ParticleWave from "@/components/ParticleWave";
import FooterArt from "@/components/FooterArt";
import { site } from "@/lib/site";
import HubSpotMeetings from "./HubSpotMeetings";
import { Logo } from "@/components/Header";
import type { ReactNode } from "react";

/**
 * Seller page for Pratham Mehta (BDR · startups on GCP/Azure). LOW FIDELITY:
 * greyscale wireframe for layout and copy review. Bracketed items are placeholders.
 */
export const metadata: Metadata = {
  title: "Meet Pratham Mehta",
  description: "Move to AWS at no migration cost, with up to $200K in AWS credits. Book a 30-minute call with Pratham.",
  robots: { index: false, follow: false },
};

const EMAIL = "pratham.mehta@comprinno.net";
// wa.me opens the WhatsApp app on phones and offers WhatsApp Desktop / Web on computers.
const WHATSAPP = `https://wa.me/917016498352?text=${encodeURIComponent("Hi Pratham, I found your page on comprinno.net and would like to talk about moving to AWS and the credits we could qualify for.")}`;

const W = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);
const Label = ({ children }: { children: ReactNode }) => <span className="tag inline-block">{children}</span>;
const Mono = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`font-mono text-[.62rem] uppercase tracking-[.12em] text-neutral-500 ${className}`}>{children}</p>
);
const H2 = ({ light, bold, center }: { light: string; bold: string; center?: boolean }) => (
  <h2 className={`reveal mt-4 text-3xl tracking-tight !text-neutral-900 sm:text-4xl ${center ? "text-center" : ""}`}>
    <span className="font-light">{light} </span><strong className="font-semibold">{bold}</strong>
  </h2>
);
const Initials = ({ i, className = "" }: { i: string; className?: string }) => (
  <span className={`icon-tile shrink-0 text-xs font-semibold ${className}`}>{i}</span>
);
const PHOTO = "/connect/pratham-mehta.webp";
const Avatar = ({ i, className = "h-10 w-10" }: { i: string; className?: string }) =>
  i === "PM" ? (
    <Image src={PHOTO} alt="Pratham Mehta" width={96} height={96} className={`shrink-0 !rounded-full border border-neutral-200 object-cover ${className}`} />
  ) : (
    <Initials i={i} className={className} />
  );
const Primary = ({ children, href = "#calendar" }: { children: string; href?: string }) => <Button href={href}>{`${children} →`}</Button>;
const Secondary = ({ children, href = WHATSAPP, className = "" }: { children: string; href?: string; className?: string }) => <Button href={href} variant="ghost" newTab className={className}>{children}</Button>;
// Handwritten signature: the one place this page leaves the site font.
const sigFont = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"], display: "swap" });
const Signature = ({ className = "" }: { className?: string }) => (
  <p className={`sig-draw ${sigFont.className} py-2 text-5xl leading-tight text-neutral-800 ${className}`}>Pratham</p>
);

const stats = [
  { v: "$0", k: "migration cost to you" },
  { v: "$200K", k: "up to, in AWS credits" },
  { v: "$5M+", k: "credits influenced for customers in 2026" },
];
// Real startups from comprinno.net case studies that moved to AWS from another cloud.
const CS = "/resources/case-studies/";
const startups: [string, IconName, string, string, string][] = [
  ["PocoCare", "heart", "HealthTech", "Azure", "pococare-cloud-migration-migrating-from-azure-cosmos-db-to-aws-with-near-real-time-mongodb-synchronization"],
  ["Liquidmind", "bank", "FinTech", "Azure", "liquidmind-aws-migration-aws-migration-for-liquidmind-a-multi-product-cloud-infrastructure-on-aws"],
  ["Matih Labs", "database", "AI data platform", "Azure", "ai-powered-data-insights-platform-aws-migration-modernizing-cloud-infrastructure-to-reliably-scale-matih-labs-unified-ai-data-platform"],
  ["Roxonn", "cube", "Blockchain", "Azure + GCP", "blockchain-aws-migration-consolidating-azure-and-gcp-workloads-into-a-governed-ai-ready-aws-environment-for-roxonn"],
  ["Quantian", "code", "IT services", "Multi-cloud", "quantian-technologies-aws-cloud-modernization-enhancing-deployment-efficiency-and-cloud-security-for-quantian"],
  ["Skill-Lync", "users", "EdTech", "DigitalOcean", "skill-lync-migrates-to-aws-from-digital-ocean"],
];
const steps = [
  { mark: "Unlock", t: "Unlock credits with AWS Activate", d: "Up to $200K in AWS Activate credits for eligible startups. We check what you qualify for and apply with you. In 2026 alone we influenced $5M+ in credits for customers." },
  { mark: "Migrate", t: "Migrate with AWS SMP", d: "Compute and AI workloads move from GCP or Azure through the AWS Startup Migrate Program (SMP), at no cost to you." },
  { mark: "Join", t: "Join the AWS ecosystem", d: "Access AWS startup programmes, technical experts and go-to-market opportunities." },
  { mark: "Scale", t: "Build and scale on AWS", d: "Land well, then keep building: we're with you after the move, not just for it." },
];
// LinkedIn mark, same path as the site footer
const LINKEDIN = "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z";

const help: { icon: IconName; t: string; d: string }[] = [
  { icon: "coin", t: "AWS Activate credits", d: "Up to $200K in credits for eligible startups. We find what you qualify for and apply with you." },
  { icon: "migrate", t: "AWS Startup Migrate Program", d: "We move your workloads from GCP, Azure, on-premises or co-location through SMP, at no cost to you." },
  { icon: "spark", t: "AI workloads too", d: "Move models, pipelines and AI features along with your app. Plus GenAI POCs and a path to production at no cost to you." },
  { icon: "users", t: "AWS startup ecosystem", d: "Introductions to AWS startup programmes, architects and growth opportunities." },
  { icon: "shield", t: "A foundation that scales", d: "A secure, well-architected AWS setup from day one, so you never have to redo it." },
  { icon: "chart", t: "Support as you grow", d: "Managed operations and cost reviews when you need them, from the same team." },
];
const programmes: { icon: IconName; tag: string; t: string; d: string }[] = [
  { icon: "coin", tag: "Every startup", t: "AWS Activate", d: "Up to $200K in AWS credits for eligible startups. We check what you qualify for and apply with you." },
  { icon: "migrate", tag: "Every startup", t: "AWS Startup Migrate Program (SMP)", d: "Migration at no cost to you: we move external workloads, from other clouds, on-premises or co-location, to AWS." },
  { icon: "rocket", tag: "Spending $100K+ on GCP or Azure", t: "MAP 2.0 & MAP Lite", d: "The AWS Migration Acceleration Program funds larger moves: assessment, migration and modernization, for startups with significant spend on another cloud." },
  { icon: "spark", tag: "No cost to you", t: "GenAI POC & path to production", d: "Prove your GenAI use case with a proof of concept, then a clear path to production on AWS, at no cost to you." },
];
const partners = [
  { t: "AWS", d: "Premier Tier Partner. Credits, migration programmes and the startup ecosystem." },
  { t: "OpenAI", d: "Select Partner. GPT models for products that need them." },
  { t: "Anthropic", d: "Claude models, directly or through Amazon Bedrock." },
  { t: "ElevenLabs", d: "Voice AI for agents, support and content." },
  { t: "MongoDB", d: "Atlas on AWS, including vector search for AI apps." },
];
const badges = ["AWS Premier Tier Partner", "AWS Migration Competency", "AWS MSP · Level 1 MSSP", "OpenAI Select Partner", "ISO 27001 · SOC 2 Type II"];
const faq = [
  { q: "Is the migration really free?", a: "For most startups, yes. Through the AWS Startup Migrate Program, the migration costs you nothing. I'll confirm your eligibility on our first call." },
  { q: "How much in credits could we get?", a: "Up to $200K through AWS Activate, depending on your stage and funding. I'll check exactly what you qualify for and apply with you." },
  { q: "We're a small team. Won't this distract us?", a: "That's exactly why we do the heavy lifting. Your engineers stay on the product while we run the migration." },
  { q: "What happens after we move?", a: "You're plugged into the AWS startup ecosystem, and I stay with you as you grow." },
];
const reads: { icon: IconName; about: string; k: string; t: string; c: string }[] = [
  { icon: "coin", about: "Cloud", k: "Guide", t: "AWS credits for startups: what you can qualify for and how to apply", c: "Read the guide" },
  { icon: "check", about: "Migrate", k: "Checklist", t: "Moving from GCP or Azure to AWS: a one-page checklist for small teams", c: "Get the checklist" },
  { icon: "database", about: "Migrate", k: "Case study", t: "PocoCare moves from Azure Cosmos DB to AWS", c: "Read the story" },
];
const field = "mt-1 w-full border border-neutral-300 bg-white px-3 py-2 text-sm";

export default function PrathamMehtaPage() {
  return (
    <div className="seller-page brand bg-white text-neutral-900">
      {/* page bar */}
      <div className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
        <W className="flex items-center justify-between py-3">
          {/* same logo + section tag as the SDR campaign page bar */}
          <span className="flex min-w-0 items-center gap-3">
            <Logo />
            <span className="hidden whitespace-nowrap border-l border-line pl-3 font-mono text-[.62rem] uppercase tracking-[.14em] text-[#006bc9] sm:inline">AWS Startups</span>
          </span>
          <Button href="#calendar" className="shrink-0">Check my credits</Button>
        </W>
      </div>

      {/* hero */}
      <section className="relative isolate overflow-hidden border-b border-neutral-200 py-12 sm:py-16">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <W className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Image src={PHOTO} alt="Pratham Mehta" width={512} height={640} priority className="aspect-[4/5] w-full !rounded-2xl border border-neutral-200 object-cover" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 !rounded-full bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 shadow-[0_6px_18px_-6px_rgb(10_19_75/0.45)]"><span className="relative flex h-2 w-2"><span className="absolute inset-0 !rounded-full bg-[var(--brand-blue)] opacity-60 motion-safe:animate-ping" /><span className="relative h-2 w-2 !rounded-full bg-[var(--brand-blue)]" /></span>Replies within a day</span>
            </div>
            {/* video not recorded yet: inactive placeholder. When it exists, make this a link/player again. */}
            <div aria-disabled="true" className="flex cursor-default items-center justify-between border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-500">
              <span className="flex items-center gap-2.5"><span className="grid h-9 w-9 shrink-0 place-items-center !rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] ring-1 ring-[var(--color-accent-line)]"><svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true"><path d="M8 5.2v13.6a.8.8 0 0 0 1.2.7l10.6-6.8a.8.8 0 0 0 0-1.4L9.2 4.5A.8.8 0 0 0 8 5.2Z" fill="currentColor" /></svg></span>Watch my 60‑second hello</span><span className="shrink-0 whitespace-nowrap border border-neutral-300 px-1.5 py-0.5 font-mono text-[.62rem] uppercase tracking-wider text-neutral-500">Coming soon</span>
            </div>
          </div>

          <div>
            <Eyebrow>For early-stage startups on GCP or Azure</Eyebrow>
            <h1 className="mt-4 text-4xl tracking-tight !text-neutral-900 sm:text-5xl"><span className="font-light">Meet </span><strong className="font-semibold">Pratham Mehta.</strong></h1>
            <p className="mt-2 text-sm text-neutral-500">Business Development Representative · Startups, India</p>
            <p className="mt-4 max-w-2xl text-xl font-semibold leading-snug">Helping early-stage startups move to AWS at no migration cost, with up to $200K in AWS credits and the AWS startup ecosystem behind them.</p>

            <figure className="mt-6 max-w-2xl border border-neutral-300 bg-white p-5 pb-3">
              <Mono>A note from Pratham, to you</Mono>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">Hi, I&apos;m Pratham. If you&apos;re running on Google Cloud or Azure today, I&apos;d love to show you how you can move to AWS without paying for the migration, with up to $200K in credits to build on. No pressure and no jargon: just a 30-minute call to see what you qualify for.</p>
              <figcaption className="mt-1">
                <Signature className="-mb-2" />
              </figcaption>
            </figure>

            <div className="mt-6 flex flex-wrap gap-3"><Primary>Check my AWS credits</Primary><Secondary className="!bg-white hover:!bg-[#1c1c1c]">Connect on WhatsApp</Secondary></div>

            <dl className="stats stats-compact mt-8 max-w-2xl bg-white lg:!grid-cols-3">
              {stats.map((s) => (
                <div key={s.v} className="stat">
                  <dt className="stat-label">{s.k}</dt>
                  <dd className="stat-num">{s.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex max-w-2xl flex-wrap items-center gap-x-2 gap-y-2 bg-white py-2 text-[.8rem] lg:flex-nowrap lg:justify-between">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:underline"><Icon name="mail" className="h-4 w-4" />{EMAIL}</a>
              <a href="https://www.linkedin.com/in/prathammehta773" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d={LINKEDIN} fill="currentColor" fillRule="evenodd" /></svg>in/prathammehta773</a>
              <span className="whitespace-nowrap text-[.62rem] [&_.tag]:!px-2 [&_.tag]:!text-[.6rem] [&_.tag]:!tracking-normal"><Label>AWS Premier Tier Partner · Migration Competency</Label></span>
            </div>
          </div>
        </W>
      </section>

      {/* proof */}
      <section className="relative isolate overflow-hidden border-y border-neutral-200 bg-neutral-50 py-14">
        <div className="absolute inset-0 -z-10" aria-hidden="true"><ParticleWave themed /></div>
        <W className="relative">
          <div className="text-center"><Eyebrow>Proof, not promises</Eyebrow></div>
          <H2 center light="Startups that moved" bold="to AWS with us." />
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-neutral-600">From Azure, Google Cloud and DigitalOcean to AWS. Each one is a published Comprinno case study.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {startups.map(([n, icon, ind, from, slug]) => (
              <Link key={n} href={CS + slug} className="scope-tile reveal group">
                <Icon name={icon} className="scope-tile-art" />
                <span className="relative z-10 mb-1 font-mono text-[.68rem] uppercase tracking-[.1em] text-neutral-500">{from} → AWS · {ind}</span>
                <span className="scope-tile-title">{n}</span>
              </Link>
            ))}
          </div>
        </W>
      </section>

      {/* path */}
      <section className="py-14">
        <W>
          <div className="text-center">
            <Eyebrow>Your path to AWS</Eyebrow>
            <h2 className="mt-4 text-3xl tracking-tight !text-neutral-900 sm:text-4xl"><span className="font-light">Easier, more affordable, and more rewarding:</span><br /><strong className="font-semibold">four steps to AWS.</strong></h2>
            <p className="mt-3 text-sm text-neutral-600">Credits first. Then we handle the move, plug you into the ecosystem, and help you grow.</p>
          </div>
          {/* same component styles as the home page's "The path" (motion.css): relay bar, sheen, watermark, hover */}
          <ol className="path-row mt-8">
            {steps.map((s) => (
              <li key={s.t}>
                <div className="path-card group">
                  <span className="path-mark" aria-hidden="true">{s.mark}</span>
                  <h3 className="text-xl font-semibold !text-neutral-900">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </W>
      </section>

      {/* how I can help */}
      <section className="relative isolate overflow-hidden border-y border-neutral-200 bg-neutral-50 py-14">
        <RainField />
        <W className="relative">
          <div className="text-center"><Eyebrow>How I can help you</Eyebrow></div>
          <H2 center light="Moving to AWS," bold="without the cost or the hassle." />
          <p className="mx-auto mt-3 max-w-sm text-center text-sm text-neutral-600">Built for founders and small engineering teams who need to stay focused on the product.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {help.map((h) => (
              <div key={h.t} className="card group p-5">
                <IconTile name={h.icon} />
                <h3 className="mt-4 font-semibold !text-neutral-900">{h.t}</h3>
                <p className="mt-2 text-sm text-neutral-600">{h.d}</p>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* programmes */}
      <section className="py-14">
        <W>
          <div className="text-center"><Eyebrow>The AWS programmes I&apos;ll put to work for you</Eyebrow></div>
          <H2 center light="I know the programmes," bold="and how to get you qualified." />
          {/* same card as the home page's "Built for you" (.seg-card in motion.css) */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((p) => (
              <li key={p.t} className="reveal">
                <div className="seg-card group">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flow-node shrink-0" aria-hidden="true"><Icon name={p.icon} className="h-6 w-6" /></span>
                    <Label>{p.tag}</Label>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug !text-neutral-900">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </W>
      </section>

      {/* partners */}
      <section className="pb-14">
        <W>
          <div className="text-center"><Eyebrow>Beyond AWS, I can bring in</Eyebrow></div>
          <H2 center light="Moving to AWS? Add the AI tools" bold="you will build with next." />
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((p) => (
              <div key={p.t} className="card p-4">
                <h3 className="font-semibold !text-neutral-900">{p.t}</h3>
                <p className="mt-1 text-xs text-neutral-600">{p.d}</p>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* who you'll talk to + backed by */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-14">
        <W className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col border border-neutral-200 bg-white p-6">
            <div className="self-start"><Eyebrow>Who you&apos;ll be talking to</Eyebrow></div>
            <h2 className="mt-4 text-2xl font-light tracking-tight !text-neutral-900">I&apos;m your first point of contact, from the first call to the move.</h2>
            {[
              { i: "PM", n: "Pratham Mehta", r: "Business Development Representative", d: "Checks your credits and eligibility, scopes the move, and books the right experts." },
            ].map((p) => (
              <div key={p.n} className="card mt-6 flex gap-4">
                <Avatar i={p.i} />
                <div>
                  <h3 className="font-semibold !text-neutral-900">{p.n}</h3>
                  <p className="text-sm font-medium text-ink-2">{p.r}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
                </div>
              </div>
            ))}
            <div className="mt-5">
              <Mono>Reach me directly · replies within a day</Mono>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  { icon: "mail" as IconName, t: "Email", d: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: "users" as IconName, t: "LinkedIn", d: "in/prathammehta773", href: "https://www.linkedin.com/in/prathammehta773", ext: true },
                  { icon: "phone" as IconName, t: "WhatsApp", d: "+91 70164 98352", href: WHATSAPP, ext: true },
                  { icon: "clock" as IconName, t: "Book a call", d: "Pick a time in my calendar", href: "#calendar" },
                ].map((c) => (
                  <a key={c.t} href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="card group flex min-w-0 items-center gap-3 !p-3 lg:flex-col lg:items-start lg:gap-2">
                    <IconTile name={c.icon} />
                    <span className="min-w-0"><span className="block text-sm font-semibold">{c.t}</span><span className="block break-all text-xs text-neutral-500 lg:break-normal">{c.d}</span></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border border-neutral-200 bg-white p-6">
            <Mono>Backed by Comprinno</Mono>
            <dl className="stats mt-4">
              {[["$5M", "+", "AWS credits influenced · 2026"], ["200", "+", "Businesses migrated"], ["300", "+", "Workloads moved"], ["98", "%", "CSAT"]].map(([v, x, k]) => (
                <div key={k} className="stat !px-3">
                  <dt className="stat-label">{k}</dt>
                  <dd className="stat-num !text-4xl">{v}<span className="stat-suffix">{x}</span></dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-300 pt-5">{badges.map((b) => <Label key={b}>{b}</Label>)}</div>
            <Mono className="mt-5">Startups that moved with us</Mono>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <a href="#case" className="card p-4"><p className="text-xl font-semibold">GCP / Azure → AWS</p><p className="mt-1 text-sm text-neutral-600">Skill-Lync and Liquidmind moved their production workloads with us →</p></a>
              <a href="#case" className="card p-4"><p className="text-xl font-semibold">Near real-time</p><p className="mt-1 text-sm text-neutral-600">PocoCare: Azure Cosmos DB to AWS with live MongoDB sync →</p></a>
            </div>
          </div>
        </W>
      </section>

      {/* FAQ chat */}
      {/* FAQ: same design as "Questions before you apply?" on the SDR page */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <W className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Questions you might ask me</Eyebrow>
            <h2 className="mt-4 text-3xl font-normal leading-tight !text-neutral-900 [&_strong]:font-semibold">You ask. <strong>I&apos;ll answer straight.</strong></h2>          </div>
          <div className="divide-y divide-neutral-200 border border-neutral-300 bg-white">
            {faq.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}<span className="text-neutral-500 group-open:hidden">+</span><span className="hidden text-neutral-500 group-open:inline">−</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </W>
      </section>

      {/* calendar */}
      <section id="calendar" className="scroll-mt-24 border-t border-neutral-200 py-14">
        <W>
          <div className="text-center"><Eyebrow>My calendar</Eyebrow></div>
          <H2 center light="Let's talk." bold="Pick a time that suits you." />
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            {/* desktop: crop HubSpot frame padding (16px top, 4px sides) so the widget box lines up with the right column */}
            <div className="overflow-hidden lg:h-[670px] lg:[&_iframe]:-mt-4 lg:[&_iframe]:-ml-1 lg:[&_iframe]:!w-[calc(100%+8px)] lg:[&_iframe]:!max-w-none">
              <HubSpotMeetings url="https://meetings-na2.hubspot.com/pratham-mehta?uuid=3310c944-592b-4dde-a1a6-be051d76424a" />
            </div>

            <div className="space-y-3">
              <a id="whatsapp" href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-3 p-4">
                <IconTile name="phone" />
                <span><span className="block font-semibold">WhatsApp</span><span className="text-xs text-neutral-500">+91 70164 98352 · intro message ready to send</span></span>
              </a>
              <a href={`mailto:${EMAIL}`} className="card flex items-center gap-3 p-4">
                <IconTile name="mail" />
                <span><span className="block font-semibold">Email</span><span className="text-xs text-neutral-500">{EMAIL}</span></span>
              </a>
              <form className="flex-1 border border-neutral-300 bg-neutral-50 p-4">
                <Mono>Or drop me a note</Mono>
                {[["Name", "text"], ["Work email", "email"], ["Startup name", "text"]].map(([l, t]) => (
                  <label key={l} className="mt-3 block text-sm">{l}<input type={t} className={field} /></label>
                ))}
                <label className="mt-3 block text-sm">What do you run on GCP or Azure today?<textarea rows={3} className={field} /></label>
                <button type="button" className="btn btn-ghost mt-4 w-full">Send to Pratham</button>
                <p className="mt-2 text-xs text-neutral-500">We use your details only to reply to this enquiry. <Link href="/privacy-policy" className="underline">Privacy notice</Link></p>
              </form>
            </div>
          </div>
        </W>
      </section>

      {/* reading */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-14">
        <W>
          <h2 className="text-center text-3xl tracking-tight !text-neutral-900"><span className="font-light">Not ready to talk yet? </span><strong className="font-semibold">Here&apos;s what I&apos;d read first.</strong></h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {reads.map((r) => (
              <a key={r.t} href="#read" className="card flex flex-col">
                <div className="flex items-center justify-between"><IconTile name={r.icon} /><span className="tag">{r.k}</span></div>
                <ArtTile art={{ slug: r.t, title: r.k, about: r.about }} className="mt-5" />
                <p className="mt-5 font-semibold leading-snug text-ink">{r.t}</p>
                <p className="mt-auto pt-5 text-sm font-medium text-ink">{r.c} <span className="go">→</span></p>
              </a>
            ))}
          </div>
        </W>
      </section>

      {/* closing CTA */}
      <section className="relative isolate overflow-hidden py-16 text-center">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <W className="max-w-2xl">
          <Avatar i="PM" className="mx-auto h-16 w-16" />
          <h2 className="mt-5 text-3xl tracking-tight !text-neutral-900 sm:text-4xl"><span className="font-light">Your move to AWS </span><strong className="font-semibold">could cost you nothing.</strong></h2>
          <p className="mt-3 text-neutral-600">&ldquo;Thirty minutes is enough to find out what credits and support you qualify for.&rdquo;</p>
          <Signature className="mt-3" />
          <div className="mt-6 flex flex-wrap justify-center gap-3"><Primary>Check my AWS credits</Primary><Secondary className="!bg-white hover:!bg-[#1c1c1c]">Message on WhatsApp</Secondary></div>
        </W>
      </section>

      {/* disclaimer */}
      {/* footer: same as the SDR campaign page */}
      <footer className="relative overflow-hidden bg-[#050a2e] text-white">
        <W className="relative z-10 flex flex-col gap-6 pt-14 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" aria-label="Comprinno home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src="/brand/comprinno-logo-white.webp" alt="Comprinno" width={600} height={125} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
            <p className="mt-3 text-sm text-white/70">Pune · Bangalore · US · UK</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-white/80">
            <Link href="/" className="hover:text-[#ffbb00]">comprinno.net</Link>
            <a href="https://www.linkedin.com/in/prathammehta773" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbb00]">LinkedIn</a>
          </div>
        </W>
        {/* same launch-to-ascent visual as the site footer */}
        <div className="pointer-events-none relative z-0 -mt-2 aspect-[4/1] w-full sm:-mt-8 lg:-mt-20" aria-hidden="true">
          <FooterArt />
        </div>
        <div className="relative z-10 border-t border-white/10 bg-[#050a2e]">
          <W className="space-y-3 py-5 text-xs text-white/60">
            <div className="space-y-1">
              <p>Pratham Mehta is part of <Link href="/" className="underline hover:text-white">Comprinno Technologies</Link> · AWS Premier Tier Partner</p>
              <p>No-cost migration (SMP), no-cost GenAI POCs, up to $200K in AWS Activate credits and MAP funding apply to eligible startups, subject to AWS approval.</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
              <p>© 2026 Comprinno Technologies. All rights reserved.</p>
              <Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link>
            </div>
          </W>
        </div>
      </footer>
    </div>
  );
}
