// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import { CONTENT_SYSTEM_SCHEMA_VERSION, schemaLocaleToSiteLocale } from "./constants.ts";
// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import { normalizeContentPath, siteLocaleForContentPath, toHreflang } from "./path.ts";
// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import type {
  ContentManifest,
  ContentManifestEntry,
  ContentNode,
  ContentRecordEnvelope,
  HreflangCode,
  RepositoryRecordType,
  SchemaLocale,
  SiteLocale,
} from "./types.ts";
// @ts-ignore TS5097: the manifest generator runs these modules directly via Node type stripping.
import { assertValidContentRecord } from "./validators.ts";

export interface BuildContentManifestOptions {
  /** Default true. Disable only for isolated fixtures or staged migrations. */
  readonly validateReferences?: boolean;
}

export interface ContentRepositoryIntegrityIssue {
  readonly code: string;
  readonly record: string;
  readonly message: string;
}

export class ContentRepositoryIntegrityError extends Error {
  readonly issues: readonly ContentRepositoryIntegrityIssue[];

  constructor(issues: readonly ContentRepositoryIntegrityIssue[]) {
    super(
      `Content repository integrity check failed:\n${issues
        .map((item) => `- ${item.record} [${item.code}]: ${item.message}`)
        .join("\n")}`,
    );
    this.name = "ContentRepositoryIntegrityError";
    this.issues = issues;
  }
}

function recordId(record: ContentRecordEnvelope): string {
  return `${record.recordType}:${record.data.id}`;
}

function compareStrings(left: string, right: string): number {
  return left.localeCompare(right, "en");
}

function sortedUnique(values: readonly string[] | undefined): string[] {
  return [...new Set(values ?? [])].sort(compareStrings);
}

function buildRecordIndexes(records: readonly ContentRecordEnvelope[]) {
  const ids = new Map<RepositoryRecordType, Set<string>>();
  for (const record of records) {
    const typeIds = ids.get(record.recordType) ?? new Set<string>();
    typeIds.add(record.data.id);
    ids.set(record.recordType, typeIds);
  }
  return ids;
}

function hasId(
  indexes: Map<RepositoryRecordType, Set<string>>,
  recordType: RepositoryRecordType,
  id: string,
) {
  return indexes.get(recordType)?.has(id) ?? false;
}

function checkParentGraphCycles(
  graph: ReadonlyMap<string, readonly string[]>,
  recordType: "entity" | "content-node",
  issues: ContentRepositoryIntegrityIssue[],
) {
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const stack: string[] = [];
  const reported = new Set<string>();

  const visit = (id: string) => {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      const cycleStart = stack.indexOf(id);
      const cycle = [...stack.slice(cycleStart), id];
      const signature = [...new Set(cycle)].sort(compareStrings).join("|");
      if (!reported.has(signature)) {
        reported.add(signature);
        issues.push({
          code: "parent_cycle",
          record: `${recordType}:${id}`,
          message: `Parent graph contains a cycle: ${cycle.join(" -> ")}.`,
        });
      }
      return;
    }

    visiting.add(id);
    stack.push(id);
    for (const parentId of graph.get(id) ?? []) {
      if (graph.has(parentId)) visit(parentId);
    }
    stack.pop();
    visiting.delete(id);
    visited.add(id);
  };

  for (const id of [...graph.keys()].sort(compareStrings)) visit(id);
}

