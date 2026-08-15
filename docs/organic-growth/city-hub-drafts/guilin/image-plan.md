# Guilin destination hub — image plan

Status: **planning only; no public asset is added by this patch**
Image policy: real documentary photography for places and transport; a deliberately designed topology diagram for spatial explanation. **No AI-generated or AI-reconstructed landscape photograph is permitted.**

## 1. Visual job of the page

The image set must prevent the exact error the copy is designed to correct: treating “Guilin” as one city-shaped attraction. A reader should be able to distinguish, without reading every caption:

- Guilin city as an urban gateway;
- the Li River as a corridor and large-cruise route;
- Yangshuo county town/West Street as a practical base;
- Yulong countryside as a different rural stay task;
- Xingping as a distinct town and rail/river base;
- Longji as a separate mountain-and-village detour in Longsheng.

Do not use six near-identical karst panoramas. Every image must have a geographic or decision purpose.

## 2. Required slots

| Slot | Required scene | Decision purpose | Preferred acquisition | Prohibited substitution |
|---|---|---|---|---|
| H1 hero | Real Li River landscape with a legible river corridor and human-scale vessel, photographed in the Guilin–Yangshuo region | Establish landscape without implying one exact hotel base | Homeground-owned/commissioned photograph; otherwise a verified Wikimedia Commons image with commercial-use and derivative rights | AI landscape; generic China karst; image whose exact location cannot be verified |
| T1 regional topology | Editorial diagram: Longji/Longsheng north; KWL and three Guilin stations around Guilin city; Mopanshan/Zhujiang to Li River; Yangshuo town/Yulong countryside; Xingping/Yangshuo Station; arrows to Guangzhou/Hong Kong/Chongqing | Explain the whole page in one view | Original SVG/PNG built from `entity-graph.json`; not to scale; all nodes labelled in the current locale | Decorative map without stations/ports; Google/Apple map screenshot; AI fantasy map |
| P1 Guilin city | Real urban Guilin scene showing city-and-karst relationship, ideally a central river/lake or Elephant Trunk Hill context with ordinary urban access visible | Separate the city gateway from Yangshuo countryside | Owned/commissioned; verified Commons category fallback | A Li River rural panorama labelled “Guilin city” |
| P2 Yangshuo town | Real county-town or West Street-area street scene with pedestrian/vehicle access context | Show why central Yangshuo is an evening-convenience base | Owned/commissioned; verified Commons image | Yulong countryside hotel marketed as “Yangshuo centre” |
| P3 Yulong countryside | Real rural road, fields and river/cycling context; no staged luxury-hotel advertisement | Show the dispersed slow-stay task and last-mile issue | Owned/commissioned preferred | A close-up raft with no identifiable countryside context |
| P4 Xingping | Real Xingping town/river-bank context, distinguishable from West Street; may include karst and local built environment | Establish Xingping as a separate base | Owned/commissioned; verified Commons fallback | Generic “20-yuan viewpoint” crop with no location evidence |
| P5 Yangshuo Station | Existing real station exterior and forecourt | Make the station-location warning concrete | Existing licensed derivative may be reused after credit verification | Current timetable, coach or operating status inferred from the photograph |
| P6 water-product comparison | Two real images: large star-rated cruise at an official port/on route; manually propelled Yulong bamboo raft on an authorised section | Visually separate scale, vessel and river | Official/owned media with explicit rights; otherwise separately licensed documentary photos | One stock raft image used for both products; unsafe or unverified informal operator |
| P7 Longji | Real terrace-and-village image with paths/buildings, not only an abstract telephoto pattern | Show Longji as a village access and overnight decision | Owned/commissioned; verified Commons fallback | AI terrace; photo from another Asian rice terrace |

## 3. Topology diagram specification

The topology is an editorial relationship diagram, not a navigation map. It may use simplified north–south placement, but must state **“schematic, not to scale.”**

Required nodes and labels:

1. `Longsheng / Longji` with separate `Ping'an` and `Dazhai` subnodes.
2. `Guilin city` with `Guilin Station`, `Guilin North`, `Guilin West` and `KWL` as separate nodes.
3. `Mopanshan Passenger Port` and `Zhujiang Passenger Port` as two different cruise departure nodes.
4. A one-way Li River cruise arrow toward `Longtoushan Pier / Yangshuo`.
5. `Yangshuo town / West Street` and `Yulong River countryside` as different stay nodes.
6. `Xingping` and `Yangshuo Station` as adjacent but different nodes.
7. Road arrows between Yangshuo and Xingping, and between the regional bases.
8. Outbound arrows to Guangzhou, Hong Kong and Chongqing, labelled “verify live station/service.”

Do not draw Yangshuo or Xingping inside a “Guilin city” boundary. Administrative relationship may appear as a small note, while travel bases remain visually separate.

Recommended output:

- master: editable SVG;
- desktop: 1600 × 1100 PNG/WebP derivative;
- mobile: 900 × 1200 vertical derivative with the same node IDs;
- minimum text size after export: 18 px desktop, 24 px mobile;
- colour must not be the only way to distinguish transport types; use line styles and icons plus labels.

## 4. Candidate source pools

These are discovery pools, not automatic approvals. The final asset log must identify the exact file page, photographer, original capture, licence version, modifications and retained attribution.

