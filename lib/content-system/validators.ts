// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import {
  CONTENT_DATE_PATTERN,
  CONTENT_DATE_TIME_PATTERN,
  CONTENT_ID_PATTERN,
  CONTENT_SYSTEM_SCHEMA_VERSION,
  contentFamilies,
  contentIntents,
  contentSections,
  contentStatuses,
  localizationStatuses,
  refreshCadences,
  repositoryRecordTypes,
  schemaLocales,
  volatilities,
// @ts-ignore TS5097: the error is reported on this closing import line.
} from "./constants.ts";
// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import {
  isCanonicalLocalePath,
  isSafeContentPath,
  siteLocaleForContentPath,
  toSchemaLocale,
// @ts-ignore TS5097: the error is reported on this closing import line.
} from "./path.ts";
// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import type {
  ContentNode,
  ContentRecordEnvelope,
  ContentStatus,
  Entity,
  Fact,
  JsonValue,
  LocaleVersion,
  MediaAsset,
  Relation,
  RepositoryRecordMap,
  RepositoryRecordType,
  SchemaLocale,
  SourceSnapshot,
  ValidationIssue,
  ValidationResult,
} from "./types.ts";

type UnknownRecord = Record<string, unknown>;

const entityTypes = [
  "country",
  "travel-region",
  "province",
  "prefecture",
  "city",
  "district",
  "county",
  "town",
  "village",
  "neighborhood",
  "natural-feature",
  "attraction",
  "heritage-site",
  "experience",
  "transport-node",
  "route",
  "month-season",
  "event",
  "historical-period",
  "person",
  "food-cuisine",
  "dish",
  "culture-topic",
  "practical-topic",
  "traveler-type",
  "itinerary",
  "service",
  "organization",
  "tool",
] as const;

const factStatuses = ["current", "superseded", "disputed", "withdrawn"] as const;
const sourceKinds = [
  "government",
  "official-operator",
  "first-party",
  "academic",
  "news",
  "commercial",
  "community",
  "archive",
] as const;
const mediaKinds = ["image", "video", "audio", "document", "map", "diagram"] as const;
const mediaRights = ["owned", "licensed", "public-domain", "permission", "unknown"] as const;
const mediaStatuses = ["available", "restricted", "retired"] as const;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function issue(
  issues: ValidationIssue[],
  path: string,
  code: string,
  message: string,
) {
  issues.push({ path, code, message });
}

function assertRecord(value: unknown, path: string, issues: ValidationIssue[]): UnknownRecord | null {
  if (!isRecord(value)) {
    issue(issues, path, "invalid_type", "Expected an object.");
    return null;
  }
  return value;
}

function checkKeys(
  value: UnknownRecord,
  allowed: readonly string[],
  required: readonly string[],
  path: string,
  issues: ValidationIssue[],
) {
  const allowedSet = new Set(allowed);
  for (const key of Object.keys(value)) {
    if (!allowedSet.has(key)) {
      issue(issues, `${path}.${key}`, "unknown_property", `Unknown property: ${key}.`);
    }
  }
  for (const key of required) {
    if (!(key in value)) {
      issue(issues, `${path}.${key}`, "required", `Missing required property: ${key}.`);
    }
  }
}

function checkString(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  options: { nullable?: boolean; allowEmpty?: boolean } = {},
): value is string | null {
  if (options.nullable && value === null) return true;
  if (typeof value !== "string") {
    issue(issues, path, "invalid_type", "Expected a string.");
    return false;
  }
  if (!options.allowEmpty && value.trim().length === 0) {
    issue(issues, path, "empty_string", "Expected a non-empty string.");
    return false;
  }
  return true;
}

function checkBoolean(value: unknown, path: string, issues: ValidationIssue[]): value is boolean {
  if (typeof value !== "boolean") {
    issue(issues, path, "invalid_type", "Expected a boolean.");
    return false;
  }
  return true;
}

function checkNumber(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  options: { min?: number; max?: number; integer?: boolean } = {},
): value is number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    issue(issues, path, "invalid_type", "Expected a finite number.");
    return false;
  }
  if (options.integer && !Number.isInteger(value)) {
    issue(issues, path, "invalid_number", "Expected an integer.");
  }
  if (options.min !== undefined && value < options.min) {
    issue(issues, path, "out_of_range", `Expected a value greater than or equal to ${options.min}.`);
  }
  if (options.max !== undefined && value > options.max) {
    issue(issues, path, "out_of_range", `Expected a value less than or equal to ${options.max}.`);
  }
  return true;
}

