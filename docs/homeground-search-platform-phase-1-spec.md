# Homeground Search Platform Phase 1 Spec

**Status:** Draft for business-owner review
**Date:** 2026-08-10
**Depends on:** Phase 0 search-platform foundation
**Scope:** Information architecture, controlled collections, topic inventory, coverage governance, and the first production workflow
**Out of scope:** Automatic publishing, a general-purpose CMS, mass generation of destination/month combinations, and changes to the Homeground homepage

## 1. Executive decision

Phase 1 keeps the nine existing sections as the stable first level of the Homeground China information platform:

1. Explore China
2. Plan Your Trip
3. Getting Around
4. When to Go
5. Where to Stay
6. China Essentials
7. Food & Culture
8. Tools
9. Travel Services

The nine sections are sufficient for first-level user navigation. They are not sufficient for topic selection, large-scale production, or coverage control.

Phase 1 therefore adds:

- 27 provisional second-level collection candidates, audited before public approval;
- destination, attraction, route, month, traveller and practical-topic entities as orthogonal dimensions;
- a controlled topic registry;
- a repository-backed topic candidate and source-pack workflow;
- a generated coverage inventory;
- evidence-based topic assessment and cannibalization checks;
- user-facing collection grouping and destination entry points;
- publication gates that prevent empty taxonomy pages from entering the index.

Phase 1 does **not** impose a permanent destination quota or a special Zhangjiajie ban. Zhangjiajie is the current example of a broader failure mode: AI selected new work from recent conversational context rather than from an independently governed opportunity set.

The replacement rule is:

> Every candidate topic competes on verified demand, task clarity, information gain, source readiness, network value and Homeground advantage. Concentration triggers review; it does not automatically block a destination.

## 2. Problem statement

### 2.1 User-facing problem

The Phase 0 guide system can show nine sections, but the current experience remains close to a flat article list:

- the nine sections are presented as a horizontal local navigation;
- a section is not yet organized into stable subtopics;
- destination content is not yet gathered into destination hubs;
- a growing section would eventually become an undifferentiated stream of articles;
- empty and mature sections cannot yet express different levels of depth elegantly.

At 19 guides this is manageable. At hundreds or thousands of pages it is not.

### 2.2 Editorial problem

The current workflow often asks an AI to decide “what should we write next?” inside the same conversation that produced the previous article. The AI therefore treats recently mentioned entities as high-probability continuations.

This creates several risks:

- one destination is overrepresented without a business or search justification;
- the next topic is chosen because it is nearby in context, not because it is the best opportunity;
- similar structures and conclusions are repeated;
- apparent topic clusters form accidentally rather than deliberately;
- important gaps in other cities and content tasks remain invisible;
- three translations can be mistaken for three separate pieces of coverage.

### 2.3 Technical problem

Phase 0 already provides a strong base:

- `section`;
- `family`;
- `primaryIntent`;
- `entityIds`;
- `relationIds`;
- `factIds`;
- `sourceIds`;
- `updatePolicy`;
- `parentContentId` validation in source nodes.

However, Phase 0 remains transitional:

- `parentContentId` is not retained in the runtime manifest;
- the new manifest has no controlled `topicIds`;
- legacy guide topics and markets are not fully carried into the new content system;
- section pages query only by first-level section;
- there is no runtime collection query;
- there is no derived coverage inventory;
- there is no governed candidate queue;
- existing article components remain the source of rendered guide content.

Phase 1 must fill these gaps without replacing the current article rendering system.

## 3. Architecture principles

### 3.1 Separate the reader map from the production map

Readers need a small, stable set of understandable entrances. Production agents need much finer coordinates.

The reader sees:

```text
Guides
├── Nine first-level sections
├── Second-level collections when useful
├── Destination hubs when mature
└── Individual guides and tools
```

The production system sees:

```text
section
× collection
× primary entity
× secondary entities
× relationship
× user intent
× content family
× traveller type
× market / locale
× volatility
× query cluster
```

These dimensions must not be collapsed into one giant navigation tree.

### 3.2 One primary editorial path, many discovery paths

Every indexable content page has:

- one primary section;
- one primary collection;
- one canonical URL;
- one breadcrumb hierarchy;
- zero or more entities, relations and topics.

The same page may be discovered from a city hub, traveller-type page, related article or tool, but it does not acquire multiple canonical parents.

Example:

```text
Primary path:
Guides → Where to Stay → City Stay Areas → Where to Stay in Beijing

Additional discovery:
Beijing destination hub
First China Trip topic
Beijing Airport transfer guide
```

### 3.3 Entities are not subcategories

Beijing is a city entity, not a child category of only “Explore China”. It may connect to planning, transport, timing, stay, culture, essentials and services.

Likewise:

- January is a `month-season` entity;
- older travellers are a `traveler-type` entity;
- Beijing–Shanghai is a route entity or a relation;
- the Forbidden City is an attraction or heritage entity;
- “best for families” is a relation, not a folder;
- payment is a practical topic, not necessarily a public taxonomy page.

### 3.4 Taxonomy existence does not imply an indexable URL

A collection, entity or topic may exist internally before it deserves a public search page.

No page is made indexable merely because a data combination exists.

### 3.5 AI may accelerate production, not remove editorial gates

The production ceiling is determined by:

- evidence quality;
- distinct user tasks;
- information gain;
- factual verification;
- cannibalization control;
- page usefulness;
- maintenance capacity.

It is not determined by how many drafts an AI can generate in a day.

## 4. Public information architecture

The nine section IDs remain stable taxonomy. They do not have to receive equal visual weight on every public page.

The public presentation separates three jobs:

- seven knowledge areas: Explore, Plan, Transport, Timing, Stay, Essentials and Culture;
- Tools as a utility band;
- Services as an assistance band displayed publicly as **Using Local Help**, not as a second product-navigation label that competes with the existing `Trip planning services` navigation.

All nine remain discoverable. The grouping prevents empty tools or commercial guidance from being presented as if they were the same type of choice as destination knowledge.

## 4.1 `/guides/` index

### Page goal

Within 5–10 seconds a visitor should understand:

1. which kind of question to start with;
2. whether a mature destination hub exists;
3. how to find a specific published guide.

### Desktop composition

1. H1 and a two-line maximum introduction;
2. metadata guide search when the search implementation in section 4.7 is complete;
3. seven knowledge-area cards;
4. a separate Tools utility band;
5. a separate Using Local Help assistance band;
6. destination entry points only after the destination module gate is met;
7. conditional editorial modules;
8. the existing global trip-brief CTA remains available without becoming the information index’s main subject.

Each knowledge-area card contains:

- section name;
- one short boundary statement;
- current published-guide count;
- a link only when the target offers a useful page.

The page must not use:

- large 01–09 numbers;
- nine unrelated hero photographs;
- horizontal scrolling as the only discovery mechanism;
- a disabled-looking card that secretly opens an empty page;
- article volume alone to determine prominence.

### Empty-section behaviour

- An empty taxonomy area remains visible in `Browse topics` so the platform map is honest.
- It has no arrow or page link until a useful noindex preview exists.
- If a reviewed noindex preview exists, the label must state that the section is being built.
- Empty pages never appear in the sitemap.

### Mobile composition

Use a one-column compact list for the seven knowledge areas, followed by distinct Tools and Using Local Help rows. Do not require horizontal swiping to discover a core section.

Each active row contains:

- section name;
- short description;
- article count;
- arrow;
- a comfortable touch target.

### Conditional modules

- `Recently updated` requires at least three eligible pages with meaningful content changes, not merely deployment timestamps.
- `Essential first-trip guides` requires at least three editor-approved pages.
- `Tools` appears in its dedicated band when at least one published tool exists.
- Phase 1 does not label anything `Popular` until enough real usage data exists; use `Editor’s starting points` instead.
- A generic destination grid requires at least three mature destination hubs. With one or two hubs, use a clearly labelled editorial feature or hide the module.

These modules are editorial selections, not taxonomy levels.

## 4.2 First-level section pages

Each first-level page is a navigation hub, not a chronological archive.

Required structure:

1. breadcrumb;
2. section H1;
3. a clear boundary statement;
4. an editor-approved starting point when one exists;
5. content grouped by provisional or approved second-level collections;
6. representative guides within each group;
7. related sections, entities and tools;
8. a light assistance handoff where relevant.

Phase 1 preserves the indexability of the first-level hubs created by Phase 0. It does not silently deindex an existing hub solely because it has fewer than three guides.

For a first-level section that has never been approved for indexing:

- default to `review/noindex`;
- require reviewed original copy and a useful navigation purpose;
- use three independent guides as a review signal, not an automatic rule;
- require explicit `approvedForIndex` before it enters the sitemap.

The pre-Phase-0 set in `content/legacy-indexable-path-baseline.json` continues protecting legacy pages. Before Phase 1 changes indexability, generate and review `content/phase0-indexable-path-baseline.json` containing the exact Phase 0 indexable path and indexability set for system, guide and hub entries. Phase 0 hub URLs are then protected by an explicit snapshot rather than an assumption; any removal requires a recorded migration decision.

## 4.3 Second-level collection pages

A collection helps users browse a coherent class of questions. Phase 1 uses the current root-level section path rather than inventing a parallel `/guides/<section>/` hierarchy.

Examples:

