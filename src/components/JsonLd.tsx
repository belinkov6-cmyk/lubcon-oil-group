import { SITE_URL, company, certificates } from '@/lib/site';

export default function JsonLd({ locale }: { locale: string }) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.name,
    url: SITE_URL,
    description:
      'Export division of an ISO-certified lubricant manufacturer in Ras Al Khaimah, UAE. Engine, industrial and marine lubricants, greases and base oils, with private-label and white-label programs.',
    parentOrganization: {
      '@type': 'Organization',
      name: company.factory,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Al Hamra Industrial Zone Free Zone (NFZ), WIZN5-10, Shed N5',
      addressLocality: 'Ras Al Khaimah',
      addressCountry: 'AE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phoneE164,
      contactType: 'sales',
      areaServed: ['AE', 'GCC', 'EU', 'RU', 'Africa', 'South America', 'Asia'],
      availableLanguage: ['en', 'ar', 'ru', 'es', 'pt'],
    },
    sameAs: [company.whatsapp, company.telegram],
    hasCredential: certificates.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: c.standard,
      identifier: c.number,
    })),
    makesOffer: [
      'Motor Oils',
      'Diesel Engine Oils',
      'Transmission & Gear Oils',
      'Industrial & Hydraulic Oils',
      'Marine Lubricants',
      'Greases',
      'Coolants, Brake Fluids & Base Oils',
      'Private Label Lubricants',
      'White Label Lubricants',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Product', name },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
    />
  );
}
