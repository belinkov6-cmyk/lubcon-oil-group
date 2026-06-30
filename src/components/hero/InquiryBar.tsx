'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { company, productKeys } from '@/lib/site';

export default function InquiryBar({ onBand = false }: { onBand?: boolean }) {
  const t = useTranslations('hero.inquiry');
  const tp = useTranslations('products.items');
  const [product, setProduct] = useState('');
  const [volume, setVolume] = useState('');
  const [country, setCountry] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const productName = product ? tp(`${product}.name`) : '—';
    const msg = `Quote request%0AProduct: ${productName}%0AVolume: ${volume || '—'}%0ACountry: ${country || '—'}`;
    window.open(`${company.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  const fieldCls = onBand
    ? 'w-full rounded-pill border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-ink focus:ring-2 focus:ring-black/15'
    : 'w-full rounded-pill border border-line bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-amber focus:ring-2 focus:ring-amber-100';

  return (
    <form
      onSubmit={submit}
      className={
        onBand
          ? 'grid gap-3 sm:grid-cols-[1.1fr_1fr_1fr_auto] sm:items-end sm:gap-2.5'
          : 'grid gap-3 rounded-card border border-line bg-white p-3 shadow-lift sm:grid-cols-[1.1fr_1fr_1fr_auto] sm:items-end sm:gap-2 sm:p-3'
      }
    >
      <Field label={t('product')} onBand={onBand}>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className={fieldCls}
          aria-label={t('product')}
        >
          <option value="">{t('productPlaceholder')}</option>
          {productKeys.map((k) => (
            <option key={k} value={k}>
              {tp(`${k}.name`)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('volume')} onBand={onBand}>
        <input
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          placeholder={t('volumePlaceholder')}
          className={fieldCls}
          aria-label={t('volume')}
        />
      </Field>

      <Field label={t('country')} onBand={onBand}>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder={t('countryPlaceholder')}
          className={fieldCls}
          aria-label={t('country')}
        />
      </Field>

      <button
        type="submit"
        className={
          onBand
            ? 'btn h-[46px] rounded-pill bg-ink px-6 text-sm font-bold text-white shadow-soft transition-colors hover:bg-navy sm:self-end'
            : 'btn-amber h-[46px] px-6 text-sm sm:self-end'
        }
      >
        {t('submit')}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  onBand = false,
}: {
  label: string;
  children: React.ReactNode;
  onBand?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={`px-1 text-xs font-semibold ${onBand ? 'text-ink' : 'text-muted'}`}>
        {label}
      </span>
      {children}
    </label>
  );
}
