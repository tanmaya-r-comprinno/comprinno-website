import type { Metadata } from "next";
import { Container, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import HubSpotForm from "@/components/HubSpotForm";
import { site } from "@/lib/site";
import OfficeMap from "./OfficeMap";

export const metadata: Metadata = {
  title: "Talk to an expert",
  description: "Tell us about your cloud or AI project. An AWS-certified expert will reply within 24 to 48 hours.",
  alternates: { canonical: "/contact" },
};

// Same HubSpot form as the WordPress contact page.
const HUBSPOT_PORTAL_ID = "4699526";
const HUBSPOT_FORM_ID = "aa061395-24b5-4af9-b053-79820f06dd18";

const next = [
  { title: "We read your request", desc: "Your details go straight to our team, not a general inbox." },
  { title: "An expert replies in 24 to 48 hours", desc: "Usually to set up a short call about your goals." },
  { title: "We agree next steps", desc: "A plan, an assessment or a proposal, depending on what you need." },
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
    <div className="brand">
      {/* HERO + FORM */}
      <section className="hero-block relative overflow-hidden border-b border-line sm:!h-auto sm:min-h-[54rem]">
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
                    <span className="grid h-7 w-7 shrink-0 place-items-center border border-[#9cc6ee] bg-[#e3f0fc] font-mono text-xs font-semibold text-[#006bc9]">{i + 1}</span>
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

            {/* HubSpot embedded form, same as the WordPress site (HubSpot handles captcha and consent) */}
            <div className="border border-line border-t-2 border-t-[#006bc9] bg-bg p-5 shadow-sm sm:px-6">
              <h2 className="text-lg font-semibold text-ink">Tell us about your project</h2>
              <div className="mt-3">
                <HubSpotForm portalId={HUBSPOT_PORTAL_ID} formId={HUBSPOT_FORM_ID} region="na2" fallbackEmail={site.emails.sales} />
              </div>
            </div>
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
    </div>
  );
}