function checkEnum<T extends string>(
  value: unknown,
  values: readonly T[],
  path: string,
  issues: ValidationIssue[],
): value is T {
  if (typeof value !== "string" || !values.includes(value as T)) {
    issue(issues, path, "invalid_enum", `Expected one of: ${values.join(", ")}.`);
    return false;
  }
  return true;
}

function checkId(value: unknown, path: string, issues: ValidationIssue[]): value is string {
  if (!checkString(value, path, issues)) return false;
  if (!CONTENT_ID_PATTERN.test(value)) {
    issue(issues, path, "invalid_id", "Expected a lowercase kebab-case identifier.");
    return false;
  }
  return true;
}

function checkDate(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  nullable = false,
) {
  if (nullable && value === null) return;
  if (!checkString(value, path, issues)) return;
  if (!isStrictCalendarDate(value)) {
    issue(issues, path, "invalid_date", "Expected a real date in YYYY-MM-DD format.");
  }
}

function isStrictCalendarDate(value: string): boolean {
  if (!CONTENT_DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function isStrictDateTime(value: string): boolean {
  if (!CONTENT_DATE_TIME_PATTERN.test(value) || !isStrictCalendarDate(value.slice(0, 10))) {
    return false;
  }
  const match = value.match(
    /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(?:\.(\d{1,3}))?Z$/u,
  );
  if (!match) return false;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) return false;
  const normalized = `${match[1]}T${match[2]}.${(match[3] ?? "").padEnd(3, "0")}Z`;
  return parsed.toISOString() === normalized;
}

function checkDateTime(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  nullable = false,
) {
  if (nullable && value === null) return;
  if (!checkString(value, path, issues)) return;
  if (!isStrictDateTime(value)) {
    issue(issues, path, "invalid_datetime", "Expected a UTC ISO-8601 timestamp.");
  }
}

function checkDateOrDateTime(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  nullable = false,
) {
  if (nullable && value === null) return;
  if (!checkString(value, path, issues)) return;
  const validDate = isStrictCalendarDate(value);
  const validDateTime = isStrictDateTime(value);
  if (!validDate && !validDateTime) {
    issue(
      issues,
      path,
      "invalid_date_or_datetime",
      "Expected YYYY-MM-DD or a UTC ISO-8601 timestamp.",
    );
  }
}

function checkStringArray(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  options: { minItems?: number; ids?: boolean; allowEmptyStrings?: boolean } = {},
): value is string[] {
  if (!Array.isArray(value)) {
    issue(issues, path, "invalid_type", "Expected an array.");
    return false;
  }
  if (options.minItems !== undefined && value.length < options.minItems) {
    issue(issues, path, "too_few_items", `Expected at least ${options.minItems} item(s).`);
  }
  const seen = new Set<string>();
  value.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    const valid = options.ids
      ? checkId(item, itemPath, issues)
      : checkString(item, itemPath, issues, { allowEmpty: options.allowEmptyStrings });
    if (valid && typeof item === "string") {
      if (seen.has(item)) issue(issues, itemPath, "duplicate_item", `Duplicate item: ${item}.`);
      seen.add(item);
    }
  });
  return true;
}

function checkJsonValue(value: unknown, path: string, issues: ValidationIssue[]): value is JsonValue {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) issue(issues, path, "invalid_json", "JSON numbers must be finite.");
    return Number.isFinite(value);
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => checkJsonValue(item, `${path}[${index}]`, issues));
    return true;
  }
  if (isRecord(value)) {
    for (const [key, item] of Object.entries(value)) {
      checkJsonValue(item, `${path}.${key}`, issues);
    }
    return true;
  }
  issue(issues, path, "invalid_json", "Expected a JSON-serializable value.");
  return false;
}

function checkOptionalStringArray(
  record: UnknownRecord,
  key: string,
  path: string,
  issues: ValidationIssue[],
  ids = false,
) {
  if (key in record) checkStringArray(record[key], `${path}.${key}`, issues, { ids });
}

function checkLocalizedStrings(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  allowEmpty: boolean,
) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  if (Object.keys(record).length === 0) {
    issue(issues, path, "too_few_properties", "Expected at least one locale.");
  }
  for (const [locale, localized] of Object.entries(record)) {
    if (!schemaLocales.includes(locale as SchemaLocale)) {
      issue(issues, `${path}.${locale}`, "invalid_locale", `Unsupported locale: ${locale}.`);
      continue;
    }
    checkString(localized, `${path}.${locale}`, issues, { allowEmpty });
  }
}

