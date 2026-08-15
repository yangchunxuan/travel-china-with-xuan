# Accommodation image preview plan

Status: internal preview only. None of these derivatives is eligible for the
production export yet.

All fifteen source records currently have `rights_status: needs_confirmation`,
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
| `signature-villa-suite.jpg` | `assets/accommodations/jianai-shanye-pending/03_超大景观套房_主推.JPG` | `acc-jianai-shanye-pending-03` | Same premium candidate set; it must not represent the entry room tier. |

The family-villa and signature-villa sets must never be mixed into one property
or room. Before public release, confirm publication rights, the exact property,
room mapping, current availability, foreign-guest acceptance, and truthful
localized alt text.
