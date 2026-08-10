// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import type {
  ContentFamily,
  ContentIntent,
  ContentSection,
  ContentStatus,
  HreflangCode,
  LocalizationStatus,
  RefreshCadence,
  RepositoryRecordType,
  SchemaLocale,
  SiteLocale,
  Volatility,
} from "./types.ts";

export const CONTENT_SYSTEM_SCHEMA_VERSION = "1.0.0" as const;

export const repositoryRecordTypes = [
  "entity",
  "relation",
  "content-node",
  "fact",
  "source-snapshot",
  "media-asset",
] as const satisfies readonly RepositoryRecordType[];

export const siteLocales = ["en", "zh", "ko"] as const satisfies readonly SiteLocale[];
export const schemaLocales = ["en", "zh-Hans", "ko"] as const satisfies readonly SchemaLocale[];
export const hreflangCodes = ["en", "zh-Hans", "ko"] as const satisfies readonly HreflangCode[];

export const contentSections = [
  "explore",
  "plan",
  "transport",
  "when-to-go",
  "stay",
  "essentials",
  "culture",
  "tools",
  "services",
] as const satisfies readonly ContentSection[];

export const contentFamilies = [
  "entity",
  "subproblem",
  "relationship",
  "comparison",
  "time",
  "task",
  "combined-decision",
  "tool",
  "service",
] as const satisfies readonly ContentFamily[];

export const contentIntents = [
  "understand",
  "compare",
  "plan",
  "execute",
  "in-trip",
  "purchase",
] as const satisfies readonly ContentIntent[];

export const contentStatuses = [
  "draft",
  "research",
  "review",
  "published",
  "stale",
  "archived",
] as const satisfies readonly ContentStatus[];

export const localizationStatuses = [
  "source",
  "localized",
  "market-specific",
  "review-required",
] as const satisfies readonly LocalizationStatus[];

export const volatilities = [
  "static",
  "low",
  "medium",
  "high",
  "critical",
] as const satisfies readonly Volatility[];

export const refreshCadences = [
  "on-source-change",
  "weekly",
  "monthly",
  "quarterly",
  "annually",
  "manual",
] as const satisfies readonly RefreshCadence[];

export const siteLocaleToSchemaLocale = {
  en: "en",
  zh: "zh-Hans",
  ko: "ko",
} as const satisfies Record<SiteLocale, SchemaLocale>;

export const schemaLocaleToSiteLocale = {
  en: "en",
  "zh-Hans": "zh",
  ko: "ko",
} as const satisfies Record<SchemaLocale, SiteLocale>;

export const schemaLocaleToHreflang = {
  en: "en",
  "zh-Hans": "zh-Hans",
  ko: "ko",
} as const satisfies Record<SchemaLocale, HreflangCode>;

export const CONTENT_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
export const CONTENT_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;
export const CONTENT_DATE_TIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/u;
