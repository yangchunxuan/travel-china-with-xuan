import guideGovernanceData from "../content/guide-governance.json";
import { evaluateGuideIndexGate } from "./guideIndexGate.mjs";

export const guideEditorialStatuses = [
  "provisional",
  "approved",
  "retired",
] as const;
export type GuideEditorialStatus = (typeof guideEditorialStatuses)[number];

export const guideFreshnessClasses = [
  "low",
  "medium",
  "high",
  "critical",
] as const;
export type GuideFreshnessClass = (typeof guideFreshnessClasses)[number];

export const guideCentralDecisions = ["pending", "approved", "rejected"] as const;
export type GuideCentralDecision = (typeof guideCentralDecisions)[number];

const FROZEN_GUIDE_BASELINE_SOURCE_COMMIT =
  "c13d83e1abc8f5f25ee2250de11eed8c424a0196";
const FROZEN_BASELINE_PUBLISHED_DATES_BY_GUIDE_ID: Readonly<Record<string, string>> = {
  "china-hub-and-spoke-or-multi-base-route": "2026-08-12",
};

export interface ExplicitGuideGovernanceFields {
  readonly candidateId: string;
  readonly editorialStatus: GuideEditorialStatus;
  readonly primaryCollectionId: string;
  readonly primaryEntityId: string;
  readonly secondaryEntityIds: readonly string[];
  readonly freshnessClass: GuideFreshnessClass;
  readonly lastVerified: string;
  readonly indexApproved: boolean;
}

export type GuideGovernedRecord = {
  readonly id: string;
  readonly sourceReviewedDate?: string;
  readonly datePublished?: string;
  readonly dateModified?: string;
} & Partial<ExplicitGuideGovernanceFields>;

export interface EffectiveGuideGovernance {
  readonly source: "frozen-baseline" | "candidate";
  readonly candidateId: string | null;
  readonly centralDecision: GuideCentralDecision;
  readonly editorialStatus: GuideEditorialStatus;
  readonly primaryCollectionId: string | null;
  readonly primaryEntityId: string | null;
  readonly secondaryEntityIds: readonly string[];
  readonly freshnessClass: GuideFreshnessClass | null;
  readonly lastVerified: string | null;
  readonly baselinePublishedDate: string | null;
  readonly approvedReleaseDate: string | null;
  /** The only value consumers may use for public discovery or indexation. */
  readonly indexApproved: boolean;
}

const GOVERNANCE_FIELD_NAMES = [
  "candidateId",
  "editorialStatus",
  "primaryCollectionId",
  "primaryEntityId",
  "secondaryEntityIds",
  "freshnessClass",
  "lastVerified",
  "indexApproved",
] as const satisfies readonly (keyof ExplicitGuideGovernanceFields)[];

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

function isStrictCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function assertUniqueIds(values: readonly string[], label: string) {
  const seen = new Set<string>();
  for (const value of values) {
    if (!ID_PATTERN.test(value)) throw new Error(`${label} contains invalid id: ${value}.`);
    if (seen.has(value)) throw new Error(`${label} contains duplicate id: ${value}.`);
    seen.add(value);
  }
}

function assertGuideContentDates(guide: GuideGovernedRecord) {
  const today = new Date().toISOString().slice(0, 10);
  for (const field of ["datePublished", "dateModified"] as const) {
    const value = guide[field];
    if (value === undefined) continue;
    if (!isStrictCalendarDate(value)) {
      throw new Error(`Guide ${guide.id}.${field} must be a real YYYY-MM-DD date.`);
    }
    if (value > today) {
      throw new Error(`Guide ${guide.id}.${field} cannot be in the future.`);
    }
  }
  if (
    typeof guide.datePublished === "string" &&
    typeof guide.dateModified === "string" &&
    guide.dateModified < guide.datePublished
  ) {
    throw new Error(`Guide ${guide.id}.dateModified cannot be earlier than datePublished.`);
  }
}

const baselineIndependentIds = new Set(
  guideGovernanceData.baseline.independentGuideIds,
);
const baselineLegacyIds = new Set(guideGovernanceData.baseline.legacyGuideIds);
const candidateByGuideId = new Map(
  guideGovernanceData.candidates.map((candidate) => [candidate.guideId, candidate]),
);

