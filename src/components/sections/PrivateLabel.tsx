import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { company } from '@/lib/site';
import Reveal from '../Reveal';

const STEPS = ['s1', 's2', 's3', 's4'] as const;

export default function PrivateLabel({ bare = false }: { bare?: boolean }) {
  const t = useTranslations('privateLabel');

  return (
    <section id="private-label" className="relative overflow-hidden py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.08]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-24 start-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,154,69,.22), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        {!bare && (
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-brass-3">
              <span className="h-px w-6 bg-brass-3" aria-hidden="true" />
              {t('eyebrow')}
            </span>
            <h2 className="mt-3 h-display text-3xl leading-[1.1] text-white sm:text-4xl md:text-[2.6rem]">
              {t('title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{t('subtitle')}</p>
          </Reveal>
        )}

        <ol className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${bare ? '' : 'mt-12'}`}>
          {STEPS.map((s, i) => (
            <Reveal key={s} delay={i * 80} as="li">
              <div className="relative h-full rounded-card border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brass-3 font-display text-lg font-bold text-brass-3">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">
                  {t(`steps.${s}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {t(`steps.${s}.desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-brass">
              {t('ctaPrimary')}
            </Link>
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/20 bg-white/5 px-6 py-3 text-white hover:bg-white/10"
            >
              {t('ctaSecondary')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
