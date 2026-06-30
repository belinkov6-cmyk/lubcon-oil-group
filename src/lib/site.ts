/**
 * Single source of truth for company facts.
 * Values here are used verbatim across the site, JSON-LD, sitemap and lead routing.
 * Keep in sync with CLAUDE_CODE_BRIEF.md §2.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://novacoreglobal.com';

export const company = {
  name: 'Lubcon Oil Group',
  shortName: 'Lubcon Oil Group',
  tagline: 'UAE-manufactured lubricants for global markets',
  // The factory / manufacturing + certificate-holding entity (group company).
  factory: 'Lubcon Oil Based Lubricanting Manufacturing L.L.C',
  facility:
    'Al Hamra Industrial Zone Free Zone (NFZ), Ras Al Khaimah, UAE — WIZN5-10, Shed N5',
  city: 'Ras Al Khaimah',
  country: 'United Arab Emirates',
  contactPerson: 'Sazonov Kliment',
  phoneDisplay: '+971 56 333 3025',
  phoneE164: '+971563333025',
  whatsapp: 'https://wa.me/971563333025',
  telegram: 'https://t.me/beretta_chin',
  telegramHandle: '@beretta_chin',
  email: 'export@novacoreglobal.com',
} as const;

export const certificates = [
  {
    standard: 'ISO 9001:2015',
    system: 'Quality Management',
    number: 'LUB/QMS/L25/5484',
    issued: '18.12.2025',
    validUntil: '17.12.2028',
    pdf: '/certificates/iso-9001-qms.pdf',
  },
  {
    standard: 'ISO 14001:2015',
    system: 'Environmental Management',
    number: 'LUB/EMS/L25/2238',
    issued: '18.12.2025',
    validUntil: '17.12.2028',
    pdf: '/certificates/iso-14001-ems.pdf',
  },
  {
    standard: 'ISO 45001:2018',
    system: 'Occupational Health & Safety',
    number: 'LUB/OHS/L25/3613',
    issued: '18.12.2025',
    validUntil: '17.12.2028',
    pdf: '/certificates/iso-45001-ohsms.pdf',
  },
] as const;

export const accreditation = {
  body: 'United Accreditation Foundation (UAF)',
  note: 'IAF member',
  verifyAt: 'saaracertification.com',
} as const;

// Product families. `key` ties to translation strings; `specs` are stable B2B tags.
export const productKeys = [
  'motor',
  'diesel',
  'transmission',
  'industrial',
  'marine',
  'greases',
  'coolants',
] as const;

export type ProductKey = (typeof productKeys)[number];

export const productSpecs: Record<ProductKey, string[]> = {
  motor: ['API SP / SN', 'ACEA', 'Synthetic & semi-synthetic'],
  diesel: ['API CK-4 / CI-4', 'Heavy-duty', 'Euro fleets'],
  transmission: ['ATF', 'Manual & gear', 'Limited-slip'],
  industrial: ['Hydraulic ISO VG', 'Compressor', 'Slideway'],
  marine: ['Trunk piston', 'System oils', 'Cylinder oils'],
  greases: ['Lithium complex', 'Calcium sulfonate', 'EP grades'],
  coolants: ['Coolants', 'Brake fluids', 'Base oils'],
};

// Real Lubcon product catalogue (exported by Lubcon). Names/specs are brand &
// technical strings — not translated. `image` lives in /public/products/.
export type CatalogItem = {
  slug: string;
  name: string;
  category: ProductKey;
  specs: string[];
  size: string;
  badge?: 'best' | 'heavy' | 'twostroke';
};

export const catalog: CatalogItem[] = [
  { slug: 'cruze-super-plus', name: 'Cruze Super Plus', category: 'motor', specs: ['SAE 10W-40', 'API SN'], size: '4 L', badge: 'best' },
  { slug: 'cruze-ultra', name: 'Cruze Ultra', category: 'motor', specs: ['SAE 20W-50', 'API SP'], size: '4 L' },
  { slug: 'cruze-racing', name: 'Cruze Racing', category: 'motor', specs: ['SAE 5W-20', 'API SP · GF-6A', 'Fully synthetic'], size: '4 L' },
  { slug: 'xcel-shpd', name: 'Xcel SHPD', category: 'diesel', specs: ['SAE 15W-40', 'API CK-4 / FA-4'], size: '5 L', badge: 'heavy' },
  { slug: 'impel-dvi', name: 'Impel D-VI', category: 'transmission', specs: ['ATF', 'Dexron VI · Mercon LV'], size: '4 L' },
  { slug: 'impel-mp', name: 'Impel MP', category: 'transmission', specs: ['SAE 80W-90', 'API GL-4'], size: '4 L' },
  { slug: 'techno-hlp', name: 'Techno HLP', category: 'industrial', specs: ['ISO VG 46', 'Denison HF-0'], size: '4 L' },
  { slug: 'titanic-2tw', name: 'Titanic 2TW', category: 'motor', specs: ['2-Stroke', 'API TC · TCW3'], size: '1 L', badge: 'twostroke' },
  { slug: 'special-antifreeze', name: 'Special Antifreeze', category: 'coolants', specs: ['SAE J1034', 'Hybrid OAT'], size: '4 L' },
];

export const services = ['private-label', 'white-label', 'export'] as const;

// Export regions for the signature map + about page.
export const regionKeys = [
  'gcc',
  'europe',
  'cis',
  'africa',
  'latam',
  'asia',
] as const;

export type RegionKey = (typeof regionKeys)[number];
