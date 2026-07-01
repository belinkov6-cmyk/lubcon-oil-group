'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { company, productKeys } from '@/lib/site';
import { countryOptions } from '@/lib/countries';
import WheelPicker from './WheelPicker';

type Status = 'idle' | 'sending' | 'success' | 'error';

const PICKER_CLS =
  'field-dark w-full rounded-card border border-line bg-[rgba(10,7,3,0.5)] px-4 py-2.5 text-sm text-cream outline-none transition-colors focus:border-brass-2 focus:ring-2 focus:ring-brass-2/40';

export default function LeadForm() {
  const t = useTranslations('contact.form');
  const tp = useTranslations('products.items');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [country, setCountry] = useState('');
  const [interest, setInterest] = useState('');

  const countries = countryOptions(locale);
  const interestOptions = [
    { value: 'general', label: t('interestGeneral') },
    ...productKeys.map((k) => ({ value: k, label: tp(`${k}.name`) })),
  ];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if ((fd.get('company_website') ?? '').toString().trim()) return; // honeypot
    const val = (k: string) => (fd.get(k) ?? '').toString().trim();

    const interestLabel =
      interest === 'general' ? t('interestGeneral') : interest ? tp(`${interest}.name`) : '—';
    const lines = [
      `${t('name')}: ${val('name') || '—'}`,
      `${t('company')}: ${val('company') || '—'}`,
      `${t('country')}: ${country || '—'}`,
      `${t('email')}: ${val('email') || '—'}`,
      `${t('phone')}: ${val('phone') || '—'}`,
      `${t('interest')}: ${interestLabel}`,
      `${t('message')}: ${val('message') || '—'}`,
    ];
    const text = encodeURIComponent(`Quote request\n\n${lines.join('\n')}`);
    window.open(`${company.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');

    // Best-effort background capture (only does anything if Telegram env is set).
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(fd.entries())),
    }).catch(() => {});

    setStatus('success');
    form.reset();
    setCountry('');
    setInterest('');
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
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
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
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">{t('country')}</span>
          <WheelPicker
            options={countries}
            value={country}
            onChange={setCountry}
            name="country"
            placeholder={t('country')}
            className={PICKER_CLS}
            ariaLabel={t('country')}
          />
        </div>
        <Field label={t('email')} name="email" type="email" required autoComplete="email" />
        <Field label={t('phone')} name="phone" type="tel" autoComplete="tel" />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">{t('interest')}</span>
          <WheelPicker
            options={interestOptions}
            value={interest}
            onChange={setInterest}
            name="interest"
            placeholder={t('interestPlaceholder')}
            className={PICKER_CLS}
            ariaLabel={t('interest')}
          />
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
          className="field-dark rounded-card border border-line bg-[rgba(10,7,3,0.5)] px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-muted/70 focus:border-brass-2 focus:ring-2 focus:ring-brass-2/40"
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

      <button type="submit" className="btn-brass mt-6 w-full shadow-none hover:shadow-none">
        {t('submit')}
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
        className="field-dark rounded-card border border-line bg-[rgba(10,7,3,0.5)] px-4 py-2.5 text-sm text-cream outline-none transition-colors placeholder:text-muted/70 focus:border-brass-2 focus:ring-2 focus:ring-brass-2/40"
      />
    </div>
  );
}
