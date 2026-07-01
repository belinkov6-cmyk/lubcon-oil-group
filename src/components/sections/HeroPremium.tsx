import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function HeroPremium() {
  const t = useTranslations('hero');
  const tp = useTranslations('promo');

  const metrics = [
    { v: tp('m1Value'), l: tp('m1Label') },
    { v: tp('m2Value'), l: tp('m2Label') },
    { v: tp('m3Value'), l: tp('m3Label') },
  ];

  return (
    <section className="relative isolate -mt-[65px] overflow-hidden bg-hero-bg0 sm:-mt-[73px]">
      {/* Background — mirrored horizontally for RTL (Arabic), so the photo flips to the
          left and the dark gradient + text move to the right and stay readable. */}
      <div className="absolute inset-0 -z-10 overflow-hidden rtl:-scale-x-100" aria-hidden="true">
        {/* Base gradient (carries the text side) — flips dark<->cream by theme */}
        <div className="absolute inset-0" style={{ background: 'var(--hero-base)' }} />
        {/* Subtle gold flowing lines */}
        <svg
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-[80%]"
          viewBox="0 0 760 820"
          preserveAspectRatio="xMinYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="hero-lines" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#C9A24B" stopOpacity="0" />
              <stop offset="0.45" stopColor="#E7C173" stopOpacity="1" />
              <stop offset="1" stopColor="#9C7A33" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M-20 ${320 + i * 44} C 200 ${280 + i * 44}, 430 ${384 + i * 40}, 820 ${300 + i * 42}`}
              stroke="url(#hero-lines)"
              strokeWidth="1.1"
              opacity={0.18 - i * 0.013}
            />
          ))}
        </svg>
        {/* Cinematic photo, masked to dissolve into the gradient (LCP).
            Two layers: dark photo by default, light photo in the light theme. */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[74%]">
          <div
            className="hero-photo-dark absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,.4) 16%, #000 38%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,.4) 16%, #000 38%)',
            }}
          >
            <Image src="/hero.png" alt="" fill priority sizes="100vw" className="object-cover object-[82%_42%]" />
          </div>
          <div
            className="hero-photo-light absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,.4) 14%, #000 34%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,.4) 14%, #000 34%)',
            }}
          >
            <Image src="/hero-light.png" alt="" fill sizes="100vw" className="object-cover object-[78%_42%]" />
          </div>
        </div>
        {/* Text-side wash — cream in light theme so dark copy stays legible over
            the photo's left edge; transparent in dark theme (no change). */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[70%]" style={{ background: 'var(--hero-side-wash)' }} />
        {/* Header blend (top) */}
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{ background: 'linear-gradient(to bottom, var(--hero-top) 0%, transparent 100%)' }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: 'linear-gradient(to top, var(--hero-vignette), transparent)' }}
        />
        {/* Mobile: extra wash for text contrast */}
        <div className="absolute inset-0 lg:hidden" style={{ background: 'var(--hero-wash)' }} />

        {/* Canister label — its wrapper mirrors the photo container's geometry and shares
            the photo's object-position-x anchor (82%), so the label tracks the canister at
            every viewport width. Placed after the overlays so it sits above the vignette;
            counter-flipped in RTL so the text reads correctly. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-full lg:w-[74%] xl:block">
          <span className="absolute left-[82%] top-[69%] max-w-[6.5rem] -translate-x-1/2 -translate-y-1/2 select-none text-balance text-center font-display text-[22px] font-extrabold uppercase leading-[1.02] tracking-[0.06em] text-gold-hi rtl:-scale-x-100 2xl:max-w-[8rem] 2xl:text-[26px]">
            {t('canisterLabel')}
            <span className="mt-1 block text-[12px] font-semibold tracking-[0.18em] text-gold-muted">
              PREMIUM OIL
            </span>
          </span>
        </div>
      </div>

      <div className="container-x relative flex min-h-[92svh] flex-col justify-center pb-16 pt-32 lg:min-h-screen lg:pt-36">
        <div className="max-w-2xl">
          <span
            className="inline-flex items-center gap-2 rounded-pill border border-[color:var(--gold-line)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--hero-eyebrow-text)] backdrop-blur-sm"
            style={{ background: 'var(--hero-eyebrow-bg)' }}
          >
            {t('eyebrow')}
          </span>

          <h1 className="mt-6 font-display font-extrabold uppercase leading-[1.05] tracking-tightest text-[color:var(--hero-text)] [font-size:clamp(1.875rem,4vw,3.5rem)]">
            <span
              className="box-decoration-clone inline rounded-md px-2 py-0.5"
              style={{ background: 'var(--hero-title-back)' }}
            >
              <span className="gold-gradient-text">{t('title1').replace(/,\s*$/, '')}</span>
            </span>
            <br />
            {t('titleAccent')}
          </h1>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-[color:var(--hero-muted)] sm:text-lg">
            {t('subhead')}
          </p>

          {/* Private-label highlights (info pulled into the hero) */}
          <div className="mt-9 max-w-lg">
            <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--hero-eyebrow-text)]">
              <span className="h-px w-5 bg-gold" aria-hidden="true" />
              {tp('badge')}
            </span>
            <dl className="mt-3 grid grid-cols-3 gap-2.5 sm:gap-3">
              {metrics.map((m) => (
                <div
                  key={m.l}
                  className="rounded-card border border-[color:var(--gold-line)] px-3 py-4 text-center backdrop-blur-md"
                  style={{ background: 'var(--hero-metric-back)' }}
                >
                  <dt className="sr-only">{m.l}</dt>
                  <dd>
                    <span className="block font-display text-lg font-extrabold text-[color:var(--hero-eyebrow-text)] sm:text-xl">
                      {m.v}
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold leading-tight text-[color:var(--hero-muted)] sm:text-[11px]">
                      {m.l}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
