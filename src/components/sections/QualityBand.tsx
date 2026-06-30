import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Reveal from '../Reveal';

export default function QualityBand() {
  const t = useTranslations('quality');
  const tc = useTranslations('common');
  const points = [t('p1'), t('p2'), t('p3'), t('p4')];

  return (
    <section className="bg-gradient-to-br from-ink to-navy-700 py-20 text-white sm:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow text-amber">
            <span className="h-px w-6 bg-amber" aria-hidden="true" />
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 h-display text-3xl leading-[1.1] text-white sm:text-4xl">
            {t('title')}
          </h2>

          <ul className="mt-7 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber/20 text-amber">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-base leading-relaxed text-white/85">{p}</span>
              </li>
            ))}
          </ul>

          <Link href="/manufacturing" className="btn-amber mt-8">
            {tc('learnMore')}
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto grid max-w-[500px] grid-cols-2 gap-3">
            <figure className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-card border border-white/10">
              <Image
                src="/quality/oil-mechanism.jpg"
                alt="Premium lubricant flowing over a precision mechanism"
                fill
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover"
              />
            </figure>
            <figure className="relative aspect-square overflow-hidden rounded-card border border-white/10">
              <Image
                src="/quality/oil-gears.jpg"
                alt="Gear oil protecting meshing gears"
                fill
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover"
              />
            </figure>
            <figure className="relative aspect-square overflow-hidden rounded-card border border-white/10">
              <Image
                src="/quality/oil-engine.jpg"
                alt="Motor oil being poured into an engine"
                fill
                sizes="(max-width: 1024px) 50vw, 300px"
                className="object-cover"
              />
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
