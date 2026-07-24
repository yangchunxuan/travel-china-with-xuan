export const NZ_VISA_GUIDE_SOURCES = [
  {
    id: "embassy-notice",
    owner: "Chinese Embassy in New Zealand",
    shortLabel: "NZ visa-waiver extension notice",
    title: "Notice on Extending the Unilateral Visa-Free Policy for New Zealand",
    url: "https://nz.china-embassy.gov.cn/eng/zxgxs/202511/t20251104_11746508.htm",
    note: "The extension through 31 December 2026, permitted purposes and 30-day maximum.",
  },
  {
    id: "embassy-faq",
    owner: "Chinese Embassy in New Zealand",
    shortLabel: "Visa-free entry FAQ",
    title: "FAQs on Visa-free Entry into China",
    url: "https://nz.china-embassy.gov.cn/eng/lsfw/zytz/202605/t20260522_11915729.htm",
    note: "Day counting, supporting documents, multiple entries and activities outside the waiver.",
  },
  {
    id: "auckland-consulate",
    owner: "Chinese Consulate-General in Auckland",
    shortLabel: "Auckland Consulate visa guide",
    title: "Notice on China’s Visa-Free Policy for New Zealand Passport Holders",
    url: "https://auckland.china-consulate.gov.cn/eng/lsqz/gg/202605/t20260519_11912965.htm",
    note: "The 30 November 2024 start date, official passports, and rules for children of Chinese descent.",
  },
  {
    id: "safetravel",
    owner: "New Zealand SafeTravel",
    shortLabel: "SafeTravel: China",
    title: "China travel advice",
    url: "https://www.safetravel.govt.nz/destinations/china",
    note: "New Zealand government guidance on dual nationality and consular assistance.",
  },
  {
    id: "hk-immigration",
    owner: "Hong Kong Immigration Department",
    shortLabel: "Hong Kong entry rules",
    title: "Visit / Transit visa requirements",
    url: "https://www.immd.gov.hk/eng/services/visas/visit-transit/visit-visa-entry-permit.html",
    note: "New Zealand passport holders get 90 days visa-free in Hong Kong, under a separate system.",
  },
  {
    id: "macao-gov",
    owner: "Government of Macao SAR",
    shortLabel: "Macao entry rules",
    title: "Visa-exempt entry list",
    url: "https://www.gov.mo/en/services/ps-1474/ps-1474b/",
    note: "New Zealand passport holders get 30 days visa-free in Macao, under a separate system.",
  },
] as const;

export const NZ_VISA_AT_A_GLANCE = [
  {
    label: "Who",
    value: "A holder of a valid, ordinary New Zealand passport",
    detail:
      "The published rule is written for ordinary passports. Official passports are a separate question.",
  },
  {
    label: "Entry window",
    value: "30 Nov 2024–31 Dec 2026",
    detail: "The published window is stated in Beijing time.",
  },
  {
    label: "Maximum stay",
    value: "Up to 30 calendar days",
    detail: "The count starts on the day after you enter mainland China.",
  },
  {
    label: "Permitted purposes",
    value: "Tourism, business, visits, exchange or transit",
    detail:
      "Work, formal study, journalism and similar activities are outside this waiver.",
  },
] as const;

export const NZ_VISA_NEEDED_CASES = [
  {
    number: "01",
    title: "You plan to stay longer than 30 days",
    body:
      "Apply for the visa that matches your purpose before travel. Do not plan around obtaining an extension after arrival.",
  },
  {
    number: "02",
    title: "You will work, study formally or report as a journalist",
    body:
      "Those purposes are not covered. Paid teaching and long-term assignments also require the correct visa and, where applicable, a work permit.",
  },
  {
    number: "03",
    title: "You hold an official passport, or a temporary or emergency document",
    body:
      "The Chinese Consulate-General in Auckland states that official-passport holders still need a visa. Temporary and emergency travel documents are not eligible for this waiver either.",
  },
  {
    number: "04",
    title: "Your mainland entry is planned for 2027",
    body:
      "The current announcement ends on 31 December 2026. Until an official extension appears, treat a 2027 entry as not covered.",
  },
] as const;

