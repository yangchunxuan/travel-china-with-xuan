export const UK_VISA_GUIDE_SOURCES = [
  {
    id: "embassy-notice",
    owner: "Chinese Embassy in the UK",
    shortLabel: "UK visa-waiver notice",
    title: "Notice on China’s Visa Waiver Policy for the UK and Canada",
    url: "https://gb.china-embassy.gov.cn/eng/visa/notice/202602/t20260216_11860580.htm",
    note:
      "The UK start date, end date, permitted purposes and 30-day maximum.",
  },
  {
    id: "embassy-faq",
    owner: "Chinese Embassy in the UK",
    shortLabel: "Visa-free entry FAQ",
    title: "FAQs on Visa-free Entry into China",
    url: "https://gb.china-embassy.gov.cn/eng/visa/qzxz/202412/t20241218_11498670.htm",
    note:
      "Passport type, day counting, supporting documents, multiple entries and activities outside the waiver.",
  },
  {
    id: "govuk-entry",
    owner: "GOV.UK",
    shortLabel: "GOV.UK entry rules",
    title: "China entry requirements",
    url: "https://www.gov.uk/foreign-travel-advice/china/entry-requirements",
    note:
      "UK passport guidance, dual-nationality cautions, residence registration and work restrictions.",
  },
  {
    id: "bno-position",
    owner: "Chinese Embassy in the UK",
    shortLabel: "BN(O) passport position",
    title: "China’s position on the British National (Overseas) passport",
    url: "https://gb.china-embassy.gov.cn/eng/xnyfgk/202104/t20210413_9039342.htm",
    note:
      "China’s statement that the BN(O) passport is not recognised as a valid travel or identity document.",
  },
] as const;

export const UK_VISA_AT_A_GLANCE = [
  {
    label: "Who",
    value: "A holder of a valid, ordinary UK passport",
    detail:
      "For a typical UK traveller, the safest confirmed scope is a full “British citizen” passport.",
  },
  {
    label: "Entry window",
    value: "17 February–31 December 2026",
    detail:
      "The published window is stated in Beijing time. No 2027 extension is confirmed on the checked sources.",
  },
  {
    label: "Maximum stay",
    value: "Up to 30 calendar days",
    detail:
      "The count starts on the day after you enter mainland China.",
  },
  {
    label: "Permitted purposes",
    value: "Tourism, business, visits, exchange or transit",
    detail:
      "Work, formal study, journalism and similar activities are outside this waiver.",
  },
] as const;

export const UK_VISA_NEEDED_CASES = [
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
    title: "You are not travelling on an ordinary passport",
    body:
      "Emergency, temporary and other travel documents are not covered by the visa-free rule. BN(O) and other British nationality categories need particular care.",
  },
  {
    number: "04",
    title: "Your mainland entry is planned for 2027",
    body:
      "The current announcement ends on 31 December 2026. Until an official extension appears, treat a 2027 entry as not covered.",
  },
] as const;

export const UK_PASSPORT_CASES = [
  {
    status: "Covered by the published rule",
    tone: "positive",
    title: "Full British citizen passport",
    body:
      "This is the passport type GOV.UK uses for its China entry guidance. It must be an ordinary passport, and your visit must fit one of the permitted purposes.",
  },
  {
    status: "Not visa-free",
    tone: "negative",
    title: "Emergency Travel Document",
    body:
      "The Chinese Embassy FAQ and GOV.UK both say emergency or temporary travel documents do not qualify for visa-free entry.",
  },
  {
    status: "Do not rely on it",
    tone: "negative",
    title: "British National (Overseas) passport",
    body:
      "China states that it does not recognise the BN(O) passport as a valid travel or identity document. Do not use it as the basis for this waiver.",
  },
  {
    status: "Confirm before booking",
    tone: "caution",
    title: "Another British nationality category",
    body:
      "The official UK-facing guidance does not clearly enumerate every British passport category. If your passport does not say “British citizen”, ask the Chinese Embassy how the rule applies to you.",
  },
] as const;

export const UK_VISA_SCENARIOS = [
  {
    trip: "London → Beijing → London, 10 days",
    result: "Likely visa-free",
    explanation:
      "A straightforward tourism trip within the announced dates, assuming a qualifying ordinary passport.",
    tone: "positive",
  },
  {
    trip: "London → Shanghai, 30-day stay",
    result: "Check the exit date carefully",
    explanation:
      "Day one is the day after arrival. Count 30 calendar days rather than assuming “one month”.",
    tone: "caution",
  },
  {
    trip: "Mainland China for 35 days",
    result: "Visa required",
    explanation:
      "A planned stay longer than 30 days falls outside the waiver.",
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

export const UK_VISA_FAQS = [
  {
    question: "Do British citizens need a visa for China in 2026?",
    answer:
      "A holder of a qualifying ordinary UK passport can currently enter mainland China without a visa for up to 30 days for tourism, business, family or friend visits, exchange or transit, from 17 February through 31 December 2026. The border authority still makes the final entry decision.",
  },
  {
    question: "How are the 30 days counted?",
    answer:
      "The count begins on the day after entry and runs for 30 calendar days. If you enter on 1 July, 2 July is day one and 31 July is day 30.",
  },
  {
    question: "Does every type of British passport qualify?",
    answer:
      "No. The rule requires an ordinary passport, while GOV.UK’s guidance is written for a full “British citizen” passport. Emergency or temporary travel documents do not qualify. If your British nationality category is different, confirm it with the Chinese Embassy before booking.",
  },
  {
    question: "Can I use a BN(O) passport for visa-free entry?",
    answer:
      "Do not rely on a BN(O) passport. China states that it does not recognise the BN(O) passport as a valid travel or identity document.",
  },
  {
    question: "Can I visit Hong Kong and then re-enter mainland China?",
    answer:
      "The current Chinese Embassy FAQ permits multiple visa-free entries and states no current interval or total-day cap. However, leaving mainland China ends that stay, and every return is a fresh border examination. Do not treat Hong Kong or Macao as a guaranteed “reset”.",
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
    question: "Do I need the 240-hour visa-free transit policy instead?",
    answer:
      "Usually not if you already qualify for the broader 30-day waiver. The 240-hour transit policy has its own route, port and onward-destination conditions. It is a separate route to entry, not an automatic fallback.",
  },
] as const;
