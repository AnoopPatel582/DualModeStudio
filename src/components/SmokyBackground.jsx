function SmokeRibbonTile({ className, seed = 1 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={`smokeRibbon_${seed}`} x="-25%" y="-40%" width="150%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.018"
            numOctaves="3"
            seed={seed}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.008 0.018; 0.013 0.024; 0.008 0.018"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="52"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Ribbon look: strong blur + slight sharpening for glowing edge */}
          <feGaussianBlur in="displaced" stdDeviation="22" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.85 0
            "
            result="alphaBoost"
          />
          <feGaussianBlur in="alphaBoost" stdDeviation="6" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="alphaBoost" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#smokeRibbon_${seed})`} opacity="1">
        {/* Overlapping blobs = single organic mass (avoids two vertical columns) */}
        <ellipse cx="200" cy="380" rx="280" ry="140" fill="currentColor" opacity="0.12" />
        <ellipse cx="500" cy="340" rx="320" ry="180" fill="currentColor" opacity="0.15" />
        <ellipse cx="800" cy="360" rx="300" ry="160" fill="currentColor" opacity="0.14" />
        <ellipse cx="1100" cy="350" rx="260" ry="130" fill="currentColor" opacity="0.10" />
        {/* Thin wisps for line-like detail */}
        <path d="M0,320 Q300,280 600,340 T1200,310" fill="none" stroke="currentColor" strokeWidth="45" strokeLinecap="round" opacity="0.08" />
        <path d="M-50,420 Q400,380 750,440 T1400,400" fill="none" stroke="currentColor" strokeWidth="35" strokeLinecap="round" opacity="0.06" />
      </g>
    </svg>
  );
}

export default function SmokyBackground() {
  return (
    <div className="smokeMarquee" style={{ color: "rgb(0 153 255)" }} aria-hidden="true">
      {/* Seamless loop: 2 tiles in a track that slides left forever */}
      <div className="smokeTrack smokeTrack--a">
        <SmokeRibbonTile className="smokeTile" seed={2} />
        <SmokeRibbonTile className="smokeTile" seed={2} />
      </div>

      <div className="smokeTrack smokeTrack--b">
        <SmokeRibbonTile className="smokeTile" seed={7} />
        <SmokeRibbonTile className="smokeTile" seed={7} />
      </div>
    </div>
  );
}