```text
/transport/city-pair-routes/
/plan/trip-length-city-order/
/essentials/entry-transit/
/zh/transport/city-pair-routes/
/ko/transport/city-pair-routes/
```

The `id` is globally unique. The `slug` is only the final segment inside its section, for example `city-pair-routes`.

Collection nodes default to `review/noindex`. A separate eligibility report evaluates:

- at least three independent, indexable articles whose `primaryCollectionId` equals the collection ID across every locale the collection publishes;
- reviewed collection copy;
- a distinct user purpose;
- no material overlap with another collection;
- a credible editorial path beyond a temporary two-page grouping.

Indexing is never enabled automatically. An editor requests `publicationMode: "public-index"`, and validation rejects it when the objective eligibility checks fail.

Because Phase 1 defers locale-level indexability, a collection can be indexed only when all of its provided locales pass the gate. Otherwise the whole collection remains noindex while valid child guides keep their existing indexability.

Collection lists remain crawlable through standard links. Search, client-side filters and infinite scroll cannot be the only route to a guide.

Collection eligibility, coverage and classification always count by `article.primaryCollectionId === collection.id`, not by public `parentContentId`. The latter only represents the public navigation tree. An internal collection with three qualifying articles can therefore become eligible before it has a public node.

## 4.4 Destination directory

Phase 1 reserves:

```text
/destinations/
/zh/destinations/
/ko/destinations/
```

The directory groups approved hubs by region, province and entity type. It contains only entities with a useful destination page; incidental place mentions do not create directory entries.

The directory remains a noindex prototype until at least three destination hubs have passed review. Before that point `/guides/` may show one clearly labelled featured destination, but must not present it as a complete destination directory.

The generic query responsibility rule is:

> The destination entity hub owns the broad `X travel guide` intent. Explore collections organize regions, city choice, neighbourhoods, attractions and experiences; they do not create a second generic `X Travel Guide` page.

## 4.5 Destination entity hubs

Destination hubs cross the nine sections.

Paths:

```text
/destinations/beijing/
/destinations/shanghai/
/destinations/zhangjiajie/
```

Phase 1 may build noindex destination prototypes. A hub becomes indexable only after explicit approval and one of these evidence gates:

### Gate A

- one reviewed destination overview;
- at least three qualifying supporting guides;
- at least two first-level sections represented.

### Gate B

- at least five qualifying supporting guides;
- at least three first-level sections represented;
- an independently written destination summary.

`entityIds` alone do not qualify an article as destination support. A guide qualifies when the destination is its `primaryEntityId` or appears in its explicit reviewed `servesEntityIds`. This content-to-entity field is separate from entity-to-entity relations. It prevents multi-city articles from inflating every city hub.

A place name appearing once never creates a public destination page.

The destination renderer supports these modules, but renders only modules backed by content and verified data:

1. identity and concise summary;
2. region/province relationship;
3. why visit and primary experiences;
4. how many days and route role;
5. getting there and around;
6. when to go;
7. where to stay;
8. practical essentials;
9. food and culture;
10. nearby or connected destinations;
11. relevant assistance.

Phase 1 does not fabricate all modules for currently sparse entities.

## 4.6 Article-page participation

Metadata migration alone is not enough. Phase 1B introduces a shared article local-navigation component and connects each existing guide component to it without rewriting article body copy.

Every migrated article must show:

- one primary breadcrumb path: `Guides → Section → Collection → Article` when the collection has a public manifest entry, otherwise `Guides → Section → Article`;
- a link to its primary collection only when that public route exists; an internal collection may appear as a non-clickable classification label but never as a broken link;
- a link to its primary destination when an approved hub exists;
- adjacent tasks selected for intent complementarity, not merely shared city name;
- reviewed/verified date for high-volatility subjects;
- a return path to All Guides.

This is an allowed shared-shell change. The migration restriction applies to article facts, titles, canonicals and body copy, not to shared navigation.

## 4.7 Minimum guide search

Phase 1 implements metadata search rather than body full-text search.

Search covers published, indexable guide entries emitted by `buildGuideSearchDocuments()` for the current locale. Tools, system pages, section/collection/destination hubs and service pages are outside the Phase 1 search corpus.

Guide documents use:

- title;
- H1;
- description;
- approved search terms;
- entity names and aliases;
- collection labels.

Search results use a noindex GET route:

```text
/guides/search/?q=...
/zh/guides/search/?q=...
/ko/guides/search/?q=...
```

Requirements:

- a useful empty state;
- locale-aware normalization;
- no result generation for arbitrary crawlable query URLs in the sitemap;
- ordinary links in every result;
- metadata search is not the only path to an indexable guide.

Body full-text indexing, fuzzy semantic search and a hosted search service remain deferred.

If metadata search is not implemented in the same release, no inert search box may be displayed.

## 4.8 Local navigation

All Guides pages provide one-operation access to:

- All Guides;
- Browse Topics;
- Destinations when the directory is active;
- Search when metadata search is active;
- the current breadcrumb path.

On mobile, use an accessible disclosure or sheet rather than nine horizontal chips. Focus returns to the trigger after closing.

## 5. Controlled second-level collections

Phase 1 begins with 27 **provisional internal collection IDs** seeded from the three existing scope statements under each Phase 0 section.

They organize migration and the initial candidate audit; they are not automatically permanent public URLs. Before any collection receives an indexable page, the 50–60 candidate pilot must test whether its user-task boundary is coherent. A collection may then be approved, split or merged without changing existing article URLs.

Different sections may ultimately have different collection depth. The system does not preserve “exactly three per section” merely for visual symmetry.

### 5.1 Explore China

| ID | Working label | Boundary |
|---|---|---|
| `explore-regions-provinces` | Regions & Provinces | Geographic orientation above the city level |
| `explore-cities-neighborhoods` | Cities & Neighbourhoods | Cities, districts, streets, ancient towns and urban areas |
| `explore-attractions-nature-heritage` | Attractions, Nature & Heritage | Sights, landscapes, heritage sites and visitor experiences |

### 5.2 Plan Your Trip

| ID | Working label | Boundary |
|---|---|---|
| `plan-trip-length-city-order` | Trip Length & City Order | Number of days, route sequence and city combinations |
| `plan-traveller-theme-itineraries` | Traveller & Theme Itineraries | Families, older travellers, first trips and thematic journeys |
| `plan-budget-pace-decisions` | Budget, Pace & Trade-offs | Cost, route pressure, rest, depth and what to remove |

### 5.3 Getting Around

| ID | Working label | Boundary |
|---|---|---|
| `transport-airports-rail-hubs` | Airports & Rail Hubs | Airports, stations, terminals and hub orientation |
| `transport-city-pair-routes` | City-pair Routes | Door-to-door choices between two or more places |
| `transport-last-mile-transfers` | Local & Last-mile Transfers | Airport, station, hotel, city and attraction connections |

### 5.4 When to Go

| ID | Working label | Boundary |
|---|---|---|
| `timing-months-seasons` | Months & Seasons | Timing questions where conditions materially alter the trip |
| `timing-holidays-crowds` | Holidays & Crowd Pressure | Public holidays, closures, crowding and booking pressure |
| `timing-events-natural-calendar` | Events & Natural Calendar | Festivals, flowers, snow, water levels and time-bound experiences |

### 5.5 Where to Stay

| ID | Working label | Boundary |
|---|---|---|
| `stay-city-areas` | City Stay Areas | Choosing a practical neighbourhood or urban base |
| `stay-hotel-types-scenic-bases` | Hotel Types & Scenic Bases | Hotels, guesthouses, homestays and scenic-zone bases |
| `stay-access-foreign-guests` | Access & Foreign-guest Fit | Transport access, passport acceptance and traveller-specific fit |

### 5.6 China Essentials

| ID | Working label | Boundary |
|---|---|---|
| `essentials-entry-transit` | Entry & Transit | Visa, waiver, transit and arrival eligibility tasks |
| `essentials-payments-connectivity` | Payments & Connectivity | Payments, apps, SIM, internet and account setup |
| `essentials-booking-registration-recovery` | Booking & Problem Recovery | Tickets, registration, reservations and in-trip recovery |

### 5.7 Food & Culture

| ID | Working label | Boundary |
|---|---|---|
| `culture-history-people-ideas` | History, People & Ideas | Historical periods, people, belief and ideas |
| `culture-regional-food` | Regional Food | Cuisines, dishes, dining practices and food geography |
| `culture-festivals-arts-contemporary` | Festivals, Arts & Contemporary China | Festivals, architecture, arts and present-day life |

### 5.8 Tools

| ID | Working label | Boundary |
|---|---|---|
| `tools-route-time` | Route & Time Checks | Route pressure, transfer time and itinerary checks |
| `tools-area-option-selectors` | Area & Option Selectors | Guided selection of stays, routes and travel options |
| `tools-maps-calculators-reference` | Maps, Calculators & Reference | Structured lookup, maps, calculations and reusable reference |

### 5.9 Travel Services

| ID | Working label | Boundary |
|---|---|---|
| `services-guides-experiences` | Guides & Local Experiences | Private guides, interpretation and local experiences |
| `services-transfers-hotels-bookings` | Transfers, Stays & Booking Support | Arranged transfers, stay sourcing and booking assistance |
| `services-route-whole-trip` | Route & Whole-trip Support | Route design and whole-trip coordination |

