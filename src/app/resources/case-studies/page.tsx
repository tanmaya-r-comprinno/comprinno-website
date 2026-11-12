import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { getAllCaseStudies, getCaseStudyIndustries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Real results from cloud migration, modernization, managed operations and AI projects.",
  alternates: { canonical: "/resources/case-studies" },
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();
  const industries = getCaseStudyIndustries();

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Results from the field"
        desc={`${caseStudies.length}+ migrations, modernizations, managed operations and AI projects.`}
      />

      <Section>
        <SectionHead
          eyebrow="Results"
          title="Production results, not pilots."
          desc="Real outcomes from teams we have worked with."
        />

        {/* Industry filter */}
        {industries.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {industries.slice(0, 10).map((ind) => (
              <span key={ind} className="tag">{ind}</span>
            ))}
          </div>
        )}

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/resources/case-studies/${cs.slug}`}
              className="card flex flex-col"
            >
              <span className="tag self-start">{cs.frontmatter.industry ?? cs.frontmatter.category ?? "AWS"}</span>
              <h2 className="mt-3 text-base font-semibold leading-snug line-clamp-3 flex-1">
                {cs.frontmatter.title}
              </h2>
              {cs.frontmatter.client && (
                <p className="mt-2 text-sm font-medium text-ink-2">{cs.frontmatter.client}</p>
              )}
              <p className="mt-1 text-sm leading-relaxed text-muted line-clamp-2">
                {cs.frontmatter.description}
              </p>
              {cs.frontmatter.results && cs.frontmatter.results.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {cs.frontmatter.results.slice(0, 2).map((r) => (
                    <span key={r} className="tag text-[0.65rem]">{r}</span>
                  ))}
                </div>
              )}
              <span className="mt-auto pt-4 text-sm font-medium text-ink">
                Read more <span className="go">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title={<>Want results <strong>like these</strong>?</>}
        desc="Tell us about your project and we'll show you what's possible."
      />
    </>
  );
}
