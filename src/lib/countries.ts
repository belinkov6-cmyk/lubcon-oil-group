// ISO 3166-1 alpha-2 codes for the country picker. Display names are localized
// at render time via Intl.DisplayNames(locale), so no per-locale translation is
// needed here. Ordered roughly by the export regions the group serves; the
// picker sorts them alphabetically by localized name.
export const COUNTRY_CODES = [
  // GCC & Middle East
  'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'IQ', 'YE', 'EG', 'IR', 'IL',
  // Europe
  'GB', 'DE', 'FR', 'IT', 'ES', 'PT', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK',
  'FI', 'PL', 'CZ', 'SK', 'RO', 'BG', 'GR', 'IE', 'HU', 'HR', 'RS', 'LT', 'LV', 'EE',
  // Russia & CIS
  'RU', 'BY', 'KZ', 'UZ', 'TM', 'TJ', 'KG', 'AZ', 'GE', 'AM', 'UA', 'MD',
  // Africa
  'NG', 'ZA', 'KE', 'GH', 'CI', 'SN', 'CM', 'ET', 'TZ', 'UG', 'MA', 'DZ', 'TN',
  'LY', 'AO', 'MZ', 'SD', 'ML', 'BF',
  // Asia
  'CN', 'IN', 'JP', 'KR', 'SG', 'MY', 'ID', 'TH', 'VN', 'PH', 'BD', 'PK', 'LK',
  'NP', 'MM', 'KH', 'TW', 'HK',
  // Americas & Oceania
  'US', 'CA', 'MX', 'BR', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'UY', 'BO', 'PY',
  'GT', 'DO', 'AU', 'NZ',
  // Türkiye
  'TR',
] as const;

/**
 * Localized, alphabetically-sorted [{ value, label }] country options.
 * `value` is the localized country name (readable in the quote request);
 * falls back to the ISO code if the runtime can't resolve a name.
 */
export function countryOptions(locale: string): { value: string; label: string }[] {
  let display: Intl.DisplayNames | null = null;
  try {
    display = new Intl.DisplayNames([locale], { type: 'region' });
  } catch {
    display = null;
  }
  return COUNTRY_CODES.map((code) => {
    const label = (display?.of(code) as string) || code;
    return { value: label, label };
  }).sort((a, b) => a.label.localeCompare(b.label, locale));
}
