import { ImageResponse } from "next/og";
import { formatDate, post, posts } from "@/lib/blog";

/**
 * Link-preview card for a blog post (LinkedIn, X, Slack, WhatsApp...).
 * Posts have no cover image, so this renders a branded card with the title.
 * Generated at build time for every post.
 */
export const alt = "Comprinno Insights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = post((await params).slug);
  const title = p?.title ?? "Comprinno Insights";
  // Long titles shrink so they stay within the card.
  const fontSize = title.length > 90 ? 52 : title.length > 60 ? 62 : 72;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#ffffff", borderTop: "16px solid #006bc9", padding: "64px 72px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#1c1c1c", letterSpacing: -0.5 }}>Comprinno</div>
          {p && (
            <div style={{ display: "flex", fontSize: 22, color: "#006bc9", border: "2px solid #c9e0f6", background: "#e3f0fc", padding: "8px 18px", textTransform: "uppercase", letterSpacing: 2 }}>
              {p.topic}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", fontSize, fontWeight: 700, lineHeight: 1.15, color: "#1c1c1c", letterSpacing: -1 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: "#6b6b6b" }}>
          <div style={{ display: "flex" }}>{p ? `${p.author} · ${formatDate(p.publishedAt)}` : "comprinno.net"}</div>
          <div style={{ display: "flex", width: 120, height: 10, background: "#ffbb00" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
