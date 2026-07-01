import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing, locales, type Locale } from './i18n/routing';

const handleI18n = createMiddleware(routing);

// Country (ISO-3166 alpha-2, from Vercel's edge geo header) -> best-fit locale.
// Only used as a fallback when the visitor's browser language isn't one we
// support; English-speaking countries fall through to the default locale.
const COUNTRY_LOCALE: Partial<Record<string, Locale>> = {
  // Arabic
  AE: 'ar', SA: 'ar', QA: 'ar', KW: 'ar', BH: 'ar', OM: 'ar', JO: 'ar',
  EG: 'ar', IQ: 'ar', LY: 'ar', DZ: 'ar', MA: 'ar', TN: 'ar', LB: 'ar',
  SY: 'ar', YE: 'ar', SD: 'ar', PS: 'ar', MR: 'ar',
  // Chinese
  CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh',
  // Russian
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru', TJ: 'ru', UZ: 'ru', AM: 'ru', AZ: 'ru',
  // Spanish
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
  EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es',
  SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es',
  // Portuguese
  PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt',
  // German
  DE: 'de', AT: 'de', CH: 'de', LI: 'de', LU: 'de',
  // French
  FR: 'fr', BE: 'fr', MC: 'fr', CI: 'fr', SN: 'fr', CM: 'fr', CD: 'fr',
  ML: 'fr', BF: 'fr', NE: 'fr', TG: 'fr', BJ: 'fr', GA: 'fr', CG: 'fr',
  // Italian
  IT: 'it', SM: 'it', VA: 'it',
  // Turkish
  TR: 'tr',
};

function browserPrefersSupported(accept: string): boolean {
  // True if the Accept-Language header lists any locale we support, so we let
  // next-intl do the (proper) language negotiation and skip the geo fallback.
  const lower = accept.toLowerCase();
  return locales.some((l) => new RegExp(`(^|[ ,])${l}(?=$|[-;,])`).test(lower));
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  const hasChoiceCookie = request.cookies.has('NEXT_LOCALE');
  const accept = request.headers.get('accept-language') ?? '';

  // Geolocation fallback: only when the visitor has no explicit choice, is on an
  // unprefixed path, and their browser language isn't supported — then infer the
  // locale from the edge country header (Vercel) and redirect there.
  if (!hasLocalePrefix && !hasChoiceCookie && !browserPrefersSupported(accept)) {
    const country = (request.headers.get('x-vercel-ip-country') ?? '').toUpperCase();
    const geoLocale = COUNTRY_LOCALE[country];
    if (geoLocale && geoLocale !== routing.defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${geoLocale}${pathname === '/' ? '' : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  // Otherwise let next-intl handle cookie + Accept-Language detection.
  return handleI18n(request);
}

export const config = {
  // Match all pathnames except for
  // - api routes, _next, _vercel internals, and files with an extension
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
