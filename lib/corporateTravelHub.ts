// @ts-ignore TS5097: tests load the content directly using Node type stripping.
import { corporateHubJa } from "./corporateTravelHub.ja.ts";
// @ts-ignore TS5097: tests load the content directly using Node type stripping.
import { corporateHubEs } from "./corporateTravelHub.es.ts";
// @ts-ignore TS5097: tests load the content directly using Node type stripping.
import { corporateHubFr } from "./corporateTravelHub.fr.ts";
// @ts-ignore TS5097: tests load the content directly using Node type stripping.
import { corporateHubDe } from "./corporateTravelHub.de.ts";
// @ts-ignore TS5097: tests load the content directly using Node type stripping.
import { corporateHubAr } from "./corporateTravelHub.ar.ts";
import type { CorporateFaq, CorporateLocale } from "./corporateTravelTypes";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateHubZh } from "./corporateTravelHub.zh.ts";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateHubKo } from "./corporateTravelHub.ko.ts";

export type CorporatePurposeId = "company-trips" | "incentive-travel" | "meetings-retreats";

/** Every word on the company hub and the shared labels of the two programme pages. */
export interface CorporateHubCopy {
  locale: CorporateLocale;
  htmlLang: string;
  ogLocale: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  primaryCta: string;
  whatsappCta: string;
  whatsappMessage: string;
  facts: { label: string; value: string }[];
  why: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  purposes: { eyebrow: string; title: string; intro: string; items: { id: CorporatePurposeId; title: string; body: string; fit: string }[] };
  samples: { eyebrow: string; title: string; intro: string; cardCta: string };
  more: { eyebrow: string; title: string; intro: string; items: { name: string; body: string; slug: string }[] };
  proposal: {
    eyebrow: string; title: string; intro: string;
    arrangedTitle: string; arranged: string[];
    documentsTitle: string; documents: string[];
    paymentTitle: string; payment: string;
    contract: string; businessLink: string;
  };
  steps: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  faqEyebrow: string;
  faqTitle: string;
  faqs: CorporateFaq[];
  ui: {
    skipLink: string; home: string; breadcrumb: string;
    photoCredits: string; photoCreditsNote: string;
    planCta: string; backLink: string;
    facts: { duration: string; group: string; base: string; format: string };
    storyEyebrow: string;
    itineraryEyebrow: string; itineraryTitle: string; itineraryIntro: string; jumpToDay: string; day: string;
    stayEyebrow: string;
    scopeEyebrow: string; scopeTitle: string; scopeIntro: string; included: string; options: string; excluded: string;
    notesEyebrow: string; notesTitle: string;
    tripFaqTitle: string; relatedEyebrow: string;
  };
}

