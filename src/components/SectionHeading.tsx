import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-6 bg-brass" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 h-display text-3xl leading-[1.1] sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed text-muted sm:text-lg ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
