/**
 * Single fail-closed guide index gate shared by the TypeScript runtime and
 * read-only inventory tooling. Directory presence and dates are never inputs.
 */
export function evaluateGuideIndexGate({
  isBaseline,
  candidate,
  metadata,
  frozenBaselinePublishedDate,
}) {
  if (isBaseline && !candidate) return true;
  const releaseDateField = candidate?.candidateAction === "update-existing"
    ? "dateModified"
    : "datePublished";
  const preservesBaselinePublicationDate =
    candidate?.candidateAction !== "update-existing" ||
    (
      typeof frozenBaselinePublishedDate === "string" &&
      typeof candidate.baselinePublishedDate === "string" &&
      candidate.baselinePublishedDate === frozenBaselinePublishedDate &&
      metadata?.datePublished === frozenBaselinePublishedDate
    );
  return Boolean(
    candidate &&
      candidate.centralDecision === "approved" &&
      metadata?.editorialStatus === "approved" &&
      metadata?.indexApproved === true &&
      preservesBaselinePublicationDate &&
      typeof candidate.approvedReleaseDate === "string" &&
      metadata?.[releaseDateField] === candidate.approvedReleaseDate,
  );
}
