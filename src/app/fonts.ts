import { Inter, Bricolage_Grotesque, Instrument_Serif, Montserrat } from 'next/font/google';

export const fontSans = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});

export const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-display',
});

// Bricolage has no Cyrillic, so Russian headings fell back to a system serif.
// Montserrat (with Cyrillic) drives the display font on the Russian locale.
export const fontDisplayRu = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-display-ru',
});

export const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  style: ['italic', 'normal'],
  variable: '--font-serif',
});
