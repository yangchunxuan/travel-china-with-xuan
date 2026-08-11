# Homeground structured SEO minimum

**Status:** Design only — implementation gate is closed
**Owner:** Employee 8 / Tools, Data, Structured SEO
**Baseline:** `origin/main` at `6df1f55232d361c2bb30d030b2c6b04084cbfde2`
**Review state:** Central review required
**WIP limit:** One infrastructure pilot; no public tool, calculator, facet, or programmatic page

## 1. Decision and implementation gate

This minimum creates a verifiable join between editorial intent and the content that the runtime actually publishes. It does not create new public URLs.

Implementation is currently **NO-GO**. During this audit, Employee 7's worktree produced an untracked `docs/organic-growth/search-map.json`. The file changed repeatedly while it was being reviewed, so no transient working-tree hash is recorded as an authority. The latest observed revision declares `schemaVersion: "1.0.0"` and ends with `SEARCH MAP READY — CENTRAL APPROVAL REQUIRED`, but it is not committed or versioned and cannot yet be a build input.

The observed file is also not repository-reconcilable yet:

- none of its 20 published and 14 in-production existing-content rows has `candidateId`, `editorialStatus`, or `lastVerified`;
- its input audit is pinned to the previous `origin/main` commit `cd41fdf4ef326a2d1f0f5db8ca9a6cc623ca4a7f`; four rows it calls in-production are already published on the latest `origin/main`;
- eight of its 19 published article IDs and English canonical paths do not match any runtime guide ID/path on `origin/main`;
- it references 56 unique entities, of which 50 do not exist in the latest controlled entity records;
- it uses eight composite freshness strings such as `critical-before-launch-and-on-source-change`, not a separately controlled freshness class and cadence;
- the latest observed revision adds 18 candidates, 28 query/task ownership records, and six pool decisions, but every pool decision is `pool-approved-pending-central`, has `centralApprovalRequired: true`, and has `writerStartAuthorized: false`; none selects or authorizes Employee 8's single infrastructure pilot;
- row-level collection/entity assignments do not distinguish approved decisions from proposals.

The earlier provisional 19-guide assignment table in `docs/homeground-search-platform-phase-1-spec.md` is not a substitute. That document says its assignments still require body review. The new untracked Search Map is useful audit evidence, but it must be reconciled and centrally approved before it becomes an implementation authority.

Therefore this document is the only deliverable before the gate opens. No validator, registry, generator, adapter, sitemap, or test code may be changed until all of the following are true:

1. Employee 7 commits a versioned Search Map in the repository.
2. Every pilot row has an exact runtime `contentId` or proposed `candidateId` join key; a canonical-owner alias is stored separately.
3. The map distinguishes a reviewed decision from a proposal.
4. Its collection and entity IDs either resolve in the controlled registries below or appear in an explicit registry-change request.
5. The central reviewer selects exactly one pilot WIP and approves its mapping.

The Search Map does not need to migrate all 19 legacy guides. A single approved pilot row is enough to define the one allowed WIP, but it does not open implementation by itself. Central review must resolve every blocking item in section 13 and give an explicit GO.

## 2. Current-system audit

### 2.1 Runtime authority

- `content/generated/content-manifest.json` currently contains zero entries. It cannot be used as the coverage source.
- `tools/generate-content-manifest.mjs` only scans repository record folders. There are currently entity records but no page records for the runtime guides.
- The real runtime authority is `searchPlatformManifest` in `lib/searchPlatformManifest.ts`. It combines system nodes, nine section hubs, and guide adapter nodes.
- The Phase 0 baseline has 37 canonical content IDs, 103 locale entries, and 94 indexable locale entries.
- Latest `origin/main` adds four three-language independent guides. The current runtime projection is therefore 41 content IDs, 115 locale entries, and 106 indexable locale entries while the protected Phase 0 subset remains unchanged.
- A coverage inventory must therefore be derived from the runtime manifest and joined to controlled editorial metadata. It must not promote the empty committed manifest into a second runtime authority.

### 2.2 Missing structured fields

- `GuideEntry` and independent-guide `metadata.json` do not contain the minimum fields in section 4.
- `ContentNode` and `ContentManifestEntry` do not retain candidate, collection, primary-entity, or freshness decisions.
- The content-system validator checks ID shape and dates, but it has no product-level collection registry and cannot reject an unknown collection ID.
- Entity reference integrity exists when a complete repository graph is built, but the independent-guide generator does not currently validate entity membership.

### 2.3 Free-string and fallback risk

