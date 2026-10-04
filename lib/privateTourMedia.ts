/** Merge authored day scenes without hiding later additions for the same day. */
export function mergePrivateTourRouteMedia<TVariant extends { image: { src: string } }>(
  groups: readonly { day: number; variants: readonly TVariant[] }[],
): readonly { day: number; variants: readonly TVariant[] }[] {
  const days = new Map<number, TVariant[]>();
  for (const group of groups) {
    const variants = days.get(group.day) ?? [];
    for (const variant of group.variants) {
      if (!variants.some((existing) => existing.image.src === variant.image.src)) variants.push(variant);
    }
    if (variants.length) days.set(group.day, variants);
  }
  return [...days].sort(([a], [b]) => a - b).map(([day, variants]) => ({ day, variants }));
}

/** The hero includes every verified scene, once, without duplicating files. */
export function collectPrivateTourPhotos<TImage extends { src: string }>(product: {
  heroImage: TImage;
  gallery: readonly TImage[];
  routeMedia?: readonly { variants: readonly { image: TImage }[] }[];
}): readonly TImage[] {
  const unique = new Map<string, TImage>();
  for (const image of [product.heroImage, ...product.gallery,
    ...(product.routeMedia ?? []).flatMap((group) => group.variants.map((variant) => variant.image))]) {
    if (!unique.has(image.src)) unique.set(image.src, image);
  }
  return [...unique.values()];
}

/** Select the day crossing the reading line, including gaps and fast scrolling. */
export function pickVisibleRouteDay(
  rects: readonly { index: number; top: number; bottom: number }[],
  anchor: number,
): number | null {
  let closest: { index: number; distance: number } | null = null;
  for (const rect of rects) {
    if (rect.top <= anchor && rect.bottom > anchor) return rect.index;
    const distance = Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));
    if (!closest || distance < closest.distance) closest = { index: rect.index, distance };
  }
  return closest?.index ?? null;
}

/** Cover crops enlarge the rendered image beyond the visible frame width. */
export function privateTourImageSizes(image: { width: number; height: number }, placement: "hero" | "day-mobile" | "day-desktop"): string {
  const ratio = image.width / image.height;
  const coverScale = (frameRatio: number) => image.height > image.width ? 1 : Math.max(1, ratio / frameRatio);
  const vw = (width: number, scale: number) => `${Math.ceil(width * scale)}vw`;
  const px = (width: number, scale: number) => `${Math.ceil(width * scale)}px`;
  if (placement === "hero") {
    const mobile = coverScale(4 / 3);
    const desktop = coverScale(4 / 5);
    return `(max-width: 760px) ${vw(92, mobile)}, (max-width: 1100px) ${vw(44, desktop)}, ${px(500, desktop)}`;
  }
  const scale = coverScale(16 / 10);
  return placement === "day-mobile"
    ? `(max-width: 760px) ${vw(92, scale)}, 1px`
    : `(max-width: 1100px) ${vw(48, scale)}, ${px(650, scale)}`;
}
