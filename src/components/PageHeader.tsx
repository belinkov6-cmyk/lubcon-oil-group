export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.5]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 end-[-6%] h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,154,69,.16), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="container-x relative py-16 sm:py-20">
        <div className="max-w-3xl">
        <span className="eyebrow animate-fadeup">
          <span className="h-px w-6 bg-brass" aria-hidden="true" />
          {eyebrow}
        </span>
        <h1 className="mt-4 h-display text-4xl leading-[1.06] sm:text-5xl">{title}</h1>
        {subtitle && (
          <p
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted opacity-0 animate-fadeup sm:text-lg"
            style={{ animationDelay: '100ms' }}
          >
            {subtitle}
          </p>
        )}
        </div>
      </div>
    </section>
  );
}
