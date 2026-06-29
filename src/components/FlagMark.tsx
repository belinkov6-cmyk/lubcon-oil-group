/** Small UAE flag mark — red hoist band + green/white/black stripes. */
export default function FlagMark({
  className = '',
  width = 22,
}: {
  className?: string;
  width?: number;
}) {
  const height = (width * 2) / 3;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 16"
      className={`shrink-0 rounded-[2px] ring-1 ring-black/5 ${className}`}
      role="img"
      aria-label="United Arab Emirates"
    >
      <rect width="24" height="16" fill="#ffffff" />
      <rect x="6" width="18" height="5.34" fill="#00843D" />
      <rect x="6" y="10.66" width="18" height="5.34" fill="#000000" />
      <rect width="6" height="16" fill="#CE1126" />
    </svg>
  );
}
