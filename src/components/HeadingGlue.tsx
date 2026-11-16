"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Heading typography for narrow screens, applied after the page renders:
 * - short function words ("to", "the", "your", "we"…) stay with the next word,
 *   so a line never ends on one ("…round to / scaled platform" → "…round / to scaled platform");
 * - short sentences of up to four words stay on one line;
 * - hyphenated words never split ("AI- / ready");
 * - punctuation right after a highlighted word never starts a new line ("AI-ready / , without").
 * Only the visible spacing changes; the text itself is identical.
 */
const SMALL = "a|an|the|to|of|in|on|at|for|by|with|from|into|across|before|each|every|than|when|that|who|we";
const GLUE = new RegExp(`(^|[\\s(])(${SMALL}) (?=\\S|$)`, "gi");

// headings already handled; kept in memory so no attribute is added to React-owned markup
const done = new WeakSet<Element>();

function glue(root: ParentNode) {
  root.querySelectorAll("main h1, main h2, main h3").forEach((h) => {
    if (done.has(h)) return;
    done.add(h);
    const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    const saved = nodes.map((n) => n.data);
    for (const n of nodes) {
      let t = n.data;
      // run twice so neighbours like "to the" both glue
      t = t.replace(GLUE, "$1$2 ").replace(GLUE, "$1$2 ");
      // short sentences ("You set the rules.", "Talk to us anyway.") stay on one line
      t = t.replace(/(^|[.?!:]\s+)([^.?!:]+[.?!])/g, (all, lead, sen) =>
        sen.trim().split(/\s+/).length <= 4 && sen.length <= 26 ? lead + sen.replace(/ /g, "\u00a0") : all);
      // hyphenated words ("AI-ready", "Tevico-powered") never split at the hyphen
      t = t.replace(/(\w)-(\w)/g, "$1\u2011$2");
      if (t !== n.data) n.data = t;
      // punctuation right after a highlighted word: tuck it inside that element so it cannot
      // start the next line. Only text is added inside the element; React-owned nodes never move.
      const prev = n.previousSibling;
      const m = n.data.match(/^[,.;:?!]+/);
      if (m && prev instanceof HTMLElement) {
        const color = getComputedStyle(h).color;
        const p = document.createElement("span");
        p.textContent = m[0];
        p.style.cssText = `color:${color};-webkit-text-fill-color:${color};background:none;font-weight:${getComputedStyle(h).fontWeight}`;
        prev.appendChild(p);
        n.data = n.data.slice(m[0].length);
      }
    }
    // safety: if the glued text no longer fits (e.g. a narrow desktop column), fall back to normal wrapping
    if (h.scrollWidth > h.clientWidth + 1) nodes.forEach((n, i) => { if (n.data !== saved[i]) n.data = n.data.replace(/\u00a0/g, " "); });
  });
}

export default function HeadingGlue() {
  const path = usePathname();
  useEffect(() => {
    // Run only after React has finished hydrating (editing text earlier causes a hydration mismatch).
    // A couple of later passes pick up content that streams in after the first paint.
    const timers: number[] = [];
    const run = () => [200, 1200, 3000].forEach((ms) => timers.push(window.setTimeout(() => glue(document), ms)));
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
    return () => { window.removeEventListener("load", run); timers.forEach(clearTimeout); };
  }, [path]);
  return null;
}
