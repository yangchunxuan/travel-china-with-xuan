import type { CSSProperties } from "react";
import { encode } from "uqr";
import { whatsappQrCandidates } from "../lib/contactCard";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import styles from "./ContactCard.module.css";

const maximumComfortableVersion = 15;
const finderSize = 7;

function roundedSquare(x: number, y: number, size: number, radius: number) {
  const r = Math.min(radius, size / 2);
  const f = (value: number) => Number(value.toFixed(3));
  return `M${f(x + r)} ${f(y)}h${f(size - 2 * r)}a${r} ${r} 0 0 1 ${r} ${r}v${f(size - 2 * r)}a${r} ${r} 0 0 1 -${r} ${r}h-${f(size - 2 * r)}a${r} ${r} 0 0 1 -${r} -${r}v-${f(size - 2 * r)}a${r} ${r} 0 0 1 ${r} -${r}z`;
}

/**
 * The WhatsApp chat as a scannable code, drawn in the site's hand: soft
 * square modules, rounded finder "eyes" with terracotta pupils, and the
 * Homeground mark in a clear centre (error correction M restores the few
 * modules it covers). Encoded once per href; plain SVG, no canvas.
 */
export function WhatsAppQr({ href, label }: { href: string; label: string }) {
  const candidates = whatsappQrCandidates(href);
  let qr = encode(candidates[0], { ecc: "M", border: 0 });
  for (const candidate of candidates.slice(1)) {
    if (qr.version <= maximumComfortableVersion) break;
    qr = encode(candidate, { ecc: "M", border: 0 });
  }

  const { size, data } = qr;
  // An odd-sized clear square in the middle, about a fifth of the width.
  let logo = Math.round(size * 0.2);
  if (logo % 2 === 0) logo += 1;
  const logoStart = (size - logo) / 2;
  const inLogo = (x: number, y: number) =>
    x >= logoStart && x < logoStart + logo && y >= logoStart && y < logoStart + logo;
  const inFinder = (x: number, y: number) =>
    (x < finderSize && y < finderSize) ||
    (x >= size - finderSize && y < finderSize) ||
    (x < finderSize && y >= size - finderSize);

  let modules = "";
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!data[y][x] || inFinder(x, y) || inLogo(x, y)) continue;
      modules += roundedSquare(x + 0.06, y + 0.06, 0.88, 0.3);
    }
  }
  const finders = [
    [0, 0],
    [size - finderSize, 0],
    [0, size - finderSize],
  ];

  return (
    <div className={styles.qrCode} style={{ "--qr-logo": `${(logo / size) * 100}%` } as CSSProperties}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={label}
        shapeRendering="geometricPrecision"
        data-qr-version={qr.version}
      >
        <path className={styles.qrModules} d={modules} />
        {finders.map(([x, y]) => (
          <g key={`${x}-${y}`} className={styles.qrEye}>
            <path
              className={styles.qrEyeRing}
              d={`${roundedSquare(x, y, 7, 2.2)}${roundedSquare(x + 1, y + 1, 5, 1.4)}`}
              fillRule="evenodd"
            />
            <path className={styles.qrEyePupil} d={roundedSquare(x + 2, y + 2, 3, 0.9)} />
          </g>
        ))}
      </svg>
      <span className={styles.qrLogo} aria-hidden="true">
        <HomegroundBrandMark />
      </span>
    </div>
  );
}
