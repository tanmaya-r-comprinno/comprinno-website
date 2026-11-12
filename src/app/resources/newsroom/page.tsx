import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { getAllNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press, announcements and milestones from Comprinno.",
  alternates: { canonical: "/resources/newsroom" },
};

const badgeColors: Record<string, string> = {
  award: "text-amber-700 bg-amber-50 border-amber-300",
  certification: "text-emerald-700 bg-emerald-50 border-emerald-300",
  partnership: "text-sky-700 bg-sky-50 border-sky-300",
  announcement: "text-violet-700 bg-violet-50 border-violet-300",
};

export default function NewsroomPage() {
  const news = getAllNews();

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Press and announcements"
        desc="Milestones, partnerships, certifications and press coverage."
      />

      <Section>
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {news.map((item) => {
            const type = item.frontmatter.newsType ?? "announcement";
            const colorClass = badgeColors[type] ?? badgeColors.announcement;
            return (
              <Link
                key={item.slug}
                href={`/resources/newsroom/${item.slug}`}
                className="card flex items-start gap-4 hover:border-line-strong"
              >
                <span
                  className={`tag shrink-0 mt-0.5 capitalize ${colorClass}`}
                >
                  {type}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-ink line-clamp-2 leading-snug">
                    {item.frontmatter.title}
                  </h2>
                  <time
                    dateTime={item.frontmatter.publishedAt}
                    className="mt-1 block text-xs text-muted"
                  >
                    {new Date(item.frontmatter.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <span className="shrink-0 text-sm text-muted go">→</span>
              </Link>
            );
          })}

          {news.length === 0 && (
            <p className="text-center text-muted py-16">No news items yet.</p>
          )}
        </div>
      </Section>

      <CtaBand
        title={<>Writing about <strong>Comprinno</strong>?</>}
        desc="Get in touch and we'll connect you with the right person."
        label="Contact us"
        href="/contact"
      />
    </>
  );
}
