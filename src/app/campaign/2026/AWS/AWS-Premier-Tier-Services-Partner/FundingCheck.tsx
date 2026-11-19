"use client";

import { useState } from "react";
import LineWave from "@/components/LineWave";

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
  const field = "w-full border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-[#a3a9d6] focus:border-[#ffbb00] focus:outline-none";
  const done = questions.filter((q) => a[q.k]).length;
  const result = done === 3 ? programsFor(a) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="grid content-start gap-6">
        {questions.map((q, i) => (
          <fieldset key={q.k}>
            <legend className="text-sm font-semibold text-neutral-900"><span className="mr-2 font-mono text-xs text-neutral-400">{String(i + 1).padStart(2, "0")}</span>{q.q}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((o) => (
                <button key={o} type="button" aria-pressed={a[q.k] === o} onClick={() => setA({ ...a, [q.k]: o })}
                  className={`border px-3 py-2 text-sm transition ${a[q.k] === o ? "border-[#006bc9] bg-[#006bc9] text-white" : "border-neutral-300 text-neutral-900 hover:border-[#006bc9] hover:bg-[#e3f0fc]"}`}>
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/* home-page closing band look: navy, moving line wave behind, yellow progress like the numbers band */}
      <div className="brand-dark relative flex flex-col justify-between overflow-hidden p-6 text-white sm:p-8" aria-live="polite">
        <div className="cta-wave" aria-hidden="true"><LineWave /></div>
        <div className="relative">
          <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
            {questions.map((q) => <span key={q.k} className={`h-[3px] transition-colors duration-500 ${a[q.k] ? "bg-[#ffbb00]" : "bg-white/20"}`} />)}
          </div>
          <p className="mt-4 font-mono text-[.65rem] uppercase tracking-[.14em] text-[#a3a9d6]">Your result · {done} of 3 answered</p>
          <div className="grid">
            {/* invisible copies of the two tallest states (booking form; two programs): hold the panel at a constant height */}
            <div className="invisible [grid-area:1/1]" aria-hidden="true">
              <p className="mt-3 text-xl font-semibold leading-snug">Book your 30-minute call</p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {[0, 1, 2].map((i) => <span key={i} className={`${field} block ${i === 2 ? "sm:col-span-2" : ""}`}>&nbsp;</span>)}
                <span className="btn btn-primary mt-1 sm:col-span-2">Book my 30-minute call →</span>
              </div>
            </div>
            <div className="invisible [grid-area:1/1]" aria-hidden="true">
              <p className="mt-3 text-xl font-semibold leading-snug">Your project may qualify for:</p>
              <ul className="mt-3 grid gap-2">
                {["AWS Migration Acceleration Program (MAP)", "AWS proof-of-concept funding for generative AI"].map((r) => <li key={r} className="flex gap-2 border px-3 py-2.5 text-sm"><span>✓</span>{r}</li>)}
              </ul>
              <span className="btn btn-primary mt-5">Confirm on a 30-minute call →</span>
            </div>
            <div className="[grid-area:1/1]">
              {done < 3 ? (
                <p className="mt-3 text-xl font-semibold leading-snug">Answer all three to see which AWS programs your project may qualify for.</p>
              ) : (
                <>
                  <p className="mt-3 text-xl font-semibold leading-snug">{booking ? "Book your 30-minute call" : "Your project may qualify for:"}</p>
                  <ul className={`mt-3 grid gap-2 ${booking ? "hidden" : ""}`}>
                    {result.map((r) => <li key={r} className="flex gap-2 border border-white/20 bg-white/5 px-3 py-2.5 text-sm"><span className="text-[#ffbb00]">✓</span>{r}</li>)}
                  </ul>
                  {!booking ? (
                    <button type="button" onClick={() => setBooking(true)} className="btn btn-primary mt-5">Confirm on a 30-minute call →</button>
                  ) : (
                    // book right here, with the answers attached, instead of jumping back to the hero form
                    <form action="/api/contact" method="post" className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      <input type="hidden" name="topic" value="Funding check" />
                      <input type="hidden" name="source" value="/campaign/2026/AWS/AWS-Premier-Tier-Services-Partner#funding" />
                      <input type="hidden" name="country" value="Not asked" />
                      <input type="hidden" name="consent" value="yes" />
                      <input type="hidden" name="message" value={`Funding check. Workload: ${a.where}. Project: ${a.type}. AWS spend: ${a.spend}. Suggested: ${result.join("; ")}.`} />
                      <input name="name" required autoComplete="name" placeholder="Full name" aria-label="Full name" className={field} autoFocus />
                      <input name="email" type="email" required autoComplete="email" placeholder="Work email" aria-label="Work email" className={field} />
                      <input name="company" required autoComplete="organization" placeholder="Company" aria-label="Company" className={`${field} sm:col-span-2`} />
                      <button type="submit" className="btn btn-primary mt-1 sm:col-span-2">Book my 30-minute call →</button>
                                          </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <p className="relative mt-6 text-xs text-[#a3a9d6]">Programs and credits depend on AWS eligibility and approval. By booking, you agree to our <a href="/privacy-policy" className="underline">privacy policy</a>.</p>
      </div>
    </div>
  );
}
