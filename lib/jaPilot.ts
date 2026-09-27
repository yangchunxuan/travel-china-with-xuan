/** Only these fully authored pages participate in the initial Japanese pilot. */
export const jaPilot = {
  home: "/ja/",
  privacy: "/ja/privacy/",
  guideId: "shanghai-hangzhou-transport-route",
  guide: "/ja/guides/shanghai-hangzhou-transport-route/",
  tourSlug: "shanghai-suzhou-hangzhou-6-day-private-tour",
  tour: "/ja/tours/shanghai-suzhou-hangzhou-6-day-private-tour/",
} as const;

const site = "https://homegroundchina.com";

export function jaPilotGuideAlternates() {
  return {
    en: `/guides/${jaPilot.guideId}/`,
    "zh-Hans": `/zh/guides/${jaPilot.guideId}/`,
    ko: `/ko/guides/${jaPilot.guideId}/`,
    ja: jaPilot.guide,
    "x-default": `/guides/${jaPilot.guideId}/`,
  } as const;
}

export function jaPilotTourAlternates() {
  return {
    en: `/tours/${jaPilot.tourSlug}/`,
    "zh-Hans": `/zh/tours/${jaPilot.tourSlug}/`,
    ko: `/ko/tours/${jaPilot.tourSlug}/`,
    ja: jaPilot.tour,
    "x-default": `/tours/${jaPilot.tourSlug}/`,
  } as const;
}

export function absoluteJaPilotAlternates(
  paths: Readonly<Record<string, string>>,
) {
  return Object.fromEntries(
    Object.entries(paths).map(([language, path]) => [language, `${site}${path}`]),
  );
}

function jaPilotMessage(subject: "tour" | "guide", travelers?: 2 | 4 | 6) {
  const path = subject === "tour" ? jaPilot.tour : jaPilot.guide;
  return [
    "こんにちは。日本語で旅行の相談をさせてください。",
    subject === "tour"
      ? "上海・蘇州・杭州6日間のプライベートツアー（日本語ガイド付きの公開料金）を検討しています。"
      : "上海と杭州の移動や旅程について相談したいです。",
    `参加人数：${travelers ? `${travelers}名` : ""}`,
    "旅行予定の時期：",
    ...(subject === "tour" ? [] : ["希望するガイドの言語："]),
    `参照ページ：https://homegroundchina.com${path}`,
  ].join("\n");
}

/** Direct Japanese consultation. The link opens a draft; nothing is sent until the traveller sends it. */
export function jaPilotWhatsAppHref(subject: "tour" | "guide", travelers?: 2 | 4 | 6) {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || "8613174215999";
  const number = /^\d{7,15}$/.test(configured) ? configured : "8613174215999";
  return `https://wa.me/${number}?text=${encodeURIComponent(jaPilotMessage(subject, travelers))}`;
}

export function jaPilotEmailHref(subject: "tour" | "guide", travelers?: 2 | 4 | 6) {
  const topic = subject === "tour" ? "上海・蘇州・杭州6日間" : "上海・杭州の移動";
  return `mailto:hello@homegroundchina.com?subject=${encodeURIComponent(`日本語での旅行相談：${topic}`)}&body=${encodeURIComponent(jaPilotMessage(subject, travelers))}`;
}
