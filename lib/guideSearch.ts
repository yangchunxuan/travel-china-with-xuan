import type {
  ContentManifest,
  ContentSection,
  Entity,
  SchemaLocale,
  SiteLocale,
} from "./content-system/types";
import type { HomegroundLocale } from "./homegroundI18n";

const schemaLocaleBySiteLocale = {
  en: "en",
  zh: "zh-Hans",
  ko: "ko",
} as const satisfies Record<SiteLocale, SchemaLocale>;

const localeTagBySiteLocale = {
  en: "en-US",
  zh: "zh-CN",
  ko: "ko-KR",
} as const satisfies Record<SiteLocale, string>;

export interface GuideSearchCollectionDefinition {
  readonly id: string;
  readonly guideContentIds: readonly string[];
  readonly locales: Readonly<
    Record<HomegroundLocale, { readonly label: string }>
  >;
}

export interface GuideSearchDocument {
  readonly contentId: string;
  readonly guideId: string;
  readonly locale: HomegroundLocale;
  readonly path: string;
  readonly title: string;
  readonly h1: string;
  readonly description: string;
  readonly searchTerms: readonly string[];
  readonly entityTerms: readonly string[];
  readonly collectionLabel: string;
  readonly section: ContentSection;
  readonly dateModified: string | null;
}

export interface GuideSearchResult {
  readonly document: GuideSearchDocument;
  readonly score: number;
}

interface SearchField {
  readonly values: readonly string[];
  readonly exactWeight: number;
  readonly prefixWeight: number;
  readonly phraseWeight: number;
  readonly tokenWeight: number;
}

function uniqueNonEmpty(values: readonly (string | null | undefined)[]) {
  return [...new Set(values.map((value) => value?.trim()).filter(Boolean))] as string[];
}

function queryTokens(query: string, locale: HomegroundLocale) {
  const englishStopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "can",
    "do",
    "for",
    "from",
    "how",
    "is",
    "my",
    "or",
    "should",
    "the",
    "to",
    "trip",
    "what",
    "which",
    "with",
    "your",
  ]);
  const tokenSource =
    locale === "zh"
      ? query.replace(
          /怎么|如何|怎样|是否|还是|可以|应该|哪里|什么|多少|多久|哪个|哪种/gu,
          " ",
        )
      : query;
  const parts = uniqueNonEmpty(tokenSource.split(" "));

  if (locale === "en") {
    const meaningfulParts = parts.filter((part) => !englishStopWords.has(part));
    return meaningfulParts.length > 0 ? meaningfulParts : parts;
  }
  if (locale !== "zh") return parts;

  return uniqueNonEmpty(
    parts.flatMap((part) => {
      const characters = Array.from(part);
      if (!/^\p{Script=Han}+$/u.test(part) || characters.length < 4) {
        return [part];
      }

      return characters.slice(0, -1).map((character, index) =>
        `${character}${characters[index + 1]}`,
      );
    }),
  );
}

function queryEntityAnchors(
  documents: readonly GuideSearchDocument[],
  query: string,
  locale: HomegroundLocale,
) {
  const minimumLength = locale === "zh" ? 2 : 3;
  const broadCountryTerms: Record<HomegroundLocale, ReadonlySet<string>> = {
    en: new Set(["china"]),
    zh: new Set(["中国"]),
    ko: new Set(["중국"]),
  };
  const matches = uniqueNonEmpty(
    documents.flatMap((document) =>
      document.entityTerms.map((term) => normalizeGuideSearchText(term, locale)),
    ),
  ).filter(
    (term) =>
      Array.from(term).length >= minimumLength &&
      !broadCountryTerms[locale].has(term) &&
      query.includes(term),
  );

  return matches.filter(
    (term) =>
      !matches.some(
        (other) => other !== term && other.length > term.length && other.includes(term),
      ),
  );
}

function minimumQueryTokenMatches(
  tokens: readonly string[],
  locale: HomegroundLocale,
) {
  if (locale === "zh") {
    return tokens.length <= 2
      ? tokens.length
      : Math.max(2, Math.ceil(tokens.length * 0.4));
  }

  return tokens.length <= 3
    ? tokens.length
    : Math.max(3, Math.ceil(tokens.length * 0.75));
}