function validateGovernanceRegistry() {
  if (guideGovernanceData.schemaVersion !== "1.0.0") {
    throw new Error("Guide governance must use schemaVersion 1.0.0.");
  }
  if (!/^[0-9a-f]{40}$/u.test(guideGovernanceData.baselineSourceCommit)) {
    throw new Error("Guide governance baselineSourceCommit must be a full commit SHA.");
  }
  if (guideGovernanceData.baselineSourceCommit !== FROZEN_GUIDE_BASELINE_SOURCE_COMMIT) {
    throw new Error(
      `Guide governance baselineSourceCommit must remain ${FROZEN_GUIDE_BASELINE_SOURCE_COMMIT}.`,
    );
  }
  if (
    guideGovernanceData.baseline.independentGuideIds.length !== 173 ||
    guideGovernanceData.baseline.legacyGuideIds.length !== 19
  ) {
    throw new Error("Guide governance baseline must remain frozen at 173 independent and 19 legacy guides.");
  }
  if (
    JSON.stringify(guideGovernanceData.baseline.publishedDatesByGuideId) !==
    JSON.stringify(FROZEN_BASELINE_PUBLISHED_DATES_BY_GUIDE_ID)
  ) {
    throw new Error("Guide governance baseline publication-date contract has drifted.");
  }
  if (
    JSON.stringify(guideGovernanceData.controlledValues.editorialStatuses) !==
      JSON.stringify(guideEditorialStatuses) ||
    JSON.stringify(guideGovernanceData.controlledValues.freshnessClasses) !==
      JSON.stringify(guideFreshnessClasses)
  ) {
    throw new Error("Guide governance controlled enums do not match the runtime contract.");
  }
  assertUniqueIds(
    guideGovernanceData.baseline.independentGuideIds,
    "Guide governance independent baseline",
  );
  assertUniqueIds(
    guideGovernanceData.baseline.legacyGuideIds,
    "Guide governance legacy baseline",
  );
  const overlap = guideGovernanceData.baseline.independentGuideIds.find((id) =>
    baselineLegacyIds.has(id),
  );
  if (overlap) throw new Error(`Guide governance baseline overlaps at ${overlap}.`);

  const candidateIds = guideGovernanceData.candidates.map((candidate) => candidate.candidateId);
  const candidateGuideIds = guideGovernanceData.candidates.map((candidate) => candidate.guideId);
  assertUniqueIds(candidateIds, "Guide governance candidate IDs");
  assertUniqueIds(candidateGuideIds, "Guide governance candidate guide IDs");
  for (const candidate of guideGovernanceData.candidates) {
    const targetsBaseline =
      baselineIndependentIds.has(candidate.guideId) || baselineLegacyIds.has(candidate.guideId);
    const candidateAction = "candidateAction" in candidate
      ? candidate.candidateAction
      : undefined;
    if (
      candidateAction !== undefined &&
      candidateAction !== "new" &&
      candidateAction !== "update-existing"
    ) {
      throw new Error(
        `Guide ${candidate.guideId} has invalid candidateAction ${JSON.stringify(candidateAction)}.`,
      );
    }
    const effectiveCandidateAction = candidateAction ?? "new";
    if (
      (targetsBaseline && effectiveCandidateAction !== "update-existing") ||
      (!targetsBaseline && effectiveCandidateAction !== "new")
    ) {
      throw new Error(
        `Guide ${candidate.guideId} candidateAction must be update-existing for a frozen baseline identity and new or omitted for a new identity.`,
      );
    }
    const hasBaselinePublishedDate = "baselinePublishedDate" in candidate;
    const baselinePublishedDate = hasBaselinePublishedDate
      ? candidate.baselinePublishedDate
      : undefined;
    if (effectiveCandidateAction === "update-existing") {
      const frozenBaselinePublishedDate =
        FROZEN_BASELINE_PUBLISHED_DATES_BY_GUIDE_ID[candidate.guideId];
      if (!frozenBaselinePublishedDate) {
        throw new Error(
          `Guide ${candidate.guideId} needs a frozen baseline publication date for update-existing.`,
        );
      }
      if (baselinePublishedDate !== frozenBaselinePublishedDate) {
        throw new Error(
          `Guide ${candidate.guideId}.baselinePublishedDate must remain ${frozenBaselinePublishedDate} for update-existing.`,
        );
      }
    } else if (hasBaselinePublishedDate) {
      throw new Error(
        `Guide ${candidate.guideId}.baselinePublishedDate is only valid for update-existing.`,
      );
    }
    if (!guideCentralDecisions.includes(candidate.centralDecision as GuideCentralDecision)) {
      throw new Error(`Guide ${candidate.guideId} has an invalid central decision.`);
    }
  }
}

