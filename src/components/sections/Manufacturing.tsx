import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import FlagMark from '../FlagMark';

const CAPS = [
  {
    key: 'facility',
    icon: (
      <path d="M4 20V9l6-3v3l6-3v14H4Zm4 0v-4M14 20v-4" />
    ),
  },
  {
    key: 'lab',
    icon: <path d="M9 3v6l-5 8a1 1 0 0 0 1 1.5h14A1 1 0 0 0 20 17l-5-8V3M8 3h8M8 13h8" />,
  },
  {
    key: 'additive',
    icon: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />,
  },
  {
    key: 'logistics',
    icon: <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7M7 18a2 2 0 1 0 0-.1M17 18a2 2 0 1 0 0-.1" />,
  },
] as const;

export default function Manufacturing({ bare = false }: { bare?: boolean }) {
  const t = useTranslations('manufacturing');

  return (
    <section id="manufacturing" className={bare ? 'bg-white py-16' : 'bg-white py-20 sm:py-28'}>
      <div className="container-x">
        {!bare && (
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        )}

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {CAPS.map((cap, i) => (
              <Reveal key={cap.key} delay={(i % 2) * 80}>
                <div className="card h-full p-6 transition-colors hover:border-brass-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[13px] bg-navy text-brass-3">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {cap.icon}
                    </svg>
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">
                    {t(`capabilities.${cap.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`capabilities.${cap.key}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[26px] border border-line shadow-lift">
              <Image
                src="/manufacturing/facility.png"
                alt={`${t('capabilities.facility.title')} — ${t('ringCaption')}`}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 top-0 flex justify-end p-3">
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy shadow-soft backdrop-blur">
                  <FlagMark width={16} /> UAE
                </span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent p-5 pt-10">
                <span className="text-sm font-semibold text-white">{t('ringCaption')}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
