import type { Metadata } from "next";
import { Container, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import { site } from "@/lib/site";
import OfficeMap from "./OfficeMap";

export const metadata: Metadata = {
  title: "Talk to an expert",
  description: "Tell us about your cloud or AI project. An AWS-certified expert will reply within 24 to 48 hours.",
  alternates: { canonical: "/contact" },
};

const input =
  "mt-1 w-full border border-line-strong bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none";
const label = "text-sm font-medium text-ink";

const next = [
  { title: "We read your request", desc: "Your details go straight to our team, not a general inbox." },
  { title: "An expert replies in 24 to 48 hours", desc: "Usually to set up a short call about your goals." },
  { title: "We agree next steps", desc: "A plan, an assessment or a proposal, depending on what you need." },
];

const topics = ["Migrate to the cloud", "Modernize applications", "Managed services", "Cost and performance", "AI and agents", "Our products", "Something else"];

const countries = [
  "India", "United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Singapore", "Australia", "Canada",
  "Germany", "France", "Netherlands", "Ireland", "Malaysia", "Indonesia", "South Africa", "Other",
];

const teams: { title: string; desc: string; email: string; icon: IconName }[] = [
  { title: "Sales", desc: "Interested in our services or products? Talk to our experts.", email: site.emails.sales, icon: "bag" },
  { title: "Support", desc: "Using one of our products and need help? Contact support.", email: site.emails.support, icon: "heart" },
  { title: "Careers", desc: "Questions about open roles or applications? Write to our talent team.", email: site.emails.careers, icon: "user" },
];

const direct = [
  { k: "Phone", v: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { k: "Email", v: site.emails.general, href: `mailto:${site.emails.general}` },
  { k: "X", v: "@comprinnotech", href: site.social.x },
  { k: "LinkedIn", v: "comprinno", href: site.social.linkedin },
];

// TODO: answers drafted from site copy, please confirm.
const faqs = [
  { q: "What happens after I submit the form?", a: "Your request goes straight to our team. An AWS-certified expert replies within 24 to 48 hours, usually to set up a short call about your goals. From there we agree next steps: a plan, an assessment or a proposal." },
  { q: "Do you work with companies outside India?", a: "Yes. With offices in India, the United States and the United Kingdom, we work with customers around the world, remotely or on-site." },
  { q: "Can AWS fund part of my project?", a: "Often, yes. As an AWS Premier Tier Services Partner, we check which AWS programs your project qualifies for and help you apply, so funding can cover part of an assessment, migration or proof of concept." },
  { q: "I'm an existing customer. Where do I get support?", a: `Write to ${site.emails.support} and our support team will pick it up. If you have a managed services contract, use the support channel agreed in it.` },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO + FORM */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-8 sm:py-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <Eyebrow>Talk to an expert</Eyebrow>
              <h1 className="mt-5 text-[clamp(1.9rem,4.4vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                Let&apos;s talk about your <strong className="sweep">cloud or AI</strong> <strong>project.</strong>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Tell us what you&apos;re working on. An AWS-certified expert will reply within 24 to 48 hours.
              </p>
              <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-widest text-muted">What happens next</p>
              <ol className="mt-4 grid gap-4">
                {next.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center border border-ink bg-bg font-mono text-xs text-ink">{i + 1}</span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{s.title}</span>
                      <span className="block text-sm text-muted">{s.desc}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm text-muted">
                Prefer email? Write to <a href={`mailto:${site.emails.sales}`} className="font-medium text-ink underline underline-offset-2">{site.emails.sales}</a>
              </p>
            </div>

            {/* Works with zero JavaScript: plain POST to a route handler */}
            <form action="/api/contact" method="post" className="grid gap-3.5 border border-line border-t-2 border-t-ink bg-bg p-5 shadow-sm sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-ink">Tell us about your project</h2>
                <p className="mt-0.5 text-xs text-muted">All fields are required unless marked optional.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className={label}>Full name<input name="name" required autoComplete="name" className={input} /></label>
                <label className={label}>Work email<input name="email" type="email" required autoComplete="email" className={input} /></label>
                <label className={label}>Company<input name="company" required autoComplete="organization" className={input} /></label>
                <label className={label}>Phone <span className="font-normal text-muted">(optional)</span><input name="phone" type="tel" autoComplete="tel" className={input} /></label>
              </div>
              <label className={label}>
                Country
                <select name="country" required defaultValue="" className={input}>
                  <option value="" disabled>Select a country</option>
                  {countries.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <fieldset>
                <legend className={label}>What can we help with?</legend>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {topics.map((t, i) => (
                    <label key={t} className="cursor-pointer">
                      <input type="radio" name="topic" value={t} required={i === 0} className="peer sr-only" />
                      <span className="block border border-line-strong bg-bg px-2.5 py-1.5 text-xs text-ink transition hover:bg-surface peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent">{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={label}>
                Tell us a little more <span className="font-normal text-muted">(optional)</span>
                <textarea name="message" rows={2} placeholder="Your goals, timeline or current setup" className={input} />
              </label>
              <div className="grid gap-1.5 text-xs text-ink-2">
                <label className="flex items-start gap-2.5">
                  <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#334155]" />
                  <span>I agree to Comprinno processing my information in line with the <a href="/privacy-policy" className="underline underline-offset-2">Privacy policy</a>.</span>
                </label>
                <label className="flex items-start gap-2.5">
                  <input type="checkbox" name="marketing" className="mt-0.5 h-4 w-4 shrink-0 accent-[#334155]" />
                  <span>Send me occasional emails from Comprinno. I can unsubscribe at any time.</span>
                </label>
              </div>
              {/* honeypot */}
              <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div><button type="submit" className="btn btn-primary">Talk to an expert →</button></div>
            </form>
          </div>
        </Container>
      </section>

      {/* CONTACTS */}
      <Section>
        <SectionHead eyebrow="Contacts" title={<>Reach the <strong>right team.</strong></>} />
        <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
          {teams.map((t) => (
            <div key={t.title} className="card">
              <IconTile name={t.icon} />
              <h3 className="mt-4 text-lg font-semibold text-ink">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
              <a href={`mailto:${t.email}`} className="mt-4 inline-block text-sm font-medium text-ink underline underline-offset-2">{t.email} →</a>
            </div>
          ))}
        </div>
        <dl className="stats stats-words mt-4 bg-bg">
          {direct.map((d) => (
            <div key={d.k} className="stat">
              <dt className="stat-label">{d.k}</dt>
              <dd className="mt-1 text-base font-semibold text-ink">
                <a href={d.href} {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{d.v}</a>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* OFFICES */}
      <Section tone="surface" id="offices">
        <SectionHead eyebrow="Offices" title={<>Where to <strong>find us.</strong></>} desc="Offices in India, the United States and the United Kingdom." />
        <OfficeMap />
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Got questions? <strong className="font-semibold">We&apos;ve got answers.</strong></h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">What to expect when you get in touch.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>
    </>
  );
}
