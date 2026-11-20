"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Eyebrow } from "@/components/ui";
import { getHiringManager, linkedinHandle, type HiringManager } from "./keka";

/**
 * SDR application, shown as a modal after the mock call.
 * Left: the candidate's call scorecard and what happens next. Right: a three-step form
 * mirroring the Keka careers fields. Wire `send` to the Keka API once it's available.
 */

export type CallSummary = { buyer: string; verdict: string; total: number; seconds: number; booked: boolean };

type Exp = { company: string; title: string; from: string; to: string; current: boolean };
type Edu = { school: string; degree: string; year: string };

const ROLE = { title: "Sales Development Representative", exp: "1–3 yrs", loc: "Pune / Bangalore", type: "Full-time" };
const STEPS = ["About you", "Your background", "Finish up"];
const FILE_TYPES = ".doc,.docx,.pdf,.rtf,.odt";
const MAX = 10 * 1024 * 1024;
const SUGGESTED = ["Outbound prospecting", "Cold calling", "LinkedIn Sales Navigator", "HubSpot", "Salesforce", "Email sequencing", "Discovery calls", "Objection handling", "AWS basics"];
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const CSS = `
@keyframes am-in { from { opacity: 0; transform: translateY(14px) scale(.985) } to { opacity: 1; transform: none } }
@keyframes am-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes am-step { from { opacity: 0; transform: translateX(var(--dir, 18px)) } to { opacity: 1; transform: none } }
@keyframes am-ring { from { stroke-dashoffset: var(--len) } }
@keyframes am-pop { 0% { transform: scale(.4); opacity: 0 } 60% { transform: scale(1.12); opacity: 1 } 100% { transform: scale(1) } }
.am-overlay { animation: am-fade .25s ease both }
.am-panel { animation: am-in .45s cubic-bezier(.2,.8,.2,1) both }
.am-step { animation: am-step .4s cubic-bezier(.2,.8,.2,1) both }
.am-ring { animation: am-ring 1.4s .3s cubic-bezier(.2,.8,.2,1) both }
.am-pop { animation: am-pop .6s cubic-bezier(.2,.8,.2,1) both }
@keyframes am-drift { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-28px,22px) scale(1.12) } }
@keyframes am-rise { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
.am-drift { animation: am-drift 12s ease-in-out infinite }
.am-rise { animation: am-rise .6s .15s cubic-bezier(.2,.8,.2,1) both }
.am-rise-2 { animation: am-rise .6s .3s cubic-bezier(.2,.8,.2,1) both }
.am-rise-3 { animation: am-rise .6s .45s cubic-bezier(.2,.8,.2,1) both }
@keyframes am-ripple { 0% { r: 34px; opacity: .45 } 100% { r: 60px; opacity: 0 } }
@keyframes am-draw { from { stroke-dashoffset: var(--l) } to { stroke-dashoffset: 0 } }
.am-ripple { opacity: 0; animation: am-ripple 1.6s cubic-bezier(.2,.7,.3,1) 1 both }
.am-draw-ring { --l: 277; stroke-dasharray: 277; animation: am-draw 1s cubic-bezier(.6,0,.2,1) both }
.am-draw-check { --l: 42; stroke-dasharray: 42; animation: am-draw .4s .85s cubic-bezier(.6,0,.3,1) both }
.am-field { position: relative }
.am-field input, .am-field select { height: 2.85rem; width: 100%; border: 1px solid #d4d4d8; background: #fff; padding: 1rem .8rem .25rem; font-size: .85rem; color: #0a134b; outline: none; transition: border-color .2s, box-shadow .2s; border-radius: 0; appearance: none }
.am-field select { background-image: linear-gradient(45deg, transparent 50%, #71717a 50%), linear-gradient(135deg, #71717a 50%, transparent 50%); background-position: calc(100% - 18px) 55%, calc(100% - 13px) 55%; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 2rem }
.am-field input:hover, .am-field select:hover { border-color: #a1a1aa }
.am-field input:focus, .am-field select:focus { border-color: var(--brand-blue); box-shadow: 0 0 0 4px rgb(0 107 201 / .12) }
.am-field label { position: absolute; left: .8rem; top: .85rem; font-size: .85rem; color: #71717a; pointer-events: none; transition: all .18s ease; transform-origin: left top }
.am-field input:focus + label, .am-field input:not(:placeholder-shown) + label, .am-field select + label, .am-field.is-fixed label { top: .38rem; font-size: .65rem; letter-spacing: .02em; color: var(--brand-blue); font-weight: 500 }
.am-field input:not(:focus):not(:placeholder-shown) + label, .am-field select:not(:focus) + label { color: #71717a }
.am-field.is-bad input, .am-field.is-bad select { border-color: #dc2626; box-shadow: 0 0 0 4px rgb(220 38 38 / .08) }
.am-field input[type=date]:not(:focus):invalid { color: transparent }
@media (prefers-reduced-motion: reduce) { .am-overlay, .am-panel, .am-step, .am-ring, .am-pop, .am-drift, .am-rise, .am-rise-2, .am-rise-3, .am-ripple, .am-draw-ring, .am-draw-check { animation: none !important } }
`;