- Legacy `pillar`, `topics`, and `destinations` values remain free strings for compatibility.
- `guideEntities()` maps a short allowlist of destination strings and silently falls back to `country-china` when none resolve.
- That fallback is a rendering compatibility behavior, not a reviewed `primaryEntityId`. It must never be exported as an editorial decision.

### 2.4 Hub index risk

The earlier base commit indexed a section hub when every language had at least one child guide. Latest `origin/main` (`6df1f55`) has already replaced that count trigger with an explicit hard-coded `approvedSearchHubIds` set. A newly added guide can no longer index a review hub by itself.

The remaining minimum gap is governance and verifiability: the set is not a controlled registry record with `editorialStatus` and a resolvable approval reference, and the current coverage output cannot audit why an indexed Hub is approved. The implementation must formalize the current explicit state without reintroducing a child-count trigger.

The Phase 0 protected state currently contains:

| Section | Current locale entries | Current index state |
|---|---:|---|
| `explore` | 3 | index |
| `plan` | 3 | index |
| `transport` | 3 | index |
| `when-to-go` | 3 | noindex |
| `stay` | 3 | index |
| `essentials` | 3 | index |
| `culture` | 3 | noindex |
| `tools` | 3 | noindex |
| `services` | 3 | index |

The minimum must make those decisions explicit without changing the protected 18 indexable and 9 noindex hub entries.

### 2.5 Body parity gap

`assertStructuredPageBody()` validates one body and rejects duplicate block IDs inside it. The guide generator only checks whether each declared body file exists. It does not load the body or compare the ordered block IDs and types between languages.

### 2.6 Freshness and sitemap dates

- Legacy `sourceReviewedDate` is mapped to manifest `dates.lastReviewed`.
- The sitemap uses `dateModified`, then `datePublished`, then `lastReviewed` as its date source.
- The new `lastVerified` field is a factual/editorial verification date. It must not automatically become `dateModified` or sitemap `lastmod`.
- Build time, deployment time, file mtime, and inventory generation time are not content-change dates.

### 2.7 Search Map reconciliation snapshot

The observed untracked Search Map contains useful coverage hypotheses for 20 published identities and 14 remote-branch identities as of its older base commit. Its latest observed revision also includes 18 candidate hypotheses, 28 query/task ownership records, and six pool recommendations pending central approval. These are useful planning inputs, but they are not yet controlled registry decisions and none authorizes Employee 8's infrastructure pilot. Latest `origin/main` has since published these four entries that the map still labels in production: `beijing-where-to-stay-first-trip`, `china-high-speed-train-first-time-guide`, `china-in-october-golden-week-or-later`, and `how-to-pay-in-china-as-a-tourist`.

Eight published map IDs are canonical-owner names rather than the repository's current guide IDs, and their reported canonical paths are not present in the current runtime manifest:

- `china-240-hour-visa-free-transit`
- `do-canadian-citizens-need-visa-china-2026`
- `do-new-zealand-citizens-need-visa-china-2026`
- `do-uk-citizens-need-visa-china-2026`
- `do-you-need-tour-guide-in-china`
- `how-much-does-a-trip-to-china-cost-2026`
- `singapore-visa-free-china-30-days`
- `why-hotels-in-china-cheap-and-good-value`

The reconciled map must retain its useful canonical-owner concept but add the exact runtime `contentId`/path. It must not rename protected repository IDs or URLs as part of this infrastructure pilot.

## 3. Source-of-truth boundaries

The minimum uses three explicit authorities:

1. **Runtime publication:** `searchPlatformManifest` remains the authority for actual locale paths, runtime status, indexability, canonical paths, and sitemap eligibility.
2. **Controlled taxonomy:** collection, entity, and section-approval registries are the authority for allowed IDs and explicit index decisions.
3. **Editorial mapping:** independent-guide metadata, plus any future reviewed legacy sidecar, is the authority for candidate, primary collection/entity, freshness, and verification fields.

The generated coverage inventory is a read-only projection of those authorities. It is never edited by hand and never becomes a publication input.

Legacy compatibility fields remain readable, but they cannot silently populate reviewed structured SEO fields:

| Legacy field | Allowed use | Prohibited use |
|---|---|---|
| `destinations` | Existing UI tags and legacy adapter compatibility | Inventing `primaryEntityId` |
| `topics` | Existing guide labels | Creating a collection or entity ID |
| `pillar` | Existing guide grouping | Replacing `primaryCollectionId` |
| `sourceReviewedDate` | Legacy guide verification date with provenance | Updating `dateModified` automatically |

