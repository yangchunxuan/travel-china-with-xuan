import type { LocalizedPrivateTourProduct } from "./privateTourProducts";
import type { PrivateTourInquirySelection } from "./privateTourInquiryContext";

/** The published two-person entry price and its exact service option travel together. */
export function getPrivateTourStartingPrice(product: LocalizedPrivateTourProduct) {
  const candidates = product.packages.flatMap((tourPackage) =>
    tourPackage.rows
      .filter((row) => row.travelers === 2)
      .map((row) => ({ tourPackage, row })),
  );
  if (candidates.length === 0) {
    throw new Error(`Missing two-person starting price for ${product.slug}`);
  }
  const { tourPackage, row } = candidates.reduce((lowest, candidate) =>
    candidate.row.cny < lowest.row.cny ? candidate : lowest,
  );
  return {
    ...row,
    serviceLabel: tourPackage.label,
    selection: { packageId: tourPackage.id, travelers: 2 } satisfies PrivateTourInquirySelection,
  };
}
