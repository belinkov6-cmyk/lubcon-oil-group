import { setRequestLocale } from 'next-intl/server';
import HeroPremium from '@/components/sections/HeroPremium';
import PromoBand from '@/components/sections/PromoBand';
import TrustMarquee from '@/components/sections/TrustMarquee';
import Products from '@/components/sections/Products';
import QualityBand from '@/components/sections/QualityBand';
import Manufacturing from '@/components/sections/Manufacturing';
import Gallery from '@/components/sections/Gallery';
import Certifications from '@/components/sections/Certifications';
import PrivateLabel from '@/components/sections/PrivateLabel';
import ExportMap from '@/components/sections/ExportMap';
import ContactSection from '@/components/sections/ContactSection';
import FaqJsonLd from '@/components/FaqJsonLd';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FaqJsonLd />
      <HeroPremium />
      {/* Soft fade hides the seam between the hero photo and the page gradient */}
      <div className="page-fade" aria-hidden="true" />
      <PromoBand />
      <TrustMarquee />
      <Products />
      <QualityBand />
      <Manufacturing />
      <Gallery />
      <Certifications />
      <PrivateLabel />
      <ExportMap />
      <ContactSection />
    </>
  );
}
