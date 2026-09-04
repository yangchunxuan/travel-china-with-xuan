# Structured SEO minimum release contract

Status: internal foundation. Central review is required before any candidate is indexed.

## Purpose

A guide folder is only a content artifact. Its presence must never, by itself, mean that the guide is published, discoverable, indexable or included in the sitemap. All guide consumers use one explicit release decision.

The compatibility baseline is frozen at `origin/main@c13d83e1abc8f5f25ee2250de11eed8c424a0196`: 173 independent guide folders plus 19 legacy guides, 192 identities in total. The frozen lists and original publication dates needed by update tickets are stored in `content/guide-governance.json`; generators must not append to them automatically. Generation and coverage verify both that exact source commit and an order-independent SHA-256 of the complete baseline contract. This is an offline integrity check: substituting an ID or synchronously rewriting a frozen publication date still fails without relying on a remote or network lookup.

## Candidate metadata fields

Every guide outside the frozen baseline must declare this complete bundle in `metadata.json`. A material update to a frozen guide also declares the bundle and has an `update-existing` ticket in the governance registry.

| Field | Contract |
| --- | --- |
| `candidateId` | Stable, unique, centrally assigned kebab-case ticket ID. It must match the guide-to-candidate mapping. |
| `editorialStatus` | Controlled enum: `provisional`, `approved`, `retired`. |
| `primaryCollectionId` | One ID from the controlled collection registry. Its section must equal `search.section` and it must match the runtime collection assignment. |
| `primaryEntityId` | One ID from the controlled entity registry. It must also occur in the emitted `entityIds`. |
| `secondaryEntityIds` | Zero or more unique controlled entity IDs. The primary ID cannot repeat here; every secondary ID must occur in emitted `entityIds`. |
| `freshnessClass` | Controlled enum: `low`, `medium`, `high`, `critical`; it must equal the emitted update-policy volatility. |
| `lastVerified` | A real, non-future `YYYY-MM-DD` date. It must equal `sourceReviewedDate` and emitted `dates.lastReviewed`. “Today” is evaluated from the current UTC date so the gate remains deterministic across build hosts. |
| `indexApproved` | Explicit boolean. `true` is only valid as part of the complete central release state below. |

Unknown fields, unknown controlled values, invalid calendar dates, future `datePublished`/`dateModified` values, partial bundles, duplicate IDs and cross-field disagreement fail generation. Candidate locales must be either a genuine single-locale release or the complete `en`/`zh`/`ko` set. For a multilingual structured body, every locale must have the exact same ordered block `{id,type}` sequence; missing, extra, reordered or retyped blocks fail at the first mismatch.

## Central registry and release date

`content/guide-governance.json` is the controlled source for:

- frozen independent and legacy IDs;
- allowed editorial statuses, freshness classes and collection IDs;
- candidate-to-guide mappings;
- `centralDecision`: `pending`, `approved` or `rejected`;
- `candidateAction`: omitted/`new` for a new identity, or `update-existing` for a material change to a frozen URL;
- `baselinePublishedDate`: required only for `update-existing`; it must mirror that URL's original, real `datePublished` from the SHA-protected baseline map;
- optional `approvedReleaseDate`.

The collection list must be mechanically identical to the runtime `searchCollectionIds`. Entity IDs come from `content/entities/core-places.json`; free strings are not accepted.

An `approvedReleaseDate` is absent while `indexApproved=false`. When indexation is opened it is required, must be a real non-future date and must equal:

- `metadata.datePublished` for a new guide;
- `metadata.dateModified` for an `update-existing` guide.

An `update-existing` candidate must keep `metadata.datePublished` exactly equal
to `baselinePublishedDate` in every review state. The new release date belongs in
`dateModified`; an edit may not rewrite the URL's original publication history.

This prevents a draft/commit date from becoming a public structured-data publication date merely because review happened later.

## Single effective index gate

The shared gate returns true only for:

1. a frozen baseline guide with no update ticket; or
2. a candidate whose `centralDecision=approved`, `editorialStatus=approved`, `indexApproved=true`, and whose release date matches the rule above.

