'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { company } from '@/lib/site';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { href: '/products', key: 'products' },
  { href: '/manufacturing', key: 'manufacturing' },
  { href: '/certifications', key: 'certifications' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const th = useTranslations('header');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(true); // light is the default theme
  // Over the dark hero the header is light-on-dark; in the light theme the hero
  // is cream, so the header flips to dark-on-light. `dark` = render light text.
  const dark = !lightTheme;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    const read = () => setLightTheme(el.getAttribute('data-theme') === 'light');
    read();
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? dark
            ? 'border-b border-line bg-[rgba(14,10,5,0.9)] backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,.4)]'
            : 'border-b border-line bg-[rgba(255,253,248,0.92)] backdrop-blur-md shadow-[0_8px_24px_rgba(120,90,30,.12)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Logo light={dark} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-pill px-3.5 py-2 text-sm font-medium transition-colors ${
                dark
                  ? 'text-cream hover:bg-white/10 hover:text-gold-hi'
                  : 'text-text hover:bg-surface hover:text-navy'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${company.phoneE164}`}
            className={`whitespace-nowrap rounded-pill px-3 py-2 text-sm font-semibold transition-colors ${
              dark ? 'text-cream hover:bg-white/10' : 'text-navy hover:bg-surface'
            }`}
          >
            {company.phoneDisplay}
          </a>
          <Link href="/contact" className="btn-gold whitespace-nowrap px-5 py-2.5 text-sm">
            {th('quote')}
          </Link>
          <LanguageSwitcher label={th('language')} light={dark} />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <LanguageSwitcher label={th('language')} light={dark} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={th('menu')}
            aria-expanded={open}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-pill border transition-colors ${
              dark ? 'border-white/25 bg-white/10 text-cream' : 'border-line bg-white/70 text-ink'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy/30 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          style={{ backgroundColor: dark ? '#0f0a05' : '#fdf8ee' }}
          className={`absolute end-0 top-0 flex h-full w-[84%] max-w-sm flex-col shadow-lift transition-transform duration-300 ${
            open ? 'translate-x-0' : 'rtl:-translate-x-full ltr:translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 h-16">
            <Logo onClick={() => setOpen(false)} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={th('close')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line text-ink"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-card px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-surface"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 border-t border-line p-5">
            <a href={`tel:${company.phoneE164}`} className="btn-ghost w-full">
              {company.phoneDisplay}
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-gold w-full">
              {th('quote')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
