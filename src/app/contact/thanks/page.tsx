import type { Metadata } from "next";
import Link from "next/link";
import { Br, Button, Container, Eyebrow } from "@/components/ui";
import { IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

const next: { title: string; desc: string; icon: IconName; when: string }[] = [
  { title: "We read your request", desc: "Your details go straight to our team, not a general inbox.", icon: "mail", when: "Today" },
  { title: "An expert replies", desc: "Usually to set up a short call about your goals.", icon: "user", when: "Within 24 to 48 hours" },
  { title: "We agree next steps", desc: "A plan, an assessment or a proposal, depending on what you need.", icon: "check", when: "After the call" },
];

const explore = [
  { label: "Customer stories", desc: "Results from 60+ projects", href: "/resources/case-studies", icon: "chart" as IconName },
  { label: "Our services", desc: "Migrate, Modernize, Manage, Maximize", href: "/services/migrate", icon: "layers" as IconName },
  { label: "Blog", desc: "Guides from our engineers", href: "/resources/blog", icon: "code" as IconName },
];

export default function ThanksPage() {
  return (
    <div className="brand">
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <svg className="thanks-mark" viewBox="0 0 120 120" width="112" height="112" aria-hidden="true">
              <defs>
                <linearGradient id="tm-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0088FF" /><stop offset="1" stopColor="#0A134B" /></linearGradient>
                <filter id="tm-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#006BC9" floodOpacity=".35" /></filter>
              </defs>
              <circle className="tm-ring" cx="60" cy="60" r="40" fill="none" stroke="#0088FF" strokeWidth="2" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#006BC9" strokeOpacity=".12" strokeWidth="1" />
              <circle className="tm-disc" cx="60" cy="60" r="38" fill="url(#tm-fill)" filter="url(#tm-shadow)" />
              <path className="tm-check" d="M43 61 l11 11 l23 -25" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="96" cy="30" r="4" fill="#FFBB00" className="tm-spark" />
            </svg>
            <div className="mt-6"><Eyebrow>Message received</Eyebrow></div>
            <h1 className="mt-5 text-[clamp(2rem,5vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
              <strong className="sweep">Thank you.</strong><Br /> We&apos;ll be in touch soon.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              A cloud and AI expert will reply within 24 to 48 hours. Here is what happens next.
            </p>

            <ol className="mt-10 grid w-full gap-3 text-left sm:grid-cols-3">
              {next.map((s, i) => (
                <li key={s.title} className="relative border border-line border-t-2 border-t-[#006bc9] bg-bg p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <IconTile name={s.icon} />
                    <span className="font-mono text-xs text-[#006bc9]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-4 font-mono text-[.65rem] uppercase tracking-[.12em] text-[#D89F04]">{s.when}</p>
                  <h2 className="mt-1 font-semibold text-ink">{s.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/">Back to home →</Button>
              <Button href="/contact" variant="ghost">Send another message</Button>
            </div>
            <p className="mt-6 text-sm text-muted">
              Need something sooner? Email <a href={`mailto:${site.emails.sales}`} className="font-medium text-ink underline underline-offset-4">{site.emails.sales}</a>
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <p className="text-center font-mono text-xs uppercase tracking-[.14em] text-muted">While you wait</p>
          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-3">
            {explore.map((e) => (
              <Link key={e.href} href={e.href} className="group flex items-center gap-4 border border-line bg-bg p-4 transition hover:border-[#006bc9] hover:shadow-sm">
                <IconTile name={e.icon} />
                <span className="min-w-0">
                  <span className="block font-semibold text-ink group-hover:text-[#006bc9]">{e.label} <span aria-hidden="true">→</span></span>
                  <span className="block text-sm text-muted">{e.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
