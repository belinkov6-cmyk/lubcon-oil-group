'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import FlagMark from '../FlagMark';

// 3D scene is heavy (three.js) — load client-side only, after the hero text (LCP) renders.
const OilBottleScene = dynamic(() => import('./OilBottleScene'), {
  ssr: false,
  loading: () => <Placeholder />,
});

function Placeholder() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="relative h-44 w-28">
        <div className="absolute inset-x-6 top-0 h-4 rounded-md bg-brass/70" />
        <div className="absolute inset-x-0 top-5 bottom-0 rounded-2xl bg-gradient-to-b from-ink/80 to-ink animate-pulse" />
      </div>
    </div>
  );
}

export default function HeroVisual3D({ caption }: { caption: string }) {
  // Only load the three.js scene on desktop (the visual is hidden below lg).
  const [showScene, setShowScene] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setShowScene(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-white to-surface shadow-lift">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(201,154,69,.22), transparent 70%)' }}
          aria-hidden="true"
        />
        {showScene ? <OilBottleScene /> : <Placeholder />}
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-pill border border-line bg-white/85 px-4 py-1.5 text-xs font-semibold text-navy shadow-soft backdrop-blur">
        <FlagMark width={18} />
        {caption}
      </div>
    </div>
  );
}
