import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/lib/site";
import MockCall from "./MockCall";
import GridGlow from "@/components/GridGlow";
import FooterArt from "@/components/FooterArt";
import FlowLoop from "@/components/FlowLoop";
import RainField from "@/components/RainField";
import ParticleWave from "@/components/ParticleWave";
import LineWave from "@/components/LineWave";
import { IconTile } from "@/components/Icon";
import { Eyebrow } from "@/components/ui";
import { SDR_CAMPAIGN } from "@/content/careerCampaigns";
import { jobMetadata } from "@/lib/jobShareImage";

/**
 * SDR recruitment landing page (low fidelity): black and white, matches the campaign page style.
 * Not in the site menu. The mock call uses VoxSphere.
 */
export const metadata: Metadata = jobMetadata(
  SDR_CAMPAIGN,
  "We're hiring an SDR",
  "Sales Development Rep, Pune or Bangalore. Take a 5-minute mock call with our voice agent to apply.",
);

const W = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;

const Tag = ({ children }: { children: string }) => <span className="inline-flex justify-center"><Eyebrow>{children}</Eyebrow></span>;

const mono = "font-mono text-[.62rem] uppercase tracking-[.12em] text-neutral-500";
const CallBtn = ({ className = "" }: { className?: string }) => (
  <a href="#mock-call" className={`btn btn-primary ${className}`}>Take the 5-minute mock call <span className="go">→</span></a>
);

const facts = [
  { k: "Role", v: "Sales Development Rep" },
  { k: "Location", v: "Pune / Bangalore · In office" },
  { k: "Experience", v: "1–3 years in B2B sales" },
  { k: "Markets", v: "India · US" },
];

const habits = [
  { t: "Templates that all sound the same", d: "“Hi {FirstName}, I hope this email finds you well…” AI-written emails that read like everyone else's.", icon: "mail" as const },
  { t: "Volume as a strategy", d: "Blasting a list because the dashboard likes big numbers. Activity is not pipeline.", icon: "chart" as const },
  { t: "Two hours of research per account", d: "Copy-pasting LinkedIn into a spreadsheet when a workflow could do it before your coffee.", icon: "clock" as const },
];

const ai = [
  "Enrichment workflows that keep HubSpot clean and complete",
  "Account and persona research, done before you open the record",
  "Buying signals: funding rounds, hiring, cloud and AI initiatives",
  "List building, dedupe and prospect hygiene",
  "First drafts, so you start from 80%, not a blank page",
];
const you = [
  ["Judgment:", "which accounts, which people, and why now"],
  ["Messaging:", "the one line that makes a CTO reply"],
  ["Conversations:", "real calls that turn into real meetings"],
  ["Strategy:", "what to test next, and what to stop doing"],
  ["The number:", "pipeline you own, end to end"],
];

const motions = [
  { t: "Target accounts", d: "Startups and mid-market companies moving to the cloud, modernizing, or putting AI into production. You pick the accounts, map the buying team and open the door.", icon: "search" as const },
  { t: "Partners & referrals", d: "Warm paths through our cloud partners and a base of 750+ clients. You turn introductions into conversations, fast.", icon: "users" as const },
  { t: "Events", d: "Cloud summits, community meetups and our own roundtables. You fill the room before and book the meetings after.", icon: "building" as const },
];

const sell = [
  { slug: "migrate", v: "Migrate", t: "Move to the cloud", d: "Assess, plan, and tap the funding you qualify for." },
  { slug: "modernize", v: "Modernize", t: "Make it AI-ready", d: "Re-architect apps and data so AI has something solid to run on." },
  { slug: "manage", v: "Manage", t: "Run it reliably", d: "Managed operations and cost control, with coverage matched to your plan." },
  { slug: "maximize", v: "Maximize", t: "Compound with AI", d: "Build, govern and scale agents and analytics on the foundation." },
];

const stats = [
  { v: "750+", l: "Clients" },
  { v: "1,000+", l: "Projects delivered" },
  { v: "98%", l: "CSAT" },
];

const days = [
  { w: "Week 1", t: "Learn", d: "Our buyers, our offerings and our stories. Sit in on live sales calls and get comfortable talking cloud with a CTO." },
  { w: "Weeks 2–3", t: "Build", d: "Set up your research and enrichment workflows and launch your first sequences." },
  { w: "Week 4", t: "Own", d: "Take your own meetings target, run your system, and make it better every week." },
];

