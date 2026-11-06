import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { site } from "@/lib/site";
import { Icon, IconTile } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Tell us what you're working on. A certified cloud expert replies within 24 to 48 hours.",
  alternates: { canonical: "/contact" },
};

const input =
  "mt-1.5 w-full rounded-md border border-line-strong bg-bg px-4 py-3 text-base text-ink placeholder:text-muted focus:border-accent";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you're working on" desc="A certified cloud expert replies within 24 to 48 hours." />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Works with zero JavaScript: plain POST to a route handler */}
          <form action="/api/contact" method="post" className="card grid gap-5">
            <label className="text-sm font-medium text-ink">
              Name
              <input name="name" required autoComplete="name" className={input} />
            </label>
            <label className="text-sm font-medium text-ink">
              Work email
              <input name="email" type="email" required autoComplete="email" className={input} />
            </label>
            <label className="text-sm font-medium text-ink">
              Company
              <input name="company" autoComplete="organization" className={input} />
            </label>
            <label className="text-sm font-medium text-ink">
              I&apos;m interested in
              <select name="topic" className={input} defaultValue="">
                <option value="" disabled>Select…</option>
                <option>Migrate</option>
                <option>Modernize</option>
                <option>Manage</option>
                <option>Maximize (AI)</option>
                <option>Tevico</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="text-sm font-medium text-ink">
              Message
              <textarea name="message" rows={5} required className={input} />
            </label>
            {/* honeypot */}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button type="submit" className="btn btn-primary w-full sm:w-auto">Send message →</button>
          </form>

          <div className="grid content-start gap-4">
            <div className="card text-sm">
              <div className="flex gap-2"><IconTile name="phone" /><IconTile name="mail" /></div>
              <p className="mt-4 label">Reach us</p>
              <p className="mt-3"><a className="font-medium text-ink" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>
              <ul className="mt-3 grid gap-1">
                <li>General: <a href={`mailto:${site.emails.general}`}>{site.emails.general}</a></li>
                <li>Sales: <a href={`mailto:${site.emails.sales}`}>{site.emails.sales}</a></li>
                <li>Support: <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a></li>
                <li>Careers: <a href={`mailto:${site.emails.careers}`}>{site.emails.careers}</a></li>
              </ul>
            </div>
            {site.offices.map((o) => (
              <div key={o.label} className="card flex gap-4 text-sm">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                <div>
                <p className="font-medium text-ink">{o.city} · {o.label}</p>
                <p className="mt-1 leading-relaxed text-muted">{o.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
