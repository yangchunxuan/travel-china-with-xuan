import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const sourceDirectory = process.env.HOMEGROUND_CHONGQING_ASSET_SOURCE;

if (!sourceDirectory) {
  throw new Error(
    "Set HOMEGROUND_CHONGQING_ASSET_SOURCE to the folder containing the reviewed original photographs.",
  );
}

const projectRoot = resolve(import.meta.dirname, "..");
const outputDirectory = resolve(
  projectRoot,
  "public/images/destinations/chongqing",
);

await mkdir(outputDirectory, { recursive: true });

const assets = [
  {
    output: "hero-1600.webp",
    source: resolve(sourceDirectory, "yuzhong.jpg"),
    transform(image) {
      return image
        .extract({ left: 400, top: 900, width: 6800, height: 4250 })
        .resize(1600, 1000, { fit: "cover" });
    },
  },
  {
    output: "confluence-1200.webp",
    source: resolve(sourceDirectory, "confluence.jpg"),
    transform(image) {
      return image.resize(1200, 800, { fit: "cover", position: "centre" });
    },
  },
  {
    output: "liziba-1200.webp",
    source: resolve(sourceDirectory, "liziba.jpg"),
    transform(image) {
      return image.resize(1200, 800, { fit: "cover", position: "centre" });
    },
  },
  {
    output: "wulong-1200.webp",
    source: resolve(sourceDirectory, "wulong.jpg"),
    transform(image) {
      return image.resize(1200, 800, { fit: "cover", position: "centre" });
    },
  },
  {
    output: "dazu-1200.webp",
    source: resolve(sourceDirectory, "dazu.jpg"),
    transform(image) {
      return image.resize(1200, 800, { fit: "cover", position: "centre" });
    },
  },
  {
    output: "crown-escalator-1200.webp",
    source: resolve(
      projectRoot,
      "public/images/guides/chongqing-upper-lower-city-orientation/hero-1600.webp",
    ),
    transform(image) {
      return image.resize(1200, 750, { fit: "cover", position: "centre" });
    },
  },
  {
    output: "chongqing-east-station-1200.webp",
    source: resolve(
      projectRoot,
      "public/images/guides/chongqing-railway-station-selector/hero-1600.webp",
    ),
    transform(image) {
      return image.resize(1200, 750, { fit: "cover", position: "centre" });
    },
  },
];

for (const asset of assets) {
  const outputPath = resolve(outputDirectory, asset.output);
  await asset
    .transform(sharp(asset.source, { failOn: "warning" }))
    .rotate()
    .webp({ quality: 84, effort: 6 })
    .toFile(outputPath);

  const [sourceBytes, outputBytes, metadata] = await Promise.all([
    readFile(asset.source),
    readFile(outputPath),
    sharp(outputPath).metadata(),
  ]);
  const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

  console.log(
    JSON.stringify({
      output: asset.output,
      dimensions: `${metadata.width}x${metadata.height}`,
      sourceSha256: sha256(sourceBytes),
      outputSha256: sha256(outputBytes),
    }),
  );
}