const fit = [
  "1–3 years in B2B outbound or inside sales, ideally SaaS or cloud services",
  "You've worked to a meetings or pipeline target, and you're ready to own one",
  "You've automated at least one part of your own work, and want to do much more",
  "You write clearly and can hold your own with a technical buyer",
  "If you're assigned to US accounts, you're comfortable with some overlap with US working hours",
];

const steps = [
  { k: "Step 1 · Mock call", t: "Five minutes with our voice agent, right on this page" },
  { k: "Step 2 · Apply with your call", t: "Straight from the call screen: your CV, plus three lines on something you've automated" },
  { k: "Step 3 · Conversation", t: "Talk through your call and an AI-built account plan with our sales leadership" },
  { k: "Step 4 · Offer", t: "Meet the team and get a decision, fast" },
];

const faqs = [
  { q: "What is the mock call?", a: "A five-minute discovery call with a fictional buyer, played by our own voice agent. You pick the buyer, read a short AI-prepared brief, and try to book the next meeting. It's the closest thing to the actual job we can put on a web page." },
  { q: "Can I apply without taking the call?", a: "No. The mock call is the first step of our process, and the application opens from the call screen once you finish. It takes about five minutes." },
  { q: "Can I take the call more than once?", a: "Yes. Try a different buyer, or the same one again. When you apply, tell us which call you'd like us to review." },
  { q: "Is the mock call recorded?", a: "Yes, with your permission. The call is recorded and transcribed so our sales team can review it alongside your application. It is used only for hiring decisions on this role, and is deleted when the hiring process closes." },
  { q: "How is my call evaluated?", a: "On five things: how you open and earn the right to continue, the questions you ask, how you handle the objection, whether you connect our value to the buyer's situation, and whether you land a clear next step. Nobody expects a perfect call; we're looking for how you think on your feet." },
  { q: "I have less than a year of experience. Can I apply?", a: "This role is for people with one to three years in B2B sales or outbound. If you're earlier in your career but take the call and do well, apply anyway and tell us why. A strong call speaks louder than a CV." },
  { q: "Do I need to know cloud or AI already?", a: "No. You need curiosity and the ability to learn fast. In your first month we'll teach you our buyers, our offerings and enough cloud to have a credible first conversation with a CTO." },
  { q: "Which tools will I use?", a: "HubSpot (our CRM), Apollo, SalesHandy, LinkedIn Sales Navigator, SignalHire and Claude. Beyond that, you'll have room to pick and build with the AI and automation tools that make you faster, and to show the rest of the team what works." },
  { q: "Is there a target?", a: "Yes. After your first 30 days you'll own a monthly meetings target. We'll walk you through how it's set, and what good looks like, in the conversation round." },
  { q: "How does pay work?", a: "A fixed salary plus incentives linked to the meetings and pipeline you create. We share the full structure in the conversation round, before you invest any more time." },
  { q: "Where is the role based, and what are the hours?", a: "Pune or Bangalore, working from our office. You'll sell into India and the US. If you're assigned to the US, expect some overlap with US working hours on a few days a week. We'd rather say that now than pretend time zones don't exist." },
  { q: "What does growth look like?", a: "The path is SDR, then Senior SDR, then Lead SDR, then Account Executive. Each step is earned by consistently owning your number, and along the way you'll work alongside the engineers who build what you sell, so you learn the product deeply." },
  { q: "What happens in the conversation round?", a: "We talk through your mock call, then walk through a short account plan you've built with AI for one real target account: who to approach, why now, and your first message. It shows us how you think." },
  { q: "How long does the whole process take?", a: "We aim to get back to you within a week of your application, and to make a decision within two weeks of your mock call." },
];

const H2 = ({ children }: { children: ReactNode }) => <h2 className="mx-auto mt-4 max-w-3xl text-center text-[clamp(1.6rem,3.6vw,2.4rem)] font-normal leading-tight text-neutral-900 [&_strong]:font-semibold">{children}</h2>;
const Head = ({ tag, children, sub }: { tag: string; children: ReactNode; sub?: string }) => (
  <div className="text-center">
    <Tag>{tag}</Tag>
    <H2>{children}</H2>
    {sub && <p className="mx-auto mt-3 max-w-2xl text-neutral-600">{sub}</p>}
  </div>
);

