import { getHomepageGuideChapters, type HomepageGuideChapter } from "./homepageEditorial";

const englishTitles: Readonly<Record<string, string>> = {
  "is-your-china-itinerary-too-rushed": "その旅程、詰め込みすぎていませんか？",
  "china-regional-food-route": "各地の料理を楽しむ旅の組み立て方", "china-itinerary-with-older-parents": "年配の家族と旅するなら、どんなペースがよい？",
  "beijing-south-station-to-capital-or-daxing-airport": "北京南駅から首都空港・大興空港へ", "guilin-airport-or-railway-station-arrival-guide": "桂林には空港と駅、どちらから入る？",
  "shenzhen-airport-railway-station-border-port-selector": "深圳の空港・駅・出入境口岸の選び方", "zhangjiajie-city-or-wulingyuan-hotel-base": "張家界の市街地と武陵源、どちらに泊まる？",
  "beijing-where-to-stay-first-trip": "初めての北京、どのエリアに泊まる？", "yangshuo-town-or-yulong-river-where-to-stay": "陽朔の町と遇龍河の田園、宿泊先の選び方",
};
/** Keep the original chapter photos and only link to real published articles. */
export function getJapaneseHomepageGuideChapters(): readonly HomepageGuideChapter[] {
  return getHomepageGuideChapters("en").map(chapter => ({ ...chapter, guides: chapter.guides.map((guide, index) => {
    if (chapter.id === "plan" && index === 0) return { ...guide, id: "how-much-does-a-china-trip-cost", title: "中国旅行はいくらかかる？費用の考え方", href: "/ja/guides/how-much-does-a-china-trip-cost/", linkLabel: "日本語で読む" };
    if (chapter.id === "transport" && index === 0) return { ...guide, id: "shanghai-hangzhou-transport-route", title: "上海から杭州へ。列車はどの駅を選ぶ？", href: "/ja/guides/shanghai-hangzhou-transport-route/", linkLabel: "日本語で読む" };
    const title = englishTitles[guide.id];
    if (!title) throw new Error(`Missing Japanese homepage guide label: ${guide.id}`);
    return { ...guide, title: `${title}（英語）`, linkLabel: "英語で読む" };
  }) }));
}
