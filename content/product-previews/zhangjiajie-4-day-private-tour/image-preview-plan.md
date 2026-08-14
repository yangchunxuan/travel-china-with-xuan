# Accommodation image preview plan

Status: internal preview only. None of these derivatives is eligible for the
production export yet.

All six source records currently have `rights_status: needs_confirmation`,
`public_eligible: false`, `room_type_id: null`, and
`room_mapping_status: needs_confirmation` in the product library. The page and
its assets are therefore removed from the production export by
`tools/prune-production-export.mjs`.

| Preview derivative | Product-library asset | Asset ID | Use boundary |
| --- | --- | --- | --- |
| `city-nihao-twin.jpg` | `assets/accommodations/nihao-hotel/01_双床房窗景_主推.jpg` | `acc-nihao-hotel-01` | Candidate city hotel only; the window view is not guaranteed for every room. |
| `city-west-twin.jpg` | `assets/accommodations/west-hotel/02_双床景观房_主推.jpg` | `acc-west-hotel-02` | Separate candidate city hotel; floral setup and view are not standard promises. |
| `family-villa-living.jpg` | `assets/accommodations/family-villa/01_客厅落地窗_主推.JPG` | `acc-family-villa-01` | Family-villa material set only; exact villa and occupancy are unconfirmed. |
| `family-villa-terrace.jpg` | `assets/accommodations/family-villa/04_露台草坪_主推.JPG` | `acc-family-villa-04` | Same family-villa set; do not claim privacy, exclusive use, or a fixed view. |
| `signature-villa-terrace.jpg` | `assets/accommodations/jianai-shanye-pending/02_景观餐厅露台_主推.JPG` | `acc-jianai-shanye-pending-02` | Premium candidate set only; property identity and room mapping remain unconfirmed. |
| `signature-villa-suite.jpg` | `assets/accommodations/jianai-shanye-pending/03_超大景观套房_主推.JPG` | `acc-jianai-shanye-pending-03` | Same premium candidate set; it must not represent the entry room tier. |

The family-villa and signature-villa sets must never be mixed into one property
or room. Before public release, confirm publication rights, the exact property,
room mapping, current availability, foreign-guest acceptance, and truthful
localized alt text.
