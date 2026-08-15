# Accommodation image preview plan

Status: internal preview only. None of these derivatives is eligible for the
production export yet.

All twenty-five accommodation source records currently have `rights_status: needs_confirmation`,
`public_eligible: false`, `room_type_id: null`, and
`room_mapping_status: needs_confirmation` in the product library. The page and
its assets are therefore removed from the production export by
`tools/prune-production-export.mjs`.

| Preview derivative | Product-library asset | Asset ID | Use boundary |
| --- | --- | --- | --- |
| `city-nihao-twin.jpg` | `assets/accommodations/nihao-hotel/01_双床房窗景_主推.jpg` | `acc-nihao-hotel-01` | Candidate city hotel only; the window view is not guaranteed for every room. |
| `city-nihao-twin-entry.jpg` | `assets/accommodations/nihao-hotel/02_双床房入口及洗漱区_辅助.jpg` | `acc-nihao-hotel-02` | Same city candidate; room entrance and vanity reference only. |
| `city-west-exterior.jpg` | `assets/accommodations/west-hotel/01_酒店外观_识别图.jpg` | `acc-west-hotel-01` | Entity-identification reference; colour and sky treatment are visible in the source. |
| `city-west-twin.jpg` | `assets/accommodations/west-hotel/02_双床景观房_主推.jpg` | `acc-west-hotel-02` | Separate candidate city hotel; floral setup and view are not standard promises. |
| `city-west-double.jpg` | `assets/accommodations/west-hotel/03_大床房_主推.jpg` | `acc-west-hotel-03` | Same Western Grand candidate; exact double-room assignment remains unconfirmed. |
| `city-west-twin-decorated.jpg` | `assets/accommodations/west-hotel/04_双床房布置_辅助.jpg` | `acc-west-hotel-04` | Special balloons, petals and towel styling are not a standard inclusion. |
| `city-west-bathroom.jpg` | `assets/accommodations/west-hotel/05_卫生间_辅助.jpg` | `acc-west-hotel-05` | Bathroom reference for the same city candidate; not a room-type guarantee. |
| `family-villa-living.jpg` | `assets/accommodations/family-villa/01_客厅落地窗_主推.JPG` | `acc-family-villa-01` | Family-villa material set only; exact villa and occupancy are unconfirmed. |
| `family-villa-twin.jpg` | `assets/accommodations/family-villa/02_双床房_主推.jpg` | `acc-family-villa-02` | Same premium-villa material set; exact room allocation remains unconfirmed. |
| `family-villa-double.jpg` | `assets/accommodations/family-villa/03_大床房_主推.JPG` | `acc-family-villa-03` | Same premium-villa material set; photographed outlook is not guaranteed. |
| `family-villa-bathroom.jpg` | `assets/accommodations/family-villa/05_卫生间_辅助.jpg` | `acc-family-villa-05` | Bathroom and enclosed-shower reference only. |
| `family-villa-terrace.jpg` | `assets/accommodations/family-villa/04_露台草坪_主推.JPG` | `acc-family-villa-04` | Same family-villa set; do not claim privacy, exclusive use, or a fixed view. |
| `family-villa-recreation.jpg` | `assets/accommodations/family-villa/06_餐区麻将桌_备选.jpg` | `acc-family-villa-06` | Recreation-area reference; do not imply that the table or room is guaranteed. |
| `signature-villa-terrace.jpg` | `assets/accommodations/jianai-shanye-pending/02_景观餐厅露台_主推.JPG` | `acc-jianai-shanye-pending-02` | Premium candidate set only; property identity and room mapping remain unconfirmed. |
| `signature-villa-suite.jpg` | `assets/accommodations/jianai-shanye-pending/03_超大景观套房_主推.JPG` | `acc-jianai-shanye-pending-03` | Large-room reference only; suite name, area and outlook remain unconfirmed. |
| `signature-villa-exterior.jpg` | `assets/accommodations/jianai-shanye-pending/01_别墅外观及招牌_主推.JPG` | `acc-jianai-shanye-pending-01` | Cropped to remove the person at lower left; the visible Jianai Shanye identity and address remain unconfirmed. |
| `signature-villa-four-poster.jpg` | `assets/accommodations/jianai-shanye-pending/04_四柱大床房_主推.JPG` | `acc-jianai-shanye-pending-04` | Four-poster room reference; room category and bed type remain unconfirmed. |
| `signature-villa-fireplace-room.jpg` | `assets/accommodations/jianai-shanye-pending/05_壁炉景观大床房_主推.JPG` | `acc-jianai-shanye-pending-05` | Fireplace operation, room category and outlook remain unconfirmed. |
| `signature-villa-garden-lounge.jpg` | `assets/accommodations/jianai-shanye-pending/06_休息区与庭院_主推.JPG` | `acc-jianai-shanye-pending-06` | Indoor-outdoor lounge reference; do not promise a private garden or exclusive terrace. |
| `signature-villa-bathtub.jpg` | `assets/accommodations/jianai-shanye-pending/07_浴缸卫生间_主推.JPG` | `acc-jianai-shanye-pending-07` | Bathtub-bathroom reference; exact room mapping remains unconfirmed. |
| `signature-villa-red-room.jpg` | `assets/accommodations/jianai-shanye-pending/08_红色主题大床房_辅助.JPG` | `acc-jianai-shanye-pending-08` | Distinct themed-room reference; it must not represent the full property. |
| `signature-villa-colour-room.jpg` | `assets/accommodations/jianai-shanye-pending/09_彩色主题景观房_辅助.JPG` | `acc-jianai-shanye-pending-09` | Outlook, balcony and room category are not guaranteed. |
| `signature-villa-vanity.jpg` | `assets/accommodations/jianai-shanye-pending/10_洗漱区及卧室_辅助.JPG` | `acc-jianai-shanye-pending-10` | Vanity-and-bedroom layout reference; partition and room mapping remain unconfirmed. |
| `signature-villa-shower.jpg` | `assets/accommodations/jianai-shanye-pending/11_淋浴卫生间_辅助.JPG` | `acc-jianai-shanye-pending-11` | Shower-bathroom reference; the visible notice and room mapping still require confirmation. |
| `signature-villa-lounge-detail.jpg` | `assets/accommodations/jianai-shanye-pending/12_休息区陈设_辅助.JPG` | `acc-jianai-shanye-pending-12` | Interior-detail reference, likely from the same unit as the large-room photograph. |

