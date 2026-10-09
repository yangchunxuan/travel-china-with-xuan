/** Routes with supplier-specific winter service copy and direct inquiry fallback. */
const northeastWinterTourSlugs = new Set([
  "harbin-yabuli-snow-town-6-day-private-tour",
  "harbin-snow-town-changbaishan-yanji-8-day-private-tour",
  "harbin-mohe-arctic-village-7-day-private-tour",
  "harbin-snow-town-mohe-9-day-private-tour",
  "yanji-changbaishan-wanda-6-day-private-tour",
]);

export function isNortheastWinterTour(slug: string | null | undefined): boolean {
  return Boolean(slug && northeastWinterTourSlugs.has(slug));
}
