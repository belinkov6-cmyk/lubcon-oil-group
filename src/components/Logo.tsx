import { Link } from '@/i18n/navigation';

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5"
      aria-label="NovaCore Global FZE — home"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-[11px] bg-navy text-white shadow-soft">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2c3.6 4.2 6 7.6 6 11a6 6 0 1 1-12 0c0-3.4 2.4-6.8 6-11Z"
            fill="url(#dropGrad)"
          />
          <defs>
            <linearGradient id="dropGrad" x1="6" y1="2" x2="18" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E8D4A6" />
              <stop offset="1" stopColor="#B07D2B" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-extrabold tracking-tightest text-ink">
          NovaCore
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy-600">
          Global FZE
        </span>
      </span>
    </Link>
  );
}
