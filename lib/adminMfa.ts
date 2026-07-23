export interface AdminMfaFactorLike {
  id: string;
  factor_type: string;
  status: string;
}

/**
 * Enrollment may replace only stale, unfinished TOTP setup records.
 * Verified factors and every other factor type are deliberately excluded.
 */
export function selectUnverifiedTotpFactors<
  T extends AdminMfaFactorLike,
>(factors: readonly T[]): T[] {
  return factors.filter(
    (factor) =>
      factor.factor_type === "totp" && factor.status === "unverified",
  );
}
