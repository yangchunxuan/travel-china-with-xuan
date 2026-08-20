const DAY_MS = 86_400_000;

export const DEFAULT_SITE_ORIGIN = "https://homegroundchina.com";

export const COHORT_BUCKETS = Object.freeze([
  "age-0-13",
  "age-14-27",
  "age-28-29",
  "age-30-plus",
  "unknown-date",
]);

export const GSC_VERDICTS = new Set(["indexed", "not-indexed"]);

export const PUBLICATION_EVIDENCE = new Set([
  "verified-publication",
  "declared-metadata",
  "first-sitemap-seen",
  "unknown-legacy",
]);

const LOCALES = new Set(["en", "zh-Hans", "ko"]);

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseOrigin(origin) {
  const parsed = new URL(origin);
  if (parsed.protocol !== "https:" || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new TypeError(`INVALID_SITE_ORIGIN: ${origin}`);
  }
  return parsed;
}

function normalizedPathname(pathname) {
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

/**
 * Validate a canonical URL. This intentionally does not repair input: a URL
 * submitted with a query, fragment, wrong host, HTTP, or missing trailing slash
 * is evidence of a bad source and must fail at the boundary.
 */
export function canonicalizeUrl(value, {
  expectedOrigin = DEFAULT_SITE_ORIGIN,
  errorPrefix = "CANONICAL_URL",
} = {}) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new TypeError(`${errorPrefix}_INVALID: ${value}`);
  }
  const expected = parseOrigin(expectedOrigin);
  if (parsed.protocol !== "https:") {
    throw new TypeError(`${errorPrefix}_NOT_HTTPS: ${value}`);
  }
  if (parsed.origin !== expected.origin) {
    throw new TypeError(`${errorPrefix}_OUTSIDE_PROPERTY: ${value}`);
  }
  if (parsed.username || parsed.password) {
    throw new TypeError(`${errorPrefix}_HAS_CREDENTIALS: ${value}`);
  }
  if (parsed.search || parsed.hash) {
    throw new TypeError(`${errorPrefix}_PARAMETER_URL: ${value}`);
  }
  if (!parsed.pathname.endsWith("/")) {
    throw new TypeError(`${errorPrefix}_NON_CANONICAL_PATH: ${value}`);
  }
  return parsed.toString();
}

export function strictDate(value, fieldName = "date") {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) {
    throw new TypeError(`INVALID_OR_FUTURE_DATE: ${fieldName} must be YYYY-MM-DD`);
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new TypeError(`INVALID_OR_FUTURE_DATE: ${fieldName} is not a valid calendar date`);
  }
  return parsed;
}

function daysBetween(earlier, later) {
  return Math.floor((later.valueOf() - earlier.valueOf()) / DAY_MS);
}

export function ageInDays(publishedAt, asOf) {
  const published = strictDate(publishedAt, "publishedAt");
  const observed = strictDate(asOf, "asOf");
  const age = daysBetween(published, observed);
  if (age < 0) {
    throw new RangeError("INVALID_OR_FUTURE_DATE: publishedAt cannot be after asOf");
  }
  return age;
}

export function publicationCohort(publishedAt, asOf) {
  if (publishedAt === null || publishedAt === undefined) return "unknown-date";
  const age = ageInDays(publishedAt, asOf);
  if (age < 14) return "age-0-13";
  if (age < 28) return "age-14-27";
  if (age < 30) return "age-28-29";
  return "age-30-plus";
}

function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) throw new Error(`${label}: ${value}`);
    seen.add(value);
  }
}

function propertyMatches(property, expectedOrigin) {
  if (typeof property !== "string" || property.length === 0) return false;
  const expected = parseOrigin(expectedOrigin);
  if (property.startsWith("sc-domain:")) {
    const host = property.slice("sc-domain:".length).trim().toLowerCase();
    return Boolean(host)
      && !/[/:]/u.test(host)
      && host === expected.hostname.toLowerCase();
  }
  try {
    const parsed = new URL(property);
    return parsed.protocol === "https:"
      && parsed.origin === expected.origin
      && parsed.pathname === "/"
      && !parsed.search
      && !parsed.hash
      && !parsed.username
      && !parsed.password;
  } catch {
    return false;
  }
}

