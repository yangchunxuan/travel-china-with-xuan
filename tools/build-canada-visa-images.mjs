import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inputDir = path.join(root, "tmp/canada-visa");
const outputDir = path.join(
  root,
  "public/images/guides/china-visa-free-canadian-citizens-2026",
);

/**
 * Source is an owner-supplied, owner-photographed frame of Beijing's modern
 * skyline (China Zun and CCTV Headquarters), previously logged in
 * docs/homeground-photo-provenance.md as an approved future-use candidate.
 * It ships already portrait (2496x3744, a clean 2:3), so no rotation is needed.
 */
const imageSets = [
  {
    input: "beijing-skyline.jpg",
    stem: "skyline-hero",
    position: "centre",
    outputs: [
      { width: 720, height: 1080 },
      { width: 1200, height: 1800 },
    ],
  },
  {
    input: "beijing-skyline.jpg",
    stem: "skyline-card",
    position: "centre",
    outputs: [{ width: 1200, height: 750 }],
  },
  {
    input: "beijing-skyline.jpg",
    stem: "skyline-og",
    position: "centre",
    outputs: [{ width: 1200, height: 630 }],
  },
];

async function writeFormats({ input, stem, position, width, height }) {
  const source = path.join(inputDir, input);
  const upright = await sharp(source).rotate().toBuffer();
  const resized = await sharp(upright)
    .resize({
      width,
      height,
      fit: "cover",
      position,
      withoutEnlargement: false,
    })
    .toBuffer();
  // Nothing is written on a photo: no watermark, logo or caption in the image.
  const marked = sharp(resized);
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

let count = 0;
for (const set of imageSets) {
  for (const output of set.outputs) {
    await writeFormats({ ...set, ...output });
    count += 1;
  }
}

console.log(`✓ Wrote ${count * 3} image derivatives to ${outputDir}`);
