"use client";

import { useState, type FormEvent } from "react";
import { workEmailError } from "./workEmail";

/** Hero email capture: checks for a company email, then scrolls to the registration form with it filled in. */
export default function HeroEmail({ inputClass }: { inputClass: string }) {
  const [error, setError] = useState("");

  function go(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    const msg = workEmailError(email);
    setError(msg);
    if (msg) return;
    const form = document.querySelector<HTMLFormElement>("#register form");
    const field = form?.querySelector<HTMLInputElement>('input[name="email"]');
    if (field) field.value = email;
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
    // move focus to the first empty field once the scroll has settled, without jumping the page
    setTimeout(() => {
      const next = Array.from(form?.querySelectorAll<HTMLInputElement>("input") ?? []).find((i) => !i.value);
      next?.focus({ preventScroll: true });
    }, 600);
  }

  return (
    <form onSubmit={go} noValidate className="mt-6 max-w-lg">
      <label className="sr-only" htmlFor="hero-email">Your work email</label>
      <input id="hero-email" name="email" type="email" autoComplete="email" placeholder="Your work email" aria-invalid={!!error} aria-describedby={error ? "hero-email-error" : undefined} onInput={() => error && setError("")} className={`${inputClass} ${error ? "!border-[#c62828]" : ""}`} />
      {error && <p id="hero-email-error" role="alert" className="mt-2 text-xs text-[#c62828]">{error}</p>}
      <button type="submit" className="btn btn-primary mt-3">Request your spot at our dinner →</button>
    </form>
  );
}
