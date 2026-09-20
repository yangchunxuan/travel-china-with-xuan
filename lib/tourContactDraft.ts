import type { HomegroundLocale } from "./homegroundI18n";

export const jiangnanTourSlugs = [
  "shanghai-suzhou-5-day-private-tour",
  "shanghai-suzhou-hangzhou-6-day-private-tour",
] as const;

export function isJiangnanTour(slug?: string) {
  return jiangnanTourSlugs.some(value => value === slug);
}

export const referralSources = ["ChatGPT", "Google", "Gemini", "Perplexity", "friend", "other"] as const;
export type ReferralSource = "" | (typeof referralSources)[number];
export const jiangnanContactCopy = {
  en: { placeholder: "Room preferences, children’s ages, arrival/departure plans or walking needs…", source: "How did you find us?", blank: "Choose if you’d like", friend: "Friends or family", other: "Other" },
  zh: { placeholder: "房型偏好、孩子年龄、到离安排，或步行需求……", source: "你是从哪里知道我们的？", blank: "可以选择，也可以留空", friend: "亲友介绍", other: "其他" },
  ko: { placeholder: "객실 선호, 어린이 나이, 도착·출발 계획 또는 걷기 관련 요청…", source: "어떻게 알게 되셨나요?", blank: "선택하지 않아도 됩니다", friend: "지인 소개", other: "기타" },
} as const;

export interface TourContactDraft {
  travelDate: string | null;
  note: string;
  referralSource?: ReferralSource;
}

/** A traveller's self-report stays in their note, never in measured attribution. */
export function tourContactNote(note: string, source: ReferralSource = ""): string | null {
  const known = referralSources.find(value => value === source);
  return [note.trim(), known ? `[Traveller-reported discovery: ${known}]` : ""].filter(Boolean).join("\n\n") || null;
}

export function tourContactDraftText(locale: HomegroundLocale, draft?: TourContactDraft): string {
  if (!draft) return "";
  const copy = {
    en: { date: "Preferred arrival", undecided: "Dates not decided yet", note: "Trip details", source: "How I found Homeground" },
    zh: { date: "预计抵达", undecided: "日期还没确定", note: "旅行需求", source: "我从这里知道 Homeground" },
    ko: { date: "희망 도착일", undecided: "날짜 미정", note: "여행 요청", source: "Homeground를 알게 된 곳" },
  }[locale];
  const source = referralSources.find(value => value === draft.referralSource);
  const sourceLabel = source === "friend" || source === "other" ? jiangnanContactCopy[locale][source] : source;
  return [
    `${copy.date}: ${draft.travelDate || copy.undecided}`,
    draft.note.trim() ? `${copy.note}: ${draft.note.trim()}` : "",
    sourceLabel ? `${copy.source}: ${sourceLabel}` : "",
  ].filter(Boolean).join("\n");
}