function checkIndexability(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  checkKeys(record, ["index", "follow", "blockReason"], ["index", "follow"], path, issues);
  checkBoolean(record.index, `${path}.index`, issues);
  checkBoolean(record.follow, `${path}.follow`, issues);
  if ("blockReason" in record) {
    checkString(record.blockReason, `${path}.blockReason`, issues, { nullable: true });
  }
  if (record.index === false && (!record.blockReason || typeof record.blockReason !== "string")) {
    issue(issues, `${path}.blockReason`, "required_for_noindex", "A noindex record needs a block reason.");
  }
}

function checkContentDates(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  checkKeys(
    record,
    ["datePublished", "dateModified", "lastReviewed"],
    [],
    path,
    issues,
  );
  for (const key of ["datePublished", "dateModified", "lastReviewed"] as const) {
    if (key in record) checkDate(record[key], `${path}.${key}`, issues, true);
  }
  const today = new Date().toISOString().slice(0, 10);
  for (const key of ["datePublished", "dateModified"] as const) {
    if (
      typeof record[key] === "string" &&
      isStrictCalendarDate(record[key]) &&
      record[key] > today
    ) {
      issue(
        issues,
        `${path}.${key}`,
        "future_content_date",
        `${key} cannot be in the future.`,
      );
    }
  }
  if (
    typeof record.datePublished === "string" &&
    typeof record.dateModified === "string" &&
    record.dateModified < record.datePublished
  ) {
    issue(
      issues,
      `${path}.dateModified`,
      "date_order_invalid",
      "dateModified cannot be earlier than datePublished.",
    );
  }
}

function checkUpdatePolicy(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  checkKeys(
    record,
    ["volatility", "refreshCadence", "owner", "nextReviewAt"],
    ["volatility", "refreshCadence"],
    path,
    issues,
  );
  checkEnum(record.volatility, volatilities, `${path}.volatility`, issues);
  checkEnum(record.refreshCadence, refreshCadences, `${path}.refreshCadence`, issues);
  if ("owner" in record) checkString(record.owner, `${path}.owner`, issues, { nullable: true });
  if ("nextReviewAt" in record) checkDate(record.nextReviewAt, `${path}.nextReviewAt`, issues, true);
}

function checkLocaleVersion(
  value: unknown,
  locale: SchemaLocale,
  path: string,
  issues: ValidationIssue[],
) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  const required = ["path", "title", "description", "h1", "bodyResource", "localizationStatus"];
  checkKeys(
    record,
    [...required, "searchTerms", "openGraphLocale", "ctaId"],
    required,
    path,
    issues,
  );
  if (checkString(record.path, `${path}.path`, issues)) {
    if (!isCanonicalLocalePath(locale, record.path)) {
      issue(
        issues,
        `${path}.path`,
        "invalid_locale_path",
        `Path does not use the canonical prefix/trailing-slash rules for ${locale}.`,
      );
    }
  }
  for (const key of ["title", "description", "h1", "bodyResource"] as const) {
    checkString(record[key], `${path}.${key}`, issues);
  }
  if ("searchTerms" in record) checkStringArray(record.searchTerms, `${path}.searchTerms`, issues);
  checkEnum(
    record.localizationStatus,
    localizationStatuses,
    `${path}.localizationStatus`,
    issues,
  );
  if ("openGraphLocale" in record) {
    checkString(record.openGraphLocale, `${path}.openGraphLocale`, issues, { nullable: true });
  }
  if ("ctaId" in record) {
    if (record.ctaId !== null) checkId(record.ctaId, `${path}.ctaId`, issues);
  }
}

