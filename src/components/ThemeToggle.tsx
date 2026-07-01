'use client';

import { useEffect, useState } from 'react';

/**
 * Dark <-> light theme switch. Dark is the default (tokens live in :root);
 * light is opted into by setting data-theme="light" on <html>. The choice is
 * stored in localStorage and re-applied before paint by an inline script in the
 * root layout, so there is no flash on reload.
 */
export default function ThemeToggle({ label }: { label?: string }) {
  const [light, setLight] = useState(true); // light is the default theme

  useEffect(() => {
    setLight(document.documentElement.getAttribute('data-theme') === 'light');
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    const el = document.documentElement;
    if (next) el.setAttribute('data-theme', 'light');
    else el.removeAttribute('data-theme');
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {
      /* private mode — ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label ?? 'Toggle theme'}
      aria-pressed={light}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-pill border transition-colors lg:h-9 lg:w-9 ${
        light
          ? 'border-[color:var(--line)] bg-black/[0.04] text-[#8c6118] hover:bg-black/[0.08]'
          : 'border-white/25 bg-white/10 text-cream hover:bg-white/20'
      }`}
    >
      {light ? (
        /* moon — click to go dark */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        /* sun — click to go light */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.4 19.6 6 18M18 6l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
