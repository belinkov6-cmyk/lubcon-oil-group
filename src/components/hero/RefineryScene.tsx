/**
 * Light-theme vector illustration of an oil refinery: distillation towers,
 * storage tanks, a flare stack and bold foreground pipework with flowing product.
 * Pure SVG + CSS animations (reduced-motion friendly). No client JS.
 */
export default function RefineryScene() {
  return (
    <svg
      viewBox="0 0 640 480"
      className="h-auto w-full"
      role="img"
      aria-label="Oil refinery distillation towers and pipework"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="rf-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBE9C2" />
          <stop offset="1" stopColor="#FBE9C2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rf-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#e7eeea" />
          <stop offset="1" stopColor="#cdd8d2" />
        </linearGradient>
        <linearGradient id="rf-pipe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f7f5" />
          <stop offset="0.5" stopColor="#d6e0db" />
          <stop offset="1" stopColor="#aebbb4" />
        </linearGradient>
        <linearGradient id="rf-tank" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6faf7" />
          <stop offset="1" stopColor="#dde7e1" />
        </linearGradient>
        <radialGradient id="rf-flame" cx="0.5" cy="0.7" r="0.7">
          <stop offset="0" stopColor="#FCE8A6" />
          <stop offset="0.5" stopColor="#F3B324" />
          <stop offset="1" stopColor="#CE1126" />
        </radialGradient>
      </defs>

      {/* warm sun glow */}
      <circle cx="470" cy="120" r="150" fill="url(#rf-sun)" />
      <circle cx="470" cy="120" r="40" fill="#F8D98A" opacity="0.7" />

      {/* ---- background distillation towers ---- */}
      <g stroke="#9fb1a8" strokeWidth="2">
        {/* tower A */}
        <g>
          <rect x="138" y="196" width="50" height="208" rx="8" fill="url(#rf-metal)" />
          <ellipse cx="163" cy="196" rx="25" ry="9" fill="#eef3f0" />
          <line x1="138" y1="240" x2="188" y2="240" />
          <line x1="138" y1="286" x2="188" y2="286" />
          <line x1="138" y1="332" x2="188" y2="332" />
          <rect x="159" y="170" width="8" height="28" fill="#b7c4bd" stroke="none" />
          <rect x="132" y="262" width="62" height="5" fill="#0B6B3A" stroke="none" opacity="0.85" />
        </g>
        {/* tower B (short) */}
        <g>
          <rect x="222" y="244" width="40" height="160" rx="7" fill="url(#rf-metal)" />
          <ellipse cx="242" cy="244" rx="20" ry="8" fill="#eef3f0" />
          <line x1="222" y1="290" x2="262" y2="290" />
          <line x1="222" y1="338" x2="262" y2="338" />
          <rect x="218" y="310" width="48" height="5" fill="#F3B324" stroke="none" />
        </g>
        {/* tower C (tallest) */}
        <g>
          <rect x="300" y="132" width="58" height="272" rx="9" fill="url(#rf-metal)" />
          <ellipse cx="329" cy="132" rx="29" ry="10" fill="#eef3f0" />
          <line x1="300" y1="180" x2="358" y2="180" />
          <line x1="300" y1="228" x2="358" y2="228" />
          <line x1="300" y1="276" x2="358" y2="276" />
          <line x1="300" y1="324" x2="358" y2="324" />
          <rect x="325" y="104" width="8" height="28" fill="#b7c4bd" stroke="none" />
          <rect x="294" y="204" width="70" height="6" fill="#0B6B3A" stroke="none" opacity="0.85" />
        </g>
      </g>

      {/* ---- spherical storage tanks ---- */}
      <g stroke="#9fb1a8" strokeWidth="2">
        <g>
          <circle cx="470" cy="338" r="48" fill="url(#rf-tank)" />
          <path d="M470 290v96M422 338h96" stroke="#c3cfc8" strokeWidth="1.5" />
          <line x1="446" y1="380" x2="440" y2="404" />
          <line x1="494" y1="380" x2="500" y2="404" />
        </g>
        <g>
          <circle cx="552" cy="352" r="34" fill="url(#rf-tank)" />
          <path d="M552 318v68M518 352h68" stroke="#c3cfc8" strokeWidth="1.5" />
          <line x1="536" y1="382" x2="532" y2="404" />
          <line x1="568" y1="382" x2="572" y2="404" />
        </g>
      </g>

      {/* ---- flare stack ---- */}
      <g>
        <rect x="606" y="150" width="9" height="254" fill="url(#rf-pipe)" stroke="#9fb1a8" strokeWidth="1.5" />
        <g style={{ transformBox: 'view-box', transformOrigin: '610px 150px', animation: 'flare 1.6s ease-in-out infinite' }}>
          <path d="M610 150c10-16 7-30 2-40 8 8 16 20 12 34 7-4 9-12 8-20 6 10 9 24-2 36-4 5-16 6-22-2-2-3-2-6 2-8Z" fill="url(#rf-flame)" />
        </g>
        {/* steam puffs */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={120 + i * 90}
            cy={i % 2 ? 240 : 190}
            r="9"
            fill="#ffffff"
            style={{ animation: `steam 4s ease-out ${i * 1.1}s infinite` }}
          />
        ))}
      </g>

      {/* ---- mid pipe rack ---- */}
      <g>
        <line x1="120" y1="356" x2="470" y2="356" stroke="url(#rf-pipe)" strokeWidth="8" strokeLinecap="round" />
        <line
          x1="120"
          y1="356"
          x2="470"
          y2="356"
          stroke="#F3B324"
          strokeWidth="2.5"
          strokeDasharray="2 16"
          strokeLinecap="round"
          style={{ animation: 'pipeflow 5s linear infinite' }}
        />
        {[170, 250, 330, 410].map((x) => (
          <line key={x} x1={x} y1="356" x2={x} y2="404" stroke="#aebbb4" strokeWidth="4" />
        ))}
      </g>

      {/* ---- ground ---- */}
      <rect x="0" y="404" width="640" height="6" fill="#dbe4de" />
      <rect x="0" y="410" width="640" height="70" fill="#eef3f0" />

      {/* ---- bold foreground pipework (focal point) ---- */}
      <g strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* pipe 1 with riser */}
        <path d="M-10 372 L360 372 L388 344 L388 300 L500 300" stroke="url(#rf-pipe)" strokeWidth="26" />
        <path d="M-10 372 L360 372 L388 344 L388 300 L500 300" stroke="#ffffff" strokeWidth="3" opacity="0.6" transform="translate(0,-7)" />
        <path
          d="M-10 372 L360 372 L388 344 L388 300 L500 300"
          stroke="#F3B324"
          strokeWidth="4"
          strokeDasharray="3 22"
          style={{ animation: 'pipeflow 4s linear infinite' }}
        />
        {/* pipe 2 */}
        <path d="M-10 418 L540 418" stroke="url(#rf-pipe)" strokeWidth="24" />
        <path d="M-10 418 L540 418" stroke="#ffffff" strokeWidth="3" opacity="0.6" transform="translate(0,-6)" />
        <path
          d="M-10 418 L540 418"
          stroke="#0B6B3A"
          strokeWidth="4"
          strokeDasharray="3 22"
          style={{ animation: 'pipeflow 5.5s linear infinite' }}
        />
      </g>

      {/* flanges + valves on foreground pipes */}
      <g>
        {/* flanges */}
        {[
          [150, 372],
          [300, 372],
          [200, 418],
          [400, 418],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 4} y={y - 18} width="8" height="36" rx="2" fill="#b7c4bd" />
        ))}
        {/* valve handwheels */}
        {[
          [150, 372],
          [300, 372],
          [400, 418],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 5} y={y - 30} width="10" height="14" fill="#9fb1a8" />
            <circle cx={x} cy={y - 34} r="13" fill="#F3B324" stroke="#e09a12" strokeWidth="2" />
            <circle cx={x} cy={y - 34} r="4" fill="#fff" />
            <path
              d={`M${x - 13} ${y - 34}h26M${x} ${y - 47}v26`}
              stroke="#e09a12"
              strokeWidth="2"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