function parseGscRowUrl(value, expectedOrigin) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new TypeError(`GSC_ROW_INVALID_URL: ${value}`);
  }
  if (!new Set(["http:", "https:"]).has(parsed.protocol)) {
    throw new TypeError(`GSC_ROW_INVALID_URL: ${value}`);
  }
  if (parsed.username || parsed.password) {
    throw new TypeError(`GSC_ROW_INVALID_URL: ${value}`);
  }
  const expected = parseOrigin(expectedOrigin);
  const rowHost = parsed.hostname.toLowerCase().replace(/^www\./u, "");
  const expectedHost = expected.hostname.toLowerCase().replace(/^www\./u, "");
  if (rowHost !== expectedHost) {
    throw new TypeError(`GSC_ROW_OUTSIDE_PROPERTY: ${value}`);
  }
  return parsed;
}

function canonicalCandidateForGscRow(parsed, expectedOrigin) {
  const expected = parseOrigin(expectedOrigin);
  if (
    parsed.protocol !== "https:"
    || parsed.origin !== expected.origin
    || parsed.search
    || parsed.hash
  ) return null;
  parsed = new URL(parsed);
  parsed.pathname = normalizedPathname(parsed.pathname);
  return parsed.toString();
}

function canonicalOwnerForVariant(parsed, expectedOrigin) {
  const expected = parseOrigin(expectedOrigin);
  const owner = new URL(expected.origin);
  owner.pathname = normalizedPathname(parsed.pathname);
  return owner.toString();
}

export function validateGscSnapshot(snapshot, {
  expectedOrigin = DEFAULT_SITE_ORIGIN,
  asOf,
  maxSnapshotAgeDays = 7,
} = {}) {
  if (!isPlainObject(snapshot) || snapshot.reportType !== "page-indexing") {
    throw new TypeError("GSC_SOURCE_WRONG_REPORT_TYPE");
  }
  if (!Number.isInteger(maxSnapshotAgeDays) || maxSnapshotAgeDays < 0) {
    throw new TypeError("INVALID_MAX_GSC_AGE_DAYS");
  }
  const expectedHost = parseOrigin(expectedOrigin).hostname.toLowerCase();
  if (!propertyMatches(snapshot.property, expectedOrigin)) {
    throw new TypeError(`GSC_PROPERTY_MISMATCH: expected ${expectedHost}`);
  }

  const reportUpdatedAt = strictDate(snapshot.reportUpdatedAt, "reportUpdatedAt");
  const observedAt = strictDate(snapshot.observedAt, "observedAt");
  const effectiveAsOf = strictDate(asOf ?? snapshot.observedAt, "asOf");
  if (reportUpdatedAt > observedAt || observedAt > effectiveAsOf) {
    throw new RangeError(
      "GSC_TIME_ORDER_INVALID: reportUpdatedAt <= observedAt <= asOf is required",
    );
  }
  if (daysBetween(reportUpdatedAt, effectiveAsOf) > maxSnapshotAgeDays) {
    throw new RangeError(
      `STALE_GSC_SNAPSHOT: report is older than ${maxSnapshotAgeDays} days at asOf`,
    );
  }
  if (!Array.isArray(snapshot.rows)) throw new TypeError("GSC_ROWS_INVALID");

  const rawUrls = [];
  const canonicalCandidates = [];
  for (const row of snapshot.rows) {
    if (!isPlainObject(row) || !GSC_VERDICTS.has(row.verdict)) {
      throw new TypeError("UNKNOWN_GSC_STATUS");
    }
    const parsed = parseGscRowUrl(row.url, expectedOrigin);
    rawUrls.push(parsed.toString());
    const candidate = canonicalCandidateForGscRow(parsed, expectedOrigin);
    if (candidate) canonicalCandidates.push(candidate);

    if (row.lastCrawlDate !== null && row.lastCrawlDate !== undefined) {
      const lastCrawlDate = strictDate(row.lastCrawlDate, "lastCrawlDate");
      if (lastCrawlDate > observedAt) {
        throw new RangeError("GSC_TIME_ORDER_INVALID: lastCrawlDate cannot be after observedAt");
      }
    }
    if (row.verdict === "not-indexed" && (
      typeof row.reason !== "string" || row.reason.length === 0
    )) {
      throw new TypeError("GSC_NOT_INDEXED_REASON_REQUIRED");
    }
  }
  assertUnique(rawUrls, "GSC_ROW_DUPLICATE");
  assertUnique(canonicalCandidates, "GSC_CANONICAL_COLLISION");
  return snapshot;
}

