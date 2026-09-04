export const privateTourCardImageWidths = [320, 640, 960, 1380] as const;

export function privateTourCardImageSource(
  productId: string,
  width: (typeof privateTourCardImageWidths)[number],
) {
  return `/images/private-tour-cards/${productId}-${width}.webp`;
}

export function privateTourCardImageSrcSet(productId: string) {
  return privateTourCardImageWidths
    .map(
      (width) =>
        `${privateTourCardImageSource(productId, width)} ${width}w`,
    )
    .join(", ");
}
