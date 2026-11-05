import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { partnerPages } from "@/content/products";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Comprinno partners with AWS, OpenAI, ElevenLabs and MongoDB.",
  alternates: { canonical: "/partnerships" },
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHero eyebrow="Partnerships" title="Built with the best in cloud and AI" desc="Four partnerships, one stack." />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {partnerPages.map((p) => (
            <Link key={p.slug} href={p.href} className="card group flex flex-col">
              {/* logo slot: replace with partner logo in hi-fi */}
              <div className="flex h-28 items-center justify-center rounded-md border border-dashed border-line-strong bg-surface">
                <Icon name={p.icon} className="mr-3 h-8 w-8 text-ink-2" />
                <span className="text-2xl font-semibold text-ink">{p.name}</span>
              </div>
              <span className="tag mt-5 self-start">{p.badge}</span>
              <p className="mt-3 text-sm text-muted">{p.desc}</p>
              <span className="mt-auto pt-5 text-sm font-medium text-ink">View partnership <span className="go">→</span></span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