/* ---------- small building blocks ---------- */

function F({ label, name, req, type = "text", bad, className = "", ...rest }: {
  label: string; name: string; req?: boolean; type?: string; bad?: boolean; className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`am-field ${bad ? "is-bad" : ""} ${className}`}>
      <input id={`am-${name}`} name={name} type={type} placeholder=" " required={req} {...rest} />
      <label htmlFor={`am-${name}`}>{label}{req && <span className="text-red-500"> *</span>}</label>
    </div>
  );
}

function S({ label, name, req, bad, options, className = "", ...rest }: {
  label: string; name: string; req?: boolean; bad?: boolean; options: string[]; className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={`am-field ${bad ? "is-bad" : ""} ${className}`}>
      <select id={`am-${name}`} name={name} required={req} defaultValue="" {...rest}>
        <option value="" disabled>Select</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <label htmlFor={`am-${name}`}>{label}{req && <span className="text-red-500"> *</span>}</label>
    </div>
  );
}

function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="text-[0.92rem] font-semibold !text-[var(--brand-navy)]">{title}</h3>
        {note && <span className="text-xs text-neutral-500">{note}</span>}
      </div>
      {children}
    </section>
  );
}

const Icon = {
  doc: <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>,
  up: <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></svg>,
  check: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>,
  x: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>,
};

/* ---------- left panel: the call, as a scorecard ---------- */

function ScoreRing({ value, max = 25, label }: { value: number; max?: number; label?: string }) {
  const r = 52, len = 2 * Math.PI * r, pct = Math.max(0, Math.min(1, value / max));
  return (
    <div className="relative h-[5.5rem] w-[5.5rem] shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e6ecf5" strokeWidth="7" />
        {pct > 0 && <circle cx="60" cy="60" r={r} fill="none" stroke="var(--brand-blue)" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={len} strokeDashoffset={len * (1 - pct)} className="am-ring" style={{ "--len": len } as React.CSSProperties} />}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-[1.6rem] font-semibold leading-none tabular-nums text-[var(--brand-navy)]">{label ?? value}</p>
          <p className="mt-1 text-[0.65rem] tabular-nums text-neutral-400">of {max}</p>
        </div>
      </div>
    </div>
  );
}