export default function SdrPage() {
  return (
    <div className="brand bg-white text-neutral-900">
      <header className="sticky top-0 z-50 border-b border-line bg-white">
        <W className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Comprinno home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/comprinno-logo.webp" alt="Comprinno" width={600} height={125} className="h-7 w-auto mix-blend-multiply" />
            <span className="hidden border-l border-line pl-3 font-mono text-[.62rem] uppercase tracking-[.14em] text-[#006bc9] sm:inline">Careers</span>
          </Link>
          <a href="#mock-call" className="btn btn-primary shrink-0 whitespace-nowrap !px-4 !py-2 text-sm">Take the mock call</a>
        </W>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-neutral-200">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <W className="py-16 text-center sm:py-20">
          <Tag>We&apos;re hiring · SDR</Tag>
          <h1 className="mx-auto mt-5 max-w-4xl text-[clamp(2rem,5vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
            We build <strong className="sweep font-bold">AI agents</strong> for a living. Our SDRs should <strong>run on them too</strong>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-neutral-600">We&apos;re hiring an SDR who would rather build the outbound machine than be a cog in it. AI does the research and the grunt work. You do the thinking, the messaging and the conversations, and you own the number.</p>
          <CallBtn className="mt-7" />
          <dl className="mx-auto mt-10 grid max-w-4xl grid-cols-2 border border-neutral-300 bg-white text-left lg:grid-cols-4">
            {facts.map((f, i) => (
              <div key={f.k} className={`p-4 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} border-neutral-300`}>
                <dt className={mono}>{f.k}</dt>
                <dd className="mt-1 text-sm font-semibold">{f.v}</dd>
              </div>
            ))}
          </dl>
        </W>
      </section>

      {/* Mock call */}
      <section id="mock-call" className="relative scroll-mt-20 overflow-hidden border-b border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <ParticleWave />
        <W className="relative">
          <Head tag="Before you send a CV" sub="Pick a buyer, read the brief our AI prepared, and run a five-minute discovery call with a prospect played by our own voice agent. It's the job, in miniature.">
            Don&apos;t tell us you can sell. <strong>Take the call.</strong>
          </Head>
          <div className="mt-10"><MockCall /></div>
        </W>
      </section>

      {/* VoxSphere strip */}
      <section className="brand-dark py-10 sm:py-12">
        <W className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <p className="inline-flex items-center gap-2.5 self-start border border-white/25 px-3.5 py-2 font-mono text-[0.85rem] text-white">
              <span className="h-2 w-2 bg-[var(--brand-yellow)]" aria-hidden="true" />
              Powered by VoxSphere. Delivered by Comprinno.
            </p>
            <p className="text-[1.25rem] leading-snug text-white/80 sm:text-[1.35rem]">
              <strong className="block font-semibold text-white">This call is powered by a <span className="text-[var(--brand-sky)]">VoxSphere AI agent</span>.</strong>
              <span className="mt-1 block text-[1rem] sm:text-[1.1rem]">The same agent we build for customer support and outbound calls. They use it to serve and sell. <span className="whitespace-nowrap font-semibold text-[var(--brand-yellow)]">We use it to hire.</span></span>
            </p>
          </div>
          <Link href="/products/voxsphere" className="inline-flex shrink-0 items-center self-start bg-[var(--brand-yellow)] px-5 py-3.5 text-[1rem] font-semibold text-[#1c1c1c] transition-colors hover:bg-[var(--brand-ochre)] lg:self-auto">
            Explore VoxSphere →
          </Link>
        </W>
      </section>

      {/* Habits */}
      <section className="border-b border-neutral-200 py-16 sm:py-20">
        <W>
          <Head tag="Let's be clear" sub="Some outbound habits we'd like to leave behind.">If your AI strategy is a <strong>mail merge</strong>, this isn&apos;t your seat.</Head>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {habits.map((h) => (
              <div key={h.t} className="seg-card">
                <span className="flex items-start justify-between"><IconTile name={h.icon} /><span className="grid h-6 w-6 place-items-center border border-neutral-300 text-xs text-neutral-500" aria-label="Habit to leave behind">×</span></span>
                <p className="mt-4 font-semibold">{h.t}</p>
                <p className="mt-2 text-sm text-neutral-600">{h.d}</p>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* The role */}
      <section className="border-b border-neutral-200 py-16 sm:py-20">
        <W>
          <Head tag="The role" sub="Build a system that does the work of several SDRs, then spend your time on the parts no model does well yet.">Let AI do the <strong>busywork</strong>. You do the <strong>work that wins deals</strong>.</Head>
          <div className="mt-10 grid border border-t-2 border-neutral-300 border-t-neutral-900 md:grid-cols-2">
            <div className="p-6">
              <p className={mono}>The machine you build</p>
              <h3 className="mt-1 text-lg font-semibold">AI handles</h3>
              <ol className="mt-4 divide-y divide-neutral-200 text-sm">
                {ai.map((a, i) => <li key={a} className="flex gap-3 py-3"><span className="font-mono text-xs text-neutral-400">0{i + 1}</span>{a}</li>)}
              </ol>
            </div>
            <div className="border-t border-[#c9e0f6] bg-[#f4f9fe] p-6 md:border-l md:border-t-0">
              <p className={mono}>The part that&apos;s yours</p>
              <h3 className="mt-1 text-lg font-semibold">You handle</h3>
              <ol className="mt-4 divide-y divide-neutral-200 text-sm">
                {you.map(([b, t], i) => <li key={b} className="flex gap-3 py-3"><span className="font-mono text-xs text-neutral-400">0{i + 1}</span><span><b>{b}</b> {t}</span></li>)}
              </ol>
            </div>
          </div>
        </W>
      </section>

      {/* Motions: stage cards like the home page "The path" */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <W>
          <Head tag="What you'll own" sub="Not a 'send 50 emails and call it a day' job. You design it, run it, learn from it and make it better."><strong>Three motions.</strong> One pipeline.</Head>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {motions.map((m, i) => (
              <li key={m.t} className="card">
                <IconTile name={m.icon} />
                <p className={`${mono} mt-4`}>→ Motion 0{i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{m.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.d}</p>
              </li>
            ))}
          </ul>
        </W>
      </section>

      {/* What you'll sell: the four services as home-page stage cards, then the numbers band */}
      <section className="border-b border-neutral-200 py-16 sm:py-20">
        <W>
          <Head tag="What you'll sell" sub="Comprinno takes companies from first workload to AI in production: migrate, modernize, manage and maximize, on one team.">Something buyers <strong>actually need</strong>, with proof to <strong>back every call</strong>.</Head>
          <ol className="path-row mt-10">
            {sell.map((x, i) => (
              <li key={x.v}>
                <Link href={`/services/${x.slug}`} className="path-card group">
                  <span className="path-mark" aria-hidden="true">{x.v}</span>
                  <p className="path-verb">0{i + 1} · {x.v}</p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{x.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
                </Link>
              </li>
            ))}
          </ol>
        </W>
      </section>
      <section className="brand-dark py-14 sm:py-16">
        <W>
          <dl className="stats">
            {stats.map((st) => (
              <div key={st.l} className="stat">
                <dt className="stat-label">{st.l}</dt>
                <dd className="stat-num">{st.v.replace(/[+%]/, "")}<span className="stat-suffix">{st.v.match(/[+%]/)?.[0]}</span></dd>
              </div>
            ))}
            <div className="stat">
              <dt className="stat-label">Est. 2013</dt>
              <dd className="stat-num !text-[clamp(1.4rem,2.4vw,2rem)] !leading-tight !whitespace-normal">AWS Premier Tier Partner</dd>
            </div>
          </dl>
        </W>
      </section>

      {/* First 30 days */}
      <section className="border-b border-neutral-200 py-16 sm:py-20">
        <W>
          <Head tag="Your first 30 days">Learn it. <strong>Build it.</strong> Own it.</Head>
          <div className="mt-12"><FlowLoop items={days.map((d) => ({ title: `${d.w} · ${d.t}`, desc: d.d }))} icons={["search", "code", "chart"]} repeat={false} /></div>
        </W>
      </section>

      {/* Fit + what you get */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <RainField />
        <W className="relative grid gap-6 lg:grid-cols-2">
          <div className="border border-neutral-300 bg-white p-6">
            <Tag>You might be a fit if</Tag>
            <h2 className="mt-4 text-2xl font-normal leading-tight [&_strong]:font-semibold">You&apos;ve been <strong>quietly automating</strong> your way to bigger numbers.</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {fit.map((f) => <li key={f} className="flex gap-3"><span aria-hidden="true" className="font-semibold text-[#006bc9]">✓</span>{f}</li>)}
            </ul>
            <p className="mt-5 border-t border-neutral-200 pt-4 font-mono text-xs text-neutral-500">BONUS: a cloud certification, or hands-on time with Clay, Apollo, n8n or similar tools.</p>
          </div>
          <div className="border border-[#006bc9] bg-white p-6 shadow-[0_20px_44px_-26px_rgb(0_107_201/0.55)]">
            <Tag>What you get</Tag>
            <h2 className="mt-4 text-2xl font-normal leading-tight [&_strong]:font-semibold">A seat at the table, <strong>not a seat in a row</strong>.</h2>
            <div className="mt-5 divide-y divide-neutral-200 text-sm">
              <p className="pb-4"><b>Learn AI from the people building it.</b> Our engineers ship agents for clients every week.</p>
              <p className="py-4"><b>Room to build.</b> Tools and time to design your own outbound system.</p>
              <div className="py-4">
                <p><b>A clear growth path</b> for people who own their number.</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[.6rem] uppercase tracking-[.1em]">
                  {["SDR", "Sr. SDR", "Lead SDR", "Account Executive"].map((s, i) => (
                    <span key={s} className="flex items-center gap-2">{i > 0 && <span className="text-neutral-400">→</span>}<span className={`border px-2 py-1 ${i === 0 ? "border-[#006bc9] bg-[#e3f0fc] text-[#006bc9]" : "border-neutral-300"}`}>{s}</span></span>
                  ))}
                </div>
              </div>
              <p className="pt-4 font-semibold">Competitive base + uncapped incentives</p>
            </div>
          </div>
        </W>
      </section>

      {/* How we hire: the home page closing-CTA band (line wave + step cards) */}
      <section className="cta-full">
        <div className="cta-wave" aria-hidden="true"><LineWave /></div>
        <W className="relative py-16 text-center sm:py-24">
          <Tag>How we hire</Tag>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(1.8rem,4.5vw,3rem)] font-normal leading-[1.15] [&_strong]:font-semibold">Show us how you <strong>think</strong>, not just what you&apos;ve <strong>done</strong>.</h2>
          <ol className="cta-steps cta-steps-4">
            {steps.map((s, i) => (
              <li key={s.k} className="cta-step" style={{ "--d": `${i * 0.15}s` } as CSSProperties}>
                <span className="cta-step-k">{s.k}</span>
                <span className="cta-step-t">{s.t}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center"><CallBtn /></div>
        </W>
      </section>

      {/* FAQ */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <W className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-3xl font-normal leading-tight [&_strong]:font-semibold">Questions before you <strong>apply</strong>?</h2>
            <p className="mt-3 text-sm text-neutral-600">The things candidates usually ask us first.</p>
          </div>
          <div className="divide-y divide-neutral-200 border border-neutral-300 bg-white">
            {faqs.map((f) => (
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

      {/* Final CTA */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="cta-wave" style={{ opacity: 0.9 }} aria-hidden="true"><LineWave /></div>
        <W className="relative py-16 text-center sm:py-20">
          <Tag>The seat is open</Tag>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.2rem)] font-normal leading-[1.1]">You bring the strategy.<br />AI brings the leverage.<br /><strong>You own the number.</strong></h2>
          <p className="mx-auto mt-5 max-w-xl text-neutral-600">If that sounds like the job you&apos;ve been trying to turn your current job into, start with the call. Your call is your application.</p>
          <CallBtn className="mt-7" />
          <p className="mt-4 font-mono text-[.65rem] text-neutral-500">Know someone who&apos;d fit? Send them this page.</p>
        </W>
      </section>

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
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbb00]">LinkedIn</a>
            <Link href="/company/careers" className="hover:text-[#ffbb00]">All careers</Link>
          </div>
        </W>
        {/* same launch-to-ascent visual as the site footer */}
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
