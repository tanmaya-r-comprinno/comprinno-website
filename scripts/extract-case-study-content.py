#!/usr/bin/env python3
"""
Extract case study content from WordPress database.sql (ACF custom fields)
and write it into the MDX files in src/content/case-studies/

Usage:
  python3 scripts/extract-case-study-content.py           # write files
  python3 scripts/extract-case-study-content.py --dry-run # preview only
"""

import os, re, sys

DRY_RUN  = "--dry-run" in sys.argv
SQL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__),
           "../../comprinno-web/wordpress/database.sql"))
CS_DIR   = os.path.abspath(os.path.join(os.path.dirname(__file__),
           "../src/content/case-studies"))

CONTENT_KEYS = ["overview", "the_challenge", "the_solution",
                "results_that_matter", "author_text", "conclusion"]
SECTION_LABELS = {
    "overview":           "## Overview",
    "the_challenge":      "## The Challenge",
    "the_solution":       "## The Solution",
    "results_that_matter":"## Results",
    "author_text":        None,   # handled separately as blockquote
    "conclusion":         "## Conclusion",
}

# ── Helpers ──────────────────────────────────────────────────────────────────

def html_to_md(html: str) -> str:
    if not html or not html.strip():
        return ""
    h = html
    h = re.sub(r"<br\s*/?>", "\n", h, flags=re.I)
    h = re.sub(r"</?(?:p|div|section|article)[^>]*>", "\n", h, flags=re.I)
    h = re.sub(r"<h2[^>]*>(.*?)</h2>", r"\n## \1\n", h, flags=re.I|re.S)
    h = re.sub(r"<h3[^>]*>(.*?)</h3>", r"\n### \1\n", h, flags=re.I|re.S)
    h = re.sub(r"<h4[^>]*>(.*?)</h4>", r"\n#### \1\n", h, flags=re.I|re.S)
    h = re.sub(r"<h5[^>]*>(.*?)</h5>", r"\n##### \1\n", h, flags=re.I|re.S)
    h = re.sub(r"<h6[^>]*>(.*?)</h6>", r"\n###### \1\n", h, flags=re.I|re.S)
    h = re.sub(r"<strong[^>]*>(.*?)</strong>", r"**\1**", h, flags=re.I|re.S)
    h = re.sub(r"<b[^>]*>(.*?)</b>", r"**\1**", h, flags=re.I|re.S)
    h = re.sub(r"<em[^>]*>(.*?)</em>", r"*\1*", h, flags=re.I|re.S)
    h = re.sub(r"<i[^>]*>(.*?)</i>", r"*\1*", h, flags=re.I|re.S)
    h = re.sub(r"<li[^>]*>(.*?)</li>", r"- \1\n", h, flags=re.I|re.S)
    h = re.sub(r"<ul[^>]*>|</ul>|<ol[^>]*>|</ol>", "", h, flags=re.I)
    h = re.sub(r"<img[^>]+>", "", h, flags=re.I)  # remove images
    h = re.sub(r"<a[^>]*>(.*?)</a>", r"\1", h, flags=re.I|re.S)
    h = re.sub(r"<[^>]+>", "", h)
    h = h.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    h = h.replace("&nbsp;", " ").replace("&#038;", "&").replace("&quot;", '"')
    h = re.sub(r"\n{3,}", "\n\n", h)
    # Clean MDX-unsafe characters
    h = re.sub(r"\{([^}]*)\}", r"&#123;\1&#125;", h)
    return h.strip()


def unescape_sql(s: str) -> str:
    return (s.replace("\\'", "'")
              .replace('\\"', '"')
              .replace("\\\\", "\\")
              .replace("\\n", "\n")
              .replace("\\r", ""))


# ── Step 1: Find post IDs for all case study slugs ───────────────────────────
slugs = [f[:-4] for f in os.listdir(CS_DIR) if f.endswith(".mdx")]
print(f"Step 1: Looking for {len(slugs)} slugs in SQL...")

slug_to_pid: dict[str, int] = {}

