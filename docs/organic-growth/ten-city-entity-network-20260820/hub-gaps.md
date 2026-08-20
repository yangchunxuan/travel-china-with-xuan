# Hub coverage and support-owner register

Checked against `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`, which merged PR #74 head `b66fc6cbca6f040a65db0d7e3727e3b2dac24580`, on 2026-08-20. Central's formal release baseline remains five published Hubs; this branch adds an explicit runtime gate for that distinction.

An owner counts only when it has a distinct canonical task and complete trilingual runtime or content in the layer being assessed. A guide that merely mentions the city does not count. The counts below use the post-merge current-main baseline; formal Hub release remains a separate decision.

## Beijing — published

Coverage: `W/N/S/G/A/R/O/F/E = ✓/✓/✓/✓/✓/✓/✓/✓/✓`

Qualified owners (11):

- `beijing-where-to-stay-first-trip`
- `beijing-courtyard-hotel-or-modern-hotel`
- `which-beijing-railway-station`
- `beijing-south-station-to-capital-or-daxing-airport`
- `beijing-to-mutianyu-great-wall-transfer`
- `beijing-to-badaling-great-wall-transfer`
- `forbidden-city-for-foreign-visitors`
- `temple-of-heaven-gates-and-ritual-sequence`
- `summer-palace-gates-route-and-boat-plan`
- `national-museum-of-china-booking-and-route`
- `beijing-xian-chengdu-route-order`

Gap: no release blocker. Preserve the exact-wall-section limitation on the generic Great Wall photo, and keep reservation facts dynamic.

## Shanghai — published

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/△`

Qualified owners (8):

- `shanghai-where-to-stay-first-trip`
- `shanghai-pudong-or-hongqiao-airport`
- `pudong-airport-to-shanghai-disneyland`
- `shanghai-hangzhou-transport-route`
- `shanghai-suzhou-hangzhou-nanjing-route-order`
- `shanghai-24-hour-parks-reality-check`
- `yangshan-automated-port-explained`
- `how-to-read-a-chinese-sponge-city`

Gap: no release blocker under the existing formal baseline, but the Hub has no dedicated ticket/visit owner. `pudong-airport-to-shanghai-disneyland` is a gateway-transfer owner, not a ticket owner. The entity audit also found older Search Map overlay IDs `place-shanghai`; central Search Map work must migrate those to `city-shanghai` without making a second owner.

## Xi'an — published

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/✓`

Qualified owners (6):

- `terracotta-warriors-without-tour`
- `shaanxi-history-museum-booking-and-collection-plan`
- `xian-where-to-stay-city-wall-or-dayanta`
- `beijing-xian-chengdu-route-order`
- `chinese-city-walls-gates-and-urban-order`
- `ritual-bronze-vessels-and-inscriptions`

Gap: the Hub carries the airport/station decision itself. A future Xi'an gateway selector would improve handoff depth but is not required to keep the current Hub published. Qinhan Museum must be hosted through its actual Xixian/Qinhan geography rather than falsely attached to central Xi'an.

## Chengdu — published

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/△`

Qualified owners (7):

- `chengdu-panda-base-or-dujiangyan-panda-valley`
- `sanxingdui-museum-booking-and-gallery-order`
- `chengdu-jiuzhaigou-transport-route`
- `chengdu-greenway-city-ring`
- `sichuan-opera-face-changing-with-context`
- `beijing-xian-chengdu-route-order`
- `china-in-october-golden-week-or-later`

Gap: the Hub now explicitly says to shorten Chengdu when the traveller wants only remote Sichuan landscapes and no city time. There is still no specialist Chengdu stay-area or airport/station owner, so the hotel execution handoff remains partial. The Jinjiang image must remain a general river-setting image until the exact bridge identity is verified.

## Guangzhou — published

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/△`

Qualified owners (6):

- `guangzhou-baiyun-airport-t2-t3`
- `guangzhou-hong-kong-transport-route`
- `guangzhou-macau-transport-route`
- `guangzhou-shenzhen-hong-kong-route-order`
- `how-guangzhou-morning-tea-works`
- `when-metro-construction-meets-archaeology`

Gap: only one owner above the release floor. There is no Guangzhou stay-area owner or destination ticket owner; `guangzhou-baiyun-airport-t2-t3` is correctly treated as a gateway owner. Add the stay-area owner and a railway-station selector before removing or consolidating any existing owner. Current main's destination-token map prevents these guides from silently falling back to `country-china`.

