import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(
  root,
  "public/images/guides/china-240-hour-visa-free-transit-route-check",
);

const ink = "#141413";
const canvas = "#faf9f5";
const rust = "#a74731";
const muted = "#59655f";
const line = "#d8d8d1";

/**
 * An editorial route diagram, not a photograph. The page is a route-structure
 * screening tool, so the hero states the rule it screens for. Deliberately
 * carries no seal, stamp or badge that could imply official endorsement.
 */
function diagramSvg(width, height) {
  const cx = width / 2;
  // Vertical rhythm is derived so the same drawing works at 1200x630 and 1200x900.
  const isWide = width / height > 1.4;
  const nodeY = isWide ? height * 0.46 : height * 0.44;
  const nodeW = Math.round(width * (isWide ? 0.22 : 0.26));
  const nodeH = Math.round(nodeW * (isWide ? 0.42 : 0.4));
  const gap = Math.round(width * (isWide ? 0.055 : 0.05));
  const midW = Math.round(nodeW * 1.28);

  const midX = cx - midW / 2;
  const leftX = midX - gap - nodeW;
  const rightX = midX + midW + gap;

  const labelSize = Math.round(nodeH * 0.34);
  const midSize = Math.round(nodeH * 0.26);
  const titleSize = Math.round(width * (isWide ? 0.038 : 0.042));
  const subSize = Math.round(width * (isWide ? 0.035 : 0.038));

  const arrow = (fromX, toX) => {
    const y = nodeY + nodeH / 2;
    const head = Math.round(nodeH * 0.16);
    return `
      <line x1="${fromX + 6}" y1="${y}" x2="${toX - head - 2}" y2="${y}"
            stroke="${ink}" stroke-width="${Math.max(1.5, width * 0.0016)}"/>
      <path d="M ${toX - head} ${y - head * 0.52} L ${toX} ${y} L ${toX - head} ${y + head * 0.52} Z"
            fill="${ink}"/>`;
  };

  return Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${canvas}"/>

  <text x="${cx}" y="${nodeY - nodeH * 0.62}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${titleSize}"
        font-weight="600" fill="${ink}">Does your route qualify?</text>

  <rect x="${leftX}" y="${nodeY}" width="${nodeW}" height="${nodeH}" rx="${nodeH / 2}"
        fill="none" stroke="${rust}" stroke-width="${Math.max(1.6, width * 0.002)}"/>
  <text x="${leftX + nodeW / 2}" y="${nodeY + nodeH * 0.64}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${labelSize}"
        font-weight="700" fill="${rust}">A</text>

  ${arrow(leftX + nodeW, midX)}

  <rect x="${midX}" y="${nodeY}" width="${midW}" height="${nodeH}" rx="${Math.round(nodeH * 0.18)}"
        fill="${ink}"/>
  <text x="${cx}" y="${nodeY + nodeH * 0.62}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${midSize}"
        font-weight="700" letter-spacing="${width * 0.0012}" fill="${canvas}">MAINLAND CHINA</text>

  ${arrow(midX + midW, rightX)}

  <rect x="${rightX}" y="${nodeY}" width="${nodeW}" height="${nodeH}" rx="${nodeH / 2}"
        fill="none" stroke="${rust}" stroke-width="${Math.max(1.6, width * 0.002)}"/>
  <text x="${rightX + nodeW / 2}" y="${nodeY + nodeH * 0.64}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${labelSize}"
        font-weight="700" fill="${rust}">C</text>

  <line x1="${cx - width * 0.06}" y1="${nodeY + nodeH * 1.62}" x2="${cx + width * 0.06}"
        y2="${nodeY + nodeH * 1.62}" stroke="${line}" stroke-width="1.4"/>

  <text x="${cx}" y="${nodeY + nodeH * 2.12}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${subSize}"
        font-weight="600" fill="${muted}">
    A and C must be different countries or regions
  </text>
</svg>`);
}

const outputs = [
  { stem: "route-rule", width: 1200, height: 720 },
  { stem: "route-rule", width: 720, height: 432 },
  { stem: "route-rule-og", width: 1200, height: 630 },
];

await mkdir(outputDir, { recursive: true });

for (const { stem, width, height } of outputs) {
  const base = sharp(diagramSvg(width, height));
  const name = `${stem}-${width}`;
  await Promise.all([
    base.clone().jpeg({ quality: 92, mozjpeg: true })
      .toFile(path.join(outputDir, `${name}.jpg`)),
    base.clone().webp({ quality: 90 })
      .toFile(path.join(outputDir, `${name}.webp`)),
    base.clone().avif({ quality: 62, effort: 5 })
      .toFile(path.join(outputDir, `${name}.avif`)),
  ]);
}

console.log(`✓ Wrote ${outputs.length * 3} diagram derivatives`);
