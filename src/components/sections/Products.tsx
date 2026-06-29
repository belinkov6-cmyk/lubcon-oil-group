import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { productKeys, productSpecs } from '@/lib/site';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import ProductIcon from '../ProductIcon';

export default function Products({ bare = false }: { bare?: boolean }) {
  const t = useTranslations('products');

  return (
    <section id="products" className={bare ? 'bg-surface py-16' : 'bg-surface py-20 sm:py-28'}>
      <div className="container-x">
        {!bare && (
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productKeys.map((key, i) => (
            <Reveal key={key} delay={(i % 3) * 70}>
              <article className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass-3 hover:shadow-lift">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-surface text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                    <ProductIcon name={key} />
                  </span>
                  <span className="font-display text-sm font-bold text-brass-3 group-hover:text-brass">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`items.${key}.desc`)}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {productSpecs[key].map((spec) => (
                    <li key={spec} className="chip">
                      {spec}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          {/* CTA card */}
          <Reveal delay={140}>
            <article className="group flex h-full flex-col justify-between rounded-card border border-navy bg-navy p-6 text-white shadow-lift">
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/10 text-brass-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{t('ctaCardTitle')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{t('ctaCardText')}</p>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass-3 transition-colors hover:text-white"
              >
                {t('cta')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </article>
          </Reveal>
        </div>

        <p className="mt-6 text-sm text-muted">{t('tdsNote')}</p>
      </div>
    </section>
  );
}