The family-villa and signature-villa sets must never be mixed into one property
or room. Before public release, confirm publication rights, the exact property,
room mapping, current availability, foreign-guest acceptance, and truthful
localized alt text.

## Editorial landscape images

The page now uses the owner-selected `国家森林公园峰林_174.jpg` as its title
image. It is exported at 1920×1280 so the desktop 4:5 split hero can focus on
the central pillars while the mobile 16:10 treatment retains the wider canyon.
The Tianmen Cave and Glass Bridge photographs are no longer alternative covers:
they appear beside Day 4 and Day 3 respectively. Day 1 now uses a separately
licensed photograph of Zhangjiajie Hehua International Airport, while Day 2 uses
the organized-library Bailong Elevator photograph. All images are real
Zhangjiajie photographs. The organized-library images remain preview-only because
their records show `commercialRightsConfirmed: false`; approve every selected
local-library file before public release.

| Placement | Preview derivative | Organized source | Editorial role |
| --- | --- | --- | --- |
| Title image · current | `hero/sunlit-forest-pillars-174.jpg` | `张家界优选素材/01_国家森林公园与峰林/国家森林公园峰林_174.jpg` | Owner-selected morning panorama; the wide derivative supports responsive art direction without pretending to show every stop. |
| Day 1 article image | `route/day-1-hehua-airport.jpg` | [Wikimedia Commons: `Zhangjiajie Airport (27796134377).jpg`](https://commons.wikimedia.org/wiki/File:Zhangjiajie_Airport_(27796134377).jpg), Martin Lewison, 6 June 2018, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) | Exact Zhangjiajie Hehua International Airport scene with Tianmen Mountain beyond the apron. Cropped from 4896×3672 to a 1280×1600 derivative; it establishes one arrival gateway but does not depict or prove the private pickup service. Source SHA-256: `6293d810b987628ea2ab797dd39fb6c9661a363966c4bcc43ecbbc20c29908e1`; derivative SHA-256: `6ea432d7bc4ad3cd670075c8b9c072f299878e7be6061d0e7200a5725c5b22e0`. |
| Day 2 article image | `route/day-2-bailong-elevator.jpg` | `张家界优选素材/08_交通与移动体验/交通移动_190.jpg` | Shows the Bailong Elevator against the sandstone cliffs named in Day 2. Cropped from 4512×3000 to a 1280×1600 derivative. The local record still has `commercialRightsConfirmed: false`; it cannot enter production until the photographer/publication right is confirmed. Source SHA-256: `71de41d211924e76cad3d2795dd9811b55385ba6ce055567de58e60a80dbbd62`; derivative SHA-256: `b840626a062748542dc43e9d91c2bb526ddadf23a76b9b5b5b393a0cf9607f08`. |
| Day 4 article image | `hero/tianmen-cave-and-stairs.jpg` | `张家界优选素材/02_天门山与天路/天门山_093.jpg` | Shows Tianmen Cave and the stairway named in the final sightseeing day. |
| Day 3 article image | `hero/grand-canyon-glass-bridge.jpg` | `张家界优选素材/03_大峡谷与玻璃体验/大峡谷·交通移动_139.jpg` | Shows the actual Zhangjiajie Grand Canyon Glass Bridge named in Day 3. |
