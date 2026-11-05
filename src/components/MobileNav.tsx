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
      <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg px-4 pb-6 pt-2 shadow-sm">
        {nav.map((g) => (
          <div key={g.label} className="border-b border-line py-3">
            {g.href ? (
              <Link href={g.href} className="block py-2 text-base font-medium text-ink">{g.label}</Link>
            ) : (
              <p className="py-2 font-mono text-xs uppercase tracking-wider text-muted">{g.label}</p>
            )}
            {g.items && (
              <div className="grid gap-1 pl-3">
                {g.items.map((i) => (
                  <Link key={i.href} href={i.href} className="py-2 text-sm text-ink-2">{i.label}</Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link href="/contact" className="btn btn-primary mt-5 w-full">Talk to an expert</Link>
      </div>
    </details>
  );
}
