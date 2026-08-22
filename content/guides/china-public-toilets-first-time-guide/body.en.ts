import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Look for the standard male, female, unisex/family or accessible toilet symbol at a transport hub, attraction, mall, park or staffed public facility, and ask early rather than waiting for an emergency. Inside, inspect the available cubicles and choose the type you can use safely. Carry your own tissue, hand sanitizer and a small disposal bag because paper, soap, hooks and bins vary by location."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Short answer",
      "body": "Read the exact fixture, foot or surface markings and any posted instructions before using a squat toilet; hood, flush-point and pipe layouts vary. Keep both feet stable and clothing clear of the floor. If you cannot identify a safe position, or balance, joints, pregnancy or luggage make squatting unsafe, use a seated cubicle or ask staff. Never stand on a seated-toilet rim. Accessible or family facilities should be kept available for people who need their features.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose the cubicle before committing"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The safe choice depends on the actual fixture, floor and your mobility.",
      "columns": [
        "Option",
        "Choose it when",
        "Check first",
        "Do not do"
      ],
      "rows": [
        [
          "Squat toilet",
          "You can lower and rise with stable balance",
          "Dry footing, door lock, flush method and room for belongings",
          "Stand on smooth edges, face backward by guesswork or put loose items on the floor"
        ],
        [
          "Seated toilet",
          "You need or prefer a seat",
          "Seat stability, cleanliness, flush and a safe place for bags",
          "Climb or squat on the seat"
        ],
        [
          "Accessible toilet",
          "You need grab bars, turning space, lower fixtures or caregiver access",
          "Occupancy, emergency cord placement and whether the room is open",
          "Use it as luggage storage or block it when another usable cubicle is available"
        ],
        [
          "Family/unisex room",
          "A caregiver, child or privacy need makes it appropriate",
          "Local sign, lock and changing facilities",
          "Assume every station or park has one"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "Find, inspect, use and leave"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Find the facility before urgency peaks. Search or show '公共卫生间/洗手间在哪里？' to staff, and follow the current physical toilet symbols rather than an old map pin alone.",
        "At the entrance, read any male/female, accessible, family, queue or temporary-closure sign. If an attendant is present, follow the posted queue and payment instruction rather than assuming access is free or staffed.",
        "Inspect a cubicle before closing the door: lock, floor, fixture type, flush, tissue/bin and a dry hook or shelf. Move to another cubicle if footing or the lock is unsafe.",
        "Secure phone, passport, coat straps and trouser hems. Keep bags on a hook, shelf or held by a companion; do not place valuables on a wet floor or toilet tank.",
        "For a squat fixture, follow the exact foot or surface markings and posted instructions; the hood, flush point and pipe layout are not a universal direction guide. Lower only as far as balance allows and use only a wall or rail designed for support. If the position is unclear, change cubicles or ask staff; do not grip loose plumbing.",
        "Use the indicated flush—button, lever, pedal or sensor—and check that it completed. Follow the local bin sign for paper or hygiene products; never flush wipes, pads or bulky items.",
        "Wash with soap when available and use sanitizer as backup, not a substitute when hands are visibly soiled. Leave the cubicle ready for the next person and report a dangerous spill or broken lock to staff."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "Three safety checks"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "Fixture, balance and supplies",
      "columns": [
        {
          "heading": "Fixture",
          "body": "Identify squat, seated or accessible equipment and its flush before use. The physical room controls the technique."
        },
        {
          "heading": "Balance",
          "body": "Choose a position you can enter and leave without jumping, climbing or relying on loose plumbing. Change cubicles if uncertain."
        },
        {
          "heading": "Supplies",
          "body": "Bring tissue and sanitizer, and inspect the bin and wash area. Availability differs even within the same building."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "When the first facility does not work"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "Use the nearest staffed or better-equipped fallback.",
      "columns": [
        "Problem",
        "Immediate move",
        "Next fallback"
      ],
      "rows": [
        [
          "Only squat cubicles and squatting is unsafe",
          "Ask staff for '坐便/无障碍卫生间' and show the symbols",
          "Try the staffed transport hub, mall, hotel lobby or attraction service centre nearby"
        ],
        [
          "No tissue or soap",
          "Use your own tissue and sanitizer, then wash properly at the next available sink",
          "Restock the kit before the next long transfer"
        ],
        [
          "Floor slippery or lock broken",
          "Do not use that cubicle",
          "Choose another room or ask an attendant; report the hazard"
        ],
        [
          "Accessible room locked",
          "Ask official staff whether a key or another accessible facility is available",
          "Move to the verified alternative without forcing the door"
        ],
        [
          "Map pin is wrong or facility closed",
          "Ask nearby staff using the written phrase and follow physical signs",
          "Head to the closest large staffed public building rather than an isolated pin"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "A compact backup plan"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Carry a pocket pack of unscented tissue, travel sanitizer and two small opaque disposal bags in an outside pocket.",
        "Before a long rail, bus, park or heritage segment, use a known facility at the last large station, attraction entrance or mall.",
        "Travellers who need a seated or accessible cubicle should save two verified staffed locations along the day, not just one map pin.",
        "If clothing or a bag touches a wet floor, isolate it in the spare bag and wash hands before handling food or identity documents.",
        "If balance fails or there is a fall, do not rush to stand; call out, use the emergency cord if present and seek staff or medical help for injury.",
        "Replace used supplies each evening and tell companions which accessible feature or extra stop is necessary before the next day starts."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Facilities vary",
      "body": "This guide cannot guarantee toilet location, opening, cleanliness, paper, soap, seated or accessible cubicle availability, free entry or maintenance. Current facility signs and staff control access. It is general practical guidance, not medical or mobility advice; choose assistance and equipment appropriate to your own needs.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "Before leaving the hotel"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Tissue packed",
        "Sanitizer packed",
        "Two disposal bags packed",
        "Written toilet phrase saved",
        "Accessible symbol recognized",
        "First major facility identified",
        "Mobility needs shared with companions",
        "Nothing valuable will be placed on the floor"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Public-toilet questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Are all public toilets squat toilets?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. Fixture mix varies. Inspect signs and cubicles, and ask staff for a seated or accessible toilet if that is what you can use safely."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Which way do I face on a squat toilet?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "There is no universal direction rule. Read the exact fixture, foot or surface markings and posted instructions because hood, flush-point and pipe layouts vary. If you cannot identify a stable position, use a seated toilet or ask staff."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Should toilet paper go in the toilet or bin?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Follow the posted sign and local fixture instruction. Never flush wipes, pads or bulky products; when unclear, ask staff."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Related access and route owners",
      "items": [
        {
          "label": "Wheelchair-accessible route planning",
          "href": "/guides/wheelchair-accessible-china-route-planning/",
          "description": "Build accessible stops into the whole route."
        },
        {
          "label": "Accessible hotel room verification",
          "href": "/guides/china-accessible-hotel-room-verification/",
          "description": "Verify the bathroom and room features that matter."
        },
        {
          "label": "China itinerary with older parents",
          "href": "/guides/china-itinerary-with-older-parents/",
          "description": "Place rest and toilet access into day pacing."
        },
        {
          "label": "First China high-speed train",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Know the station sequence around longer journeys."
        },
        {
          "label": "Verified address and navigation backup",
          "href": "/guides/china-navigation-verified-address-backup/",
          "description": "Save a real facility or staffed-building fallback."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources",
      "items": [
        {
          "label": "Beijing public-toilet FAQ",
          "url": "https://english.beijing.gov.cn/contactus/faqs/list/202006/t20200627_1932963.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Tourism toilet management guidance",
          "url": "https://zwgk.mct.gov.cn/zfxxgkml/ggfw/202306/t20230619_944567.html",
          "publisher": "Ministry of Culture and Tourism",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Public toilet classification standard",
          "url": "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=D42230CAB628FB034C8DCD795553B9D9",
          "publisher": "Standardization Administration of China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Shenzhen metro toilet design and management standard",
          "url": "https://www.sz.gov.cn/attachment/1/1522/1522388/11901081.pdf",
          "publisher": "Shenzhen Municipal Government",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
