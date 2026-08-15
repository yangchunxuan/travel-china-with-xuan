# QA — Xi’an Destination Hub draft

Status: `CENTRAL REVIEW REQUIRED`

Review date: 2026-08-15

## 1. Scope and canonical

- [x] Primary entity is `city-xian`.
- [x] Existing English name `Xi'an` and alias `Xian` are preserved in `entity-graph.json`.
- [x] Proposed canonical is `/destinations/xian/`, with `/zh/` and `/ko/` localized proposals.
- [x] No `/guides/xian-travel-guide/` page or file was created.
- [x] Shaanxi is a proposed parent only; province-wide facts are not represented as Xi’an city facts.
- [x] The hub owns broad first-trip, night-count, city-level base and onward-route decisions.
- [x] Terracotta, Shaanxi History Museum, detailed lodging, route order, wall interpretation and bronze interpretation remain with their existing owners.

## 2. Required deliverables

Expected files under `docs/organic-growth/city-hub-drafts/xian/`:

1. `hub.en.md`
2. `hub.zh.md`
3. `hub.ko.md`
4. `entity-graph.json`
5. `source-log.md`
6. `image-plan.md`
7. `internal-links.md`
8. `qa.md`

- [x] All eight files exist.
- [x] No public route, component, registry, sitemap, homepage, Search Map, indexability or public asset file is part of the draft change.

## 3. Body completeness

All three locales contain:

- [x] Xi’an as a first-China historical core and rail node.
- [x] Traveller-fit section covering history, archaeology, families and short routes.
- [x] One-, two-, three- and four-night/Mount Hua differences using complete sightseeing days.
- [x] Bell Tower/inside wall, Yongningmen and Dayanta/Xiaozhai lodging bases.
- [x] XIY, Xi’an North, Xi’an Railway Station and Xi’an East relationships.
- [x] Old-city, south-side, Lintong and external Mount Hua clusters.
- [x] Beijing, Chengdu, Luoyang and Pingyao onward-route roles.
- [x] Current-Homeground-owner module.
- [x] Natural consultation entry with written scope/fee language.

### Quantitative structure

Targets:

- English: 2600–3600 words, excluding YAML front matter;
- Chinese and Korean: equally complete, not summaries;
- at least three decision tables per locale;
- at least two travel scenarios per locale;
- 8–10 FAQ per locale.

Authored structure before final scripted validation:

- English: five decision tables, two scenarios and nine FAQ.
- Simplified Chinese: five decision tables, two scenarios and nine FAQ.
- Korean: five decision tables, two scenarios and nine FAQ.

## 4. Historical and geographic discipline

- [x] The page is not a Qin/Tang encyclopedia.
- [x] Unverified dynasty-count slogans are rejected rather than used as evidence or planning information.
- [x] History explains visible city structure: wall, central avenues, south-side museum/pagoda and Lintong separation.
- [x] Modern Tang-themed streets, lighting and performances are not described as surviving Tang fabric.
- [x] Lintong is distinguished from the central hotel field.
- [x] XIY is distinguished from central Xi’an and from Xianyang as a geographic host side.
- [x] Mount Hua is placed in the Huayin/Weinan direction outside the Xi’an urban cluster.
- [x] Xi’an North, Xi’an Railway Station, Xi’an East and Huashan North are distinct nodes.

## 5. Dynamic-information discipline

- [x] Operational review date is 2026-08-15 in all three bodies.
- [x] No live train number, fare, inventory or fixed journey time is published.
- [x] No static metro first/last-train timetable is published.
- [x] No permanent airport airline-terminal allocation is promised.
- [x] No permanent City Wall entrance/cycling/night-operation schedule is promised.
- [x] No permanent Mount Hua price, ropeway time or weather condition is promised.
- [x] Terracotta and Shaanxi History Museum booking detail is delegated to the owner articles.
- [x] Source log records update triggers.

## 6. Entity graph

- [x] JSON parses successfully.
- [x] Every node carries `status: existing` or `proposed`.
- [x] `city-xian` is existing.
- [x] `province-shaanxi` is proposed and has a city/province scope warning.
- [x] Central Xi’an areas, Lintong, XIY, rail stations and external nodes are separated.
- [x] XIY has a geographic-host relationship to Xianyang and a serves relationship to Xi’an.
- [x] Mount Hua is under Huayin/Weinan, not Xi’an.
- [x] Required owner articles appear as existing content nodes with delegation edges.
- [x] The draft does not mutate `core-places.json`.

