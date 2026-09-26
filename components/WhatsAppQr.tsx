"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
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

function drawCode(href: string) {
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
  return { size, version: qr.version, logo, modules, finders };
}

type QrDrawing = ReturnType<typeof drawCode>;

/** The code's markup; until `code` is drawn, the same square, empty. */
function QrCode({ code, label }: { code: QrDrawing | null; label: string }) {
  return (
    <div className={styles.qrCode} style={code ? ({ "--qr-logo": `${(code.logo / code.size) * 100}%` } as CSSProperties) : undefined}>
      <svg
        viewBox={code ? `0 0 ${code.size} ${code.size}` : "0 0 1 1"}
        role="img"
        aria-label={label}
        shapeRendering="geometricPrecision"
        data-qr-version={code?.version}
      >
        {code ? (
          <>
            <path className={styles.qrModules} d={code.modules} />
            {code.finders.map(([x, y]) => (
              <g key={`${x}-${y}`} className={styles.qrEye}>
                <path
                  className={styles.qrEyeRing}
                  d={`${roundedSquare(x, y, 7, 2.2)}${roundedSquare(x + 1, y + 1, 5, 1.4)}`}
                  fillRule="evenodd"
                />
                <path className={styles.qrEyePupil} d={roundedSquare(x + 2, y + 2, 3, 0.9)} />
              </g>
            ))}
          </>
        ) : null}
      </svg>
      {code ? (
        <span className={styles.qrLogo} aria-hidden="true">
          <HomegroundBrandMark />
        </span>
      ) : null}
    </div>
  );
}

/** The code drawn in the first moment after its (empty) square has painted. */
function QrCodeAfterPaint({ href, label }: { href: string; label: string }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    let timer = 0;
    const frame = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => setDrawn(true));
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);
  const code = useMemo(() => (drawn ? drawCode(href) : null), [drawn, href]);
  return <QrCode code={code} label={label} />;
}

/**
 * The WhatsApp chat as a scannable code, drawn in the site's hand: soft
 * square modules, rounded finder "eyes" with terracotta pupils, and the
 * Homeground mark in a clear centre (error correction M restores the few
 * modules it covers). Plain SVG, no canvas. The contact card passes
 * `drawAfterPaint`: the code is then drawn just after the card first paints,
 * so the card opens without waiting for its heaviest part (the code's reveal
 * starts later anyway) and the square it fills is there from the start.
 * Everywhere else (the homepage contact board) it is drawn as it renders.
 */
export function WhatsAppQr({ href, label, drawAfterPaint = false }: { href: string; label: string; drawAfterPaint?: boolean }) {
  return drawAfterPaint ? <QrCodeAfterPaint href={href} label={label} /> : <QrCode code={drawCode(href)} label={label} />;
}
