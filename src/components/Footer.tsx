import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { company } from '@/lib/site';
import Logo from './Logo';
import FlagMark from './FlagMark';

const EXPLORE = [
  { href: '/products', key: 'products' },
  { href: '/manufacturing', key: 'manufacturing' },
  { href: '/certifications', key: 'certifications' },
] as const;

const COMPANY = [
  { href: '/private-label', key: 'privateLabel' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">{t('tagline')}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink">
            <FlagMark width={22} />
            {company.country}
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-[rgba(22,16,9,0.5)] text-gold-hi transition-colors hover:border-gold hover:text-gold-hi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.3.1.7-.1 1.4Z" />
              </svg>
            </a>
            <a
              href={company.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-[rgba(22,16,9,0.5)] text-gold-hi transition-colors hover:border-gold hover:text-gold-hi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.5.4-.9.4l.3-4.6 8.5-7.7c.4-.3-.1-.5-.6-.2L7.5 13.4l-4.5-1.4c-1-.3-1-1 .2-1.4l17.5-6.7c.8-.3 1.5.2 1.2 1.4Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label={t('explore')}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-600">
            {t('explore')}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-sm text-text transition-colors hover:text-navy">
                  {tn(i.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('company')}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-600">
            {t('company')}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {COMPANY.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-sm text-text transition-colors hover:text-navy">
                  {tn(i.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-600">
            {t('contact')}
          </h2>
          <address className="mt-4 space-y-2 not-italic text-sm text-text">
            <p className="font-semibold text-ink">{company.name}</p>
            <p className="text-muted">{company.facility}</p>
            <p>
              <a href={`tel:${company.phoneE164}`} className="transition-colors hover:text-navy">
                {company.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-navy">
                {company.email}
              </a>
            </p>
            <p className="text-muted">{company.contactPerson}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. {t('rights')}
          </p>
          <p className="max-w-md">
            {t('relationship', { factory: company.factory })}
          </p>
        </div>
      </div>
    </footer>
  );
}