function checkEntity(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  const required = ["id", "entityType", "names", "sourceIds", "status"];
  checkKeys(
    record,
    [
      ...required,
      "parentEntityIds",
      "relationIds",
      "factIds",
      "coordinates",
      "attributes",
      "dates",
    ],
    required,
    path,
    issues,
  );
  checkId(record.id, `${path}.id`, issues);
  checkEnum(record.entityType, entityTypes, `${path}.entityType`, issues);

  const names = assertRecord(record.names, `${path}.names`, issues);
  if (names) {
    if (Object.keys(names).length === 0) {
      issue(issues, `${path}.names`, "too_few_properties", "Expected at least one localized name.");
    }
    for (const [locale, nameValue] of Object.entries(names)) {
      if (!schemaLocales.includes(locale as SchemaLocale)) {
        issue(issues, `${path}.names.${locale}`, "invalid_locale", `Unsupported locale: ${locale}.`);
        continue;
      }
      const name = assertRecord(nameValue, `${path}.names.${locale}`, issues);
      if (!name) continue;
      checkKeys(
        name,
        ["name", "shortName", "aliases", "transliteration"],
        ["name"],
        `${path}.names.${locale}`,
        issues,
      );
      checkString(name.name, `${path}.names.${locale}.name`, issues);
      if ("shortName" in name) {
        checkString(name.shortName, `${path}.names.${locale}.shortName`, issues, { nullable: true });
      }
      if ("aliases" in name) {
        checkStringArray(name.aliases, `${path}.names.${locale}.aliases`, issues);
      }
      if ("transliteration" in name) {
        checkString(name.transliteration, `${path}.names.${locale}.transliteration`, issues, {
          nullable: true,
        });
      }
    }
  }

  for (const key of ["parentEntityIds", "relationIds", "factIds"] as const) {
    checkOptionalStringArray(record, key, path, issues, true);
  }
  checkStringArray(record.sourceIds, `${path}.sourceIds`, issues, { ids: true });
  checkEnum(record.status, contentStatuses, `${path}.status`, issues);

  if ("coordinates" in record && record.coordinates !== null) {
    const coordinates = assertRecord(record.coordinates, `${path}.coordinates`, issues);
    if (coordinates) {
      checkKeys(
        coordinates,
        ["latitude", "longitude"],
        ["latitude", "longitude"],
        `${path}.coordinates`,
        issues,
      );
      checkNumber(coordinates.latitude, `${path}.coordinates.latitude`, issues, { min: -90, max: 90 });
      checkNumber(coordinates.longitude, `${path}.coordinates.longitude`, issues, {
        min: -180,
        max: 180,
      });
    }
  }
  if ("attributes" in record) {
    const attributes = assertRecord(record.attributes, `${path}.attributes`, issues);
    if (attributes) checkJsonValue(attributes, `${path}.attributes`, issues);
  }
  if ("dates" in record) {
    const dates = assertRecord(record.dates, `${path}.dates`, issues);
    if (dates) {
      checkKeys(dates, ["createdAt", "updatedAt"], [], `${path}.dates`, issues);
      if ("createdAt" in dates) {
        checkDateOrDateTime(dates.createdAt, `${path}.dates.createdAt`, issues, true);
      }
      if ("updatedAt" in dates) {
        checkDateOrDateTime(dates.updatedAt, `${path}.dates.updatedAt`, issues, true);
      }
    }
  }
}

function checkRelation(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  const required = ["id", "relationType", "fromEntityId", "toEntityId", "sourceIds", "status"];
  checkKeys(
    record,
    [
      ...required,
      "bidirectional",
      "factIds",
      "attributes",
      "effectiveFrom",
      "effectiveTo",
    ],
    required,
    path,
    issues,
  );
  checkId(record.id, `${path}.id`, issues);
  checkId(record.relationType, `${path}.relationType`, issues);
  checkId(record.fromEntityId, `${path}.fromEntityId`, issues);
  checkId(record.toEntityId, `${path}.toEntityId`, issues);
  if (record.fromEntityId === record.toEntityId) {
    issue(issues, path, "self_relation", "A relation must connect two different entities.");
  }
  if ("bidirectional" in record) checkBoolean(record.bidirectional, `${path}.bidirectional`, issues);
  checkOptionalStringArray(record, "factIds", path, issues, true);
  checkStringArray(record.sourceIds, `${path}.sourceIds`, issues, { ids: true });
  if ("attributes" in record) {
    const attributes = assertRecord(record.attributes, `${path}.attributes`, issues);
    if (attributes) checkJsonValue(attributes, `${path}.attributes`, issues);
  }
  if ("effectiveFrom" in record) {
    checkDate(record.effectiveFrom, `${path}.effectiveFrom`, issues, true);
  }
  if ("effectiveTo" in record) checkDate(record.effectiveTo, `${path}.effectiveTo`, issues, true);
  checkEnum(record.status, contentStatuses, `${path}.status`, issues);
}