function checkReferences(records: readonly ContentRecordEnvelope[]) {
  const issues: ContentRepositoryIntegrityIssue[] = [];
  const indexes = buildRecordIndexes(records);
  const seenRecordIds = new Set<string>();
  const entityParents = new Map<string, readonly string[]>();
  const contentParents = new Map<string, readonly string[]>();

  const requireReference = (
    owner: string,
    recordType: RepositoryRecordType,
    id: string,
  ) => {
    if (!hasId(indexes, recordType, id)) {
      issues.push({
        code: "missing_reference",
        record: owner,
        message: `References missing ${recordType}:${id}.`,
      });
    }
  };

  for (const record of records) {
    const owner = recordId(record);
    if (seenRecordIds.has(owner)) {
      issues.push({
        code: "duplicate_record_id",
        record: owner,
        message: "Record type and id must be unique.",
      });
    }
    seenRecordIds.add(owner);

    if (record.recordType === "entity") {
      entityParents.set(record.data.id, record.data.parentEntityIds ?? []);
      for (const id of record.data.parentEntityIds ?? []) requireReference(owner, "entity", id);
      for (const id of record.data.relationIds ?? []) requireReference(owner, "relation", id);
      for (const id of record.data.factIds ?? []) requireReference(owner, "fact", id);
      for (const id of record.data.sourceIds) requireReference(owner, "source-snapshot", id);
    }

    if (record.recordType === "relation") {
      requireReference(owner, "entity", record.data.fromEntityId);
      requireReference(owner, "entity", record.data.toEntityId);
      for (const id of record.data.factIds ?? []) requireReference(owner, "fact", id);
      for (const id of record.data.sourceIds) requireReference(owner, "source-snapshot", id);
    }

    if (record.recordType === "content-node") {
      contentParents.set(
        record.data.id,
        record.data.parentContentId ? [record.data.parentContentId] : [],
      );
      for (const id of record.data.entityIds) requireReference(owner, "entity", id);
      for (const id of record.data.relationIds ?? []) requireReference(owner, "relation", id);
      for (const id of record.data.factIds ?? []) requireReference(owner, "fact", id);
      for (const id of record.data.sourceIds) requireReference(owner, "source-snapshot", id);
      for (const id of record.data.mediaIds ?? []) requireReference(owner, "media-asset", id);
      if (record.data.parentContentId) {
        requireReference(owner, "content-node", record.data.parentContentId);
      }
    }

    if (record.recordType === "fact") {
      for (const id of record.data.entityIds ?? []) requireReference(owner, "entity", id);
      for (const id of record.data.relationIds ?? []) requireReference(owner, "relation", id);
      for (const id of record.data.sourceIds) requireReference(owner, "source-snapshot", id);
    }

    if (record.recordType === "media-asset") {
      for (const id of record.data.sourceIds ?? []) {
        requireReference(owner, "source-snapshot", id);
      }
    }
  }

  checkParentGraphCycles(entityParents, "entity", issues);
  checkParentGraphCycles(contentParents, "content-node", issues);

  if (issues.length > 0) throw new ContentRepositoryIntegrityError(issues);
}

function buildAlternates(node: ContentNode) {
  const alternates: Partial<Record<HreflangCode | "x-default", string>> = {};
  const orderedLocales = (Object.keys(node.locales) as SchemaLocale[]).sort(compareStrings);
  for (const locale of orderedLocales) {
    const localeVersion = node.locales[locale];
    if (!localeVersion) continue;
    alternates[toHreflang(locale)] = localeVersion.path;
  }
  const fallback = node.locales.en?.path ?? node.locales[orderedLocales[0]]?.path;
  if (fallback) alternates["x-default"] = fallback;
  return alternates;
}

function entriesForNode(node: ContentNode): ContentManifestEntry[] {
  const alternates = buildAlternates(node);
  return (Object.keys(node.locales) as SchemaLocale[])
    .sort(compareStrings)
    .flatMap((schemaLocale) => {
      const localeVersion = node.locales[schemaLocale];
      if (!localeVersion) return [];
      const locale = schemaLocaleToSiteLocale[schemaLocale];
      const entry: ContentManifestEntry = {
        contentId: node.id,
        parentContentId: node.parentContentId ?? null,
        family: node.family,
        section: node.section,
        primaryIntent: node.primaryIntent,
        locale,
        schemaLocale,
        hreflang: toHreflang(schemaLocale),
        path: localeVersion.path,
        canonicalPath: localeVersion.path,
        alternates,
        title: localeVersion.title,
        description: localeVersion.description,
        h1: localeVersion.h1,
        bodyResource: localeVersion.bodyResource,
        searchTerms: sortedUnique(localeVersion.searchTerms),
        localizationStatus: localeVersion.localizationStatus,
        openGraphLocale: localeVersion.openGraphLocale ?? null,
        ctaId: localeVersion.ctaId ?? null,
        entityIds: sortedUnique(node.entityIds),
        relationIds: sortedUnique(node.relationIds),
        factIds: sortedUnique(node.factIds),
        sourceIds: sortedUnique(node.sourceIds),
        mediaIds: sortedUnique(node.mediaIds),
        schemaTypes: sortedUnique(node.schemaTypes),
        legacyAliases: sortedUnique(node.legacyAliases).filter(
          (alias) => siteLocaleForContentPath(alias) === locale,
        ),
        status: node.status,
        indexability: node.indexability,
        dates: node.dates ?? {},
        updatePolicy: node.updatePolicy,
      };
      return [entry];
    });
}

