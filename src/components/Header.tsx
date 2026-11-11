import Link from "next/link";
import { nav, site } from "@/lib/site";
import MobileNav from "./MobileNav";
import NavCloser from "./NavCloser";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-ink" aria-label={`${site.name} home`}>
      {/* paper-plane mark: placeholder until final logo */}
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M3 12.5L23 3l-6 20-4.5-7.5L3 12.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12.5 15.5L23 3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="text-lg font-semibold tracking-tight">{site.name}</span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop: pure CSS dropdowns. Open on hover, or on keyboard focus only, so a mouse click never pins one open. */}
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {nav.map((g) => (
            <div key={g.label} className="group relative">
              {g.href ? (
                <Link href={g.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-2 hover:bg-surface">
                  {g.label}
                  {g.items && <span className="ml-1 text-muted" aria-hidden="true">▾</span>}
                </Link>
              ) : (
                <button type="button" className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 hover:bg-surface">
                  {g.label} <span className="text-muted" aria-hidden="true">▾</span>
                </button>
              )}
              {g.items && (
                <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-md border border-line bg-bg p-2 shadow-sm">
                    {g.items.filter((i) => !i.hidden).map((i) => (
                      <Link key={i.href} href={i.href} className="block rounded-md px-3 py-2.5 hover:bg-surface">
                        <span className="flex items-center gap-2 text-sm font-medium text-ink">
                          {i.label}
                          {i.badge && <span className="border border-amber-400 bg-amber-50 px-1.5 py-px font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-amber-700">{i.badge}</span>}
                        </span>
                        {i.hint && <span className="block text-xs text-muted">{i.hint}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary hidden !min-h-10 sm:inline-flex">Talk to an expert</Link>
          <MobileNav nav={nav} />
          <NavCloser />
        </div>
      </div>
    </header>
  );
}
