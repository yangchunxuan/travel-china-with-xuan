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

for (const imageSet of imageSets) {
  for (const output of imageSet.outputs) {
    await writeFormats({ ...imageSet, ...output });
  }
}

console.log(`Prepared Kevin editorial images in ${outputDir}`);
