import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HeroVisual3D from '../hero/HeroVisual3D';

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
          <h1 className="mt-5 h-display text-[3rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
            {t('title1')}
            <span className="accent-serif">{t('titleAccent')}</span>.
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

        {/* Visual: 3D premium oil bottle (private-label) */}
        <div className="relative hidden opacity-0 animate-fadeup lg:block" style={{ animationDelay: '160ms' }}>
          <HeroVisual3D caption={t('cycleCaption')} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted lg:flex">
        <span className="text-[11px] uppercase tracking-[0.2em]">{t('scroll')}</span>
        <span className="h-8 w-px animate-floaty bg-gradient-to-b from-brass to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
