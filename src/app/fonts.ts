import { Inter, Bricolage_Grotesque, Instrument_Serif } from 'next/font/google';

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

export const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  style: ['italic', 'normal'],
  variable: '--font-serif',
});
