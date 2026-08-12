import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "Choose the connection that supplies the capability you actually need. A worldwide-provider travel eSIM is often the simplest data-only option. A mainland operator SIM normally gives you a mainland +86 number and requires passport-based real-name registration. Home-carrier roaming keeps your existing line but may cost more. Dual SIM can combine two of these, provided your exact phone model, regional variant and carrier lock allow it. Do not buy from the word ‘eSIM’ alone: data, voice, SMS, number, activation and network routing are separate product facts.",
    },
    {
      id: "short-decision",
      type: "callout",
      title: "The practical default",
      body:
        "For a short trip that only needs maps, messages and app data, start by comparing a travel eSIM with home-carrier roaming. If a mainland number or ordinary local SMS is genuinely required, use an official mainland operator service hall. Keep the home line available for bank and account codes when possible, but disable its expensive data roaming.",
      tone: "decision",
    },
    {
      id: "needs-heading",
      type: "heading",
      level: 2,
      text: "Start with the job, not the product label",
    },
    {
      id: "needs-table",
      type: "table",
      caption: "Choose a starting route by the capability you need",
      columns: ["Need", "Best starting route", "Verify before paying"],
      rows: [
        [
          "Data for maps, messaging and browsing",
          "Travel eSIM or home-carrier roaming",
          "Data allowance, validity, activation event, hotspot policy and supported networks",
        ],
        [
          "A mainland +86 mobile number",
          "Mainland operator SIM",
          "Passport onboarding, voice/SMS service, plan expiry, recharge and cancellation",
        ],
        [
          "Home number for bank or account codes",
          "Keep the home line active alongside another data line",
          "Incoming-SMS and roaming charges, dual-line limits and default voice/SMS settings",
        ],
        [
          "Ordinary local calls or SMS",
          "Mainland operator SIM, or a product explicitly including them",
          "Do not infer a number or voice service from a data allowance",
        ],
        [
          "One connection shared with a laptop or family",
          "A plan that explicitly permits hotspot use, or a pocket Wi-Fi alternative",
          "Hotspot allowance, speed policy, battery life and number of connected devices",
        ],
        [
          "A locked or incompatible phone",
          "Home roaming, compatible unlocked spare phone or pocket Wi-Fi",
          "Do not buy a profile or physical SIM until model and lock status are confirmed",
        ],
      ],
    },
    {
      id: "device-heading",
      type: "heading",
      level: 2,
      text: "Audit the exact phone before shopping",
    },
    {
      id: "device-table",
      type: "table",
      caption: "Five device facts that can stop the plan",
      columns: ["Check", "Where to look", "Why it matters"],
      rows: [
        [
          "Exact model number and sales region",
          "Settings and the manufacturer's support page",
          "Two phones with the same marketing name can have different SIM trays, eSIM support or bands.",
        ],
        [
          "Carrier lock",
          "Device settings or the home carrier",
          "A locked phone may reject another provider's eSIM or physical SIM even when the hardware supports it.",
        ],
        [
          "eSIM support",
          "An EID/eSIM menu plus the manufacturer record for that model",
          "A missing menu may reflect the regional variant, carrier policy or device management—not a setup error.",
        ],
        [
          "Two-line behaviour",
          "Manufacturer documentation for simultaneous active lines",
          "‘Dual SIM’ can mean stored profiles, one active line, dual standby or another specific combination.",
        ],
        [
          "Frequency-band and network support",
          "Manufacturer specification matched with the chosen provider",
          "A profile can install successfully while coverage or network generation remains limited.",
        ],
      ],
    },
    {
      id: "esim-boundary",
      type: "callout",
      title: "Travel eSIM and mainland-carrier eSIM are not the same product",
      body:
        "A worldwide provider can sell a travel data eSIM for use in mainland China even when the phone cannot activate an eSIM issued by a mainland operator. Apple currently documents mainland-carrier eSIM only for particular mainland-market iPhone models and says an iPhone bought outside mainland China cannot install a mainland-carrier profile. That statement must not be generalised to every travel eSIM, Android model or future device.",
      tone: "warning",
    },
    {
      id: "options-heading",
      type: "heading",
      level: 2,
      text: "What each connection route gives up",
    },
    {
      id: "options-comparison",
      type: "comparison",
      title: "There is no option with every advantage",
      columns: [
        {
          heading: "Travel eSIM",
          items: [
            "Can be bought and installed before departure",
            "Often data-only and may not provide a +86 number, voice or SMS",
            "Activation, routing, hotspot use and app behaviour depend on the product",
            "Support is usually remote, so keep the order and QR code offline",
          ],
        },
        {
          heading: "Mainland operator SIM",
          items: [
            "Normally supplies a local number and ordinary operator service",
            "Requires real-name registration with the original passport",
            "An official service hall can troubleshoot onboarding in person",
            "The physical card, plan expiry, recharge and closure need management",
          ],
        },
        {
          heading: "Home-carrier roaming",
          items: [
            "Keeps the familiar number and avoids changing SIM identity",
            "May be the simplest route for a very short visit",
            "Price, fair-use limits and network partners are carrier-specific",
            "A roaming pass does not automatically include ordinary local calling or a +86 number",
          ],
        },
      ],
    },
    {
      id: "number-heading",
      type: "heading",
      level: 2,
      text: "Do you really need a mainland number?",
    },
    {
      id: "number-copy",
      type: "paragraph",
      text:
        "A local number can help when a delivery, venue, account or person requires mainland voice or SMS. It is not a universal prerequisite for travelling. Official mobile-payment guidance says major payment apps can accept foreign or Chinese phone numbers, although an individual bank, merchant or verification flow may still behave differently. Write down the exact task that needs the number before adding a service-hall visit to the itinerary. A data eSIM plus an existing foreign number may be enough; conversely, working data does not prove you can receive local SMS.",
    },
    {
      id: "purchase-heading",
      type: "heading",
      level: 2,
      text: "Questions to answer before buying any plan",
    },
    {
      id: "purchase-list",
      type: "list",
      items: [
        "When does validity begin: at purchase, installation, first network connection or manual activation?",
        "Is the allowance total, daily or advertised as unlimited with a high-speed threshold and reduced speed afterwards?",
        "Does it include a phone number, incoming and outgoing calls, SMS, hotspot use and the destination regions on your route?",
        "Which local networks may it use, and can the phone select a network manually if automatic connection fails?",
        "Can the profile be reinstalled after deletion or a phone reset? Many QR codes are single-use.",
        "What is the refund rule if the device is incompatible, the profile is installed, or the trip changes?",
        "What support channel works without the affected line, and what evidence will support ask you to provide?",
        "How does the provider route traffic, and what does it explicitly say about app and website reachability? Do not buy on an influencer's blanket promise.",
      ],
    },
    {
      id: "travel-setup-heading",
      type: "heading",
      level: 2,
      text: "Set up a travel eSIM without losing the QR code",
    },
    {
      id: "travel-setup",
      type: "list",
      ordered: true,
      items: [
        "On reliable Wi-Fi before departure, save the order number, plan terms, support link, QR code and manual activation details to a second device or printed page.",
        "Install only when the provider says installation will not start the validity clock. Give the line a clear name such as ‘China data’; do not delete it if the first activation attempt fails.",
        "Keep the home line selected for calls and messages if you need it, but turn off data roaming on that line unless your carrier plan requires and covers it.",
        "Select the travel line for cellular data. Turn data roaming on for that line only if the travel-eSIM provider instructs you to; many products need it because they roam on a partner network.",
        "After arrival, allow network registration, then follow the provider's APN or network-selection instructions exactly. Test a website, map and message before leaving airport support and Wi-Fi.",
      ],
    },
    {
      id: "local-setup-heading",
      type: "heading",
      level: 2,
      text: "Buy a mainland SIM through an accountable operator",
    },
    {
      id: "local-setup",
      type: "list",
      ordered: true,
      items: [
        "Use a directly operated China Mobile, China Unicom or China Telecom service hall that confirms it handles foreign passports. Beijing's official guide also lists airport service counters, but locations and hours must be rechecked.",
        "Bring the original passport. Real-name registration is part of opening the line; a photocopy alone may not complete identity verification.",
        "Ask staff to write the number, plan name, included data/voice/SMS, billing cycle, expiry, recharge method, support number and any cancellation requirement.",
        "Insert and activate the SIM while still at the counter. Test data, an outgoing call, an incoming SMS and hotspot separately when those functions matter.",
        "Keep the SIM holder and service record. Before leaving China or abandoning the number, ask whether the plan renews, holds a balance or needs formal closure.",
      ],
    },
    {
      id: "dual-warning",
      type: "callout",
      title: "Dual SIM can create silent charges",
      body:
        "Label both lines and review four settings: cellular data, data switching, default voice and default SMS. Turn off automatic cellular-data switching if it could move traffic to the expensive home line. Ask your home carrier whether receiving SMS abroad is chargeable, and remember that answering or returning a call may use a different tariff. Take screenshots of the working configuration before changing it.",
      tone: "warning",
    },
    {
      id: "testing-heading",
      type: "heading",
      level: 2,
      text: "A browser opening is not a complete test",
    },
    {
      id: "testing-table",
      type: "table",
      caption: "Test each capability you paid for",
      columns: ["Test", "What it proves", "What it does not prove"],
      rows: [
        ["Open a fresh website with Wi-Fi off", "Cellular data is moving", "Maps, payments, hotspot, voice and SMS all work"],
        ["Load a map and start navigation", "Location data and the map service can update", "Every overseas app is reachable through the same route"],
        ["Receive and send a message in the needed app", "That account and data route work now", "Ordinary SMS or a mainland number exists"],
        ["Receive an SMS to the chosen number", "That line can receive that message", "All banks and platforms will send codes to it"],
        ["Place an ordinary call", "Voice service is included and active", "International calling is included at the same price"],
        ["Connect one device to hotspot", "Tethering is enabled for that test", "There is no speed, device-count or usage limit"],
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "Recover by diagnosing the layer that failed",
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Failure map",
      columns: ["Symptom", "Check first", "Fallback"],
      rows: [
        [
          "No eSIM menu or installation rejected",
          "Exact model, regional variant, software version, carrier lock and whether the QR code was already used",
          "Do not keep deleting profiles; use roaming, a compatible physical SIM, spare phone or pocket Wi-Fi.",
        ],
        [
          "Installed but no network",
          "Correct data line, provider-required roaming, APN, automatic/manual network selection and activation time",
          "Use Wi-Fi to contact provider support with screenshots and the order number.",
        ],
        [
          "Data works but no +86 number or SMS",
          "Whether the purchased product is explicitly data-only",
          "Use app messaging or obtain a local operator line if the task truly requires ordinary SMS.",
        ],
        [
          "Local SIM registration fails",
          "Passport transcription, supported document type and whether the branch handles foreign customers",
          "Ask the directly operated service hall to resolve it; do not let an unaccountable reseller invent identity data.",
        ],
        [
          "One app fails while other data works",
          "App account, permissions, service availability and provider routing",
          "Use the app's official support or another lawful service; this is not proof that the entire line failed.",
        ],
        [
          "Home line creates charges",
          "Data switching, background data, roaming and voice/SMS tariff",
          "Disable unwanted roaming and contact the home carrier; preserve access to recovery codes another way.",
        ],
      ],
    },
    {
      id: "security-heading",
      type: "heading",
      level: 2,
      text: "Keep the connection from becoming one point of failure",
    },
    {
      id: "security-list",
      type: "list",
      items: [
        "Store eSIM orders, passport copies and important contacts outside the travel phone, protected by an appropriate account and offline backup.",
        "Keep recovery codes for the primary email, Apple or Google account, bank and password manager somewhere the lost phone cannot take with it.",
        "Record which number each critical account uses before changing SIM settings. Do not update every account to a temporary number that will expire after the trip.",
        "Use a screen lock and device-finding service. Know how to contact the carrier and payment providers if the phone or SIM is lost.",
        "Keep one arrival fallback—airport Wi-Fi instructions, a roaming day pass, a companion's hotspot or an offline address—so failed activation does not block the first transfer.",
      ],
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "Scope and live-rule boundary",
      body:
        "Device support, mainland-carrier eSIM availability, plan features, network routing, prices and service-hall handling can change. The official pages below were reviewed on 12 August 2026. Recheck the manufacturer page for the exact model and the provider's live terms before purchase. This guide does not promise that a particular plan reaches every app or website, does not recommend a way to bypass law or network policy, and does not treat one iPhone rule as an Android rule.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Build the rest of the phone setup",
      items: [
        {
          label: "Set up mobile payments for China",
          href: "/guides/how-to-pay-in-china-as-a-tourist/",
          description: "A phone number and a working payment method are related but separate tasks.",
        },
        {
          label: "Use public Wi-Fi when you do not have a local number",
          href: "/guides/china-public-wifi-passport-login/",
          description: "Prepare a venue-specific arrival fallback rather than depending on universal Wi-Fi.",
        },
        {
          label: "Recover after losing a phone in China",
          href: "/guides/lost-phone-in-china-digital-recovery/",
          description: "Protect the number, accounts, payments and travel bookings in the right order.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and manufacturer sources reviewed",
      items: [
        {
          label: "Real-name registration rules for telephone users (2026 republication)",
          url: "https://sdca.miit.gov.cn/zwgk/fgbz/art/2026/art_9b270ddb59cc4643b0a9c6811c4e750d.html",
          publisher: "Ministry of Industry and Information Technology",
          reviewedAt: "2026-08-12",
        },
        {
          label: "A guide for purchasing SIM cards in Beijing",
          url: "https://english.beijing.gov.cn/quickguideservices/purchasingsimcards/",
          publisher: "Beijing Municipal Government",
          reviewedAt: "2026-08-12",
        },
        {
          label: "Use eSIM while travelling internationally with iPhone",
          url: "https://support.apple.com/en-us/118227",
          publisher: "Apple Support",
          reviewedAt: "2026-08-12",
        },
        {
          label: "Activate a China mainland carrier eSIM on iPhone",
          url: "https://support.apple.com/en-mide/123879",
          publisher: "Apple Support",
          reviewedAt: "2026-08-12",
        },
        {
          label: "Foreign and Chinese phone numbers for mobile-payment registration",
          url: "https://nsd.mofcom.gov.cn/tzyts/art/2024/art_a08888d0b9da42f083b00223edaf1de7.html",
          publisher: "Ministry of Commerce",
          reviewedAt: "2026-08-12",
        },
      ],
    },
  ],
};

export default body;
