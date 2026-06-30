'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';

const FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  ar: '🇦🇪',
  zh: '🇨🇳',
  ru: '🇷🇺',
  es: '🇪🇸',
  pt: '🇵🇹',
};

export default function LanguageSwitcher({
  label,
  light = false,
}: {
  label: string;
  light?: boolean;
}) {
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
        className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-2 text-sm font-medium transition-colors ${
          light
            ? 'border-white/25 bg-white/10 text-cream hover:bg-white/20'
            : 'border-line bg-white/70 text-ink hover:border-brass-3 hover:bg-surface'
        }`}
      >
        <span className="text-base leading-none">{FLAGS[current]}</span>
        <span className="uppercase">{current}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="opacity-70">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 min-w-[150px] overflow-hidden rounded-card border border-line bg-[rgba(16,11,6,0.97)] py-1 shadow-lift backdrop-blur"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === current}
                onClick={() => change(l)}
                className={`flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-surface ${
                  l === current ? 'font-semibold text-navy' : 'text-text'
                }`}
              >
                <span className="text-base leading-none">{FLAGS[l]}</span>
                {localeNames[l]}
                <span className="ms-auto text-xs uppercase text-muted">{l}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
