import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { historicalRouteServiceIds as routeServiceIds } from "../lib/routeServiceInterest.ts";
import { CONSULTATION_INTENTS } from "./internal/consultation-intake-contract.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = resolve(
  repoRoot,
  "docs/organic-growth/high-intent-cta-ownership-registry.json",
);
const guidesRoot = resolve(repoRoot, "content/guides");

const coverageKeys = [
  "stay",
  "high-intent-transport",
  "plan",
  "purchase-ticket",
];

const blockedIntentByOwnerClass = new Map([
  ["stay", "hotel_fit"],
  ["high-intent-transport", "route_shape"],
  ["purchase-ticket", "ticket_workflow"],
]);

const publicServiceByOwnerClass = new Map([
  ["stay", "full-trip-support"],
  ["high-intent-transport", "itinerary-review"],
]);

const publicCtaTargetAnchors = {
  "itinerary-review": "review-my-route",
  "full-trip-support": "full-trip-support",
};

const requiredPublicForbiddenClaimsByOwnerClass = {
  stay: [
    "hotel-real-time-availability",
    "hotel-guest-acceptance-guarantee",
    "hotel-price-room-guarantee",
    "sensitive-data-first-contact",
  ],
  "high-intent-transport": [
    "vehicle-driver-availability-guarantee",
    "fixed-transfer-price-or-pickup-guarantee",
    "transport-includes-entry-tickets",
    "sensitive-data-first-contact",
  ],
};

const reviewedPublicCtaCopySha256 =
  "03414a108cbd7ef5c5626968b4368d11fd3fffbb7e130298bd0ada6805d27935";

const publicCtaCopySafetyFragments = {
  en: {
    "full-trip-support": [
      "written scope and custom quote",
      "does not promise live rooms",
      "fixed hotel price",
      "guest acceptance",
    ],
    "itinerary-review": [
      "does not book transport",
      "supply a vehicle",
      "guarantee a pickup, ticket or timetable",
    ],
  },
  zh: {
    "full-trip-support": [
      "书面范围和定制报价",
      "不承诺实时房态",
      "固定酒店价格",
      "接待外宾",
    ],
    "itinerary-review": [
      "不代订交通",
      "不提供车辆",
      "不保证接送点、票务或时刻表",
    ],
  },
  ko: {
    "full-trip-support": [
      "서면 범위와 맞춤 견적",
      "실시간 객실 재고나 예약 가능 여부",
      "고정 객실 요금",
      "외국인 투숙 가능 여부를 보장하지 않습니다",
    ],
    "itinerary-review": [
      "교통편을 대신 예약하거나 차량을 제공하는 서비스가 아니며",
      "픽업 장소·시간, 교통편 티켓 또는 운행 시간표를 보장하지 않습니다",
    ],
  },
};

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function sorted(values) {
  return [...values].sort((left, right) => left.localeCompare(right));
}