function publicationState(row, asOf) {
  const evidence = row.publicationDateEvidence;
  if (!PUBLICATION_EVIDENCE.has(evidence)) {
    throw new TypeError(`UNKNOWN_PUBLICATION_EVIDENCE: ${evidence}`);
  }

  const fields = {
    firstPublishedAt: row.firstPublishedAt ?? null,
    declaredDatePublished: row.declaredDatePublished ?? null,
    firstSitemapSeenAt: row.firstSitemapSeenAt ?? null,
  };
  for (const [name, value] of Object.entries(fields)) {
    if (value !== null) ageInDays(value, asOf);
  }

  let field;
  if (evidence === "verified-publication") field = "firstPublishedAt";
  else if (evidence === "declared-metadata") field = "declaredDatePublished";
  else if (evidence === "first-sitemap-seen") field = "firstSitemapSeenAt";
  else field = null;

  if (field && fields[field] === null) {
    throw new TypeError(`PUBLICATION_EVIDENCE_DATE_REQUIRED: ${evidence} requires ${field}`);
  }
  const publicationEvidenceRef = row.publicationEvidenceRef ?? null;
  if (evidence === "verified-publication") {
    if (typeof publicationEvidenceRef !== "string") {
      throw new TypeError(
        "PUBLICATION_EVIDENCE_REF_REQUIRED: verified-publication requires publicationEvidenceRef",
      );
    }
    const gitReference = /^git:[0-9a-f]{40}$/u.test(publicationEvidenceRef);
    const sitemapReference = publicationEvidenceRef
      .match(/^sitemap-snapshot:(\d{4}-\d{2}-\d{2})$/u);
    if (!gitReference && !sitemapReference) {
      throw new TypeError(
        "PUBLICATION_EVIDENCE_REF_INVALID: expected git:<40-hex> or sitemap-snapshot:YYYY-MM-DD",
      );
    }
    if (sitemapReference) {
      strictDate(sitemapReference[1], "publicationEvidenceRef");
      if (sitemapReference[1] !== fields.firstPublishedAt) {
        throw new TypeError(
          "PUBLICATION_EVIDENCE_REF_CONFLICT: sitemap snapshot date must equal firstPublishedAt",
        );
      }
    }
  } else if (publicationEvidenceRef !== null) {
    throw new TypeError(
      `PUBLICATION_EVIDENCE_REF_CONFLICT: ${evidence} must not carry publicationEvidenceRef`,
    );
  }
  if (evidence === "unknown-legacy" && Object.values(fields).some(Boolean)) {
    throw new TypeError("PUBLICATION_EVIDENCE_CONFLICT: unknown-legacy cannot carry a date");
  }
  if (evidence === "declared-metadata" && fields.firstPublishedAt !== null) {
    throw new TypeError(
      "PUBLICATION_EVIDENCE_CONFLICT: firstPublishedAt requires verified-publication evidence",
    );
  }
  if (evidence === "first-sitemap-seen" && (
    fields.firstPublishedAt !== null || fields.declaredDatePublished !== null
  )) {
    throw new TypeError(
      "PUBLICATION_EVIDENCE_CONFLICT: first-sitemap-seen is only valid when stronger dates are absent",
    );
  }

  const publishedAt = field ? fields[field] : null;
  return {
    publicationEvidence: evidence,
    publicationEvidenceRef,
    publishedAt,
    ageDays: publishedAt ? ageInDays(publishedAt, asOf) : null,
    cohort: publicationCohort(publishedAt, asOf),
  };
}

