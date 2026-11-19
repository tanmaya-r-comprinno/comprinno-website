"use client";

import { useState } from "react";

const buyers = [
  {
    id: "ananya", seg: "Series B fintech", mood: "Busy", name: "Ananya Rao", role: "CTO", initials: "AR",
    co: "PayLattice · payments platform (fictional)",
    found: ["Hiring 4 platform engineers this quarter", "Core ledger still runs on-premise", "Regulatory audit due in six months"],
    goal: "Book a 30-minute assessment call", watch: "We already have a cloud partner.",
  },
  {
    id: "rohan", seg: "SaaS ISV", mood: "Skeptical", name: "Rohan Mehta", role: "VP Engineering", initials: "RM",
    co: "StackNimbus · B2B analytics SaaS (fictional)",
    found: ["AWS bill grew 60% in the last year", "Planning an AI assistant inside the product", "Two senior DevOps engineers left recently"],
    goal: "Book a 30-minute cost and architecture review", watch: "We can do this ourselves.",
  },
  {
    id: "meera", seg: "Healthcare", mood: "Curious", name: "Meera Iyer", role: "Head of Data", initials: "MI",
    co: "CareGrid · diagnostics network (fictional)",
    found: ["Opening 40 new collection centres this year", "Reports still compiled by hand each week", "Exploring GenAI for report summaries"],
    goal: "Book a 30-minute data and AI discovery call", watch: "Patient data can't leave our systems.",
  },
];

const mono = "font-mono text-[.62rem] uppercase tracking-[.12em] text-neutral-500";

/** Buyer picker + AI brief. The voice agent is not connected yet, so the call button shows a placeholder state. */
export default function MockCall() {
  const [id, setId] = useState(buyers[0].id);
  const [started, setStarted] = useState(false);
  const b = buyers.find((x) => x.id === id)!;

  return (
    <div className="grid border border-neutral-300 bg-white lg:grid-cols-[2fr_3fr]">
      <div className="border-b border-neutral-300 p-5 lg:border-b-0 lg:border-r">
        <p className={mono}>01 · Pick your buyer</p>
        <div className="mt-4 grid gap-2">
          {buyers.map((x) => (
            <button key={x.id} type="button" onClick={() => { setId(x.id); setStarted(false); }}
              className={`border p-3 text-left transition ${x.id === id ? "border-[#006bc9] bg-[#e3f0fc] [box-shadow:inset_3px_0_0_#006bc9]" : "border-neutral-300 hover:border-[#006bc9]"}`}>
              <span className="flex items-center justify-between gap-2">
                <span className={mono}>{x.seg}</span>
                <span className="border border-neutral-300 px-1.5 py-0.5 font-mono text-[.6rem] text-neutral-600">{x.mood}</span>
              </span>
              <span className="mt-1 block text-sm font-semibold text-neutral-900">{x.name} · {x.role}</span>
              <span className="block text-xs text-neutral-500">{x.co}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">Fictional buyers and companies, played by our voice agent. Each one has a real objection waiting for you.</p>
      </div>

      <div className="flex flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={mono}>02 · Your AI-prepared brief</p>
          <span className="border border-[#b7e4c7] bg-[#e3f6ec] px-2 py-0.5 font-mono text-[.58rem] uppercase tracking-[.1em] text-[#11804a]">Research done in seconds, not hours</span>
        </div>
        {/* every buyer's brief sits in the same grid cell, so the card keeps the height of the longest one */}
        <div className="grid">
          {buyers.map((x) => (
            <div key={x.id} className={`[grid-area:1/1] ${x.id === id ? "" : "invisible"}`} aria-hidden={x.id !== id}>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#c9e0f6] bg-[#e3f0fc] text-sm font-semibold text-[#006bc9]">{x.initials}</span>
                <div>
                  <p className="text-lg font-semibold text-neutral-900">{x.name}, {x.role}</p>
                  <p className="text-sm text-neutral-500">{x.co}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="border border-neutral-300 p-4">
                  <p className={mono}>What the AI found</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-800">{x.found.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
                <div className="border border-neutral-300 p-4">
                  <p className={mono}>Your goal</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">{x.goal}</p>
                  <p className={`${mono} mt-3`}>Watch out for</p>
                  <p className="mt-1 text-sm italic text-[#c0362c]">“{x.watch}”</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-neutral-200 pt-4 lg:mt-6">
          <p className="text-xs text-neutral-500">About 5 minutes. Uses your microphone. The call is recorded so our sales team can review it with your application.</p>
          <button type="button" onClick={() => setStarted(true)} className="btn btn-primary mt-3">
            ☏ Start the call with {b.name.split(" ")[0]}
          </button>
          {/* always takes its space (hidden until clicked), so the card height never changes */}
          <p role="status" className={`mt-3 ${started ? "" : "invisible"} border border-dashed border-neutral-400 p-3 font-mono text-[.65rem] uppercase tracking-[.1em] text-neutral-600`}>
            Placeholder · voice agent not connected yet
          </p>
        </div>
      </div>
    </div>
  );
}
