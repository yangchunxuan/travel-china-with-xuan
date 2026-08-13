import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "Find the attraction owner before comparing sellers. An official ticket channel is one the attraction itself names or links—not a search ranking, advertising badge or a seller’s own ‘official’ claim. Buy direct when the owner channel works for your document and payment. Consider a reseller only when it adds a service you need and clearly identifies the supplier, inventory status, real-name data flow, total price and live refund terms. Payment success is not owner-confirmed admission.",
    },
    {
      id: "three-scenarios",
      type: "comparison",
      title: "Three situations, three sensible defaults",
      columns: [
        {
          heading: "Official direct booking works",
          items: [
            "Use the owner’s named website, mini program, account or ticket desk.",
            "Best default for scarce, timed or strictly real-name admission.",
            "Save confirmation, entry document, time slot and live cancellation rule.",
          ],
        },
        {
          heading: "You need reseller support",
          items: [
            "Support may include language, foreign payment, transport, guide or a genuine bundle.",
            "Identify seller, supplier and attraction owner separately.",
            "Require confirmed status and an owner-verifiable reference.",
          ],
        },
        {
          heading: "Official channel is sold out",
          items: [
            "Do not treat ‘internal ticket’ or payment as inventory proof.",
            "If the owner rejects third-party agents, do not buy a standalone reseller ticket.",
            "Change date or slot, use an owner-approved tour path, or choose another attraction.",
          ],
        },
      ],
    },
    {
      id: "definition-warning",
      type: "callout",
      title: "Official means owner-traceable",
      body:
        "Start at the attraction’s institutional website or verified service account and follow its ticket link. A different ticket domain can be official if the owner links it. A familiar marketplace, high search result or licensed agency is not proof of standalone-ticket authorisation. Save the link path.",
      tone: "decision",
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Verify the channel before you give it passport data",
    },
    {
      id: "verify-reseller-module",
      type: "table",
      caption: "Merged verify-china-reseller-ticket checklist",
      columns: ["Question", "Acceptable proof", "Stop signal"],
      rows: [
        ["Who owns admission?", "Attraction and its current visitor/ticket notice", "Seller never names the owner"],
        ["Is this channel authorised?", "Owner names or links it, or confirms an agency/group route", "Only the seller calls itself official"],
        ["Who is the seller?", "Operating entity, address, contact and storefront are visible", "Payment to a personal account or private chat"],
        ["Who supplies inventory?", "Named supplier and a route to verify its confirmation", "‘Internal stock’ with no accountable supplier"],
        ["What is being sold?", "Admission is separated from guide, transfer, meal, audio device or service fee", "A free reservation is presented as a paid admission ticket"],
        ["Which ID fields move where?", "Document, name and number purpose are explained in a secure flow", "Passport image requested through personal messaging"],
        ["When is it confirmed?", "Owner/supplier reference, correct visitor, date, slot and status", "Only payment receipt or reseller order number"],
        ["What can change or refund?", "Product-specific cutoff, fees, no-show rule, refund route and counterparty", "Generic ‘refundable’ label without conditions"],
      ],
    },
    {
      id: "regulatory-context",
      type: "paragraph",
      text:
        "China’s online-tourism rules require platforms to verify operators, distinguish self-operated products from platform sellers, provide true information and make booking channels transparent and queryable. Online-transaction rules also cover seller identity, false stock claims, material terms and records. These duties support the checklist; they do not make every listing attraction-authorised or decide an individual case.",
    },
    {
      id: "owner-examples-heading",
      type: "heading",
      level: 2,
      text: "Four owner pages show why attraction-specific checking matters",
    },
    {
      id: "owner-examples",
      type: "table",
      caption: "Official rules observed on 13 August 2026—not universal China rules",
      columns: ["Attraction owner", "What its official page establishes", "Booking lesson"],
      rows: [
        ["Palace Museum", "It names its official mini program, says it has not authorised third parties to act as ticket or exhibition-reservation agents, and applies real-name document checks including passports for eligible non-mainland visitors.", "Do not buy a standalone third-party Forbidden City ticket; recheck live document, release and cancellation rules in the official flow."],
        ["Dunhuang Academy / Mogao Caves", "A July 2026 statement says its named website and mini program are the official ticket platforms and rejects third-party ticket agents; the annual notice also provides an official foreign-passport path and an official portal for reviewed travel-agency users.", "An agency’s owner-portal access does not prove authority to advertise public standalone inventory elsewhere."],
        ["Emperor Qinshihuang’s Mausoleum Site Museum", "Its owner site names its website and official accounts, supports passport information for booking, requires original-document verification and can stop sales at capacity.", "A separate technology domain may be legitimate when reached from the owner site; capacity and passport matching still control entry."],
        ["National Museum of China", "General admission is an official real-name reservation, and the museum warns against other reservation routes because of fraud and personal-data risks.", "If a seller charges money, identify whether it sells admission, booking assistance, a guide, transport or another service."],
      ],
    },
    {
      id: "comparison-heading",
      type: "heading",
      level: 2,
      text: "Compare services—not a reseller league table",
    },
    {
      id: "channel-comparison",
      type: "table",
      caption: "Direct and reseller channels solve different problems",
      columns: ["Decision field", "Owner/direct channel", "Reseller channel"],
      rows: [
        ["Inventory authority", "Closest to the owner’s released inventory and rules", "May request or source inventory from a supplier; ask when it becomes confirmed"],
        ["Language and support", "May be mainly Chinese or offer limited overseas support", "May add multilingual service and a single support desk"],
        ["Payment", "May require a supported local or international payment route", "May accept another card/currency but add exchange, service or bundle cost"],
        ["Real-name data", "Sent directly into the owner’s system", "May pass through seller and supplier; identify each recipient"],
        ["Changes/refunds", "Owner’s live product rule and original official channel", "Product, platform and supplier terms may all matter; save checkout terms"],
        ["Failure contact", "Owner ticket service can inspect its record", "Reseller must coordinate with supplier; obtain case and supplier references"],
      ],
    },
    {
      id: "reseller-terms-example",
      type: "callout",
      title: "A reseller’s own terms must be attributed, not generalised",
      body:
        "Trip.com’s published terms say its attraction tickets are supplied by third parties, availability can change before confirmation, extra verification may be required, and product-specific terms govern changes or cancellation. They also say not to repeat payment while a payment problem is unresolved. These are Trip.com statements for the cited version—not attraction authorisation, a ranking or an industry rule.",
      tone: "neutral",
    },
    {
      id: "state-heading",
      type: "heading",
      level: 2,
      text: "Follow the booking state all the way to owner-verifiable admission",
    },
    {
      id: "booking-state-flow",
      type: "list",
      ordered: true,
      items: [
        "Listed: a product page is visible. This proves neither live inventory nor owner authorisation.",
        "Request submitted: the seller has your details, but a supplier may still need to accept the request.",
        "Payment authorised or paid: money moved; admission may still be pending.",
        "Supplier/owner confirmed: inventory is assigned and a supplier or owner reference exists.",
        "Identity matched: visitor, document, date and time slot match the original and plan.",
        "Ready for entry: the owner can verify the record and you have the original document, entrance and any secondary reservation.",
      ],
    },
    {
      id: "refund-state-flow",
      type: "callout",
      title: "Refunds have a separate state chain",
      body:
        "A cancellation request is not an accepted refund; acceptance is not a processed transfer; processing is not a credit posted to the original method. Save the live cutoff, amount, fee, case number and refund reference. Never promise a universal refund time or assume a generic seven-day online-return rule applies to dated admission.",
      tone: "warning",
    },
    {
      id: "purchase-heading",
      type: "heading",
      level: 2,
      text: "Before payment, make the product answer these questions",
    },
    {
      id: "purchase-list",
      type: "list",
      items: [
        "Is admission included, and which gate, zone, exhibition or shuttle is excluded?",
        "Is the date fixed, is there an entry window, and what happens if security queues make you late?",
        "Which documents can the booking flow accept, and must the original be carried?",
        "Can names, document numbers, people, date or time change after confirmation?",
        "Is stock instant, on request or awaiting supplier confirmation, and when is the decision due?",
        "What is the full charge by currency, including service, guide, transport and cancellation fees?",
        "Who handles visit-day failure, through which official route, and what reference will they search?",
      ],
    },
    {
      id: "privacy-heading",
      type: "heading",
      level: 2,
      text: "Real-name booking still requires controlled passport sharing",
    },
    {
      id: "privacy-list",
      type: "list",
      items: [
        "Use the identified owner/seller/supplier’s secure channel and provide only required fields.",
        "Do not send passport scans, booking QR codes, payment credentials or one-time codes to a personal social account.",
        "Confirm how companion data is handled before one person uploads everyone’s details.",
        "Keep a redacted offline summary and protect the complete voucher from misuse.",
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "Recover without buying the same uncertainty twice",
    },
    {
      id: "failure-table",
      type: "table",
      caption: "What to do when the reseller route fails",
      columns: ["Failure", "Immediate action", "Fallback"],
      rows: [
        ["Payment succeeded, order pending", "Do not pay again; ask for the supplier decision time and preserve current terms", "Cancel only under the live rule, or use confirmed official inventory"],
        ["Voucher issued, owner cannot find it", "Ask reseller for supplier and owner reference; record the owner’s failed search", "Use accountable support, then document any reasonable replacement"],
        ["Name or passport data wrong", "Ask whether correction is allowed before cancelling; save the answer", "Rebook through a verified channel only if correction is impossible and terms are clear"],
        ["Official channel sold out", "Check the owner’s latest notice for returns, other slots and approved group paths", "Change date, time or attraction rather than trust ‘guaranteed internal’ stock"],
        ["Seller asks for more private data in chat", "Stop and request its formal secure input route and legal entity", "Book direct or use another accountable service"],
      ],
    },
    {
      id: "change-conditions",
      type: "callout",
      title: "What could change this recommendation",
      body:
        "A reseller is more reasonable when the owner permits the channel or it is a transparent support bundle, direct booking cannot accept your document or payment, and the seller provides owner-verifiable confirmation with clear terms. Direct booking is effectively mandatory when the owner rejects agents, requires its own identity flow or has no transferable inventory. Recheck at checkout; reviewed 13 August 2026.",
      tone: "decision",
    },
    {
      id: "final-heading",
      type: "heading",
      level: 2,
      text: "Final verification before travel",
    },
    {
      id: "final-check",
      type: "list",
      items: [
        "The owner, seller and supplier are separately identified, and the channel link is traceable.",
        "Status is confirmed—not merely listed, submitted, paid or processing—and an owner/supplier reference exists.",
        "Every visitor’s name and document match the originals, date, entry window and entrance.",
        "Admission, guide, transport and other bundle components and total fees are itemised.",
        "The current change, cancellation, no-show and refund rules are saved with a capture time.",
        "Visit-day support works without the reseller app, and personal chat contains no sensitive data.",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Plan the attraction booking around the rest of the trip",
      items: [
        { label: "China travel essentials", href: "/essentials/", description: "Return to practical booking, payment and entry guidance." },
        { label: "Book and route the National Museum of China", href: "/guides/national-museum-of-china-booking-and-route/", description: "Use the live official reservation process for this Beijing museum." },
        { label: "Visit the Forbidden City as a foreign visitor", href: "/guides/forbidden-city-for-foreign-visitors/", description: "Place the official ticket inside the entrance and route plan." },
        { label: "Keep passport names consistent", href: "/guides/passport-name-across-china-bookings/", description: "Prevent a real-name mismatch at confirmation or entry." },
        { label: "Build a booking dispute file", href: "/guides/china-booking-dispute-evidence-pack/", description: "Freeze the order record, build a dated evidence timeline and escalate through the booking and payment channels without exposing private data." },
        { label: "Visit Mogao Caves independently", href: "/guides/mogao-caves-independent-visit-workflow/", description: "Use the official foreign-passport channel, understand normal versus emergency visits, arrive at the correct first stop and protect the day against weather changes." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and primary sources reviewed",
      items: [
        { label: "Interim Provisions on the Administration of Online Tourism Services", url: "https://www.mct.gov.cn/preview/whhlyqyzcxxfw/zhgl/202012/t20201222_919903.html", publisher: "Ministry of Culture and Tourism", reviewedAt: "2026-08-13" },
        { label: "Measures for the Supervision and Administration of Online Transactions", url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2025/art_4b47c79b8d994a42bba4835997688faa.html", publisher: "State Administration for Market Regulation", reviewedAt: "2026-08-13" },
        { label: "Official booking and visitor rules", url: "https://www.dpm.org.cn/subject_booking/index.html", publisher: "Palace Museum", reviewedAt: "2026-08-13" },
        { label: "Statement regulating Mogao Caves ticket sales", url: "https://www.dha.ac.cn/info/1018/7786.htm", publisher: "Dunhuang Academy", reviewedAt: "2026-08-13" },
        { label: "2026 Mogao Caves opening and booking notice", url: "https://www.dunhuangcaves.org/info/1020/7498.htm", publisher: "Dunhuang Academy visitor service", reviewedAt: "2026-08-13" },
        { label: "Official booking guide", url: "https://www.bmy.com.cn/guide/", publisher: "Emperor Qinshihuang’s Mausoleum Site Museum", reviewedAt: "2026-08-13" },
        { label: "Official English reservation system", url: "https://pcticket.chnmuseum.cn/museum-en/", publisher: "National Museum of China", reviewedAt: "2026-08-13" },
        { label: "Trip.com Terms and Conditions", url: "https://www.trip.com/contents/service-guideline/terms.html?locale=en-XX", publisher: "Trip.com", reviewedAt: "2026-08-13" },
      ],
    },
  ],
};

export default body;
