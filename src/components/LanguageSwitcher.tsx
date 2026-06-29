'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const current = (params.locale as Locale) ?? 'en';
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function change(locale: Locale) {
    setOpen(false);
    router.replace(pathname, { locale });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white/70 px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-brass-3 hover:bg-surface"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        <span className="uppercase">{current}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 min-w-[150px] overflow-hidden rounded-card border border-line bg-white py-1 shadow-lift"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === current}
                onClick={() => change(l)}
                className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-surface ${
                  l === current ? 'font-semibold text-navy' : 'text-text'
                }`}
              >
                {localeNames[l]}
                <span className="text-xs uppercase text-muted">{l}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
