import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "A photocopy cannot replace a lost passport, but it can help prove identity. The recovery order in China is: report the loss and obtain the document required by the local public-security exit-entry authority; use it to apply to your own embassy or consulate for a new passport or temporary travel document; then return to the exit-entry authority for any visa, stay-permit, residence-permit or exit document required before departure. Start now, even if the flight is several days away."
    },
    {
      id: "decision-map",
      type: "table",
      caption: "Who controls each part of passport-loss recovery",
      columns: ["Stage", "Responsible authority", "What you need from it"],
      rows: [
        ["Loss or theft", "Local police and/or public-security exit-entry administration", "An incident record and the locally required confirmation of passport loss"],
        ["New national document", "Your country's responsible embassy or consulate in China", "A replacement passport or accepted temporary travel document"],
        ["China-side status", "Public-security exit-entry administration at the competent local level", "Reissued visa, stay or residence document, or another authorised exit document when applicable"],
        ["Departure acceptance", "Carrier first, then border inspection", "A booking that matches the new document and documents sufficient for lawful exit"]
      ]
    },
    {
      id: "first-hour-heading",
      type: "heading",
      level: 2,
      text: "The first hour: preserve evidence and reach the right authority"
    },
    {
      id: "first-hour-list",
      type: "list",
      ordered: true,
      items: [
        "Return only to places where a safe, quick search is realistic: hotel reception, a staffed transport lost-property desk or the venue where you last presented the passport. Do not delay an official report for an open-ended search.",
        "If the passport was stolen, property was taken with it or you face immediate danger, call police on 110. Record the time, place and circumstances without guessing details you cannot confirm.",
        "Tell the hotel or accommodation host. Ask for a copy of your current accommodation registration or other locally accepted proof of where you are staying; the exit-entry authority may request accommodation evidence during a visa application.",
        "Find the official website of your country's embassy or consulate responsible for your present location. Save its emergency and passport-service contacts, but do not send identity scans to an address found in an advertisement or social-media reply.",
        "Call the China Immigration Service Hotline on 12367 when you do not know the correct exit-entry office or local intake order. It is the NIA's immigration-service channel; it does not replace an emergency police call or issue a passport."
      ]
    },
    {
      id: "local-intake-heading",
      type: "heading",
      level: 2,
      text: "Police station or exit-entry office first? Confirm the local intake order"
    },
    {
      id: "local-intake-copy",
      type: "paragraph",
      text: "The national NIA guide says to go immediately to the local public-security exit-entry authority for a passport-loss certificate. Local implementation can add an earlier police-station step. Beijing's official instructions, for example, require an incident report from the local police station before applying for its confirmation of loss; that page explicitly applies only in Beijing. Ask the local exit-entry office or 12367 which office takes the first report where the loss occurred or where you are staying. Do not copy Beijing's address, photo size or same-day service promise into another city."
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "Build one evidence folder before appointments"
    },
    {
      id: "evidence-table",
      type: "table",
      caption: "Useful evidence—final requirements still come from the two authorities",
      columns: ["Evidence group", "Examples to gather", "Why it helps"],
      rows: [
        ["Identity", "Passport photo-page copy, national ID, driving licence, previous-passport details, embassy registration", "Helps the mission verify identity and citizenship; none automatically becomes a travel document"],
        ["China entry and status", "Copy or photo of the Chinese visa, entry stamp, residence or stay permit, arrival record", "Helps the exit-entry authority reconstruct the document that was lost with the passport"],
        ["Loss or theft", "Police incident record, location and time notes, lost-property reference, witness or hotel contact", "Supports the local loss-certificate process and any insurer's later review"],
        ["Current stay and departure", "Accommodation registration, hotel confirmation, flight or rail booking, onward-country requirements", "Explains where you can be reached and whether a departure is time-sensitive"],
        ["Application logistics", "Compliant photos, copies, payment method and translations requested by the authority", "Avoids a preventable second visit; sizes, fees and translation rules vary"]
      ]
    },
    {
      id: "privacy-callout",
      type: "callout",
      title: "Keep evidence usable without creating a second loss",
      body: "Store copies in a protected account or with a trusted person, not in a public link. Redact passport numbers when asking a hotel or airline a general question. Send full identity material only through the official channel that actually needs it, and keep the original police, exit-entry and embassy receipts.",
      tone: "warning"
    },
    {
      id: "loss-certificate-heading",
      type: "heading",
      level: 2,
      text: "Step 1: obtain the locally required passport-loss confirmation"
    },
    {
      id: "loss-certificate-copy",
      type: "paragraph",
      text: "Follow the intake instructions exactly and check the spelling of your name, nationality, date of birth and lost-passport number on every record. Ask what the certificate is called locally, how long it remains valid, whether an appointment is needed and which document you must bring back after the embassy visit. A city-specific service time describes that certificate only; it does not include embassy processing or the later China-side document decision."
    },
    {
      id: "embassy-heading",
      type: "heading",
      level: 2,
      text: "Step 2: obtain a replacement from your own embassy or consulate"
    },
    {
      id: "embassy-list",
      type: "list",
      items: [
        "Use your foreign ministry or mission's official website to identify the post with jurisdiction. A nearby consulate may not provide passport service or may serve different provinces.",
        "Tell the mission whether the passport was lost or stolen, your location, citizenship, departure date, destination and whether a minor is involved. Ask whether you qualify for a full passport, emergency passport or one-way temporary travel document.",
        "Confirm identity evidence, photos, application forms, appointment rules, fees and whether the local loss confirmation must be an original. Requirements and processing time are set by your country, not by Chinese immigration.",
        "Ask where the temporary document is valid. Some emergency documents can have route or destination limits, so a transit country or open-jaw departure may need separate checking.",
        "For a child, confirm who must appear, which parent or guardian consents and what proof of relationship is required. Do not assume the adult applicant's checklist applies unchanged."
      ]
    },
    {
      id: "china-side-heading",
      type: "heading",
      level: 2,
      text: "Step 3: restore the China-side document before travel"
    },
    {
      id: "china-side-copy",
      type: "paragraph",
      text: "The new passport or temporary travel document does not automatically recreate the Chinese visa or residence status printed in the lost passport. NIA instructions require a foreigner with a replacement document to apply to the competent local public-security exit-entry authority for visa renewal or reissuance. For a lost visa, the national instructions list the passport-loss confirmation or an official embassy note together with the new valid travel document. A lost stay permit or residence permit has its own reissuance route. Present the exact facts and let the authority identify the correct product; do not ask a carrier to substitute for this decision."
    },
    {
      id: "status-map",
      type: "comparison",
      title: "The follow-up depends on how you entered and stayed",
      columns: [
        {
          heading: "Visa in the lost passport",
          body: "Ask for visa reissuance with the new valid travel document and the loss confirmation or other officially accepted evidence."
        },
        {
          heading: "Stay or residence permit",
          body: "Ask for the corresponding permit reissuance or information update. NIA states that a residence-permit holder whose passport-number information changes should apply for alteration within 10 days of the change."
        },
        {
          heading: "Visa-free entry or no embassy replacement available",
          body: "Do not invent a visa number or assume visa-free entry removes the recovery step. Ask the exit-entry authority what lawful stay or exit document applies; NIA provides a separate exit-entry-permit route for defined cases where a valid national document cannot be reissued."
        }
      ]
    },
    {
      id: "time-heading",
      type: "heading",
      level: 2,
      text: "How long can it take? Treat it as three separate clocks"
    },
    {
      id: "time-table",
      type: "table",
      caption: "Published time boundaries are not a door-to-door promise",
      columns: ["Clock", "What is known", "Planning consequence"],
      rows: [
        ["Local report and loss confirmation", "Intake and service time vary by city. Beijing publishes same-day completion for its own confirmation, but limits that statement to Beijing.", "Confirm the correct office, opening days and complete material list locally."],
        ["Embassy or consulate document", "Country, document type, identity checks, appointments and holidays control the time.", "Ask the mission directly; neither the NIA nor an airline can promise it."],
        ["China-side visa or stay permit", "NIA publishes a decision within 7 working days after acceptance for a visa or stay permit.", "The clock starts after acceptance, not when the passport disappears."],
        ["China-side residence permit", "NIA publishes a decision within 15 working days after acceptance.", "A departure inside that window needs immediate discussion with the office."],
        ["Urgent request", "NIA says an applicant with justified reasons may request a shorter examination period; convenience is case-specific.", "Bring proof of the departure or emergency, but do not describe acceleration as guaranteed."]
      ]
    },
    {
      id: "close-departure",
      type: "callout",
      title: "If the flight is within 72 hours",
      body: "Contact the local exit-entry authority or 12367 and your embassy now, then call the operating airline. State the exact departure time, route and transit points. Ask each authority what can realistically be issued, and obtain written booking-change terms before cancelling anything. An embassy emergency document alone is not proof that the China-side document chain is complete; an airline's willingness to check you in is not border approval.",
      tone: "warning"
    },
    {
      id: "bookings-heading",
      type: "heading",
      level: 2,
      text: "Repair bookings only after the new document is known"
    },
    {
      id: "bookings-list",
      type: "list",
      items: [
        "Air: contact the operating carrier, not only a reseller. Give the old and new document details through its secure correction channel and ask whether the transit country accepts the temporary document. Keep the written response and do not create a duplicate ticket unless instructed.",
        "Rail: preserve the order number and passenger record. Ask China Railway 12306 or the issuing channel how to handle a ticket attached to the lost document; arrive with the new document and official loss records rather than assuming the gate can infer the change.",
        "Hotel: tell the property that check-in identification has changed and bring the replacement travel document. Ask the current hotel to help preserve accommodation records needed by the authority.",
        "Insurance: notify the insurer through its official assistance channel, ask what police and carrier evidence it needs and follow its deadlines. A report supports a claim but does not guarantee reimbursement.",
        "Keep the old passport number in your private case file. Do not silently overwrite it everywhere: providers may need it to locate the original reservation before recording the new number."
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "When the normal chain breaks"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Escalation routes for common passport-loss failures",
      columns: ["Problem", "Do now", "Do not assume"],
      rows: [
        ["No scan and no passport number", "Ask the embassy which alternative citizenship evidence it accepts; search secure email, visa records, insurer files or a trusted copy holder.", "A hotel photocopy, photo or national ID is automatically enough to travel."],
        ["The responsible mission is in another city", "Confirm jurisdiction, appointment and whether any document can be submitted remotely before moving.", "The nearest consulate can issue the same document."],
        ["Weekend or public-holiday closure", "Use the mission's published emergency contact and 12367 for China-side guidance; secure lawful lodging and flexible transport.", "An emergency line provides routine same-day passport service."],
        ["The original passport is found after reporting", "Tell both the issuing mission and local exit-entry authority before using it.", "A reported-lost document remains valid merely because it is back in your hand."],
        ["Permission to stay is close to expiry", "Show the expiry and all application receipts to the exit-entry authority immediately and follow its lawful-status instructions.", "The loss automatically pauses immigration time limits."],
        ["A minor's passport is lost", "Contact the mission and local authority about appearance, guardianship and consent evidence.", "One travelling adult can complete every step alone."]
      ]
    },
    {
      id: "safety-boundary",
      type: "callout",
      title: "No broker can lawfully skip identity or immigration control",
      body: "Do not buy a false police report, alter a scan, borrow another person's document or pay someone who promises guaranteed border passage. Use official offices and your own mission. If language or mobility is a barrier, ask the authority whether a trusted helper may accompany you; keep control of originals, passwords and payment.",
      tone: "warning"
    },
    {
      id: "departure-heading",
      type: "heading",
      level: 2,
      text: "Final departure check"
    },
    {
      id: "departure-list",
      type: "list",
      items: [
        "New passport or temporary travel document is physically in hand and valid for the actual route.",
        "China-side visa, stay, residence or authorised exit paperwork has been completed or explicitly confirmed by the competent exit-entry authority.",
        "Air or rail passenger details have been handled through the provider's official process, and transit-document rules have been checked where relevant.",
        "Original loss certificate, police record, receipts and copies are together in hand luggage; another protected copy is reachable without the lost passport or phone.",
        "You have allowed extra airport time without treating early arrival as a substitute for missing documents."
      ]
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "What this guide cannot decide",
      body: "Your embassy decides which national travel document it can issue. The local public-security exit-entry authority decides the China-side application, and border inspection decides departure. Procedures can differ by city, nationality, immigration status and age. This guide gives the order and escalation logic; it cannot promise same-day replacement, approval or boarding.",
      tone: "neutral"
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue the recovery",
      items: [
        {
          label: "Passport name across China bookings",
          href: "/guides/passport-name-across-china-bookings/",
          description: "Correct names and new document numbers without creating duplicate passenger identities."
        },
        {
          label: "Final night before an international flight",
          href: "/guides/china-last-night-before-international-flight/",
          description: "Rebuild the last-night document and airport checklist."
        },
        {
          label: "China entry requirements",
          href: "/guides/china-entry-requirements/",
          description: "Understand the ordinary document roles behind the emergency process."
        },
        { label: "Check your passport before China", href: "/guides/china-passport-validity-and-blank-pages/", description: "Separate visa, visa-free, transit and airline rules, inspect your passport, and confirm borderline cases with the authority that owns each decision." },
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {
          label: "Damaged and lost passport: national recovery sequence",
          url: "https://en.nia.gov.cn/n147428/n147498/n147780/n147970/c159250/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Visa, stay and residence document reissuance and decision times",
          url: "https://en.nia.gov.cn/n147423/n147478/n147715/c158215/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-13"
        },
        {
          label: "China Immigration Service Hotline 12367",
          url: "https://en.nia.gov.cn/n147413/c194788/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Proof on loss of a foreign passport in Beijing",
          url: "https://english.beijing.gov.cn/livinginbeijing/lossofpassports/",
          publisher: "Beijing Municipal Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "China emergency numbers and passport-loss reporting",
          url: "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          publisher: "State Council of China / Ministry of Commerce",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
};

export default body;
