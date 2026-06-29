import type { ProductKey } from '@/lib/site';

const paths: Record<ProductKey, React.ReactNode> = {
  motor: (
    <>
      <rect x="3" y="9" width="14" height="8" rx="1.5" />
      <path d="M17 11h2l2 2v2a1 1 0 0 1-1 1h-3M6 17v2M13 17v2M5 9V7h6v2" />
    </>
  ),
  diesel: (
    <>
      <rect x="3" y="8" width="13" height="9" rx="1.5" />
      <path d="M16 10h3l2 3v3a1 1 0 0 1-1 1h-1M6 8V6h4v2M8 12h4" />
    </>
  ),
  transmission: (
    <>
      <circle cx="9" cy="9" r="4" />
      <circle cx="16" cy="15" r="3" />
      <path d="M9 3v2M9 13v2M3 9h2M13 9h2" />
    </>
  ),
  industrial: (
    <>
      <path d="M4 20V10l5 3V10l5 3V6l6 3v11H4Z" />
      <path d="M8 20v-3M14 20v-3" />
    </>
  ),
  marine: (
    <>
      <path d="M4 14h16l-2 5H6l-2-5Z" />
      <path d="M12 14V5l5 3-5 2M12 5 7 8l5 2" />
    </>
  ),
  greases: (
    <>
      <path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9Z" />
      <path d="M10 13a2 2 0 0 0 2 2" />
    </>
  ),
  coolants: (
    <>
      <path d="M12 3v12" />
      <circle cx="12" cy="17" r="4" />
      <path d="M9 7h6M9 11h6" />
    </>
  ),
};

export default function ProductIcon({ name }: { name: ProductKey }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