with open(SQL_PATH, encoding="utf-8", errors="replace") as f:
    for line in f:
        for slug in slugs:
            if slug in slug_to_pid:
                continue
            if f"'{slug}'" in line:
                m = re.match(r"^\((\d+),", line)
                if m:
                    pid = int(m.group(1))
                    slug_to_pid[slug] = pid

print(f"  Found {len(slug_to_pid)}/{len(slugs)} post IDs")

# Build reverse map
pid_to_slug = {v: k for k, v in slug_to_pid.items()}
all_pids = set(pid_to_slug.keys())

# ── Step 2: Extract custom field values for each post ID ─────────────────────
print(f"Step 2: Extracting custom fields...")

# post_id → {key: value}
post_data: dict[int, dict[str, str]] = {pid: {} for pid in all_pids}

# Parse postmeta rows: (meta_id, post_id, 'meta_key', 'meta_value'),
meta_re = re.compile(
    r"^\((\d+),\s*(\d+),\s*'([^']+)',\s*'((?:[^'\\]|\\.)*)'\s*[,);]"
)

with open(SQL_PATH, encoding="utf-8", errors="replace") as f:
    for line in f:
        # Quick check
        interesting = False
        for k in CONTENT_KEYS + ["author_name", "author_designation", "company", "industry"]:
            if f"'{k}'" in line:
                interesting = True
                break
        if not interesting:
            continue

        m = meta_re.match(line)
        if not m:
            continue

        post_id = int(m.group(2))
        if post_id not in all_pids:
            continue

        key = m.group(3)
        if key not in CONTENT_KEYS + ["author_name", "author_designation", "company", "industry"]:
            continue

        val = unescape_sql(m.group(4))
        post_data[post_id][key] = val

filled = sum(1 for d in post_data.values() if any(d.get(k) for k in CONTENT_KEYS))
print(f"  Got content for {filled}/{len(all_pids)} posts")

# ── Step 3: Build MDX body ────────────────────────────────────────────────────
def build_mdx_body(d: dict) -> str:
    parts = []

    for key in CONTENT_KEYS:
        val = d.get(key, "").strip()
        if not val:
            continue
        label = SECTION_LABELS[key]
        md = html_to_md(val)
        if not md:
            continue

        if key == "author_text":
            # Render as blockquote
            author = d.get("author_name", "")
            designation = d.get("author_designation", "")
            quote_lines = "\n".join(f"> {line}" for line in md.split("\n"))
            if author:
                quote_lines += f"\n>\n> — **{author}**"
                if designation:
                    quote_lines += f", {designation.replace('&amp;', '&')}"
            parts.append(quote_lines)
        else:
            if label:
                parts.append(f"{label}\n\n{md}")
            else:
                parts.append(md)

    return "\n\n".join(parts)


# ── Step 4: Write MDX files ───────────────────────────────────────────────────
print(f"\nStep 4: Writing MDX files (dry_run={DRY_RUN})...")

updated = skipped_no_data = skipped_has_content = 0

for fname in sorted(os.listdir(CS_DIR)):
    if not fname.endswith(".mdx"):
        continue
    slug = fname[:-4]
    fpath = os.path.join(CS_DIR, fname)

    with open(fpath, encoding="utf-8") as fh:
        raw = fh.read()

    parts = raw.split("---\n", 2)
    if len(parts) < 3:
        continue

    fm_block = "---\n" + parts[1] + "---\n"
    existing_body = parts[2].strip()

    if len(existing_body) > 100:
        skipped_has_content += 1
        continue

    pid = slug_to_pid.get(slug)
    if not pid:
        skipped_no_data += 1
        continue

    d = post_data.get(pid, {})
    body = build_mdx_body(d)

    if not body or len(body) < 50:
        skipped_no_data += 1
        continue

    new_file = fm_block + "\n" + body + "\n"

    if DRY_RUN:
        print(f"  [DRY] {slug[:55]}: {len(body)} chars")
    else:
        with open(fpath, "w", encoding="utf-8") as fh:
            fh.write(new_file)

    updated += 1

print(f"\n📊 Summary:")
print(f"  Updated:                    {updated}")
print(f"  Skipped (had content):      {skipped_has_content}")
print(f"  Skipped (no content found): {skipped_no_data}")
print(f"\n✅ Done!")
