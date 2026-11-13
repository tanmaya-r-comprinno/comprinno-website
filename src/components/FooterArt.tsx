/**
 * Footer visual, "From launch to ascent": the Comprinno mark (the folded arrow, drawn
 * as a small 3D object) rising off glowing flight paths above a faint perspective
 * cloud grid, with the wordmark large and faint behind it.
 * Brand navy / blue / yellow only. Motion reuses existing classes (tv-float, bill-run)
 * and switches off for reduced motion.
 */

// Comprinno mark, traced from the brand logo (local 130 x 130 box)
const MARK = {
  darkBlue: "0,0 25,0 98,33 78,56 0,17",
  lightBlue: "78,56 98,33 130,107 130,130 111,130",
  ochre: "36,0 130,0 101,32",
  yellow: "101,32 130,0 130,95",
};

/**
 * The mark lit like a solid object, no outline or extruded edges: each face has a soft
 * light-to-shade gradient (light from the upper left) and the whole mark casts a blurred
 * shadow below, so it reads as floating in front of the scene.
 */
function Mark3D() {
  const faces: [string, string, string, string][] = [
    // points, id, light, shade
    [MARK.darkBlue, "fm-a", "#3d97e6", "#0059a8"],
    [MARK.lightBlue, "fm-b", "#5cb2ff", "#006bc9"],
    [MARK.ochre, "fm-c", "#f0bb2e", "#b98800"],
    [MARK.yellow, "fm-d", "#ffd24d", "#e0a400"],
  ];
  return (
    <g>
      <defs>
        {faces.map(([, id, l, d]) => (
          <linearGradient key={id} id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={l} />
            <stop offset="1" stopColor={d} />
          </linearGradient>
        ))}
        <filter id="fm-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      {/* soft cast shadow, offset down-right */}
      <g transform="translate(14 22)" filter="url(#fm-shadow)" opacity=".55">
        {faces.map(([pts, id]) => <polygon key={id} points={pts} fill="#000522" />)}
      </g>
      {/* lit faces */}
      {faces.map(([pts, id]) => <polygon key={id} points={pts} fill={`url(#${id})`} />)}
    </g>
  );
}

export default function FooterArt() {
  // flight paths: rise from the lower left towards the mark (upper right)
  const paths = [
    { d: "M-40 338 C 320 330, 600 312, 820 270 S 1100 196, 1168 176", w: 2.4, c: "url(#fa-blue)", glow: true },
    { d: "M-40 354 C 360 350, 680 338, 890 300 S 1130 222, 1196 206", w: 1.6, c: "url(#fa-sky)", glow: true },
    { d: "M-40 322 C 280 312, 540 296, 760 254 S 1060 176, 1150 152", w: 1.4, c: "url(#fa-gold)", glow: false },
  ];
  return (
    <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax meet" className="pd block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="fa-word" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".09" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fa-blue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#006bc9" stopOpacity="0" />
          <stop offset=".55" stopColor="#0088ff" />
          <stop offset="1" stopColor="#9fd3ff" />
        </linearGradient>
        <linearGradient id="fa-sky" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0088ff" stopOpacity="0" />
          <stop offset="1" stopColor="#5cb2ff" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="fa-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffbb00" stopOpacity="0" />
          <stop offset="1" stopColor="#ffbb00" stopOpacity=".9" />
        </linearGradient>
        <linearGradient id="fa-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0088ff" stopOpacity=".22" />
          <stop offset="1" stopColor="#0088ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fa-grid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="fa-grid-mask"><rect x="0" y="220" width="1440" height="140" fill="url(#fa-grid-fade)" /></mask>
        <radialGradient id="fa-halo">
          <stop offset="0" stopColor="#0088ff" stopOpacity=".45" />
          <stop offset="1" stopColor="#0088ff" stopOpacity="0" />
        </radialGradient>
        <filter id="fa-glow" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* faint wordmark behind everything */}
      <text x="720" y="352" textAnchor="middle" fontSize="236" fontWeight="800" letterSpacing="-4" textLength="1380" lengthAdjust="spacingAndGlyphs" fill="url(#fa-word)" fontFamily="Poppins, Inter, Arial, sans-serif">Comprinno</text>

      {/* perspective cloud grid */}
      <g mask="url(#fa-grid-mask)" stroke="#5cb2ff" strokeOpacity=".22" strokeWidth="1">
        {Array.from({ length: 25 }, (_, i) => {
          const x = -480 + i * 100;
          return <line key={`v${i}`} x1={720 + (x - 720) * 0.35} y1="220" x2={x} y2="360" />;
        })}
        {[226, 236, 250, 270, 298, 336].map((y) => <line key={`h${y}`} x1="0" y1={y} x2="1440" y2={y} />)}
      </g>

      {/* area under the main flight path */}
      <path d={`${paths[0].d} L 1168 360 L -40 360 Z`} fill="url(#fa-area)" />

      {/* flight paths with a light running along each */}
      {paths.map((p, i) => (
        <g key={i}>
          <path d={p.d} fill="none" stroke={p.c} strokeWidth={p.w} filter={p.glow ? "url(#fa-glow)" : undefined} />
          <path d={p.d} fill="none" stroke={i === 2 ? "#fff3c4" : "#ffffff"} strokeWidth={p.w + 0.6} strokeLinecap="round" pathLength={100} strokeDasharray="6 94" className="bill-run" style={{ animationDuration: `${6 + i * 1.5}s`, animationDelay: `${-i * 1.7}s` }} />
        </g>
      ))}

      {/* the mark, lifting off */}
      <circle cx="1222" cy="160" r="110" fill="url(#fa-halo)" />
      <g className="tv-float">
        <g transform="translate(1168 92) rotate(-10) scale(0.95)">
          <Mark3D />
        </g>
      </g>
    </svg>
  );
}
