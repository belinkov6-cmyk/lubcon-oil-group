import { useTranslations } from 'next-intl';
import Reveal from '../Reveal';

export default function TrustMarquee() {
  const t = useTranslations('trust');
  const items = t('marquee').split('·').map((s) => s.trim());

  const stats = [
    { v: t('stats.regionsValue'), l: t('stats.regionsLabel') },
    { v: t('stats.familiesValue'), l: t('stats.familiesLabel') },
    { v: t('stats.packsValue'), l: t('stats.packsLabel') },
    { v: t('stats.isoValue'), l: t('stats.isoLabel') },
  ];

  return (
    <section aria-label={t('title')} className="border-y border-line py-10">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-[#15100a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-[#15100a] to-transparent" />
        <div className="flex w-max animate-marquee gap-8 will-change-transform">
          {[0, 1].map((dup) => (
            <ul
              key={dup}
              className="flex shrink-0 items-center gap-8"
              aria-hidden={dup === 1}
            >
              {items.map((item, i) => (
                <li key={`${dup}-${i}`} className="flex items-center gap-8">
                  <span className="whitespace-nowrap text-sm font-semibold text-navy-700">
                    {item}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brass-3" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <Reveal className="container-x mt-10">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-surface px-5 py-7 text-center">
              <dt className="sr-only">{s.l}</dt>
              <dd>
                <span className="block font-display text-3xl font-extrabold text-navy sm:text-4xl">
                  {s.v}
                </span>
                <span className="mt-2 block text-sm text-muted">{s.l}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
