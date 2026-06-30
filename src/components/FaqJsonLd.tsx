import { company, certificates } from '@/lib/site';

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Who is Lubcon Oil Group?',
    a: `${company.name} is the export and commercial division of an ISO-certified lubricant manufacturer in Ras Al Khaimah, UAE, supplying distributors, fleet operators and brand owners worldwide.`,
  },
  {
    q: 'What does the company manufacture?',
    a: 'Motor oils, diesel engine oils, transmission and gear oils (including ATF), industrial and hydraulic oils, marine lubricants, greases, coolants, brake fluids and base oils — formulated to API, ACEA and OEM specifications.',
  },
  {
    q: 'Where is it located?',
    a: `${company.facility}.`,
  },
  {
    q: 'Which countries and regions does it supply?',
    a: 'GCC and the Middle East, Europe, Russia and the CIS, Africa, Latin America and Asia.',
  },
  {
    q: 'What certifications does it hold?',
    a: `The group manufacturing entity holds ${certificates
      .map((c) => `${c.standard} (${c.number})`)
      .join(', ')}, accredited by the United Accreditation Foundation (UAF) and verifiable at saaracertification.com.`,
  },
  {
    q: 'Can it produce private-label or white-label lubricants?',
    a: 'Yes — specification, formulation, blending, filling, label and packaging design, and export are handled by a single ISO-certified UAE partner.',
  },
  {
    q: 'How do distributors get in touch?',
    a: `Contact ${company.contactPerson} by phone or WhatsApp at ${company.phoneDisplay}, on Telegram (${company.telegramHandle}), or via the quote form on the website.`,
  },
];

export default function FaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
