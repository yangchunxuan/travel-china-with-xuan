import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "China has no single nationwide public-Wi-Fi login. A venue may use SMS, hotel credentials, staff-issued codes or a passport kiosk. Beijing's official airport guide documents a passport-scanning dispenser that prints a username and password for travellers without a Chinese number; that is a specific airport process, not a promise about every airport, station or café. Arrive with independent mobile data and treat venue Wi-Fi as a useful backup." },
  { id: "answer", type: "callout", title: "If you have no Chinese number", tone: "decision", body: "At Beijing Capital, verify the official SSID and ask for the airport Wi-Fi credential dispenser. The newer Daxing notice identifies BDIA-FREE-WIFI and passport-photo-page verification on its portal, with kiosk authentication as another option. Elsewhere, ask whether the venue supports foreign SMS, passport authentication or a manual code. If it does not, stop retrying and use independent mobile data." },
  { id: "venue-heading", type: "heading", level: 2, text: "Match the login route to the venue" },
  { id: "venue-table", type: "table", caption: "What to try before handing over identity data", columns: ["Location", "Likely route", "Best first action"], rows: [
    ["Beijing Capital airport", "Chinese-number SMS or passport/ID credential dispenser", "Confirm AIRPORT-FREE-WIFI-NEW and the kiosk location from current signs"],
    ["Beijing Daxing airport", "Passport-page portal, kiosk, WeChat or phone-number authentication", "Confirm the newer notice's BDIA-FREE-WIFI SSID on current signs"],
    ["Another airport or major station", "Venue-specific SMS, kiosk, mini-program or service desk", "Read current signage; do not import Beijing's procedure"],
    ["Hotel", "Room number, surname, access code or staff-assisted portal", "Get the exact network name and credentials from reception"],
    ["Café, mall or attraction", "SMS, app, receipt code or no guest network", "Ask staff before joining a lookalike network"],
    ["Portal cannot authenticate your document", "Independent data route", "Use mobile data rather than uploading repeated passport images"]
  ] },
  { id: "beijing-heading", type: "heading", level: 2, text: "The documented Beijing airport routes are not identical" },
  { id: "beijing-list", type: "list", ordered: true, items: [
    "At Beijing Capital, the official guide identifies AIRPORT-FREE-WIFI-NEW. Let the captive portal open in a normal browser and use Chinese-number SMS only if the portal accepts your number.",
    "Without a Chinese number at Capital, locate the official Wi-Fi credential dispenser. The guide provides this question for staff: 请问最近的无线上网身份验证自助终端在哪里？",
    "Open the passport at the photo page and insert it only into the terminal marked as a passport scanner. The documented machine prints a username and password for the portal.",
    "At Daxing, the later 2025 notice identifies BDIA-FREE-WIFI and says the portal can authenticate by photographing the passport information page; kiosk, WeChat and phone-number routes are also listed.",
    "For either airport, follow current signage, retrieve the passport and any printout immediately, and ask an official service desk if the screen differs from the published route."
  ] },
  { id: "beijing-boundary", type: "callout", title: "The printed-credential route has operating limits", tone: "neutral", body: "The Beijing guide says a dispenser-issued login lasts five hours and one valid ID can obtain no more than three printouts. Those limits describe that credential route, not every Daxing passport-page login or a national rule. Verify the current screen on the day." },
  { id: "portal-heading", type: "heading", level: 2, text: "If the captive portal does not appear" },
  { id: "portal-table", type: "table", caption: "Separate a portal problem from an identity problem", columns: ["Symptom", "Try once", "Then stop and escalate"], rows: [
    ["Connected but no login page", "Turn off mobile data briefly, open a plain browser tab and revisit the official instructions", "Forget and rejoin the verified SSID; ask staff for the portal address"],
    ["SMS never arrives", "Check country code and whether the portal explicitly accepts foreign numbers", "Use the passport/manual route or independent data"],
    ["Passport kiosk rejects the scan", "Remove any cover, align only the photo page and follow the machine prompt", "Ask the official desk; do not give the passport to an unofficial helper"],
    ["Portal loops after login", "Forget the network, close the browser and make one clean attempt", "Stop repeated submissions and use another connection"],
    ["Certificate or domain warning", "Disconnect immediately", "Confirm the SSID and portal with venue staff before doing anything else"]
  ] },
  { id: "safety-heading", type: "heading", level: 2, text: "Use the real network without treating it as private" },
  { id: "safety-list", type: "list", items: [
    "Confirm the exact SSID and login procedure with signage or staff. A criminal can create a similar-looking network name.",
    "Keep the operating system and browser updated and use sites whose full address is correct and uses HTTPS. A padlock protects the connection to that site; it does not prove the site itself is honest.",
    "Avoid banking, payment recovery, password resets, passport uploads and confidential work on public Wi-Fi when your own mobile connection is available.",
    "Turn off file sharing, AirDrop or nearby-sharing visibility that you do not need. Do not install a configuration profile or certificate merely to access ordinary guest Wi-Fi.",
    "When finished, forget the network and restore automatic-join settings deliberately instead of remaining connected as you move through the terminal."
  ] },
  { id: "passport-heading", type: "heading", level: 2, text: "Protect the passport during authentication" },
  { id: "passport-copy", type: "paragraph", text: "Use the physical passport only at a clearly identified official kiosk or desk. Shield the photo page from bystanders, retrieve it immediately and destroy or securely retain any printout containing credentials. Do not photograph the kiosk screen with a full passport number visible, send a passport scan to a stranger, or leave the document inside a machine while troubleshooting. If you need support, record the time, terminal and error without exposing the document number." },
  { id: "arrival-heading", type: "heading", level: 2, text: "Do not make airport Wi-Fi carry the whole arrival plan" },
  { id: "arrival-list", type: "list", ordered: true, items: [
    "Before departure, save the hotel address in Chinese, airport-transfer instructions, booking numbers and a map screenshot offline.",
    "Activate roaming or an eSIM according to its instructions before you depend on it, while preserving access to the number used for account recovery.",
    "Keep a payment method and transport plan that do not require a last-minute app download over airport Wi-Fi.",
    "Agree on a meeting point with companions in case only one phone connects.",
    "Use airport staff for official network help; use your independent connection for sensitive account setup after arrival."
  ] },
  { id: "failure", type: "callout", title: "If every route fails", tone: "warning", body: "Move to the official information or service desk and ask for the current foreign-passport login route. If the venue has none, use roaming, eSIM, local SIM or a trusted companion's hotspot. Do not keep trying random SSIDs, buying credentials from strangers or entering identity details into search-result pages. Connectivity inconvenience is safer than identity compromise." },
  { id: "scope", type: "callout", title: "Scope and live-service boundary", tone: "neutral", body: "Airport Wi-Fi names, login limits, kiosk locations and document support can change by terminal. The Beijing and Shanghai government pages below support named airport services reviewed on 12 August 2026, not universal availability, speed, service access or acceptance of every passport. The FTC source supports general public-Wi-Fi security practice. Always follow the current venue screen and official staff." },
  { id: "links", type: "internal-links", title: "Build a connection plan that has a fallback", items: [
    { label: "China eSIM or local SIM", href: "/guides/china-esim-vs-local-sim/", description: "Choose the independent data route before arrival." },
    { label: "Paying in China as a tourist", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Set up payment without relying on an unknown public network." },
    { label: "First high-speed train in China", href: "/guides/china-high-speed-train-first-time-guide/", description: "Download booking details before entering the station." }
  ] },
  { id: "sources", type: "sources", title: "Official and primary sources reviewed", items: [
    { label: "Get Connected & Essential Apps, including Beijing airport Wi-Fi steps", url: "https://english.beijing.gov.cn/latest/specials/essentialtipsfornewarrivals/getconnected/202408/t20240830_3785643.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Beijing Capital Airport Wi-Fi service", url: "https://english.beijing.gov.cn/specials/beijingservice/pek/wifi/", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Daxing Airport passport Wi-Fi service", url: "https://english.beijing.gov.cn/latest/news/202512/t20251205_4322494.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Pudong Airport passport Wi-Fi update", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260424/88cde5e96ef242daa534102069450a03.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Are Public Wi-Fi Networks Safe?", url: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know", publisher: "US Federal Trade Commission", reviewedAt: "2026-08-12" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