function checkContentNode(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  const required = [
    "id",
    "family",
    "section",
    "primaryIntent",
    "entityIds",
    "status",
    "indexability",
    "locales",
    "sourceIds",
    "updatePolicy",
  ];
  checkKeys(
    record,
    [
      ...required,
      "relationIds",
      "parentContentId",
      "factIds",
      "mediaIds",
      "schemaTypes",
      "legacyAliases",
      "dates",
      "candidateId",
      "editorialStatus",
      "primaryCollectionId",
      "primaryEntityId",
      "secondaryEntityIds",
      "freshnessClass",
      "lastVerified",
      "indexApproved",
    ],
    required,
    path,
    issues,
  );
  checkId(record.id, `${path}.id`, issues);
  checkEnum(record.family, contentFamilies, `${path}.family`, issues);
  checkEnum(record.section, contentSections, `${path}.section`, issues);
  checkEnum(record.primaryIntent, contentIntents, `${path}.primaryIntent`, issues);
  checkStringArray(record.entityIds, `${path}.entityIds`, issues, { minItems: 1, ids: true });
  checkOptionalStringArray(record, "relationIds", path, issues, true);
  if ("parentContentId" in record && record.parentContentId !== null) {
    checkId(record.parentContentId, `${path}.parentContentId`, issues);
  }
  checkEnum(record.status, contentStatuses, `${path}.status`, issues);
  checkIndexability(record.indexability, `${path}.indexability`, issues);

  const locales = assertRecord(record.locales, `${path}.locales`, issues);
  if (locales) {
    if (Object.keys(locales).length === 0) {
      issue(issues, `${path}.locales`, "too_few_properties", "Expected at least one locale version.");
    }
    for (const [locale, localeVersion] of Object.entries(locales)) {
      if (!schemaLocales.includes(locale as SchemaLocale)) {
        issue(issues, `${path}.locales.${locale}`, "invalid_locale", `Unsupported locale: ${locale}.`);
        continue;
      }
      checkLocaleVersion(localeVersion, locale as SchemaLocale, `${path}.locales.${locale}`, issues);
    }
  }

  for (const key of ["factIds", "mediaIds"] as const) {
    checkOptionalStringArray(record, key, path, issues, true);
  }
  checkStringArray(record.sourceIds, `${path}.sourceIds`, issues, { ids: true });
  checkOptionalStringArray(record, "schemaTypes", path, issues);
  if ("legacyAliases" in record) {
    checkStringArray(record.legacyAliases, `${path}.legacyAliases`, issues);
    if (Array.isArray(record.legacyAliases)) {
      record.legacyAliases.forEach((alias, index) => {
        if (typeof alias !== "string") return;
        const aliasPath = `${path}.legacyAliases[${index}]`;
        if (!alias.startsWith("/") || !isSafeContentPath(alias)) {
          issue(issues, aliasPath, "invalid_path", "Legacy aliases must be safe absolute paths.");
          return;
        }
        const aliasLocale = siteLocaleForContentPath(alias);
        const aliasSchemaLocale = toSchemaLocale(aliasLocale);
        if (!isCanonicalLocalePath(aliasSchemaLocale, alias)) {
          issue(issues, aliasPath, "invalid_locale_path", "Legacy aliases need canonical locale prefixes and trailing slashes.");
        }
        if (locales && !(aliasSchemaLocale in locales)) {
          issue(
            issues,
            aliasPath,
            "missing_alias_locale",
            `Legacy alias locale ${aliasSchemaLocale} has no matching locale version.`,
          );
        }
      });
    }
  }
  if ("dates" in record) checkContentDates(record.dates, `${path}.dates`, issues);
  checkUpdatePolicy(record.updatePolicy, `${path}.updatePolicy`, issues);

  const guideGovernanceFields = [
    "candidateId",
    "editorialStatus",
    "primaryCollectionId",
    "primaryEntityId",
    "secondaryEntityIds",
    "freshnessClass",
    "lastVerified",
    "indexApproved",
  ] as const;
  const suppliedGuideGovernanceFields = guideGovernanceFields.filter(
    (key) => key in record,
  );
  if (record.id?.toString().startsWith("guide-") && suppliedGuideGovernanceFields.length !== guideGovernanceFields.length) {
    issue(
      issues,
      path,
      "incomplete_guide_governance",
      "Guide content nodes require the complete release-governance bundle.",
    );
  }
  if (suppliedGuideGovernanceFields.length > 0) {
    if (record.candidateId !== null) checkId(record.candidateId, `${path}.candidateId`, issues);
    checkEnum(
      record.editorialStatus,
      ["provisional", "approved", "retired"] as const,
      `${path}.editorialStatus`,
      issues,
    );
    if (record.primaryCollectionId !== null) {
      checkId(record.primaryCollectionId, `${path}.primaryCollectionId`, issues);
    }
    if (record.primaryEntityId !== null) {
      checkId(record.primaryEntityId, `${path}.primaryEntityId`, issues);
    }
    checkStringArray(record.secondaryEntityIds, `${path}.secondaryEntityIds`, issues, { ids: true });
    checkEnum(
      record.freshnessClass,
      ["low", "medium", "high", "critical"] as const,
      `${path}.freshnessClass`,
      issues,
    );
    checkDate(record.lastVerified, `${path}.lastVerified`, issues, true);
    checkBoolean(record.indexApproved, `${path}.indexApproved`, issues);
    if (record.indexApproved === true && record.editorialStatus !== "approved") {
      issue(
        issues,
        `${path}.indexApproved`,
        "index_approval_without_editorial_approval",
        "Guide index approval requires editorialStatus=approved.",
      );
    }
    if (Array.isArray(record.entityIds)) {
      const declaredEntityIds = record.entityIds;
      if (
        typeof record.primaryEntityId === "string" &&
        !declaredEntityIds.includes(record.primaryEntityId)
      ) {
        issue(
          issues,
          `${path}.primaryEntityId`,
          "primary_entity_not_in_entity_ids",
          "primaryEntityId must also appear in entityIds.",
        );
      }
      if (Array.isArray(record.secondaryEntityIds)) {
        record.secondaryEntityIds.forEach((entityId, index) => {
          if (typeof entityId === "string" && !declaredEntityIds.includes(entityId)) {
            issue(
              issues,
              `${path}.secondaryEntityIds[${index}]`,
              "secondary_entity_not_in_entity_ids",
              "Every secondary entity must also appear in entityIds.",
            );
          }
        });
      }
    }
    if (
      typeof record.primaryCollectionId === "string" &&
      record.parentContentId !== `collection-${record.primaryCollectionId}`
    ) {
      issue(
        issues,
        `${path}.primaryCollectionId`,
        "collection_parent_mismatch",
        "primaryCollectionId must match parentContentId.",
      );
    }
    if (typeof record.primaryCollectionId === "string") {
      const expectedSection = record.primaryCollectionId.startsWith("timing-")
        ? "when-to-go"
        : record.primaryCollectionId.split("-", 1)[0];
      if (record.section !== expectedSection) {
        issue(
          issues,
          `${path}.primaryCollectionId`,
          "collection_section_mismatch",
          `The collection belongs to section ${expectedSection}.`,
        );
      }
    }
    if (
      typeof record.lastVerified === "string" &&
      isRecord(record.dates) &&
      record.dates.lastReviewed !== record.lastVerified
    ) {
      issue(
        issues,
        `${path}.lastVerified`,
        "verification_date_mismatch",
        "lastVerified must equal dates.lastReviewed.",
      );
    }
    if (
      typeof record.freshnessClass === "string" &&
      isRecord(record.updatePolicy) &&
      record.updatePolicy.volatility !== record.freshnessClass
    ) {
      issue(
        issues,
        `${path}.freshnessClass`,
        "freshness_policy_mismatch",
        "freshnessClass must equal updatePolicy.volatility.",
      );
    }
  }

  const status = record.status as ContentStatus;
  const indexability = isRecord(record.indexability) ? record.indexability : null;
  if (indexability?.index === true && status !== "published") {
    issue(
      issues,
      `${path}.indexability.index`,
      "unpublished_indexable",
      "Only published content can be indexable.",
    );
  }
  if (
    record.id?.toString().startsWith("guide-") &&
    indexability?.index === true &&
    record.indexApproved !== true
  ) {
    issue(
      issues,
      `${path}.indexability.index`,
      "guide_index_gate_bypass",
      "A guide content node cannot be indexable without indexApproved=true.",
    );
  }
  if (indexability?.index === true && locales) {
    for (const [locale, localeVersion] of Object.entries(locales)) {
      if (isRecord(localeVersion) && localeVersion.localizationStatus === "review-required") {
        issue(
          issues,
          `${path}.locales.${locale}.localizationStatus`,
          "review_required_indexable",
          "An indexable node cannot contain a review-required locale.",
        );
      }
    }
  }
}