- Guilin: https://commons.wikimedia.org/wiki/Category:Guilin
- Li River: https://commons.wikimedia.org/wiki/Category:Li_River
- Yangshuo County: https://commons.wikimedia.org/wiki/Category:Yangshuo_County
- Xingping: search Wikimedia Commons for the exact town/river location and verify coordinates/caption.
- Longji Rice Terraces: https://commons.wikimedia.org/wiki/Category:Longji_Rice_Terraces
- Existing station candidate: https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg — author Rat2, CC BY-SA 4.0, previously cropped/converted for the current transport owner.
- Official Guilin Li River Scenic Area media may be considered only after written reuse terms or an owned-media agreement is recorded; being on an official website does not itself grant republication rights.

Getty, Klook, hotel galleries, social posts and search-result thumbnails may be used for visual research only. They are not approved production assets unless Homeground obtains a documented licence.

## 5. Shot briefs and multilingual alt text

### H1 — Li River regional hero

Shot brief: horizontal, natural weather, enough river width to understand direction, one vessel or river-bank element for scale, no extreme HDR, no text overlay.

- EN alt: `A vessel follows the Li River between karst hills in the Guilin–Yangshuo region.`
- ZH alt: `船只沿漓江穿行于桂林—阳朔区域的喀斯特山峰之间。`
- KO alt: `구이린–양숴 지역의 카르스트 산 사이로 리강을 따라 배가 이동하는 모습.`

### P1 — Guilin city

Shot brief: show urban waterfront, streets or buildings together with the karst context; identify the exact location in caption.

- EN alt: `Guilin city waterfront with urban buildings and karst hills.`
- ZH alt: `桂林市区水岸、城市建筑与喀斯特山体。`
- KO alt: `도시 건물과 카르스트 산이 함께 보이는 구이린 시내 수변.`

### P2 — Yangshuo central base

Shot brief: street-level view around the county-town/West Street task; show pedestrian intensity or vehicle boundary honestly.

- EN alt: `Pedestrians and shops in central Yangshuo near the West Street area.`
- ZH alt: `阳朔县城西街周边的行人和商铺。`
- KO alt: `양숴 현성 서가 주변의 보행자와 상점.`

### P3 — Yulong countryside

Shot brief: rural road/field/river relationship, preferably with bicycle or walking scale; no hotel-brand dominance.

- EN alt: `A rural road and fields beside the Yulong River countryside near Yangshuo.`
- ZH alt: `阳朔遇龙河乡村的道路、田野与河流环境。`
- KO alt: `양숴 위룽강 농촌의 도로와 들판, 강 주변 풍경.`

### P4 — Xingping

Shot brief: include both town and river/karst context so it cannot be mistaken for central Yangshuo.

- EN alt: `Xingping town beside the Li River and surrounding karst hills.`
- ZH alt: `兴坪镇、漓江与周围的喀斯特山峰。`
- KO alt: `리강과 카르스트 산 옆에 자리한 싱핑 진.`

### P5 — Yangshuo Station

- EN alt: `Yangshuo Railway Station exterior and forecourt near Xingping.`
- ZH alt: `位于兴坪附近的阳朔站站房与站前区域。`
- KO alt: `싱핑 근처 양숴역 건물과 역 앞 공간.`

Caption warning in every locale: the photograph identifies the station only; it does not prove current train, coach or pickup operations.

### P6a/P6b — water comparison

- EN large cruise alt: `A large Li River cruise vessel operating from an official passenger port.`
- ZH large cruise alt: `从官方客运码头运营的漓江大型游船。`
- KO large cruise alt: `공식 여객항에서 운항하는 대형 리강 크루즈 선박.`

- EN Yulong raft alt: `A manually propelled bamboo raft on an authorised Yulong River section.`
- ZH Yulong raft alt: `在遇龙河获准运营区段行驶的人工竹筏。`
- KO Yulong raft alt: `허가된 위룽강 구간에서 사람이 밀어 움직이는 대나무 뗏목.`

### P7 — Longji

- EN alt: `Rice terraces, village buildings and walking paths in the Longji area of Longsheng.`
- ZH alt: `龙胜龙脊区域的梯田、村寨建筑与步行道路。`
- KO alt: `룽성 룽지 지역의 계단식 논과 마을 건물, 보행로.`

## 6. Authenticity and rights checklist

Before an image enters a public branch:

- [ ] Exact place and capture date are known.
- [ ] The image is a real photograph, not AI-generated, AI-expanded or materially reconstructed.
- [ ] The licence permits commercial website use and required derivatives.
- [ ] Author, source URL, licence URL and modification notes are recorded.
- [ ] Share-alike obligations are compatible with the derivative and repository distribution.
- [ ] People are incidental/public-scene subjects or model/property permissions are documented where needed.
- [ ] The caption does not infer current transport operations from an old photograph.
- [ ] The same image is not relabelled as two different bases.
- [ ] The topology diagram cites `entity-graph.json` as its editorial data source and states that it is not to scale.
- [ ] Mobile crop preserves the geographic clue that gives the image its decision value.

## 7. Release gate

This draft is not image-complete merely because source pools are listed. A central editor must approve:

1. one rights-cleared hero;
2. the topology diagram in all three locales;
3. real, distinguishable coverage of Guilin city, Yangshuo, Xingping, the Li River/water products and Longji;
4. a complete rights/derivative record;
5. no AI documentary landscape photography.
