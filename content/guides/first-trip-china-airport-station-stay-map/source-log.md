# Source log

## Scope

This page distinguishes gateway identities and uses editorial stay-area defaults. It does not publish live timetables, guaranteed transfer durations, terminal assignments or border opening hours.

## Review date

- Last full source review: 2026-08-23
- High-risk operational facts: recheck monthly or on operator change
- Editorial geography: recheck quarterly

## Primary sources

- China Railway 12306: live station-pair and passenger-service reference
- CAAC: national airport context
- Beijing Municipal Government
- Shanghai Airport Authority
- Xi'an Xianyang International Airport
- Chengdu Airport Group
- Guangzhou Baiyun International Airport
- Hangzhou Xiaoshan International Airport
- Chongqing Transport Commission
- Guilin Liangjiang International Airport
- Shenzhen Port Office and Shenzhen Municipal Government
- Zhangjiajie Municipal Government

The complete URLs and per-source review date are rendered in the guide's sources block.

## Editorial claims

The first-trip stay defaults, one-move rules and last-night rules are Homeground editorial judgements. They are framed as conditional decisions and must not be presented as official recommendations.

## Published asset package

- Version: `1.0`
- Canonical page: `https://homegroundchina.com/guides/first-trip-china-airport-station-stay-map/`
- Distribution: national SVG/PNG, ten SVG/PNG city cards, CSV, portable JSON, documentation, checksums and ZIP.
- Licence: Homeground's original map graphics, layout, annotations and compiled data are available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Rights holder: 张家界市永定区本境文化交流工作室（个体工商户）, operating as Homeground China.
- Dynamic-fact warning: the package is a reviewed editorial schematic, not a live timetable, terminal assignment, route guarantee, border-status feed or navigation product. Recheck decision-critical facts with the current operator.
- Rebuild command: `npm run asset:ten-city`. The generator normalises public text files to LF and writes a deterministic ZIP dated from `asset-data.en.json.reviewedAt`.

## Localized publication

- ZH and KO are full editorial equivalents of the EN content identity, not translated placeholders.
- `asset-copy.zh.json` and `asset-copy.ko.json` localize the visible city matrix, stay-area defaults, wrong-node warnings, source labels and map/card text while preserving the reviewed node IDs and official source URLs in `asset-data.en.json`.
- Each localized page uses its own 1600 × 1000 hero and localized Beijing, Shanghai and Zhangjiajie spotlight cards. The public CC BY download pack remains the versioned English editorial distribution and is identified as such in the ZH/KO page copy.
- The three locale URLs use reciprocal `en`, `zh-Hans`, `ko` and `x-default` alternates, with a self-canonical on each page.
