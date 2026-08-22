import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const downloadsRoot = path.join(projectRoot, "public", "downloads");
const imageRoot = path.join(
  projectRoot,
  "public",
  "images",
  "guides",
  "first-trip-china-airport-station-stay-map",
);

await mkdir(imageRoot, { recursive: true });

const nationalSource = path.join(
  downloadsRoot,
  "homeground-china-10-city-arrival-stay-departure-v1.svg",
);

await Promise.all([
  sharp(nationalSource, { density: 144 })
    .resize(1600, 1000)
    .png({ compressionLevel: 9 })
    .toFile(
      path.join(
        downloadsRoot,
        "homeground-china-10-city-arrival-stay-departure-v1.png",
      ),
    ),
  sharp(nationalSource, { density: 288 })
    .resize(3200, 2000)
    .png({ compressionLevel: 9 })
    .toFile(
      path.join(
        downloadsRoot,
        "homeground-china-10-city-arrival-stay-departure-v1@2x.png",
      ),
    ),
  sharp(nationalSource, { density: 144 })
    .resize(1600, 1000)
    .webp({ quality: 88, smartSubsample: true })
    .toFile(path.join(imageRoot, "hero-1600.webp")),
]);

for (const city of ["beijing", "shanghai", "zhangjiajie"]) {
  const source = path.join(
    downloadsRoot,
    `homeground-china-${city}-arrive-stay-depart-v1.svg`,
  );
  await Promise.all([
    sharp(source, { density: 144 })
      .resize(1200, 675)
      .png({ compressionLevel: 9 })
      .toFile(
        path.join(
          downloadsRoot,
          `homeground-china-${city}-arrive-stay-depart-v1.png`,
        ),
      ),
    sharp(source, { density: 144 })
      .resize(1200, 675)
      .webp({ quality: 88, smartSubsample: true })
      .toFile(path.join(imageRoot, `${city}-card-1200.webp`)),
  ]);
}

process.stdout.write("Built the ten-city national map and three city-card derivatives.\n");