## 4. Minimum editorial metadata contract

The seven requested fields belong to the search-layer classification record. They are required in every new independent guide folder after the implementation gate opens. The 19 legacy guide objects are not made to carry them in this pilot.

```ts
type StructuredSeoEditorialStatus =
  | "provisional"
  | "approved"
  | "retired";

type FreshnessClass =
  | "static"
  | "low"
  | "medium"
  | "high"
  | "critical";

type IndexApprovalReference =
  | {
      readonly kind: "phase0-baseline";
      readonly path: "content/phase0-indexable-path-baseline.json";
      readonly sourceCommit: string;
    }
  | {
      readonly kind: "repository-record";
      readonly path: `content/editorial/index-approvals/${string}.json`;
      readonly sha256: string;
    };

interface StructuredSeoMinimumMetadata {
  readonly candidateId: string;
  readonly editorialStatus: StructuredSeoEditorialStatus;
  readonly primaryCollectionId: string | null;
  readonly primaryEntityId: string | null;
  readonly secondaryEntityIds: readonly string[];
  readonly freshnessClass: FreshnessClass | null;
  readonly lastVerified: string | null;

  // Index governance is separate from classification approval.
  readonly approvedForIndex: boolean;
  readonly indexApprovalRef: IndexApprovalReference | null;
}
```

`editorialStatus` is deliberately separate from the existing runtime `ContentStatus` (`draft`, `research`, `review`, `published`, `stale`, `archived`). It records whether the classification itself has been reviewed; it does not publish a page.

New independent guides store these fields in their folder metadata. If central review selects one of the 19 legacy guides as the sole pilot, its reviewed mapping lives at `content/structured-seo/legacy/<content-id>.json`. That sidecar is loaded by the same validator, candidate-uniqueness index, coverage join, and input-hash calculation. No sidecars are created for the other legacy guides.

```ts
interface LegacyStructuredSeoSidecar extends StructuredSeoMinimumMetadata {
  readonly schemaVersion: "1.0.0";
  readonly contentId: string;
  readonly guideId: string;
}
```

The filename, `contentId`, `guideId`, and runtime manifest join must agree exactly; aliases and canonical paths cannot stand in for that identity check.

### 4.1 `candidateId`

- Stable production identity for one proposed canonical page or one explicit update/merge action.
- Lowercase kebab-case and globally unique across independent-guide metadata and any future editorial candidate records.
- Shared by all language versions of the same canonical content item.
- Does not have to equal `guide.id` or `contentId`.
- One `candidateId` maps to at most one canonical `contentId` unless a separately reviewed split creates new candidate IDs.
- Inventory value for an unmigrated legacy guide is `null`; no synthetic ID is invented in this pilot.

### 4.2 `editorialStatus`

- `provisional`: classification is incomplete or awaits review. It cannot be approved for index.
- `approved`: collection, entity, and freshness decisions have been reviewed. This still does not imply runtime publication or index approval.
- `retired`: the mapping is no longer active. It cannot be approved for index.
- Any other string fails validation.

### 4.3 `primaryCollectionId`

- Exactly one controlled collection ID for an approved indexable guide.
- May be `null` while a new record is provisional.
- Must belong to the same first-level section as `search.section`.
- Must resolve in the collection registry in section 5.1.
- It classifies content only in this minimum. It does not create a collection route, breadcrumb parent, or indexable page.
- Unmigrated legacy guides remain `null` in the inventory.

### 4.4 `primaryEntityId`

- The single entity most responsible for the page's answer.
- May be `null` after an explicit reviewed decision that the page has no single responsible entity, including some tools or cross-entity decisions.
- Must resolve in the entity registry in section 5.2.
- Must not be inferred from the first legacy destination or the first runtime `entityIds` value.
- For a country-level or multi-city decision, the reviewed primary may legitimately be `country-china`; the generator never chooses it as a fallback.

### 4.5 `secondaryEntityIds`

- Controlled entity IDs materially covered by the page but not primary.
- Always an array, sorted by ID in generated output, with no duplicates.
- Must not contain `primaryEntityId`.
- Every value must resolve in the entity registry.
- Incidental mentions are excluded.
- An unmigrated legacy guide reports an empty array plus an unassigned warning; existing `entityIds` remain visible separately for audit.

### 4.6 `freshnessClass`

This reuses the content system's existing `Volatility` values instead of creating a second synonym taxonomy:

