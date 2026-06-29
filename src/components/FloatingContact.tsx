'use client';

import { company } from '@/lib/site';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col gap-3">
      <a
        href={company.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="inline-flex h-12 w-12 items-center justify-center rounded-pill border border-line bg-white text-navy-600 shadow-lift transition-transform hover:-translate-y-0.5"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.5.4-.9.4l.3-4.6 8.5-7.7c.4-.3-.1-.5-.6-.2L7.5 13.4l-4.5-1.4c-1-.3-1-1 .2-1.4l17.5-6.7c.8-.3 1.5.2 1.2 1.4Z" />
        </svg>
      </a>
      <a
        href={company.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="inline-flex h-14 w-14 items-center justify-center rounded-pill text-white shadow-lift transition-transform hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.3.1.7-.1 1.4Z" />
        </svg>
      </a>
    </div>
  );
}
