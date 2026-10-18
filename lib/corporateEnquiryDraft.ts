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
export const japaneseCorporatePurposeLabels: Record<CorporatePurpose, string> = {
  "company-trip": "社員旅行・チームビルディング",
  incentive: "インセンティブ旅行",
  meeting: "少人数の会議・チーム合宿",
  undecided: "目的に合うかたちを相談したい",
};
export const japaneseCorporateTripLabels: Record<CorporateTripSlug, string> = {
  "zhangjiajie-4-day-team-trip": "張家界・3泊4日",
  "shanghai-suzhou-4-day-company-retreat": "上海・蘇州・3泊4日",
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
export function buildCorporateEnquiryDraft(draft: CorporateEnquiryDraft, language: "en" | "ja" = "en") {
  const ja = language === "ja";
  const company = oneLine(draft.company);
  const people = oneLine(draft.people);
  if (!company) throw new Error(ja ? "会社名をご入力ください。" : "Please enter your company name.");
  if (!/^\d{1,4}$/.test(people) || Number(people) < 1) throw new Error(ja ? "おおよその人数を1〜9,999名でご入力ください。" : "Please enter an estimated group size between 1 and 9,999.");
  if (!oneLine(draft.timing)) throw new Error(ja ? "希望月、または「日程未定」とご入力ください。" : "Please share a month or say that your dates are still open.");
  if (!Object.prototype.hasOwnProperty.call(corporatePurposeLabels, draft.purpose)) throw new Error(ja ? "旅行の目的をお選びください。" : "Please choose the purpose of your trip.");
  if (draft.trip !== "undecided" && !Object.prototype.hasOwnProperty.call(corporateTripLabels, draft.trip)) throw new Error(ja ? "モデルプラン、または「相談して決めたい」をお選びください。" : "Please choose a sample itinerary or ask us to suggest one.");
  if (ja) {
    return [
      "Homeground ご担当者さま", "中国への企業旅行について相談したいです。", "",
      `会社名：${company}`,
      draft.name.trim() ? `担当者名：${oneLine(draft.name)}` : "",
      draft.email.trim() ? `返信先メール：${oneLine(draft.email)}` : "",
      `目的：${japaneseCorporatePurposeLabels[draft.purpose]}`,
      `予定人数：${Number(people)}名`,
      `時期・日数：${oneLine(draft.timing)}`,
      `検討中のプラン：${draft.trip === "undecided" ? "相談して決めたい" : japaneseCorporateTripLabels[draft.trip]}`,
      draft.budget.trim() ? `予算・通貨：${oneLine(draft.budget)}` : "",
      draft.notes.trim() ? `その他の希望：${draft.notes.trim()}` : "",
      "ガイドの希望言語（日本語ガイドの対応可否・追加料金をご案内ください）：", "",
      "プラン、手配内容、空き状況、書面のお見積もりを確認してから予約を検討したいです。",
      `参照ページ：https://homegroundchina.com/ja/corporate-travel/${draft.trip === "undecided" ? "" : `${draft.trip}/`}`,
    ].filter((line, index, lines) => line !== "" || (index > 0 && lines[index - 1] !== "")).join("\n");
  }
  const selected = draft.trip === "undecided" ? "Open to suggestions" : corporateTripLabels[draft.trip];
  return [
    "Hi Homeground, we’d like to discuss a company trip to China.",
    "",
    `Company: ${company}`,
    draft.name.trim() ? `Contact: ${oneLine(draft.name)}` : "",
    draft.email.trim() ? `Reply email: ${oneLine(draft.email)}` : "",
    `Purpose: ${corporatePurposeLabels[draft.purpose]}`,
    `Estimated group: ${Number(people)} people`,
    `Dates / duration: ${oneLine(draft.timing)}`,
    `Starting idea: ${selected}`,
    draft.budget.trim() ? `Budget & currency: ${oneLine(draft.budget)}` : "",
    draft.notes.trim() ? `Other arrangements: ${draft.notes.trim()}` : "",
    "",
    "Please help us shape the programme and confirm the arrangements, availability and written quotation before we book.",
    `Reference: https://homegroundchina.com/corporate-travel/${draft.trip === "undecided" ? "" : `${draft.trip}/`}`,
  ].filter((line, i, lines) => line !== "" || (i > 0 && lines[i - 1] !== "")).join("\n");
}

export function corporateEnquiryEmailHref(email: string, draft: CorporateEnquiryDraft, body: string, language: "en" | "ja" = "en") {
  return `mailto:${email}?subject=${encodeURIComponent(`${language === "ja" ? "中国の企業旅行のご相談" : "Company trip enquiry"} — ${oneLine(draft.company)}`)}&body=${encodeURIComponent(body)}`;
}