## 6. Controlled topics and orthogonal dimensions

## 6.1 Initial topic registry

Phase 1 migrates the existing controlled guide topics without renaming them during the technical migration:

- `itinerary-design`
- `pace`
- `transport`
- `attractions`
- `evenings`
- `trip-planning`
- `on-the-ground`
- `accommodation`

Topics must come from a registry. AI agents cannot create arbitrary free-text topic IDs.

The broad `trip-planning` topic may be split later through a separate editorial migration.

## 6.2 New topic promotion rule

A new topic ID requires:

- a written definition;
- allowed sections;
- a reason it is not an existing synonym;
- at least two credible candidate pages or one strategic tool/entity use;
- owner approval;
- three-language display labels when public.

Creating a topic ID does not create a URL.

## 6.3 Market and localization

English, Chinese and Korean versions of the same page are one topic record, not three pieces of coverage.

A market-specific page is justified only when at least one of these materially differs:

- law or entry eligibility;
- transport gateway;
- payment access;
- search intent;
- language-specific task;
- traveller behaviour supported by evidence;
- route constraint;
- available Homeground service.

Changing only nationality, city name or language does not create a new independent topic.

## 7. Data contract changes

## 7.1 Search section registry

Replace copy-only section configuration with a controlled definition:

```ts
interface SearchSectionDefinition {
  id: SearchSectionId;
  order: number;
  editorialStatus: "provisional" | "approved" | "retired";
  approvedForIndex: boolean;
  reviewedBy: string | null;
  reviewedAt: string | null;
  copy: Record<HomegroundLocale, SearchSectionCopy>;
}
```

Phase 0 hub indexability is migrated explicitly into this registry. The hub builder derives status/indexability from this definition; guide count alone never flips it. Newly proposed sections default to noindex until approved.

## 7.2 Collection registry

Add `lib/searchPlatformCollections.ts` with a controlled definition:

```ts
interface SearchCollectionDefinition {
  id: SearchCollectionId;
  section: SearchSectionId;
  slug: string;
  order: number;
  editorialStatus: "provisional" | "approved" | "retired";
  publicationMode: "internal" | "public-noindex" | "public-index";
  reviewedBy: string | null;
  reviewedAt: string | null;
  copy: Record<
    HomegroundLocale,
    {
      label: string;
      title: string;
      description: string;
      h1: string;
      introduction: string;
    }
  >;
}
```

The registry does not store article counts or child arrays. Those values are derived from the manifest.

`publicationMode` is an explicit editorial decision:

- `internal`: participates in classification and parent relationships but creates no public manifest entry or route;
- `public-noindex`: creates a route with `index:false` and never enters the sitemap;
- `public-index`: allowed only after the eligibility gate passes; creates a published/indexable entry and may enter the sitemap.

The generated eligibility report supplies objective evidence, and the validator prevents `public-index` when required conditions are not met. Indexability never toggles automatically because a count changes.

## 7.3 Destination hub and directory registries

Destination URLs have one state authority:

```ts
interface DestinationHubDefinition {
  entityId: string;
  slug: string;
  editorialStatus: "provisional" | "approved" | "retired";
  publicationMode: "internal" | "public-noindex" | "public-index";
  overviewContentId: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  copy: Record<
    HomegroundLocale,
    { title: string; description: string; h1: string; summary: string }
  >;
}

interface DestinationDirectoryDefinition {
  publicationMode: "internal" | "public-noindex" | "public-index";
  reviewedBy: string | null;
  reviewedAt: string | null;
  copy: Record<HomegroundLocale, { title: string; description: string; h1: string; introduction: string }>;
}
```

`entityId` uniquely owns `/destinations/<slug>/`; duplicate entity or normalized slug ownership fails preflight. `buildDestinationHubContentNodes()` and `buildDestinationDirectoryContentNode()` consume a single `DestinationEligibilityResult` used by validator, manifest and sitemap.

Hub eligibility is evaluated per locale. A qualifying support guide is published, indexable, available in that locale, connected by `primaryEntityId/servesEntityIds`, and deduplicated by canonical `contentId`.

- Gate A means `overviewContentId` references a separate, reviewed destination-overview page plus at least three qualifying support guides across two sections.
- Gate B means the hub’s own `summary` is independently written/reviewed, with at least five qualifying support guides across three sections; it does not require a separate overview page.

Passing a gate only creates eligibility. The editor must still set `public-index`; no count automatically indexes a hub. Likewise, three approved indexable hubs make the directory eligible but do not publish or index it automatically. Because locale-specific indexability is deferred, every provided locale must pass before the whole destination hub/directory can be public-index.

Registry validators enforce these cross-field invariants:

| Record | Legal combinations |
|---|---|
| Section `provisional` | `approvedForIndex:false` |
| Section `approved` | index true or false; reviewer and review time required |
| Section `retired` | `approvedForIndex:false` |
| Collection/Destination `provisional` | `publicationMode:internal` |
| Collection/Destination `approved` | any publication mode; public modes require reviewer and review time |
| Collection/Destination `retired` | `publicationMode:internal`; redirects require a separate reviewed migration record |
| Directory public mode | reviewer and review time required |

Every illegal combination has a negative validator fixture.

## 7.4 Content node and manifest

Reuse `ContentNode.parentContentId`.

Add to runtime manifest entries:

```ts
readonly parentContentId: string | null;
readonly primaryCollectionId: string | null;
readonly topicIds: readonly string[];
readonly primaryEntityId: string | null;
readonly servesEntityIds: readonly string[];
readonly originCandidateId: string | null;
```

Add optional topic and primary-entity fields to source nodes:

```ts
readonly primaryCollectionId?: string | null;
readonly topicIds?: readonly string[];
readonly primaryEntityId?: string | null;
readonly servesEntityIds?: readonly string[];
readonly originCandidateId?: string | null;
```

The content-system core validates IDs as strings and relationships. The Search Platform layer validates `primaryCollectionId` and `topicIds` against controlled registries so the core package does not depend on product-specific `SearchCollectionId` or `SearchTopicId` types.

`primaryEntityId`, when present, must also appear in `entityIds`. Remaining `entityIds` are secondary or contextual entities. Every `servesEntityIds` value must resolve to an entity and must also appear in `entityIds`. Destination hub support uses `primaryEntityId` or reviewed `servesEntityIds`, never mere entity mention. `relationIds` remain entity-to-entity relations.

Backward-compatible defaults:

```text
parentContentId: null
primaryCollectionId: null
topicIds: []
primaryEntityId: null
servesEntityIds: []
originCandidateId: null
```

Phase 1 introduces schema version `1.1.0` for records using the new fields while retaining read compatibility with `1.0.0`. Existing entity and legacy records do not need a bulk rewrite. Validators must accept both versions and normalize missing additive fields to the defaults above.

```ts
const SUPPORTED_SCHEMA_VERSIONS = ["1.0.0", "1.1.0"] as const;
const LATEST_SCHEMA_VERSION = "1.1.0" as const;
```

`validateContentRecord()` first validates the envelope against the declared version, rejects 1.1-only fields inside a 1.0 record, and returns `NormalizedContentRecordV1_1`. New adapter-generated guide records use 1.1.0. The final runtime/generated manifest always declares 1.1.0 even when some source records remain 1.0.0.

## 7.5 Collection nodes

Approved public collections are represented as ordinary content nodes rather than adding a new repository record type. Internal collections remain registry definitions that may be referenced as editorial parents but are omitted from public manifest entries and routes.

Example:

```ts
{
  id: "collection-plan-trip-length-city-order",
  family: "entity",
  section: "plan",
  parentContentId: "hub-plan",
  status: "review",
  indexability: {
    index: false,
    follow: true,
    blockReason: "Collection has not passed publication review."
  }
}
```

Using `family: "entity"` for a public collection is an explicitly transitional choice. It must not be interpreted as saying the collection itself is a geographic entity. A later schema version may add a dedicated hub family if real rendering needs justify it.

An article classified in that collection always uses:

```text
primaryCollectionId: plan-trip-length-city-order
```

Its public `parentContentId` is `collection-plan-trip-length-city-order` only when that collection has a public manifest entry. While the collection is internal, the public parent remains `hub-plan`. The controlled collection ID therefore survives migration without creating a fake route or a broken reference.

Add `buildSearchCollectionContentNodes()` for `public-noindex/public-index` definitions and build the runtime graph atomically in the preflight order below. Internal definitions classify articles through `primaryCollectionId` but are not public nodes:

```text
read and normalize 1.0/1.1 records
→ construct system, nine section, public collection and article nodes with collections forced noindex
→ validate public references and editorial parent IDs, then run cycle checks
→ compute CollectionEligibilityResult directly from the normalized node graph
→ validate requested publicationMode against the same eligibility result
→ map publicationMode to the single authoritative node status/indexability
→ generate the final 1.1.0 runtime manifest and eligibility report
```

The preflight graph, eligibility report and final manifest use the same `CollectionEligibilityResult`; eligibility is not derived from the final manifest and then fed backwards into validation.

The status mapping is unique:

```text
internal       → no public ContentManifestEntry
public-noindex → status: review, index: false
public-index   → status: published, index: true (only when eligible)
```

