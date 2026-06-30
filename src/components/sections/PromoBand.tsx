import { useTranslations } from 'next-intl';
import Reveal from '../Reveal';
import InquiryBar from '../hero/InquiryBar';

export default function PromoBand() {
  const t = useTranslations('hero.inquiry');

  return (
    <section className="mt-[6vh] pb-8">
      <div className="container-x">
        <Reveal>
          {/* Quote calculator on the amber band, sized to the form */}
          <div
            className="mx-auto max-w-5xl rounded-xl2 px-4 pb-4 pt-3 shadow-[0_14px_36px_rgba(0,0,0,0.45)] sm:px-5 sm:pb-5"
            style={{ background: 'linear-gradient(120deg, var(--amber), var(--amber-600))' }}
          >
            <p className="px-1 pb-2.5 text-sm font-bold text-[#2a1d06]">{t('label')}</p>
            <InquiryBar onBand />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
