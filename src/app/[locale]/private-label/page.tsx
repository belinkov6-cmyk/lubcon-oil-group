import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import PageHeader from '@/components/PageHeader';
import PrivateLabel from '@/components/sections/PrivateLabel';
import ContactSection from '@/components/sections/ContactSection';

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
    path: '/private-label',
    titleKey: 'privateLabelTitle',
    descriptionKey: 'privateLabelDescription',
  });
}

export default async function PrivateLabelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privateLabel');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <PrivateLabel bare />
      <ContactSection />
    </>
  );
}
