"use client";

import { useState, type FormEvent } from "react";
import { workEmailError } from "./workEmail";

const PORTAL = "4699526";
const FORM = "6b22554b-1305-40b6-9abe-95712e7520db";
const ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL}/${FORM}`;

/** Fields mirror the HubSpot form (property names must match it); labels/UI are ours. */
const FIELDS: { name: string; label: string; type: string; required?: boolean; placeholder?: string; auto?: string; wide?: boolean }[] = [
  { name: "firstname", label: "First name", type: "text", auto: "given-name" },
  { name: "lastname", label: "Last name", type: "text", auto: "family-name" },
  { name: "email", label: "Work email", type: "email", required: true, auto: "email" },
  { name: "company", label: "Company", type: "text", auto: "organization" },
  { name: "jobtitle", label: "Job title", type: "text", auto: "organization-title", wide: true },
  { name: "hs_linkedin_url", label: "LinkedIn profile", type: "text", required: true, placeholder: "yourname", wide: true },
];

/** Accepts a bare profile name or any pasted LinkedIn link; returns just the profile name. */
const linkedinHandle = (v: string) => v.trim().replace(/^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/(in\/)?/i, "").replace(/^@/, "").split(/[/?#]/)[0];

// same values comprinno.net/contact injects into its HubSpot form (src/components/HubSpotForm.tsx FORM_CSS)
const input = "mt-1 block min-h-10 w-full border border-[#c8d5e8] bg-white px-3 py-2 text-sm leading-snug text-[#1c1c1c] placeholder:text-[#6b6b6b] transition-colors focus:border-[#006bc9] focus:outline-none";

/**
 * Our own registration form, posted to the HubSpot form above through HubSpot's public submission API,
 * so the UI is ours and HubSpot still records the submission (and the hubspotutk cookie for tracking).
 * If HubSpot turns on captcha for this form, API submissions are rejected: keep captcha off.
 */
export default function RegisterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const emailError = workEmailError(String(data.get("email") ?? ""));
    if (emailError) { setError(emailError); setState("error"); return; }
    setState("sending");
    setError("");
    const hutk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: FIELDS.map((f) => {
            const raw = String(data.get(f.name) ?? "").trim();
            const value = f.name === "hs_linkedin_url" && raw ? `https://www.linkedin.com/in/${linkedinHandle(raw)}` : raw;
            return { objectTypeId: "0-1", name: f.name, value };
          }).filter((f) => f.value),
          context: { pageUri: location.href, pageName: document.title, ...(hutk ? { hutk } : {}) },
        }),
      });
      if (res.ok) { setState("done"); return; }
      const body = await res.json().catch(() => null);
      setError(body?.errors?.[0]?.message?.replace(/^Error in '[^']*'\.\s*/, "") ?? "Something went wrong. Please try again.");
      setState("error");
    } catch {
      setError("We couldn't reach our form service. Please try again, or email sales@comprinno.net.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="py-2">
        <div className="flex items-center gap-3">
          {/* site check icon; circle via clip-path because the site forces square corners */}
          <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#e3f0fc] text-[#006bc9]" style={{ clipPath: "circle(50%)" }} aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
          </span>
          <div>
            <p className="text-base font-semibold text-[#1c1c1c]">Request received</p>
            <p className="text-sm text-neutral-600">Thanks. Your seat request is with our hosts.</p>
          </div>
        </div>
        <p className="mt-5 font-mono text-[.6rem] uppercase tracking-[.12em] text-[#006bc9]">What happens next</p>
        <ol className="mt-2 space-y-2.5 text-sm text-[#3d3d3d]">
          <li className="flex gap-2.5"><span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[#006bc9] font-mono text-[.65rem] text-white">1</span>Our hosts review your request. Every registration is subject to approval.</li>
          <li className="flex gap-2.5"><span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[#006bc9] font-mono text-[.65rem] text-white">2</span>Once approved, we’ll email your pass and the venue details.</li>
        </ol>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-x-3 gap-y-3.5 sm:grid-cols-2">
      {FIELDS.map((f) => (
        <label key={f.name} className={`block text-sm font-medium leading-snug text-[#1c1c1c] ${f.wide ? "sm:col-span-2" : ""}`}>
          {f.label}{f.required && <span className="ml-0.5 text-[#c62828]">*</span>}
          {f.name === "hs_linkedin_url" ? (
            <>
              {/* prefix shown, so people type only their profile name; pasting a full link is cleaned up */}
              <span className="mt-1 flex border border-[#c8d5e8] bg-white transition-colors focus-within:border-[#006bc9]">
                <span className="flex items-center border-r border-[#c8d5e8] bg-[#f4f7fb] px-3 text-sm font-normal text-[#6b6b6b]">linkedin.com/in/</span>
                <input name={f.name} type="text" required placeholder={f.placeholder} autoCapitalize="none" autoCorrect="off" spellCheck={false}
                  onPaste={(e) => { e.preventDefault(); e.currentTarget.value = linkedinHandle(e.clipboardData.getData("text")); }}
                  onBlur={(e) => { e.currentTarget.value = linkedinHandle(e.currentTarget.value); }}
                  className="min-h-10 min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#1c1c1c] placeholder:text-[#6b6b6b] focus:outline-none" />
              </span>
              <span className="mt-1 block text-xs font-normal text-[#6b6b6b]">Just your profile name, or paste your full LinkedIn link.</span>
            </>
          ) : (
            <input name={f.name} type={f.type} required={f.required} placeholder={f.placeholder} autoComplete={f.auto} className={input} />
          )}
        </label>
      ))}
      {state === "error" && <p role="alert" className="text-xs text-[#c62828] sm:col-span-2">{error}</p>}
      <p className="text-xs leading-relaxed text-[#3d3d3d] sm:col-span-2">We use your details only to manage your registration. <a href="/privacy-policy" className="text-[#1c1c1c] underline underline-offset-2">Privacy policy</a></p>
      <div className="mt-1 sm:col-span-2">
      <button type="submit" disabled={state === "sending"} className="inline-flex min-h-[2.9rem] items-center justify-center border-[1.5px] border-[#ffbb00] bg-[#ffbb00] px-5 text-[.95rem] font-semibold text-[#1c1c1c] transition-colors hover:border-[#d89f04] hover:bg-[#d89f04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bc9] active:translate-y-px disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Request my spot →"}
      </button>
      </div>
    </form>
  );
}