function checkFact(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  const required = [
    "id",
    "value",
    "sourceIds",
    "verifiedAt",
    "volatility",
    "refreshCadence",
    "confidence",
    "lastHash",
    "status",
  ];
  checkKeys(
    record,
    [...required, "unit", "scope", "entityIds", "relationIds", "effectiveFrom", "effectiveTo"],
    required,
    path,
    issues,
  );
  checkId(record.id, `${path}.id`, issues);
  checkJsonValue(record.value, `${path}.value`, issues);
  for (const key of ["unit", "scope"] as const) {
    if (key in record) checkString(record[key], `${path}.${key}`, issues, { nullable: true });
  }
  for (const key of ["entityIds", "relationIds"] as const) {
    checkOptionalStringArray(record, key, path, issues, true);
  }
  checkStringArray(record.sourceIds, `${path}.sourceIds`, issues, { ids: true, minItems: 1 });
  if ("effectiveFrom" in record) checkDate(record.effectiveFrom, `${path}.effectiveFrom`, issues, true);
  if ("effectiveTo" in record) checkDate(record.effectiveTo, `${path}.effectiveTo`, issues, true);
  checkDateTime(record.verifiedAt, `${path}.verifiedAt`, issues);
  checkEnum(record.volatility, volatilities, `${path}.volatility`, issues);
  checkEnum(record.refreshCadence, refreshCadences, `${path}.refreshCadence`, issues);
  checkNumber(record.confidence, `${path}.confidence`, issues, { min: 0, max: 1 });
  checkString(record.lastHash, `${path}.lastHash`, issues);
  checkEnum(record.status, factStatuses, `${path}.status`, issues);
}

