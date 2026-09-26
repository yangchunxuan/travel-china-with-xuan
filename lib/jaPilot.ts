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

/** Direct Japanese consultation while the three-language quote form remains unchanged. */
export function jaPilotWhatsAppHref(subject: "tour" | "guide", travelers?: 2 | 4 | 6) {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || "8613174215999";
  const number = /^\d{7,15}$/.test(configured) ? configured : "8613174215999";
  const path = subject === "tour" ? jaPilot.tour : jaPilot.guide;
  const message = [
    "こんにちは。日本語で旅行の相談をしたいです。",
    subject === "tour" ? "上海・蘇州・杭州の6日間プライベートツアーについて問い合わせます。" : "上海・杭州の移動と旅程について相談したいです。",
    `https://homegroundchina.com${path}`,
    subject === "tour" ? `旅行予定月：\n人数：${travelers ? `${travelers}名` : ""}\n日本語ガイド：含まれています` : "旅行予定月：\n人数：\n日本語ガイドの希望：",
  ].join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function jaPilotEmailHref(subject: "tour" | "guide", travelers?: 2 | 4 | 6) {
  const topic = subject === "tour" ? "上海・蘇州・杭州6日間" : "上海・杭州の移動";
  const guideLine = subject === "tour" ? "日本語ガイド：含まれています" : "日本語ガイドの希望：";
  return `mailto:hello@homegroundchina.com?subject=${encodeURIComponent(`日本語での旅行相談：${topic}`)}&body=${encodeURIComponent(`こんにちは。${topic}について相談したいです。\n旅行予定月：\n人数：${travelers ? `${travelers}名` : ""}\n${guideLine}\n参照ページ：https://homegroundchina.com${subject === "tour" ? jaPilot.tour : jaPilot.guide}`)}`;
}