export const corporateHubEn: CorporateHubCopy = {
  locale: "en",
  htmlLang: "en",
  ogLocale: "en_US",
  seoTitle: "Company Trips & Team Retreats in China",
  description: "Company trips, incentive travel and small team meetings in China, planned and run by a licensed China travel agency. Day-by-day Zhangjiajie and Shanghai–Suzhou programmes for 10–30 people.",
  eyebrow: "Staff trips · Incentive travel · Small meetings",
  h1: "Company Trips & Team Retreats in China",
  lede: "Planned and run in China by a licensed travel agency. One team arranges your hotels, coaches, guides, meals and meeting room, and one written quote shows every cost.",
  primaryCta: "Send us your team’s brief",
  whatsappCta: "Or message us on WhatsApp",
  whatsappMessage: "Hi Homeground, we’re planning a company trip to China and would like to talk it through.",
  facts: [
    { label: "Group size", value: "About 10 to 30 people" },
    { label: "Length", value: "Usually 4 to 6 days" },
    { label: "Where", value: "Beijing, Shanghai, Xi’an, Zhangjiajie and more" },
    { label: "Licensed in China", value: "Travel agency licence L-BJ10587" },
  ],
  why: {
    eyebrow: "Why companies plan with us",
    title: "Plan with the people who run it.",
    items: [
      { title: "Deal directly with the agency in China", body: "Your hotels, coaches and guides are booked by our licensed agency in China. There is no chain of resellers between your organiser and the people running the trip." },
      { title: "One planner, from brief to the last transfer", body: "The person who writes your proposal is the one on WhatsApp while your team travels, with a local guide on every touring day." },
      { title: "Every cost on one page", body: "Rooms, meals, tickets, transfers and options are itemised in one written quote your finance team can approve. No shopping stops." },
    ],
  },
  purposes: {
    eyebrow: "What the trip is for",
    title: "Three kinds of company trip.",
    intro: "Start with the reason for the trip. The route, the hotels and the pace follow from it.",
    items: [
      { id: "company-trips", title: "Company trips & team building", body: "Time away from the routine: shared meals, places everyone talks about afterwards, and a pace that leaves room to get to know each other.", fit: "Annual staff trips, team outings, colleagues from different offices meeting up." },
      { id: "incentive-travel", title: "Incentive travel", body: "A reward your best people will remember: a better hotel, a dinner in a private room, an evening to hand out the awards.", fit: "Sales incentives, employee recognition, dealer and partner rewards." },
      { id: "meetings-retreats", title: "Small meetings & retreats", body: "Your own working sessions in a meeting room we arrange, with a few days of travel around them.", fit: "Leadership offsites, department planning, annual reviews." },
    ],
  },
  samples: {
    eyebrow: "Two programmes to start from",
    title: "Four days, planned day by day.",
    intro: "Use either as the starting point. We adapt the route, hotels and pace to your team.",
    cardCta: "See the day-by-day plan",
  },
  more: {
    eyebrow: "Other places teams go",
    title: "Or choose another city.",
    intro: "Each of our private tours can run as a company programme, with rooms, coaches and meals planned for your numbers.",
    items: [
      { name: "Xi’an", body: "The Terracotta Warriors and a bike ride on the city wall.", slug: "xian-terracotta-warriors-5-day-private-tour" },
      { name: "Beijing", body: "The Great Wall and the Forbidden City for a first trip together.", slug: "beijing-highlights-5-day-private-tour" },
      { name: "Guilin & Yangshuo", body: "The Li River and slow days in the countryside.", slug: "guilin-yangshuo-5-day-private-tour" },
      { name: "Chengdu", body: "Pandas, Sichuan food and an easy city pace.", slug: "chengdu-pandas-sanxingdui-5-day-private-tour" },
      { name: "Harbin", body: "Ice and snow festivals from December to February.", slug: "harbin-winter-5-day-private-tour" },
      { name: "Yunnan", body: "Kunming, Dali and Lijiang: old towns and mountain air.", slug: "kunming-dali-lijiang-8-day-private-tour" },
    ],
  },
  proposal: {
    eyebrow: "For the organiser and the finance team",
    title: "A proposal you can take to the boss.",
    intro: "Everything the trip needs is in one plan, with one company responsible for it.",
    arrangedTitle: "We arrange",
    arranged: [
      "Hotels, with a rooming plan for single, twin or mixed rooms",
      "Coaches sized for your group and its luggage",
      "A local guide on every touring day",
      "Group meals, with halal, vegetarian and allergy needs checked",
      "A meeting room, equipment and tea breaks when you need them",
      "A welcome dinner or an awards evening",
      "Airport and station pickups for every arrival",
      "Attraction tickets and reservations",
    ],
    documentsTitle: "You receive",
    documents: [
      "An itemised written quotation",
      "A booking confirmation naming the contracting company",
      "A receipt for every payment",
      "A final schedule with times, rooming and phone numbers",
    ],
    paymentTitle: "Payment",
    payment: "Pay by bank transfer, card payment link or Alipay. A deposit confirms the hotels and coaches; the balance is due on arrival.",
    contract: "You contract with Shengshi Meida (Beijing) International Travel Agency Co., Ltd., licence L-BJ10587. Homeground China is its brand for overseas guests.",
    businessLink: "Business registration and licences",
  },
  steps: {
    eyebrow: "How it works",
    title: "From brief to departure.",
    items: [
      { title: "Send your brief", body: "Team size, month, purpose and budget. Dates can still be open." },
      { title: "Get a proposal", body: "A day-by-day plan with hotels and an itemised total." },
      { title: "Confirm", body: "Approve the quote, pay the deposit and send the rooming list." },
      { title: "Travel", body: "We send the final schedule and stay in touch throughout the trip." },
    ],
  },
  faqEyebrow: "Questions organisers ask",
  faqTitle: "Before you bring the team.",
  faqs: [
    { question: "How much does a company trip to China cost?", answer: "It depends on the dates, group size, hotel standard, single or shared rooms, meals and any meeting or dinner. Send us your numbers and we quote the actual programme, itemised, with each option priced separately." },
    { question: "How many people can you take?", answer: "Our sample programmes are planned for about 10 to 30 people. For a larger group, tell us the number and we plan the coaches, rooms and guides for it." },
    { question: "Do our staff need visas for China?", answer: "It depends on each traveller’s passport. China currently allows short visa-free visits for many countries, including Malaysia, Singapore and South Korea. Send us the nationalities in your group and we check them before you book flights." },
    { question: "Can you arrange halal or vegetarian meals?", answer: "Yes. Tell us at the start. We choose restaurants and menus that meet the requirement and name them in the proposal." },
    { question: "Can we hold a meeting or an awards dinner?", answer: "Yes. We book a meeting room with the layout, equipment and tea breaks you need, and a private room for dinners and speeches. Your company runs the agenda." },
    { question: "Who do we sign with, and how do we pay?", answer: "You contract with Shengshi Meida (Beijing) International Travel Agency Co., Ltd., licence L-BJ10587. Pay by bank transfer, card payment link or Alipay: a deposit confirms the booking and the balance is due on arrival, with a receipt for every payment." },
    { question: "How far ahead should we book?", answer: "Two to three months ahead is comfortable. Chinese public holidays and October book up earliest. For a smaller group a few weeks can work, so ask even if your dates are close." },
    { question: "Are international flights included?", answer: "Usually not; most companies book their own. We can include flights and high-speed trains inside China in the quote." },
  ],
  ui: {
    skipLink: "Skip to content",
    home: "Home",
    breadcrumb: "For companies",
    photoCredits: "Photo credits",
    photoCreditsNote: "Destination photographs illustrate the places in the programme.",
    planCta: "Plan this for your team",
    backLink: "← All company trips in China",
    facts: { duration: "Duration", group: "Group size", base: "Base", format: "Good for" },
    storyEyebrow: "Why it works for a team",
    itineraryEyebrow: "The programme",
    itineraryTitle: "Four days, day by day.",
    itineraryIntro: "Your arrival times, the season and your team shape the final plan.",
    jumpToDay: "Jump to a day",
    day: "Day {n}",
    stayEyebrow: "Where you stay",
    scopeEyebrow: "What’s in the quote",
    scopeTitle: "Included, optional, not included.",
    scopeIntro: "Your written quote lists each item and its price.",
    included: "Included",
    options: "Can be added",
    excluded: "Not included",
    notesEyebrow: "Good to know",
    notesTitle: "Planned around the people coming.",
    tripFaqTitle: "Questions about this programme.",
    relatedEyebrow: "Useful reading",
  },
};

const hubCopy: Record<CorporateLocale, CorporateHubCopy> = { en: corporateHubEn, zh: corporateHubZh, ko: corporateHubKo, ja: corporateHubJa, es: corporateHubEs, fr: corporateHubFr, de: corporateHubDe, ar: corporateHubAr };

export function getCorporateHubCopy(locale: CorporateLocale): CorporateHubCopy {
  return hubCopy[locale];
}

export const corporateHubTitle = corporateHubEn.seoTitle;
export const corporateHubDescription = corporateHubEn.description;
export const corporateHubFaqs: CorporateFaq[] = corporateHubEn.faqs;
