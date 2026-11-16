"use client";

import { useState } from "react";

const questions = [
  { k: "where", q: "Where is your workload today?", options: ["On-premises", "Another cloud", "Already on AWS"] },
  { k: "type", q: "What kind of project is it?", options: ["Migration", "Generative AI", "Modernization"] },
  { k: "spend", q: "What is your annual AWS spend?", options: ["Under $50K", "$50K to $250K", "$250K to $1M", "Over $1M"] },
] as const;

type Answers = Partial<Record<(typeof questions)[number]["k"], string>>;

/**
 * Indicative only: names the AWS programs worth discussing for this kind of project.
 * TODO(owner): confirm program names and the matching rules with the AWS alliance team.
 */
function programsFor(a: Answers): string[] {
  const out: string[] = [];
  if (a.where !== "Already on AWS" || a.type === "Migration") out.push("AWS Migration Acceleration Program (MAP)");
  if (a.type === "Generative AI") out.push("AWS proof-of-concept funding for generative AI");
  if (a.type === "Modernization") out.push("AWS proof-of-concept funding for modernization");
  if (a.where === "Already on AWS") out.push("Well-Architected review and remediation support");
  return out.slice(0, 3);
}

export default function FundingCheck() {
  const [a, setA] = useState<Answers>({});
  const [booking, setBooking] = useState(false);
  const field = "w-full border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:border-white focus:outline-none";
  const done = questions.filter((q) => a[q.k]).length;
  const result = done === 3 ? programsFor(a) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="grid gap-6">
        {questions.map((q, i) => (
          <fieldset key={q.k}>
            <legend className="text-sm font-semibold text-neutral-900"><span className="mr-2 font-mono text-xs text-neutral-400">{String(i + 1).padStart(2, "0")}</span>{q.q}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((o) => (
                <button key={o} type="button" aria-pressed={a[q.k] === o} onClick={() => setA({ ...a, [q.k]: o })}
                  className={`border px-3 py-2 text-sm transition ${a[q.k] === o ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 text-neutral-900 hover:border-neutral-900"}`}>
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex min-h-[16rem] flex-col justify-between bg-neutral-900 p-6 text-white" aria-live="polite">
        <div>
          <p className="font-mono text-[.65rem] uppercase tracking-[.14em] text-neutral-400">Your result · {done} of 3 answered</p>
          {done < 3 ? (
            <p className="mt-3 text-lg font-semibold">Answer all three to see which AWS programs your project may qualify for.</p>
          ) : (
            <>
              <p className="mt-3 text-lg font-semibold">Your project may qualify for:</p>
              <ul className="mt-3 grid gap-2">
                {result.map((r) => <li key={r} className="border border-neutral-700 px-3 py-2 text-sm">✓ {r}</li>)}
              </ul>
              {!booking ? (
                <button type="button" onClick={() => setBooking(true)} className="mt-5 inline-block bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-200">Confirm on a 30-minute call →</button>
              ) : (
                // book right here, with the answers attached, instead of jumping back to the hero form
                <form action="/api/contact" method="post" className="mt-5 grid gap-2.5 border-t border-neutral-700 pt-5">
                  <input type="hidden" name="topic" value="Funding check" />
                  <input type="hidden" name="source" value="/campaign-2026/aws#funding" />
                  <input type="hidden" name="country" value="Not asked" />
                  <input type="hidden" name="consent" value="yes" />
                  <input type="hidden" name="message" value={`Funding check. Workload: ${a.where}. Project: ${a.type}. AWS spend: ${a.spend}. Suggested: ${result.join("; ")}.`} />
                  <p className="text-sm text-neutral-300">Where should we send the invite?</p>
                  <input name="name" required autoComplete="name" placeholder="Full name" aria-label="Full name" className={field} autoFocus />
                  <input name="email" type="email" required autoComplete="email" placeholder="Work email" aria-label="Work email" className={field} />
                  <input name="company" required autoComplete="organization" placeholder="Company" aria-label="Company" className={field} />
                  <button type="submit" className="mt-1 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-200">Book my 30-minute call →</button>
                  <p className="text-[.7rem] text-neutral-400">By booking, you agree to our <a href="/privacy-policy" className="underline">privacy policy</a>.</p>
                </form>
              )}
            </>
          )}
        </div>
        <p className="mt-6 text-xs text-neutral-400">Programs and credits depend on AWS eligibility and approval.</p>
      </div>
    </div>
  );
}
