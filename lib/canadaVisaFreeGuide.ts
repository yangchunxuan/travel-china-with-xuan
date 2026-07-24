export const CANADA_VISA_GUIDE_SOURCES = [
  {
    id: "embassy-notice",
    owner: "Chinese Embassy in Canada",
    shortLabel: "Canada visa-waiver notice",
    title: "Notice on China’s Visa Waiver Policy for the UK and Canada",
    url: "https://ca.china-embassy.gov.cn/eng/zytz_0/202602/t20260216_11860601.htm",
    note:
      "The Canada start date, end date, permitted purposes and 30-day maximum.",
  },
  {
    id: "embassy-faq",
    owner: "Chinese Embassy in Canada",
    shortLabel: "Visa-free entry FAQ",
    title: "FAQs on Visa-free Entry into China",
    url: "https://ca.china-embassy.gov.cn/eng/zytz_0/202602/t20260217_11860807.htm",
    note:
      "Day counting, supporting documents, multiple entries and activities outside the waiver.",
  },
  {
    id: "travel-gc-ca",
    owner: "Government of Canada",
    shortLabel: "Travel advice: China",
    title: "Travel advice and advisories: China",
    url: "https://travel.gc.ca/destinations/china",
    note:
      "Canadian-side guidance on passport validity, proof of onward travel and accommodation registration.",
  },
  {
    id: "hk-macao",
    owner: "Chinese Embassy in Canada",
    shortLabel: "Hong Kong & Macao entry",
    title: "Visa requirements for Hong Kong and Macao",
    url: "https://ca.china-embassy.gov.cn/eng/lsyw/VisaforChina/201706/t20170615_4893357.htm",
    note: "Separate, long-standing entry terms for Canadian passport holders.",
  },
  {
    id: "hainan-list",
    owner: "National Immigration Administration",
    shortLabel: "Hainan 30-day regional list",
    title: "Hainan’s 59-country visa-free policy",
    url: "https://en.nia.gov.cn/n147418/n147463/c180637/content.html",
    note: "Canada is named on Hainan’s separate regional list.",
  },
  {
    id: "transit-240",
    owner: "National Immigration Administration",
    shortLabel: "240-hour transit policy",
    title: "Current 240-hour visa-free transit policy",
    url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
    note: "Canada also qualifies for the separate transit route.",
  },
] as const;

export const CANADA_VISA_AT_A_GLANCE = [
  {
    label: "Who",
    value: "A holder of a valid, ordinary Canadian passport",
    detail:
      "The published rule is written for ordinary passports. Diplomatic, official and emergency travel documents are a separate question.",
  },
  {
    label: "Entry window",
    value: "17 February–31 December 2026",
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

export const CANADA_VISA_NEEDED_CASES = [
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
      "An emergency travel document issued to replace a lost or stolen passport abroad is not an ordinary passport, and is not covered by the visa-free rule.",
  },
  {
    number: "04",
    title: "Your mainland entry is planned for 2027",
    body:
      "The current announcement ends on 31 December 2026. Until an official extension appears, treat a 2027 entry as not covered.",
  },
] as const;

export const CANADA_PASSPORT_CASES = [
  {
    status: "Covered by the published rule",
    tone: "positive",
    title: "Ordinary Canadian passport",
    body:
      "This is the standard case the notice and FAQ are written for. Your visit must still fit one of the permitted purposes and dates.",
  },
  {
    status: "Not visa-free",
    tone: "negative",
    title: "Emergency travel document",
    body:
      "Issued by a Canadian mission abroad when a passport is lost or stolen. It is not an ordinary passport and does not qualify for this waiver.",
  },
  {
    status: "Confirm before booking",
    tone: "caution",
    title: "A passport with an “X” gender marker",
    body:
      "The checked Chinese and Canadian sources do not address this directly, in either direction. Confirm with the Chinese Embassy before relying on the waiver.",
  },
  {
    status: "Confirm before booking",
    tone: "caution",
    title: "Previously held Chinese nationality, or born in China",
    body:
      "China does not recognise dual nationality. If you were born in China, have a Chinese parent, previously held Chinese nationality, or still hold Chinese household registration, get specialist advice before relying on this waiver.",
  },
] as const;

export const CANADA_VISA_SCENARIOS = [
  {
    trip: "Toronto → Beijing → Toronto, 10 days",
    result: "Likely visa-free",
    explanation:
      "A straightforward tourism trip within the announced dates, assuming a qualifying ordinary passport.",
    tone: "positive",
  },
  {
    trip: "Vancouver → Shanghai, 30-day stay",
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

export const CANADA_VISA_FAQS = [
  {
    question: "Do Canadian citizens need a visa for China in 2026?",
    answer:
      "A holder of a qualifying ordinary Canadian passport can currently enter mainland China without a visa for up to 30 days, for tourism, business, family or friend visits, exchange or transit, from 17 February through 31 December 2026. The border authority still makes the final entry decision.",
  },
  {
    question: "How are the 30 days counted?",
    answer:
      "The count begins on the day after entry and runs for 30 calendar days. If you enter on 1 July, 2 July is day one and 31 July is day 30.",
  },
  {
    question: "Does every type of Canadian passport qualify?",
    answer:
      "The rule requires an ordinary passport. Emergency travel documents do not qualify. If your passport carries an “X” gender marker, the checked sources do not address it directly — confirm with the Chinese Embassy before booking.",
  },
  {
    question: "Can I visit Hong Kong or Macao and then re-enter mainland China?",
    answer:
      "Hong Kong and Macao run separate immigration systems. Canadian ordinary passport holders currently get up to 90 days visa-free in Hong Kong and visa-free entry to Macao, under long-standing arrangements of their own — neither is part of the 2026 mainland waiver. Leaving mainland China ends your stay, and coming back is a fresh entry, examined again at the border. Multiple entries are currently permitted with no stated cap, but do not treat a Hong Kong or Macao side trip as a guaranteed reset.",
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
      "Usually not if you already qualify for the 30-day national waiver. Canada is also named on the 240-hour transit list and on Hainan’s separate 59-country regional list, but both are narrower policies with their own ports, permitted areas and onward-ticket conditions — not automatic fallbacks or extensions of the national waiver.",
  },
  {
    question: "What if I have dual nationality or was previously a Chinese national?",
    answer:
      "China does not recognise dual nationality. If you were born in China, have a Chinese parent, previously held Chinese nationality, or still hold Chinese household registration, get specialist advice before relying on this waiver.",
  },
] as const;