## Hangzhou — release-candidate; code merged, formal release withheld

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/△`

Qualified owners in current main (7):

- `shanghai-hangzhou-transport-route`
- `shanghai-suzhou-hangzhou-nanjing-route-order`
- `liangzhu-ruins-park-and-museum-sequence`
- `white-snake-legend-hangzhou-zhenjiang`
- `grand-canal-everyday-urban-history`
- `tea-landscape-regions-of-china`
- `when-metro-construction-meets-archaeology`

Gap: no Hangzhou stay-area owner, only one reused Hero, no explanatory body figures, and weaker photographer metadata than the published-city asset records. PR #74's prefilled `datePublished` must be replaced with the actual release date if central authorises publication.

## Zhangjiajie — release-candidate; code merged, formal release withheld

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/✓`

Qualified owners in current main (10):

- `zhangjiajie-itinerary`
- `zhangjiajie-national-forest-park-tickets-and-entrances` — merged through PR #74
- `zhangjiajie-city-or-wulingyuan-hotel-base`
- `zhangjiajie-glass-bridge-vs-skywalk`
- `zhangjiajie-older-travellers`
- `best-zhangjiajie-night-show`
- `beijing-zhangjiajie-shanghai-transport`
- `beijing-zhangjiajie-shanghai-10-days`
- `zhangjiajie-from-malaysia`
- `china-in-october-golden-week-or-later`

Gap: one Hero cannot explain gates, ticket systems, the city/Wulingyuan base decision or gateway transfers. The candidate has no independent Hub source log, image plan or QA package. Create that ledger and body-image layer before release; do not identify a precise gate or plateau from the generic peak-forest Hero.

## Chongqing — docs-only, runtime blocked

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/△`

Qualified owners in current main (5; the older docs graph still connects only four):

- `chongqing-upper-lower-city-orientation`
- `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba`
- `china-tiankeng-sinkholes-explained`
- `sichuan-opera-face-changing-with-context`
- `chongqing-railway-station-selector` — merged through PR #74

Gap: the old Hub package still connects only the earlier four owners. It has not been reconciled to the station selector, its specialist links were withheld pending production-200 checks, and no Hub images or runtime loader exist. The municipality must remain directly under China, never under Sichuan.

## Guilin — blocked

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/△`

Qualified owners in current main (2):

- `guilin-yangshuo-transport-route`
- `china-in-october-golden-week-or-later`

Minimum reinforcement owners, in priority order:

1. Guilin airport and railway gateway selector;
2. Yangshuo town versus Yulong countryside stay-base decision;
3. Longji day trip versus overnight decision;
4. Li River cruise versus Yulong bamboo-raft product boundary.

Gap: at least three of the first four must become qualified owners before the Hub reaches five. There is no production Hero; the one specific licensed Yangshuo Station image proves station identity only and cannot stand in for the regional landscape.

## Shenzhen — blocked

Coverage: `✓/✓/✓/✓/✓/✓/✓/✓/△`

Qualified owners in current main (4):

- `shenzhen-where-to-stay-futian-luohu-nanshan`
- `shenzhen-hong-kong-transport-route`
- `guangzhou-shenzhen-hong-kong-route-order`
- `shenzhen-low-altitude-city-infrastructure`

Required fifth owner: a bounded airport-and-railway-station selector that also prevents station/port name collisions.

Gap: production-200 checks and inbound links for the four owners are not closed; real photographs remain candidates rather than ingested assets; the older Search Map overlay uses `place-shenzhen`. The canonical city ID is `city-shenzhen`, and Futian Railway Station, Futian Port, Shenzhen Railway Station and Luohu Port must remain distinct entities.

## Gate summary

| City | Five-owner gate in current main | Official-source layer | Production Hero | Runtime Hub | Result |
|---|---|---|---|---|---|
| Beijing | Pass | Pass | Pass | Pass | Published |
| Shanghai | Pass | Pass | Pass | Pass | Published |
| Xi'an | Pass | Pass | Pass | Pass | Published |
| Chengdu | Pass | Pass | Pass with one caption limitation | Pass | Published; maintain |
| Guangzhou | Pass at 6 | Pass | Pass | Pass | Published; thin margin |
| Hangzhou | Pass | Pass | Partial | Code in main, lifecycle-gated | Release candidate |
| Zhangjiajie | Pass at 10 in current main | Pass | Partial | Code in main, lifecycle-gated | Release candidate |
| Chongqing | Pass at 5 in current main; four in the old docs graph | Pass in docs | No | No | Docs-only / blocked |
| Guilin | Fail at 2 | Pass in docs | No | No | Blocked |
| Shenzhen | Fail at 4 | Pass in docs | Candidate only | No | Blocked |