function checkSourceSnapshot(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  const required = [
    "id",
    "url",
    "title",
    "publisher",
    "sourceKind",
    "retrievedAt",
    "contentHash",
  ];
  checkKeys(
    record,
    [...required, "locale", "publishedAt", "effectiveFrom", "effectiveTo", "snapshotResource", "notes"],
    required,
    path,
    issues,
  );
  checkId(record.id, `${path}.id`, issues);
  if (checkString(record.url, `${path}.url`, issues)) {
    try {
      const url = new URL(record.url);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error("unsupported protocol");
    } catch {
      issue(issues, `${path}.url`, "invalid_url", "Expected an absolute HTTP(S) URL.");
    }
  }
  checkString(record.title, `${path}.title`, issues);
  checkString(record.publisher, `${path}.publisher`, issues);
  checkEnum(record.sourceKind, sourceKinds, `${path}.sourceKind`, issues);
  if ("locale" in record && record.locale !== null) {
    checkEnum(record.locale, schemaLocales, `${path}.locale`, issues);
  }
  checkDateTime(record.retrievedAt, `${path}.retrievedAt`, issues);
  if ("publishedAt" in record) {
    checkDateOrDateTime(record.publishedAt, `${path}.publishedAt`, issues, true);
  }
  for (const key of ["effectiveFrom", "effectiveTo"] as const) {
    if (key in record) checkDate(record[key], `${path}.${key}`, issues, true);
  }
  checkString(record.contentHash, `${path}.contentHash`, issues);
  for (const key of ["snapshotResource", "notes"] as const) {
    if (key in record) checkString(record[key], `${path}.${key}`, issues, { nullable: true });
  }
}

function checkMediaAsset(value: unknown, path: string, issues: ValidationIssue[]) {
  const record = assertRecord(value, path, issues);
  if (!record) return;
  const required = ["id", "mediaKind", "resource", "mimeType", "alt", "rights", "status"];
  checkKeys(
    record,
    [...required, "width", "height", "caption", "credit", "sourceIds", "focalPoint"],
    required,
    path,
    issues,
  );
  checkId(record.id, `${path}.id`, issues);
  checkEnum(record.mediaKind, mediaKinds, `${path}.mediaKind`, issues);
  checkString(record.resource, `${path}.resource`, issues);
  checkString(record.mimeType, `${path}.mimeType`, issues);
  for (const key of ["width", "height"] as const) {
    if (key in record && record[key] !== null) {
      checkNumber(record[key], `${path}.${key}`, issues, { min: 1, integer: true });
    }
  }
  checkLocalizedStrings(record.alt, `${path}.alt`, issues, true);
  if ("caption" in record) checkLocalizedStrings(record.caption, `${path}.caption`, issues, true);
  if ("credit" in record) checkString(record.credit, `${path}.credit`, issues, { nullable: true });
  checkEnum(record.rights, mediaRights, `${path}.rights`, issues);
  checkOptionalStringArray(record, "sourceIds", path, issues, true);
  if ("focalPoint" in record && record.focalPoint !== null) {
    const focalPoint = assertRecord(record.focalPoint, `${path}.focalPoint`, issues);
    if (focalPoint) {
      checkKeys(focalPoint, ["x", "y"], ["x", "y"], `${path}.focalPoint`, issues);
      checkNumber(focalPoint.x, `${path}.focalPoint.x`, issues, { min: 0, max: 1 });
      checkNumber(focalPoint.y, `${path}.focalPoint.y`, issues, { min: 0, max: 1 });
    }
  }
  checkEnum(record.status, mediaStatuses, `${path}.status`, issues);
}