validateGovernanceRegistry();

export const controlledGuideCollectionIds = new Set<string>(
  guideGovernanceData.controlledValues.collectionIds,
);

export function isFrozenBaselineGuideId(id: string) {
  return baselineIndependentIds.has(id) || baselineLegacyIds.has(id);
}

function assertExplicitFields(
  guide: GuideGovernedRecord,
): asserts guide is GuideGovernedRecord & ExplicitGuideGovernanceFields {
  const missing = GOVERNANCE_FIELD_NAMES.filter((field) => guide[field] === undefined);
  if (missing.length > 0) {
    throw new Error(
      `Candidate guide ${guide.id} is missing governance field(s): ${missing.join(", ")}.`,
    );
  }
  if (!guideEditorialStatuses.includes(guide.editorialStatus as GuideEditorialStatus)) {
    throw new Error(`Candidate guide ${guide.id} has invalid editorialStatus.`);
  }
  if (!controlledGuideCollectionIds.has(guide.primaryCollectionId as string)) {
    throw new Error(`Candidate guide ${guide.id} has unknown primaryCollectionId.`);
  }
  if (!ID_PATTERN.test(guide.primaryEntityId as string)) {
    throw new Error(`Candidate guide ${guide.id} has invalid primaryEntityId.`);
  }
  if (!Array.isArray(guide.secondaryEntityIds)) {
    throw new Error(`Candidate guide ${guide.id}.secondaryEntityIds must be an array.`);
  }
  assertUniqueIds(guide.secondaryEntityIds as readonly string[], `${guide.id}.secondaryEntityIds`);
  if ((guide.secondaryEntityIds as readonly string[]).includes(guide.primaryEntityId as string)) {
    throw new Error(`Candidate guide ${guide.id} repeats its primary entity as a secondary entity.`);
  }
  if (!guideFreshnessClasses.includes(guide.freshnessClass as GuideFreshnessClass)) {
    throw new Error(`Candidate guide ${guide.id} has invalid freshnessClass.`);
  }
  if (!isStrictCalendarDate(guide.lastVerified)) {
    throw new Error(`Candidate guide ${guide.id}.lastVerified must be a real YYYY-MM-DD date.`);
  }
  if (guide.lastVerified > new Date().toISOString().slice(0, 10)) {
    throw new Error(`Candidate guide ${guide.id}.lastVerified cannot be in the future.`);
  }
  if (
    typeof guide.sourceReviewedDate === "string" &&
    guide.lastVerified !== guide.sourceReviewedDate
  ) {
    throw new Error(
      `Candidate guide ${guide.id}.lastVerified must equal sourceReviewedDate.`,
    );
  }
  if (typeof guide.indexApproved !== "boolean") {
    throw new Error(`Candidate guide ${guide.id}.indexApproved must be boolean.`);
  }
  if (guide.editorialStatus !== "approved" && guide.indexApproved) {
    throw new Error(`Candidate guide ${guide.id} cannot be index-approved before editorial approval.`);
  }
}