function checkManifestPaths(entries: readonly ContentManifestEntry[]) {
  const issues: ContentRepositoryIntegrityIssue[] = [];
  const ownersByPath = new Map<string, string>();
  for (const entry of entries) {
    const owner = `content-node:${entry.contentId}:${entry.schemaLocale}`;
    const canonicalOwner = ownersByPath.get(entry.path);
    if (canonicalOwner) {
      issues.push({
        code: "duplicate_path",
        record: owner,
        message: `Path ${entry.path} is already owned by ${canonicalOwner}.`,
      });
    } else {
      ownersByPath.set(entry.path, owner);
    }
  }

  for (const entry of entries) {
    const owner = `content-node:${entry.contentId}:${entry.schemaLocale}`;
    for (const alias of entry.legacyAliases) {
      const normalizedAlias = normalizeContentPath(entry.locale, alias);
      const existingOwner = ownersByPath.get(normalizedAlias);
      if (existingOwner && existingOwner !== owner) {
        issues.push({
          code: "alias_path_collision",
          record: owner,
          message: `Alias ${alias} collides with ${existingOwner}.`,
        });
      } else if (!existingOwner) {
        ownersByPath.set(normalizedAlias, owner);
      }
    }
  }
  if (issues.length > 0) throw new ContentRepositoryIntegrityError(issues);
}

export function buildContentManifest(
  inputRecords: readonly unknown[],
  options: BuildContentManifestOptions = {},
): ContentManifest {
  const records = inputRecords.map(assertValidContentRecord);
  if (options.validateReferences !== false) checkReferences(records);

  const entries = records
    .filter(
      (record): record is Extract<ContentRecordEnvelope, { readonly recordType: "content-node" }> =>
        record.recordType === "content-node",
    )
    .flatMap((record) => entriesForNode(record.data))
    .sort((left, right) =>
      compareStrings(left.path, right.path) ||
      compareStrings(left.contentId, right.contentId) ||
      compareStrings(left.schemaLocale, right.schemaLocale),
    );

  checkManifestPaths(entries);
  return {
    schemaVersion: CONTENT_SYSTEM_SCHEMA_VERSION,
    entries,
  };
}

export function getManifestEntryByPath(
  manifest: ContentManifest,
  locale: SiteLocale,
  path: string,
): ContentManifestEntry | undefined {
  const normalizedPath = normalizeContentPath(locale, path);
  return manifest.entries.find(
    (entry) =>
      entry.locale === locale &&
      (entry.path === normalizedPath ||
        entry.legacyAliases.some(
          (alias) => normalizeContentPath(locale, alias) === normalizedPath,
        )),
  );
}

export function getManifestEntriesBySection(
  manifest: ContentManifest,
  section: ContentManifestEntry["section"],
  locale?: SiteLocale,
): ContentManifestEntry[] {
  return manifest.entries.filter(
    (entry) => entry.section === section && (locale === undefined || entry.locale === locale),
  );
}

export function getManifestEntriesByEntity(
  manifest: ContentManifest,
  entityId: string,
  locale?: SiteLocale,
): ContentManifestEntry[] {
  return manifest.entries.filter(
    (entry) =>
      entry.entityIds.includes(entityId) && (locale === undefined || entry.locale === locale),
  );
}

export function getManifestEntriesByNodeId(
  manifest: ContentManifest,
  contentId: string,
): ContentManifestEntry[] {
  return manifest.entries.filter((entry) => entry.contentId === contentId);
}

export function getIndexableManifestEntries(
  manifest: ContentManifest,
  locale?: SiteLocale,
): ContentManifestEntry[] {
  return manifest.entries.filter(
    (entry) =>
      entry.status === "published" &&
      entry.indexability.index &&
      (locale === undefined || entry.locale === locale),
  );
}
