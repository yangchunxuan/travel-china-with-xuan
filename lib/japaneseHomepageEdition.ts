import { getHomegroundCopy, type HomegroundCopy } from "./homegroundI18n";
import { getHomepageShowcaseCopy } from "./homepageShowcaseI18n";
import { getGuideSearchCopy, type GuideSearchCopy } from "./guideSearchI18n";
import { japaneseHomeCopy as copy } from "./japaneseHomeCopy";

const source = getHomegroundCopy("en");
/** Existing Japanese content, using the shared homepage presentation. */
export const japaneseHomepageEditionCopy: HomegroundCopy = {
  ...source, htmlLang: "ja", path: "/ja/", languageName: "日本語", languageShort: "JA",
  skipLink: copy.skipLink, businessDescriptor: copy.hero.eyebrowShort,
  brandTagline: copy.hero.canonicalTitle, schemaDescription: copy.metadata.description,
  hero: { ...source.hero, eyebrow: copy.hero.eyebrow, title: copy.hero.canonicalTitle },
  guides: { ...source.guides, viewAllLabel: "日本語の旅行ガイドを見る" },
  faq: { eyebrow: copy.faq.eyebrow, title: copy.faq.title, intro: "", items: [...copy.faq.items] },
};
export const japaneseHomepageShowcaseCopy: ReturnType<typeof getHomepageShowcaseCopy> = {
  heroBody: copy.hero.body,
  heroHeadline: { fixedLines: [...copy.hero.fixedLines], joiner: "", phrases: [...copy.hero.phrases] },
  heroPrimary: copy.hero.primary, heroSecondary: copy.hero.secondary,
  heroDestinationPrompt: copy.hero.destinationPrompt, heroDestinationAction: copy.hero.destinationAction,
  guidePaths: { listLabel: "中国旅行の準備ガイド", items: [
    { id: "plan", title: "旅のルートと予算" }, { id: "transport", title: "都市間の移動を考える" }, { id: "stay", title: "宿泊エリアを選ぶ（英語）" },
  ] }, planning: copy.planning,
};
const search = getGuideSearchCopy("en");
export const japaneseHomepageGuideSearchCopy: GuideSearchCopy = {
  ...search, navLabel: "旅行ガイドを探す", eyebrow: "旅の準備に役立つ情報", title: "旅の前に、知っておきたいこと。",
  introduction: "日本語のガイドから読み始めることも、英語のガイド全体から探すこともできます。検索欄には都市名や知りたいことを英語で入力してください。英語の記事には、その旨を表示しています。",
  label: "英語の旅行ガイドを検索", placeholder: "例：Where to stay in Zhangjiajie", action: "英語のガイドを検索", examplesLabel: "検索の例",
  loadingSuggestions: "関連するガイドを探しています…", suggestionsUnavailable: "候補の表示に時間がかかっています。そのまま検索することもできます。",
  retrySuggestions: "もう一度試す", noSuggestions: "近い候補が見つかりません。検索結果もご覧ください。", emptyQueryError: "知りたいことを英語で入力してください。",
  suggestionsLabel: count => `関連する英語のガイド：${count}件`,
};
