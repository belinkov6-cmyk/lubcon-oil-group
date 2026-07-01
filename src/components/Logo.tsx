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
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="lub-gold" x1="6" y1="6" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0D38A" />
            <stop offset="0.55" stopColor="#D7A93F" />
            <stop offset="1" stopColor="#9C7A33" />
          </linearGradient>
        </defs>
        {/* cog ring + teeth (manufacturing) */}
        <g fill="url(#lub-gold)">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="18.4" y="1" width="3.2" height="5.4" rx="1.1" transform={`rotate(${i * 30} 20 20)`} />
          ))}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.6 20a16.4 16.4 0 1 1 32.8 0 16.4 16.4 0 0 1-32.8 0Zm7 0a9.4 9.4 0 1 0 18.8 0 9.4 9.4 0 0 0-18.8 0Z"
          />
        </g>
        {/* oil drop inside */}
        <path
          d="M20 11.4C23.4 16.5 26 19.9 26 22.8A6 6 0 0 1 14 22.8C14 19.9 16.6 16.5 20 11.4Z"
          fill="url(#lub-gold)"
        />
        <path d="M16.8 22.7a3.2 3.2 0 0 0 3.2 3.2" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" fill="none" />
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