export const NZ_PASSPORT_CASES = [
  {
    status: "Covered by the published rule",
    tone: "positive",
    title: "Ordinary New Zealand passport",
    body:
      "This is the standard case the notice and FAQ are written for. Your visit must still fit one of the permitted purposes and dates.",
  },
  {
    status: "Not visa-free",
    tone: "negative",
    title: "Official passport",
    body:
      "The Auckland Consulate is explicit: official-passport holders still need a Chinese visa before entry under the current arrangement.",
  },
  {
    status: "Not visa-free",
    tone: "negative",
    title: "Temporary or emergency travel document",
    body:
      "The FAQ says holders of these documents are not permitted to enter China without a visa, though someone already admitted may use one to exit if their passport was lost.",
  },
  {
    status: "Confirm before booking",
    tone: "caution",
    title: "A New Zealand permanent resident card",
    body:
      "A PR card is not a New Zealand passport. Eligibility follows the nationality and passport you actually present at the border, not New Zealand residence.",
  },
] as const;

export const NZ_VISA_SCENARIOS = [
  {
    trip: "Auckland → Beijing → Auckland, 10 days",
    result: "Likely visa-free",
    explanation:
      "A straightforward tourism trip within the announced dates, assuming a qualifying ordinary passport.",
    tone: "positive",
  },
  {
    trip: "Wellington → Shanghai, 30-day stay",
    result: "Check the exit date carefully",
    explanation:
      "Day one is the day after arrival. Count 30 calendar days rather than assuming “one month”.",
    tone: "caution",
  },
  {
    trip: "Mainland China for 35 days",
    result: "Visa required",
    explanation: "A planned stay longer than 30 days falls outside the waiver.",
    tone: "negative",
  },
  {
    trip: "Beijing → Hong Kong → Shanghai",
    result: "A new mainland entry",
    explanation:
      "Leaving mainland China ends the first stay. The return is assessed as a fresh entry, even though multiple visa-free entries are currently permitted.",
    tone: "caution",
  },
  {
    trip: "Paid teaching or a work assignment",
    result: "Visa-free entry is not appropriate",
    explanation:
      "Work is outside the permitted purposes, even when the trip lasts fewer than 30 days.",
    tone: "negative",
  },
  {
    trip: "Arrival in January 2027",
    result: "Not covered by the current announcement",
    explanation:
      "Wait for an official extension or arrange the correct visa. A 31 December entry that continues into January is an edge case to confirm directly.",
    tone: "negative",
  },
] as const;

export const NZ_VISA_FAQS = [
  {
    question: "Do New Zealand citizens need a visa for China in 2026?",
    answer:
      "A holder of a qualifying ordinary New Zealand passport can currently enter mainland China without a visa for up to 30 days, for tourism, business, family or friend visits, exchange or transit, from 30 November 2024 through 31 December 2026. The border authority still makes the final entry decision.",
  },
  {
    question: "How are the 30 days counted?",
    answer:
      "The count begins on the day after entry and runs for 30 calendar days. If you enter on 1 July, 2 July is day one and 31 July is day 30.",
  },
  {
    question: "Does a New Zealand permanent resident card qualify?",
    answer:
      "No. A PR card alone does not create eligibility. The rule follows the nationality and the ordinary passport you present at the border.",
  },
  {
    question: "Can I visit Hong Kong or Macao and then re-enter mainland China?",
    answer:
      "Hong Kong and Macao run separate immigration systems. New Zealand ordinary passport holders currently get up to 90 days visa-free in Hong Kong and up to 30 days visa-free in Macao, under long-standing arrangements of their own — neither is part of the mainland waiver. Leaving mainland China ends your stay, and coming back is a fresh entry, examined again at the border. Multiple entries are currently permitted with no stated cap, but do not treat a Hong Kong or Macao side trip as a guaranteed reset.",
  },
  {
    question: "Can I work or study in China under the 30-day waiver?",
    answer:
      "Not for work, formal study, journalism or similar purposes. Apply for the visa and any additional permit that matches the activity.",
  },
  {
    question: "Does the waiver cover travel in 2027?",
    answer:
      "Not under the current published window, which ends on 31 December 2026. Check the Chinese Embassy again before a 2027 trip rather than assuming the policy will continue.",
  },
  {
    question:
      "Do I need the 240-hour transit policy or Hainan’s regional waiver instead?",
    answer:
      "Usually not if you already qualify for the 30-day national waiver. New Zealand is also named on the 240-hour transit list and on Hainan’s separate 59-country regional list, but both are narrower policies with their own ports, permitted areas and onward-ticket conditions — not automatic fallbacks or extensions of the national waiver.",
  },
  {
    question:
      "What about a New Zealand-born child with Chinese parents?",
    answer:
      "This depends on the child’s and parents' citizenship facts at birth, and the Chinese Consulate-General in Auckland sets out several distinct scenarios. Some children are treated as Chinese citizens by birth, others qualify for a Chinese Travel Document, and others need an ordinary Chinese visa. This is a case-by-case nationality question for the Chinese Embassy or Consulate, not something a travel guide can resolve generically.",
  },
] as const;
