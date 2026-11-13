/**
 * Partnership hero art (used on the OpenAI and Anthropic pages): two square tiles with physical depth (cube-like,
 * via .badge-thick stacked shadows). Comprinno sits behind (lower left), the partner in
 * front (upper right); they overlap at one corner, where a glass "×" joins them.
 * Logos are centred on their tiles. Shares the AWS badge's sway and hover tilt.
 */
import { partnerLogo } from "@/content/partnerLogos";

export default function PartnerPairArt({ partner, className = "" }: { partner: "openai" | "anthropic"; className?: string }) {
  const logo = partnerLogo[partner];
  const id = `pp-${partner}`;
  return (
    <svg viewBox="0 0 320 310" className={className} role="img" aria-label={`Comprinno and ${logo.title}`}>
      <defs>
        {/* glass: translucent white with a cool tint, bright rim and a soft highlight */}
        <radialGradient id={`${id}-glass`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
          <stop offset=".55" stopColor="#e3f0fc" stopOpacity=".7" />
          <stop offset="1" stopColor="#9fd3ff" stopOpacity=".55" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#9fd3ff" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0a134b" floodOpacity=".22" />
        </filter>
      </defs>

      {/* back tile: Comprinno (centre 98, 206) */}
      <g transform="rotate(-6 98 206)">
        <rect x="14" y="122" width="168" height="168" fill="#ffffff" stroke="#006bc9" strokeWidth="4" />
        <image href="/brand/comprinno-logo-stacked.webp" x="32" y="167.5" width="132" height="77" preserveAspectRatio="xMidYMid meet" />
      </g>

      {/* front tile: the partner (centre 230, 90) */}
      <g transform="rotate(7 230 90)">
        <rect x="154" y="14" width="152" height="152" fill="#ffffff" stroke="#1c1c1c" strokeWidth="4" />
        <g transform="translate(194 54) scale(3)">
          <path d={logo.d} fill="#1c1c1c" />
        </g>
      </g>

      {/* glass "×" where the two tiles meet */}
      <g filter={`url(#${id}-sh)`}>
        <circle cx="160" cy="138" r="20" fill={`url(#${id}-glass)`} stroke={`url(#${id}-rim)`} strokeWidth="2" />
        <ellipse cx="154" cy="129" rx="10" ry="4.5" fill="#ffffff" opacity=".7" />
        <path d="M153 131 L167 145 M167 131 L153 145" stroke="#006bc9" strokeWidth="3.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
