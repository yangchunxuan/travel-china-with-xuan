# Homeground search collection release — 2026-08-13

## Decision

Homeground now uses one reviewed hierarchy for all 163 guide identities:

`Guides → one of 9 sections → one of 27 collections → article`

The collection registry is the canonical assignment layer. Every guide must
resolve to exactly one collection before generation, type-checking or export
can pass. The runtime does not infer ownership from a title, URL keyword or
visual symmetry.

## Indexation rule

- All 27 collection routes exist in English, Chinese and Korean.
- A collection remains `noindex,follow` and outside the sitemap while it has
  fewer than three reviewed guides.
- A collection with at least three reviewed guides is published and may enter
  the sitemap only after its multilingual scope, assignments and export
  contract have been reviewed.
- An empty collection is not presented as a finished product. Its route exists
  to preserve the information architecture, but remains outside search.
- Tools do not become indexable merely because an article mentions a tool.

At release, 17 collections have both the three-guide minimum and an explicit
editorial indexation approval. Ten remain `noindex,follow`: all three timing
collections, one stay collection, all three tool collections, and all three
service collections. Reaching three guides never changes that state by itself.

## Section migration

`culture` and `when-to-go` were previously protected as Phase 0 review-only
sections. Their indexation change is recorded in
`content/search-platform-indexability-migrations.json` and the runtime verifies
both the reviewed starting state and target state. This avoids silently
changing protected search pages.

- `culture` now has 36 reviewed guides across three populated collections.
- `when-to-go` now has four reviewed guides and a monthly refresh policy.
- `tools` remains review-only because it has no public tool product.

## Editorial identity

All 163 article identities now show Evan as the visible author and fact
reviewer. The same identity is used in Article structured data:

- Person ID: `https://homegroundchina.com/studio/evan/#person`
- Profile: `/studio/evan/`, `/zh/studio/evan/`, `/ko/studio/evan/`
- Publisher remains Homeground China as an Organization.
- The visible fact-review date comes from each guide's reviewed source date;
  it is not inferred from deployment time.

## Content strengthening and internal links

- The ten English guides that were below 700 words were expanded to 915–1,060
  words, with matching Chinese and Korean decision content.
- The 46 guide identities that had no body-level inbound link now receive two
  contextual inbound links in every language.
- Article breadcrumbs and structured breadcrumbs include the section and
  collection, so the hierarchy is visible to readers as well as machines.

## Automated release contract

The export guard verifies:

- 27 section-locale pages;
- 81 collection-locale pages;
- three Evan profile pages;
- canonical and reciprocal hreflang output;
- robots/sitemap agreement;
- a minimum of three guides for every indexable collection;
- Evan visible attribution and author/reviewer structured data on every
  exported Article page;
- every local link and image on an indexable page resolves to an exported
  target.

Any future collection, author or indexation change must preserve this contract
or explicitly update the reviewed migration record.
