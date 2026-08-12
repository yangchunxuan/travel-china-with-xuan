import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Work in an order that preserves options: locate and lock the device, protect the phone number and primary account, secure payment methods, then rebuild travel access. Remote erasure can protect data but may end tracking or make recovery harder, so do not make it the automatic first tap."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "First action by risk",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "Phone may be nearby",
          "Play sound or view location from a trusted device",
          "Do not confront a suspected thief."
        ],
        [
          "Phone is unsecured or moving",
          "Mark lost / secure device immediately",
          "Add a safe callback message without exposing hotel room or passport data."
        ],
        [
          "Theft or personal danger",
          "Call 110 and make a police report",
          "Give device identifiers and evidence; do not pursue."
        ],
        [
          "Recovery looks unlikely",
          "Block SIM, secure accounts, consider erase",
          "Understand that erase can stop tracking depending on platform and state."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "Protect the recovery keys"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "Use Apple's Find My or Google's Find Hub from a trusted device and official domain. A message claiming your phone was found can be phishing designed to steal the account password.",
        "Change the primary account password if compromise is possible, but follow platform guidance so the lost device stays associated with your account and activation protection.",
        "Call the mobile carrier to suspend the SIM or eSIM. Keep the number if possible because banks, wallets and bookings may depend on it; ask about a replacement line rather than permanent cancellation.",
        "Contact card issuers and payment-app support through official channels. Freeze or monitor cards according to risk, and review recent transactions.",
        "Write down essential flight, train, hotel and insurance details from email, printed copies or a companion's device."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "Rebuild a minimum travel phone"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "On a trusted spare device, restore only the accounts needed for transport, accommodation and communication.",
        "Use saved backup codes or a hardware key; never ask a stranger to receive your security code.",
        "Reissue the mobile line through the carrier if feasible, then retest SMS and account recovery.",
        "Tell the hotel and transport providers the safe contact number has changed.",
        "Keep the police report, serial/IMEI, proof of purchase and insurer instructions together."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If two-factor authentication is on the lost phone",
      "body": "Use the provider's official account-recovery flow, backup codes, trusted device or hardware key. Do not create a new identity that disconnects purchases and bookings unless support directs it. Ask a trusted companion or hotel to provide internet access, not to take over the account.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "Remote location and erase results depend on power, connectivity, prior settings and platform. Apple and Google do not promise a live location in every case. Local police investigate theft; platform vendors and carriers control accounts and lines. This guide cannot track a device or reverse an erase.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "China eSIM or local SIM",
          "href": "/guides/china-esim-vs-local-sim/",
          "description": "Choose a replacement connection route."
        },
        {
          "label": "Paying in China",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "Restore payment access with backups."
        },
        {
          "label": "Passport name across bookings",
          "href": "/guides/passport-name-across-china-bookings/",
          "description": "Rebuild transport records accurately."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Find, secure or erase a lost Android device",
          "url": "https://support.google.com/android/answer/6160491?hl=en",
          "publisher": "Google Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Prepare Android for a lost device",
          "url": "https://support.google.com/android/answer/3265955?hl=en-en",
          "publisher": "Google Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "If your iPhone or iPad is lost or stolen",
          "url": "https://support.apple.com/en-us/101593",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Stolen device protection and account safety",
          "url": "https://support.apple.com/en-la/120837",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China emergency numbers",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
