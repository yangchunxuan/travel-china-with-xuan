import type { PrivateToursHubEdition } from "../components/PrivateToursHubPage";
import { getPrivateTourFacets } from "./privateTourCatalogFacets";
import type { PublishedPrivateTourCatalogItem } from "./publishedPrivateTourCatalog";

export function getJapaneseToursHubFacets(products: readonly PublishedPrivateTourCatalogItem[]) {
  // Japanese offers are published in CNY; the Chinese base supplies the same
  // numeric filter bands, with Japanese presentation labels below.
  const source = getPrivateTourFacets(products, "zh", "お見積もり");
  const regions: Record<string, string> = { east: "華東", southwest: "中国西南部", south: "華南", north: "華北・西北", northeast: "中国東北部", central: "中国中部", multi: "複数の地域" };
  const lengths: Record<string, string> = { short: "半日〜5日", medium: "6日", long: "7〜21日" };
  const prices: Record<string, string> = { low: "3,500元未満", mid: "3,500〜6,500元", high: "6,500元超", quote: "お見積もり" };
  return { ...source, regions: source.regions.map(option => ({ ...option, label: regions[option.id] })), lengths: source.lengths.map(option => ({ ...option, label: lengths[option.id] })), prices: source.prices.map(option => ({ ...option, label: prices[option.id] })) };
}

export function getJapaneseToursHubCopy(count: number): PrivateToursHubEdition["copy"] {
  return {
    htmlLang: "ja", path: "/ja/tours/",
    metadata: { title: "中国ツアー一覧 | Homeground China", description: "都市、自然、文化を巡るプライベートツアーと、出発日指定の少人数グループ。日程、サービス内容、掲載料金を比べてお選びいただけます。", openGraphTitle: "中国ツアー一覧 | Homeground China" },
    breadcrumbLabel: "パンくずリスト", breadcrumbHome: "ホーム", breadcrumbCurrent: "中国ツアー一覧",
    eyebrow: `${count}コースから探す中国の旅`, title: "旅の行き先を見つける。",
    introduction: "都市、自然、文化を巡るプライベートツアーと、出発日指定の少人数グループ。各ページで日程、サービス内容、掲載料金または見積もり条件をご確認いただけます。",
    heroAction: `全${count}コースを見る`,
    quickCompareEyebrow: "ツアー一覧", quickCompareTitle: "行程を比べて選ぶ。", quickCompareIntroduction: "行き先、日数、旅のペースから、ご自身に合うコースを探せます。",
    priceBasisNote: "料金は中国元（CNY）です。人数・部屋割り・プランを合わせてお比べください。掲載料金のないコースは旅行日程と人数に合わせてお見積もりします。日本語ガイドは、込みと明記したコースを除き別途お見積もりとなります。",
    quickFitLabel: "こんな旅に", quickMovementLabel: "宿泊と旅のペース", quickAction: "行程を見る",
    catalogEyebrow: "すべてのコース", catalogTitle: `${count}のコースから、中国の旅を。`, catalogIntroduction: "詳しい日程、含まれるサービス、選べるプランは各ツアーページでご確認ください。",
    tourCount: (n: number) => `${n}コース掲載`, duration: (days: number, nights: number) => days < 1 ? "半日" : `${days}日間・${nights}泊`,
    startingPriceLabel: "料金の目安", quoteOnlyLabel: "お見積もり", quoteOnlyBody: "日程・人数・部屋割りに合わせてご案内", perPersonLabel: "1名あたり",
    groupBasis: (n: number) => `${n}名参加の場合`, twinShareBasis: "2名1室利用", partySize: (n: number) => `${n}名参加`, perPersonPriceNote: "料金は1名あたり",
    paceLabel: "宿泊と旅のペース", fitLabel: "こんな旅に", highlightsLabel: "旅の見どころ", viewLabel: "このコースを見る",
    finalEyebrow: "旅について相談する", finalTitle: "行きたい場所が決まりましたか？", finalBody: "気になるコースと旅行の時期、人数をお知らせください。日本語でご案内します。まだコースが決まっていなくてもかまいません。", finalAction: "日本語で旅を相談する",
    statsRoutes: "掲載コース", statsRegions: "旅する地域", statsLengths: "旅行日数", statsShopping: "買い物立ち寄りを明記したコース",
    filterGroupLabel: "ツアーを絞り込む", filterRegionLabel: "地域", filterLengthLabel: "日数", filterPriceLabel: "料金の目安（中国元）", filterAll: "すべて", filterReset: "絞り込みを解除", filterCount: "全{total}コース中{shown}コース", filterEmpty: "条件に合うコースがありません。条件を変えてお試しください。",
  };
}

export const japaneseToursPriorityCopy: PrivateToursHubEdition["priorityCopy"] = {
  eyebrow: "旅選びのヒント", title: "どんな中国に出会いたいですか？", introduction: "初めての中国を巡る旅から、江南でゆっくり過ごす旅まで。まずは心ひかれるコースを見つけてみてください。",
};
export const japaneseToursPriorityReasons: PrivateToursHubEdition["priorityReasons"] = {
  "beijing-xian-shanghai-8-day-private-tour": "北京・西安・上海を8日間で。初めての中国旅行で、歴史と今の暮らしに触れるコースです。",
  "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour": "歴史の街、パンダ、桂林の風景をつなぎ、都市ごとの魅力を味わいます。",
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": "北京から成都・桂林を経て上海へ。14日間、ご自身のグループだけで巡ります。",
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": "歴史の名所に、張家界と桂林の大自然を組み合わせた旅です。",
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour": "出発日と行程が決まった少人数グループツアー。掲載の日程と条件から選べます。",
  "suzhou-tongli-hangzhou-shanghai-12-day-private-tour": "庭園、水路、お茶、街の日常。江南の暮らしを、12日間かけてゆっくり味わいます。",
};
export const japaneseToursArrivalPlanning: PrivateToursHubEdition["arrivalPlanning"] = {
  eyebrow: "予約の前に", title: "中国旅行を、具体的に考え始めたら。", introduction: "ツアーは中国国内からのスタートです。気になるコースを選んだら、ご希望の日程と人数に合わせて、集合場所や送迎、含まれるサービスを確認します。",
  questions: [
    { title: "どこからツアーが始まりますか？", body: "国際線航空券は含まれません。出発地と検討中の便をお知らせください。到着時の待ち合わせ、送迎、初日の行程を予約前に確認します。" },
    { title: "料金はどう比べればよいですか？", body: "掲載料金は中国元（CNY）です。参加人数、部屋割り、ガイドやホテルのプランを合わせてお比べください。ご希望日での最終料金と支払い条件は、ご予約前に書面でご案内します。" },
    { title: "日本語ガイドをお願いできますか？", body: "コースに「日本語ガイド込み」と記載がある場合を除き、手配の可否と追加料金を別途確認します。英語ガイド付き、ドライバーによる案内、ガイドなしなど、基本プランの内容もコースごとに異なります。" },
    { title: "子ども連れや、ゆっくり歩きたい場合は？", body: "お子さまの年齢、歩ける距離、避けたい階段、希望する部屋割りをお知らせください。お見積もり前に調整できる内容を確認します。出発日指定のグループツアーは、掲載の行程・サービスに沿ってご案内します。" },
  ],
  preparationLabel: "旅行の準備に", links: [
    { href: "/guides/china-entry-requirements/", label: "中国の入国条件を確認する（英語）" },
    { href: "/ja/services/", label: "必要な現地サポートを選ぶ" },
    { href: "/ja/guides/", label: "日本語の旅行ガイドを読む" },
  ],
};
