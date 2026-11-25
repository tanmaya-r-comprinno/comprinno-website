import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Eyebrow } from "@/components/ui";
import RainField from "@/components/RainField";
import ParticleWave from "@/components/ParticleWave";
import GridGlow from "@/components/GridGlow";
import LineWave from "@/components/LineWave";
import FooterArt from "@/components/FooterArt";
import { SocialLinks } from "@/components/Footer";
import Countdown from "./Countdown";
import RegisterForm from "./RegisterForm";
import HeroEmail from "./HeroEmail";
import HostCollage from "./HostCollage";
import BookMeeting from "./BookMeeting";


/**
 * Comprinno at AWS re:Invent 2026 + CXO & partner dinner. LOW FIDELITY (greyscale, placeholders),
 * built from "re Invent — v2 (Comprinno at re Invent + dinner).pdf". Placeholders are labelled in the page.
 * Standalone: the /campaign layout hides the site header/footer and sets noindex.
 */
const SHARE_TITLE = "Comprinno at AWS re:Invent 2026";
const SHARE_DESC = "Meet the Comprinno team in Las Vegas, Nov 30 to Dec 4, and request your seat at our CXO & partner dinner on Wednesday, December 2.";
// link previews (LinkedIn, WhatsApp, Slack, X) use this page’s own title, text and opengraph-image.jpg, not the site defaults
export const metadata: Metadata = {
  title: SHARE_TITLE,
  description: SHARE_DESC,
  alternates: { canonical: "/campaign/2026/AWS/reinvent" },
  openGraph: { type: "website", siteName: "Comprinno", url: "/campaign/2026/AWS/reinvent", title: SHARE_TITLE, description: SHARE_DESC },
  twitter: { card: "summary_large_image", title: SHARE_TITLE, description: SHARE_DESC },
};

const DINNER = "2026-12-02T19:00:00-08:00";

const W = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
// site section label (same Eyebrow as comprinno.net and the AWS campaign page)
const Tag = ({ children }: { children: string }) => <span className="inline-flex"><Eyebrow>{children}</Eyebrow></span>;
const Mono = ({ children, className = "" }: { children: ReactNode; className?: string }) => <p className={`font-mono text-[.62rem] uppercase tracking-[.12em] text-neutral-500 ${className}`}>{children}</p>;
const Placeholder = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`flex items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:12px_12px] p-4 ${className}`}>
    <span className="max-w-xs border border-neutral-200 bg-white px-3 py-2 text-center font-mono text-[.6rem] uppercase tracking-[.1em] text-neutral-500">{label}</span>
  </div>
);
const Btn = ({ href, children, ghost = false, className = "" }: { href: string; children: ReactNode; ghost?: boolean; className?: string }) => (
  <a href={href} className={`btn ${ghost ? "btn-ghost !bg-white hover:!bg-[#1c1c1c] hover:!text-white" : "btn-primary"} ${className}`}>{children}</a>
);
const field = "mt-1 block w-full border border-[#c8d5e8] bg-white px-3 py-2.5 text-sm focus:border-[#006bc9] focus:outline-none";

