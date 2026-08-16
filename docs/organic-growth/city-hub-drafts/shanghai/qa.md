# Shanghai Destination Hub QA

- QA date: 2026-08-15
- Draft status: central review required
- Requested branch: `codex/city-hub-shanghai-draft-20260815`
- Repository base verified remotely: `origin/main@cc6be75e59155935f321df0334588b52769eb6e4`
- Primary entity: `city-shanghai` (`existing`)
- Proposed canonical paths: `/destinations/shanghai/`, `/zh/destinations/shanghai/`, `/ko/destinations/shanghai/`
- Forbidden duplicate path: `/guides/shanghai-travel-guide/`

## Delivery scope

| Required file | Status | Notes |
| --- | --- | --- |
| `hub.en.md` | Pass | Complete English editorial draft |
| `hub.zh.md` | Pass | Complete Simplified Chinese rewrite |
| `hub.ko.md` | Pass | Complete Korean rewrite |
| `entity-graph.json` | Pass | Valid JSON; draft-local entity proposals only |
| `source-log.md` | Pass | Repository, ownership and official-source ledger |
| `image-plan.md` | Pass | Real-photo and original-diagram plan with rights gates |
| `internal-links.md` | Pass with release gate | Static locale/path mapping passes; live HTTP retest required |
| `qa.md` | Pass | This report |

No homepage, template, registry, sitemap, Search Map, central entity library or indexability file is included in the change set.

## Editorial requirement checks

| Check | English | Simplified Chinese | Korean | Result |
| --- | ---: | ---: | ---: | --- |
| Complete destination-hub prose | Yes | Yes | Yes | Pass |
| Visible fact-review date | 2026-08-15 | 2026-08-15 | 2026-08-15 | Pass |
| H2 sections | 12 | 12 | 12 | Pass |
| Decision tables | 6 | 6 | 6 | Pass |
| Travel scenarios | 2 | 2 | 2 | Pass |
| FAQ questions | 10 | 10 | 10 | Pass |
| Required owner slugs represented | 8/8 | 8/8 | 8/8 | Pass |
| Unique internal targets | 9 | 9 | 9 | Pass |
| External links in body | 0 | 0 | 0 | Pass |
| `TODO`, research placeholder or merge marker | 0 | 0 | 0 | Pass |
| Forbidden duplicate canonical | Absent | Absent | Absent | Pass |

English length is 3,371 lexical words by the project validator (3,576 whitespace-delimited tokens), within the requested 2,600–3,600-word range. The Chinese body contains 6,199 Han characters in the validator's completeness measure. The Korean body contains 2,956 Korean/Latin tokens in the same measure. The translations are parallel in decision coverage but are independently phrased rather than sentence-by-sentence literal translations.

## Required content coverage

| Requirement | Location in all three locale drafts | Result |
| --- | --- | --- |
| International gateway, city experience and Yangtze Delta node | Opening and first decision section | Pass |
| First-time, urban, family and short-stop fit | Traveller-fit decision table | Pass |
| Two, three and four complete sightseeing days | Day-count section and table | Pass |
| Disneyland counted separately | Day-count table, outer-city section, scenario and FAQ | Pass |
| Bund/East Nanjing Road, People's Square, Jing'an/Former French Concession, Lujiazui and Hongqiao stay jobs | Accommodation section and table | Pass |
| PVG, SHA, Airport Link, Metro Line 2, Maglev and late arrivals | Airport section and table | Pass |
| Shanghai Hongqiao, Shanghai, Shanghai South and Shanghai Songjiang stations | Railway section and table | Pass |
| Five required attraction/task clusters | Spatial-cluster section | Pass |
| Suzhou, Hangzhou and Nanjing: day trip versus next city | Regional-route section and table | Pass |
| Start-versus-end-of-China-route decision | Route-position section and FAQ | Pass |
| Current owner articles and planning entry | Continuation section and contextual links | Static pass; live release gate below |

The hub explains Shanghai through the Huangpu west/east relationship, Puxi layers, Hongqiao transport geography and eastern resort tasks. It does not use a ranked “top attractions” structure, claim personal experience or put a year in the title.

## Ownership and non-duplication checks

The body links or routes readers to the following owners without reproducing their execution detail:

1. `shanghai-pudong-or-hongqiao-airport`
2. `shanghai-where-to-stay-first-trip`
3. `pudong-airport-to-shanghai-disneyland`
4. `shanghai-24-hour-parks-reality-check`
5. `shanghai-hangzhou-transport-route`
6. `shanghai-suzhou-hangzhou-nanjing-route-order`
7. `yangshan-automated-port-explained`
8. `beijing-zhangjiajie-shanghai-transport`

Airport terminal execution, hotel-selection detail, Disneyland transfer steps, park-by-park late-access claims, train-by-train station selection, regional city guides and Yangshan engineering/access detail remain with their established owners.

## Entity graph checks

