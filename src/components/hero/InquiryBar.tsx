'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { company, productKeys } from '@/lib/site';
import { countryOptions } from '@/lib/countries';
import WheelPicker from '../WheelPicker';

const VOLUME_STEPS = [1000, 2000, 5000, 10000, 15000, 20000];

export default function InquiryBar({ onBand = false }: { onBand?: boolean }) {
  const t = useTranslations('hero.inquiry');
  const tp = useTranslations('products.items');
  const locale = useLocale();

  const [product, setProduct] = useState('');
  const [volume, setVolume] = useState('');
  const [country, setCountry] = useState('');

  const unit = t('unit');
  const productOptions = productKeys.map((k) => ({ value: k, label: tp(`${k}.name`) }));
  const volumeOptions = [
    ...VOLUME_STEPS.map((n) => {
      const label = `${n.toLocaleString(locale)} ${unit}`;
      return { value: label, label };
    }),
    { value: t('volumeOver'), label: t('volumeOver') },
  ];
  const countries = countryOptions(locale);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const productName = product ? tp(`${product}.name`) : '—';
    const msg = `Quote request%0AProduct: ${productName}%0AVolume: ${volume || '—'}%0ACountry: ${country || '—'}`;
    window.open(`${company.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  const fieldCls = onBand
    ? 'w-full rounded-pill border border-black/10 bg-white px-4 py-3 text-sm text-[#1c1206] outline-none focus:border-[#1c1206] focus:ring-2 focus:ring-black/15'
    : 'w-full rounded-pill border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber-100';

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
        <WheelPicker
          options={productOptions}
          value={product}
          onChange={setProduct}
          placeholder={t('productPlaceholder')}
          className={fieldCls}
          ariaLabel={t('product')}
        />
      </Field>

      <Field label={t('volume')} onBand={onBand}>
        <WheelPicker
          options={volumeOptions}
          value={volume}
          onChange={setVolume}
          placeholder={t('volumePlaceholder')}
          className={fieldCls}
          ariaLabel={t('volume')}
        />
      </Field>

      <Field label={t('country')} onBand={onBand}>
        <WheelPicker
          options={countries}
          value={country}
          onChange={setCountry}
          placeholder={t('countryPlaceholder')}
          className={fieldCls}
          ariaLabel={t('country')}
        />
      </Field>

      <button
        type="submit"
        className={
          onBand
            ? 'btn h-[46px] rounded-pill bg-[#1b1206] px-6 text-sm font-bold text-white shadow-soft transition-colors hover:bg-[#2e2009] sm:self-end'
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
    <div className="flex flex-col gap-1.5">
      <span className={`px-1 text-xs font-semibold ${onBand ? 'text-[#3a2a0a]' : 'text-muted'}`}>
        {label}
      </span>
      {children}
    </div>
  );
}
