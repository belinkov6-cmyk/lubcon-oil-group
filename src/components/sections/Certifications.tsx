import { useTranslations } from 'next-intl';
import { certificates, accreditation, company } from '@/lib/site';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

export default function Certifications({ bare = false }: { bare?: boolean }) {
  const t = useTranslations('certifications');

  return (
    <section id="certifications" className={bare ? 'bg-surface py-16' : 'bg-surface py-12 sm:py-28'}>
      <div className="container-x">
        {!bare && (
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        )}

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {certificates.map((c, i) => (
            <Reveal key={c.number} delay={i * 80}>
              <article className="card relative flex h-full flex-col overflow-hidden p-7">
                {/* Seal watermark */}
                <svg
                  className="pointer-events-none absolute -end-6 -top-6 h-32 w-32 text-brass-3/40"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
                </svg>

                <h3 className="font-display text-xl font-extrabold brass-gradient-text">
                  {c.standard}
                </h3>
                <p className="mt-1 text-sm font-medium text-navy-600">{c.system}</p>

                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
                    <dt className="text-muted">{t('certNo')}</dt>
                    <dd className="text-end font-semibold text-ink">{c.number}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
                    <dt className="text-muted">{t('issued')}</dt>
                    <dd className="font-semibold text-ink">{c.issued}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
                    <dt className="text-muted">{t('validUntil')}</dt>
                    <dd className="font-semibold text-ink">{c.validUntil}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">{t('scope')}</dt>
                    <dd className="mt-1 text-text">{t('scopeText')}</dd>
                  </div>
                </dl>

                <a
                  href={c.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-espresso mt-auto inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-[rgba(22,16,9,0.4)] px-4 py-2 pt-2 text-sm font-semibold text-gold-hi transition-colors hover:border-gold hover:bg-[rgba(22,16,9,0.65)]"
                  style={{ marginTop: 'auto' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t('download')} (PDF)
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="panel-dark mt-6 flex items-start gap-3 rounded-card border border-line bg-[rgba(22,16,9,0.5)] p-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-brass" aria-hidden="true">
              <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-ink">{t('verifyTitle')}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {t('verifyText', {
                  factory: company.factory,
                  body: accreditation.body,
                  note: accreditation.note,
                  verifyAt: accreditation.verifyAt,
                })}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