| Check | Result |
| --- | --- |
| JSON parses | Pass |
| Nodes | 28 |
| Edges | 34 |
| Duplicate node IDs | 0 |
| Broken edge references | 0 |
| Allowed status values only | Pass: `existing`, `proposed` |
| Existing nodes | 2: `country-china`, `city-shanghai` |
| Proposed nodes | 26 |
| PVG and SHA included | Pass |
| Major visitor/stay areas included | Pass |
| Four practical railway stations included | Pass |
| Required attraction/task clusters included | Pass |
| Suzhou/Hangzhou/Nanjing route edges included | Pass |
| `province-shanghai` node | Absent |
| Central entity file modified | No |

Only `country-china` and `city-shanghai` are marked `existing`, because those are the applicable records present in `content/entities/core-places.json` at the reviewed base. All areas, transport facilities and neighbouring-city nodes remain draft-local proposals for central reconciliation.

## Internal-link and production HTTP gate

Static checks pass for locale prefixes, path spelling, owner coverage and absence of external body links. Each locale contains nine unique internal targets: the eight named content owners plus the corresponding China itinerary-planning entry.

The public guide library observed during review exposed 13 guides and did not surface the newly added Shanghai owner set. Direct public discovery confirmed the older Beijing–Zhangjiajie–Shanghai transport owner and the planning entry; repository metadata and locale bodies exist for the remaining owners on the reviewed `main`, but the available external crawler did not independently return every direct URL.

**Release gate remains open:** before central implementation or merge into a runtime page, run an HTTP status smoke test for every English, Chinese and Korean target in `internal-links.md`. Any target that does not return a genuine `200` page must remain unlinked in production body copy until deployed. This draft does not link its own proposed destination path.

## Dynamic-fact treatment

Airport services, Airport Link operations, metro relationships, train service, museum arrangements, admission rules and attraction opening conditions were reviewed against official sources on 2026-08-15. The hub keeps durable spatial and decision logic in the body, delegates changing execution detail to owner pages and asks readers to verify the operating airport, Shanghai Metro, China Railway 12306 and named venues before travel. No fixed fare, live timetable, permanent opening hour or permanent reservation rule is presented as timeless.

## Image QA

| Requirement | Plan | Result |
| --- | --- | --- |
| Real Shanghai hero | Huangpu/Bund–Lujiazui relationship, location verified | Pass at plan stage |
| Huangpu two-bank relationship graphic | Original editorial diagram, not a map screenshot | Pass at plan stage |
| Airport/station schematic | Original non-cartographic diagram | Pass at plan stage |
| Three to five supporting real photos | Five named location-accurate slots | Pass at plan stage |
| AI documentary image | Prohibited | Pass |
| Unlicensed map screenshot | Prohibited | Pass |
| Rights and source record | Required before ingestion | Open implementation gate |
| Trilingual alt text | Supplied for every planned asset | Pass |

No image binary is added by this content-only draft. Central production must secure the original file, usage right, creator/source, capture location and crop approval before publication.

## Automated and Git checks

Commands run against the local review package:

```text
python validate_shanghai_hub.py
python -m json.tool docs/organic-growth/city-hub-drafts/shanghai/entity-graph.json
git diff --cached --check
```

The final validator checks file presence, English length, decision tables, scenarios, FAQs, visible review dates, prohibited placeholders, required owners, locale prefixes, unique targets, absence of external body links, trilingual H2 correspondence, JSON parsing, node and edge integrity, status values, required entities, merge markers and final newlines.

## Repository write and PR status

The GitHub connector successfully read the repository and verified that current `main` is `cc6be75e59155935f321df0334588b52769eb6e4`. Two branch-creation attempts—one from `main` and one from the exact commit SHA—returned `403 Resource not accessible by integration`. A lower-level Git blob write returned the same `403`, confirming that the connector lacks repository content-write permission rather than only branch permission. The requested Draft PR creation call also returned `403`. The local environment could not clone the remote because outbound DNS resolution was unavailable.

Consequently:

- the requested remote branch was not created;
- no remote commit was pushed;
- no Draft PR titled `Draft Shanghai destination hub content` was opened;
- the local package and patch are the authoritative delivery artifacts for central application;
- this is an integration-permission failure, not a content or validation pass.

## Central reviewer release checklist

- [ ] Apply the provided patch to a clean worktree based on `cc6be75e59155935f321df0334588b52769eb6e4` or rebase carefully onto newer `origin/main`.
- [ ] Confirm no intervening Shanghai Hub or owner conflict exists on remote `article/*` or `codex/*` branches.
- [ ] Run the 27-target HTTP `200` smoke test from `internal-links.md` (nine targets × three locales).
- [ ] Remove or withhold any production body link that does not return a genuine `200` page.
- [ ] Review official dynamic sources again if implementation occurs materially after 2026-08-15.
- [ ] Acquire and rights-clear the planned real photographs; create the two original diagrams.
- [ ] Reconcile proposed graph nodes with any central entity additions made after the reviewed base.
- [ ] Run repository-native JSON, content, link and build checks after integration.
- [ ] Run `git diff --check` on the actual repository diff.
- [ ] Create the Draft PR with title `Draft Shanghai destination hub content`.

## QA verdict

The requested three-language Shanghai Destination Hub content package is complete and passes local structural, multilingual, ownership-boundary and entity-graph validation. It is ready for central editorial review as a content artifact. It is **not yet a remotely submitted Draft PR**, and publication remains blocked on live HTTP-link verification and image-rights implementation.
