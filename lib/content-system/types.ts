export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | readonly JsonValue[];
export interface JsonObject {
  readonly [key: string]: JsonValue;
}

export type ContentSystemSchemaVersion = "1.0.0";
export type SiteLocale = "en" | "zh" | "ko";
export type SchemaLocale = "en" | "zh-Hans" | "ko";
export type HreflangCode = SchemaLocale;

export type ContentSection =
  | "explore"
  | "plan"
  | "transport"
  | "when-to-go"
  | "stay"
  | "essentials"
  | "culture"
  | "tools"
  | "services";

export type ContentFamily =
  | "entity"
  | "subproblem"
  | "relationship"
  | "comparison"
  | "time"
  | "task"
  | "combined-decision"
  | "tool"
  | "service";

export type ContentIntent =
  | "understand"
  | "compare"
  | "plan"
  | "execute"
  | "in-trip"
  | "purchase";

export type ContentStatus =
  | "draft"
  | "research"
  | "review"
  | "published"
  | "stale"
  | "archived";

export type LocalizationStatus =
  | "source"
  | "localized"
  | "market-specific"
  | "review-required";

export type Volatility = "static" | "low" | "medium" | "high" | "critical";
export type RefreshCadence =
  | "on-source-change"
  | "every-session"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "annually"
  | "manual";

export type RepositoryRecordType =
  | "entity"
  | "relation"
  | "content-node"
  | "fact"
  | "source-snapshot"
  | "media-asset";

export type EntityType =
  | "country"
  | "travel-region"
  | "province"
  | "prefecture"
  | "city"
  | "district"
  | "county"
  | "town"
  | "village"
  | "neighborhood"
  | "natural-feature"
  | "attraction"
  | "heritage-site"
  | "experience"
  | "transport-node"
  | "route"
  | "month-season"
  | "event"
  | "historical-period"
  | "person"
  | "food-cuisine"
  | "dish"
  | "culture-topic"
  | "practical-topic"
  | "traveler-type"
  | "itinerary"
  | "service"
  | "organization"
  | "tool";

export type CoreRelationType =
  | "located-in"
  | "near"
  | "gateway-to"
  | "day-trip-from"
  | "inside-city"
  | "requires-booking"
  | "best-in-month"
  | "accessible-from"
  | "paired-with"
  | "alternative-to"
  | "serves"
  | "connects"
  | "transfer-to"
  | "direct-service"
  | "requires-transfer"
  | "faster-than"
  | "cheaper-than"
  | "best-for"
  | "occurs-on"
  | "changes-by-year"
  | "affects-weather"
  | "affects-crowds"
  | "affects-price"
  | "affects-booking"
  | "part-of-route"
  | "includes"
  | "ordered-after"
  | "nights-in"
  | "related-to"
  | "explains"
  | "applies-to"
  | "asks-about"
  | "serves-entity"
  | "solves-question";

/** Custom relation names remain extensible but must be kebab-case at runtime. */
export type RelationType = CoreRelationType | (string & {});

export interface LocalizedEntityName {
  readonly name: string;
  readonly shortName?: string | null;
  readonly aliases?: readonly string[];
  readonly transliteration?: string | null;
}