An article may store an internal collection in `primaryCollectionId`. Its public breadcrumb links the collection only when a public collection manifest entry exists; otherwise it falls back to `Guides → Section → Article`. A request for an internal collection route returns 404.

Phase 1 continues using the runtime adapter as the rendering source of truth. `content/generated/content-manifest.json` remains a validated repository artifact but does not silently become a second runtime authority. A later migration may switch runtime ownership in one explicit release.

## 7.6 Required query methods

Content-system queries:

```ts
getManifestEntriesByParent(manifest, parentContentId, locale?)
getManifestEntriesByTopic(manifest, topicId, locale?)
getManifestEntriesByPrimaryEntity(manifest, entityId, locale?)
```

Search-platform queries:

```ts
getCollectionDefinitionsBySection(section)       // every internal/public definition
getPublicCollectionEntriesBySection(section, locale) // public-noindex + public-index
getSearchCollectionEntry(collectionId, locale)   // public entry only
getPublishedCollectionGuides(collectionId, locale)
getIndexableCollectionGuideCount(collectionId, locale) // eligibility, unique contentId
getCollectionCoverageRecords(collectionId, locale?)    // review/draft/published
getSearchCoverageInventory(locale?)
getDestinationSupportingGuides(entityId, locale)
buildGuideSearchDocuments(manifest, entityRegistry, collectionRegistry)
searchGuideDocuments(documents, query, locale)
```

Guide search documents join manifest guide entries with locale-specific entity names/aliases and collection labels at build time. Search returns only published, indexable guide entries; it excludes system, hub, collection and service pages. Empty queries return no results. Locale normalization and aliases are deterministic and covered by fixtures.

UI counts use published guides. Eligibility counts use indexable direct children deduplicated by canonical `contentId` within each locale. Coverage inventory uses all editorial states and must not reuse a public-count function accidentally.

Phase 1 does not add arbitrary Boolean querying, GraphQL, recursive recommendation logic or body full-text search. Section 4.7 defines the smaller manifest-metadata search that is in scope.

## 8. Topic candidate repository

The production system must not derive the next topic from conversational memory.

Create one file per topic candidate to reduce multi-computer merge conflicts:

```text
content/editorial/topics/<candidate-id>.json
content/editorial/source-packs/<candidate-id>.md
content/editorial/source-packs/<candidate-id>.json
content/editorial/evidence/<evidence-id>.json
content/editorial/source-snapshots/<snapshot-id>.json
content/editorial/assessments/<candidate-id>/<reviewer-id>.json
content/editorial/reconciliations/<candidate-id>.json
content/editorial/production-packets/<candidate-id>/<locale>.json
content/editorial/claim-audits/<candidate-id>/<locale>.json
```

These directories are outside the current content-manifest generator and therefore require a dedicated candidate/source-pack validator and CI check. Merely storing files there is not implementation.

Minimum topic fields:

```text
candidateId
status
primarySection
primaryCollection
primaryEntityId
secondaryEntityIds
servesEntityIds
relationIds
primaryIntent
contentFamily
topicIds
travellerTypeIds
queryClusterId
structuralPatternId
primaryRegionEntityId
uniqueAnswer
closestInternalContentIds
cannibalizationGroup
sourceRequirements
ownedMediaIds
volatility
refreshCadence
coverageNotes
concentrationWarnings
evidenceRecordIds
assessmentRubricVersion
owner
branch
claimIssueUrl
claimLeaseOwner
claimLeaseAt
claimLeaseExpiresAt
claimLeaseStatus
sourcePackVersion
sourcePackApprovalHash
candidateApprovedBy
candidateApprovedAt
sourcePackApprovedBy
sourcePackApprovedAt
transitionHistory
overrides
assessmentRefs
reconciledDiscoveryDecisionRef
postResearchDecision
localePlans
publication
createdAt
updatedAt
```

`candidateId` is the production identity of one proposed canonical page or one explicitly declared update/merge action. `topicIds` are broad taxonomy labels such as pace or transport; they are never used as production locks or as a substitute for `candidateId`.

For a new public page, `publication` records:

```text
contentId
guideId
canonicalPaths
firstPublishedAt
publishedLocales
publicationCommit
localeArtifacts
  <locale>
    finalDraftHash
    claimAuditHash
```

The resulting content node and every locale manifest entry carry the same `originCandidateId`. One candidate maps to one canonical `contentId` by default; an explicit reviewed split creates new candidate IDs. Three locale entries do not count as three publications.

Existing guides receive a checked-in legacy provenance map from each current `GuideId/contentId` to a synthetic legacy candidate ID and its earliest verifiable publication date. Unknown historical dates remain explicitly unknown rather than being replaced with the migration date.

Evidence is stored separately from reviewer conclusions. Each immutable evidence record contains:

```text
evidenceId
recordHash
evidenceType
source
artifactRef
artifactHash
query
locale
market
geography
device
observedAt
periodStart
periodEnd
metricName
metricValue
metricUnit
limitations
```

Not every field applies to every evidence type, but the validator defines required fields by type. A SERP snapshot, customer-question record, Search Console export and official source therefore do not collapse into an untraceable URL list.

`recordHash` is SHA-256 of canonical JSON excluding `recordHash` itself. The immutable discovery input is:

```text
inputBundleHash = SHA-256(
  canonical candidate selection fields
  + canonical locale plans
  + discovery rubric file hash
  + sorted evidenceId:recordHash pairs
  + coverage-inventory input hash
)
```

Changing any included candidate field, locale plan, rubric, evidence record or inventory snapshot creates a new bundle hash and invalidates prior assessments. Assessments remain preserved for audit but cannot be reconciled against a different input bundle.

`localePlans` keeps one canonical topic while acknowledging different search realities:

```text
localePlans.en / zh / ko
  primaryQuery
  supportingQueries
  serpPageType
  userTask
  searchEvidenceRefs
  plannedCanonicalPath
  localizationStatus
  marketScope
```

Before a candidate can become `approved`, the integrator reserves every locale’s normalized `plannedCanonicalPath`. CI checks the reservation against current manifest paths, redirects/aliases, section paths, public or reserved collection/destination paths, and every non-terminal candidate. Two candidates cannot reserve the same normalized locale path even when their candidate IDs differ.

At publication, `publication.canonicalPaths[locale]` is copied from the approved reservation. Changing a reserved path requires an explicit release/migration transition and a fresh collision check; a writer cannot choose a new slug during drafting.

`transitionHistory` records each old state, new state, actor, timestamp and evidence. `overrides` records the warning or decision overridden, rationale, evidence, approver and review date. CI rejects illegal status jumps and missing approval records.

Top-level candidate/source-pack approval fields are current-state summaries derived from the latest valid transition and artifact hash; they are not a second approval authority.

Independent assessment files and `postResearchDecision` are separate. `assessmentRefs` are generated references, not embedded reviewer conclusions and not a second source of truth. Research must not overwrite the evidence that originally justified spending time on the candidate.

`uniqueAnswer` is mandatory:

> What will this page answer that the closest existing Homeground page does not?

If this cannot be stated clearly, the candidate must be merged into an existing page or remain unpublished.

## 8.1 Topic status workflow

```text
idea
→ candidate
candidate → approved | held | rejected
held → candidate | rejected
approved → source-pack
source-pack → research-complete | held | rejected
research-complete
  → new-page
  → update-existing
  → merge-existing
  → noindex-resource
  → rejected
new-page | update-existing | noindex-resource
  → draft
  → fact-check
  → similarity-review
  → localization
  → build
  → seo-visual-qa
  → scheduled
  → published
fact-check → source-pack | draft
similarity-review → draft | merge-existing | rejected
localization → localization | draft
build → build | localization | draft
seo-visual-qa → build | localization | draft
merge-existing → merged
published → monitored → refreshing | merged | archived
refreshing → fact-check
```

`rejected`, `merged` and `archived` are terminal unless an owner-approved transition creates a new candidate. `held` is resumable when its named evidence gap is closed. `noindex-resource` follows the same fact and quality checks as a new page but keeps a noindex publication mode.

Every transition definition specifies:

- allowed role;
- required current status;
- required artifact and artifact hash;
- next status;
- whether the status is resumable or terminal.

Rework invalidation is deterministic:

- a source-pack or source-snapshot change invalidates source approval, production packet, draft claim audits, localization approvals and downstream build/visual approval;
- a canonical draft change invalidates its claim audit, similarity decision, localizations and downstream build/visual approval;
- a localized draft change invalidates that locale’s claim audit and downstream build/visual approval;
- a layout-only build change reruns build and visual/SEO QA but does not invalidate factual approval unless rendered content changed.

The normative transition table is versioned in `content/editorial/workflow/topic-status-transitions.json`. Candidate discovery agents may create `idea/candidate`; independent reviewers submit assessments; only the integrator or business owner may reconcile into `approved/held/rejected`, approve source packs, choose a post-research branch or authorize publication.

`transitionHistory` is append-only and CI compares it with the main-branch record to reject deletion, rewriting or insertion into prior history. Actor identity comes from the reviewed commit/GitHub identity plus the recorded role, not a free-text name alone. Approval belongs to a specific transition and artifact hash.

An agent may not skip directly from `candidate` to `published`.

## 8.2 Candidate evidence pools

Candidates may enter from:

