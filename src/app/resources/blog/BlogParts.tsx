import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import RainField from "@/components/RainField";
import ArtTile, { tileFor } from "@/components/ArtTile";

export type PostCard = { slug: string; title: string; topic: string; author: string; role: string; initials: string; publishedAt: string; date: string };

/** Coloured square per topic, as in the design */
export const topicDot: Record<string, string> = {
  Migration: "bg-[#006bc9]",
  Modernization: "bg-teal-500",
  "Security and compliance": "bg-rose-500",
  "Cost and FinOps": "bg-[#ffbb00]",
  Resilience: "bg-sky-400",
  "Generative AI": "bg-violet-500",
  "Industry insights": "bg-[#9aa8c4]",
};

export function TopicTag({ topic }: { topic: string }) {
  return <span className="cs-tag"><i className={topicDot[topic] ?? "bg-[#006bc9]"} />{topic}</span>;
}

export function Author({ name, role, initials, small = false }: { name: string; role: string; initials: string; small?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className={`grid shrink-0 place-items-center border border-[#c9e0f6] bg-[#e3f0fc] font-mono font-semibold text-[#006bc9] ${small ? "h-8 w-8 text-[0.65rem]" : "h-10 w-10 text-xs"}`}>{initials}</span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-ink">{name}</span>
        <span className="block truncate text-xs text-muted">{role}</span>
      </span>
    </span>
  );
}

export function PostCardView({ p, art }: { p: PostCard; art?: number }) {
  return (
    <Link href={`/resources/blog/${p.slug}`} className="card group flex h-full flex-col !p-0">
      <ArtTile variant={art ?? tileFor(p.slug)} fill className="aspect-[16/8] !border-0 !border-b !border-line" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <TopicTag topic={p.topic} />
          <time dateTime={p.publishedAt} className="font-mono text-[0.68rem] text-muted">{p.date}</time>
        </div>
        <h3 className="mt-3 line-clamp-3 font-semibold leading-snug text-ink transition-colors group-hover:text-[#006bc9]">{p.title}</h3>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Author name={p.author} role={p.role} initials={p.initials} small />
          <span className="go shrink-0 text-ink" aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}

/** CloudScape newsletter band (dark navy) */
export function Newsletter() {
  return (
    <section id="newsletter" className="relative scroll-mt-20 overflow-hidden border-y border-line bg-surface py-12 sm:py-14">
      <RainField />
      <Container className="relative">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <Eyebrow>CloudScape newsletter</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.1rem)] font-normal leading-tight text-ink">Cloud insights, proven patterns <strong className="font-semibold">and success stories.</strong></h2>
            <p className="mt-2 text-muted">Simplified for your next step. Delivered to your inbox.</p>
          </div>
          {/* TODO: connect to the newsletter tool. Until then the handler validates and thanks the visitor. */}
          <form action="/api/subscribe" method="post" className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="nl-email">Work email</label>
            <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="Your work email" className="min-h-12 flex-1 border border-line-strong bg-white px-4 text-ink placeholder:text-muted focus:border-ink focus:outline-none" />
            <button type="submit" className="btn btn-primary min-h-12">Subscribe <span className="go">→</span></button>
          </form>
        </div>
      </Container>
    </section>
  );
}