`pending` and `rejected` are always false. Setting metadata `indexApproved=true` while the central decision is not approved is a validation error, not a quiet downgrade.

A new pending candidate may remain in the internal manifest as `review/noindex` so QA and inventory can inspect it. It is excluded from dynamic route params and slug lookup, guide/author/home listings, search documents, collection and Hub child counts, and the sitemap.

A pending material update to an existing public URL is different: the old deployed version must remain live. Because this repository does not retain the old body as a runtime snapshot, any partial update state blocks the guide generator/build. Validation is two-stage: every guide first completes metadata, entity, locale/body parity and asset validation, and check mode also compares every generated output; only then does the generator surface all stale-output and deployment-block findings together. An update is released atomically only when all central, editorial, index and release-date fields pass. This prevents the pending update from either masking a later validation failure, silently serving the new body or turning the established URL into a 404/noindex page.

## Manifest, Hub and sitemap behavior

Guide content nodes carry the complete effective governance bundle. The content validator rejects:

- incomplete bundles;
- index approval without editorial approval;
- primary/secondary entities absent from `entityIds`;
- collection/parent/section disagreement;
- freshness/update-policy disagreement;
- verification-date disagreement;
- `indexability.index=true` without `indexApproved=true`.

For a governed candidate, entity output is exactly its reviewed primary and
secondary entity list. Frozen baseline guides keep the existing
`destinations` resolver unchanged. This prevents new candidate vocabulary from
silently rewriting the entity assignments of already-published guides.

Collection and section Hub eligibility/count/date calculations use only effectively approved guides. Existing explicit Hub and collection approval lists remain separate gates; the arrival of one guide in each locale never auto-indexes a Hub. `app/sitemap.ts` continues to consume `getIndexableManifestEntries`, which independently requires `indexApproved=true` for every `guide-*` entry.

Structured data must match visible content. Schema type selection never implies Google rich-result eligibility. Future tool/data pages default to noindex until the same central value review explicitly approves them.

## Coverage inventory

`npm run guide:coverage` writes the read-only `docs/organic-growth/guide-coverage-inventory.json`; `npm run guide:coverage:check` detects drift. Coverage consumes the same fail-closed repository validator as the production generator; it may report a validated pending update as `deploymentBlocked`, but it cannot bypass invalid metadata, governance, entities, locale/body parity, assets or baseline integrity. Each locale row includes content ID, candidate ID/action, governance source, central decision, locale, status, editorial status, section, collection, primary/secondary/contextual entities, canonical path, freshness class, verification date, index approval and sitemap state.

The current contract reconciles exactly:

- 221 guide identities;
- 192 frozen baseline identities;
- 30 candidate tickets: 29 new identities plus one material update;
- 655 locale URLs: 568 baseline URLs plus 87 new-candidate URLs;
- 568 currently retained baseline sitemap URLs while all new candidates and the replacement version remain pending.

For the pending update, inventory distinguishes the unapproved candidate
version from the retained frozen baseline URL and marks deployment blocked.
Candidate metadata remains `review` while `effectivePublishedVersion` is
`frozen-baseline`; `candidateVersionInSitemap=false` and
`retainedBaselineInSitemap=true`. `effectivePublishedLastVerified` is
deliberately `null` because the candidate review date must never be presented
as the retained live version's verification date.

## Change procedure

1. Register the candidate; never alter the frozen baseline lists.
2. Add the full metadata bundle and pass generator, parity and content-node validation.
3. Keep `indexApproved=false` and omit `approvedReleaseDate` during content/technical review.
4. For an update, first verify `datePublished` still equals the frozen `baselinePublishedDate`.
5. On the real release batch, atomically set central decision, editorial status, release date, public metadata date and index approval.
6. Regenerate registry and coverage inventory; verify the candidate appears in public discovery and sitemap only after the gate is true.
7. Update `lastmod` only when visible body, structured data or an important link materially changes. A review with no substantive change updates neither `dateModified` nor sitemap `lastmod`.

STRUCTURED SEO FOUNDATION — CENTRAL REVIEW REQUIRED
