import { useTranslations } from 'next-intl';
import { company, regionKeys } from '@/lib/site';
import Reveal from '../Reveal';

export default function About() {
  const t = useTranslations('about');

  const blocks = [
    { key: 'structure', title: t('structureTitle'), text: t('structureText') },
    { key: 'who', title: t('whoTitle'), text: t('whoText') },
    { key: 'why', title: t('whyTitle'), text: t('whyText') },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-text sm:text-xl">
            {t('lead', { factory: company.factory })}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-5">
            {blocks.map((b, i) => (
              <Reveal key={b.key} delay={i * 70}>
                <div className="card p-6 sm:p-7">
                  <h2 className="font-display text-lg font-bold text-ink">{b.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <aside className="card h-full p-6 sm:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-600">
                {company.shortName}
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-muted">Facility</dt>
                  <dd className="mt-0.5 font-medium text-ink">{company.facility}</dd>
                </div>
                <div>
                  <dt className="text-muted">Manufacturing entity</dt>
                  <dd className="mt-0.5 font-medium text-ink">{company.factory}</dd>
                </div>
                <div>
                  <dt className="text-muted">Contact</dt>
                  <dd className="mt-0.5 font-medium text-ink">{company.contactPerson}</dd>
                </div>
                <div>
                  <dt className="text-muted">Regions served</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {regionKeys.map((r) => (
                      <span key={r} className="chip uppercase">
                        {r}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
