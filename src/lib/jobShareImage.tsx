import { ImageResponse } from "next/og";
import type { Metadata } from "next";
import type { CareerCampaign } from "@/content/careerCampaigns";

/**
 * Link-preview card for a job page (LinkedIn, Facebook, X, WhatsApp...).
 * One design for every role: add an `opengraph-image.tsx` next to the job page that
 * calls `jobShareImage(campaign)` and re-exports `jobImageSize` as `size`.
 */
export const jobImageSize = { width: 1200, height: 630 };

export function jobShareImage(job: CareerCampaign) {
  const fontSize = job.title.length > 40 ? 64 : 76;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f4f3ff", borderTop: "16px solid #006bc9", padding: "60px 72px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#0a134b", letterSpacing: -0.5 }}>Comprinno</div>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#1c1c1c", background: "#ffbb00", padding: "8px 18px", textTransform: "uppercase", letterSpacing: 2 }}>
            We’re hiring
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", fontSize, fontWeight: 700, lineHeight: 1.08, color: "#0a134b", letterSpacing: -1.5 }}>{job.title}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, lineHeight: 1.35, color: "#3d4466", maxWidth: 980 }}>{job.hook}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: "#006bc9", fontWeight: 600 }}>
          <div style={{ display: "flex" }}>{`${job.location} · ${job.experience} · comprinno.net`}</div>
          <div style={{ display: "flex", width: 120, height: 10, background: "#ffbb00" }} />
        </div>
      </div>
    ),
    { ...jobImageSize },
  );
}

/** Page metadata so shares use the job's own title, text and URL (not the site defaults). */
export function jobMetadata(job: CareerCampaign, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: job.href },
    openGraph: { type: "website", siteName: "Comprinno", url: job.href, title: `${title} | Comprinno`, description },
    twitter: { card: "summary_large_image", title: `${title} | Comprinno`, description },
  };
}
