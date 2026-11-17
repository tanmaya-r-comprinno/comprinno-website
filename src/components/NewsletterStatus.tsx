"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const MESSAGES: Record<string, { ok: boolean; text: string }> = {
  ok: { ok: true, text: "Thanks, you're on the list for CloudScape." },
  invalid: { ok: false, text: "That doesn't look like a valid email address. Please check it and try again." },
  error: { ok: false, text: "We couldn't sign you up just now. Please try again in a minute." },
  off: { ok: false, text: `Newsletter sign-up isn't available yet. Email ${site.emails.general} and we'll add you.` },
};

/**
 * Message shown under a newsletter form after /api/subscribe sends the visitor back
 * (?subscribed=<status>&nl=<where>). Reads the URL after mount, so pages stay static,
 * then removes the flag from the address bar so a refresh doesn't repeat it.
 */
export default function NewsletterStatus({ where, dark = false }: { where: string; dark?: boolean }) {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const s = url.searchParams.get("subscribed");
    if (!s || (url.searchParams.get("nl") ?? "footer") !== where) return;
    // clear the flag only once the message is shown (effects can run twice in development)
    const id = requestAnimationFrame(() => {
      setStatus(s);
      url.searchParams.delete("subscribed");
      url.searchParams.delete("nl");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    });
    return () => cancelAnimationFrame(id);
  }, [where]);

  // submit the matching form in the background, so the page doesn't reload and scroll
  useEffect(() => {
    const field = document.querySelector<HTMLInputElement>(`form[action="/api/subscribe"] input[name="nl"][value="${where}"]`);
    const form = field?.form;
    if (!form) return;
    const onSubmit = async (e: SubmitEvent) => {
      e.preventDefault();
      const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
      if (button) button.disabled = true;
      setStatus(null);
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        const { status: s } = await res.json();
        setStatus(s);
        if (s === "ok") form.reset();
      } catch {
        setStatus("error");
      } finally {
        if (button) button.disabled = false;
      }
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [where]);

  const m = status ? MESSAGES[status] ?? MESSAGES.error : null;
  if (!m) return null;
  const tone = m.ok
    ? dark ? "border-[#ffbb00]/60 text-white" : "border-[#11804a]/40 bg-[#e3f6ec] text-[#11804a]"
    : dark ? "border-[#ff8a80]/60 text-[#ffcdc8]" : "border-[#c62828]/30 bg-[#fdecea] text-[#c62828]";
  return (
    <p role="status" className={`mt-3 border px-3 py-2 text-sm ${tone}`}>
      <span aria-hidden="true">{m.ok ? "✓ " : "! "}</span>{m.text}
    </p>
  );
}
