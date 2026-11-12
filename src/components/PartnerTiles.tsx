/**
 * Hero partnership visual: two glossy, tilted tiles (Comprinno and the partner)
 * joined by an "×" disc, on a glowing brand-blue stage with light streaks.
 * Square corners to match the platform. Pure HTML/CSS + SVG (styles: .pt-* in brand.css).
 */
import { partnerLogo } from "@/content/partnerLogos";

export default function PartnerTiles({ partner = "openai" }: { partner?: keyof typeof partnerLogo }) {
  const logo = partnerLogo[partner];
  return (
    <div className="pt-stage" role="img" aria-label={`Comprinno and ${logo.title} are partners`}>
      <span className="pt-streak pt-streak-1" aria-hidden="true" />
      <span className="pt-streak pt-streak-2" aria-hidden="true" />
      <span className="pt-glow" aria-hidden="true" />

      {/* partner tile, back right */}
      <div className="pt-tile pt-tile-back" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-[38%] w-[38%]"><path d={logo.d} fill="#ffffff" /></svg>
        <span className="pt-name">{logo.title}</span>
      </div>

      {/* Comprinno tile, front left */}
      <div className="pt-tile pt-tile-front" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/comprinno-logo.webp" alt="" className="w-[80%] mix-blend-multiply" />
      </div>

      {/* the "×" joining them */}
      <span className="pt-x" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
      </span>
    </div>
  );
}
