import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Button, CtaBand, Section } from "@/components/ui";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.frontmatter.title,
    description: cs.frontmatter.description,
    alternates: { canonical: `/resources/case-studies/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const { frontmatter: fm, content } = cs;

  return (
    <>
      {/* Hero */}
      <section className="hero-block border-b border-line">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/resources/case-studies" className="hover:text-ink transition-colors">
              Case studies
            </Link>
            <span>/</span>
            <span className="text-ink">{fm.industry ?? fm.client}</span>
          </div>

          <span className="tag">{fm.industry ?? "AWS"}</span>
          <h1 className="mt-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-[1.2]">
            {fm.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{fm.description}</p>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            {fm.client && <span className="font-semibold text-ink">{fm.client}</span>}
            {fm.publishedAt && (
              <time dateTime={fm.publishedAt}>
                {new Date(fm.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
          </div>

          {/* Solutions tags */}
          {fm.solutions && fm.solutions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {fm.solutions.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          )}

          {/* Results highlights */}
          {fm.results && fm.results.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {fm.results.map((r) => (
                <div key={r} className="card text-center">
                  <p className="text-sm font-semibold text-ink">{r}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full content */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-slate prose-lg max-w-none
            prose-headings:tracking-tight
            prose-a:text-ink prose-a:underline hover:prose-a:no-underline
            prose-code:before:content-none prose-code:after:content-none
            prose-code:bg-surface prose-code:px-1 prose-code:py-0.5 prose-code:text-sm
            prose-pre:bg-surface prose-pre:border prose-pre:border-line">
            <MDXRemote
              source={content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>

          <div className="mt-10 border-t border-line pt-6">
            <Button href="/resources/case-studies" variant="ghost">
              ← All case studies
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title={<>Facing a <strong>similar challenge</strong>?</>}
        desc="Talk to the team that delivered this project."
      />
    </>
  );
}
