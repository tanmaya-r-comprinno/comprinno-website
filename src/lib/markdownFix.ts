/**
 * Repairs bold markers from the WordPress import so "**" never shows as text:
 *  - "**Label - **text" / "** Label**"  → spaces moved outside the markers
 *  - "**Label:**Text"                    → space added after the closing marker
 *  - "** **" / "******" (empty bold)     → removed
 *  - an unpaired "**" on a line          → removed
 *  - lines indented with non-breaking spaces are un-indented (they'd become code blocks)
 *  - real code lines (4+ spaces / tab) lose their markers, since bold can't render there
 */
export function fixBold(raw: string): string {
  let line = /^[\s ]* /.test(raw) ? raw.replace(/^[\s ]+/, "") : raw;
  line = line.replace(/ /g, " ");
  if (/^( {4}|\t)/.test(line)) return line.replace(/\*\*/g, "");
  const parts = line.split("**");
  if (parts.length === 1) return fixItalic(line);
  if (parts.length % 2 === 0) return fixItalic(parts.join("")); // odd number of markers: drop them all
  let out = "";
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (i % 2 === 0) { out += p; continue; }
    const t = p.trim();
    if (!t) { out += p; continue; }
    const lead = p.match(/^\s*/)?.[0] ?? "";
    const trail = p.match(/\s*$/)?.[0] ?? "";
    // next real text after this bold (skipping empty "** **" pairs)
    let next = "";
    for (let j = i + 1; j < parts.length; j++) { if (j % 2 === 0 ? parts[j] : parts[j].trim()) { next = parts[j]; break; } }
    const glue = !trail && /^[A-Za-z0-9(]/.test(next) && /[^\w\s]$/.test(t); // "**Label:**Text"
    out += `${out.trim() ? lead : ""}**${t}**${trail}${glue ? " " : ""}`; // no indent before a leading bold
  }
  return fixItalic(out);
}

/**
 * Single "*" (italic) from the import is broken in many ways ("*Label: *Text",
 * "*[*LINK*](url)*", "*their* *business.*"), so in prose it is dropped: the words
 * show as normal text. Stars in code-like text stay (s3:*, /*.log, ".*", "*"),
 * as do list bullets and bold markers.
 */
function fixItalic(line: string): string {
  const bullet = line.match(/^\s*\*\s+/)?.[0] ?? "";
  let rest = line.slice(bullet.length);
  if (!rest.includes("*")) return line;
  const B = "\u0001";
  rest = rest.replace(/\*\*/g, B);
  // keep a star only when it sits between code characters
  rest = rest.replace(/\*/g, (m, i: number, str: string) => {
    const prev = str[i - 1] ?? "", next = str[i + 1] ?? "";
    if (prev === B || next === B) return ""; // "***text***": the extra star next to bold
    const code = prev === "/" || (/[:.=~\-“"]/.test(prev) && /\S/.test(next)) || (/^[.”"/]/.test(next) && /[^\sA-Za-z0-9]/.test(prev));
    return code ? m : "";
  });
  return bullet + rest.replace(new RegExp(B, "g"), "**").replace(/ {2,}/g, " ");
}


/** Plain text: no markdown bold at all */
export const stripBold = (s: string) => fixBold(s).replace(/\*+/g, "");

const plain = (s: string) => s.replace(/^#+\s*/, "").replace(/[*_]/g, "").replace(/&amp;/g, "&").replace(/[:\s]+$/, "").trim().toLowerCase();

/**
 * The import often repeats a heading: "## Conclusion" followed by "## **Conclusion**"
 * or a bold line "**Conclusion**". Keep the first, drop the repeat (only when nothing
 * but blank lines sits between them).
 */
export function dedupeHeadings(body: string): string {
  const lines = body.replace(/\r/g, "").split("\n");
  const out: string[] = [];
  let last = ""; // plain text of the last heading, while only blank lines followed it
  for (const l of lines) {
    const t = l.trim();
    if (!t || t === "&nbsp;" || t === " ") { out.push(l); continue; }
    const isHeading = /^#{1,6}\s/.test(t);
    const isBoldLine = /^\*\*[^*]+\*\*:?$/.test(t);
    if ((isHeading || isBoldLine) && last && plain(t) === last) continue;
    last = isHeading ? plain(t) : "";
    out.push(l);
  }
  return out.join("\n");
}