function result<T>(input: unknown, validate: (value: unknown, path: string, issues: ValidationIssue[]) => void): ValidationResult<T> {
  const issues: ValidationIssue[] = [];
  validate(input, "$", issues);
  return issues.length === 0
    ? { ok: true, value: input as T }
    : { ok: false, issues };
}

export function validateEntity(input: unknown): ValidationResult<Entity> {
  return result<Entity>(input, checkEntity);
}

export function validateRelation(input: unknown): ValidationResult<Relation> {
  return result<Relation>(input, checkRelation);
}

export function validateContentNode(input: unknown): ValidationResult<ContentNode> {
  return result<ContentNode>(input, checkContentNode);
}

export function validateFact(input: unknown): ValidationResult<Fact> {
  return result<Fact>(input, checkFact);
}

export function validateSourceSnapshot(input: unknown): ValidationResult<SourceSnapshot> {
  return result<SourceSnapshot>(input, checkSourceSnapshot);
}

export function validateMediaAsset(input: unknown): ValidationResult<MediaAsset> {
  return result<MediaAsset>(input, checkMediaAsset);
}

const validatorsByRecordType: {
  [TType in RepositoryRecordType]: (
    input: unknown,
  ) => ValidationResult<RepositoryRecordMap[TType]>;
} = {
  entity: validateEntity,
  relation: validateRelation,
  "content-node": validateContentNode,
  fact: validateFact,
  "source-snapshot": validateSourceSnapshot,
  "media-asset": validateMediaAsset,
};

export function validateContentRecord(input: unknown): ValidationResult<ContentRecordEnvelope> {
  const envelopeIssues: ValidationIssue[] = [];
  const record = assertRecord(input, "$", envelopeIssues);
  if (!record) return { ok: false, issues: envelopeIssues };
  checkKeys(record, ["schemaVersion", "recordType", "data"], ["schemaVersion", "recordType", "data"], "$", envelopeIssues);
  if (record.schemaVersion !== CONTENT_SYSTEM_SCHEMA_VERSION) {
    issue(
      envelopeIssues,
      "$.schemaVersion",
      "unsupported_schema_version",
      `Expected schema version ${CONTENT_SYSTEM_SCHEMA_VERSION}.`,
    );
  }
  if (!checkEnum(record.recordType, repositoryRecordTypes, "$.recordType", envelopeIssues)) {
    return { ok: false, issues: envelopeIssues };
  }
  if (envelopeIssues.length > 0) return { ok: false, issues: envelopeIssues };

  const recordType = record.recordType as RepositoryRecordType;
  const dataResult = validatorsByRecordType[recordType](record.data);
  if ("issues" in dataResult) {
    return {
      ok: false,
      issues: dataResult.issues.map((item) => ({
        ...item,
        path: item.path === "$" ? "$.data" : `$.data${item.path.slice(1)}`,
      })),
    };
  }
  return { ok: true, value: input as ContentRecordEnvelope };
}

export class ContentValidationError extends Error {
  readonly issues: readonly ValidationIssue[];

  constructor(issues: readonly ValidationIssue[]) {
    super(
      `Content validation failed:\n${issues
        .map((item) => `- ${item.path} [${item.code}]: ${item.message}`)
        .join("\n")}`,
    );
    this.name = "ContentValidationError";
    this.issues = issues;
  }
}

export function assertValidContentRecord(input: unknown): ContentRecordEnvelope {
  const validation = validateContentRecord(input);
  if ("issues" in validation) throw new ContentValidationError(validation.issues);
  return validation.value;
}

export function assertValidContentNode(input: unknown): ContentNode {
  const validation = validateContentNode(input);
  if ("issues" in validation) throw new ContentValidationError(validation.issues);
  return validation.value;
}

export function assertValidEntity(input: unknown): Entity {
  const validation = validateEntity(input);
  if ("issues" in validation) throw new ContentValidationError(validation.issues);
  return validation.value;
}

export function assertValidRelation(input: unknown): Relation {
  const validation = validateRelation(input);
  if ("issues" in validation) throw new ContentValidationError(validation.issues);
  return validation.value;
}

export function assertValidFact(input: unknown): Fact {
  const validation = validateFact(input);
  if ("issues" in validation) throw new ContentValidationError(validation.issues);
  return validation.value;
}

export function assertValidSourceSnapshot(input: unknown): SourceSnapshot {
  const validation = validateSourceSnapshot(input);
  if ("issues" in validation) throw new ContentValidationError(validation.issues);
  return validation.value;
}

export function assertValidMediaAsset(input: unknown): MediaAsset {
  const validation = validateMediaAsset(input);
  if ("issues" in validation) throw new ContentValidationError(validation.issues);
  return validation.value;
}
