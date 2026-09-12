"use client";

import type { ImageLoaderProps } from "next/image";

// Static export cannot run the Next.js image optimizer, so this loader maps a
// requested width onto the pre-generated variants produced by
// tools/generate-image-variants.mjs. Anything outside /images/ (or without a
// raster extension) is returned untouched.
const rasterPattern = /^\/images\/.+\.(webp|jpe?g|png)$/i;
const variantPattern = /\.w(640|1024|1280)\.webp$/i;

export default function homegroundImageLoader({ src, width }: ImageLoaderProps) {
  if (!rasterPattern.test(src) || variantPattern.test(src)) return src;
  if (width <= 640) return src.replace(/\.(webp|jpe?g|png)$/i, ".w640.webp");
  if (width <= 1024) return src.replace(/\.(webp|jpe?g|png)$/i, ".w1024.webp");
  if (width <= 1280) return src.replace(/\.(webp|jpe?g|png)$/i, ".w1280.webp");
  return src;
}
