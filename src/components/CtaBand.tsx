import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { company } from '@/lib/site';
import Reveal from './Reveal';

export default function CtaBand() {
  const t = useTranslations('common');
  const tc = useTranslations('contact');

  return (
    <section className="py-16">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 border border-line bg-navy px-6 py-12 text-center text-white sm:px-12">
            <div
              className="pointer-events-none absolute -bottom-20 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(201,154,69,.25), transparent 70%)' }}
              aria-hidden="true"
            />
            <h2 className="relative mx-auto max-w-2xl h-display text-2xl text-white sm:text-3xl">
              {tc('title')}
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/70">{tc('subtitle')}</p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-brass">
                {t('requestQuote')}
              </Link>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/20 bg-white/5 px-6 py-3 text-white hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
