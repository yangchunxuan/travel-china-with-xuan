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
