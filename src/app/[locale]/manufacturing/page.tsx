import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import PageHeader from '@/components/PageHeader';
import Manufacturing from '@/components/sections/Manufacturing';
import Gallery from '@/components/sections/Gallery';
import Certifications from '@/components/sections/Certifications';
import CtaBand from '@/components/CtaBand';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/manufacturing',
    titleKey: 'manufacturingTitle',
    descriptionKey: 'manufacturingDescription',
  });
}

export default async function ManufacturingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('manufacturing');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <Manufacturing bare />
      <Gallery />
      <Certifications />
      <CtaBand />
    </>
  );
}