1. Search Console queries and impressions;
2. head-site architecture, sitemaps and independent pages;
3. search suggestions, PAA, related searches and Trends;
4. customer conversations and enquiries;
5. Homeground-owned photographs, field knowledge and supplier information;
6. policy, timetable, attraction or market changes;
7. missing internal-link nodes needed to complete a verified cluster.

An empty coverage cell is not itself proof of demand.

## 9. Candidate selection and concentration governance

## 9.1 Hard blockers

A candidate cannot become a separate indexable page when:

1. the user task cannot be stated in one sentence;
2. an existing page can answer it through a reasonable update;
3. it has the same primary query and intent as an existing page;
4. changing the city, month, nationality or traveller label would leave the user task, core answer, main evidence, decision consequences and information gain materially unchanged;
5. no clear information gain can be stated;
6. material facts lack adequate sources;
7. its canonical or URL responsibility conflicts with an existing page;
8. the page can only be completed by repeating another page’s reasoning, examples and conclusions;
9. a translation is being counted as a new independent topic.

Hard blockers cannot be overridden for an indexable SEO page.

Shared page architecture is not itself a blocker. A stable weather, route, city or attraction template may improve usability when the underlying task, evidence and answer genuinely differ. The blocker is label substitution without new decision value, not consistent design.

## 9.2 Two-stage evidence assessment

Phase 1 does not pretend that an unevidenced 0–100 number is a purchase probability or a precise SEO forecast. Topic selection has two different decisions, and the record preserves both.

### Stage A — discovery assessment

Before expensive research, assess each factor with a controlled rubric:

| Factor | Question |
|---|---|
| Demand evidence | Is there direct evidence that people perform or express this task? |
| Task clarity | Can the user problem and useful outcome each be stated in one sentence? |
| SERP opportunity | Is the current result set mismatched, stale, shallow or missing the needed page type? |
| Information gain | Is there a credible path to a materially better or different answer? |
| Source plausibility | Are authoritative and first-hand sources likely to exist? |
| Homeground advantage | Does local access, field material, supplier knowledge or service capability improve the answer? |
| Network value | Would the page complete a useful journey, entity hub or internal-link path? |
| Maintenance burden | Can volatility be monitored and the page kept accurate? |

Each factor stores:

```text
rating: none | weak | moderate | strong
confidence: low | medium | high
evidenceRefs: []
rationale
assessedBy
assessedAt
rubricVersion
```

The normative anchors live in `content/editorial/rubrics/discovery-rubric-v1.json`. Version 1 uses these meanings:

| Factor | `none` | `weak` | `moderate` | `strong` |
|---|---|---|---|---|
| Demand evidence | No traceable demand evidence | One indirect signal, such as autocomplete or competitor coverage, or a very sparse first-party observation | At least one reproducible direct signal such as a query dataset or repeated customer task, with relevant locale/market recorded | Repeated first-party demand across users or periods, or multiple independent direct sources that agree |
| Task clarity | User and outcome cannot be stated | Broad subject, several possible jobs | User, decision and useful outcome are clear | Boundaries, excluded tasks and success condition are also clear |
| SERP opportunity | SERP not captured | Results already fit the task well or evidence is stale | A documented mismatch, freshness, depth or page-type gap exists | Several results share the gap and Homeground can answer it credibly |
| Information gain | No distinct answer | Mostly rearranges existing facts | A distinct decision, evidence set or conclusion is credible | The page can materially change the user’s decision or complete a missing task |
| Source plausibility | Material claims have no credible source path | Mostly secondary or inaccessible sources | Authoritative sources cover the core claims | Authoritative sources plus first-hand/local evidence support the difficult claims |
| Homeground advantage | No specific advantage | Generic writing or imagery only | Local knowledge, owned media or service capability improves part of the answer | Homeground has non-generic access or evidence central to the answer |
| Network value | Isolated page with no useful relationship | One incidental internal link | Fills a documented user journey or entity/task gap | Unlocks a coherent hub/tool/journey while remaining independently useful |
| Maintenance burden | Cannot be monitored responsibly | Volatile with unclear owner/source | Named owner, sources and feasible cadence exist | Stable or automatically monitorable with clear failure/refresh rules |

Examples are evidence-type anchors, not numeric market thresholds: an autocomplete suggestion alone is `weak` demand evidence; ten Search Console impressions are direct but normally low-confidence evidence; three genuinely independent customer questions may support `moderate` demand but must retain the small-sample limitation. The record never promotes evidence merely by omitting its denominator, market or time window.

Confidence is assessed separately:

- `high`: current, directly relevant, reproducible and authoritative/first-party evidence with limited known bias;
- `medium`: relevant evidence with one material scope, sample or freshness limitation;
- `low`: indirect, stale, very small, incomplete or poorly matched evidence.

A low-confidence `strong` rating does not automatically outrank a high-confidence `moderate` rating; it enters reconciliation. Contradictory evidence is retained in the bundle and discussed rather than averaged away.

The discovery decision is one of:

- `investigate`: enough evidence to spend research time;
- `hold`: plausible, but a named evidence gap remains;
- `reject`: hard blocker or no credible path to distinct value.

A generated priority band may sort candidates, but it must be a deterministic view of the stored factor ratings. It is a queueing aid, not a probability, market-size estimate or automatic publishing decision. No clamped base score and ad hoc bonus system is used in Phase 1.

The pilot does not generate a priority band until a versioned mapping file and its tests exist. If introduced later, the mapping and tie-break rules are code-reviewed rather than interpreted freely by an agent.

Two independent reviewers are required for the pilot. Their records live separately under `content/editorial/assessments/<candidate-id>/`. Both receive the same immutable evidence bundle and record the same `inputBundleHash` and rubric version. Reviewer B’s task packet excludes Reviewer A’s assessment. Review is triggered when they differ by two or more rating levels on any factor, disagree on a hard blocker, or choose different discovery decisions.

The integrator writes one reconciliation file binding both assessment file hashes and their shared input bundle hash. It stores the reviewers, factor-level disagreements, resolver, decision, evidence and rationale; the candidate retains only `reconciledDiscoveryDecisionRef`. The business owner or delegated integrator resolves the evidence disagreement; averaging does not hide it.

### Stage B — post-research decision

After the source pack is complete, decide:

- `new-page`;
- `update-existing`;
- `merge-into-existing`;
- `useful-noindex-resource`;
- `reject`.

This decision is based on the completed evidence, canonical ownership, task completeness, information gain, maintenance feasibility and cannibalization review. A strong discovery assessment cannot rescue a failed source pack.

## 9.3 Coverage imbalance

Coverage is evaluated by comparing:

```text
content share
vs
verified opportunity share
vs
remaining independent tasks
```

A destination with 30% of content is not automatically overcovered. If it has stronger demand evidence and still has distinct, high-value tasks, further cluster work may be rational. “Opportunity share” may be reported numerically only when the underlying queries use a comparable data source, geography, time window and metric; otherwise the comparison remains qualitative and cites its evidence.

A destination becomes a weak marginal choice when:

- its content share materially exceeds its evidence-backed opportunity share;
- remaining candidates are structurally repetitive;
- stronger candidates exist elsewhere;
- the new page cannot add a distinct task or answer.

The system compares marginal topic value, not city counts.

## 9.4 Rolling-window warnings

A rolling 12-topic window is used for review warnings only. For published work it means the last 12 canonical topics ordered by first public `firstPublishedAt`; translations count once. A legacy page with no verifiable first-public date is flagged in historical coverage but excluded from the ordered recent window rather than assigned the migration date. Drafts and research candidates are reported in a separate active-batch view so an unpublished queue cannot rewrite publication history.

`structuralPatternId` comes from a controlled `content/editorial/structural-patterns.json` registry. Each pattern defines its responsibility, allowed content families and examples; unknown IDs fail validation. This prevents an agent from evading concentration review by inventing a new spelling for the same structure.

`primaryRegionEntityId` is derived by default from the reviewed `primaryEntityId → located-in` ancestor chain. A cross-region route uses a controlled `multi-region` scope. Manual region changes require an explicit override record. Active-batch reports order candidates by reconciled approval time and candidate ID, never filesystem order.

Initial warnings:

- same primary entity reaches 5 of 12: yellow review;
- same primary entity reaches 8 of 12: red review;
- same content family reaches 6 of 12: yellow review;
- same controlled `structuralPatternId` reaches 3 of 12: red review;
- one controlled `primaryRegionEntityId` reaches 8 of 12: yellow review;
- 12 topics cover three or fewer first-level sections: yellow review.

The warning asks:

> Is this an intentional, evidence-backed cluster, or recent-context continuation?

It does not automatically reject the candidate.

## 9.5 When destination concentration is valid

Several pages for the same destination may be researched or published together when:

- pages solve different user tasks;
- the pages form a coherent internal-link journey;
- each page has an independent source pack and unique answer;
- canonical ownership and cannibalization review are clear;
- the marginal value remains competitive with candidates outside that destination.

Several independently evidenced queries and a useful destination hub strengthen the case, but neither is a mechanical minimum. One exceptional task may justify one page; five weak query variations do not justify a cluster.

Research may reuse verified facts and entity records. Drafts may not reuse paragraphs merely because they belong to one cluster.

## 9.6 Human override

The business owner may approve a strategic override for a warning or queue decision when the record includes:

- the rule or warning being overridden;
- the actual evidence;
- business reason;
- approver;
- review date.

Legitimate reasons include:

- urgent policy or transport changes;
- repeated customer questions;
- unique Homeground field material;
- a current commercial or editorial campaign;
- completion of a verified topic cluster;
- a necessary navigation or brand page.

An override cannot authorize false facts, severe cannibalization, invented demand, copyright misuse or pure substitution templates.

## 10. Source-pack contract

Source packs precede drafting.

Every source pack includes:

- the exact user task;
- primary and supporting queries;
- expected SERP page type;
- competitor coverage and omissions;
- official and authoritative sources;
- verified facts with effective dates;
- uncertainty and prohibited inference;
- Homeground-owned media and field evidence;
- the page’s unique answer;
- required internal links;
- prohibited drift topics;
- volatility and update requirements.

Every source pack also has machine-readable front matter or a sidecar record:

```text
candidateId
sourcePackVersion
payloadHash
approvalHash
preparedBy
preparedAt
approvedBy
approvedAt
sourceSnapshotIds
claimMap
prohibitedClaims
```

Each source snapshot records the source URL or repository reference, source type, publisher, retrieval time, relevant effective or publication date, supported claim IDs, immutable content hash and any known limitation.

Hashes use this contract:

```text
payloadHash = SHA-256(
  canonical UTF-8 Markdown body
  + canonical JSON sidecar excluding hash and approval fields
)

approvalHash = SHA-256(
  payloadHash
  + sorted immutable sourceSnapshotId:contentHash pairs
)
```

Canonical JSON uses sorted keys, UTF-8, LF line endings and no insignificant whitespace. Source snapshots are immutable; a changed external capture creates a new snapshot ID rather than overwriting an approved snapshot.

The approved `sourcePackApprovalHash` is pinned in the candidate record, production packet, draft metadata and PR description. Any payload or referenced snapshot change produces a new approval hash, invalidates the approval and returns the topic to source-pack review. This prevents a writer from quietly replacing the evidence after approval.

`claimMap` uses:

```text
claimId
canonicalClaim
claimType: direct | synthesis | field-observation
sourceSnapshotIds
supportMode
effectiveAt
limitations
```

At fact check, the production draft is audited back to this map:

```text
draftClaimAudit
  candidateId
  locale
  sourcePackApprovalHash
  productionPacketHash
  draftHash
  claims[]
    claimId
    renderedClaim
    location
    mapped
    reviewerDecision
  reviewedBy
  reviewedAt
  auditHash
```

Every locale audit is stored at `content/editorial/claim-audits/<candidate-id>/<locale>.json`. Every material factual claim must map to an approved claim ID. “Material” includes facts that could change eligibility, price, timing, route, safety, booking, availability or a purchase/travel decision. A new material claim returns to source-pack revision and approval; synthesis records its supporting sources and reasoning boundary. Localization audits the translated claim against the same claim ID. Publication pins each locale’s final draft hash and claim-audit hash. Any later rendered-text change invalidates that locale audit.

Example prohibited drift:

```text
This page answers where a first-time visitor should stay in Shanghai.
Do not introduce Zhangjiajie as an example.
Do not expand into a ten-day China itinerary.
Transport may appear only where it changes the accommodation decision.
```

Facts may be reused through shared fact records. Prose is not reused automatically.

## 10.1 Versioned production packet

A script, not a chat operator, assembles the self-contained packet supplied to the writing agent:

```text
packetVersion
candidateId
candidateRecordHash
sourcePackApprovalHash
localePlanHash
taxonomyVersion
entitySnapshotHashes
mandatoryComparisonContentIdsAndHashes
referenceComparisonContentIdsAndHashes
comparisonResolverVersion
comparisonCorpusManifestHash
promptTemplateVersion
targetLocale
allowedClaimIds
prohibitedDrift
requiredInternalLinks
outputSchemaVersion
```

The packet excludes previous article conversations and other reviewers’ private reasoning. The writer output records:

```text
productionPacketHash
writerModel
writerTaskId
draftHash
createdAt
```

CI requires the draft to pin the current packet hash. Changing the selected query, entity, collection, locale plan, source approval, mandatory/reference comparison sets or taxonomy generates a new packet and returns the draft to review. This does not make generative prose deterministic; it makes the inputs and production decision auditable and repeatable across computers.

## 11. Similarity and cannibalization gates

## 11.1 Before drafting

- build a mandatory comparison set containing every page with the same query cluster, cannibalization group or canonical query owner, plus every page with the same primary entity and intent;
- add a deterministic reference set of up to five further nearest pages using a versioned resolver over intent, entity, collection, query and lexical metadata;
- compare primary query, intent, entities and unique answer;
- identify the canonical query owner;
- determine whether the candidate should update or merge with an existing page;
- block duplicate URL responsibility.

The report records resolver version, corpus manifest hash, component scores and stable tie-break order. A reviewer may add pages to the mandatory set. Removing a mandatory page requires an explicit override; an agent cannot silently curate away the strongest cannibalization candidate.

## 11.2 After drafting

Remove navigation, shared CTA and boilerplate before comparing:

- title and H2 structure;
- repeated five-word sequences;
- semantic similarity;
- repeated examples and fact ordering;
- independent conclusions, tables, maps, tools, images and field observations.

Phase 1 first makes similarity reporting reproducible and advisory. It does not ship arbitrary hard percentages before measuring the existing corpus.

The comparison report records:

```text
analyzerVersion
locale
contentFamily
normalizationMethod
lexicalMethod
semanticModelAndVersion, when used
comparedContentIds
scores
matchedPassagesOrHeadings
decision
reviewer
```

Initial lexical analyzers:

- common preprocessing: extract the main article, remove navigation/CTA/boilerplate, Unicode NFKC normalization and punctuation normalization;
- English: lowercase word five-grams with both Jaccard and containment scores;
- Chinese: whitespace/punctuation-stripped character five-grams plus normalized-heading overlap;
- Korean: NFKC-normalized eojeol five-grams plus normalized-heading overlap, without stemming in the first version;
- all locales: exact repeated sentences and repeated example/fact order are shown to the reviewer.

The production HTML provides one unambiguous extraction contract per guide:

```html
<div data-content-body-root>...</div>
```

Navigation, CTA, language switcher, copyright and related-content modules use `data-similarity-ignore`. The analyzer reads the server-rendered production build/indexable export inside the single body root. Zero or multiple body roots fail the report. English, Chinese and Korean extraction fixtures and snapshots protect bespoke article components from silently changing the comparison boundary.

If semantic comparison is added, the embedding model, version, chunking rule and aggregation rule must be pinned. A model score without those fields is not auditable.

Before setting blocking thresholds, run a 19-by-19 same-locale baseline over the existing corpus, inspect same-family and cross-family distributions, and label representative duplicate, related-but-valid and unrelated pairs. Calibration is segmented by locale and content family. A future family such as weather, station, culture or tool remains advisory until it has labelled duplicate, related-but-valid and unrelated examples of its own. The calibration report records human gold labels and analyzer version and may introduce versioned family-specific warning/block thresholds. A single site-wide blocking threshold is prohibited. Until then:

- pre-draft canonical/query duplication remains a hard blocker;
- post-draft lexical and semantic scores create a review packet, not an automatic rejection;
- exact or near-exact copied prose must be rewritten regardless of an aggregate score;
- an editor records `keep`, `rewrite`, `merge` or `block` with a rationale.

These are Homeground production controls, not claims about Google ranking thresholds.

Every page must fully solve its stated task and contain non-replaceable information gain relative to its closest internal page. A table, map, image, tool or framework is required only when it materially improves the answer; arbitrary “three unique facts plus one special component” quotas are prohibited because they encourage filler.

Every review records one sentence explaining why the page deserves to exist separately from the closest internal page.

## 12. Generated coverage inventory

Generate:

```text
content/generated/topic-inventory.json
```

This is derived output, not a manually edited source.

It must report:

- all 27 provisional collection candidates, including empty ones;
- guide count by collection;
- primary and secondary entity counts;
- topic counts;
- intent and family distribution;
- locale availability without counting translations as separate topics;
- rolling-window concentration warnings;
- unassigned or invalid records;
- stale source-pack or review states.

The generated file is deterministic. It includes `schemaVersion` and a hash of its sorted source inputs, sorts records by controlled IDs, and excludes wall-clock-only fields such as an unpinned `generatedAt`. Running generation twice on the same commit must produce byte-identical output.

Recent-publication views use canonical topic `firstPublishedAt`, with translations counted once. Active research-batch views use candidate status and are reported separately.

Required cross-views:

1. section × collection;
2. destination/entity × content task;
3. entity × intent;
4. family × recent publication count;
5. market × truly market-specific content;
6. volatility × overdue review.

Inventory states:

- published;
- in production;
- evidenced gap;
- candidate without enough evidence;
- intentionally not planned.

An empty cell never becomes an automatic publishing instruction.

## 13. Existing-guide migration

The 19 existing guides receive exactly one primary collection. The migration changes metadata only.

It does not change:

- Guide IDs;
- paths;
- canonicals;
- hreflang;
- titles;
- body copy;
- images;
- dates;
- page components.

Initial assignments:

| Guide ID | Collection | Proposed primary entity | Proposed `servesEntityIds` | Migration review |
|---|---|---|---|---|
| `zhangjiajie-itinerary` | `plan-trip-length-city-order` | `city-zhangjiajie` | `[]` | Confirm against body |
| `zhangjiajie-from-malaysia` | `plan-traveller-theme-itineraries` | `city-zhangjiajie` | `[]` | Confirm against body |
| `zhangjiajie-glass-bridge-vs-skywalk` | `explore-attractions-nature-heritage` | `city-zhangjiajie` | `[]` | Confirm against body |
| `kevin-before-the-hotel-pickup` | `essentials-booking-registration-recovery` | `country-china` | `[]` | Body audit required; legacy Zhangjiajie tag alone does not qualify |
| `zhangjiajie-older-travellers` | `plan-traveller-theme-itineraries` | `city-zhangjiajie` | `[]` | Confirm against body |
| `best-zhangjiajie-night-show` | `explore-attractions-nature-heritage` | `city-zhangjiajie` | `[]` | Confirm against body |
| `beijing-zhangjiajie-shanghai-10-days` | `plan-trip-length-city-order` | `country-china` | `city-beijing`, `city-zhangjiajie`, `city-shanghai` | Confirm each city materially served |
| `beijing-zhangjiajie-shanghai-transport` | `transport-city-pair-routes` | `country-china` | `city-beijing`, `city-zhangjiajie`, `city-shanghai` | Confirm each city materially served |
| `is-your-china-itinerary-too-rushed` | `plan-budget-pace-decisions` | `country-china` | `[]` | Confirm against body |
| `china-itinerary-with-older-parents` | `plan-traveller-theme-itineraries` | `country-china` | `[]` | Confirm against body |
| `do-us-citizens-need-visa-china-2026` | `essentials-entry-transit` | `country-china` | `[]` | Confirm against body |
| `china-visa-free-uk-citizens-2026` | `essentials-entry-transit` | `country-china` | `[]` | Confirm against body |
| `china-visa-free-canadian-citizens-2026` | `essentials-entry-transit` | `country-china` | `[]` | Confirm against body |
| `china-visa-free-new-zealand-citizens-2026` | `essentials-entry-transit` | `country-china` | `[]` | Confirm against body |
| `china-240-hour-visa-free-transit-route-check` | `essentials-entry-transit` | `country-china` | `[]` | Confirm against body |
| `do-singaporeans-need-visa-china` | `essentials-entry-transit` | `country-china` | `[]` | Confirm against body |
| `why-are-hotels-in-china-so-cheap` | `stay-hotel-types-scenic-bases` | `country-china` | `[]` | Confirm against body |
| `do-you-need-a-tour-guide-in-china` | `services-guides-experiences` | `country-china` | `[]` | Confirm against body |
| `how-much-does-a-china-trip-cost` | `plan-budget-pace-decisions` | `country-china` | `[]` | Confirm against body |

`kevin-before-the-hotel-pickup` remains in Essentials during technical migration. Any editorial reclassification requires a separate review.

These entity values are migration proposals, not silently accepted facts. Phase 1A records a reviewer decision and rationale for all 19; an empty `servesEntityIds` is valid only after review. Destination eligibility uses the reviewed values, not the old free-text `destinations` array.

## 14. Multi-computer and multi-agent workflow

Each approved production candidate has one `candidateId`, one lease owner and one active branch. `topicIds` remain descriptive taxonomy labels.

Recommended responsibility split:

- integration computer: taxonomy, candidate approval, central registries, generated artifacts, review, merge and deployment;
- production computer: claimed candidate/source-pack files, drafts and localized versions that do not share a central edit surface;
- one conversation/task per candidate ID;
- one worktree and branch per candidate;
- one PR per article or inseparable topic cluster;
- one integrator merges in a controlled order.

Rules:

- claim the candidate through its unique GitHub Issue before editing; only the integrator or a serialized GitHub Action may grant, renew or release the lease;
- a valid lease has the `content-claimed` label, exactly one assignee, matching candidate/branch owner, `claimLeaseStatus: active`, grant time and explicit expiry time;
- expiry, renewal and release append transition history; a fixed lease duration is configured in the workflow rather than chosen by the writer;
- two computers do not edit the same candidate file;
- writing agents receive only the approved brief and source pack, not the previous article conversation;
- a writer cannot silently change the selected entity, query or collection;
- after a merge, all other worktrees synchronize before beginning dependent work;
- research can run in parallel; canonical ownership and final merges remain centralized.

The current `guideRegistry` and runtime adapter are shared compile-time dependencies. Until guide metadata is split into one file per guide and a deterministic registry/classification output is generated, production computers may work in parallel only on research, source packs, unregistered draft artifacts and media. They do not submit independently buildable page PRs.

One-file-per-guide metadata and deterministic registry generation are a hard prerequisite for concurrent article-page PRs in the pilot. After that migration, each production PR adds its own metadata file and CI regenerates/verifies central outputs without hand-editing them. The previous idea of “let the integrator add the registry entry only at merge time” is rejected because the production PR may fail TypeScript/build before reaching the merge queue.

Production authors never edit generated registry/classification/inventory files. Local and CI prebuild steps generate temporary compile inputs from the independent metadata files before TypeScript/build. If a derived artifact must remain checked into the repository for deployment compatibility, a serialized integration bot rebases the PR on the current target, regenerates and commits that artifact in the same PR immediately before final checks. It is never hand-merged.

The merge-flow test creates Branch A with guide A and Branch B with guide B, merges them sequentially through the queue, and verifies the final generated registry contains both A and B without manual central-file conflict resolution.

Local validation checks claim URL, candidate ID, lease fields and owner format without network. A separate GitHub Actions job with minimal `issues: read` permission checks live issue state and exact assignee/label consistency. It distinguishes claim conflict from GitHub API/permission unavailability; a network failure does not masquerade as invalid content.

`content/generated/topic-inventory.json` is regenerated by the integrator after rebasing onto the current merge target. Production branches do not resolve stale inventory conflicts by hand.

The same AI model on two machines does not remove Git or editorial conflicts.

## 15. Frontend recommendation safeguards

The public platform must not visually become a single-destination site merely because a production cluster is active.

Initial recommendation safeguards:

- generic discovery modules rank for task relevance first, then apply entity/family diversity weighting;
- repeated primary entities create an editorial preview warning rather than a universal hard count;
- an intentional destination cluster may appear together inside a clearly labelled destination or campaign module;
- `Recently updated` remains chronological, but the page should not use it as the only or dominant discovery module;
- section imagery is reviewed for representational variety and must not imply that one destination is the whole of China.

These are presentation rules, not publishing quotas.

## 16. Implementation sequence

### Phase 1A — Data and migration

**Step 0 — lock the Phase 0 baseline in a separate commit before any schema, builder or manifest change:**

1. generate the exact indexable system/guide/hub path and indexability snapshot from the current Phase 0 commit;
2. record that source commit SHA in the snapshot;
3. manually review the set;
4. merge and lock the baseline commit;
5. allow Phase 1A implementation to begin only afterward.

Then:

1. Add schema `1.1.0` read support while retaining `1.0.0` compatibility;
2. add section, collection, destination-hub and destination-directory registries with editorial/publication state and three-language copy;
3. add controlled topic registry;
4. retain `parentContentId`, `primaryCollectionId`, sorted `topicIds`, `primaryEntityId`, `servesEntityIds` and `originCandidateId` in the runtime manifest;
5. build public collection nodes before migrated guides, keep internal collection IDs in `primaryCollectionId`, and run reference/cycle validation;
6. add parent/topic/collection/primary-entity/destination-support queries and the metadata-search document builder;
7. assign all 19 legacy guides to one collection and a checked-in legacy `originCandidateId` provenance map;
8. generate deterministic coverage, collection and destination eligibility reports;
9. require explicit `public-index` publication mode and validate every provided locale before sitemap inclusion.

### Phase 1B — Information architecture UI

1. Redesign `/guides` as seven knowledge-area browse cards plus separate Tools and Using Local Help bands;
2. implement manifest-metadata search, or omit the search field from that release;
3. redesign first-level pages around useful collections rather than time order;
4. add collection page renderer with manual indexability gates and honest empty states;
5. add noindex destination directory/hub prototypes and publish only mature, explicitly approved hubs;
6. add the shared local navigation/breadcrumb shell to legacy article components without rewriting their bodies;
7. add crawlable pagination or server-rendered link groups;
8. verify desktop, mobile and three-language layouts.

### Phase 1C — Editorial production controls

1. Add one-file-per-candidate records and pre-approval locale path reservation;
2. add versioned, hashed source-pack template and claim map;
3. implement candidate/source-pack validation, approvals and legal status transitions;
4. implement evidence-assessment and concentration-warning reports;
5. implement deterministic pre-draft comparison and canonical/cannibalization reports;
6. implement versioned production-packet generation;
7. implement per-locale material-claim audits and hash invalidation;
8. implement advisory, versioned post-draft similarity reports and baseline calibration;
9. establish serialized GitHub Issue lease ownership and merge-queue rules;
10. split guide metadata into one file per guide with deterministic registry/classification generation;
11. enable concurrent article-page PRs only after step 10 passes full build and two-branch merge-flow tests.

### Phase 1D — Pilot