export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface RecordDates {
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export interface EntityV1 {
  readonly id: string;
  readonly entityType: EntityType;
  readonly names: Readonly<Partial<Record<SchemaLocale, LocalizedEntityName>>>;
  readonly parentEntityIds?: readonly string[];
  readonly relationIds?: readonly string[];
  readonly factIds?: readonly string[];
  readonly sourceIds: readonly string[];
  readonly coordinates?: Coordinates | null;
  readonly attributes?: JsonObject;
  readonly status: ContentStatus;
  readonly dates?: RecordDates;
}
export type Entity = EntityV1;

export interface RelationV1 {
  readonly id: string;
  readonly relationType: RelationType;
  readonly fromEntityId: string;
  readonly toEntityId: string;
  readonly bidirectional?: boolean;
  readonly factIds?: readonly string[];
  readonly sourceIds: readonly string[];
  readonly attributes?: JsonObject;
  readonly effectiveFrom?: string | null;
  readonly effectiveTo?: string | null;
  readonly status: ContentStatus;
}
export type Relation = RelationV1;

export interface Indexability {
  readonly index: boolean;
  readonly follow: boolean;
  readonly blockReason?: string | null;
}

export interface ContentDates {
  readonly datePublished?: string | null;
  readonly dateModified?: string | null;
  readonly lastReviewed?: string | null;
}

export interface UpdatePolicy {
  readonly volatility: Volatility;
  readonly refreshCadence: RefreshCadence;
  readonly owner?: string | null;
  readonly nextReviewAt?: string | null;
}

/** LocaleVersion v1. `locale` is supplied by the key in ContentNode.locales. */
export interface LocaleVersionV1 {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  readonly bodyResource: string;
  readonly searchTerms?: readonly string[];
  readonly localizationStatus: LocalizationStatus;
  readonly openGraphLocale?: string | null;
  readonly ctaId?: string | null;
}
export type LocaleVersion = LocaleVersionV1;

export interface ContentNodeV1 {
  readonly id: string;
  readonly family: ContentFamily;
  readonly section: ContentSection;
  readonly primaryIntent: ContentIntent;
  readonly entityIds: readonly string[];
  readonly relationIds?: readonly string[];
  readonly parentContentId?: string | null;
  readonly status: ContentStatus;
  readonly indexability: Indexability;
  readonly locales: Readonly<Partial<Record<SchemaLocale, LocaleVersionV1>>>;
  readonly factIds?: readonly string[];
  readonly sourceIds: readonly string[];
  readonly mediaIds?: readonly string[];
  readonly schemaTypes?: readonly string[];
  readonly legacyAliases?: readonly string[];
  readonly dates?: ContentDates;
  readonly updatePolicy: UpdatePolicy;
  /** Guide release governance. Required as a complete bundle on guide-* nodes. */
  readonly candidateId?: string | null;
  readonly editorialStatus?: "provisional" | "approved" | "retired";
  readonly primaryCollectionId?: string | null;
  readonly primaryEntityId?: string | null;
  readonly secondaryEntityIds?: readonly string[];
  readonly freshnessClass?: "low" | "medium" | "high" | "critical";
  readonly lastVerified?: string | null;
  readonly indexApproved?: boolean;
}
export type ContentNode = ContentNodeV1;

export interface FactV1 {
  readonly id: string;
  readonly value: JsonValue;
  readonly unit?: string | null;
  readonly scope?: string | null;
  readonly entityIds?: readonly string[];
  readonly relationIds?: readonly string[];
  readonly sourceIds: readonly string[];
  readonly effectiveFrom?: string | null;
  readonly effectiveTo?: string | null;
  readonly verifiedAt: string;
  readonly volatility: Volatility;
  readonly refreshCadence: RefreshCadence;
  readonly confidence: number;
  readonly lastHash: string;
  readonly status: "current" | "superseded" | "disputed" | "withdrawn";
}
export type Fact = FactV1;

export type SourceKind =
  | "government"
  | "official-operator"
  | "first-party"
  | "academic"
  | "news"
  | "commercial"
  | "community"
  | "archive";

export interface SourceSnapshotV1 {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly publisher: string;
  readonly sourceKind: SourceKind;
  readonly locale?: SchemaLocale | null;
  readonly retrievedAt: string;
  readonly publishedAt?: string | null;
  readonly effectiveFrom?: string | null;
  readonly effectiveTo?: string | null;
  readonly contentHash: string;
  readonly snapshotResource?: string | null;
  readonly notes?: string | null;
}
export type SourceSnapshot = SourceSnapshotV1;

export type MediaKind = "image" | "video" | "audio" | "document" | "map" | "diagram";
export type MediaRights = "owned" | "licensed" | "public-domain" | "permission" | "unknown";

export interface MediaAssetV1 {
  readonly id: string;
  readonly mediaKind: MediaKind;
  readonly resource: string;
  readonly mimeType: string;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly alt: Readonly<Partial<Record<SchemaLocale, string>>>;
  readonly caption?: Readonly<Partial<Record<SchemaLocale, string>>>;
  readonly credit?: string | null;
  readonly rights: MediaRights;
  readonly sourceIds?: readonly string[];
  readonly focalPoint?: { readonly x: number; readonly y: number } | null;
  readonly status: "available" | "restricted" | "retired";
}
export type MediaAsset = MediaAssetV1;

export interface RepositoryRecordMap {
  readonly entity: EntityV1;
  readonly relation: RelationV1;
  readonly "content-node": ContentNodeV1;
  readonly fact: FactV1;
  readonly "source-snapshot": SourceSnapshotV1;
  readonly "media-asset": MediaAssetV1;
}

export interface ContentRecordEnvelopeV1<
  TType extends RepositoryRecordType = RepositoryRecordType,
> {
  readonly schemaVersion: ContentSystemSchemaVersion;
  readonly recordType: TType;
  readonly data: RepositoryRecordMap[TType];
}

export type ContentRecordEnvelope = {
  readonly [TType in RepositoryRecordType]: ContentRecordEnvelopeV1<TType>;
}[RepositoryRecordType];

export interface ValidationIssue {
  readonly path: string;
  readonly code: string;
  readonly message: string;
}

export type ValidationResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly issues: readonly ValidationIssue[] };

export interface ContentManifestEntryV1 {
  readonly contentId: string;
  /** Canonical parent node used to resolve visible and structured hierarchy. */
  readonly parentContentId: string | null;
  readonly family: ContentFamily;
  readonly section: ContentSection;
  readonly primaryIntent: ContentIntent;
  readonly locale: SiteLocale;
  readonly schemaLocale: SchemaLocale;
  readonly hreflang: HreflangCode;
  readonly path: string;
  readonly canonicalPath: string;
  readonly alternates: Readonly<
    Partial<Record<HreflangCode | "x-default", string>>
  >;
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  readonly bodyResource: string;
  readonly searchTerms: readonly string[];
  readonly localizationStatus: LocalizationStatus;
  readonly openGraphLocale: string | null;
  readonly ctaId: string | null;
  readonly entityIds: readonly string[];
  readonly relationIds: readonly string[];
  readonly factIds: readonly string[];
  readonly sourceIds: readonly string[];
  readonly mediaIds: readonly string[];
  readonly schemaTypes: readonly string[];
  readonly legacyAliases: readonly string[];
  readonly status: ContentStatus;
  readonly indexability: Indexability;
  readonly dates: ContentDates;
  readonly updatePolicy: UpdatePolicy;
  readonly candidateId?: string | null;
  readonly editorialStatus?: "provisional" | "approved" | "retired";
  readonly primaryCollectionId?: string | null;
  readonly primaryEntityId?: string | null;
  readonly secondaryEntityIds?: readonly string[];
  readonly freshnessClass?: "low" | "medium" | "high" | "critical";
  readonly lastVerified?: string | null;
  readonly indexApproved?: boolean;
}
export type ContentManifestEntry = ContentManifestEntryV1;

export interface ContentManifestV1 {
  readonly schemaVersion: ContentSystemSchemaVersion;
  readonly entries: readonly ContentManifestEntryV1[];
}
export type ContentManifest = ContentManifestV1;