const steps = ["Register in under a minute.", "Await approval: All registrations are subject to host approval.", "Get your confirmation: Once your registration is approved, your pass and venue details will arrive by email."];
// LinkedIn posts to show: paste each post’s embed URL (LinkedIn post menu > Embed this post), e.g.
// "https://www.linkedin.com/embed/feed/update/urn:li:share:1234567890". Until then, placeholder cards show.
const linkedinEmbeds: string[] = [];
const posts = [
  { when: "2h ago", media: true, lines: 2 }, { when: "5h ago", media: false, lines: 3 },
  { when: "Yesterday", media: true, lines: 2 }, { when: "1d ago", media: true, lines: 3 },
  { when: "2d ago", media: false, lines: 2 }, { when: "3d ago", media: true, lines: 3 },
];
// per-host links: add `linkedin` (profile URL) and `book` (meeting link, e.g. HubSpot) when we have them.
// Until then LinkedIn opens a people search for the name and Book emails sales with the host’s name.
// `book`: Google appointment-schedule URL with ?gv=true (the embeddable form; the short calendar.app.google link can’t be framed)
const hosts: { n: string; r: string; a: string; linkedin?: string; book?: string }[] = [
  { n: "Prasad Puranik", r: "Chief Executive Officer", a: "Partnering with Comprinno on AWS", linkedin: "https://www.linkedin.com/in/pspuranik/", book: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1caCYv7aVPWD7hwGWwCvEEnTdqwfdNLw4y9vmftsNBwMIPQb5KSV4QBH68pITz495Rh7i8HFms?gv=true" },
  { n: "Bhupali Tambekar", r: "Chief Technology Officer", a: "GenAI from pilot to production", linkedin: "https://www.linkedin.com/in/bhupali-tambekar-627343a3/", book: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2P1yllbBsoOPo0dFMcpMDyd8eenaJEfpRCs1BTN8IfknQ72ClhMUl1e2AenRWO-ECpMt79DYmU?gv=true" },
  { n: "Shashank Amin", r: "Chief Financial Officer (CFO)", a: "Cloud cost and the business case for change", linkedin: "https://www.linkedin.com/in/shashank-amin-6053723b0/" },
  { n: "Pallavi Khopkar", r: "CoE and PMO Head", a: "Running large cloud programs on time", linkedin: "https://www.linkedin.com/in/pallavi-tamhane-khopkar/" },
  { n: "Harshal Choudhary", r: "Service Delivery Head", a: "Managed services and day-to-day cloud ops", linkedin: "https://www.linkedin.com/in/harshal-choudhary-90aa6a176/" },
  { n: "Suraj Lokre", r: "Strategic Program Manager, CEO’s Office", a: "Strategic initiatives and partnerships", linkedin: "https://www.linkedin.com/in/surajlokre/" },
  { n: "Saqib Mehraj Goni", r: "Solutions Architect", a: "Architecture, migration and modernization", linkedin: "https://www.linkedin.com/in/saqib-mehraj/" },
];

export default function ReInvent2026() {
  return (
    <div className="brand bg-white text-[#1c1c1c]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <W className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3" aria-label="Comprinno home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/comprinno-logo.webp" alt="Comprinno" width={600} height={125} className="h-7 w-auto mix-blend-multiply" />
            <span className="hidden border-l border-[#e3eaf4] pl-3 font-mono text-[.6rem] uppercase tracking-[.12em] text-[#006bc9] sm:inline">AWS re:Invent 2026</span>
          </Link>
          <a href="#register" className="btn btn-primary btn-nav">Request your seat</a>
        </W>
      </header>

      {/* HERO: home-page grid with the glowing-corner animation */}
      <section className="relative isolate overflow-hidden border-b border-neutral-200">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <W className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="min-w-0">
            {/* one label, in the site’s sky hue (the auto hue for this text came out pink) */}
            <span className="inline-flex max-w-full [&_.eyebrow]:max-w-full [&_.eyebrow]:whitespace-normal [&_.eyebrow-text]:!whitespace-normal [&_.eyebrow-text]:!overflow-visible [&_.eyebrow-text]:leading-[1.6] [&_.eyebrow]:!text-left [&_.eyebrow-text]:!text-left "><Eyebrow><span className="block sm:inline">AWS re:Invent 2026<span className="hidden sm:inline"> · </span></span><span className="hidden sm:inline">Las Vegas, NV · Nov 30 to Dec 4</span></Eyebrow></span>
            <h1 className="mt-6 text-[clamp(2.4rem,6vw,4rem)] font-light leading-[1.02] tracking-tight">Comprinno at <strong className="block font-bold"><span className="sweep">re:Invent 2026</span></strong></h1>
            <p className="mt-5 max-w-lg leading-relaxed text-neutral-600">Turn enterprise AI into a lasting competitive advantage. Meet our team between sessions or join us on Wednesday, December 2, for Indian food and great conversation.</p>
            <HeroEmail inputClass={field} />
            <div className="mt-8 max-w-lg">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-2"><Mono className="whitespace-nowrap !text-[#006bc9]">● Our dinner starts in</Mono><span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-[#e3f0fc] px-2.5 py-1 font-mono text-[.62rem] font-semibold uppercase tracking-[.08em] text-[#006bc9]"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>Wed, Dec 2 · 7:00 PM PST</span></div>
              <Countdown to={DINNER} />
            </div>
          </div>
          <HostCollage hosts={hosts} />
        </W>
      </section>

      {/* THE DINNER */}
      <section id="dinner" className="border-b border-neutral-200 bg-white">
        <W className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <Tag>The dinner</Tag>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.6rem)] font-light tracking-tight">Dinner with a <strong className="font-bold">Dash of Spice</strong></h2>
            <p className="mt-3"><span className="sweep inline-block font-mono text-sm font-semibold uppercase tracking-[.12em]">CXO &amp; partner dinner</span></p>
            <p className="mt-4 max-w-lg leading-relaxed text-neutral-600">Step away from the buzz for a private evening of great food, drinks and easy conversation, just off the Strip. There are no pitches and no slides, just a relaxed place to recharge after a long day.</p>
            <p className="mt-3 max-w-lg leading-relaxed text-neutral-600"><strong className="text-neutral-900">Seats are limited.</strong> Request yours, and we’ll send the venue details once your seat is confirmed.</p>
            <Btn href="#register" className="mt-6">Request your seat →</Btn>
          </div>
          <Image src="/campaign/reinvent/dinner-indian.webp" alt="Guests raising a toast over a table of Indian dishes" width={1600} height={1200} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
        </W>
      </section>

      {/* LIVE FROM LAS VEGAS */}
      <section id="week" className="border-b border-[#e3eaf4] bg-[#f5f8fd]">
        <W className="py-16 lg:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {/* live indicator sits with the label, not floating above the button */}
              <div className="flex flex-wrap items-center gap-3"><Tag>Live from Las Vegas</Tag><Mono className="!text-[#006bc9]">● Live · updated 14:20</Mono></div>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-tight tracking-tight">Follow our week <strong className="font-bold">as it happens.</strong></h2>
              <p className="mt-3 text-neutral-600">Photos, takeaways and moments from re:Invent, shared on LinkedIn by Comprinno and our team.</p>
            </div>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-nav shrink-0 self-start !bg-white hover:!bg-[#1c1c1c] hover:!text-white lg:self-end">
              <span className="font-mono text-xs font-bold" aria-hidden="true">in</span>Follow Comprinno
            </a>
          </div>
          {linkedinEmbeds.length > 0 ? (
          <div className="mt-8 gap-3 sm:columns-2 lg:columns-3">
            {linkedinEmbeds.map((src) => (
              <iframe key={src} src={src} title="Comprinno post on LinkedIn" loading="lazy" className="mb-3 h-[560px] w-full break-inside-avoid border border-neutral-200 bg-white" />
            ))}
          </div>
          ) : (
          <div className="mt-8 gap-3 sm:columns-2 lg:columns-3">
            {posts.map((p) => (
              <article key={p.when} className="mb-3 break-inside-avoid border border-neutral-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center bg-[#0a134b] text-sm font-semibold text-white">C</span>
                  <span><span className="block text-sm font-semibold">Comprinno</span><Mono>{p.when}</Mono></span>
                  <span className="ml-auto font-mono text-xs text-neutral-400">in</span>
                </div>
                <div className="mt-3 space-y-2">{Array.from({ length: p.lines }, (_, i) => <div key={i} className={`h-2 bg-neutral-200 ${i === p.lines - 1 ? "w-2/3" : "w-full"}`} />)}</div>
                {p.media && <Placeholder label="Photo / video" className="mt-3 aspect-[4/3]" />}
                <p className="mt-3 border-t border-neutral-200 pt-2 font-mono text-[.6rem] uppercase tracking-[.1em] text-neutral-500">♥ — · Comment · Share</p>
              </article>
            ))}
          </div>
          )}
        </W>
      </section>

      {/* HOSTS */}
      <section id="hosts" className="relative isolate overflow-hidden border-b border-neutral-200">
        {/* site dots-and-waves animation (same as "What we migrate" and Pratham’s page) */}
        <div className="absolute inset-0 -z-10" aria-hidden="true"><ParticleWave themed /></div>
        <W className="py-16 lg:py-20">
          <Tag>Your hosts</Tag>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.6rem)] font-light tracking-tight">The Comprinno team <strong className="font-bold">you’ll meet.</strong></h2>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-neutral-600">Seven members of our team are in Las Vegas all week. Find them between sessions, or sit with them at dinner.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {hosts.map((h) => (
              <article key={h.n} className="group relative flex flex-col border border-neutral-200 bg-white transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#006bc9] hover:shadow-[0_18px_40px_-24px_rgb(0_107_201/.45)]">
                <div className="relative overflow-hidden border-b border-neutral-200">
                  <div className="aspect-square bg-neutral-100">
                    <Image src={`/campaign/reinvent/hosts/${h.n.toLowerCase().replace(/\s+/g, "-")}.webp`} alt={h.n} width={640} height={640} sizes="(min-width: 1024px) 25vw, 50vw" className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <h3 className="text-base font-semibold leading-tight text-[#1c1c1c] sm:text-lg">{h.n}</h3>
                  <p className="mt-1 text-xs leading-snug text-neutral-500 sm:text-sm">{h.r}</p>
                  {/* topic in a tinted callout: stands out without a tall block */}
                  <div className="mt-3 border-l-2 border-[#006bc9] bg-[#f5f8fd] px-2.5 py-2 sm:mt-4 sm:px-3 sm:py-2.5">
                    <p className="font-mono text-[.58rem] uppercase tracking-[.12em] text-[#006bc9]">Ask me about</p>
                    <p className="mt-1 text-[.8rem] font-semibold leading-snug text-[#1c1c1c] sm:text-sm">{h.a}</p>
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="flex gap-2">
                      <BookMeeting name={h.n} embed={h.book} fallback={`mailto:${site.emails.sales}?subject=${encodeURIComponent(`Meeting with ${h.n} at re:Invent 2026`)}`} className="inline-flex min-h-9 flex-1 items-center justify-center bg-[#ffbb00] px-2 text-xs font-semibold text-[#1c1c1c] whitespace-nowrap transition-colors hover:bg-[#d89f04]" />
                      <a href={h.linkedin ?? `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${h.n} Comprinno`)}`} target="_blank" rel="noopener noreferrer" aria-label={`${h.n} on LinkedIn`} title="LinkedIn" className="inline-flex min-h-9 w-9 shrink-0 items-center justify-center border border-neutral-300 font-mono text-xs font-semibold text-neutral-700 transition-colors hover:border-[#006bc9] hover:bg-[#006bc9] hover:text-white">in</a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            {/* 8th tile completes the grid and turns the section into a call to action */}
            <a href="#register" className="group flex flex-col justify-between bg-[#0a134b] p-4 text-white transition-colors hover:bg-[#141e5c] sm:p-6">
              <Mono className="!text-[#ffbb00]">Wed, Dec 2 · 7:00 PM PST</Mono>
              <div className="mt-10">
                <p className="text-xl font-light leading-tight sm:text-2xl">Meet them <strong className="font-semibold">over dinner.</strong></p>
                <p className="mt-3 text-xs text-neutral-400 sm:text-sm">A private CXO &amp; partner evening, just off the Strip. Seats are limited.</p>
                <span className="mt-6 inline-flex items-center gap-2 border-b border-[#ffbb00] pb-1 text-sm font-semibold text-[#ffbb00]">Request your seat <span className="transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </a>
          </div>
        </W>
      </section>

      {/* REGISTER */}
      <section id="register" className="relative isolate scroll-mt-20 overflow-hidden border-b border-neutral-200">
        {/* site droplet animation, in grey to match the low-fidelity page */}
        <div className="absolute inset-0 -z-10" aria-hidden="true"><RainField /></div>
        <W className="grid gap-10 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-20">
          <div>
            <Tag>Register</Tag>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-tight tracking-tight">Request your seat. <strong className="font-bold">Our hosts will confirm your registration.</strong></h2>
            <ol className="mt-6 space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-sm text-neutral-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#006bc9] font-mono text-xs text-white">{i + 1}</span>{s}</li>
              ))}
            </ol>
            <Mono className="mt-6">Seats are limited · venue shared on confirmation</Mono>
          </div>

          {/* same card as the comprinno.net/contact form */}
          <div className="self-start border border-neutral-200 border-t-2 border-t-[#006bc9] bg-white p-5 shadow-sm sm:px-6">
            <h3 className="text-lg font-semibold text-[#1c1c1c]">Request your seat at the dinner</h3>
            <div className="mt-4"><RegisterForm /></div>
          </div>
        </W>
      </section>

      {/* CLOSING + FOOTER: comprinno.net closing band (navy, line wave) and site footer (navy, launch art) */}
      <div className="brand">
        <section className="cta-full">
          <div className="cta-wave" aria-hidden="true"><LineWave /></div>
          <W className="relative py-16 text-center sm:py-24">
            <p className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-3 py-1.5 font-mono text-[.68rem] uppercase tracking-[.12em] text-white"><span className="h-1.5 w-1.5 bg-[#ffbb00]" aria-hidden="true" />Wed, Dec 2 · Las Vegas · Seats are limited</p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] font-light tracking-tight">See you in <strong className="font-semibold">Las Vegas.</strong></h2>
            <p className="mt-3 text-white/70">Seats go to registered guests only.</p>
            <div className="mx-auto mt-8 grid max-w-sm gap-3 sm:flex sm:max-w-none sm:justify-center">
              <a href="#register" className="btn btn-primary">Request your seat <span className="go">→</span></a>
            </div>
          </W>
        </section>

        <footer className="relative overflow-hidden bg-[#050a2e] text-white">
          {/* site footer brand block: logo, tagline and social buttons */}
          <W className="relative z-10 flex flex-col gap-6 pt-14 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link href="/" aria-label="Comprinno home" className="inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src="/brand/comprinno-logo-white.webp" alt="Comprinno" width={600} height={125} className="h-8 w-auto" />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">Comprinno: cloud, data and AI on AWS, delivered end to end.</p>
              <div className="mt-6"><SocialLinks /></div>
            </div>
          </W>
          <div className="pointer-events-none relative z-0 -mt-2 aspect-[4/1] w-full sm:-mt-8 lg:-mt-20" aria-hidden="true">
            <FooterArt />
          </div>
          <div className="relative z-10 border-t border-white/10 bg-[#050a2e]">
            <W className="flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:justify-between">
              <p>© 2026 Comprinno Technologies · <Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link></p>
              <p>AWS re:Invent is an Amazon Web Services event. This dinner is hosted independently by Comprinno.</p>
            </W>
          </div>
        </footer>
      </div>
    </div>
  );
}
