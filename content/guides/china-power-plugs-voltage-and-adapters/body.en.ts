import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Mainland China uses 220V electricity at 50Hz. Most phone, tablet, camera and laptop chargers accept it because their input label says 100–240V, 50/60Hz; those devices need only a plug-shape adapter when their pins do not fit. A device labelled only 110V or 120V is different: a plug adapter cannot lower the voltage, so it needs an appropriate converter or, more safely for many high-power appliances, a locally compatible replacement." },
  { id: "answer", type: "callout", title: "The 30-second answer", tone: "decision", body: "Read the INPUT line on every charger. If its range includes 220V and 50Hz, solve only the plug shape. If it does not include 220V, do not connect it directly. If there is no readable label, the safe answer is not to guess—check the exact model with the manufacturer or leave it at home." },
  { id: "two-questions-heading", type: "heading", level: 2, text: "Adapter and converter answer two separate questions" },
  { id: "two-questions-table", type: "table", caption: "Choose from the device label, not your home country", columns: ["What you see", "What it means", "What to pack"], rows: [
    ["INPUT 100–240V, 50/60Hz", "The power supply accepts China's voltage and frequency", "A shape adapter if its plug does not fit; no voltage converter"],
    ["INPUT 220–240V, 50Hz", "Electrically compatible with mainland supply", "A shape adapter if needed"],
    ["INPUT 110V or 120V only", "Not compatible with 220V supply", "A properly rated voltage converter or a different appliance"],
    ["220/240V switch on the appliance", "It may be dual-voltage but requires a manual setting", "Set it correctly while unplugged, then use a suitable adapter"],
    ["Label missing, damaged or ambiguous", "Compatibility cannot be established", "Manufacturer confirmation or a replacement device"]
  ] },
  { id: "socket-heading", type: "heading", level: 2, text: "Expect Type A, C and I—but do not plan around one hotel socket" },
  { id: "socket-copy", type: "paragraph", text: "Shanghai government guidance lists Type A, C and I plugs, while CAAC visitor guidance describes flat two-pin and angled three-pin sockets. In practice, hotels and transport hubs may use multi-standard outlets, USB outlets or a different mix. A North American or Japanese Type A plug may fit a flat two-pin socket, but physical fit says nothing about voltage. A European Type C charger is often straightforward, yet a heavy plug can sit loosely in a worn universal socket. Australian and New Zealand Type I plugs resemble the angled format, but a grounded appliance still needs secure contact and the correct rating." },
  { id: "socket-warning", type: "callout", title: "A universal socket is not a universal safety guarantee", tone: "warning", body: "Stop using an outlet if the adapter hangs out, pins remain exposed, it sparks, crackles, smells hot or cannot hold the plug without pressure. Move to another outlet and ask the accommodation to inspect it. Never bend pins, wedge paper around a plug or stack several loose adapters." },
  { id: "label-heading", type: "heading", level: 2, text: "How to read a charger without confusing input and output" },
  { id: "label-list", type: "list", ordered: true, items: [
    "Unplug the device and find INPUT on the power brick, charger base or appliance plate. OUTPUT describes what the charger sends to the phone or laptop and does not prove that the charger accepts 220V.",
    "Read the entire range. A dash in 100–240V means the charger accepts values across that range; a label listing only 120V does not.",
    "Check frequency as well as voltage. 50/60Hz covers China's 50Hz supply. Equipment with motors, timers or frequency-dependent controls needs manufacturer confirmation even when voltage is handled.",
    "Check watts or amps on the appliance and the maximum rating of every adapter, converter and extension in the chain. The lowest-rated component is the limit.",
    "Look for the double-square symbol only as an indication of double insulation; do not treat a two-pin adapter as a way to remove a grounding requirement from a grounded appliance."
  ] },
  { id: "device-heading", type: "heading", level: 2, text: "The device category changes the risk" },
  { id: "device-table", type: "table", caption: "Practical choice by equipment type", columns: ["Equipment", "Usual planning route", "Extra check"], rows: [
    ["Phone, tablet, camera or laptop charger", "Most modern models are wide-input, but verify the printed label", "Use the original or reputable charger and keep ventilation around multi-port units"],
    ["USB-C multi-port charger", "One compatible charger can reduce adapter stacking", "Its total wattage must cover the devices connected at the same time"],
    ["Hair dryer, straightener, curling iron or kettle", "Prefer a verified dual-voltage model or use the hotel's/local appliance", "Heating devices draw high power; many compact converters are not suitable"],
    ["Electric shaver or toothbrush", "Check the charging base as well as the handset", "A bathroom outlet marked for shavers may have use or power limits"],
    ["CPAP, medical device or professional equipment", "Get written manufacturer input requirements and accommodation confirmation", "Plan a spare adapter and power-outage response; do not improvise grounding"]
  ] },
  { id: "converter-heading", type: "heading", level: 2, text: "When a voltage converter is genuinely required" },
  { id: "converter-copy", type: "paragraph", text: "A converter must accept roughly 220V input and provide the voltage the appliance requires. Its continuous wattage rating must exceed the appliance's actual demand, with additional margin for equipment that draws more at startup. Some travel converters are intended only for short use with a narrow class of heating devices; others are transformer-based and heavy. Neither automatically changes 50Hz to 60Hz. Match the exact appliance and use case to the converter manufacturer's instructions rather than buying by plug picture alone." },
  { id: "converter-decision", type: "callout", title: "For one trip, replacing the appliance is often the cleaner answer", tone: "decision", body: "If the only incompatible item is a high-power hair tool or kettle, a locally rated appliance or hotel-provided item usually removes the converter, wattage and overheating problem at once. Keep a converter for equipment that truly cannot be substituted and only after the manufacturer confirms the combination." },
  { id: "room-heading", type: "heading", level: 2, text: "Build one stable charging station in the room" },
  { id: "room-list", type: "list", items: [
    "Bring one reputable, correctly rated adapter rather than several anonymous plug cubes. If you need more ports, use a wide-input USB charger that is designed to power the devices together.",
    "Keep adapters and chargers on a hard, uncovered surface. Do not charge under bedding, behind curtains or where water can reach the connection.",
    "Do not daisy-chain travel adapters, power strips and converters. Each extra joint creates leverage, heat and another rating that can be exceeded.",
    "If bringing an extension lead, confirm it is rated for at least 220V and the intended current, and that grounding continues through the whole chain where required.",
    "Put the adapter and one charging cable in carry-on. A delayed checked bag should not leave the phone, authentication codes and transport bookings without power."
  ] },
  { id: "failure-heading", type: "heading", level: 2, text: "If charging fails after arrival" },
  { id: "failure-table", type: "table", caption: "Troubleshoot without sacrificing the device", columns: ["Symptom", "Safe next step", "Do not do"], rows: [
    ["Nothing powers on", "Disconnect, test the outlet with hotel staff or a known low-power wide-input charger, then test the adapter separately", "Force the pins or repeatedly cycle a suspect outlet"],
    ["Adapter or charger becomes unusually hot", "Unplug immediately and let it cool on a non-flammable surface", "Cover it, keep charging overnight or assume heat is normal"],
    ["Plug is loose", "Use another outlet or a different correctly fitting adapter", "Hold it in place with tape, furniture or an object"],
    ["Breaker trips", "Disconnect the whole chain and ask the accommodation for help", "Reset repeatedly or reconnect the same high-power load"],
    ["Device works slowly", "Check charger output, cable and shared wattage after confirming input compatibility", "Buy a voltage converter when the actual issue is USB power allocation"]
  ] },
  { id: "pack-heading", type: "heading", level: 2, text: "A final packing audit" },
  { id: "pack-list", type: "list", ordered: true, items: [
    "Photograph each device's input label and save the exact model specification offline.",
    "Separate wide-input chargers from single-voltage appliances.",
    "Choose adapters that fit the plug, preserve required grounding and exceed the load rating.",
    "Ask the first hotel about outlets or medical-equipment support when power is mission-critical.",
    "Pack one backup cable and distribute essential charging equipment between responsible adults, not checked bags.",
    "Recheck any converter instructions before use and stop at the first sign of damage or overheating."
  ] },
  { id: "scope", type: "callout", title: "Scope and live-fact boundary", tone: "neutral", body: "The official pages below support mainland China's 220V/50Hz supply and commonly used plug formats as reviewed on 12 August 2026. They do not certify a particular room outlet, adapter or appliance. This guide covers ordinary travel electronics, not building wiring, hard-wired equipment or a medical-device risk assessment. The device and adapter manufacturers control their specifications; the accommodation controls what is installed on site." },
  { id: "links", type: "internal-links", title: "Finish the device plan", items: [
    { label: "Power bank rules for flights and trains", href: "/guides/china-power-bank-rules-flights-trains/", description: "Keep charging compatibility separate from battery transport rules." },
    { label: "China eSIM or local SIM", href: "/guides/china-esim-vs-local-sim/", description: "Build a phone setup that still works on arrival." },
    { label: "Final night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Put essential chargers and adapters back in carry-on." }
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "Electricity in China", url: "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" },
    { label: "Beijing pre-departure travel tips", url: "https://english.beijing.gov.cn/travellinginbeijing/quickguideontravelservices/traveltips/202108/t20210811_2466837.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Shanghai packing guidance listing Type A, C and I plugs", url: "https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20250924/e961a223e45a4adca7969b3f7691132b.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-12" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
