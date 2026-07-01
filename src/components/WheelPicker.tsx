'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export type WheelOption = { value: string; label: string };

const ITEM_H = 40; // row height (px)
const VISIBLE = 5; // visible rows (odd)
const PAD = ((VISIBLE - 1) / 2) * ITEM_H; // top/bottom spacer so ends can center

/**
 * iOS-style wheel picker (like the Clock/alarm drum). The trigger looks like a
 * form field; clicking it drops a wheel. Spin it with touch (native momentum)
 * or the mouse wheel — one notch = one row. Clicking ANY visible row selects it
 * and closes; clicking outside also closes.
 */
export default function WheelPicker({
  options,
  value,
  onChange,
  placeholder = 'Select',
  className = '',
  name,
  ariaLabel,
}: {
  options: WheelOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [flipUp, setFlipUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastWheelT = useRef(0);
  const wheelIdx = useRef(0);

  const selected = options.find((o) => o.value === value);
  const clampIdx = (i: number) => Math.max(0, Math.min(options.length - 1, i));
  const indexOf = (v: string) => {
    const i = options.findIndex((o) => o.value === v);
    return i < 0 ? 0 : i;
  };

  // Curve the rows (rotateX + fade) based on distance from the centre line.
  function paint() {
    const el = scrollRef.current;
    if (!el) return;
    const center = el.scrollTop + (VISIBLE * ITEM_H) / 2;
    el.querySelectorAll<HTMLElement>('[data-wheel-item]').forEach((item, i) => {
      const itemCenter = PAD + i * ITEM_H + ITEM_H / 2;
      const ratio = (itemCenter - center) / ITEM_H;
      const angle = Math.max(-72, Math.min(72, ratio * 20));
      item.style.transform = `rotateX(${angle}deg)`;
      item.style.opacity = String(Math.max(0.18, 1 - Math.abs(ratio) * 0.3));
    });
  }

  function commitCentered() {
    const el = scrollRef.current;
    if (!el) return;
    const opt = options[clampIdx(Math.round(el.scrollTop / ITEM_H))];
    if (opt && opt.value !== value) onChange(opt.value);
  }

  function onScroll() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(paint);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(commitCentered, 90); // native (touch) settle
  }

  // Select a row (from a click/tap) and close.
  function pick(i: number) {
    onChange(options[i].value);
    setOpen(false);
  }

  useLayoutEffect(() => {
    if (!open) return;
    const r = rootRef.current?.getBoundingClientRect();
    if (r) setFlipUp(window.innerHeight - r.bottom < 270 && r.top > 270);
    const el = scrollRef.current;
    if (el) {
      wheelIdx.current = indexOf(value);
      el.scrollTop = wheelIdx.current * ITEM_H;
      paint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);

    // One mouse-wheel notch = one row (native wheel deltas jump several rows).
    const el = scrollRef.current;
    const onWheel = (e: WheelEvent) => {
      if (!el || e.deltaY === 0) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheelT.current < 30) return; // coalesce duplicate events per notch
      if (now - lastWheelT.current > 220) wheelIdx.current = Math.round(el.scrollTop / ITEM_H);
      lastWheelT.current = now;
      wheelIdx.current = clampIdx(wheelIdx.current + (e.deltaY > 0 ? 1 : -1));
      el.scrollTo({ top: wheelIdx.current * ITEM_H, behavior: 'smooth' });
      const opt = options[wheelIdx.current];
      if (opt && opt.value !== value) onChange(opt.value);
    };

    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    el?.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
      el?.removeEventListener('wheel', onWheel);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      {name && <input type="hidden" name={name} value={value} />}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={`flex items-center justify-between gap-2 text-start ${className}`}
      >
        <span className={`truncate ${selected ? '' : 'opacity-55'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute inset-x-0 z-[60] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] ${
            flipUp ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          <div className="relative" style={{ height: VISIBLE * ITEM_H }}>
            {/* Centre selection band */}
            <div
              className="pointer-events-none absolute inset-x-2 top-1/2 z-20 -translate-y-1/2 rounded-lg border-y border-black/15 bg-[rgba(184,134,11,0.10)]"
              style={{ height: ITEM_H }}
              aria-hidden="true"
            />
            {/* Top/bottom fade (doesn't block clicks) */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 68%, #fff 100%)',
              }}
              aria-hidden="true"
            />
            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="wheel-scroll relative z-0 h-full touch-pan-y overflow-y-scroll"
              style={{ scrollSnapType: 'y mandatory', perspective: '800px' }}
              role="listbox"
              aria-label={ariaLabel}
            >
              <div style={{ height: PAD }} aria-hidden="true" />
              {options.map((o, i) => (
                <button
                  key={o.value}
                  type="button"
                  data-wheel-item
                  role="option"
                  aria-selected={o.value === value}
                  onClick={() => pick(i)}
                  className="flex w-full cursor-pointer items-center justify-center rounded-md px-3 text-center text-[15px] font-medium text-[#1c1206] transition-colors [backface-visibility:hidden] [will-change:transform] hover:bg-black/[0.04]"
                  style={{ height: ITEM_H, scrollSnapAlign: 'center' }}
                >
                  <span className="truncate">{o.label}</span>
                </button>
              ))}
              <div style={{ height: PAD }} aria-hidden="true" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