## 7. Images

- [x] Real Xi’an urban hero specified.
- [x] City Wall–Dayanta–Lintong relationship diagram specified.
- [x] Three to five accurate real location photographs specified.
- [x] Main Building/Qin-Han Gallery confusion explicitly blocked.
- [x] AI documentary photography prohibited.
- [x] Candidate source pages and license-review steps recorded.
- [x] No public image asset is added in this content-only draft.

## 8. Internal links

- [x] All six mandatory owners are represented in EN/ZH/KO candidate paths.
- [x] No speculative `/guides/xian-travel-guide/` link exists.
- [x] Link relationships preserve owner boundaries in `entity-graph.json` and `internal-links.md`.
- [x] The three bodies contain no unverified active Markdown internal links.
- [ ] `ONLINE-200` release gate: every final owner URL must be checked from a network-enabled release environment before activation.

The unchecked item is a hard publication gate. Plain title-and-slug references must remain until the direct 200, correct-locale, intended-body and non-soft-404 checks pass.

## 9. Automated validation commands

Run from the repository root after staging the draft files:

```bash
python - <<'PY'
from pathlib import Path
import json
import re

root = Path("docs/organic-growth/city-hub-drafts/xian")
expected = {
    "hub.en.md", "hub.zh.md", "hub.ko.md", "entity-graph.json",
    "source-log.md", "image-plan.md", "internal-links.md", "qa.md",
}
actual = {p.name for p in root.iterdir() if p.is_file()}
assert actual == expected, (actual, expected)

specs = {
    "hub.en.md": ("## 10. Frequently asked questions", r"^### Scenario \d"),
    "hub.zh.md": ("## 10. 常见问题", r"^### 情境 \d"),
    "hub.ko.md": ("## 10. 자주 묻는 질문", r"^### 상황 \d"),
}

for name, (faq_heading, scenario_pattern) in specs.items():
    text = (root / name).read_text(encoding="utf-8")
    assert len(re.findall(r"^\|\s*---", text, re.M)) >= 3, name
    assert len(re.findall(scenario_pattern, text, re.M)) >= 2, name
    faq_section = text.split(faq_heading, 1)[1]
    faq_count = len(re.findall(r"^### ", faq_section, re.M))
    assert 8 <= faq_count <= 10, (name, faq_count)
    assert "/guides/xian-travel-guide/" not in text
    assert not re.search(r"\]\(/(?:zh/|ko/)?guides/", text), name

english = (root / "hub.en.md").read_text(encoding="utf-8")
english_body = english.split("---", 2)[2]
words = re.findall(r"\b[\w’'-]+\b", english_body)
assert 2600 <= len(words) <= 3600, len(words)
print("English words:", len(words))

zh = (root / "hub.zh.md").read_text(encoding="utf-8")
ko = (root / "hub.ko.md").read_text(encoding="utf-8")
print("Chinese Han characters:", len(re.findall(r"[\u4e00-\u9fff]", zh)))
print("Korean Hangul syllables:", len(re.findall(r"[\uac00-\ud7a3]", ko)))

with (root / "entity-graph.json").open(encoding="utf-8") as handle:
    graph = json.load(handle)
assert graph["hub"]["primaryEntityId"] == "city-xian"
assert graph["hub"]["primaryEntityStatus"] == "existing"
assert any(n["id"] == "city-xian" and n["status"] == "existing" for n in graph["nodes"])
assert all(n.get("status") in {"existing", "proposed"} for n in graph["nodes"])
print("Entity nodes:", len(graph["nodes"]), "edges:", len(graph["edges"]))
PY

git diff --cached --check
git diff --cached --name-only
```

Expected changed paths are only the eight draft files above.

## 10. Central-review decisions still required

1. Approve or revise the proposed Shaanxi parent relation in a separate entity-governance change.
2. Approve destination-hub route implementation and indexability in a separate public-system change.
3. Confirm all 18 localized owner candidates return direct final HTTP 200, then activate the body links in all three locales together.
4. Acquire, process and attribute the approved real images.
5. Recheck dynamic operations on the publication date and update EN/ZH/KO together.
6. Decide whether the current-articles module renders as inline links, cards or a compact owner list.

The present draft is deliberately content-only and performs none of those public mutations.
