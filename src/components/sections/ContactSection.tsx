import { useTranslations } from 'next-intl';
import { company } from '@/lib/site';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import LeadForm from '../LeadForm';

export default function ContactSection({ bare = false }: { bare?: boolean }) {
  const t = useTranslations('contact');

  const channels = [
    {
      href: company.whatsapp,
      title: t('channels.whatsapp'),
      value: t('channels.whatsappValue'),
      external: true,
      icon: (
        <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.3.1.7-.1 1.4Z" />
      ),
    },
    {
      href: company.telegram,
      title: t('channels.telegram'),
      value: t('channels.telegramValue'),
      external: true,
      icon: (
        <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.5.4-.9.4l.3-4.6 8.5-7.7c.4-.3-.1-.5-.6-.2L7.5 13.4l-4.5-1.4c-1-.3-1-1 .2-1.4l17.5-6.7c.8-.3 1.5.2 1.2 1.4Z" />
      ),
    },
    {
      href: `tel:${company.phoneE164}`,
      title: t('channels.phone'),
      value: company.phoneDisplay,
      external: false,
      icon: (
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.1 2.2Z" />
      ),
    },
  ];

  return (
    <section id="contact" className={bare ? 'bg-surface py-16' : 'bg-surface py-12 sm:py-28'}>
      <div className="container-x">
        {!bare && (
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="flex flex-col gap-3">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="panel-dark group flex items-center gap-4 rounded-card border border-line bg-[rgba(22,16,9,0.45)] p-5 transition-all hover:-translate-y-0.5 hover:border-gold"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-navy text-brass-3 transition-transform group-hover:scale-105">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      {c.icon}
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-base font-bold text-ink">{c.title}</span>
                    <span className="block truncate text-sm text-muted">{c.value}</span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ms-auto text-muted transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}

              <div className="panel-dark mt-2 rounded-card border border-line bg-[rgba(22,16,9,0.45)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-600">
                  {t('channels.personLabel')}
                </p>
                <p className="mt-2 font-display text-base font-bold text-ink">{company.contactPerson}</p>
                <p className="mt-1 text-sm text-muted">{company.facility}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
