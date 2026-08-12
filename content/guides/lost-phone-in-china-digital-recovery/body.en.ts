import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "Preserve the options that disappear fastest. From a trusted device, mark the phone lost or secure it; record its location and identifiers; protect the mobile number and the primary Apple or Google account; then secure cards, payment wallets and travel bookings. Escalate faster if the phone was unlocked, someone saw the passcode or the map shows theft. Remote erasure is a later risk decision, not an automatic first tap."
    },
    {
      id: "risk-map",
      type: "table",
      caption: "Choose the first move by exposure, not by panic",
      columns: ["What happened", "First priority", "Why"],
      rows: [
        ["Locked phone probably nearby", "Play a sound, check the last place and mark it lost", "You may recover it without destroying tracking or account access"],
        ["Locked phone is moving or at an unknown address", "Mark it lost, save the map evidence and contact police", "Do not turn a device loss into a confrontation"],
        ["Phone was unlocked or passcode may be known", "Lock it, then secure the primary account, line and payments immediately", "Email, password resets and one-time codes may be exposed"],
        ["Phone is offline or Find My / Find Hub was not enabled", "Protect accounts, SIM and payments; use official recovery channels", "Repeated map refreshes cannot create a setting that was not active"],
        ["Departure is today", "Contain the security risk, then build a minimum offline travel pack", "You need safe identity, money and booking access even if the phone is not recovered"]
      ]
    },
    {
      id: "first-ten-heading",
      type: "heading",
      level: 2,
      text: "The first ten minutes"
    },
    {
      id: "first-ten-list",
      type: "list",
      ordered: true,
      items: [
        "Move to a safe staffed place and borrow only a trusted device or computer. Use a private or guest browser session, type the official Apple or Google address yourself and sign out when finished.",
        "Call the number once if a safe return is plausible. Then use Apple Find My at iCloud.com/find or Google's Find Hub to view the available location, play a sound and mark or secure the device. Save a screenshot with the time; location is an estimate, not proof of who has it.",
        "Write down the model, colour, case, last known place and time, serial number or IMEI if available. Google says an Android IMEI can be viewed in Find Hub; Apple says police may ask for the device serial number.",
        "If there is theft, coercion or personal danger, call police on 110. Do not follow a moving map pin, enter a private address or arrange a solo exchange.",
        "Tell one trusted companion or the hotel how to reach you. Do not put a room number, passport number, full name plus birth date, or a payment offer on the lost-screen message."
      ]
    },
    {
      id: "theft-heading",
      type: "heading",
      level: 2,
      text: "Separate a misplaced phone from a stolen one"
    },
    {
      id: "theft-copy",
      type: "paragraph",
      text: "For a phone left in a taxi, train, hotel or attraction, use that operator's official lost-property route and preserve the trip receipt or booking. For theft or another property crime, China's official visitor guidance says to call 110; give the exact event location and facts. A police report can preserve a record for an insurer or carrier, but police, the venue, the platform company and the insurer control different parts of the case. None should be described as guaranteeing recovery or reimbursement."
    },
    {
      id: "platform-heading",
      type: "heading",
      level: 2,
      text: "Lock and locate: the Apple and Android paths are not identical"
    },
    {
      id: "apple-copy",
      type: "paragraph",
      text: "For an iPhone or iPad, go directly to iCloud.com/find or Find My and choose Mark as Lost. Apple's current guidance says iCloud.com/find does not require the verification code normally sent to the missing trusted device. Lost Mode locks the device with its passcode. If the device was stolen, Apple advises against displaying your contact details because they can support social engineering. Never remove the device from Find My: doing so removes Activation Lock and makes resale easier. If Find My was not enabled before the loss, the device cannot be marked lost or remotely erased through Find My; change the Apple Account password and secure the account instead."
    },
    {
      id: "android-copy",
      type: "paragraph",
      text: "For Android, use Google's official Find Hub app or web service. Available actions depend on the device having power, a data or Wi-Fi connection, the relevant Google Account, Find Hub enabled and visibility in Google Play. Mark as lost locks the device and can display safe contact information. A current location may be unavailable while a recent location is still shown, and all map positions have uncertainty. A friend's Android can use Find Hub guest sign-in; the owner—not the helper—should enter the credentials."
    },
    {
      id: "erase-table",
      type: "table",
      caption: "Remote erase is a platform-specific last-resort decision",
      columns: ["Platform", "What official guidance says", "Decision rule"],
      rows: [
        ["Apple", "Erasure cannot be undone. On iOS 15 or later, Find My may still locate the device after erasure; if offline, the erase begins when it next comes online. Keep it in Find My so Activation Lock remains.", "Try Lost Mode and safe recovery first. Erase when the data risk outweighs the remaining recovery value."],
        ["Android", "Factory reset permanently deletes device data, may not erase an SD card, and the device location is no longer available in Find Hub after erasure. The Google Account password is needed to use a recovered erased device again.", "Do not erase while useful tracking and a safe return remain realistic. Erase when recovery is unlikely and exposure is greater."],
        ["Either", "A remote command may wait for connectivity and cannot compensate for Find services that were never enabled.", "Take account, SIM and payment action in parallel; do not wait indefinitely for a map update."]
      ]
    },
    {
      id: "account-heading",
      type: "heading",
      level: 2,
      text: "Protect the account that can reset all the others"
    },
    {
      id: "account-order",
      type: "list",
      ordered: true,
      items: [
        "First secure the primary email and Apple or Google account from a trusted device. Review recent security events, account-recovery phone numbers, email addresses, trusted devices, passkeys and forwarding rules.",
        "If the phone was unlocked, the passcode was observed or account settings have changed, change the primary password immediately and sign out or revoke access as the platform directs. Replace any reused password on critical accounts.",
        "Remove a passkey tied to the lost device if another authorised method lets you enter the account. Revoke backup codes only if they were stored on or with the missing phone; generate a new set after access is safe.",
        "Do not remove a stolen Apple device from Find My. Device removal, account sign-out and Activation Lock are not the same action; follow Apple's exact screen wording.",
        "Record each change and time. Rapidly changing every password without preserving one working recovery path can lock the traveller out before the thief is locked out."
      ]
    },
    {
      id: "account-risk",
      type: "comparison",
      title: "How fast should you change the main password?",
      columns: [
        {
          heading: "Locked, passcode not exposed",
          body: "Mark or secure the device first, preserve tracking, then review the account and change credentials when official guidance or suspicious activity makes it necessary."
        },
        {
          heading: "Unlocked or passcode exposed",
          body: "Treat email, saved passwords, payment apps and one-time codes as exposed. Lock the device, then change the primary credentials, review security events and contact the line provider without delay."
        },
        {
          heading: "Find service was off",
          body: "There is no remote lock through that service. Apple specifically directs users to change the Apple Account password when Find My was not enabled; Android users should use Google account security and carrier controls."
        }
      ]
    },
    {
      id: "twofactor-heading",
      type: "heading",
      level: 2,
      text: "When two-factor authentication is trapped on the lost phone"
    },
    {
      id: "twofactor-table",
      type: "table",
      caption: "Use an existing trusted path before starting slow account recovery",
      columns: ["Account", "Try first", "If none works"],
      rows: [
        ["Apple Account", "Another signed-in trusted Apple device, the Apple Support app on a family member's device, or a previously configured recovery contact", "Start official account recovery at iforgot.apple.com. Apple says it may take several days or longer and Support cannot shorten the waiting period."],
        ["Google Account", "Another signed-in phone, another registered number, a saved backup code, hardware security key, passkey or trusted computer", "Use Google's official account recovery. Its 2-Step Verification help says ownership review can take 3–5 business days in the described no-backup situation."],
        ["Work or school account", "A second approved factor or an organisation-managed device", "Contact the organisation's administrator; consumer recovery instructions may not control the account."],
        ["Any booking or wallet account", "Use the service's own official recovery option after the primary email and number are protected", "Do not let a stranger receive a code or create a second identity that abandons the original reservations and transaction history."]
      ]
    },
    {
      id: "sim-heading",
      type: "heading",
      level: 2,
      text: "Protect the phone number without throwing it away"
    },
    {
      id: "sim-table",
      type: "table",
      caption: "Line recovery depends on who issued it",
      columns: ["Line type", "Ask the provider", "Important boundary"],
      rows: [
        ["Mainland China physical SIM", "Suspend the missing SIM and ask whether the same number can be reissued at an authorised service hall; take the identity document used for registration.", "Store location, identity checks, fees and reissue eligibility are provider-specific."],
        ["Mainland China eSIM or supported travel device", "Ask whether the profile can be disabled and reissued to the replacement device.", "Do not assume an old QR code can be scanned twice or that every device and plan supports transfer."],
        ["Foreign home SIM on roaming", "Use the home carrier's official account or international support to suspend the old SIM and preserve or replace the number.", "Time zone, identity verification and delivery can make same-day replacement impossible."],
        ["Travel eSIM", "Sign in to the provider from a trusted device and ask about device transfer or a replacement plan.", "It may restore data but not the SMS number used by banks or bookings."]
      ]
    },
    {
      id: "payment-heading",
      type: "heading",
      level: 2,
      text: "Secure cards and mobile wallets in a controlled order"
    },
    {
      id: "payment-list",
      type: "list",
      ordered: true,
      items: [
        "Review recent bank, card, Alipay and Weixin Pay activity from official apps or websites on a trusted device. Take evidence of unfamiliar transactions before changing the view.",
        "Freeze or report the underlying cards according to the issuer's risk process. A wallet lock and a card freeze are separate controls; ask both providers when exposure is plausible.",
        "Use only help links inside the official service or a phone number printed on the physical card. Search advertisements and messages claiming the phone was found are common routes to steal passwords and verification codes.",
        "Do not let hotel staff, a driver or a helpful stranger complete face verification, enter a payment password or receive an SMS code. They may translate the screen while you retain control.",
        "Preserve a small lawful backup you already control—physical card, cash and a companion's direct payment—without transferring money to an unknown finder or 'account recovery' agent."
      ]
    },
    {
      id: "travel-heading",
      type: "heading",
      level: 2,
      text: "Build a minimum travel stack before rebuilding the whole phone"
    },
    {
      id: "travel-table",
      type: "table",
      caption: "What must work for the next 24 hours",
      columns: ["Need", "Minimum recovery", "Test it now"],
      rows: [
        ["Identity", "Keep the physical passport and any required permit with you, separate from the replacement phone.", "Confirm the documents and passenger name, not just a screenshot."],
        ["Communication", "One working number or messaging route plus the hotel address written in Chinese and English.", "Place an outgoing call or message and receive a reply."],
        ["Money", "One payment method not dependent on the lost device plus issuer emergency contacts.", "Make a small legitimate transaction or confirm the card is usable."],
        ["Transport", "Flight or rail order number, departure terminal or exact station, time and provider support route.", "Ask the official channel to retrieve the booking if the app is unavailable."],
        ["Accommodation", "Hotel name, Chinese address, dates and reservation number on paper or a protected file.", "Contact the property and give it the temporary safe number."],
        ["Account recovery", "Access to primary email plus at least one factor that is not the lost phone.", "Sign in once from the trusted device, then sign out if it is borrowed."]
      ]
    },
    {
      id: "bookings-heading",
      type: "heading",
      level: 2,
      text: "Recover travel bookings without creating duplicate identities"
    },
    {
      id: "bookings-list",
      type: "list",
      items: [
        "Search the primary email for airline, China Railway 12306, hotel and insurer confirmations. Save booking references and provider contacts, but do not forward a complete mailbox to a borrowed device.",
        "Ask the operating airline or official rail channel to retrieve the existing booking using its normal identity checks. Losing app access does not itself mean the reservation disappeared.",
        "Tell the hotel the old phone is unavailable, replace the contact number and ask staff not to disclose a room number or guest details to anyone claiming to have found the device.",
        "Restore only the apps needed for the next movement, lodging and payment. A clean spare phone with a few verified accounts is safer than hurriedly importing unknown configuration or sideloaded 'China travel' packages.",
        "If departure is imminent, print or write the itinerary and carry the operating carrier's instructions. Offline evidence helps at a support desk but does not replace the identity document required for travel."
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "When the obvious recovery route fails"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Fallbacks for common lost-phone dead ends",
      columns: ["Failure", "Safe fallback", "Do not do"],
      rows: [
        ["Find service shows offline", "Leave the appropriate lost or erase command pending, save the last-seen evidence and continue with account, line and payment containment.", "Wait for hours while exposed accounts remain open."],
        ["Find service was never enabled", "Change the primary credentials, review signed-in devices, suspend the line and contact police if stolen.", "Pay a website that claims it can activate tracking retroactively."],
        ["No password or second factor", "Use official recovery from a familiar device and location if possible; prepare for the published waiting period.", "Send identity scans or codes to an unofficial 'support agent'."],
        ["Carrier cannot replace the number in China", "Keep the old line suspended, add a safe temporary contact to bookings through official support and use a separate data connection.", "Permanently cancel the number before checking every account that depends on it."],
        ["Flight or train leaves tonight", "Secure the highest-risk accounts, carry passport and offline booking details, arrive early and use the provider's staffed support route.", "Spend the whole remaining window rebuilding non-essential apps."],
        ["Phone is recovered", "Verify the device, security events, SIM status and wallet transactions before ending Lost Mode; change exposed credentials and follow platform steps after an erase.", "Assume the phone is safe because the case and screen look unchanged."]
      ]
    },
    {
      id: "scam-callout",
      type: "callout",
      title: "A 'we found your phone' message can be the second attack",
      body: "Apple states that it will never contact you to say a stolen iPhone was found. Do not open a link, share a device passcode, password, backup code or SMS code, or remove a device from Find My because a caller asks. Verify any return through the police or the official lost-property desk. Do not pay a ransom or attend a private handover alone.",
      tone: "warning"
    },
    {
      id: "borrowed-device-heading",
      type: "heading",
      level: 2,
      text: "Use a borrowed or public device as if someone else will inspect it"
    },
    {
      id: "borrowed-device-copy",
      type: "paragraph",
      text: "Prefer a trusted companion's updated device. Use guest mode where the official service offers it, open a private browser, reject password saving and sign out of every account. Delete downloaded boarding passes and identity files, close the private session and ask the owner to verify that no download remains. Avoid installing remote-control software, unknown profiles, unofficial app stores or certificates offered as a quick fix."
    },
    {
      id: "after-heading",
      type: "heading",
      level: 2,
      text: "After the immediate trip is stable"
    },
    {
      id: "after-list",
      type: "list",
      items: [
        "Complete the insurer's evidence request within its own deadline and keep the police, carrier, purchase and device-identifier records.",
        "Review security events, recovery methods, forwarding rules, trusted devices, wallet transactions and card statements again after 24–48 hours.",
        "Restore a replacement phone only from a known backup, update it and test transport, accommodation, payment and communications before the next transfer.",
        "Create offline backup codes and store them separately from the phone; add a second trusted recovery route and keep device identifiers in a protected record.",
        "If personal data or money was misused, continue through the relevant bank, platform and police case channels rather than trying to retaliate against the suspected holder."
      ]
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "Scope and live-rule boundary",
      body: "Location, Lost Mode and erase depend on platform, version, prior settings, power and connectivity. Apple, Google, carriers, banks, wallets, police, travel providers and insurers each control only their part. This guide provides a safe recovery order; it cannot track a device, guarantee a line replacement, shorten account-recovery review, reverse an erase or promise reimbursement.",
      tone: "neutral"
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue the recovery",
      items: [
        {
          label: "China eSIM or local SIM",
          href: "/guides/china-esim-vs-local-sim/",
          description: "Choose a temporary connection without confusing data access with number recovery."
        },
        {
          label: "Paying in China as a tourist",
          href: "/guides/how-to-pay-in-china-as-a-tourist/",
          description: "Rebuild a payment stack with independent backups."
        },
        {
          label: "Passport name across China bookings",
          href: "/guides/passport-name-across-china-bookings/",
          description: "Retrieve transport records without creating a second passenger identity."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {
          label: "If your iPhone or iPad has been stolen",
          url: "https://support.apple.com/en-us/120837",
          publisher: "Apple Support",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Apple Account recovery and waiting period",
          url: "https://support.apple.com/en-us/118574",
          publisher: "Apple Support",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Find, secure or erase a lost Android device",
          url: "https://support.google.com/android/answer/6160491?hl=en",
          publisher: "Google Support",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Fix common issues with 2-Step Verification",
          url: "https://support.google.com/accounts/answer/185834?hl=en",
          publisher: "Google Account Help",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Secure a hacked or compromised Google Account",
          url: "https://support.google.com/accounts/answer/6294825?hl=en",
          publisher: "Google Account Help",
          reviewedAt: "2026-08-13"
        },
        {
          label: "China emergency numbers and property-crime reporting",
          url: "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          publisher: "State Council of China / Ministry of Commerce",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
};

export default body;