| Value | Meaning |
|---|---|
| `static` | The core answer rarely changes; verify on an explicit editorial event or manual review. |
| `low` | Slow-changing destination or planning guidance. |
| `medium` | Seasonal, operational, or market details need periodic review. |
| `high` | Timetables, booking rules, access, or fast-changing practical guidance. |
| `critical` | Entry eligibility, safety, or another decision where stale facts can materially harm the user. |

The field may be `null` only for provisional or unmigrated records. An approved published guide requires a value. It is not a promise of automatic refresh.

### 4.7 `lastVerified`

- A real calendar date in strict `YYYY-MM-DD` form, or `null` for a provisional/unmigrated record.
- The date on which the material claims were last checked against their declared sources.
- Impossible dates such as `2026-02-30`, timestamps, locale-formatted dates, and empty strings fail.
- It is never generated from the clock, commit date, file mtime, deployment date, or `dateModified`.
- Changing only `lastVerified` must not change page `dateModified` or sitemap `lastmod`.
- A new guide cannot become runtime `published` and `approvedForIndex:true` while this field is null.

### 4.8 Index approval companion fields

`approvedForIndex` is an explicit editorial decision, not an eligibility calculation. `indexApprovalRef` is a structured, resolvable reference to the reviewed repository record or locked baseline supporting that decision. An arbitrary non-empty string such as `"yes"` is invalid.

Repository approval paths use forward slashes, are relative to the repository root, and must match `content/editorial/index-approvals/<lowercase-kebab-id>.json`. Absolute paths, backslashes, empty segments, `.`/`..`, encoded traversal, and paths outside that allowlisted root fail. `sha256` is the lowercase 64-hex hash of the referenced bytes; Phase 0 `sourceCommit` is a full 40-hex commit.

Rules:

- New content defaults to `approvedForIndex:false`.
- Future tool and data pages always begin with `false` and need central value review before requesting `true`.
- `true` requires `editorialStatus:"approved"`, derived runtime `status:"published"`, a valid `indexApprovalRef`, a canonical URL, and successfully validated declared locale bodies.
- `provisional` or `retired` content with `true` fails.
- Passing a count, coverage, collection, or destination eligibility gate never writes this field.
- Subject to central review, existing protected pages may bootstrap an explicit decision from the reviewed Phase 0 baseline. Until that bootstrap is approved, the baseline proves historical protected state only; it is not an index-approval record. No reviewer name or date is fabricated.

Lite guide metadata has no `localizationStatus` field. In this minimum, declaring a locale means its body exists and passes body validation/parity. A future review-required locale state must be introduced as an explicit input before a validator can enforce it; the generator cannot infer one.

## 5. Controlled registries

### 5.1 Collection registry

The implementation target is `lib/searchPlatformCollections.ts`. It is a reviewed, finite registry. Guide metadata stores IDs only; it cannot append a collection.

```ts
interface StructuredSeoCollectionDefinition {
  readonly id: string;
  readonly section: SearchSectionId;
  readonly editorialStatus: StructuredSeoEditorialStatus;
  readonly workingLabel: string;
}
```

The minimum seeds the 27 provisional IDs already defined in the Phase 1 spec:

| Section | Controlled IDs |
|---|---|
| `explore` | `explore-regions-provinces`, `explore-cities-neighborhoods`, `explore-attractions-nature-heritage` |
| `plan` | `plan-trip-length-city-order`, `plan-traveller-theme-itineraries`, `plan-budget-pace-decisions` |
| `transport` | `transport-airports-rail-hubs`, `transport-city-pair-routes`, `transport-last-mile-transfers` |
| `when-to-go` | `timing-months-seasons`, `timing-holidays-crowds`, `timing-events-natural-calendar` |
| `stay` | `stay-city-areas`, `stay-hotel-types-scenic-bases`, `stay-access-foreign-guests` |
| `essentials` | `essentials-entry-transit`, `essentials-payments-connectivity`, `essentials-booking-registration-recovery` |
| `culture` | `culture-history-people-ideas`, `culture-regional-food`, `culture-festivals-arts-contemporary` |
| `tools` | `tools-route-time`, `tools-area-option-selectors`, `tools-maps-calculators-reference` |
| `services` | `services-guides-experiences`, `services-transfers-hotels-bookings`, `services-route-whole-trip` |

Every seed remains `provisional` until the Search Map audit supports retaining, splitting, or merging it. Registry existence creates no URL. This pilot does not build collection pages or public collection copy.

A new collection requires a reviewed registry change with a definition, owning section, non-synonym rationale, and working label. Three-language public labels are required only if a later, separately reviewed change proposes a public page. A guide branch cannot create a collection implicitly.

