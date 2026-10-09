import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "direct-answer",
      "type": "lead",
      "text": "Some of China's best-known sights run on reservations, and it helps to know which ones before you fly. The Forbidden City opens bookings seven days ahead at 20:00 China time and sells no tickets on the day. The National Museum is free but needs a real-name reservation. Tianmen Mountain sells dated routes with entry slots. Others are simpler: Shanghai Museum East admits individual visitors to its general galleries without booking."
    },
    {
      "id": "party-scenario",
      "type": "paragraph",
      "text": "A popular reservation rarely affects just one visit. It decides when your car should collect you, which hotel area works best and what else fits into the day. Start with the places your group would most regret missing, then build the trip around their confirmed entry."
    },
    {
      "id": "priority-heading",
      "type": "heading",
      "level": 2,
      "text": "Which attractions to plan for first"
    },
    {
      "id": "priority-intro",
      "type": "paragraph",
      "text": "Here is how the main sights compare. Release times are China time (UTC+8), which may be a very different hour where you live."
    },
    {
      "id": "reservation-priority-table",
      "type": "table",
      "caption": "Reservation rules at a glance",
      "columns": [
        "Attraction",
        "Booking rule",
        "What to plan around"
      ],
      "rows": [
        [
          "Forbidden City",
          "Book ahead: opens 7 days before your visit at 20:00; no same-day tickets",
          "Build your Beijing days around the confirmed date."
        ],
        [
          "Tiananmen Square",
          "Free real-name reservation, 1–7 days ahead under the current notice",
          "Separate from the Palace Museum ticket; check whether a linked-reservation exception still applies."
        ],
        [
          "National Museum of China",
          "Free real-name reservation, up to 7 days ahead; new places daily at 17:00",
          "Choose an entry window; every visitor needs a confirmed place."
        ],
        [
          "Terracotta Warriors",
          "Real-name advance purchase for every visitor",
          "Confirm tickets before you fix transport from Xi'an."
        ],
        [
          "Sanxingdui Museum",
          "Official passport booking route for inbound visitors",
          "Check the current release window for your date before booking the Guanghan transfer."
        ],
        [
          "Tianmen Mountain",
          "Dated route, entry slot and entrance",
          "Your route and gate decide where the day starts and how pickup works."
        ],
        [
          "Zhangjiajie Forest Park",
          "Check the exact ticket product",
          "Keep gate, time, validity and park transport together."
        ],
        [
          "Shanghai Museum East",
          "General individual entry: no reservation",
          "Special experience areas need their own booking; exhibitions have separate terms."
        ]
      ]
    },
    {
      "id": "separate-venues",
      "type": "callout",
      "tone": "neutral",
      "title": "Same area, different tickets",
      "body": "Tiananmen Square, the Tiananmen Rostrum and the Palace Museum are separate visits, and Shanghai Museum's East and People's Square buildings follow different rules. A mountain entry ticket may not include the cable car. Free admission can still need a reservation, while a walk-in gallery needs none."
    },
    {
      "id": "why-it-matters",
      "type": "comparison",
      "title": "Why one booking can shape the whole day",
      "columns": [
        {
          "heading": "Entry runs on a timetable",
          "body": "At the strictest attractions, places open at a set China time a few days ahead, and the Forbidden City sells nothing on the day. Availability changes by date and time slot, so a holiday week leaves less room to move."
        },
        {
          "heading": "Everyone needs a place",
          "body": "Reservations are made person by person against each traveller's document. A parent's booking does not automatically cover a child, so a group is ready only when every traveller is confirmed."
        },
        {
          "heading": "The day follows the slot",
          "body": "Your entry time sets the pickup, the easiest hotel area and what else fits that day. If only part of a family secures a place, the whole day needs rethinking."
        }
      ]
    },
    {
      "id": "prepare-heading",
      "type": "heading",
      "level": 2,
      "text": "Get ready before the booking window opens"
    },
    {
      "id": "prepare-list",
      "type": "list",
      "ordered": true,
      "items": [
        "Pick the date that matters most and one alternative. Avoid placing your hardest-to-move visit straight after a long flight.",
        "Gather each traveller's name, document type and passport details privately, so every person in the group can be booked.",
        "Check the official channel, the China-time release and any exhibition add-on in advance. Preparing early does not mean tickets are already on sale.",
        "Make sure you can use the booking account and payment method, and resolve any document field the form rejects before you commit to the day."
      ]
    },
    {
      "id": "confirmed-heading",
      "type": "heading",
      "level": 2,
      "text": "When is the day really secured?"
    },
    {
      "id": "confirmed-copy",
      "type": "paragraph",
      "text": "Look for a completed reservation that lists every visitor, the right attraction, the date and the entry period. A payment notice or a submitted request is not enough. Save the confirmation offline and carry the original passport each person booked with. On the day, still allow time for the right entrance, security checks and any cable-car queue."
    },
    {
      "id": "popular-dates",
      "type": "callout",
      "tone": "neutral",
      "title": "If your first choice is unavailable",
      "body": "Keep one backup date or time. Move a flexible walk or meal before squeezing several fixed visits into one afternoon. If an order is pending or a date shows as sold out, check with the attraction's own support before buying a second ticket."
    },
    {
      "id": "attraction-guides",
      "type": "internal-links",
      "title": "Detailed booking guides by attraction",
      "items": [
        {
          "label": "Forbidden City and Tiananmen",
          "href": "/guides/forbidden-city-for-foreign-visitors/"
        },
        {
          "label": "National Museum of China",
          "href": "/guides/national-museum-of-china-booking-and-route/"
        },
        {
          "label": "Terracotta Warriors",
          "href": "/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "Sanxingdui Museum",
          "href": "/guides/sanxingdui-museum-booking-and-gallery-order/"
        },
        {
          "label": "Tianmen Mountain",
          "href": "/guides/tianmen-mountain-tickets-and-routes/"
        },
        {
          "label": "Zhangjiajie Forest Park",
          "href": "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/"
        },
        {
          "label": "Shanghai Museum East",
          "href": "/guides/shanghai-museum-east-entry-reservations/"
        },
        {
          "label": "Mogao Caves: existing booking and visit guide",
          "href": "/guides/mogao-caves-independent-visit-workflow/"
        },
        {
          "label": "Booking without a Chinese phone number",
          "href": "/guides/book-china-attraction-tickets-without-chinese-phone-number/"
        }
      ]
    },
    {
      "id": "support-heading",
      "type": "heading",
      "level": 2,
      "text": "How Homeground can help"
    },
    {
      "id": "support-copy",
      "type": "paragraph",
      "text": "A popular reservation can pull the rest of the itinerary with it. Tell us your travel dates, who is travelling and the places you most want to see. We look at each attraction and the service that fits it, then help you coordinate the plan."
    },
    {
      "id": "support-list",
      "type": "list",
      "items": [
        "Line up visit dates for everyone in your group, with each traveller's booking details checked.",
        "Fit entry times around pickups, hotels, trains and the rest of the route.",
        "Explain which kind of help applies to each attraction or tour.",
        "Confirm the scope, cost and backup options in writing before you pay."
      ]
    },
    {
      "id": "reservation-service",
      "type": "callout",
      "tone": "decision",
      "title": "Reservation support in eight cities",
      "body": "Our reservation service covers selected attractions in Beijing, Shanghai, Suzhou, Hangzhou, Xi'an, Chengdu, Guilin and Lijiang: USD 7 per person per attraction, plus the official ticket price with no mark-up. For attractions with their own route for foreign visitors, such as the National Museum or Sanxingdui, we start there and confirm what we can do before you pay.",
      "link": {
        "href": "https://homegroundchina.com/services/china-attraction-reservations/#reservation-enquiry",
        "label": "See attractions, fees and terms"
      }
    },
    {
      "id": "support-links",
      "type": "internal-links",
      "title": "Planning more than one attraction?",
      "items": [
        {
          "label": "Private China tours",
          "href": "/tours/",
          "description": "Reservations for attractions in your itinerary are included at no extra service fee, coordinated with hotels, transfers and the wider route."
        },
        {
          "label": "Zhangjiajie private guide",
          "href": "/services/private-english-speaking-guides/#zhangjiajie",
          "description": "Tianmen Mountain and Forest Park are outside the eight-city reservation service: plan them with a Zhangjiajie private tour or guide. Guide-only service quotes transport and tickets separately."
        }
      ]
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "Before you book",
      "items": [
        {
          "question": "How far ahead should I reserve China attractions?",
          "answer": "There is no single national rule. Prepare before you travel, then follow each attraction's current release rule. The Forbidden City opens bookings seven days ahead; that is when sales open, not a requirement to buy exactly seven days early."
        },
        {
          "question": "Do all museums need an advance reservation?",
          "answer": "No. General individual entry to Shanghai Museum East needs no reservation, although its special experience areas and paid exhibitions have their own arrangements. Check the exact building and ticket."
        },
        {
          "question": "Does a reservation let me skip queues?",
          "answer": "No. Security, passport checks, visitor-flow controls and cable-car boarding still apply. Book the visit, then allow time on site."
        },
        {
          "question": "Can Homeground book attractions for me?",
          "answer": "For selected attractions in eight cities, yes: the reservation service costs USD 7 per person per attraction plus the official ticket price, and we confirm the scope and channel in writing before you pay. Attractions in a Homeground private-tour itinerary are reserved at no extra service fee. For Tianmen Mountain and Zhangjiajie Forest Park, choose a Zhangjiajie private tour or our private guide service; guide-only bookings quote tickets and transport separately."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Palace Museum: English visit and booking route",
          "url": "https://intl.dpm.org.cn/visit.html",
          "publisher": "The Palace Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "National Museum: current admission rules and English reservation link",
          "url": "https://en.chnmuseum.cn/visit_692/",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "Terracotta Warriors: bilingual ticketing rules",
          "url": "https://www.bmy.com.cn/jingtai/bmyweb/ticketing.html",
          "publisher": "Emperor Qinshihuang's Mausoleum Site Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "Shanghai Museum East: individual entry and special reservations",
          "url": "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east",
          "publisher": "Shanghai Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "Guanghan government: inbound-visitor passport and English booking services",
          "url": "https://www.guanghan.gov.cn/gk/mbjj/gjjmb/1681915.htm",
          "publisher": "Guanghan Municipal Government",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "Tiananmen management: September 2026 reservation reminder",
          "url": "https://tamgw.beijing.gov.cn/zhengwugongkai/tzgg/202609/t20260924_4880476.html",
          "publisher": "Tiananmen Area Management Committee",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "Tianmen scenic-area notice, published by Rednet on 31 August 2026",
          "url": "https://tour.rednet.cn/m/content/646042/75/16221781.html",
          "publisher": "Tianmen Mountain scenic area via Rednet",
          "reviewedAt": "2026-10-08"
        }
      ]
    }
  ]
};

export default body;
