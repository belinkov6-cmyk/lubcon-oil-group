import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import TrustMarquee from '@/components/sections/TrustMarquee';
import Products from '@/components/sections/Products';
import Manufacturing from '@/components/sections/Manufacturing';
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
      <Hero />
      <TrustMarquee />
      <Products />
      <Manufacturing />
      <Certifications />
      <PrivateLabel />
      <ExportMap />
      <ContactSection />
    </>
  );
}
