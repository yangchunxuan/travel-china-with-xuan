import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "tmp/older-travellers");
const outputDir = path.join(
  root,
  "public/images/guides/zhangjiajie-older-travellers",
);

/**
 * Sources are owner-supplied iPhone frames. Several were stored rotated with no
 * EXIF orientation, so each entry carries the rotation sharp must apply before
 * cropping. `position` picks the part of the frame the crop keeps.
 */
const imageSets = [
  {
    input: "bailong-elevator.jpg",
    stem: "bailong-elevator",
    rotate: 0,
    position: "centre",
    outputs: [
      { width: 720, height: 900 },
      { width: 1200, height: 1500 },
    ],
  },
  {
    input: "bailong-elevator.jpg",
    stem: "bailong-elevator-og",
    rotate: 0,
    position: "centre",
    outputs: [{ width: 1200, height: 630 }],
  },
  {
    input: "natural-bridge.jpg",
    stem: "natural-bridge",
    rotate: 0,
    position: "centre",
    outputs: [
      { width: 720, height: 405 },
      { width: 1200, height: 675 },
    ],
  },
  {
    input: "park-shuttle.jpg",
    stem: "park-shuttle",
    rotate: 0,
    position: "centre",
    outputs: [
      { width: 720, height: 480 },
      { width: 1200, height: 800 },
    ],
  },
  {
    input: "pillars.jpg",
    stem: "pillars",
    rotate: 0,
    position: "centre",
    outputs: [
      { width: 720, height: 405 },
      { width: 1200, height: 675 },
    ],
  },
];

function watermarkSvg(width, height) {
  const pillWidth = Math.round(width * 0.16);
  const pillHeight = Math.max(30, Math.round(pillWidth * 0.27));
  const margin = Math.max(14, Math.round(width * 0.025));
  const x = width - pillWidth - margin;
  const y = height - pillHeight - margin;
  const markSize = Math.round(pillHeight * 0.58);
  const markX = x + Math.round(pillHeight * 0.28);
  const markY = y + Math.round((pillHeight - markSize) / 2);
  const textX = markX + markSize + Math.round(pillHeight * 0.2);
  const titleY = y + Math.round(pillHeight * 0.47);
  const taglineY = y + Math.round(pillHeight * 0.71);
  const titleSize = Math.round(pillHeight * 0.27);
  const taglineSize = Math.max(5, Math.round(pillHeight * 0.09));
  const archWidth = Math.round(markSize * 0.44);
  const archHeight = Math.round(markSize * 0.42);
  const archX = markX + Math.round((markSize - archWidth) / 2);
  const archY = markY + Math.round(markSize * 0.34);

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${x}" y="${y}" width="${pillWidth}" height="${pillHeight}" rx="${pillHeight / 2}" fill="#fbfaf7" fill-opacity="0.9"/>
      <circle cx="${markX + markSize / 2}" cy="${markY + markSize / 2}" r="${markSize / 2 - 1}" fill="none" stroke="#a74731" stroke-width="${Math.max(1.4, markSize * 0.045)}"/>
      <path d="M ${archX} ${archY + archHeight} V ${archY + archHeight * 0.45} C ${archX} ${archY - archHeight * 0.1}, ${archX + archWidth} ${archY - archHeight * 0.1}, ${archX + archWidth} ${archY + archHeight * 0.45} V ${archY + archHeight} Z" fill="#a74731"/>
      <path d="M ${archX + archWidth * 0.23} ${archY + archHeight} V ${archY + archHeight * 0.62} C ${archX + archWidth * 0.23} ${archY + archHeight * 0.34}, ${archX + archWidth * 0.77} ${archY + archHeight * 0.34}, ${archX + archWidth * 0.77} ${archY + archHeight * 0.62} V ${archY + archHeight} Z" fill="#fbfaf7"/>
      <text x="${textX}" y="${titleY}" fill="#13251e" font-family="Georgia, Times New Roman, serif" font-size="${titleSize}" font-weight="700">Homeground</text>
      <text x="${textX}" y="${taglineY}" fill="#59655f" font-family="Arial, Helvetica, sans-serif" font-size="${taglineSize}" font-weight="700" letter-spacing="${Math.max(0.8, pillHeight * 0.022)}">CHINA TRIP PLANNING</text>
    </svg>
  `);
}

async function writeFormats({ input, stem, rotate, position, width, height }) {
  const source = path.join(inputDir, input);
  // First honour any EXIF orientation, then apply the explicit correction the
  // entry asks for. sharp's `.rotate(angle)` ignores EXIF, so the two steps
  // must be separate or the auto-corrected frames land sideways again.
  const upright = await sharp(source).rotate().toBuffer();
  const resized = await sharp(rotate ? await sharp(upright).rotate(rotate).toBuffer() : upright)
    .resize({
      width,
      height,
      fit: "cover",
      position,
      withoutEnlargement: false,
    })
    .toBuffer();
  const marked = sharp(resized).composite([
    { input: watermarkSvg(width, height), left: 0, top: 0 },
  ]);
  const basename = `${stem}-${width}`;

  await Promise.all([
    marked
      .clone()
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(outputDir, `${basename}.jpg`)),
    marked
      .clone()
      .webp({ quality: 82, smartSubsample: true })
      .toFile(path.join(outputDir, `${basename}.webp`)),
    marked
      .clone()
      .avif({ quality: 55, effort: 5 })
      .toFile(path.join(outputDir, `${basename}.avif`)),
  ]);
}

await mkdir(outputDir, { recursive: true });

for (const imageSet of imageSets) {
  for (const output of imageSet.outputs) {
    await writeFormats({ ...imageSet, ...output });
  }
}

console.log(
  `✓ Wrote ${imageSets.reduce((n, s) => n + s.outputs.length, 0) * 3} derivatives to ${path.relative(root, outputDir)}`,
);
