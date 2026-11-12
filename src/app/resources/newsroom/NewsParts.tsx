import Link from "next/link";
import NewsBanner from "@/components/NewsBanner";

export const kindDot: Record<string, string> = {
  Competency: "bg-[#006bc9]",
  "Service delivery": "bg-teal-500",
  Partnership: "bg-violet-500",
  Agreement: "bg-[#ffbb00]",
  Certification: "bg-rose-500",
  Product: "bg-sky-400",
};

export function KindTag({ kind }: { kind: string }) {
  return <span className="cs-tag"><i className={kindDot[kind] ?? "bg-[#006bc9]"} />{kind}</span>;
}

export type NewsRow = { slug: string; title: string; kind: string; date: string; dateLabel: string; image?: string };

/** One release as a card: the official badge leads, then type, date and title */
export function NewsRowView({ r }: { r: NewsRow }) {
  return (
    <li>
      <Link href={`/resources/newsroom/${r.slug}`} className="news-card group">
        <span className="news-media">
          <NewsBanner title={r.title} kind={r.kind} className="transition duration-500 group-hover:scale-105" />
        </span>
        <span className="flex flex-1 flex-col p-5">
          <span className="flex items-center justify-between gap-3">
            <KindTag kind={r.kind} />
            <time dateTime={r.date} className="font-mono text-[0.68rem] text-muted">{r.dateLabel}</time>
          </span>
          <span className="mt-3 block font-semibold leading-snug text-ink transition-colors group-hover:text-[#006bc9]">{r.title}</span>
          <span className="mt-auto pt-4 text-sm font-medium text-ink">Read the release <span className="go">→</span></span>
        </span>
      </Link>
    </li>
  );
}