Content may reference a `provisional` collection for noindex classification work. `approvedForIndex:true` requires the referenced collection to be `approved`. A `retired` collection cannot receive new references and requires a separate reviewed migration for existing ones.

### 5.2 Entity registry

The existing validated entity records under `content/entities/**` remain the single entity authority. The current registry contains:

- `country-china`
- `city-beijing`
- `city-xian`
- `city-zhangjiajie`
- `city-shanghai`
- `city-chengdu`
- `city-guilin`

The minimum does not duplicate those IDs in another handwritten list. The guide validator loads the entity records through the repository loader, validates them, and constructs the membership set.

A Search Map entity not in this set requires a separate reviewed entity record before a guide may reference it. No destination string, page title, or path can create an entity automatically.

### 5.3 Section index-approval registry

The implementation target is a controlled section definition consumed by `buildSearchHubContentNodes()`:

```ts
interface SearchSectionDefinition {
  readonly id: SearchSectionId;
  readonly editorialStatus: StructuredSeoEditorialStatus;
  readonly approvedForIndex: boolean;
  readonly indexApprovalRef: IndexApprovalReference | null;
}
```

The following is a **proposed bootstrap pending central review**. It would preserve the reviewed Phase 0 state while moving the decision into explicit fields:

| Section | Proposed `editorialStatus` | Proposed `approvedForIndex` | Proposed approval reference |
|---|---|---:|---|
| `explore` | `approved` | true | `phase0-baseline:4e18043a3dd69d0050034bdd92ade40246bc6fc9` |
| `plan` | `approved` | true | `phase0-baseline:4e18043a3dd69d0050034bdd92ade40246bc6fc9` |
| `transport` | `approved` | true | `phase0-baseline:4e18043a3dd69d0050034bdd92ade40246bc6fc9` |
| `when-to-go` | `provisional` | false | null |
| `stay` | `approved` | true | `phase0-baseline:4e18043a3dd69d0050034bdd92ade40246bc6fc9` |
| `essentials` | `approved` | true | `phase0-baseline:4e18043a3dd69d0050034bdd92ade40246bc6fc9` |
| `culture` | `provisional` | false | null |
| `tools` | `provisional` | false | null |
| `services` | `approved` | true | `phase0-baseline:4e18043a3dd69d0050034bdd92ade40246bc6fc9` |

The source commit is the one already locked in `content/phase0-indexable-path-baseline.json`. If central review accepts this bootstrap, it must be referenced, not replaced with an invented reviewer identity. Before acceptance, none of the proposed `true` values is an implementation authority.

Child-guide counts remain eligibility evidence and may generate warnings. They are never the value written to `approvedForIndex`.

## 6. Validation contract

Validation has two layers so the content-system core does not depend on Homeground-specific collection IDs:

1. **Shape validation:** candidate ID pattern, editorial-status enum, entity/collection ID shape, array uniqueness, freshness enum, and strict date validation.
2. **Registry preflight:** collection and entity membership, collection/section agreement, cross-field index rules, and candidate uniqueness across every loaded structured metadata source.

The uniqueness index initially loads independent guide folders and reviewed legacy sidecars. If a future candidate store is added, it must join the same index before the system may continue claiming global uniqueness.

The independent-guide generator must reject, before writing generated files:

- unknown collection IDs (`unknown_collection`);
- unknown primary or secondary entity IDs (`unknown_entity`);
- unsupported editorial status (`invalid_editorial_status`);
- malformed or impossible `lastVerified` (`invalid_date`);
- duplicate `candidateId` (`duplicate_candidate_id`);
- duplicate secondary entities (`duplicate_secondary_entity`);
- a primary entity repeated in `secondaryEntityIds` (`primary_entity_repeated`);
- approved classification with a null collection, freshness class, or verification date (`incomplete_approved_metadata`); a reviewed null primary entity remains legal and visible;
- an approval reference whose file/hash or locked baseline commit cannot be resolved (`invalid_index_approval_reference`);
- an absolute, traversing, non-canonical, or non-allowlisted approval path (`unsafe_index_approval_path`);
- `approvedForIndex:true` without a valid approval reference (`missing_index_approval`);
- an index approval on provisional, retired, or derived-unpublished content (`invalid_index_approval_state`);
- an index approval that references a provisional or retired collection (`invalid_collection_state`);
- collection/section mismatch (`collection_section_mismatch`).

