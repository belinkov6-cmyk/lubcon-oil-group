import { useTranslations } from 'next-intl';
import { regionKeys } from '@/lib/site';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

// Hub (Ras Al Khaimah) and region endpoints in the 1000x520 viewBox.
const HUB = { x: 612, y: 250 };
const POINTS: Record<(typeof regionKeys)[number], { x: number; y: number }> = {
  gcc: { x: 590, y: 268 },
  europe: { x: 486, y: 150 },
  cis: { x: 640, y: 120 },
  africa: { x: 520, y: 360 },
  latam: { x: 280, y: 380 },
  asia: { x: 778, y: 262 },
};

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // Lift the control point perpendicular to the chord for a flight-path curve.
  const lift = Math.min(dist * 0.35, 120);
  const cx = mx;
  const cy = my - lift;
  return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`;
}

export default function ExportMap() {
  const t = useTranslations('exportMap');

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} center />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          {/* Map */}
          <Reveal>
            <div className="relative overflow-hidden rounded-card border border-line bg-gradient-to-br from-surface to-white p-4 shadow-soft">
              <svg viewBox="0 0 1000 520" className="h-auto w-full" role="img" aria-label={t('title')}>
                <defs>
                  <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#C99A45" />
                    <stop offset="1" stopColor="#128A4E" />
                  </linearGradient>
                  <radialGradient id="hubGlow">
                    <stop offset="0" stopColor="rgba(206,17,38,.30)" />
                    <stop offset="1" stopColor="rgba(206,17,38,0)" />
                  </radialGradient>
                </defs>

                {/* Faint graticule */}
                {[...Array(9)].map((_, i) => (
                  <line key={`v${i}`} x1={i * 125} y1="0" x2={i * 125} y2="520" stroke="var(--line)" strokeWidth="1" />
                ))}
                {[...Array(5)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 130} x2="1000" y2={i * 130} stroke="var(--line)" strokeWidth="1" />
                ))}

                {/* Stylized continents (abstract, low opacity) */}
                <g fill="#0B6B3A" opacity="0.08">
                  <path d="M180 120c40-20 120-30 170-10s40 60 10 90-20 70-70 80-130-10-160-60 10-80 50-100Z" />
                  <path d="M250 320c40-10 90 0 120 40s10 90-30 110-110 10-140-40 10-100 50-110Z" />
                  <path d="M440 90c60-25 150-20 200 10s50 80 10 110-30 60-90 60-140-30-160-90 -20-70 40-100Z" />
                  <path d="M470 280c50-10 120 0 150 50s10 110-50 130-130-10-150-70 0-100 50-110Z" />
                  <path d="M700 150c70-20 180-10 230 30s40 110-20 140-160 20-210-30-70-120 0-140Z" />
                  <path d="M820 330c40-10 90 10 100 50s-20 70-70 70-90-30-90-70 20-40 60-50Z" />
                </g>

                {/* Flight arcs */}
                {regionKeys.map((key, i) => (
                  <path
                    key={key}
                    d={arc(HUB, POINTS[key])}
                    fill="none"
                    stroke="url(#arcGrad)"
                    strokeWidth="2"
                    strokeDasharray="5 8"
                    className="animate-dash"
                    style={{ animationDelay: `${i * 0.3}s`, opacity: 0.8 }}
                  />
                ))}

                {/* Region endpoints */}
                {regionKeys.map((key) => (
                  <g key={`p-${key}`}>
                    <circle cx={POINTS[key].x} cy={POINTS[key].y} r="5" fill="#128A4E" />
                    <circle cx={POINTS[key].x} cy={POINTS[key].y} r="5" fill="none" stroke="#128A4E" strokeWidth="1.5" opacity="0.4">
                      <animate attributeName="r" values="5;12;5" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}

                {/* Hub */}
                <circle cx={HUB.x} cy={HUB.y} r="60" fill="url(#hubGlow)" />
                <circle cx={HUB.x} cy={HUB.y} r="9" fill="#CE1126" />
                <circle cx={HUB.x} cy={HUB.y} r="9" fill="none" stroke="#CE1126" strokeWidth="2">
                  <animate attributeName="r" values="9;22;9" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
                </circle>
              </svg>

              <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-pill border border-line bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-soft backdrop-blur">
                <span className="text-uae-red">★</span> {t('hub')}
              </span>
            </div>
          </Reveal>

          {/* Region list */}
          <Reveal delay={100}>
            <ul className="grid gap-3">
              {regionKeys.map((key) => (
                <li
                  key={key}
                  className="group flex items-start gap-3 rounded-card border border-line bg-white p-4 transition-colors hover:border-brass-3 hover:bg-surface"
                >
                  <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-navy-600 ring-4 ring-navy-600/10" aria-hidden="true" />
                  <div>
                    <p className="font-display text-sm font-bold text-ink">
                      {t(`regions.${key}.name`)}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{t(`regions.${key}.note`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
