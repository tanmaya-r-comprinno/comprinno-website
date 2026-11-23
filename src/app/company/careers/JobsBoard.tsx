"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/Icon";
import type { Job } from "@/lib/keka";
import { campaignForJob } from "@/content/careerCampaigns";

const PAGE = 8;

/** Custom dropdown in the site style (square corners, brand blue), replaces the browser's native menu */
function Dropdown({ icon, label, value, onChange, options, total }: { icon: IconName; label: string; value: string; onChange: (v: string) => void; options: [string, number][]; total: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const all = `All ${label === "Team" ? "teams" : "locations"}`;
  const items: [string, string, number][] = [["All", all, total], ...options.map(([o, n]) => [o, o, n] as [string, string, number])];
  const current = items.find((i) => i[0] === value) ?? items[0];

  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", off);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-label={`${label}: ${current[1]}`} onClick={() => setOpen((o) => !o)} className={`job-field w-full text-left ${open ? "!border-[#006bc9]" : ""}`}>
        <Icon name={icon} className="h-4 w-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate text-ink">{current[1]} <span className="text-muted">({current[2]})</span></span>
        <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <ul role="listbox" aria-label={label} className="job-menu">
          {items.map(([v, text, n]) => (
            <li key={v} role="option" aria-selected={v === value}>
              <button type="button" onClick={() => { onChange(v); setOpen(false); }} className={`job-option ${v === value ? "is-on" : ""}`}>
                <span className="truncate">{text}</span>
                <span className="cs-count">{n}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Compact, filterable list of open roles (data from Keka) */
export default function JobsBoard({ jobs, mail }: { jobs: Job[]; mail: string }) {
  const [dept, setDept] = useState("All");
  const [city, setCity] = useState("All");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);
  const depts = useMemo(() => {
    const c = new Map<string, number>();
    jobs.forEach((j) => c.set(j.department, (c.get(j.department) ?? 0) + 1));
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, [jobs]);
  const cities = useMemo(() => {
    const c = new Map<string, number>();
    jobs.forEach((j) => j.cities.forEach((x) => c.set(x, (c.get(x) ?? 0) + 1)));
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, [jobs]);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return jobs.filter((j) => (dept === "All" || j.department === dept) && (city === "All" || j.cities.includes(city)) && (!t || `${j.title} ${j.department} ${j.cities.join(" ")}`.toLowerCase().includes(t)));
  }, [jobs, dept, city, q]);

  if (!jobs.length) {
    return (
      <div className="border border-line bg-bg px-6 py-12 text-center">
        <p className="font-semibold text-ink">Roles are being updated.</p>
        <p className="mt-2 text-sm text-muted">Send your resume to <a href={`mailto:${mail}`} className="font-medium text-ink underline underline-offset-2">{mail}</a> and tell us what you&apos;d like to work on.</p>
      </div>
    );
  }

  return (
    <div className="border border-line bg-bg">
      {/* search + filter dropdowns, all the same height on one line */}
      <div className="grid gap-3 border-b border-line p-4 sm:grid-cols-[1fr_13rem_13rem]">
        <label className="job-field">
          <Icon name="search" className="h-4 w-4 shrink-0" />
          <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search roles" className="min-w-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent text-ink outline-none placeholder:text-muted" />
        </label>
        <Dropdown icon="users" label="Team" value={dept} onChange={(v) => { setDept(v); setShown(PAGE); }} options={depts} total={jobs.length} />
        <Dropdown icon="pin" label="Location" value={city} onChange={(v) => { setCity(v); setShown(PAGE); }} options={cities} total={jobs.length} />
      </div>

      {list.length ? (
        <ul className="divide-y divide-line">
          {list.slice(0, shown).map((j) => { const c = campaignForJob(j.id); return (
            <li key={j.id} className={c ? "transition-colors hover:bg-[#f2f8fe] sm:flex sm:items-center" : undefined}>
              <a href={j.url} target="_blank" rel="noopener noreferrer" className={`job-row group ${c ? "hover:!bg-transparent sm:min-w-0 sm:flex-1" : ""}`}>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-semibold text-ink transition-colors group-hover:text-[#006bc9]">{j.title}</span>
                    {j.days <= 7 && <span className="shrink-0 bg-[#ffbb00] px-1.5 py-px font-mono text-[0.58rem] font-semibold uppercase tracking-widest text-[#1c1c1c]">New</span>}
                  </span>
                  <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                    <span>{j.department}</span>
                    {j.cities.length > 0 && <span className="flex items-center gap-1"><Icon name="pin" className="h-3 w-3" />{j.cities.join(" · ")}</span>}
                    {j.experience && <span className="flex items-center gap-1"><Icon name="clock" className="h-3 w-3" />{j.experience}</span>}
                  </span>
                </span>
                {!c && <span className="job-apply">Apply <span className="go">→</span></span>}
              </a>
              {c && (
                <span className="mb-3 flex shrink-0 items-center gap-2 px-[1.1rem] sm:mb-0 sm:pl-0">
                  <a href={c.href} className="group/mock flex-1 text-center sm:flex-none bg-[#ffbb00] px-3 py-[.4rem] text-[.8rem] font-semibold text-[#1c1c1c] transition-colors hover:bg-[#d89f04]">
                    {c.badge} <span className="inline-block transition-transform group-hover/mock:translate-x-[3px]">→</span>
                  </a>
                  <a href={j.url} target="_blank" rel="noopener noreferrer" className="job-apply group/apply hover:border-[#006bc9] hover:bg-[#006bc9] hover:text-white">
                    Apply <span className="inline-block transition-transform group-hover/apply:translate-x-[3px]">→</span>
                  </a>
                </span>
              )}
            </li>
          ); })}
        </ul>
      ) : (
        <p className="p-8 text-center text-sm text-muted">No roles match that search.</p>
      )}

      {shown < list.length && (
        <div className="border-t border-line p-4 text-center">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn btn-ghost">Show more roles <span className="text-muted">({list.length - shown})</span></button>
        </div>
      )}
    </div>
  );
}
