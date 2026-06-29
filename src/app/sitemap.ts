import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';

const PATHS = [
  '',
  '/products',
  '/manufacturing',
  '/certifications',
  '/private-label',
  '/about',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: string, path: string) => {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    return `${SITE_URL}${prefix}${path}` || SITE_URL;
  };

  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: url(locale, path),
      lastModified: new Date('2026-06-29'),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, url(l, path)])
        ),
      },
    }))
  );
}
