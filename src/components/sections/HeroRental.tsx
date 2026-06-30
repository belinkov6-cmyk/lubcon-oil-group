import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { company } from '@/lib/site';
import RefineryScene from '../hero/RefineryScene';
import InquiryBar from '../hero/InquiryBar';
import FlagMark from '../FlagMark';

export default function HeroRental() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-white to-white">
      <div
        className="pointer-events-none absolute -top-24 end-[-6%] h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(243,179,36,.20), transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-32 start-[-8%] h-[380px] w-[380px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(18,138,78,.10), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-x relative pt-10 sm:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          {/* copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-pill border border-amber-100 bg-amber-100/60 px-3 py-1.5 text-xs font-semibold text-ink">
              <FlagMark width={18} />
              {t('eyebrow')}
            </span>

            <h1 className="mt-5 font-display text-[2.7rem] font-extrabold leading-[1.03] tracking-tightest text-ink sm:text-5xl lg:text-6xl">
              {t('title1')}
              <span className="text-amber-600">{t('titleAccent')}</span>.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t('subhead')}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-amber">
                {t('ctaQuote')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/private-label" className="btn-ghost">
                {t('ctaDistributor')}
              </Link>
              <a href={`tel:${company.phoneE164}`} className="ms-1 text-sm font-semibold text-navy">
                {company.phoneDisplay}
              </a>
            </div>
          </div>

          {/* refinery illustration */}
          <div className="relative">
            <div className="absolute inset-x-6 bottom-6 top-10 rounded-[28px] bg-gradient-to-br from-surface to-white" aria-hidden="true" />
            <div className="relative">
              <RefineryScene />
            </div>
          </div>
        </div>

        {/* inquiry bar */}
        <div className="relative z-10 mt-2 pb-12 sm:-mt-2 sm:pb-16">
          <p className="mb-2 ms-1 text-sm font-semibold text-ink">{t('inquiry.label')}</p>
          <InquiryBar />
        </div>
      </div>
    </section>
  );
}
