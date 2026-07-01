import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { catalog } from '@/lib/site';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

const BADGE_STYLE: Record<string, string> = {
  best: 'bg-amber text-[#1b1206]',
  heavy: 'bg-[#2a1d08] text-cream',
  twostroke: 'bg-uae-red text-white',
};
const BADGE_KEY: Record<string, string> = {
  best: 'badgeBest',
  heavy: 'badgeHeavy',
  twostroke: 'badge2t',
};

export default function Products({ bare = false }: { bare?: boolean }) {
  const t = useTranslations('products');

  return (
    <section id="products" className={bare ? 'bg-surface py-16' : 'bg-surface py-12 sm:py-24'}>
      <div className="container-x">
        {!bare && (
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {catalog.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 60}>
              <article className="product-card group flex h-full flex-col overflow-hidden rounded-card border border-[rgba(201,162,75,0.35)] bg-[#f6f1e6] shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(201,162,75,0.6)]">
                <div className="relative aspect-square bg-gradient-to-b from-white to-[#efe7d6]">
                  {p.badge && (
                    <span
                      className={`absolute start-3 top-3 z-10 rounded-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${BADGE_STYLE[p.badge]}`}
                    >
                      {t(BADGE_KEY[p.badge])}
                    </span>
                  )}
                  <Image
                    src={`/products/${p.slug}.jpg`}
                    alt={`Lubcon ${p.name} — ${p.specs.join(' ')}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-600">
                    {t(`items.${p.category}.name`)}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-[#1c1206]">{p.name}</h3>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {p.specs.map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center rounded-pill border border-[rgba(176,125,43,0.32)] bg-[#efe7d6] px-3 py-1 text-xs font-medium text-[#5a4a28]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                    <span className="text-sm font-semibold text-[#6b5a38]">{p.size}</span>
                    <Link href="/contact" className="btn-amber px-4 py-2 text-sm">
                      {t('requestQuote')}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <Link href="/products" className="btn-ghost">
            {t('viewAll')}
          </Link>
          <p className="text-sm text-muted">{t('tdsNote')}</p>
        </div>
      </div>
    </section>
  );
}
