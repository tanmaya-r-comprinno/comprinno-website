import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { Container } from "./ui";
import FooterArt from "./FooterArt";

const col = "grid content-start gap-2.5 text-sm";
const head = "mb-1 font-mono text-[0.7rem] uppercase tracking-widest text-[#9fd3ff]";
const link = "text-white/75 transition-colors hover:text-white";

// social icons (24 x 24)
const icons = {
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z",
  x: "M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L7.1 4H5.1l12.6 16Z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.5 5.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z",
};

export default function Footer() {
  const social: [keyof typeof icons, string, string][] = [
    ["linkedin", site.social.linkedin, "LinkedIn"],
    ["x", site.social.x, "X"],
    ["instagram", site.social.instagram, "Instagram"],
  ];
  return (
    <footer className="site-footer relative mt-auto overflow-hidden border-t border-white/10 bg-[#050a2e] text-white">

      <Container className="relative z-10 pt-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1.2fr_1.8fr]">
          {/* brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label={`${site.name} home`} className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/comprinno-logo-white.webp" alt={site.name} width={600} height={125} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
            <p className="mt-3 text-sm text-white/70"><span className="whitespace-nowrap">Pune · Bangalore</span> · <span className="whitespace-nowrap">US · UK</span></p>
            <ul className="mt-5 flex gap-2">
              {social.map(([k, href, label]) => (
                <li key={k}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-9 w-9 place-items-center border border-white/25 text-white/80 transition-colors hover:border-[#ffbb00] hover:text-[#ffbb00]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d={icons[k]} fill="currentColor" fillRule="evenodd" /></svg>
                  </a>
                </li>
              ))}
            </ul>
            {/* certifications */}
            <div className="mt-6 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/badges/iso-27001.webp" alt="ISO 27001 certified" width={252} height={250} loading="lazy" className="h-14 w-14 object-contain" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/badges/soc-2.webp" alt="AICPA SOC 2" width={248} height={250} loading="lazy" className="h-14 w-14 object-contain" />
            </div>
          </div>

          <nav aria-label="Services" className={col}>
            <p className={head}>Services</p>
            {services.map((s) => <Link key={s.slug} href={`/services/${s.slug}`} className={link}>{s.verb}</Link>)}
            <Link href="/industries" className={link}>Industries</Link>
          </nav>
          <nav aria-label="Products" className={col}>
            <p className={head}>Products</p>
            {products.map((p) => <Link key={p.slug} href={p.href} className={link}>{p.name}</Link>)}
          </nav>
          <nav aria-label="Resources" className={col}>
            <p className={head}>Resources</p>
            <Link href="/resources/case-studies" className={link}>Case studies</Link>
            <Link href="/resources/blog" className={link}>Blog</Link>
            <Link href="/resources/newsroom" className={link}>Newsroom</Link>
            <Link href="/partnerships/aws" className={link}>Partnerships</Link>
          </nav>
          <nav aria-label="Company" className={col}>
            <p className={head}>Company</p>
            <Link href="/company/about" className={link}>About us</Link>
            <Link href="/company/careers" className={link}>Careers</Link>
            <Link href="/contact" className={link}>Contact</Link>
            <a href={`mailto:${site.emails.sales}`} className={link}>{site.emails.sales}</a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={link}>{site.phone}</a>
          </nav>

          {/* newsletter (same CloudScape sign-up as the live site) */}
          <div id="newsletter" className="col-span-2 lg:col-span-1">
            <p className="text-base font-semibold text-white">Explore CloudScape, the Comprinno newsletter</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Cloud insights, proven patterns, deep dives and success stories, simplified for your next step.</p>
            <form action="/api/subscribe" method="post" className="mt-4 flex">
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input id="footer-email" name="email" type="email" required placeholder="Your work email" className="min-w-0 flex-1 border border-white/25 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/45 focus:border-[#ffbb00] focus:outline-none" />
              <button type="submit" className="shrink-0 bg-[#ffbb00] px-4 text-sm font-semibold text-[#0a134b] transition-colors hover:bg-[#ffcd3a]">Subscribe →</button>
            </form>
          </div>
        </div>
      </Container>

      {/* launch-to-ascent visual: its own band, so it never runs under the text */}
      <div className="pointer-events-none relative z-0 -mt-2 aspect-[4/1] w-full sm:-mt-8 lg:-mt-20" aria-hidden="true">
        <FooterArt />
      </div>

      <div className="relative z-10 border-t border-white/10 bg-[#050a2e]">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/60">
          <p>© 2026 Comprinno Technologies. All rights reserved.</p>
          <Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link>
        </Container>
      </div>
    </footer>
  );
}
