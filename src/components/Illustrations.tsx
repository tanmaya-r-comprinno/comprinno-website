/** Placeholder for a real photo/screenshot in the high-fidelity phase. */
export function ImageSlot({ label, ratio = "aspect-[16/10]" }: { label: string; ratio?: string }) {
  return (
    <div className={`bg-grid flex ${ratio} w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-line-strong bg-surface text-muted`}>
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M15.5 9.5a1.5 1.5 0 1 0 0-.01" />
      </svg>
      <span className="font-mono text-xs">image · {label}</span>
    </div>
  );
}
