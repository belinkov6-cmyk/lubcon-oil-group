import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ar', 'zh', 'ru', 'es', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
  ru: 'Русский',
  es: 'Español',
  pt: 'Português',
};

// Locales that render right-to-left.
export const rtlLocales: Locale[] = ['ar'];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
