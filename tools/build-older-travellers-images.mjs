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

console.log(
  `✓ Wrote ${imageSets.reduce((n, s) => n + s.outputs.length, 0) * 3} derivatives to ${path.relative(root, outputDir)}`,
);