Shape validation runs on metadata. Runtime `status` and canonical-path assertions run after the adapter derives the `ContentNode`; neither is pretended to be available to the metadata parser.

Unknown legacy free strings remain tolerated only in the legacy compatibility path. They never normalize into approved structured fields, and the coverage inventory reports their classification source.

If central review later requires these fields inside `ContentNode` and the runtime manifest, implementation must use content schema `1.1.0` with `1.0.0` read compatibility. The fields must not be silently added to strict schema `1.0.0`. This minimum prefers a search-layer metadata join because it avoids a full schema migration and the prohibited 19-guide rewrite.

## 7. Read-only coverage inventory

The proposed artifact is:

```text
content/generated/coverage-inventory.json
```

It is deterministic generated output with a clear `DO NOT EDIT` contract. A generator writes it; a `--check` mode fails when it is missing or stale. Production code does not read it to decide indexability.

### 7.1 Input authorities

The generator joins:

- runtime `searchPlatformManifest` entries for actual content, locale, status, path, canonical, and indexability;
- independent-guide structured metadata where present;
- the optional sole reviewed legacy pilot sidecar under `content/structured-seo/legacy/`;
- the controlled collection, entity, and section registries;
- the Phase 0 baseline only as provenance for protected legacy index decisions, never as the list of current content.

`inSitemap` is computed from the canonical-path set returned by `getIndexableManifestEntries(searchPlatformManifest)`, the same selector used by `app/sitemap.ts`. The generator does not copy the filtering rule.

### 7.2 Required row

There is one row per runtime `(contentId, locale)` entry:

```ts
interface CoverageInventoryRow {
  readonly contentId: string;
  readonly guideId: string | null;
  readonly candidateId: string | null;
  readonly language: "en" | "zh" | "ko";
  readonly schemaLocale: "en" | "zh-Hans" | "ko";
  readonly status: ContentStatus;
  readonly editorialStatus: StructuredSeoEditorialStatus | null;
  readonly section: SearchSectionId;
  readonly primaryCollectionId: string | null;
  readonly primaryEntityId: string | null;
  readonly secondaryEntityIds: readonly string[];
  readonly runtimeEntityIds: readonly string[];
  readonly path: string;
  readonly canonicalPath: string;
  readonly freshnessClass: FreshnessClass | null;
  readonly lastVerified: string | null;
  readonly approvedForIndex: boolean | null;
  readonly indexApprovalRef: IndexApprovalReference | null;
  readonly inSitemap: boolean;
  readonly classificationSource:
    | "independent-metadata"
    | "reviewed-legacy-sidecar"
    | "section-registry"
    | "legacy-runtime-only"
    | "system-runtime-only";
}

interface CoverageInventoryWarning {
  readonly code:
    | "missing_candidate_id"
    | "missing_primary_collection"
    | "missing_primary_entity"
    | "missing_freshness"
    | "missing_verification_date"
    | "missing_explicit_index_approval"
    | "unresolved_collection"
    | "unresolved_entity"
    | "search_map_identity_mismatch";
  readonly contentId: string | null;
  readonly language: "en" | "zh" | "ko" | null;
  readonly field: string;
  readonly message: string;
}

interface CoverageInventory {
  readonly schemaVersion: "1.0.0";
  readonly inputHash: string;
  readonly rows: readonly CoverageInventoryRow[];
  readonly warnings: readonly CoverageInventoryWarning[];
}
```

This covers the requested content ID, language, status, section, collection, entity, path, verification date, and sitemap membership while preserving enough provenance to expose unreviewed data and audit the explicit approval behind an indexed result.

### 7.3 Null and legacy rules

- The 19 legacy guides are not bulk-migrated.
- Their unreviewed `candidateId`, `editorialStatus`, collection, and primary/secondary entity decisions remain `null`/empty.
- If central review selects one legacy guide as the sole pilot, one reviewed sidecar may provide its fields and uses `classificationSource:"reviewed-legacy-sidecar"`; the remaining 18 are untouched.
- `runtimeEntityIds` preserves what the current adapter exposes, so Employee 7 can compare it without mistaking it for a primary-entity decision.
- A legacy guide may use its existing `sourceReviewedDate` as `lastVerified` with `classificationSource:"legacy-runtime-only"` because that field already records source review. Hubs and system pages remain `null` unless they have an explicit equivalent; their fixed editorial dates are not treated as fact verification.
- `approvedForIndex` and `indexApprovalRef` are null when no explicit authority has been migrated. `inSitemap` still reports the runtime fact, and a deterministic `missing_explicit_index_approval` warning exposes the gap.
- Missing data generates inventory warnings; it is never guessed. Warnings sort by `code`, `contentId`, language order, and `field`, and their stable key is the concatenation of those four values.

