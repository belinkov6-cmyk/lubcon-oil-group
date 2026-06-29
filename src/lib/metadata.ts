import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

/**
 * Builds localized metadata with correct canonical + hreflang alternates.
 * `path` is the route without locale, e.g. '/products' (use '' for home).
 */
export async function buildMetadata({
  locale,
  path,
  titleKey,
  descriptionKey,
}: {
  locale: string;
  path: string;
  titleKey: string;
  descriptionKey: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const isDefault = locale === routing.defaultLocale;

  const href = (l: string) => {
    const prefix = l === routing.defaultLocale ? '' : `/${l}`;
    return `${prefix}${path}` || '/';
  };

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = href(l);

  return {
    title: t(titleKey),
    description: t(descriptionKey),
    alternates: {
      canonical: href(locale),
      languages,
    },
    openGraph: {
      title: t(titleKey),
      description: t(descriptionKey),
      locale,
    },
  };
}
