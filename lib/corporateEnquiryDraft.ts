import type { CorporateTripSlug } from "./corporateTravelTypes";

export const corporatePurposeLabels = {
  "company-trip": "Company trip & team building",
  incentive: "Incentive travel",
  meeting: "Small meeting & team retreat",
  undecided: "Help us choose the right format",
} as const;
export type CorporatePurpose = keyof typeof corporatePurposeLabels;
export const corporateTripLabels: Record<CorporateTripSlug, string> = {
  "zhangjiajie-4-day-team-trip": "Zhangjiajie · 4 days / 3 nights",
  "shanghai-suzhou-4-day-company-retreat": "Shanghai & Suzhou · 4 days / 3 nights",
};
export interface CorporateEnquiryDraft {
  company: string;
  name: string;
  email: string;
  people: string;
  timing: string;
  purpose: CorporatePurpose;
  trip: CorporateTripSlug | "undecided";
  budget: string;
  notes: string;
}

function oneLine(value: string) { return value.replace(/[\r\n\t]+/g, " ").trim(); }

/** Prepare a message only; never submit, send, book or calculate a price. */
export function buildCorporateEnquiryDraft(draft: CorporateEnquiryDraft, options: { translate?: (source: string) => string; referencePath?: string } = {}) {
  const t = options.translate ?? ((source: string) => source);
  const company = oneLine(draft.company);
  const people = oneLine(draft.people);
  if (!company) throw new Error("Please enter your company name.");
  if (!/^\d{1,4}$/.test(people) || Number(people) < 1) throw new Error("Please enter an estimated group size between 1 and 9,999.");
  if (!oneLine(draft.timing)) throw new Error("Please share a month or say that your dates are still open.");
  if (!Object.prototype.hasOwnProperty.call(corporatePurposeLabels, draft.purpose)) throw new Error("Please choose the purpose of your trip.");
  if (draft.trip !== "undecided" && !Object.prototype.hasOwnProperty.call(corporateTripLabels, draft.trip)) throw new Error("Please choose a sample itinerary or ask us to suggest one.");
  const selected = t(draft.trip === "undecided" ? "Open to suggestions" : corporateTripLabels[draft.trip]);
  return [
    t("Hi Homeground, we’d like to discuss a company trip to China."),
    "",
    `${t("Company")}: ${company}`,
    draft.name.trim() ? `${t("Contact")}: ${oneLine(draft.name)}` : "",
    draft.email.trim() ? `${t("Reply email")}: ${oneLine(draft.email)}` : "",
    `${t("Purpose")}: ${t(corporatePurposeLabels[draft.purpose])}`,
    `${t("Estimated group")}: ${Number(people)} ${t("people")}`,
    `${t("Dates / duration")}: ${oneLine(draft.timing)}`,
    `${t("Starting idea")}: ${selected}`,
    draft.budget.trim() ? `${t("Budget & currency")}: ${oneLine(draft.budget)}` : "",
    draft.notes.trim() ? `${t("Other arrangements")}: ${draft.notes.trim()}` : "",
    "",
    t("Please help us shape the programme and confirm the arrangements, availability and written quotation before we book."),
    `${t("Reference")}: https://homegroundchina.com${options.referencePath ?? `/corporate-travel/${draft.trip === "undecided" ? "" : `${draft.trip}/`}`}`,
  ].filter((line, i, lines) => line !== "" || (i > 0 && lines[i - 1] !== "")).join("\n");
}

export function corporateEnquiryEmailHref(email: string, draft: CorporateEnquiryDraft, body: string, translate: (source: string) => string = (source) => source) {
  return `mailto:${email}?subject=${encodeURIComponent(translate("Company trip enquiry — {company}").replace("{company}", oneLine(draft.company)))}&body=${encodeURIComponent(body)}`;
}
