import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "When a China map pin looks wrong, do not drag it by eye or paste its coordinates into another app. Re-identify the place: obtain its official Chinese name, city and district, full Chinese address, branch or terminal, usable entrance and a nearby landmark. Search that text in a China-local map, then ask the venue for a link in the same app if doubt remains. The venue’s current official address and accessible entrance are stronger evidence than a bare coordinate.",
    },
    {
      id: "no-number-repair",
      type: "callout",
      title: "Do not try to calculate a correction",
      body:
        "Official documentation distinguishes several coordinate inputs, but establishes no fixed China-wide direction or distance to subtract. A manual offset may move a pin between wrong places without revealing a duplicate name, old branch or closed gate. Stay at the lawful troubleshooting level: match the address and entrance, not an undisclosed algorithm.",
      tone: "warning",
    },
    {
      id: "diagnosis-heading",
      type: "heading",
      level: 2,
      text: "Run this 60-second diagnosis",
    },
    {
      id: "diagnosis-table",
      type: "table",
      caption: "The visible symptom points to a different recovery path",
      columns: ["What you see", "Likely category", "First check"],
      rows: [
        [
          "The same shared pin sits beside the road or building only after opening it in another app",
          "Coordinate or basemap source mismatch in a cross-platform handoff",
          "Stop reusing the number; search the official Chinese address inside the receiving map.",
        ],
        [
          "Two search results have different districts, branch names or street numbers",
          "Wrong or ambiguous POI",
          "Compare city, district, branch suffix and phone number before starting a route.",
        ],
        [
          "Both results name the same large station, scenic area or mall but land on different sides",
          "Property centre versus an entrance or navigation guidance point",
          "Identify the entrance required by the ticket, transport mode or current access notice.",
        ],
        [
          "The destination pin stays still but your blue location dot jumps",
          "Live device positioning, permission or indoor-signal problem",
          "Use signs and a known landmark, then reacquire location in an open area.",
        ],
      ],
    },
    {
      id: "causes-heading",
      type: "heading",
      level: 2,
      text: "Why pins that describe ‘the same place’ can differ",
    },
    {
      id: "causes-comparison",
      type: "comparison",
      title: "Separate the data layer before choosing a fix",
      columns: [
        {
          heading: "Coordinate handoff",
          items: [
            "Amap, Baidu and Tencent developer pages distinguish GPS and provider-specific coordinate inputs.",
            "An integrated app can handle its own data; trouble can appear when a third party mixes or mislabels sources.",
            "A naked coordinate pair does not show how the receiving app will interpret it.",
          ],
        },
        {
          heading: "Address and POI match",
          items: [
            "Incomplete text may resolve only to a city, road, district or approximate centre.",
            "Romanised, translated or common brand names can match the wrong branch.",
            "Databases can differ after a venue moves, changes name or closes an entrance.",
          ],
        },
        {
          heading: "Destination versus position",
          items: [
            "A large property can have a centre point, child POIs and separate navigation entrances.",
            "The usable gate can change by time, ticket type, vehicle access or construction.",
            "Your live dot also depends on permission and available GPS, Wi-Fi or cellular signals.",
          ],
        },
      ],
    },
    {
      id: "regulatory-boundary",
      type: "paragraph",
      text:
        "China’s surveying and public-map rules require prescribed reference systems, standards and approved handling of protected geographic information. Recognised processing algorithms and parameters are protected. This background does not prove every bad hotel pin is a security offset or supply a universal correction. Product, endpoint and region matter: one provider documents different defaults for domestic and overseas services.",
    },
    {
      id: "card-heading",
      type: "heading",
      level: 2,
      text: "Build a six-field destination card",
    },
    {
      id: "destination-card",
      type: "list",
      ordered: true,
      items: [
        "Copy the current official Chinese name, including any bracketed or dashed branch name.",
        "Record the city and district to catch same-name and cross-city mistakes.",
        "Copy the Chinese street, lane and building number; keep the original characters.",
        "Add the operational unit: terminal, station concourse, hotel tower, scenic zone or shop floor.",
        "Name the entrance or pickup point and direction only after an official channel confirms it.",
        "Add a visible landmark and official contact. Exclude passport, order, room and payment details.",
      ],
    },
    {
      id: "handoff-format",
      type: "callout",
      title: "The strongest handoff has both text and a same-app link",
      body:
        "Ask the venue for the full Chinese address and a link in the map app actually being used. A screenshot can become stale; a link may open the wrong app. Keep the text offline for a fresh search.",
      tone: "decision",
    },
    {
      id: "crosscheck-heading",
      type: "heading",
      level: 2,
      text: "Cross-check the place before leaving",
    },
    {
      id: "crosscheck-steps",
      type: "list",
      ordered: true,
      items: [
        "Start from the venue’s website, official account, booking confirmation or direct message—not a copied blog pin.",
        "Search the Chinese name and city in one China-local map. Select the result whose district and complete address match the destination card.",
        "Compare the POI branch name, category and official phone. A missing field means uncertainty.",
        "For a large site, search the required gate, visitor entrance, pickup point or ticket office as a separate place.",
        "Check a second local map or ask the venue to confirm. Address and entrance agreement matters more than identical-looking pins.",
        "Save the Chinese text, same-app link and privacy-safe screenshot offline. Recheck changeable entrances that day.",
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Four common traveller scenarios",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "Use the symptom, not a theory, to choose the recovery",
      columns: ["Scenario", "Decision", "Recovery"],
      rows: [
        [
          "A booking page’s English hotel pin is across the street from the hotel’s Chinese address",
          "Treat the booking pin as unverified",
          "Search the Chinese branch name and street number; ask reception for a same-app link and entrance.",
        ],
        [
          "One map marks a scenic-area centre and another marks the east gate",
          "Both may describe the property",
          "Use the gate that the attraction currently assigns to your ticket and arrival mode.",
        ],
        [
          "A taxi route heads toward a same-name branch in another district",
          "The POI identity is wrong, not necessarily the map geometry",
          "Safely stop, verify the six fields and have the venue send a link for the driver’s app.",
        ],
        [
          "Inside a mall or station, the blue dot jumps outside while signs match your destination",
          "Separate live positioning from the fixed POI",
          "Follow floor and exit signs to a known anchor; reacquire the dot outside or near an entrance.",
        ],
      ],
    },
    {
      id: "taxi-heading",
      type: "heading",
      level: 2,
      text: "Recover safely in a taxi or ride-hail car",
    },
    {
      id: "taxi-recovery",
      type: "list",
      ordered: true,
      items: [
        "Show the Chinese destination card and POI in the driver’s map, not only an English screenshot.",
        "Point out the district, branch and entrance. Ask the driver to confirm the district before the vehicle moves.",
        "If the route targets a property centre, search the named vehicle gate or pickup point instead.",
        "If the route goes to another district or branch, stop safely; do not distract the driver while editing.",
        "Ask the venue to explain the final approach in Chinese or send a same-app link.",
        "If confirmation is impossible, go to a known public landmark and resolve the final segment there.",
      ],
    },
    {
      id: "taxi-warning",
      type: "callout",
      title: "A moving vehicle is the wrong place to experiment",
      body:
        "Do not follow an improvised pin through a closed road, private compound or unsafe stop. Use a verified gate, staffed hotel, hub exit or public landmark where the destination can be reconfirmed.",
      tone: "warning",
    },
    {
      id: "walking-heading",
      type: "heading",
      level: 2,
      text: "Recover when walking",
    },
    {
      id: "walking-recovery",
      type: "list",
      ordered: true,
      items: [
        "Stop before crossing a barrier, express road, railway, waterway, construction area or private entrance.",
        "Compare the Chinese street sign, building number, gate name and nearby landmark with the destination card.",
        "If only the blue dot is unstable, move outside, enable precise location if appropriate and reacquire; the destination did not necessarily move.",
        "Return to a clear anchor such as a staffed metro exit, main-road junction, station information desk or hotel reception.",
        "Search the gate or entrance by name rather than repeatedly routing to the centre of a large property.",
        "Ask staff to describe the route in Chinese or send a same-app link for the entrance.",
        "If the site is closed or the entrance changed, follow its live notice, not an old mapped path.",
      ],
    },
    {
      id: "change-heading",
      type: "heading",
      level: 2,
      text: "What can change the conclusion",
    },
    {
      id: "change-table",
      type: "table",
      caption: "Recheck when any of these conditions changes",
      columns: ["Changed condition", "Why it matters", "New verification"],
      rows: [
        ["Venue name, branch or phone", "The POI may have moved, closed or been duplicated", "Confirm on the venue’s current official channel."],
        ["Gate or road access", "The centre remains correct while the usable approach changes", "Check the day’s entrance and vehicle rules."],
        ["Map app, embedded booking map or shared-link format", "A different product may interpret or match the handoff differently", "Search the text again inside the receiving app."],
        ["Country, region, app version or service endpoint", "Provider documentation does not describe one universal coordinate default", "Use that product’s current official help and a first-party POI."],
        ["Only the live location dot changes", "Permission and signal conditions affect current positioning", "Verify device settings and move to an open, known anchor."],
      ],
    },
    {
      id: "final-heading",
      type: "heading",
      level: 2,
      text: "Final place check",
    },
    {
      id: "final-check",
      type: "list",
      items: [
        "The Chinese name and branch match the venue’s current official channel.",
        "City, district, street and number all match; none was inferred from the pin alone.",
        "The chosen entrance fits today’s ticket, opening notice and transport mode.",
        "A second source or venue staff confirmed the same place identity.",
        "The text address and same-app link are saved offline.",
        "The route does not require crossing a barrier or entering a restricted or closed area.",
        "If the map still disagrees, you have a staffed public fallback landmark and a contact method.",
      ],
    },
    {
      id: "privacy-boundary",
      type: "callout",
      title: "Correct the map without exposing the traveller",
      body:
        "If the venue confirms a public POI is wrong, use the provider’s official correction channel and submit only what identifies the place. Never upload an unredacted passport, booking reference, room number, payment screen, QR code or live-location screenshot. POIs, entrances and roads remain dynamic; sources below were reviewed on 13 August 2026.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Prepare the rest of the arrival toolkit",
      items: [
        {
          label: "Browse China travel essentials",
          href: "/essentials/",
          description: "Keep connectivity, payments and practical recovery plans together.",
        },
        {
          label: "Choose a China eSIM or local SIM",
          href: "/guides/china-esim-vs-local-sim/",
          description: "A working data connection helps, but it does not verify a destination pin.",
        },
        {
          label: "Use public Wi-Fi without a local number",
          href: "/guides/china-public-wifi-passport-login/",
          description: "Plan a venue-specific connection fallback for arrival troubleshooting.",
        },
        {
          label: "Recover after losing a phone in China",
          href: "/guides/lost-phone-in-china-digital-recovery/",
          description: "Protect the device, number, accounts and bookings in the right order.",
        },
        { label: "Understand China's robotaxi zones", href: "/guides/china-robotaxi-zones-explained/", description: "Understand robotaxi zones, pilot stages, vehicle supervision and why an open test road is not necessarily a public ride service." },
        { label: "Understand Chongqing's vertical city", href: "/guides/chongqing-upper-lower-city-orientation/", description: "Read Chongqing as a three-dimensional city: match street level, station exit and building entrance before trusting a short map distance." },
        { label: "Read Yiwu beyond the market", href: "/guides/yiwu-market-to-factory-network/", description: "Understand the roles behind Yiwu's product displays without treating a booth as proof of a factory or an old directory as current guidance." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official map, standards and regulatory sources",
      items: [
        {
          label: "Geocoding and reverse geocoding",
          url: "https://lbs.amap.com/api/webservice/guide/api/georegeo/",
          publisher: "Amap Open Platform",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Web Service API overview and coordinate-source fields",
          url: "https://lbs.amap.com/api/webservice/summary/",
          publisher: "Amap Open Platform",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Geocoding service and result confidence fields",
          url: "https://lbsyun.baidu.com/docs/webapi?title=geocoding%2Fguide%2Fwebservice-geocoding-base",
          publisher: "Baidu Maps Open Platform",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Place Search 3.0 and navigation guidance points",
          url: "https://lbsyun.baidu.com/docs/webapi?title=placev3%2Fguide%2Fwebservice-placeapiV3%2FinterfaceDocumentV3",
          publisher: "Baidu Maps Open Platform",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Address geocoding and match levels",
          url: "https://lbs.qq.com/webservice_v1/guide-geocoder.html",
          publisher: "Tencent Location Services",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Coordinate input types for Tencent WebService",
          url: "https://lbs.qq.com/webservice_v1/guide-convert.html",
          publisher: "Tencent Location Services",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Notice on geographic-information security-processing technology",
          url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202204/t20220407_2668607.html",
          publisher: "Ministry of Natural Resources",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Surveying and Mapping Law of the People’s Republic of China",
          url: "https://www.mfa.gov.cn/web/wjb_673085/zzjg_673183/bjhysws_674671/bhflfg/ldbjchxgfl/202303/P020230313535012030290.pdf",
          publisher: "National People’s Congress legal text",
          reviewedAt: "2026-08-13",
        },
        {
          label: "GB/T 39609-2020 Rules for geocode of address",
          url: "https://std.samr.gov.cn/gb/search/gbDetailed?id=TFB%2FwAU5XAs%3D&mode=p",
          publisher: "National Public Service Platform for Standards Information",
          reviewedAt: "2026-08-13",
        },
      ],
    },
  ],
};

export default body;
