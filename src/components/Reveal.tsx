'use client';

import { createElement, useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Use createElement so the polymorphic `as` tag isn't affected by react-three-fiber's
  // global JSX.IntrinsicElements augmentation (which otherwise breaks children typing).
  return createElement(
    Tag,
    {
      ref,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
      className: `reveal ${shown ? 'is-in' : ''} ${className}`,
    },
    children
  );
}
