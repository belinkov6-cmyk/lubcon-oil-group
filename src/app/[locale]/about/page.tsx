import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import PageHeader from '@/components/PageHeader';
import About from '@/components/sections/About';
import ExportMap from '@/components/sections/ExportMap';
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
    path: '/about',
    titleKey: 'aboutTitle',
    descriptionKey: 'aboutDescription',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} />
      <About />
      <ExportMap />
      <CtaBand />
    </>
  );
}
