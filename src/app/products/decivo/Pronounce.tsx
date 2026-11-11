"use client";

/** Plays the product name through the browser's speech engine. */
export default function Pronounce() {
  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance("Deh-see-voh");
    u.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };
  return (
    <button type="button" onClick={speak} aria-label="Hear how Decivo is pronounced" className="grid h-7 w-7 place-items-center border border-line-strong bg-bg text-ink hover:bg-surface">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    </button>
  );
}