### 7.4 Determinism

- Sort rows by `contentId`, language order (`en`, `zh`, `ko`), then `path`.
- Sort every ID array.
- Include `schemaVersion` and an input hash over sorted source bytes/records.
- Do not include an unpinned `generatedAt`, wall-clock value, absolute worktree path, file mtime, or platform-specific path separator.
- Identical inputs must produce byte-identical JSON.

On latest `origin/main`, the inventory must report 115 locale rows, 41 unique content IDs, and 106 rows with `inSitemap:true`. The protected Phase 0 subset must still report 103/37/94. Those are regression assertions, not a permanent publishing quota.

## 8. Structured body ID/type parity

For every `layout.mode:"template"` guide:

1. Load each body declared by metadata.
2. Run `assertStructuredPageBody()` on each body first.
3. Create an ordered signature of `{ id, type }` for every block.
4. Compare all present locales in canonical order: `en`, `zh`, `ko`.
5. Fail on a missing block, extra block, order change, duplicate ID, or same ID with a different type.

Text, list items, captions, table cells, and source labels may be localized and are not compared for equality.

The Lite workflow allows a guide to launch with fewer than three locales. A single present locale passes after normal body validation. When a second or third locale is declared, it must match the existing signature. Bespoke and unmigrated legacy bodies are outside this block-schema check.

The failure must name the guide, compared locales, first mismatching position, expected `{id,type}`, and actual value.

## 9. Hub, sitemap, and lastmod behavior

The corrected Hub decision is:

```text
objective child/copy checks pass
AND sectionRegistry.approvedForIndex is true
AND sectionRegistry.editorialStatus is approved
→ published + indexable

otherwise
→ review + noindex
```

Child count can make an approval invalid, but it can never create approval. A count change cannot edit the registry.

The independent-guide adapter has an equally explicit mapping. The 19 legacy adapter entries retain their protected Phase 0 behavior until individually migrated.

| Independent metadata | Derived runtime status | Derived indexability |
|---|---|---|
| `editorialStatus:"provisional"` | `review` | noindex, regardless of child/content count |
| `editorialStatus:"approved"`, `approvedForIndex:false` | `published` | noindex |
| `editorialStatus:"approved"`, valid `approvedForIndex:true` | `published` | index |
| `editorialStatus:"retired"` | `archived` | noindex |

An invalid true approval fails preflight; it is not silently downgraded. An independent guide with `approvedForIndex:false` must remain absent from the sitemap even when all three bodies exist.

The sitemap remains a consumer of the unified runtime manifest. It does not receive a second allowlist. This keeps page robots, runtime indexability, coverage `inSitemap`, and sitemap membership on one decision path.

SEO date rules:

- `lastVerified` records source/fact review only.
- `dateModified` changes only when visible body content, structured data, or important links materially change.
- sitemap `lastmod` uses `dateModified`, falling back only to `datePublished`.
- `lastReviewed`/`lastVerified` is never a sitemap fallback. `app/sitemap.ts` must remove its current `lastReviewed` fallback.
- An indexable entry without `dateModified` or `datePublished` fails preflight instead of receiving a generated date.
- Inventory generation and approval-field migration do not refresh `lastmod` by themselves.

Schema.org values remain descriptions of visible content. Registry types are not Google rich-result eligibility claims. The implementation must not create ratings, reviews, prices, inventory, opening hours, or other unsupported structured data.

## 10. Automated tests required after the gate opens

### 10.1 Validator tests

- every valid editorial status and freshness class passes;
- an unknown editorial status fails;
- unknown collection, primary entity, and secondary entity each fail;
- a collection in the wrong section fails;
- duplicate secondary entities and primary-in-secondary fail;
- malformed, impossible, and timestamp-form `lastVerified` fail;
- approved metadata with required null fields fails;
- an explicitly reviewed null primary entity passes without a fallback entity;
- provisional legacy-compatible null fields remain visible as null and are not invented;
- duplicate candidate IDs across independent folders and reviewed legacy sidecars fail;
- an unresolved approval path/hash or baseline commit fails;
- an index approval using a provisional/retired collection fails;
- all other invalid index-approval combinations fail.

### 10.2 Body parity tests

- three bodies with identical ordered ID/type signatures and different copy pass;
- missing, extra, reordered, and changed-type blocks fail;
- a valid single-language guide passes;
- the guide generator integration test exercises actual module loading, not only a helper fixture.

