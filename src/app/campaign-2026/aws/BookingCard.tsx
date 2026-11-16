"use client";

import { useState } from "react";

const goals = [
  { k: "AI agent", d: "Agents for production" },
  { k: "Migration", d: "Move to AWS" },
  { k: "Modernization", d: "Containers, serverless, data" },
  { k: "Managed services", d: "Run and secure AWS" },
  { k: "Funding check", d: "See what AWS can fund" },
  { k: "Something else", d: "Tell us on the call" },
];

const input = "mt-1 w-full border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none";

/** Hero booking card: two quick steps, then a plain POST to the contact handler. */
export default function BookingCard() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");

  return (
    <form id="book" action="/api/contact" method="post" className="scroll-mt-24 border border-neutral-300 bg-white">
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-1.5" aria-hidden="true">
          {[0, 1].map((i) => <span key={i} className={`h-1 ${i <= step ? "bg-neutral-900" : "bg-neutral-200"}`} />)}
        </div>
        <p className="mt-4 font-mono text-[.65rem] uppercase tracking-[.14em] text-neutral-500">Step {step + 1} of 2</p>

        {/* hidden fields the handler expects */}
        <input type="hidden" name="topic" value={goal} />
        <input type="hidden" name="source" value="/campaign-2026/aws" />
        <input type="hidden" name="country" value="Not asked" />
        <input type="hidden" name="consent" value="yes" />

        {/* Both steps share one grid cell, so the card always has the height of the taller step and the hero never jumps */}
        <div className="grid">
          {/* step 1 fills the shared height: the option tiles stretch, so there is no empty band */}
          <div className={`flex flex-col [grid-area:1/1] ${step === 0 ? "" : "invisible"}`} aria-hidden={step !== 0}>
            <h2 className="mt-1 text-xl font-semibold text-neutral-900">What do you want to build on AWS?</h2>
            <div className="mt-4 grid flex-1 auto-rows-fr grid-cols-2 gap-2">
              {goals.map((g) => (
                <button key={g.k} type="button" onClick={() => { setGoal(g.k); setStep(1); }}
                  className={`flex flex-col justify-center border p-3 text-left transition hover:border-neutral-900 ${goal === g.k ? "border-neutral-900 bg-neutral-100" : "border-neutral-300"}`}>
                  <span className="block text-sm font-semibold text-neutral-900">{g.k}</span>
                  <span className="block text-xs text-neutral-500">{g.d}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={`[grid-area:1/1] ${step === 1 ? "" : "invisible"}`} aria-hidden={step !== 1}>
            <h2 className="mt-1 text-xl font-semibold text-neutral-900">Where should we send the invite?</h2>
            <p className="mt-1 text-sm text-neutral-600">You picked <strong>{goal}</strong>. <button type="button" onClick={() => setStep(0)} className="text-neutral-500 underline underline-offset-2">Change</button></p>
            <input type="hidden" name="message" value={`Campaign: AWS 2026. Goal: ${goal}.`} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium text-neutral-900">Full name<input name="name" required autoComplete="name" className={input} /></label>
              <label className="text-sm font-medium text-neutral-900">Work email<input name="email" type="email" required autoComplete="email" className={input} /></label>
              <label className="text-sm font-medium text-neutral-900 sm:col-span-2">Company<input name="company" required autoComplete="organization" className={input} /></label>
            </div>
            <button type="submit" className="mt-4 w-full bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-700">Book my consultation →</button>
            <p className="mt-2 text-[.7rem] leading-snug text-neutral-500">By booking, you agree to our <a href="/privacy-policy" className="underline">privacy policy</a>.</p>
          </div>
        </div>

        <p className="mt-4 font-mono text-[.65rem] uppercase tracking-[.12em] text-neutral-500">2 quick steps · under a minute · no cost</p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-neutral-200 px-5 py-3 font-mono text-[.62rem] uppercase tracking-[.1em] text-neutral-600 sm:px-6">
        <span>✓ Your AWS accounts stay yours</span><span>✓ ISO 27001 · SOC 2 Type II</span><span>✓ No cost to talk</span>
      </div>
    </form>
  );
}
