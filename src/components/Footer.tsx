import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { credentials } from "@/content/company";
import { Container } from "./ui";
import { Logo } from "./Header";

const col = "grid content-start gap-2 text-sm";
const head = "mb-1 font-mono text-xs uppercase tracking-wider text-muted";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
            <p className="mt-4 text-sm text-muted">Pune · Bangalore · US · UK</p>
            <p className="mt-1 text-sm text-muted">ISO 27001 · SOC 2</p>
          </div>
          <nav aria-label="Services" className={col}>
            <p className={head}>Services</p>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="hover:text-ink">{s.verb}</Link>
            ))}
            <Link href="/products/tevico" className="hover:text-ink">Products</Link>
            <Link href="/industries" className="hover:text-ink">Industries</Link>
          </nav>
          <nav aria-label="Resources" className={col}>
            <p className={head}>Resources</p>
            <Link href="/case-studies" className="hover:text-ink">Case studies</Link>
            <Link href="/blog" className="hover:text-ink">Blog</Link>
            <Link href="/newsroom" className="hover:text-ink">Newsroom</Link>
            <Link href="/partnerships" className="hover:text-ink">Partnerships</Link>
          </nav>
          <nav aria-label="Company" className={col}>
            <p className={head}>Company</p>
            <Link href="/about" className="hover:text-ink">About us</Link>
            <Link href="/careers" className="hover:text-ink">Careers</Link>
            <Link href="/contact" className="hover:text-ink">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-ink">Privacy policy</Link>
          </nav>
          <div className={col}>
            <p className={head}>Connect</p>
            <a href={`mailto:${site.emails.sales}`} className="hover:text-ink">{site.emails.sales}</a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-ink">{site.phone}</a>
            <a href={site.social.linkedin} rel="noopener noreferrer" target="_blank" className="hover:text-ink">LinkedIn</a>
            <a href={site.social.x} rel="noopener noreferrer" target="_blank" className="hover:text-ink">X</a>
            <a href={site.social.instagram} rel="noopener noreferrer" target="_blank" className="hover:text-ink">Instagram</a>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
          {credentials.map((c) => (
            <span key={c} className="tag">{c}</span>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">© 2026 Comprinno Technologies. All rights reserved.</p>
      </Container>
    </footer>
  );
}
