import { Link } from '@/i18n/navigation';

export default function Logo({
  onClick,
  light = false,
}: {
  onClick?: () => void;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5"
      aria-label="Lubcon Oil Group — home"
    >
      <svg width="34" height="38" viewBox="0 0 36 40" fill="none" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="lub-gold" x1="8" y1="12" x2="28" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0D38A" />
            <stop offset="0.55" stopColor="#D7A93F" />
            <stop offset="1" stopColor="#9C7A33" />
          </linearGradient>
        </defs>
        {/* gold droplet */}
        <path
          d="M18 12 C23 19 27 24 27 29 a9 9 0 0 1 -18 0 C9 24 13 19 18 12 Z"
          fill="url(#lub-gold)"
        />
        <path d="M14.5 27.5 a3.5 3.5 0 0 0 3.5 3.5" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {/* red + blue flame tips */}
        <path d="M18 13 C13 9 13.2 4.8 16 2 C15.2 6 15.4 10 18 13 Z" fill="#E2231A" />
        <path d="M18 13 C23 9 22.8 4.8 20 2 C20.8 6 20.6 10 18 13 Z" fill="#1F2E6E" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[19px] font-extrabold tracking-tightest ${
            light ? 'text-cream' : 'text-ink'
          }`}
        >
          Lubcon
        </span>
        <span
          className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] ${
            light ? 'text-gold-hi' : 'text-gold-deep'
          }`}
        >
          Oil Group
        </span>
      </span>
    </Link>
  );
}
