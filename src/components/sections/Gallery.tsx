import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { company } from '@/lib/site';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

const PHOTOS = [
  { src: '/manufacturing/production-line.jpg', captionKey: 'galleryLine' },
  { src: '/manufacturing/laboratory.jpg', captionKey: 'capabilities.lab.title' },
  { src: '/manufacturing/filling.png', captionKey: 'galleryFilling' },
  { src: '/manufacturing/facility.png', captionKey: 'capabilities.facility.title' },
] as const;

export default function Gallery() {
  const t = useTranslations('manufacturing');

  return (
    <section className="bg-surface py-10 sm:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('galleryTitle')}
          subtitle={t('gallerySubtitle')}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={(i % 2) * 90}>
              <figure className="group relative aspect-[16/10] overflow-hidden rounded-card border border-line shadow-soft">
                <Image
                  src={p.src}
                  alt={`${t(p.captionKey)} — ${company.factory}, ${company.city}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 pt-12">
                  <span className="h-1.5 w-1.5 rounded-full bg-brass-2" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white">{t(p.captionKey)}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
