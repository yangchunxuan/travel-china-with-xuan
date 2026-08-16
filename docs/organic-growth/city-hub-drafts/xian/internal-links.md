# Internal-link plan — Xi’an Destination Hub

Status: `CONDITIONAL LINKS — DIRECT ONLINE-200 GATE REQUIRED`

Reviewed: 2026-08-15

Proposed hub paths:

- EN: `/destinations/xian/`
- ZH-Hans: `/zh/destinations/xian/`
- KO: `/ko/destinations/xian/`

No `/guides/xian-travel-guide/` path is permitted.

## Required owner handoffs

| Owner | Hub decision that triggers the handoff | English candidate | Simplified Chinese candidate | Korean candidate |
|---|---|---|---|---|
| Terracotta execution | The traveller protects the Lintong day and needs booking, transport, pits, Lishan and return | `/guides/terracotta-warriors-without-tour/` | `/zh/guides/terracotta-warriors-without-tour/` | `/ko/guides/terracotta-warriors-without-tour/` |
| Shaanxi History Museum execution | The traveller chooses the south-side museum cluster and needs the correct venue and passport reservation | `/guides/shaanxi-history-museum-booking-and-collection-plan/` | `/zh/guides/shaanxi-history-museum-booking-and-collection-plan/` | `/ko/guides/shaanxi-history-museum-booking-and-collection-plan/` |
| Xi’an lodging comparison | The traveller needs property-level comparison among the central wall, an exact gate and Dayanta | `/guides/xian-where-to-stay-city-wall-or-dayanta/` | `/zh/guides/xian-where-to-stay-city-wall-or-dayanta/` | `/ko/guides/xian-where-to-stay-city-wall-or-dayanta/` |
| Beijing–Xi’an–Chengdu order | The traveller includes all three cities and needs gateway/direction logic | `/guides/beijing-xian-chengdu-route-order/` | `/zh/guides/beijing-xian-chengdu-route-order/` | `/ko/guides/beijing-xian-chengdu-route-order/` |
| City-wall interpretation | The traveller wants to understand gates, repair, reconstruction and urban order | `/guides/chinese-city-walls-gates-and-urban-order/` | `/zh/guides/chinese-city-walls-gates-and-urban-order/` | `/ko/guides/chinese-city-walls-gates-and-urban-order/` |
| Ritual-bronze interpretation | A museum-focused traveller needs an evidence-led object-reading method | `/guides/ritual-bronze-vessels-and-inscriptions/` | `/zh/guides/ritual-bronze-vessels-and-inscriptions/` | `/ko/guides/ritual-bronze-vessels-and-inscriptions/` |

These are **candidate paths**, not a statement that production currently returns 200.

## Current body state

The EN/ZH/KO bodies identify every required owner by title and slug but intentionally contain no active Markdown internal links. This prevents an unverified route from being published in breach of the online-200 rule.

After the direct status gate passes, central review may replace the title-and-slug references with links in all three locales together.

## Placement rules after activation

1. Link the lodging owner in the lodging section and optionally once in the current-articles module.
2. Link the Terracotta owner in the Lintong section and the current-articles module; do not repeat it in every FAQ.
3. Link the museum owner in the south-side section and the current-articles module.
4. Link the route-order owner in Scenario 1 or the onward-city section, not in the opening paragraph.
5. Link the City Wall owner only where material/repair interpretation is introduced.
6. Link the bronze owner only in the current-articles module; the hub does not need a bronze-history detour.
7. Use descriptive anchors, never generic “click here.”
8. Do not add speculative Shaanxi, Mount Hua, Luoyang or Pingyao links until a reviewed live owner exists.

## Repository resolution

At base commit `cc6be75e59155935f321df0334588b52769eb6e4`, all six owner folders exist with EN/ZH/KO content and metadata resources. This confirms ownership and route intent; it does not prove production HTTP status.

The production guide-index snapshot retrieved during review displayed 13 public guides and did not list these six recent Xi’an-related owners. Because indexing and list visibility are not direct HTTP status tests, publication still requires the matrix below.

## Direct online-200 release test

Run from a network-enabled release environment, following redirects and checking the final document:

```bash
python - <<'PY'
import requests

paths = [
    "/guides/terracotta-warriors-without-tour/",
    "/guides/shaanxi-history-museum-booking-and-collection-plan/",
    "/guides/xian-where-to-stay-city-wall-or-dayanta/",
    "/guides/beijing-xian-chengdu-route-order/",
    "/guides/chinese-city-walls-gates-and-urban-order/",
    "/guides/ritual-bronze-vessels-and-inscriptions/",
]
locale_prefixes = ["", "/zh", "/ko"]
base = "https://homegroundchina.com"

failed = []
for prefix in locale_prefixes:
    for path in paths:
        url = f"{base}{prefix}{path}"
        response = requests.get(url, timeout=20, allow_redirects=True)
        content_type = response.headers.get("content-type", "")
        print(response.status_code, response.url, content_type, url)
        if response.status_code != 200 or "text/html" not in content_type:
            failed.append((url, response.status_code, response.url, content_type))

if failed:
    raise SystemExit(f"ONLINE-200 gate failed: {failed}")
PY
```

## Acceptance criteria

Each candidate must meet all conditions:

- final response is HTTP 200;
- final response is HTML and contains the intended article body;
- page is not a soft 404, generic app shell or access challenge;
- canonical and locale match the intended owner;
- page is not preview-only or `noindex`, unless the destination hub is held too;
- redirects do not cross to another language or content owner;
- rendered title and main body correspond to the expected article.

If any target fails, keep that title as plain text and hold the public link. Do not substitute an unrelated older article merely to satisfy a link count.

## Inbound-link proposal for a later implementation PR

This content-only draft does not edit existing owners. A later central implementation may add one contextual link back to the destination hub from:

- the opening or final planning section of each Xi’an owner;
- the Beijing–Xi’an–Chengdu route-order page where Xi’an nights are introduced;
- the relevant Places collection or a future reviewed Shaanxi parent hub.

Suggested back-link anchors:

- EN: `Plan the Xi’an stop as a whole`
- ZH: `先决定西安住几晚、住哪里`
- KO: `시안 체류 전체 구조 정하기`

No inbound link should be added before the destination route, canonical, publication status and indexability are approved centrally.