function Aside({ call, step }: { call?: CallSummary; step: number }) {
  const next = [
    { t: "Hiring team listens to your call", d: "Within 2 working days" },
    { t: "30-min chat with a sales lead", d: "Video, at a time you pick" },
    { t: "Offer", d: "We move fast for strong calls" },
  ];
  const empty = !call || call.seconds < 5;
  return (
    <aside className="relative hidden overflow-hidden border-r border-neutral-200 bg-[var(--brand-snow)] px-7 py-8 lg:flex lg:flex-col">
      {/* one slow brand-blue light, very faint */}
      <span aria-hidden="true" className="am-drift pointer-events-none absolute -right-40 -top-40 h-[26rem] w-[26rem]"
        style={{ background: "radial-gradient(circle, rgb(0 136 255 / .12), transparent 65%)" }} />

      <div className="am-rise relative">
        <Eyebrow>Apply with your call</Eyebrow>
        <h2 className="mt-4 text-[1.45rem] font-semibold leading-[1.15] tracking-tight !text-[var(--brand-navy)]">{ROLE.title}</h2>
        <p className="mt-2 text-sm text-neutral-500">{ROLE.exp} · {ROLE.loc} · {ROLE.type}</p>
      </div>

      {call && (
        <div className="am-rise-2 relative mt-7 border border-neutral-200 bg-white p-5 shadow-[0_1px_2px_rgb(10_19_75_/_.04),0_12px_32px_-16px_rgb(10_19_75_/_.18)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-neutral-500">Your call</p>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
              <svg viewBox="0 0 8 8" className="h-1.5 w-1.5" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor" /></svg>Attached
            </span>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <ScoreRing value={empty ? 0 : call.total} label={empty ? "—" : undefined} />
            <div className="min-w-0">
              <p className="text-[0.98rem] font-semibold leading-snug text-[var(--brand-navy)]">{empty ? "Too short to score" : call.verdict}</p>
              <p className="mt-1 text-xs leading-snug text-neutral-500">
                {empty ? "You can still apply. A full call helps us most." : "Scored across 5 sales skills"}
              </p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-3 border-t border-neutral-100 pt-3.5 text-center">
            {[
              { k: "Buyer", v: call.buyer.split(" ")[0] },
              { k: "Length", v: mmss(call.seconds) },
              { k: "Meeting", v: call.booked ? "Booked" : "—", hi: call.booked },
            ].map((s, i) => (
              <div key={s.k} className={i ? "border-l border-neutral-100" : ""}>
                <dt className="text-[0.68rem] text-neutral-400">{s.k}</dt>
                <dd className={`mt-0.5 truncate px-1 text-sm font-semibold tabular-nums ${s.hi ? "text-[var(--brand-blue)]" : "text-[var(--brand-navy)]"}`}>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="am-rise-3 relative mt-auto pt-8">
        <p className="text-xs font-medium text-neutral-500">What happens next</p>
        <ol className="relative mt-4">
          <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-2 w-px bg-neutral-200" />
          {next.map((n, i) => {
            const live = i === 0 && step === 2;
            return (
              <li key={n.t} className="relative flex gap-4 pb-5 last:pb-0">
                <svg viewBox="0 0 12 12" className="relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0" aria-hidden="true">
                  <circle cx="6" cy="6" r="5" fill={i === 0 ? (live ? "var(--brand-yellow)" : "var(--brand-blue)") : "#fff"} stroke={i === 0 ? "none" : "#c7cdd9"} strokeWidth="1.5" />
                </svg>
                <div>
                  <p className={`text-[0.88rem] font-medium leading-snug ${i === 0 ? "text-[var(--brand-navy)]" : "text-neutral-600"}`}>{n.t}</p>
                  <p className="mt-0.5 text-xs text-neutral-400">{n.d}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}

/* ---------- success ---------- */

const LinkedInIcon = <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>;
const MailIcon = <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>;

function ManagerCard({ m }: { m: HiringManager | null }) {
  const [copied, setCopied] = useState(false);
  if (!m) {
    return (
      <div className="flex items-center gap-4 border border-neutral-200 p-4" aria-busy="true">
        <span className="h-14 w-14 shrink-0 animate-pulse bg-neutral-200" />
        <div className="flex-1 space-y-2"><span className="block h-3.5 w-1/2 animate-pulse bg-neutral-200" /><span className="block h-3 w-2/3 animate-pulse bg-neutral-100" /></div>
      </div>
    );
  }
  const initials = m.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const copy = async () => {
    try { await navigator.clipboard.writeText(m.email); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* clipboard blocked: the mailto link still works */ }
  };
  return (
    <div className="am-rise-2 border border-neutral-200 text-left">
      <div className="flex items-center gap-4 p-4">
        {m.photo
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={m.photo} alt="" className="h-14 w-14 shrink-0 object-cover" />
          : <span className="grid h-14 w-14 shrink-0 place-items-center bg-[var(--brand-navy)] text-lg font-semibold text-white">{initials}</span>}
        <div className="min-w-0">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--brand-blue)]">Your hiring manager</p>
          <p className="mt-0.5 truncate text-[0.95rem] font-semibold text-[var(--brand-navy)]">{m.name}</p>
          <p className="truncate text-xs text-neutral-500">{m.title}</p>
        </div>
      </div>
      <div className="grid border-t border-neutral-200">
        <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
          className="group flex min-w-0 items-center gap-2.5 px-4 py-3 text-sm text-neutral-700 transition-colors hover:bg-[#f4f9fe] hover:text-[#0a66c2]">
          <span className="text-[#0a66c2]">{LinkedInIcon}</span>
          <span className="truncate">@{linkedinHandle(m.linkedin)}</span>
          <span className="ml-auto text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#0a66c2]">↗</span>
        </a>
        <div className="flex min-w-0 items-center border-t border-neutral-200">
          <a href={`mailto:${m.email}?subject=${encodeURIComponent("SDR application")}`}
            className="flex min-w-0 flex-1 items-center gap-2.5 py-3 pl-4 text-sm text-neutral-700 transition-colors hover:text-[var(--brand-blue)]">
            <span className="text-[var(--brand-blue)]">{MailIcon}</span><span className="truncate">{m.email}</span>
          </a>
          <button type="button" onClick={copy} className="shrink-0 px-3 py-3 text-xs font-medium text-neutral-500 transition-colors hover:text-[var(--brand-blue)]" aria-live="polite">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Success({ onClose, name, manager }: { onClose: () => void; name: string; manager: HiringManager | null }) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="am-done" tabIndex={-1}
      className="am-panel relative w-full max-w-md overflow-hidden bg-white shadow-[0_40px_120px_-20px_rgb(5_10_46_/_.5)] outline-none">
      {/* light header: one ring draws in, check draws, a single soft pulse */}
      <div className="relative flex flex-col items-center overflow-hidden border-b border-neutral-100 bg-[linear-gradient(180deg,var(--brand-snow),#fff)] px-6 pb-7 pt-10">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--brand-blue)] via-[var(--brand-sky)] to-[var(--brand-yellow)]" />
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 grid h-9 w-9 place-items-center text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900">{Icon.x}</button>

        <svg viewBox="0 0 120 120" className="h-[5.5rem] w-[5.5rem] overflow-visible" aria-hidden="true">
          <circle cx="60" cy="60" r="34" fill="none" stroke="var(--brand-blue)" strokeWidth="1" className="am-ripple" style={{ animationDelay: "1.1s" }} />
          <circle cx="60" cy="60" r="44" fill="none" stroke="#e3ecf8" strokeWidth="2" />
          <circle cx="60" cy="60" r="44" fill="none" stroke="var(--brand-blue)" strokeWidth="2.5" strokeLinecap="round" className="am-draw-ring" transform="rotate(-90 60 60)" />
          <circle cx="60" cy="60" r="34" fill="var(--brand-navy)" className="am-pop" style={{ animationDelay: ".6s", transformOrigin: "60px 60px" }} />
          <path d="M46 61 l9.5 9.5 l19 -20" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="am-draw-check" />
        </svg>

        <p className="am-rise-3 mt-4 inline-flex items-center gap-2 text-xs text-neutral-500">
          <svg viewBox="0 0 8 8" className="h-1.5 w-1.5" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="#10b981" /></svg>Delivered to the hiring team
        </p>
      </div>

      <div className="px-6 pb-6 pt-6 text-center sm:px-8">
        <h3 id="am-done" className="am-rise text-2xl font-semibold tracking-tight !text-[var(--brand-navy)]">Application sent{name ? `, ${name}` : ""}!</h3>
        <p className="am-rise mx-auto mt-2 max-w-xs text-sm text-neutral-600">Your call and details are with the team. We reply to every applicant within five working days.</p>
        <div className="mt-6"><ManagerCard m={manager} /></div>
        <p className="am-rise-3 mt-3 text-xs text-neutral-500">Have a question meanwhile? Say hi on LinkedIn or drop an email.</p>
        <button type="button" onClick={onClose} className="am-rise-3 mt-6 w-full bg-[var(--brand-yellow)] py-3 text-sm font-semibold text-[#1c1c1c] transition-colors hover:bg-[var(--brand-ochre)]">Done</button>
      </div>
    </div>
  );
}

/* ---------- the modal ---------- */

export default function ApplyModal({ open, onClose, call }: { open: boolean; onClose: () => void; call?: CallSummary }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [resume, setResume] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [docs, setDocs] = useState<File[]>([]);
  const [exps, setExps] = useState<Exp[]>([]);
  const [edus, setEdus] = useState<Edu[]>([]);
  const [skills, setSkills] = useState<string[]>(["Outbound prospecting", "Cold calling"]);
  const [skill, setSkill] = useState("");
  const [consent, setConsent] = useState(false);
  const [bad, setBad] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [first, setFirst] = useState("");
  const [manager, setManager] = useState<HiringManager | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  // portal target only exists in the browser; render nothing until after hydration
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  // closing clears validation state, so a reopened form starts clean (typed values are kept)
  const close = () => { setBad([]); setError(""); onClose(); };
  const closeRef = useRef(close);
  useEffect(() => { closeRef.current = close; });

  // lock the page behind the modal: html + body, keep the scrollbar gap so nothing shifts
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement, b = document.body;
    const prev = { h: html.style.overflow, b: b.style.overflow, p: b.style.paddingRight };
    const gap = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    b.style.overflow = "hidden";
    if (gap > 0) b.style.paddingRight = `${gap}px`;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
    window.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => {
      html.style.overflow = prev.h; b.style.overflow = prev.b; b.style.paddingRight = prev.p;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => { body.current?.scrollTo({ top: 0 }); }, [step]);

  if (!open || !mounted) return null;

  const pickResume = (f?: File) => {
    if (!f) return;
    if (f.size > MAX) return setError("Resume must be 10MB or smaller.");
    setError(""); setResume(f);
  };
  const addSkill = (s = skill) => {
    s = s.trim();
    if (s && !skills.includes(s)) setSkills([...skills, s]);
    setSkill("");
  };

  // required fields per step; steps stay mounted (hidden) so values persist
  const REQ: Record<number, string[]> = { 0: ["first_name", "last_name", "phone", "email", "gender"], 1: [], 2: [] };
  const check = (s: number) => {
    const f = form.current!;
    const missing = REQ[s].filter((n) => {
      const el = f.elements.namedItem(n) as HTMLInputElement | null;
      return !el || !el.value.trim() || !el.checkValidity();
    });
    setBad(missing);
    if (missing.length) { setError("Please complete the highlighted fields."); return false; }
    if (s === 2 && !consent) { setError("Please accept the data processing terms to continue."); return false; }
    setError(""); return true;
  };
  const go = (to: number) => {
    if (to > step && !check(step)) return;
    setDir(to > step ? 1 : -1); setStep(to);
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 2) return go(step + 1);
    if (!check(2)) return;
    setState("sending");
    // TODO(keka): POST this FormData to the Keka careers API.
    const data = new FormData(e.currentTarget);
    if (resume) data.set("resume", resume);
    docs.forEach((d) => data.append("documents", d));
    data.set("experience", JSON.stringify(exps));
    data.set("education", JSON.stringify(edus));
    data.set("skills", JSON.stringify(skills));
    if (call) data.set("mock_call", JSON.stringify(call));
    setFirst(String(data.get("first_name") || ""));
    await new Promise((r) => setTimeout(r, 1100));
    setState("done");
    getHiringManager().then(setManager).catch(() => setManager(null));
  };

  const isBad = (n: string) => bad.includes(n);
  const clearBad = (n: string) => bad.includes(n) && setBad(bad.filter((b) => b !== n));

  return createPortal(
    <div className="brand am-overlay fixed inset-0 z-[100] flex items-end justify-center bg-[#050a2e]/70 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <style>{CSS}</style>
      {state === "done" ? <Success onClose={close} name={first} manager={manager} /> : (
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`Apply: ${ROLE.title}`}
        className="am-panel grid h-[94vh] w-full max-w-5xl overflow-hidden bg-white shadow-[0_40px_120px_-20px_rgb(5_10_46_/_.6)] outline-none sm:h-[min(52rem,92vh)] lg:grid-cols-[22rem_1fr]">

        <Aside call={call} step={step} />

        <div className="flex min-h-0 flex-col">
          {/* top bar: mobile title, stepper, close */}
          <div className="relative shrink-0 px-5 pb-5 pt-5 sm:px-8 sm:pt-6">
            <button type="button" onClick={close} aria-label="Close" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900">{Icon.x}</button>
            <div className="pr-10 lg:hidden">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--brand-blue)]">Apply with your call{call ? ` · ${call.total}/25` : ""}</p>
              <p className="mt-1 text-lg font-semibold text-[var(--brand-navy)]">{ROLE.title}</p>
            </div>
              <nav aria-label="Application steps" className="mt-4 pr-12 lg:mt-0">
                <p className="text-xs text-neutral-500">
                  Step <b className="font-semibold tabular-nums text-[var(--brand-navy)]">{step + 1}</b> of {STEPS.length}
                </p>
                <ol className="mt-2.5 grid grid-cols-3 gap-2">
                  {STEPS.map((s, i) => (
                    <li key={s}>
                      <button type="button" onClick={() => i < step && go(i)} disabled={i > step} aria-current={i === step ? "step" : undefined}
                        className="group block w-full text-left disabled:cursor-default">
                        <span className="block h-1 overflow-hidden rounded-full bg-neutral-200">
                          <span className={`block h-full rounded-full transition-all duration-500 ease-out ${i < step ? "w-full bg-[var(--brand-blue)]" : i === step ? "w-1/2 bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-sky)]" : "w-0"}`} />
                        </span>
                        <span className={`mt-2 hidden items-center gap-1.5 text-[0.8rem] transition-colors sm:flex ${i === step ? "font-semibold text-[var(--brand-navy)]" : i < step ? "text-[var(--brand-blue)] group-hover:underline" : "text-neutral-400"}`}>
                          {i < step && <span className="h-3.5 w-3.5">{Icon.check}</span>}{s}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
          </div>

            <form ref={form} onSubmit={send} noValidate className="flex min-h-0 flex-1 flex-col"
              onInput={(e) => clearBad((e.target as HTMLInputElement).name)}>
              <div ref={body} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">

                {/* STEP 1: about you */}
                <div hidden={step !== 0} className="am-step space-y-8" style={{ "--dir": `${dir * 18}px` } as React.CSSProperties}>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight !text-[var(--brand-navy)]">Let&apos;s get to know you.</h2>
                    <p className="mt-1 text-sm text-neutral-500">Drop your resume and we&apos;ll fill in what we can.</p>
                  </div>

                  <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
                    onDrop={(e) => { e.preventDefault(); setDrag(false); pickResume(e.dataTransfer.files[0]); }}
                    className={`group relative flex cursor-pointer items-center gap-4 border-2 border-dashed p-5 transition-all ${drag ? "scale-[1.01] border-[var(--brand-blue)] bg-[#e3f0fc]" : resume ? "border-solid border-emerald-500/60 bg-emerald-50" : "border-neutral-300 bg-[#f7f9fc] hover:border-[var(--brand-blue)] hover:bg-[#eef5fd]"}`}>
                    <input type="file" accept={FILE_TYPES} className="sr-only" onChange={(e) => pickResume(e.target.files?.[0])} />
                    <span className={`grid h-12 w-12 shrink-0 place-items-center transition-colors ${resume ? "bg-emerald-500 p-3 text-white" : "bg-white text-[var(--brand-blue)] shadow-sm group-hover:bg-[var(--brand-blue)] group-hover:text-white"}`}>
                      {resume ? Icon.check : Icon.up}
                    </span>
                    {resume ? (
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-neutral-900">{resume.name}</span>
                        <span className="text-sm text-neutral-600">{(resume.size / 1024 / 1024).toFixed(1)} MB · <span className="text-[var(--brand-blue)] underline">Replace</span></span>
                      </span>
                    ) : (
                      <span>
                        <span className="block font-semibold text-neutral-900"><span className="text-[var(--brand-blue)]">Upload your resume</span> or drag it here</span>
                        <span className="text-sm text-neutral-500">PDF, DOC, DOCX, RTF or ODT · up to 10MB</span>
                      </span>
                    )}
                  </label>

                  <Group title="Personal details">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <F label="First name" name="first_name" req bad={isBad("first_name")} autoComplete="given-name" />
                      <F label="Last name" name="last_name" req bad={isBad("last_name")} autoComplete="family-name" />
                      <F label="Middle name" name="middle_name" autoComplete="additional-name" />
                      <S label="Gender" name="gender" req bad={isBad("gender")} options={["Female", "Male", "Non-binary", "Prefer not to say"]} onChange={() => clearBad("gender")} />
                      <F label="Email" name="email" type="email" req bad={isBad("email")} autoComplete="email" />
                      <div className="flex">
                        <div className="am-field is-fixed w-24 shrink-0">
                          <select id="am-code" name="phone_code" defaultValue="+91" className="!border-r-0">
                            {["+91", "+1", "+44", "+971", "+65"].map((c) => <option key={c}>{c}</option>)}
                          </select>
                          <label htmlFor="am-code">Code</label>
                        </div>
                        <F label="Mobile phone" name="phone" type="tel" req bad={isBad("phone")} autoComplete="tel-national" className="flex-1" />
                      </div>
                      <div className="am-field is-fixed"><input id="am-dob" name="dob" type="date" /><label htmlFor="am-dob">Date of birth</label></div>
                      <F label="Current city" name="current_location" autoComplete="address-level2" />
                    </div>
                  </Group>
                </div>

                {/* STEP 2: background */}
                <div hidden={step !== 1} className="am-step space-y-8" style={{ "--dir": `${dir * 18}px` } as React.CSSProperties}>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight !text-[var(--brand-navy)]">Where you&apos;ve been.</h2>
                    <p className="mt-1 text-sm text-neutral-500">A quick picture of your experience and what you&apos;re looking for.</p>
                  </div>

                  <Group title="Role preferences">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="grid grid-cols-2 gap-3">
                        <F label="Experience (yrs)" name="exp_years" type="number" min={0} max={40} />
                        <div className="am-field is-fixed">
                          <select id="am-months" name="exp_months" defaultValue="0">{Array.from({ length: 12 }, (_, i) => <option key={i}>{i}</option>)}</select>
                          <label htmlFor="am-months">Months</label>
                        </div>
                      </div>
                      <S label="Preferred location" name="preferred_location" options={["Pune", "Bangalore", "Either works"]} />
                      <div className="relative">
                        <F label="Current salary (₹ / year)" name="current_salary" type="number" min={0} />
                      </div>
                      <F label="Expected salary (₹ / year)" name="expected_salary" type="number" min={0} />
                      <F label="Notice period (days)" name="notice_days" type="number" min={0} />
                    </div>
                  </Group>

                  <Group title="Experience" note={exps.length ? `${exps.length} added` : "Optional"}>
                    <div className="space-y-3">
                      {exps.map((x, i) => {
                        const set = (p: Partial<Exp>) => setExps(exps.map((v, j) => j === i ? { ...v, ...p } : v));
                        return (
                          <div key={i} className="am-step relative border-l-[3px] border-[var(--brand-blue)] bg-[#f7f9fc] p-4 pr-12">
                            <button type="button" onClick={() => setExps(exps.filter((_, j) => j !== i))} className="absolute right-2 top-2 grid h-8 w-8 place-items-center text-neutral-400 hover:bg-white hover:text-red-600" aria-label="Remove">{Icon.x}</button>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <F label="Company" name={`exp_company_${i}`} value={x.company} onChange={(e) => set({ company: e.target.value })} />
                              <F label="Job title" name={`exp_title_${i}`} value={x.title} onChange={(e) => set({ title: e.target.value })} />
                              <div className="am-field is-fixed"><input id={`am-from-${i}`} type="month" value={x.from} onChange={(e) => set({ from: e.target.value })} /><label htmlFor={`am-from-${i}`}>From</label></div>
                              <div className="am-field is-fixed"><input id={`am-to-${i}`} type="month" disabled={x.current} value={x.current ? "" : x.to} onChange={(e) => set({ to: e.target.value })} className="disabled:bg-neutral-100" /><label htmlFor={`am-to-${i}`}>{x.current ? "Present" : "To"}</label></div>
                            </div>
                            <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
                              <input type="checkbox" checked={x.current} onChange={(e) => set({ current: e.target.checked })} className="h-4 w-4 accent-[var(--brand-blue)]" /> I currently work here
                            </label>
                          </div>
                        );
                      })}
                      <button type="button" onClick={() => setExps([...exps, { company: "", title: "", from: "", to: "", current: exps.length === 0 }])}
                        className="flex w-full items-center justify-center gap-2 border border-dashed border-neutral-300 py-3.5 text-sm font-semibold text-[var(--brand-blue)] transition-colors hover:border-[var(--brand-blue)] hover:bg-[#f4f9fe]">
                        + Add {exps.length ? "another role" : "a role"}
                      </button>
                    </div>
                  </Group>

                  <Group title="Education" note={edus.length ? `${edus.length} added` : "Optional"}>
                    <div className="space-y-3">
                      {edus.map((x, i) => {
                        const set = (p: Partial<Edu>) => setEdus(edus.map((v, j) => j === i ? { ...v, ...p } : v));
                        return (
                          <div key={i} className="am-step relative border-l-[3px] border-[var(--brand-yellow)] bg-[#fffbf0] p-4 pr-12">
                            <button type="button" onClick={() => setEdus(edus.filter((_, j) => j !== i))} className="absolute right-2 top-2 grid h-8 w-8 place-items-center text-neutral-400 hover:bg-white hover:text-red-600" aria-label="Remove">{Icon.x}</button>
                            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_7rem]">
                              <F label="College / university" name={`edu_school_${i}`} value={x.school} onChange={(e) => set({ school: e.target.value })} />
                              <F label="Degree" name={`edu_degree_${i}`} value={x.degree} onChange={(e) => set({ degree: e.target.value })} />
                              <F label="Year" name={`edu_year_${i}`} inputMode="numeric" maxLength={4} value={x.year} onChange={(e) => set({ year: e.target.value })} />
                            </div>
                          </div>
                        );
                      })}
                      <button type="button" onClick={() => setEdus([...edus, { school: "", degree: "", year: "" }])}
                        className="flex w-full items-center justify-center gap-2 border border-dashed border-neutral-300 py-3.5 text-sm font-semibold text-[var(--brand-blue)] transition-colors hover:border-[var(--brand-blue)] hover:bg-[#f4f9fe]">
                        + Add {edus.length ? "another degree" : "education"}
                      </button>
                    </div>
                  </Group>
                </div>

                {/* STEP 3: finish */}
                <div hidden={step !== 2} className="am-step space-y-8" style={{ "--dir": `${dir * 18}px` } as React.CSSProperties}>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight !text-[var(--brand-navy)]">Almost there.</h2>
                    <p className="mt-1 text-sm text-neutral-500">Your skills, links and anything else you&apos;d like us to see.</p>
                  </div>

                  <Group title="Skills" note={`${skills.length} selected`}>
                    <div className="flex min-h-[2.85rem] flex-wrap items-center gap-2 border border-neutral-300 bg-white p-2 transition-shadow focus-within:border-[var(--brand-blue)] focus-within:shadow-[0_0_0_4px_rgb(0_107_201_/_.12)]">
                      {skills.map((s) => (
                        <span key={s} className="am-step inline-flex items-center gap-1.5 bg-[var(--brand-navy)] py-1.5 pl-3 pr-1.5 text-sm text-white">
                          {s}<button type="button" onClick={() => setSkills(skills.filter((v) => v !== s))} aria-label={`Remove ${s}`} className="grid h-5 w-5 place-items-center text-white/60 hover:bg-white/15 hover:text-white">{Icon.x}</button>
                        </span>
                      ))}
                      <input value={skill} onChange={(e) => setSkill(e.target.value)} onBlur={() => addSkill()}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(); } }}
                        placeholder="Type a skill, press Enter" className="h-8 min-w-[10rem] flex-1 px-1 text-[0.95rem] outline-none" aria-label="Add skill" />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SUGGESTED.filter((s) => !skills.includes(s)).map((s) => (
                        <button key={s} type="button" onClick={() => addSkill(s)} className="border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]">+ {s}</button>
                      ))}
                    </div>
                  </Group>

                  <Group title="Links & documents">
                    <F label="LinkedIn profile URL" name="linkedin" type="url" />
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-3 border border-neutral-300 px-4 py-3 transition-colors hover:border-[var(--brand-blue)] hover:bg-[#f4f9fe]">
                        <span className="text-[var(--brand-blue)]">{Icon.doc}</span>
                        <span><span className="block text-sm font-semibold text-neutral-900">Add an attachment</span><span className="block text-xs text-neutral-500">Portfolio, certificates · 10MB each</span></span>
                        <input type="file" multiple className="sr-only" onChange={(e) => setDocs([...docs, ...Array.from(e.target.files ?? []).filter((f) => f.size <= MAX)])} />
                      </label>
                      {docs.map((d, i) => (
                        <span key={i} className="am-step inline-flex items-center gap-2 bg-neutral-100 py-2 pl-3 pr-1.5 text-sm">{d.name}
                          <button type="button" onClick={() => setDocs(docs.filter((_, j) => j !== i))} aria-label={`Remove ${d.name}`} className="grid h-6 w-6 place-items-center text-neutral-500 hover:text-red-600">{Icon.x}</button>
                        </span>
                      ))}
                    </div>
                  </Group>

                  <label className={`flex cursor-pointer items-start gap-3 border p-4 text-sm leading-relaxed transition-colors ${consent ? "border-[var(--brand-blue)] bg-[#f4f9fe]" : "border-neutral-200 hover:border-neutral-300"}`}>
                    <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setError(""); }} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand-blue)]" />
                    <span className="text-neutral-700">I accept the data processing terms under the <a href="/privacy-policy" target="_blank" className="font-medium text-[var(--brand-blue)] underline">Privacy Policy</a> and consent to my data being processed for this application.</span>
                  </label>
                </div>
              </div>

              {/* footer */}
              <div className="flex shrink-0 items-center gap-3 border-t border-neutral-200 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
                {step > 0
                  ? <button type="button" onClick={() => go(step - 1)} className="px-4 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900">← Back</button>
                  : <span className="hidden text-xs text-neutral-500 sm:block">Takes about 3 minutes</span>}
                <p className="min-w-0 flex-1 truncate text-right text-sm text-red-600" role="alert">{error}</p>
                <button type="submit" disabled={state === "sending"}
                  className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden bg-[var(--brand-yellow)] px-7 py-3.5 text-sm font-semibold text-[#1c1c1c] shadow-[0_8px_24px_-8px_rgb(255_187_0_/_.7)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-ochre)] disabled:translate-y-0 disabled:opacity-70">
                  {state === "sending" ? (
                    <><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1c1c1c]/25 border-t-[#1c1c1c]" />Sending…</>
                  ) : step < 2 ? (
                    <>Continue <span className="transition-transform group-hover:translate-x-1">→</span></>
                  ) : (
                    <>Submit application <span className="transition-transform group-hover:translate-x-1">→</span></>
                  )}
                </button>
              </div>
            </form>
        </div>
      </div>
      )}
    </div>,
    document.body,
  );
}
