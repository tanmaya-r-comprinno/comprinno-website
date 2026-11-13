"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavGroup } from "@/lib/site";

/**
 * The only client component in the shell. Native <details> does the toggling;
 * `key={pathname}` remounts it so the menu closes after navigation.
 */
export default function MobileNav({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname();
  return (
    <details key={pathname} className="group xl:hidden">
      <summary
        aria-label="Menu"
        className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-line-strong [&::-webkit-details-marker]:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path className="group-open:hidden" d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path className="hidden group-open:block" d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col border-t border-line bg-bg">
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-6">
          {nav.map((g) => (
            <div key={g.label} className="border-b border-line py-4">
              {g.href ? (
                <Link href={g.href} className="flex items-center justify-between text-base font-semibold text-ink">
                  {g.label}
                  <span aria-hidden="true" className="text-[#006bc9]">→</span>
                </Link>
              ) : (
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-[#006bc9]">{g.label}</p>
              )}
              {g.items && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {g.items.filter((i) => !i.hidden).map((i) => (
                    <Link key={i.href} href={i.href} className="nav-mobile-item flex flex-col items-start border border-line bg-surface px-3 py-2.5 text-left">
                      <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                        {i.label}
                        {i.badge && <span className="border border-amber-400 bg-amber-50 px-1.5 py-px font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-amber-700">{i.badge}</span>}
                      </span>
                      {i.hint && <span className="mt-0.5 text-xs leading-snug text-muted">{i.hint}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="border-t border-line bg-bg p-4">
          <Link href="/contact" className="btn btn-primary w-full">Talk to an expert →</Link>
        </div>
      </div>
    </details>
  );
}
