# 60-guide / 180-page browser QA — 2026-08-22

Status: **PASS — 180 unique locale pages / 360 viewport runs / 0 failures**

## Method

The production export was served locally from `out/`. Every one of the 60 guide identities was opened in EN, Simplified Chinese and Korean with the Homeground in-app browser at 1440 × 1000 and 390 × 844. A separate HTTP follow-up requested the same 180 exported paths and received 180 HTTP 200 responses.

Each browser run checked:

- EN / 中文 / 한국어 entries exist;
- self canonical and EN / zh-Hans / ko / x-default hreflang are exact;
- every image is complete with non-zero natural dimensions;
- the sources-and-credit disclosure exists and is closed by default;
- localized article links do not fall back to English;
- the H1 uses the current Homeground locale font;
- tables use a local horizontal-scroll wrapper;
- the document has no page-level horizontal overflow;
- internal `href` / `src` targets resolve in the production export.

## Results

| Scope | Runs | PASS | FAIL |
|---|---:|---:|---:|
| Desktop 1440 × 1000 | 180 | 180 | 0 |
| Mobile 390 × 844 | 180 | 180 | 0 |
| English | 120 | 120 | 0 |
| Simplified Chinese | 120 | 120 | 0 |
| Korean | 120 | 120 | 0 |
| **Total viewport runs** | **360** | **360** | **0** |

All 180 unique paths returned HTTP 200 in the follow-up. Maximum page-level overflow was 0 px, and the browser console contained 0 error entries at completion.

## Verified title fonts

- EN: `Georgia, "Times New Roman", Cambria, serif`
- zh-Hans: `"Homeground Serif SC", "Noto Serif SC", "Source Han Serif SC", "Songti SC", STSong, serif`
- KO: `"Homeground MaruBuri", "Noto Serif KR", AppleMyungjo, Batang, serif`

## Full page ledger

The companion JSON records both viewport results and every binary check for all 180 paths: `docs/organic-growth/content-scale-browser-qa-2026-08-22.json`.
