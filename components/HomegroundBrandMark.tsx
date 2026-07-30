interface HomegroundBrandMarkProps {
  className?: string;
}

export function HomegroundBrandMark({
  className,
}: HomegroundBrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="38 46 202 202"
      aria-hidden="true"
      focusable="false"
      data-homeground-brand-mark="paired-path"
    >
      <rect
        x="77"
        y="55"
        width="66"
        height="126"
        rx="33"
        fill="#a84731"
        transform="rotate(45 110 118)"
      />
      <rect
        x="135"
        y="113"
        width="66"
        height="126"
        rx="33"
        fill="#d19e8f"
        transform="rotate(45 168 176)"
      />
    </svg>
  );
}