### 10.3 Coverage tests

- identical inputs produce byte-identical output and the same input hash;
- `--check` fails for missing or stale output;
- every `(contentId, language)` pair is unique;
- every `inSitemap` value equals membership in the shared indexable-entry selector;
- every indexed row exposes a verified approval reference or a deterministic missing-approval warning;
- latest `origin/main` is 115 rows, 41 content IDs, and 106 sitemap rows, while the protected Phase 0 subset remains 103/37/94;
- untranslated or translated locale rows do not inflate the canonical content count;
- unreviewed primary/collection/freshness values stay null;
- warning keys and warning order are byte-stable;
- the observed Search Map's mismatched IDs and unresolved entities surface as warnings rather than being normalized silently;
- no build clock or filesystem path appears in output.

### 10.4 Hub and sitemap tests

- three-language child coverage with `approvedForIndex:false` stays noindex;
- explicit approval plus eligibility can index;
- adding/removing children never flips the approval field;
- the initial registry preserves all Phase 0 protected hub statuses and paths;
- an independent provisional guide is review/noindex;
- an approved independent guide with `approvedForIndex:false` is published/noindex and absent from the sitemap;
- an approved independent guide with a valid true approval is published/indexable;
- a retired independent guide is archived/noindex;
- changing only `lastVerified` does not change sitemap `lastmod`;
- changing only `lastReviewed` does not change sitemap `lastmod`;
- an indexable entry without `dateModified` and `datePublished` fails preflight;
- future Tools/Data fixtures default to noindex.

### 10.5 Regression commands

After implementation, the minimum gate is:

```bash
npm run guide:generate
npm run guide:check
npm run content:check
npm run test:inquiry
npm run typecheck
npm run build
```

Any new coverage command must run before typecheck/build and expose both generate and stale-check modes. `tools/check-parallel-guide-merge.mjs` fixtures must also carry the new required independent-guide metadata.

## 11. Planned implementation surface

Subject to the Search Map gate, the minimum is expected to touch only:

- `lib/searchPlatformCollections.ts` — finite classification registry;
- a finite section approval registry consumed by the Hub adapter;
- a small search-layer structured metadata validator;
- `tools/generate-guide-registry.mjs` — metadata membership and body parity preflight;
- `lib/guideRegistry.ts` — optional legacy/new typing without migrating 19 objects;
- `lib/searchPlatformContentAdapter.ts` — explicit new-guide mapping and manual Hub approval;
- an optional `content/structured-seo/legacy/<content-id>.json` loader for the sole centrally selected legacy pilot;
- a deterministic coverage generator and `content/generated/coverage-inventory.json`;
- `app/sitemap.ts` — remove `lastReviewed` as a `lastmod` fallback while retaining the shared indexable selector;
- `package.json` scripts for generation/check;
- focused behavior tests under `supabase/tests/`.

## 12. Explicit exclusions

This minimum does not:

- migrate all 19 legacy guides;
- rewrite the Lite guide architecture;
- build a CMS;
- change the homepage, inquiry form, or commercial pages;
- create collection, entity, city-combination, tool, calculator, facet, or programmatic URLs;
- create internal links automatically;
- publish or deploy;
- infer demand from an empty coverage cell;
- treat a Schema.org type as a rich-result guarantee;
- fabricate ratings, reviews, price, availability, opening hours, inventory, or `lastmod`;
- allow the inventory to change indexability.

## 13. Central review checklist

Before coding begins, central review must answer:

1. What commit contains Employee 7's stable, versioned Search Map, and what reviewed hash identifies that committed input?
2. For the sole pilot, what exact runtime `contentId`/path or new `candidateId` resolves the Search Map identity?
3. Is that pilot's collection/entity mapping explicitly approved rather than proposed, and do all of its entity IDs have controlled records?
4. Does the Search Map accept the seven field meanings, null policy, and separate freshness/cadence treatment above?
5. Are the 27 collections retained as provisional internal IDs, with only the selected pilot's collection eligible for an approval-state change?
6. Is the existing entity-record repository the single entity registry?
7. May the reviewed Phase 0 baseline bootstrap the explicit approval reference for the six already-indexed section hubs?
8. Is the structured approval-reference format accepted for future index decisions?
9. Is a search-layer metadata join accepted for the minimum, with a full content-schema `1.1.0` migration deferred?

Until those questions are resolved, the only correct state is:

> **STRUCTURED SEO FOUNDATION — CENTRAL REVIEW REQUIRED**
