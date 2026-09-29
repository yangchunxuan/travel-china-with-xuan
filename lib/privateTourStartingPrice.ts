import type { LocalizedPrivateTourProduct } from "./privateTourProducts";
import type { PrivateTourInquirySelection } from "./privateTourInquiryContext";

/** The lowest published entry price and its exact group/service basis travel together. */
export function getPrivateTourStartingPrice(product: LocalizedPrivateTourProduct) {
  const candidates = product.packages.flatMap((tourPackage) =>
    tourPackage.rows
      .map((row) => ({ tourPackage, row })),
  );
  if (candidates.length === 0) {
    return null;
  }
  const { tourPackage, row } = candidates.reduce((lowest, candidate) =>
    candidate.row.cny < lowest.row.cny ? candidate : lowest,
  );
  return {
    ...row,
    serviceLabel: tourPackage.label,
    selection: {
      packageId: tourPackage.id,
      travelers: row.travelers,
    } satisfies PrivateTourInquirySelection,
  };
}

/**
 * Where an overview card opens the tour: the starting price's service at its
 * smallest published party (usually two). The cheapest row is normally the
 * six-traveller tier, and preselecting it would show a couple a price that
 * does not apply to them.
 */
export function getPrivateTourEntrySelection(
  product: LocalizedPrivateTourProduct,
): PrivateTourInquirySelection | null {
  const starting = getPrivateTourStartingPrice(product);
  if (!starting) return null;
  const tourPackage = product.packages.find(
    (candidate) => candidate.id === starting.selection.packageId,
  );
  const smallest = tourPackage?.rows.reduce((lowest, row) =>
    row.travelers < lowest.travelers ? row : lowest,
  );
  return {
    packageId: starting.selection.packageId,
    travelers: smallest?.travelers ?? starting.travelers,
  };
}

/**
 * The two-traveller per-person price in the starting service, shown beside a
 * larger-group starting price. Null for fixed-departure small groups (one
 * twin-share price), when no two-traveller tier is published, or when the
 * starting price already is the two-traveller price.
 */
export function getPrivateTourTwoTravellerPrice(
  product: LocalizedPrivateTourProduct,
) {
  if (product.tourFormat === "small-group") return null;
  const starting = getPrivateTourStartingPrice(product);
  if (!starting || starting.travelers === 2) return null;
  const row = product.packages
    .find((candidate) => candidate.id === starting.selection.packageId)
    ?.rows.find((candidate) => candidate.travelers === 2);
  return row ?? null;
}
