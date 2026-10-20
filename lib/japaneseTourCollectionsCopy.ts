import { japaneseServiceMenu, japaneseTourMenu } from "./japaneseMenuEntries";
import { getJapaneseToursHubCopy } from "./japaneseToursHubEdition";
import type { TourCollectionEditionCopy } from "./tourCollectionsEditions";

/**
 * The tour collections in Japanese (/ja/tours/multi-city/, /regions/,
 * /seasonal/), translated from the English page (lib/tourCollectionsI18n.ts
 * and lib/northeastWinterComparison.ts), as the other editions in
 * lib/tourCollectionsEditions.ts. Kept in a Japanese-only file so its text
 * stays out of the Chinese serif font subset.
 *
 * Tour names, routes and prices come from the Japanese catalogue
 * (lib/japanesePublishedTourCatalog.ts), so prices are the CNY amounts the
 * Japanese tour pages show. The Japanese header has no Private Tours or
 * Services menu: the "other ways" links name the catalogue as the header's
 * own link does and each collection by its page name; the service rows are
 * named as the Japanese services pages name them (as the Japanese city pages);
 * region names, price words and table headings are the Japanese catalogue's
 * own. Photo credits use the edition's shared credit line
 * (components/PhotoCredits.tsx), with Japanese punctuation.
 */

const hub = getJapaneseToursHubCopy(0);

/** As the Japanese catalogue's price note says: a Japanese-speaking guide is quoted separately unless a tour says it is included. */
export const japaneseTourCollectionsGuideNote = "日本語ガイドは、込みと明記したコースを除き別途お見積もりとなります。";

const range = (min: number, max: number) => (min === max ? `${min}` : `${min}〜${max}`);

export const japaneseTourCollectionsCopy: TourCollectionEditionCopy = {
  skipLink: "本文へ移動",
  breadcrumbLabel: hub.breadcrumbLabel,
  home: "ホーム",
  tours: "プライベートツアー",
  tourAction: "旅程と料金",
  facts: (routes, min, max) => `${routes}本のルート · ${range(min, max)}日間`,
  groupMeta: (routes, min, max) => `${routes}本のルート · ${range(min, max)}日間`,
  otherWays: "ほかの探し方",
  servicesTitle: "合うルートがありませんか？",
  servicesLede: "日数と都市を教えていただければ、あなたに合わせて旅を計画します。観光チケットだけ、ガイドだけのご依頼もできます。",
  collections: {
    "multi-city": {
      metadata: {
        title: "中国の複数都市を巡るプライベートツアー：日数別の定番ルート",
        description: "複数の都市を巡るプライベートルートを、10日以内、11〜14日、15日以上の日数別に紹介します。出発日指定の少人数ツアーもいくつかあります。いずれも旅程と料金を掲載しています。",
      },
      name: "複数都市の定番ルート",
      h1Lines: ["複数都市の定番ルート：", "ひとつの旅で、いくつもの都市へ。"],
      lede: "はじめての旅でよく選ばれるのは、北京・西安・上海を結ぶルートです。日数に余裕があれば、桂林、成都、張家界、または長江クルーズを加えます。以下は日数別に並べています。「少人数ツアー」は、決まった日程でほかの旅行者と一緒に出発します。",
      groups: {
        "up-to-10": { title: "10日以内", note: "3都市、または3都市に桂林を加えた旅です。最も短いのは、重慶と長江三峡クルーズの6日間です。" },
        "11-to-14": { title: "11〜14日", note: "各都市での滞在を延ばすか、張家界、桂林、雲南、黄山のうち1〜2つの地域を加えます。" },
        "15-plus": { title: "15日以上", note: "シルクロード、長江クルーズ、または北から南へ長く巡る旅です。" },
      },
    },
    regions: {
      metadata: {
        title: "中国のひとつの地域を巡るプライベートツアー：華東・中国西南部・華南ほか",
        description: "中国のひとつの地域にとどまるプライベートルートです。華東から中国西南部、華南、華北・西北、中国東北部、中国中部まで。いずれも旅程と料金を掲載しています。",
      },
      name: "ひとつの地域をめぐる旅",
      h1Lines: ["ひとつの地域を、", "ゆったりと。"],
      lede: "2日ごとに都市を移動するのは避けたいですか？それなら、ひとつの地域を選んでください。以下は地域別に並べています。単独で旅するほか、複数都市を巡るルートの前後に加えることもできます。",
      groups: {},
    },
    seasonal: {
      metadata: {
        title: "中国東北部の冬のプライベートツアー 2026〜27年",
        description: "ハルビン、亜布力、雪郷、漠河、長白山、延吉を巡る2026〜27年冬のプライベートツアーのうち、料金を掲載した5本を比較できます。ほかにお見積もりのルートが1本あります。",
      },
      name: "今シーズンの旅",
      h1Lines: ["2026〜27年、", "中国東北部の冬のツアー。"],
      lede: "ハルビンの氷の名所、亜布力や長白山でのスキー、雪郷、漠河への夜行列車から選べます。各ルートの詳しい条件を開く前に、ホテル泊と寝台列車泊、移動のペース、2名参加時のオフシーズン料金を比べてください。",
      groups: { "winter-northeast": { title: "中国東北部の冬" } },
    },
  },
  // As the Japanese catalogue's region filter names them (lib/japaneseToursHubEdition.ts).
  regionLabels: { east: "華東", southwest: "中国西南部", south: "華南", north: "華北・西北", northeast: "中国東北部", central: "中国中部" },
  tourMenu: japaneseTourMenu,
  serviceMenu: japaneseServiceMenu,
  priceCopy: {
    startingPriceLabel: hub.startingPriceLabel,
    quoteOnlyLabel: hub.quoteOnlyLabel,
    quoteOnlyBody: hub.quoteOnlyBody,
    partySize: hub.partySize,
    perPersonPriceNote: hub.perPersonPriceNote,
  },
  winter: {
    title: "2026〜27年冬、料金を掲載した東北5ルートを比べる",
    intro: "まずは夜の過ごし方から選んでください。ハルビン―雪郷と延吉―長白山のルートはすべてホテル泊、漠河へのルートには硬臥寝台列車での2泊が含まれます。",
    route: "ルート",
    nights: "宿泊のかたち",
    fit: hub.quickFitLabel,
    travel: hub.quickMovementLabel,
    price: "オフシーズン料金",
    priceBasis: "1名あたり · 大人2名",
    cardSeasonLabel: "オフシーズン",
    priceNote: "表の料金は、大人2名で1室を利用する場合のオフシーズンの1名あたり料金です。2026年11月10日〜12月19日、または2027年2月15日〜3月10日の出発が対象です。そのほかの人数、お子さま、1人部屋、最終的な総額は、お支払い前に書面で確認します。この一覧にあるもう1本の冬のルート、長白山―延吉はお見積もりとなります。",
    routeNights: {
      "harbin-yabuli-snow-town-6-day-private-tour": "ホテル5泊 · 夜行列車なし",
      "harbin-snow-town-changbaishan-yanji-8-day-private-tour": "ホテル7泊 · 夜行列車なし",
      "harbin-mohe-arctic-village-7-day-private-tour": "ホテル4泊 + 硬臥寝台列車2泊",
      "harbin-snow-town-mohe-9-day-private-tour": "ホテル6泊 + 硬臥寝台列車2泊",
      "yanji-changbaishan-wanda-6-day-private-tour": "ホテル5泊 · 夜行列車なし",
    },
  },
};