function hasStayIntent(query: string, locale: HomegroundLocale) {
  if (locale === "zh") {
    return /住|住宿|酒店|饭店|民宿|宾馆|房型/u.test(query);
  }
  if (locale === "ko") {
    return /숙소|숙박|호텔|리조트|머물|묵/u.test(query);
  }
  return /\b(?:stay|staying|hotel|hotels|accommodation|hostel|resort)\b/u.test(
    query,
  );
}

/**
 * Deterministic text normalization for metadata search.
 *
 * This deliberately does not implement spelling correction or semantic
 * expansion. Reviewed aliases and search terms remain the only expansion
 * source in Phase 1.
 */
export function normalizeGuideSearchText(
  value: string,
  locale: HomegroundLocale,
) {
  const localeTag = localeTagBySiteLocale[locale];
  let normalized = value
    .normalize("NFKC")
    .toLocaleLowerCase(localeTag)
    .replace(/&/gu, locale === "en" ? " and " : " ");

  if (locale === "en") {
    normalized = normalized.normalize("NFKD").replace(/\p{M}+/gu, "");
  }

  return normalized
    .replace(/[\p{P}\p{S}]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim()
    .slice(0, 160);
}

function entityTermsForEntry(
  entityIds: readonly string[],
  locale: HomegroundLocale,
  entitiesById: ReadonlyMap<string, Entity>,
) {
  const schemaLocale = schemaLocaleBySiteLocale[locale];

  return uniqueNonEmpty(
    entityIds.flatMap((entityId) => {
      const entity = entitiesById.get(entityId);
      if (!entity || entity.status !== "published") return [];
      const names = entity.names[schemaLocale];
      if (!names) return [];
      return [
        names.name,
        names.shortName,
        names.transliteration,
        ...(names.aliases ?? []),
      ];
    }),
  );
}

/**
 * Build the Phase 1 guide-only metadata corpus.
 *
 * The collection registry is intentionally passed in. The current manifest
 * schema does not yet emit primaryCollectionId, so guide-to-collection
 * assignments are adapted once by guideSearchRuntime instead of being guessed
 * from paths or prose here.
 */
export function buildGuideSearchDocuments(
  manifest: ContentManifest,
  entityRegistry: readonly Entity[],
  collectionRegistry: readonly GuideSearchCollectionDefinition[],
): GuideSearchDocument[] {
  const entitiesById = new Map(
    entityRegistry.map((entity) => [entity.id, entity] as const),
  );
  const collectionByGuideContentId = new Map<
    string,
    GuideSearchCollectionDefinition
  >();

  for (const collection of collectionRegistry) {
    for (const contentId of collection.guideContentIds) {
      if (collectionByGuideContentId.has(contentId)) {
        throw new Error(
          `Guide search collection assignment is duplicated: ${contentId}.`,
        );
      }
      collectionByGuideContentId.set(contentId, collection);
    }
  }

  return manifest.entries
    .filter(
      (entry) =>
        entry.contentId.startsWith("guide-") &&
        entry.status === "published" &&
        entry.indexability.index &&
        (entry.bodyResource.startsWith("guide:") ||
          entry.bodyResource.startsWith("legacy-guide:")),
    )
    .map((entry) => {
      const collection = collectionByGuideContentId.get(entry.contentId);
      const guideId = entry.bodyResource.replace(/^legacy-guide:|^guide:/u, "");

      return {
        contentId: entry.contentId,
        guideId,
        locale: entry.locale,
        path: entry.canonicalPath,
        title: entry.title,
        h1: entry.h1,
        description: entry.description,
        searchTerms: uniqueNonEmpty(entry.searchTerms),
        entityTerms: entityTermsForEntry(
          entry.entityIds,
          entry.locale,
          entitiesById,
        ),
        collectionLabel: collection?.locales[entry.locale].label ?? "",
        section: entry.section,
        dateModified: entry.dates.dateModified ?? null,
      } satisfies GuideSearchDocument;
    })
    .sort(
      (left, right) =>
        left.locale.localeCompare(right.locale, "en") ||
        left.path.localeCompare(right.path, "en"),
    );
}

function scoreDocument(
  document: GuideSearchDocument,
  query: string,
  tokens: readonly string[],
  entityAnchors: readonly string[],
  locale: HomegroundLocale,
  stayIntent: boolean,
) {
  const fields: readonly SearchField[] = [
    {
      values: [document.h1],
      exactWeight: 140,
      prefixWeight: 76,
      phraseWeight: 58,
      tokenWeight: 22,
    },
    {
      values: [document.title],
      exactWeight: 132,
      prefixWeight: 72,
      phraseWeight: 54,
      tokenWeight: 20,
    },
    {
      values: document.searchTerms,
      exactWeight: 124,
      prefixWeight: 68,
      phraseWeight: 50,
      tokenWeight: 18,
    },
    {
      values: document.entityTerms,
      exactWeight: 112,
      prefixWeight: 62,
      phraseWeight: 46,
      tokenWeight: 17,
    },
    {
      values: [document.collectionLabel],
      exactWeight: 92,
      prefixWeight: 52,
      phraseWeight: 38,
      tokenWeight: 13,
    },
    {
      values: [document.description],
      exactWeight: 54,
      prefixWeight: 28,
      phraseWeight: 22,
      tokenWeight: 6,
    },
  ];
  const normalizedFields = fields.map((field) => ({
    ...field,
    values: uniqueNonEmpty(
      field.values.map((value) => normalizeGuideSearchText(value, locale)),
    ),
  }));
  const allValues = normalizedFields.flatMap((field) => field.values);
  const normalizedEntityTerms = normalizedFields[3]?.values ?? [];

  if (
    entityAnchors.length > 0 &&
    !entityAnchors.every((anchor) => normalizedEntityTerms.includes(anchor))
  ) {
    return 0;
  }

  const matchingTokens = tokens.filter((token) =>
    allValues.some((value) => value.includes(token)),
  );
  const directQueryMatch = allValues.some((value) => value.includes(query));
  const minimumTokenMatches = minimumQueryTokenMatches(tokens, locale);

  if (!directQueryMatch && matchingTokens.length < minimumTokenMatches) {
    return 0;
  }

  let score = 0;
  for (const field of normalizedFields) {
    let fieldScore = 0;
    for (const value of field.values) {
      if (value === query) {
        fieldScore = Math.max(fieldScore, field.exactWeight);
      } else if (value.startsWith(query)) {
        fieldScore = Math.max(fieldScore, field.prefixWeight);
      } else if (value.includes(query)) {
        fieldScore = Math.max(fieldScore, field.phraseWeight);
      }
    }
    score += fieldScore;
  }

  for (const token of matchingTokens) {
    score += Math.max(
      ...normalizedFields.map((field) =>
        field.values.some((value) => value.includes(token))
          ? field.tokenWeight
          : 0,
      ),
    );
  }

  const normalizedHeadings = normalizedFields
    .slice(0, 2)
    .flatMap((field) => field.values);
  if (
    matchingTokens.length >= minimumTokenMatches &&
    matchingTokens.every((token) =>
      normalizedHeadings.some((value) => value.includes(token)),
    )
  ) {
    score += 28;
  }

  if (stayIntent && document.section === "stay") {
    score += 48;
  }

  return score;
}

export function searchGuideDocuments(
  documents: readonly GuideSearchDocument[],
  rawQuery: string,
  locale: HomegroundLocale,
): GuideSearchResult[] {
  const query = normalizeGuideSearchText(rawQuery, locale);
  if (!query || (/^[a-z0-9]$/u.test(query) && locale === "en")) return [];

  const tokens = queryTokens(query, locale);
  const localeDocuments = documents.filter(
    (document) => document.locale === locale,
  );
  const entityAnchors = queryEntityAnchors(localeDocuments, query, locale);
  const stayIntent = hasStayIntent(query, locale);
  const collator = new Intl.Collator(localeTagBySiteLocale[locale], {
    sensitivity: "base",
    numeric: true,
  });

  return localeDocuments
    .map((document) => ({
      document,
      score: scoreDocument(
        document,
        query,
        tokens,
        entityAnchors,
        locale,
        stayIntent,
      ),
    }))
    .filter((result) => result.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        collator.compare(left.document.h1, right.document.h1) ||
        left.document.path.localeCompare(right.document.path, "en"),
    );
}
