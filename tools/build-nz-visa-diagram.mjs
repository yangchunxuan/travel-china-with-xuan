import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(
  root,
  "public/images/guides/china-visa-free-new-zealand-citizens-2026",
);

const ink = "#141413";
const canvas = "#faf9f5";
const rust = "#a74731";
const muted = "#59655f";
const line = "#d8d8d1";

/**
 * An editorial policy-window diagram, not a photograph. The single fact this
 * guide turns on is a dated, currently time-limited window, so the hero states
 * that window rather than generic China scenery. Deliberately carries no seal,
 * stamp or badge that could imply official endorsement.
 */
function diagramSvg(width, height) {
  const isWide = width / height > 1.4;
  const cx = width / 2;

  const titleSize = Math.round(width * (isWide ? 0.036 : 0.05));
  const dateSize = Math.round(width * (isWide ? 0.034 : 0.046));
  const labelSize = Math.round(width * (isWide ? 0.022 : 0.03));
  const noteSize = Math.round(width * (isWide ? 0.021 : 0.028));

  if (isWide) {
    // Horizontal timeline for card / og crops.
    const railY = height * 0.56;
    const railX1 = width * 0.12;
    const railX2 = width * 0.88;
    const tick = height * 0.03;

    return Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${canvas}"/>
  <text x="${cx}" y="${railY - height * 0.16}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${titleSize}"
        font-weight="600" fill="${ink}">The current policy window</text>

  <line x1="${railX1}" y1="${railY}" x2="${railX2}" y2="${railY}"
        stroke="${ink}" stroke-width="${Math.max(2, width * 0.0022)}"/>
  <circle cx="${railX1}" cy="${railY}" r="${tick}" fill="${ink}"/>
  <circle cx="${railX2}" cy="${railY}" r="${tick}" fill="${rust}"/>

  <text x="${railX1}" y="${railY + height * 0.11}" text-anchor="start"
        font-family="Georgia, serif" font-size="${dateSize}" font-weight="600" fill="${ink}">30 Nov 2024</text>
  <text x="${railX1}" y="${railY - height * 0.05}" text-anchor="start"
        font-family="Arial, Helvetica, sans-serif" font-size="${labelSize}"
        font-weight="700" letter-spacing="${width * 0.0012}" fill="${muted}">POLICY BEGINS</text>

  <text x="${railX2}" y="${railY + height * 0.11}" text-anchor="end"
        font-family="Georgia, serif" font-size="${dateSize}" font-weight="600" fill="${rust}">31 Dec 2026</text>
  <text x="${railX2}" y="${railY - height * 0.05}" text-anchor="end"
        font-family="Arial, Helvetica, sans-serif" font-size="${labelSize}"
        font-weight="700" letter-spacing="${width * 0.0012}" fill="${muted}">CONFIRMED THROUGH</text>

  <text x="${cx}" y="${railY + height * 0.24}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${noteSize}" font-weight="600" fill="${muted}">
    Up to 30 days per visit &#183; ordinary New Zealand passport
  </text>
</svg>`);
  }

  // Vertical timeline for the portrait hero. The top-left corner is reserved
  // for the page's floating policy-stamp card, so this drawing starts well
  // below and to the right of it rather than centering at the very top.
  const railX = width * 0.4;
  const railY1 = height * 0.36;
  const railY2 = height * 0.78;
  const tick = width * 0.022;
  const vLabelSize = labelSize * 0.85;
  const vDateSize = dateSize * 0.82;

  return Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${canvas}"/>

  <text x="${width * 0.5}" y="${height * 0.24}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${titleSize}"
        font-weight="600" fill="${ink}">The current</text>
  <text x="${width * 0.5}" y="${height * 0.24 + titleSize * 1.15}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${titleSize}"
        font-weight="600" fill="${ink}">policy window</text>

  <line x1="${railX}" y1="${railY1}" x2="${railX}" y2="${railY2}"
        stroke="${ink}" stroke-width="${Math.max(2, width * 0.004)}"/>
  <circle cx="${railX}" cy="${railY1}" r="${tick}" fill="${ink}"/>
  <circle cx="${railX}" cy="${railY2}" r="${tick}" fill="${rust}"/>

  <text x="${railX + width * 0.05}" y="${railY1 + vLabelSize * 0.4}" text-anchor="start"
        font-family="Arial, Helvetica, sans-serif" font-size="${vLabelSize}"
        font-weight="700" letter-spacing="${width * 0.0012}" fill="${muted}">POLICY BEGINS</text>
  <text x="${railX + width * 0.05}" y="${railY1 + vLabelSize * 1.6}" text-anchor="start"
        font-family="Georgia, serif" font-size="${vDateSize}" font-weight="600" fill="${ink}">30 Nov 2024</text>

  <text x="${railX + width * 0.05}" y="${railY2 + vLabelSize * 0.4}" text-anchor="start"
        font-family="Arial, Helvetica, sans-serif" font-size="${vLabelSize}"
        font-weight="700" letter-spacing="${width * 0.0012}" fill="${muted}">CONFIRMED THROUGH</text>
  <text x="${railX + width * 0.05}" y="${railY2 + vLabelSize * 1.6}" text-anchor="start"
        font-family="Georgia, serif" font-size="${vDateSize}" font-weight="600" fill="${rust}">31 Dec 2026</text>

  <line x1="${width * 0.16}" y1="${height * 0.86}" x2="${width * 0.84}" y2="${height * 0.86}"
        stroke="${line}" stroke-width="1.4"/>
  <text x="${cx}" y="${height * 0.9}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${noteSize}" font-weight="600" fill="${muted}">
    Up to 30 days per visit
  </text>
  <text x="${cx}" y="${height * 0.9 + noteSize * 1.4}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${noteSize}" font-weight="600" fill="${muted}">
    Ordinary New Zealand passport
  </text>
</svg>`);
}

const outputs = [
  { stem: "timeline-hero", width: 1200, height: 1800 },
  { stem: "timeline-hero", width: 720, height: 1080 },
  { stem: "timeline-card", width: 1200, height: 750 },
  { stem: "timeline-og", width: 1200, height: 630 },
];

await mkdir(outputDir, { recursive: true });

for (const { stem, width, height } of outputs) {
  const base = sharp(diagramSvg(width, height));
  const name = `${stem}-${width}`;
  await Promise.all([
    base.clone().jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(outputDir, `${name}.jpg`)),
    base.clone().webp({ quality: 90 }).toFile(path.join(outputDir, `${name}.webp`)),
    base.clone().avif({ quality: 62, effort: 5 }).toFile(path.join(outputDir, `${name}.avif`)),
  ]);
}

console.log(`✓ Wrote ${outputs.length * 3} diagram derivatives`);
