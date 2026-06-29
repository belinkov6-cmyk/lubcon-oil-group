import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import FlagMark from '../FlagMark';

export default function Hero() {
  const t = useTranslations('hero');

  const stats = [
    { v: t('stat1Value'), l: t('stat1Label') },
    { v: t('stat2Value'), l: t('stat2Label') },
    { v: t('stat3Value'), l: t('stat3Label') },
    { v: t('stat4Value'), l: t('stat4Label') },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface via-white to-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.6]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 end-[-10%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,154,69,.16), transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 start-[-8%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(18,138,78,.14), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <span className="eyebrow animate-fadeup">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
            {t('eyebrow')}
          </span>

          {/* LCP element — rendered immediately, no entrance animation */}
          <h1 className="mt-5 h-display text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
            {t('title1')}{' '}
            <span className="accent-serif">{t('titleAccent')}</span>,{' '}
            {t('title2')}.
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted opacity-0 animate-fadeup sm:text-lg"
            style={{ animationDelay: '120ms' }}
          >
            {t('subhead')}
          </p>

          <div
            className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fadeup"
            style={{ animationDelay: '200ms' }}
          >
            <Link href="/contact" className="btn-brass">
              {t('ctaQuote')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/private-label" className="btn-ghost">
              {t('ctaDistributor')}
            </Link>
          </div>

          <dl
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line opacity-0 animate-fadeup sm:grid-cols-4"
            style={{ animationDelay: '280ms' }}
          >
            {stats.map((s) => (
              <div key={s.l} className="bg-white px-4 py-5">
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span className="block font-display text-2xl font-extrabold brass-gradient-text sm:text-3xl">
                    {s.v}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted">{s.l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual: stacked product / oil-flow card */}
        <div className="relative hidden opacity-0 animate-fadeup lg:block" style={{ animationDelay: '160ms' }}>
          <HeroVisual />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted lg:flex">
        <span className="text-[11px] uppercase tracking-[0.2em]">{t('scroll')}</span>
        <span className="h-8 w-px animate-floaty bg-gradient-to-b from-brass to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
      <div className="absolute inset-0 rounded-[26px] border border-line bg-gradient-to-br from-white to-surface shadow-lift" />
      {/* Flowing oil arcs */}
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="oil1" x1="0" y1="0" x2="400" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8D4A6" />
            <stop offset="1" stopColor="#B07D2B" />
          </linearGradient>
          <linearGradient id="oil2" x1="0" y1="0" x2="400" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2BA567" />
            <stop offset="1" stopColor="#0B6B3A" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M-20 ${120 + i * 70} C 120 ${60 + i * 70}, 260 ${200 + i * 60}, 440 ${100 + i * 70}`}
            stroke={i % 2 ? 'url(#oil2)' : 'url(#oil1)'}
            strokeWidth="2"
            strokeDasharray="6 10"
            opacity={0.5 - i * 0.05}
            className="animate-dash"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </svg>

      {/* Concentric rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[200, 150, 100].map((s, i) => (
          <div
            key={s}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass-3"
            style={{ width: s, height: s, opacity: 0.6 - i * 0.12 }}
          />
        ))}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-navy text-white shadow-brass">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2c3.6 4.2 6 7.6 6 11a6 6 0 1 1-12 0c0-3.4 2.4-6.8 6-11Z" fill="url(#oil1)" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-pill border border-line bg-white/80 px-4 py-1.5 text-xs font-semibold text-navy backdrop-blur">
        <FlagMark width={18} />
        Made in Ras Al Khaimah · UAE
      </div>
    </div>
  );
}
