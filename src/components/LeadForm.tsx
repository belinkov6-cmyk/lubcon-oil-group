'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { company, productKeys } from '@/lib/site';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function LeadForm() {
  const t = useTranslations('contact.form');
  const tp = useTranslations('products.items');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card flex flex-col items-start gap-4 p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy text-brass-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="font-display text-xl font-bold text-ink">{t('successTitle')}</h3>
        <p className="text-sm leading-relaxed text-muted">{t('successText')}</p>
        <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-brass">
          {t('whatsappFallback')}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('name')} name="name" required autoComplete="name" />
        <Field label={t('company')} name="company" autoComplete="organization" />
        <Field label={t('country')} name="country" autoComplete="country-name" />
        <Field label={t('email')} name="email" type="email" required autoComplete="email" />
        <Field label={t('phone')} name="phone" type="tel" autoComplete="tel" />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="interest" className="text-sm font-medium text-ink">
            {t('interest')}
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue=""
            className="rounded-card border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brass-2 focus:ring-2 focus:ring-brass-2/40"
          >
            <option value="" disabled>
              {t('interestPlaceholder')}
            </option>
            <option value="general">{t('interestGeneral')}</option>
            {productKeys.map((k) => (
              <option key={k} value={k}>
                {tp(`${k}.name`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="rounded-card border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brass-2 focus:ring-2 focus:ring-brass-2/40"
        />
      </div>

      {status === 'error' && (
        <div className="mt-4 flex items-start gap-2 rounded-card border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <span>
            <strong>{t('errorTitle')}.</strong> {t('errorText')}{' '}
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              {t('whatsappFallback')}
            </a>
          </span>
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-brass mt-6 w-full disabled:opacity-70">
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
      <p className="mt-3 text-center text-xs text-muted">{t('consent')}</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brass"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-card border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brass-2 focus:ring-2 focus:ring-brass-2/40"
      />
    </div>
  );
}
