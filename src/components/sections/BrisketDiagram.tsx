/**
 * Educational cross-section of a smoked brisket slice — an original
 * illustration, not a depiction of the restaurant's product.
 */
export function BrisketDiagram({ tone = "dark" }: { tone?: "dark" | "cream" }) {
  const ink = tone === "dark" ? "#f1e5d0" : "#0d0c0b";
  const muted = tone === "dark" ? "rgba(241,229,208,0.6)" : "rgba(13,12,11,0.65)";
  return (
    <figure className="w-full">
      <svg viewBox="0 0 720 380" role="img" aria-labelledby="brisket-title brisket-desc" className="h-auto w-full">
        <title id="brisket-title">Anatomy of a smoked brisket slice</title>
        <desc id="brisket-desc">
          A cross-section showing the dark bark on the outside, a pink smoke ring beneath it, the fat cap, and the two
          muscles of the brisket: the thicker point and the leaner flat.
        </desc>
        {/* bark */}
        <path
          d="M60 250 C 70 150, 190 110, 300 120 C 380 128, 430 90, 520 92 C 610 94, 670 150, 664 210 C 658 268, 600 300, 500 302 L 120 306 C 80 306, 56 290, 60 250 Z"
          fill="#1c120c"
        />
        {/* smoke ring */}
        <path
          d="M78 250 C 88 164, 196 128, 300 138 C 384 146, 432 110, 520 112 C 600 114, 648 160, 644 210 C 640 258, 592 284, 500 286 L 124 290 C 92 290, 74 278, 78 250 Z"
          fill="#c4574a"
        />
        {/* meat */}
        <path
          d="M92 250 C 102 176, 200 146, 300 154 C 386 160, 436 126, 520 128 C 592 130, 630 168, 628 210 C 626 250, 584 270, 500 272 L 128 276 C 102 276, 88 268, 92 250 Z"
          fill="#7a3f2c"
        />
        {/* point / flat separation fat seam */}
        <path d="M380 150 C 400 190, 430 230, 640 222" stroke="#e8d7b8" strokeWidth="7" fill="none" opacity="0.9" />
        {/* fat cap under flat */}
        <path d="M110 288 L 500 284 C 560 284, 610 270, 640 240" stroke="#e8d7b8" strokeWidth="9" fill="none" opacity="0.85" />
        {/* grain lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M${120 + i * 30} 260 C ${140 + i * 30} 220, ${150 + i * 30} 190, ${170 + i * 30} 165`}
            stroke="#5e2f20"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        ))}

        {/* callouts */}
        <g fontFamily="var(--font-display), sans-serif" fontWeight="600" fontSize="15" letterSpacing="2.5" fill={ink}>
          <line x1="250" y1="122" x2="230" y2="40" stroke={muted} />
          <text x="150" y="32">BARK</text>
          <line x1="560" y1="118" x2="600" y2="40" stroke={muted} />
          <text x="560" y="32">SMOKE RING</text>
          <line x1="500" y1="180" x2="560" y2="350" stroke={muted} />
          <text x="540" y="370">THE POINT</text>
          <line x1="230" y1="220" x2="180" y2="350" stroke={muted} />
          <text x="120" y="370">THE FLAT</text>
          <line x1="360" y1="286" x2="360" y2="350" stroke={muted} />
          <text x="300" y="370">FAT CAP</text>
        </g>
      </svg>
      <figcaption className={`label mt-4 ${tone === "dark" ? "text-cream/60" : "text-ink/70"}`}>
        Fig. — Anatomy of a brisket slice (illustration)
      </figcaption>
    </figure>
  );
}