export function validateInventory(inventory, asOf, {
  expectedOrigin = DEFAULT_SITE_ORIGIN,
} = {}) {
  if (!Array.isArray(inventory)) throw new TypeError("INVENTORY_INVALID");
  strictDate(asOf, "asOf");
  const canonicalOwners = [];
  const contentLocaleKeys = [];
  const publicationByContent = new Map();
  for (const row of inventory) {
    if (!isPlainObject(row)) throw new TypeError("INVENTORY_ROW_INVALID");
    if (typeof row.contentId !== "string" || row.contentId.length === 0) {
      throw new TypeError("MISSING_CONTENT_ID");
    }
    if (!LOCALES.has(row.locale)) throw new TypeError("MISSING_LOCALE");
    const canonicalUrl = canonicalizeUrl(row.canonicalUrl, {
      expectedOrigin,
      errorPrefix: "INVENTORY_URL",
    });
    canonicalOwners.push(canonicalUrl);
    contentLocaleKeys.push(`${row.contentId}\u0000${row.locale}`);
    const publication = publicationState(row, asOf);
    const publicationKey = [
      publication.publicationEvidence,
      publication.publicationEvidenceRef ?? "",
      publication.publishedAt ?? "",
      publication.cohort,
    ].join("\u0000");
    const priorPublicationKey = publicationByContent.get(row.contentId);
    if (priorPublicationKey && priorPublicationKey !== publicationKey) {
      throw new Error(`CONTENT_PUBLICATION_CONFLICT: ${row.contentId}`);
    }
    publicationByContent.set(row.contentId, publicationKey);
  }
  assertUnique(canonicalOwners, "DUPLICATE_CANONICAL_OWNER");
  assertUnique(contentLocaleKeys, "DUPLICATE_CONTENT_LOCALE");
  return inventory;
}

function emptyCohorts() {
  return Object.fromEntries(COHORT_BUCKETS.map((bucket) => [bucket, {
    submitted: 0,
    indexedObserved: 0,
    knownNotIndexed: 0,
    notObserved: 0,
  }]));
}

function updateCohort(bucket, verdict) {
  bucket.submitted += 1;
  if (verdict === "indexed") bucket.indexedObserved += 1;
  else if (verdict === "not-indexed") bucket.knownNotIndexed += 1;
  else bucket.notObserved += 1;
}

function emptyContentCohorts() {
  return Object.fromEntries(COHORT_BUCKETS.map((bucket) => [bucket, {
    submitted: 0,
    allLocalesIndexed: 0,
    partiallyIndexed: 0,
    knownNotIndexed: 0,
    notObserved: 0,
  }]));
}

function buildContentRollup(rows) {
  const groups = new Map();
  for (const row of rows) {
    if (!row.contentId) continue;
    if (!groups.has(row.contentId)) groups.set(row.contentId, []);
    groups.get(row.contentId).push(row);
  }

  const contentRows = [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "en"))
    .map(([contentId, localeRows]) => {
      localeRows.sort((left, right) => left.locale.localeCompare(right.locale, "en"));
      const publicationKeys = new Set(localeRows.map((row) => [
        row.publicationEvidence,
        row.publicationEvidenceRef ?? "",
        row.publishedAt ?? "",
        row.cohort,
      ].join("\u0000")));
      if (publicationKeys.size !== 1) {
        throw new Error(`CONTENT_PUBLICATION_CONFLICT: ${contentId}`);
      }
      const indexedLocaleCount = localeRows.filter((row) => row.gscVerdict === "indexed").length;
      const knownNotIndexedLocaleCount = localeRows
        .filter((row) => row.gscVerdict === "not-indexed").length;
      const notObservedLocaleCount = localeRows
        .filter((row) => row.gscVerdict === "not-observed").length;
      let indexObservation = "not-observed";
      if (indexedLocaleCount === localeRows.length) indexObservation = "all-locales-indexed";
      else if (indexedLocaleCount > 0) indexObservation = "partially-indexed";
      else if (knownNotIndexedLocaleCount > 0) indexObservation = "known-not-indexed";
      return {
        contentId,
        locales: localeRows.map((row) => row.locale),
        canonicalUrls: localeRows.map((row) => row.canonicalUrl),
        submittedLocaleCount: localeRows.length,
        indexedLocaleCount,
        knownNotIndexedLocaleCount,
        notObservedLocaleCount,
        indexObservation,
        publicationEvidence: localeRows[0].publicationEvidence,
        publicationEvidenceRef: localeRows[0].publicationEvidenceRef,
        publishedAt: localeRows[0].publishedAt,
        ageDays: localeRows[0].ageDays,
        cohort: localeRows[0].cohort,
      };
    });

  const contentCohorts = emptyContentCohorts();
  for (const row of contentRows) {
    const bucket = contentCohorts[row.cohort];
    bucket.submitted += 1;
    if (row.indexObservation === "all-locales-indexed") bucket.allLocalesIndexed += 1;
    else if (row.indexObservation === "partially-indexed") bucket.partiallyIndexed += 1;
    else if (row.indexObservation === "known-not-indexed") bucket.knownNotIndexed += 1;
    else bucket.notObserved += 1;
  }
  return { contentRows, contentCohorts };
}

