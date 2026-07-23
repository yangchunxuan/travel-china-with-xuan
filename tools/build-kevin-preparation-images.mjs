import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "tmp/kevin-preparation");
const outputDir = path.join(
  root,
  "public/images/guides/kevin-preparation",
);

const imageSets = [
  {
    input: "hero-original.jpg",
    stem: "kevin-hero",
    outputs: [
      { width: 720, height: 960 },
      { width: 1080, height: 1440 },
    ],
  },
  {
    input: "hero-original.jpg",
    stem: "kevin-hero-og",
    outputs: [{ width: 1200, height: 630 }],
  },
  {
    input: "solo-original.jpg",
    stem: "kevin-solo",
    outputs: [
      { width: 720, height: 960 },
      { width: 1080, height: 1440 },
    ],
  },
  {
    input: "guiding-privacy.png",
    stem: "kevin-guiding",
    outputs: [
      { width: 720, height: 960 },
      { width: 1080, height: 1440 },
    ],
  },
  {
    input: "rain-privacy.png",
    stem: "kevin-rain",
    outputs: [
      { width: 720, height: 960 },
      { width: 1080, height: 1440 },
    ],
  },
];

function watermarkSvg(width, height) {
  const pillWidth = Math.round(width * 0.25);
  const pillHeight = Math.max(44, Math.round(pillWidth * 0.27));
  const margin = Math.max(20, Math.round(width * 0.035));
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

async function writeFormats({ input, stem, width, height }) {
  const source = path.join(inputDir, input);
  const resized = await sharp(source)
    .rotate()
    .resize({
      width,
      height,
      fit: "cover",
      position: "centre",
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

console.log(`Prepared Kevin editorial images in ${outputDir}`);