export function getEffectiveGuideGovernance(
  guide: GuideGovernedRecord,
): EffectiveGuideGovernance {
  assertGuideContentDates(guide);
  const candidate = candidateByGuideId.get(guide.id);
  if (isFrozenBaselineGuideId(guide.id) && !candidate) {
    const supplied = GOVERNANCE_FIELD_NAMES.filter((field) => guide[field] !== undefined);
    if (supplied.length > 0) {
      throw new Error(
        `Frozen baseline guide ${guide.id} must not declare candidate governance fields: ${supplied.join(", ")}.`,
      );
    }
    return {
      source: "frozen-baseline",
      candidateId: null,
      centralDecision: "approved",
      editorialStatus: "approved",
      primaryCollectionId: null,
      primaryEntityId: null,
      secondaryEntityIds: [],
      freshnessClass: null,
      lastVerified: null,
      baselinePublishedDate: null,
      approvedReleaseDate: null,
      indexApproved: true,
    };
  }

  if (!candidate) {
    throw new Error(
      `Guide ${guide.id} is neither in the frozen baseline nor registered as a candidate.`,
    );
  }
  assertExplicitFields(guide);
  if (guide.candidateId !== candidate.candidateId) {
    throw new Error(
      `Guide ${guide.id}.candidateId must be ${candidate.candidateId}, not ${guide.candidateId}.`,
    );
  }
  const baselinePublishedDate =
    FROZEN_BASELINE_PUBLISHED_DATES_BY_GUIDE_ID[candidate.guideId] ?? null;
  if (
    "candidateAction" in candidate &&
    candidate.candidateAction === "update-existing" &&
    guide.datePublished !== baselinePublishedDate
  ) {
    throw new Error(
      `Candidate guide ${guide.id}.datePublished must remain ${baselinePublishedDate} for update-existing.`,
    );
  }

  const centralDecision = candidate.centralDecision as GuideCentralDecision;
  if (centralDecision !== "approved" && guide.indexApproved) {
    throw new Error(
      `Candidate guide ${guide.id} cannot set indexApproved while centralDecision is ${centralDecision}.`,
    );
  }
  const hasApprovedReleaseDate = "approvedReleaseDate" in candidate;
  const approvedReleaseDate =
    hasApprovedReleaseDate && typeof candidate.approvedReleaseDate === "string"
      ? candidate.approvedReleaseDate
      : null;
  if (!guide.indexApproved && hasApprovedReleaseDate) {
    throw new Error(
      `Candidate guide ${guide.id} must omit approvedReleaseDate while indexApproved is false.`,
    );
  }
  if (guide.indexApproved) {
    if (!isStrictCalendarDate(approvedReleaseDate)) {
      throw new Error(`Candidate guide ${guide.id} needs a real approvedReleaseDate.`);
    }
    if (approvedReleaseDate > new Date().toISOString().slice(0, 10)) {
      throw new Error(`Candidate guide ${guide.id}.approvedReleaseDate cannot be in the future.`);
    }
    const releaseDate =
      "candidateAction" in candidate && candidate.candidateAction === "update-existing"
        ? guide.dateModified
        : guide.datePublished;
    if (releaseDate !== approvedReleaseDate) {
      throw new Error(
        `Candidate guide ${guide.id} release metadata date must equal approvedReleaseDate.`,
      );
    }
  }
  return {
    source: "candidate",
    candidateId: guide.candidateId,
    centralDecision,
    editorialStatus: guide.editorialStatus,
    primaryCollectionId: guide.primaryCollectionId,
    primaryEntityId: guide.primaryEntityId,
    secondaryEntityIds: [...guide.secondaryEntityIds],
    freshnessClass: guide.freshnessClass,
    lastVerified: guide.lastVerified,
    baselinePublishedDate,
    approvedReleaseDate,
    indexApproved: evaluateGuideIndexGate({
      isBaseline: isFrozenBaselineGuideId(guide.id),
      candidate,
      metadata: guide,
      frozenBaselinePublishedDate: baselinePublishedDate ?? undefined,
    }),
  };
}

export function assertControlledGuideCollectionRegistry(
  collectionIds: readonly string[],
) {
  const runtime = [...new Set(collectionIds)].sort();
  const governed = [...controlledGuideCollectionIds].sort();
  if (JSON.stringify(runtime) !== JSON.stringify(governed)) {
    throw new Error(
      "Guide governance controlled collections must exactly match the runtime collection registry.",
    );
  }
}

export function isGuideIndexApproved(guide: GuideGovernedRecord) {
  return getEffectiveGuideGovernance(guide).indexApproved;
}

export function assertGuideGovernanceCoverage(
  guides: readonly GuideGovernedRecord[],
) {
  const registryIds = new Set(guides.map((guide) => guide.id));
  const governedIds = new Set([
    ...baselineIndependentIds,
    ...baselineLegacyIds,
    ...candidateByGuideId.keys(),
  ]);
  const missing = [...registryIds].filter((id) => !governedIds.has(id)).sort();
  const stale = [...governedIds].filter((id) => !registryIds.has(id)).sort();
  if (missing.length > 0 || stale.length > 0) {
    throw new Error(
      `Guide governance coverage mismatch; unregistered=${missing.join(",") || "none"}; stale=${stale.join(",") || "none"}.`,
    );
  }
  for (const guide of guides) getEffectiveGuideGovernance(guide);
}