export async function loadGuideMetadata(root = guidesRoot) {
  const directories = (await readdir(root, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  return Promise.all(
    directories.map(async (directory) => {
      const metadata = JSON.parse(
        await readFile(resolve(root, directory, "metadata.json"), "utf8"),
      );
      invariant(
        metadata.id === directory,
        `CONTENT_ID_DIRECTORY_MISMATCH: ${directory}`,
      );
      return metadata;
    }),
  );
}

export async function loadHighIntentCtaOwnershipRegistry(path = registryPath) {
  return JSON.parse(await readFile(path, "utf8"));
}

export function collectRequiredHighIntentOwners(guides) {
  const ownership = new Map();
  const counts = Object.fromEntries(coverageKeys.map((key) => [key, 0]));

  for (const guide of guides) {
    const ownerClasses = [];
    const section = guide.search?.section;
    const primaryIntent = guide.search?.primaryIntent;

    if (section === "stay") ownerClasses.push("stay");
    if (
      section === "transport"
      && ["plan", "compare", "execute"].includes(primaryIntent)
    ) {
      ownerClasses.push("high-intent-transport");
    }
    if (section === "plan") ownerClasses.push("plan");
    if (primaryIntent === "purchase") ownerClasses.push("purchase-ticket");

    invariant(
      ownerClasses.length <= 1,
      `AMBIGUOUS_HIGH_INTENT_CLASSIFICATION: ${guide.id} -> ${ownerClasses.join(",")}`,
    );

    if (ownerClasses.length === 1) {
      ownership.set(guide.id, ownerClasses[0]);
      counts[ownerClasses[0]] += 1;
    }
  }

  return { ownership, counts };
}

export function validateHighIntentCtaOwnershipRegistry(
  registry,
  guides,
  approvedServiceIds = routeServiceIds,
) {
  invariant(
    registry.status === "internal-only",
    "REGISTRY_MUST_REMAIN_INTERNAL_ONLY",
  );
  invariant(
    registry.publicCtaChangesAuthorized === true,
    "PUBLIC_CTA_CHANGES_MUST_BE_EXPLICITLY_AUTHORIZED",
  );
  invariant(
    registry.publicServiceLaunchAuthorized === false,
    "PUBLIC_SERVICE_LAUNCH_NOT_AUTHORIZED",
  );
  invariant(
    Array.isArray(registry.authorizedPublicCtaContentIds),
    "PUBLIC_CTA_ALLOWLIST_REQUIRED",
  );
  const publicCtaIds = new Set(registry.authorizedPublicCtaContentIds);
  invariant(
    publicCtaIds.size === registry.authorizedPublicCtaContentIds.length,
    "DUPLICATE_PUBLIC_CTA_OWNER",
  );
  invariant(
    registry.requiredPublicCtaCount === 10
      && publicCtaIds.size === registry.requiredPublicCtaCount,
    "PUBLIC_CTA_ALLOWLIST_DRIFT",
  );
  invariant(Array.isArray(registry.entries), "REGISTRY_ENTRIES_REQUIRED");
  invariant(
    JSON.stringify(registry.publicCtaTargetAnchors)
      === JSON.stringify(publicCtaTargetAnchors),
    "PUBLIC_CTA_TARGET_ANCHOR_DRIFT",
  );
  for (const [locale, serviceCopy] of Object.entries(
    publicCtaCopySafetyFragments,
  )) {
    for (const [serviceId, fragments] of Object.entries(serviceCopy)) {
      const copy = registry.publicCtaCopy?.[locale]?.[serviceId];
      invariant(
        copy && typeof copy === "object",
        `PUBLIC_CTA_COPY_REQUIRED: ${locale}/${serviceId}`,
      );
      for (const field of ["label", "title", "body", "button"]) {
        invariant(
          typeof copy[field] === "string" && copy[field].trim().length > 0,
          `PUBLIC_CTA_COPY_FIELD_REQUIRED: ${locale}/${serviceId}/${field}`,
        );
      }
      for (const fragment of fragments) {
        invariant(
          copy.body.includes(fragment),
          `PUBLIC_CTA_SAFETY_BOUNDARY_MISSING: ${locale}/${serviceId} -> ${fragment}`,
        );
      }
    }
  }
  invariant(
    createHash("sha256")
      .update(JSON.stringify(registry.publicCtaCopy))
      .digest("hex") === reviewedPublicCtaCopySha256,
    "PUBLIC_CTA_COPY_REVIEW_REQUIRED",
  );

  const approvedServiceSet = new Set(approvedServiceIds);
  const approvedIntentSet = new Set(CONSULTATION_INTENTS);
  invariant(
    JSON.stringify(sorted(registry.allowedServiceIds))
      === JSON.stringify(sorted(approvedServiceSet)),
    "SERVICE_ALLOWLIST_DRIFT",
  );
  invariant(
    JSON.stringify(sorted(registry.allowedIntentCodes))
      === JSON.stringify(sorted(approvedIntentSet)),
    "INTENT_ALLOWLIST_DRIFT",
  );

  const guideIds = new Set(guides.map((guide) => guide.id));
  const { ownership: requiredOwners, counts } =
    collectRequiredHighIntentOwners(guides);

  for (const key of coverageKeys) {
    invariant(
      registry.requiredCoverage?.[key] === counts[key],
      `COVERAGE_COUNT_DRIFT: ${key} expected ${counts[key]}`,
    );
  }
  invariant(
    registry.requiredCoverage?.uniqueContentIds === requiredOwners.size,
    `COVERAGE_COUNT_DRIFT: uniqueContentIds expected ${requiredOwners.size}`,
  );

  const seenContentIds = new Set();
  for (const entry of registry.entries) {
    invariant(
      typeof entry.contentId === "string" && entry.contentId.length > 0,
      "CONTENT_ID_REQUIRED",
    );
    invariant(
      !seenContentIds.has(entry.contentId),
      `DUPLICATE_CTA_OWNER: ${entry.contentId}`,
    );
    seenContentIds.add(entry.contentId);

    invariant(
      guideIds.has(entry.contentId),
      `UNKNOWN_CONTENT_ID: ${entry.contentId}`,
    );
    invariant(
      requiredOwners.has(entry.contentId),
      `CONTENT_NOT_IN_HIGH_INTENT_INVENTORY: ${entry.contentId}`,
    );
    invariant(
      entry.ownerClass === requiredOwners.get(entry.contentId),
      `OWNER_CLASS_MISMATCH: ${entry.contentId}`,
    );
    invariant(
      entry.originContentId === entry.contentId,
      `ORIGIN_CONTENT_ID_MISMATCH: ${entry.contentId}`,
    );
    invariant(
      Array.isArray(entry.forbiddenClaims) && entry.forbiddenClaims.length > 0,
      `FORBIDDEN_CLAIMS_REQUIRED: ${entry.contentId}`,
    );
    for (const claim of entry.forbiddenClaims) {
      invariant(
        Object.hasOwn(registry.forbiddenClaimDefinitions ?? {}, claim),
        `UNKNOWN_FORBIDDEN_CLAIM: ${entry.contentId} -> ${claim}`,
      );
    }
    invariant(
      approvedIntentSet.has(entry.intentCode),
      `UNKNOWN_INTENT_CODE: ${entry.contentId} -> ${entry.intentCode}`,
    );

    if (entry.targetServiceId !== null) {
      invariant(
        approvedServiceSet.has(entry.targetServiceId),
        `UNKNOWN_SERVICE_ID: ${entry.contentId} -> ${entry.targetServiceId}`,
      );
    }

    if (publicCtaIds.has(entry.contentId)) {
      invariant(
        publicServiceByOwnerClass.has(entry.ownerClass),
        `PUBLIC_CTA_OWNER_CLASS_NOT_ALLOWED: ${entry.contentId}`,
      );
    }

    if (entry.ownerClass === "plan") {
      invariant(
        entry.intentCode === "route_shape",
        `UNAUTHORIZED_PLAN_INTENT: ${entry.contentId} -> ${entry.intentCode}`,
      );
      const expectedStatus = entry.targetServiceId === null
        ? "authorized-generic-conversation"
        : "authorized-existing-service";
      invariant(
        entry.authorizationStatus === expectedStatus,
        `PLAN_AUTHORIZATION_MISMATCH: ${entry.contentId}`,
      );
      invariant(
        entry.ctaPlacement === "existing-guide-footer",
        `PLAN_CTA_PLACEMENT_MISMATCH: ${entry.contentId}`,
      );
      continue;
    }

    invariant(
      entry.intentCode === blockedIntentByOwnerClass.get(entry.ownerClass),
      `BLOCKED_INTENT_MISMATCH: ${entry.contentId}`,
    );
    const isPublicCta = publicCtaIds.has(entry.contentId);
    const explicitlyAuthorizedService = publicServiceByOwnerClass.get(
      entry.ownerClass,
    );
    if (isPublicCta) {
      invariant(
        explicitlyAuthorizedService,
        `PUBLIC_CTA_OWNER_CLASS_NOT_ALLOWED: ${entry.contentId}`,
      );
      invariant(
        entry.targetServiceId === explicitlyAuthorizedService,
        `AUTHORIZED_SERVICE_MAPPING_MISMATCH: ${entry.contentId}`,
      );
      invariant(
        entry.authorizationStatus === "authorized-existing-service",
        `AUTHORIZED_STATUS_MISMATCH: ${entry.contentId}`,
      );
      invariant(
        entry.ctaPlacement === "existing-guide-footer",
        `AUTHORIZED_CTA_PLACEMENT_MISMATCH: ${entry.contentId}`,
      );
      invariant(
        JSON.stringify(sorted(entry.forbiddenClaims))
          === JSON.stringify(
            sorted(requiredPublicForbiddenClaimsByOwnerClass[entry.ownerClass]),
          ),
        `PUBLIC_CTA_FORBIDDEN_CLAIMS_DRIFT: ${entry.contentId}`,
      );
    } else {
      invariant(
        entry.targetServiceId === null,
        `UNAUTHORIZED_SERVICE_MAPPING: ${entry.contentId}`,
      );
      invariant(
        entry.authorizationStatus === "blocked-pending-central-authorization",
        `BLOCKED_AUTHORIZATION_MISMATCH: ${entry.contentId}`,
      );
      invariant(
        entry.ctaPlacement === "specialized-cta-blocked-generic-footer-only",
        `BLOCKED_CTA_PLACEMENT_MISMATCH: ${entry.contentId}`,
      );
    }
  }

  for (const contentId of requiredOwners.keys()) {
    invariant(
      seenContentIds.has(contentId),
      `MISSING_HIGH_INTENT_OWNER: ${contentId}`,
    );
  }
  for (const contentId of publicCtaIds) {
    invariant(
      seenContentIds.has(contentId),
      `MISSING_EXPLICIT_PUBLIC_CTA_OWNER: ${contentId}`,
    );
  }

  invariant(
    seenContentIds.size === requiredOwners.size,
    `OWNER_COUNT_MISMATCH: expected ${requiredOwners.size}, observed ${seenContentIds.size}`,
  );

  return {
    counts,
    uniqueContentIds: seenContentIds.size,
    authorizedExistingService: registry.entries.filter(
      (entry) => entry.authorizationStatus === "authorized-existing-service",
    ).length,
    authorizedGenericConversation: registry.entries.filter(
      (entry) => entry.authorizationStatus === "authorized-generic-conversation",
    ).length,
    authorizedPublicCtas: publicCtaIds.size,
    blockedPendingAuthorization: registry.entries.filter(
      (entry) => entry.authorizationStatus === "blocked-pending-central-authorization",
    ).length,
  };
}

export async function checkHighIntentCtaOwnership() {
  const [registry, guides] = await Promise.all([
    loadHighIntentCtaOwnershipRegistry(),
    loadGuideMetadata(),
  ]);
  return validateHighIntentCtaOwnershipRegistry(registry, guides);
}

const isDirectRun = process.argv[1]
  && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isDirectRun) {
  const report = await checkHighIntentCtaOwnership();
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
