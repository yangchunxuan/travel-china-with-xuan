import { readdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const [inputDirectory, outputFile] = process.argv.slice(2);

if (!inputDirectory || !outputFile) {
  throw new Error(
    "Usage: node tools/build-private-tour-review-contact-sheet.mjs <input-directory> <output-file>",
  );
}

const entries = (await readdir(inputDirectory, { withFileTypes: true }))
  .filter(
    (entry) =>
      (entry.isFile() || entry.isSymbolicLink()) &&
      /\.(?:jpe?g|png|webp)$/i.test(entry.name),
  )
  .sort((left, right) =>
    left.name.localeCompare(right.name, "zh-Hans-CN", { numeric: true }),
  );

const columns = 3;
const cellWidth = 520;
const imageHeight = 340;
const labelHeight = 72;
const cellHeight = imageHeight + labelHeight;
const rows = Math.ceil(entries.length / columns);

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const composites = [];
for (const [index, entry] of entries.entries()) {
  const left = (index % columns) * cellWidth;
  const top = Math.floor(index / columns) * cellHeight;
  const inputPath = path.join(inputDirectory, entry.name);
  const thumbnail = await sharp(inputPath)
    .rotate()
    .resize(cellWidth, imageHeight, {
      fit: "contain",
      background: "#eee9df",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 88 })
    .toBuffer();

  const label = Buffer.from(`
    <svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f4eb" />
      <text x="16" y="29" font-family="Arial, PingFang SC, sans-serif" font-size="17" fill="#1f2933">
        ${index + 1}. ${escapeXml(entry.name)}
      </text>
      <text x="16" y="54" font-family="Arial, sans-serif" font-size="13" fill="#68737d">
        原图完整展示；网页裁切另行检查
      </text>
    </svg>
  `);

  composites.push({ input: thumbnail, left, top });
  composites.push({ input: label, left, top: top + imageHeight });
}

await sharp({
  create: {
    width: columns * cellWidth,
    height: Math.max(rows, 1) * cellHeight,
    channels: 3,
    background: "#d8d8d8",
  },
})
  .composite(composites)
  .jpeg({ quality: 90 })
  .toFile(outputFile);

console.log(`${entries.length} images -> ${outputFile}`);
