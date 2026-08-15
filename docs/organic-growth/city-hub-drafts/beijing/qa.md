# Beijing Destination Hub — QA

**Draft:** `city-hub-beijing`
**Primary entity:** `city-beijing`
**Review date:** 2026-08-15
**Requested source baseline:** `origin/main` containing `cc6be75e59155935f321df0334588b52769eb6e4`
**Requested branch:** `codex/city-hub-beijing-draft-20260815`
**Editorial state:** central review required

## Scope and repository-boundary checks

- At final verification, remote `refs/heads/main` pointed to `cc6be75e59155935f321df0334588b52769eb6e4`; that commit and its real root tree were used as the baseline.
- Remote `article/*` and `codex/*` work was checked for a competing Beijing Destination Hub owner before drafting.
- The draft adds only eight files under `docs/organic-growth/city-hub-drafts/beijing/`.
- It does not modify the homepage, shared templates, guide registry, sitemap, Search Map, central entity file or indexability controls.
- It proposes `/destinations/beijing/`, `/zh/destinations/beijing/` and `/ko/destinations/beijing/` only.
- It does not create `/guides/beijing-travel-guide/`.
- Beijing is represented as a direct-administered municipality under China; no additional administrative parent is inserted.

## Content checks

| Check | English | Chinese | Korean | Result |
|---|---:|---:|---:|---|
| Complete traveller-facing body | yes | yes | yes | pass |
| Decision tables | 5 | 5 | 5 | pass |
| Traveller scenarios | 2 | 2 | 2 | pass |
| FAQ questions | 10 | 10 | 10 | pass |
| PEK and PKX covered | yes | yes | yes | pass |
| Eight railway stations covered | 8 | 8 | 8 | pass |
| Same five body-link roles | 5 | 5 | 5 | pass |
| Placeholder markers in Hub body | 0 | 0 | 0 | pass |

The English body contains 3,569 whitespace-delimited words, within the requested 2,600–3,600 range. Chinese and Korean retain the same decision structure, factual entities, route choices, scenarios, tables and FAQ coverage; neither is a summary of the English draft.

All fixed modules are present: Beijing’s first-trip role; suitability; minimum, recommended and deeper stays with hotel nights separated from complete sightseeing days; Wangfujing/Dongdan, Qianmen, Gulou–Shichahai and Dongzhimen/Chaoyang; PEK, PKX and eight stations; the four spatial tasks; onward roles for Xi’an, Shanghai, Zhangjiajie and Chengde; current Homeground reading paths; FAQ; Route Finder; and itinerary review.

## Entity-graph checks

`entity-graph.json` parses successfully.

- 70 nodes and 68 edges.
- Every node and edge has an explicit `existing` or `proposed` status.
- The graph includes country, direct-administered municipality, city, attraction clusters, PEK/PKX, eight railway stations, four stay areas, intercity route edges, ten FAQ intents, two consultation actions and all twelve required child owners.
- `centralEntityMutation` is `false`; the draft does not edit `content/entities/core-places.json`.
- Required owners without independent public locale verification remain pending body links.
- The live ten-day route owner and two additional live supporting owners are identified separately from pending owners.

## Link and owner checks

The three bodies contain one-to-one locale equivalents for five link roles:

1. Beijing–Zhangjiajie–Shanghai door-to-door transport comparison.
2. Beijing–Zhangjiajie–Shanghai ten-day route calculation.
3. Whole-route pace check.
4. Route Finder for an unformed route.
5. China itinerary review for an existing route.

The body does not introduce a pending Beijing child path. All twelve required owners remain connected through `entity-graph.json` and `internal-links.md`, and each owner’s execution boundary is stated.

## Source and image checks

- Source hierarchy prioritises the Beijing Municipal Government, Palace Museum, National Museum of China, official Great Wall sources, airport sources, Beijing Subway and China Railway 12306.
- Reservation, opening, transport, fare and schedule facts carry a review date of 2026-08-15 and are explicitly marked for travel-date rechecking.
- Forums, autocomplete and People Also Ask are not used as factual or search-volume evidence.
- `image-plan.md` contains five traceable documentary-photo candidates plus one original editorial relationship diagram.
- Every documentary candidate records place, source page, creator, licence, verification date, trilingual alt text, caption and attribution/crop requirements.
- No AI-generated documentary tourism photograph is proposed.

## Automated and Git validation

The local content validator checks:

- exact eight-file delivery set;
- frontmatter, canonical proposals and primary entity;
- English word count;
- tables, scenarios and FAQ counts;
- airports and all eight railway stations in each language;
- fixed module coverage and forbidden path checks;
- locale-equivalent internal-link roles;
- JSON parsing, required nodes, owners and status values;
- official-source domains and review dates;
- image-plan provenance and licence fields;
- `git diff --check` on the real baseline tree and the draft tree.

The portable patch is also tested with `git apply --check` in an independent repository.

## Remote delivery state

The GitHub integration can read the repository and the requested baseline, but branch creation returned HTTP 403 with `Resource not accessible by integration`. Therefore the requested remote branch, push and Draft PR titled **Draft Beijing destination hub content** could not be created from this environment. A real tree-level local commit based on the requested baseline, a portable patch, a complete archive and a validation report are produced for lossless application after write access is restored. No merge or deployment was attempted.