1. Import and assess 50–60 candidates from independent evidence pools;
2. have two agents apply the same evidence rubric without recent-article context;
3. review any hard-blocker/decision disagreement or factor difference of two or more levels;
4. run cannibalization checks on the top 20;
5. approve up to 12 candidates for source-pack research;
6. publish only candidates that remain eligible after research;
7. review indexation and query fit after 28 and 60 days;
8. calibrate rubrics, similarity controls and concentration warnings from observed cases.

The pilot does not require 12 published pages. Quality gates may reduce the batch.

## 17. Tests and acceptance criteria

## 17.1 Data validation

- schema `1.0.0` and `1.1.0` fixtures both load and normalize correctly;
- a 1.0 record carrying any 1.1-only field fails with `unsupported_field_for_version`;
- a valid 1.0 record receives every 1.1 default during normalization;
- mixed 1.0/1.1 sources always produce `manifest.schemaVersion === "1.1.0"`;
- unknown collection IDs fail validation;
- unknown topic IDs fail validation;
- article and collection sections must agree;
- collection parent must be the correct first-level hub;
- parent reference and cycle checks continue to pass;
- public collection nodes load before article-parent validation;
- manifest preserves `parentContentId`, `primaryCollectionId`, sorted `topicIds`, valid `primaryEntityId` and `originCandidateId`;
- `primaryEntityId` must appear in `entityIds`;
- every `servesEntityIds` entry resolves and appears in `entityIds`;
- three locale entries for one guide share one `originCandidateId` and one canonical `contentId`;
- a candidate cannot publish two canonical content IDs without an approved split;
- one guide cannot have more than one primary collection;
- all 19 existing guides have a collection, primary-entity and destination-support review decision;
- destination eligibility fixtures count the reviewed legacy relationships as expected and ignore old free-text destination tags.
- illegal editorial/publication-state combinations for sections, collections, destinations and directory records fail validation;
- duplicate destination entity or normalized slug ownership fails preflight;

## 17.2 Query behavior

- parent queries return direct children only;
- topic queries respect locale;
- primary-entity destination queries exclude incidental mentions;
- destination support counts only same-locale published/indexable guides, deduplicated by canonical `contentId`;
- collection pages do not mix articles from another collection;
- internal collections create no manifest entry or route, and article breadcrumbs fall back to the section;
- an internal collection with three qualifying articles is counted through `primaryCollectionId` and can pass eligibility without a public parent node;
- public-noindex collections create a route but never a sitemap entry;
- first-level section queries still return all descendant guides in that section;
- article lists contain no duplicate content IDs.

## 17.3 SEO safety

- all pre-Phase-1 canonical and indexable URLs remain unchanged;
- the exact Phase 0 system/guide/hub indexable path set and indexability values match the reviewed snapshot;
- the baseline `sourceCommit` equals the reviewed Phase 0 baseline commit, not the current modified worktree;
- titles, hreflang and body resources of migrated articles remain unchanged;
- no collection enters the sitemap before passing its gate;
- no destination hub enters the sitemap before passing its gate;
- passing a destination or directory eligibility gate never changes publication mode automatically;
- `public-index` publication mode fails validation when objective eligibility or any provided locale copy fails;
- an eligibility report never switches indexability by itself;
- preflight eligibility and the final manifest consume the same `CollectionEligibilityResult`;
- noindex parent collections do not deindex valid child guides;
- all indexable pages are reachable through standard links;
- empty facets and filters do not generate crawlable combinations.

## 17.4 Coverage inventory

- all 27 provisional collection candidates appear, including zero-count candidates;
- the 19 assignments total exactly 19;
- translations do not inflate topic count;
- invalid entities or topics fail generation;
- stale generated inventory fails CI;
- identical source inputs generate byte-identical inventory and the same input hash;
- concentration is reported as a warning with evidence fields, not as an automatic city ban.

## 17.5 Editorial controls

- candidate files reject unknown IDs, missing locale plans and illegal status transitions;
- legal quality-rework transitions return to source pack/draft/localization/build and invalidate the documented downstream hashes;
- planned canonical paths are reserved before approval and collide against manifests, redirects, taxonomy/destination paths and all non-terminal candidates;
- publication paths must equal their approved locale reservations;
- every state change appends actor, timestamp and evidence to `transitionHistory`;
- two reviewer assessment files bind the same current `inputBundleHash`; evidence/rubric changes invalidate both;
- reconciliation binds two independent assessment hashes and candidate stores only references;
- an override without rule, rationale, evidence, approver and review date fails CI;
- source-pack approval is invalidated when its payload or referenced immutable snapshot changes;
- a draft cannot pass review when its pinned `sourcePackApprovalHash` differs from the approved record;
- the initial similarity report pins analyzer/model versions and remains advisory until calibration is approved;
- candidate claims have one open GitHub Issue with exactly one lease owner;
- local claim validation does not require network, while the GitHub Action checks exactly one live assignee with read-only issue permission;
- article-page PRs remain disabled until one-file-per-guide metadata and deterministic registry generation are active;
- sequentially merging two independent guide branches yields a registry containing both without hand-editing generated files;
- the production packet hash changes when any governed input changes;
- every material draft claim maps to an approved claim ID before localization/build.
- every locale publication pins matching final draft and claim-audit hashes;
- pre-draft comparison always includes mandatory conflict pages and records deterministic reference-set resolver/corpus versions;
- similarity extraction fails on zero or multiple `data-content-body-root` elements and ignores only marked shared UI.

## 17.6 Frontend

- `/guides` displays all nine sections without horizontal discovery dependency;
- mobile section navigation does not overflow or truncate in English, Chinese or Korean;
- section pages group by collection;
- collection and destination empty states are not indexable;
- breadcrumbs expose one primary path;
- legacy articles receive the shared local navigation without body, canonical or hreflang changes;
- metadata search matches controlled titles, descriptions, aliases and terms without requiring body full-text indexing;
- metadata search excludes non-guide and non-indexable records, handles aliases/empty queries and applies locale-specific normalization;
- no inert search control is rendered when search is unavailable;
- search, filters and infinite scroll are never the only discovery path;
- generic recommendation previews expose entity/family concentration warnings while allowing explicit cluster modules.

## 17.7 Full regression

- TypeScript passes;
- all content-system and inquiry tests pass;
- production build passes;
- indexable-export guard passes;
- legacy indexable baseline remains valid;
- sitemap changes match explicitly approved new hubs only.

## 18. Explicitly deferred

Phase 1 does not implement:

- a database-backed CMS;
- generic AI article generation from empty taxonomy cells;
- arbitrary multi-parent breadcrumbs;
- automatic city × month × traveller pages;
- a recommendation machine-learning system;
- automatic publishing;
- GraphQL;
- arbitrary Boolean content search;
- infinite taxonomy depth;
- per-locale indexability overrides;
- automatic topic synonym merging;
- migration of all article body copy into a universal renderer.

## 19. Business-owner review decisions

The following decisions are proposed as approved defaults unless the owner changes them before Phase 1 implementation:

1. Keep the nine first-level sections.
2. Use the 27 IDs as provisional collection candidates; split, merge or withhold them after the inventory audit and before approving public collection URLs.
3. Use entities and relations rather than deeper generic category levels.
4. Keep all collection pages noindex until they pass the publication gate.
5. Treat concentration as an evidence review, not a fixed destination quota.
6. Count three language versions as one topic.
7. Require source packs before drafting.
8. Do not let the writing agent select its own next topic.
9. Keep the homepage outside Phase 1.
10. Preserve all existing article URLs and renderers during migration.

## 20. Definition of Phase 1 complete

Phase 1 is complete when:

- the nine sections remain stable and usable;
- the 27 provisional collections have been audited, with the retained set given controlled IDs and three-language copy;
- the 19 current guides have one verified collection each;
- runtime manifest exposes parent and topic relationships;
- coverage inventory shows what exists, what is in production and what is merely a candidate;
- `/guides` and first-level hubs can scale beyond a flat list;
- mature collection and destination hubs can be published without creating empty pages;
- topic selection starts from an evidence-backed candidate pool rather than recent chat context;
- destination concentration creates a review warning, not an arbitrary ban;
- independent source packs, cannibalization checks and similarity review gate publication;
- two computers can work in parallel under an atomic topic claim and without jointly editing a central merge surface;
- all existing URLs, indexability and inquiry behavior remain intact.

## 21. Benchmark references

These pages informed the structural benchmark. Homeground is borrowing the durable pattern—small reader-facing navigation, deeper entity/task coverage and crawlable links—not copying their wording, page count or every category.

- [Google: Help Google understand your ecommerce site structure](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure)
- [Google: Managing crawling of faceted navigation URLs](https://developers.google.com/crawling/docs/faceted-navigation)
- [China Highlights: China Travel Guide](https://www.chinahighlights.com/travelguide/)
- [China Highlights: Chengdu Travel Guide](https://www.chinahighlights.com/chengdu/)
- [TravelChinaGuide: Guilin Travel Guide](https://www.travelchinaguide.com/cityguides/guilin.htm)
- [China Discovery: China Travel Guide](https://www.chinadiscovery.com/travel-guide.html)

The benchmark does not establish that a page deserves publication. Candidate evidence, source readiness, canonical ownership and information gain remain page-level decisions.
