import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing, rtlLocales, type Locale } from '@/i18n/routing';
import { fontSans, fontDisplay, fontDisplayRu } from '../fonts';
import { SITE_URL, company } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import JsonLd from '@/components/JsonLd';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? '/' : `/${l}`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('homeTitle'),
      template: `%s · ${company.shortName}`,
    },
    description: t('homeDescription'),
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: company.name,
      title: t('homeTitle'),
      description: t('homeDescription'),
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
    },
    icons: { icon: '/favicon.svg' },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const dir = rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr';
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="light"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontDisplayRu.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Enables reveal animations + applies the saved theme before paint (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(localStorage.getItem('theme')==='dark')document.documentElement.removeAttribute('data-theme')}catch(e){}",
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <JsonLd locale={locale} />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
          <FloatingContact />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
