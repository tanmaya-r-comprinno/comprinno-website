import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container, PageHero } from "@/components/ui";
import { intro, sections, updated, type Block } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Comprinno collects, uses, shares and protects your personal data, and how to contact us about it.",
  alternates: { canonical: "/privacy-policy" },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Turn [[text]](url) into links. */
function rich(t: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[\[([^\]]+)\]\]\(([^)]+)\)/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(t))) {
    out.push(t.slice(last, m.index));
    const ext = m[2].startsWith("http") && !m[2].includes("comprinno.net");
    out.push(<a key={i++} href={m[2]} className="text-[#006bc9] underline underline-offset-4 hover:text-[#0A134B]" {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{m[1]}</a>);
    last = m.index + m[0].length;
  }
  out.push(t.slice(last));
  return out;
}

/** "Term: definition" list items get a bold term. */
function item(t: string) {
  const m = t.match(/^([^:]{2,45}):\s(.+)$/);
  return m && !m[1].includes("[[") ? <><strong className="font-semibold text-ink">{m[1]}:</strong> {rich(m[2])}</> : rich(t);
}

function Blocks({ blocks }: { blocks: Block[] }) {
  const out: ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.k === "li") {
      const items: Block[] = [];
      while (i < blocks.length && blocks[i].k === "li") items.push(blocks[i++]);
      i--;
      out.push(
        <ul key={i} className="mt-3 grid gap-2">
          {items.map((x) => (
            <li key={x.t} className="relative pl-5 text-[.95rem] leading-relaxed text-muted before:absolute before:left-0 before:top-[.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#006bc9]">{item(x.t)}</li>
          ))}
        </ul>,
      );
    } else if (b.k === "h3") out.push(<h3 key={i} className="mt-7 text-lg font-semibold text-ink">{rich(b.t)}</h3>);
    else if (b.k === "h4") out.push(<h4 key={i} className="mt-5 font-mono text-xs uppercase tracking-[.12em] text-[#006bc9]">{rich(b.t)}</h4>);
    else out.push(<p key={i} className="mt-3 text-[.95rem] leading-relaxed text-muted">{rich(b.t)}</p>);
  }
  return <>{out}</>;
}

export default function PrivacyPage() {
  return (
    <div className="brand">
      <PageHero eyebrow="Legal" title="Privacy policy" desc={`How we collect, use and protect your personal data. Last updated ${updated.replace(/ /g, " ")}.`} />
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
          {/* contents: sticky on desktop */}
          <nav aria-label="On this page" className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[.14em] text-muted">On this page</p>
            <ol className="mt-4 grid gap-1 border-l border-line">
              {sections.map((s, n) => (
                <li key={s.title}>
                  <a href={`#${slug(s.title)}`} className="-ml-px flex gap-2 border-l-2 border-transparent py-1 pl-3 text-sm text-muted transition hover:border-[#006bc9] hover:text-ink">
                    <span className="font-mono text-xs text-[#006bc9]">{String(n + 1).padStart(2, "0")}</span>{s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0">
            <div className="border-l-2 border-[#FFBB00] pl-5">
              <Blocks blocks={intro} />
            </div>
            {sections.map((s, n) => (
              <section key={s.title} id={slug(s.title)} className="scroll-mt-24 border-t border-line pt-8 mt-10 first-of-type:mt-12">
                <h2 className="flex items-baseline gap-3 text-[clamp(1.3rem,2.4vw,1.75rem)] font-semibold text-ink">
                  <span className="font-mono text-sm text-[#006bc9]">{String(n + 1).padStart(2, "0")}</span>{s.title}
                </h2>
                <Blocks blocks={s.blocks} />
              </section>
            ))}
          </article>
        </div>
      </Container>
    </div>
  );
}