function sortByUrl(rows) {
  return rows.sort((left, right) => left.url.localeCompare(right.url, "en"));
}

export function reconcileIndexCohorts({
  sitemapUrls,
  inventory,
  gscSnapshot,
  asOf,
  expectedOrigin = DEFAULT_SITE_ORIGIN,
  maxGscAgeDays = 7,
}) {
  strictDate(asOf, "asOf");
  if (!Array.isArray(sitemapUrls)) throw new TypeError("SITEMAP_URLS_INVALID");
  validateInventory(inventory, asOf, { expectedOrigin });
  validateGscSnapshot(gscSnapshot, {
    expectedOrigin,
    asOf,
    maxSnapshotAgeDays: maxGscAgeDays,
  });

  const normalizedSitemapUrls = sitemapUrls
    .map((url) => canonicalizeUrl(url, {
      expectedOrigin,
      errorPrefix: "SITEMAP_URL",
    }))
    .sort((left, right) => left.localeCompare(right, "en"));
  assertUnique(normalizedSitemapUrls, "DUPLICATE_SITEMAP_URL");
  const sitemapSet = new Set(normalizedSitemapUrls);
  const inventoryByCanonical = new Map(inventory.map((row) => [
    canonicalizeUrl(row.canonicalUrl, { expectedOrigin, errorPrefix: "INVENTORY_URL" }),
    row,
  ]));
  const exactGscByCanonical = new Map();
  const parameterAliases = [];
  const nonCanonicalVariants = [];
  const exactGscOutsideSitemap = [];

  for (const row of gscSnapshot.rows) {
    const parsed = parseGscRowUrl(row.url, expectedOrigin);
    const canonicalOwner = canonicalOwnerForVariant(parsed, expectedOrigin);
    if (parsed.search || parsed.hash) {
      parameterAliases.push({ ...row, canonicalOwner });
      continue;
    }
    const expected = parseOrigin(expectedOrigin);
    if (
      parsed.protocol !== "https:"
      || parsed.origin !== expected.origin
      || !parsed.pathname.endsWith("/")
    ) {
      nonCanonicalVariants.push({ ...row, canonicalOwner });
      continue;
    }
    const canonical = parsed.toString();
    exactGscByCanonical.set(canonical, row);
    if (!sitemapSet.has(canonical)) exactGscOutsideSitemap.push(row);
  }

  sortByUrl(parameterAliases);
  sortByUrl(nonCanonicalVariants);
  sortByUrl(exactGscOutsideSitemap);

  const rows = normalizedSitemapUrls.map((canonicalUrl) => {
    const inventoryRow = inventoryByCanonical.get(canonicalUrl) ?? null;
    const gscRow = exactGscByCanonical.get(canonicalUrl) ?? null;
    const publication = inventoryRow
      ? publicationState(inventoryRow, asOf)
      : {
          publicationEvidence: "unknown-legacy",
          publicationEvidenceRef: null,
          publishedAt: null,
          ageDays: null,
          cohort: "unknown-date",
        };
    const gscVerdict = gscRow?.verdict ?? "not-observed";
    return {
      canonicalUrl,
      contentId: inventoryRow?.contentId ?? null,
      locale: inventoryRow?.locale ?? null,
      ...publication,
      due14DayReview: publication.ageDays === null
        ? null
        : publication.ageDays >= 14 && gscVerdict !== "indexed",
      due28DayReview: publication.ageDays === null
        ? null
        : publication.ageDays >= 28 && gscVerdict !== "indexed",
      due30DayEscalation: publication.ageDays === null
        ? null
        : publication.ageDays >= 30 && gscVerdict === "not-indexed",
      gscVerdict,
      gscReason: gscRow?.reason ?? null,
      gscLastCrawlDate: gscRow?.lastCrawlDate ?? null,
    };
  });

  const inventoryOutsideSitemap = [...inventoryByCanonical.keys()]
    .filter((url) => !sitemapSet.has(url))
    .sort((left, right) => left.localeCompare(right, "en"));
  const counts = {
    submittedCanonicalCount: rows.length,
    inventoryMatchedCount: rows.filter((row) => row.contentId).length,
    confirmedIndexedIntersection: rows.filter((row) => row.gscVerdict === "indexed").length,
    knownNotIndexedIntersection: rows.filter((row) => row.gscVerdict === "not-indexed").length,
    submittedWithoutIndexObservation: rows
      .filter((row) => row.gscVerdict === "not-observed").length,
    gscKnownOutsideSitemap: exactGscOutsideSitemap.length
      + parameterAliases.length
      + nonCanonicalVariants.length,
    exactGscOutsideSitemapCount: exactGscOutsideSitemap.length,
    parameterAliasCount: parameterAliases.length,
    nonCanonicalVariantCount: nonCanonicalVariants.length,
    inventoryOutsideSitemapCount: inventoryOutsideSitemap.length,
  };
  const cohorts = emptyCohorts();
  for (const row of rows) updateCohort(cohorts[row.cohort], row.gscVerdict);

  const { contentRows, contentCohorts } = buildContentRollup(rows);
  const contentCounts = {
    submittedContentIdentityCount: contentRows.length,
    allLocalesIndexedIdentityCount: contentRows
      .filter((row) => row.indexObservation === "all-locales-indexed").length,
    partiallyIndexedIdentityCount: contentRows
      .filter((row) => row.indexObservation === "partially-indexed").length,
    knownNotIndexedIdentityCount: contentRows
      .filter((row) => row.indexObservation === "known-not-indexed").length,
    notObservedIdentityCount: contentRows
      .filter((row) => row.indexObservation === "not-observed").length,
  };

  const dataGaps = {
    sitemapUrlsWithoutInventory: rows
      .filter((row) => !row.contentId)
      .map((row) => row.canonicalUrl),
    inventoryUrlsOutsideSitemap: inventoryOutsideSitemap,
    sitemapUrlsWithoutGscObservation: rows
      .filter((row) => row.gscVerdict === "not-observed")
      .map((row) => row.canonicalUrl),
    urlsWithoutPublicationEvidence: rows
      .filter((row) => row.publicationEvidence === "unknown-legacy")
      .map((row) => row.canonicalUrl),
  };
  const hasDataGaps = Object.values(dataGaps).some((values) => values.length > 0);

  return {
    schemaVersion: 2,
    runStatus: hasDataGaps ? "complete-with-data-gaps" : "complete",
    asOf,
    evidence: {
      gscProperty: gscSnapshot.property,
      gscReportUpdatedAt: gscSnapshot.reportUpdatedAt,
      gscObservedAt: gscSnapshot.observedAt,
      gscReportAgeDays: ageInDays(gscSnapshot.reportUpdatedAt, asOf),
      maxGscAgeDays,
      warning: "Intersection counts are not a Google indexation rate; report populations differ and must not be divided",
    },
    counts,
    cohorts,
    contentCounts,
    contentCohorts,
    rows,
    contentRows,
    parameterAliases,
    nonCanonicalVariants,
    gscOutsideSitemap: exactGscOutsideSitemap,
    inventoryOutsideSitemap,
    dataGaps,
  };
}

export function stableStringify(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}
