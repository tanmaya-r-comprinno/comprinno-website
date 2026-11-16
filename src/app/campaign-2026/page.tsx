import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Campaigns 2026" };

/** Internal index of 2026 campaign pages. Add a row when a new campaign page is created. */
const campaigns = [
  { slug: "aws", name: "AWS Premier Tier", desc: "Build on AWS with a Premier Tier partner. Booking flow and AWS funding check.", status: "Low fidelity" },
];

export default function Campaigns() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-[.14em] text-neutral-500">Campaigns 2026</p>
      <h1 className="mt-3 text-3xl font-semibold text-neutral-900">Landing pages</h1>
      <ul className="mt-8 divide-y divide-neutral-200 border border-neutral-200">
        {campaigns.map((c) => (
          <li key={c.slug}>
            <Link href={`/campaign-2026/${c.slug}`} className="flex items-center justify-between gap-4 p-4 hover:bg-neutral-50">
              <span>
                <span className="block font-semibold text-neutral-900">{c.name}</span>
                <span className="block text-sm text-neutral-600">{c.desc}</span>
                <span className="mt-1 block font-mono text-xs text-neutral-400">/campaign-2026/{c.slug} · {c.status}</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
