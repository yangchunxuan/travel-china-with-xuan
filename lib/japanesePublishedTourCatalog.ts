import { getPublishedPrivateTourCatalog, type PublishedPrivateTourCatalogItem } from "./publishedPrivateTourCatalog";
import { getJapaneseTourCatalog, japaneseTourEntryHref } from "./japaneseTourCatalog";
import { getPrivateTourStartingPrice, getPrivateTourTwoTravellerPrice } from "./privateTourStartingPrice";
import { getJapaneseGuideLanguageLabel } from "./japaneseGuideLanguage";
import { japaneseHalfDayCopy, japaneseHalfDayPath } from "./japaneseTerracottaHalfDay";
import { terracottaHalfDayImage, terracottaHalfDaySlug } from "./terracottaHalfDayTour";

const places: Readonly<Record<string, string>> = {
  Shanghai: "上海", Suzhou: "蘇州", Hangzhou: "杭州", Chengdu: "成都", "Panda Base": "パンダ基地", Sanxingdui: "三星堆", Dujiangyan: "都江堰",
  "Xi’an": "西安", "Xi'an": "西安", "Terracotta Warriors": "兵馬俑", "City Wall": "城壁", "Muslim Quarter": "回民街", Chongqing: "重慶", Wulong: "武隆", "Three Natural Bridges": "天生三橋",
  Guilin: "桂林", "Li River": "漓江", Yangshuo: "陽朔", Harbin: "ハルビン", "Songhua River": "松花江", "Ice and Snow World": "氷雪大世界", Zhujiajiao: "朱家角", "Suzhou day trip": "蘇州日帰り",
  Beijing: "北京", "Forbidden City": "故宮", "Great Wall": "万里の長城", Zhangjiajie: "張家界", Yuanjiajie: "袁家界", "Golden Whip Stream": "金鞭渓", "Tianmen Mountain": "天門山", "Furong Town": "芙蓉鎮", Fenghuang: "鳳凰",
  Jiuzhaigou: "九寨溝", Huanglong: "黄龍", Kunming: "昆明", Dali: "大理", Lijiang: "麗江", Guiyang: "貴陽", Huangguoshu: "黄果樹", Libo: "茘波", Xijiang: "西江", Zhenyuan: "鎮遠",
  Xiamen: "厦門", Gulangyu: "鼓浪嶼", Yongding: "永定", Nanjing: "南靖", Anxi: "安渓", Quanzhou: "泉州", Shantou: "汕頭", "Nan'ao Island": "南澳島", Chaozhou: "潮州", Leshan: "楽山", Dazu: "大足", Guangzhou: "広州", Shunde: "順徳", Foshan: "仏山",
  Huangshan: "黄山", Hongcun: "宏村", "Huizhou villages": "徽州の古村", Jingdezhen: "景徳鎮", Wuyuan: "婺源", Sanqingshan: "三清山", "Wangxian Valley": "望仙谷", "Changbaishan Resort": "長白山リゾート", "North Slope": "北坡", Yanji: "延吉",
  "Shanghai Disneyland": "上海ディズニーランド", Zhengzhou: "鄭州", Kaifeng: "開封", Dengfeng: "登封", Luoyang: "洛陽", Datong: "大同", "Hanging Temple": "懸空寺", Pingyao: "平遥", Taiyuan: "太原", Zhangye: "張掖", Jiayuguan: "嘉峪関", Dunhuang: "敦煌",
  "Yangtze Three Gorges": "長江三峡", Yichang: "宜昌", Urumqi: "ウルムチ", "Sayram Lake": "サイラム湖", Yining: "イーニン", Tekes: "テケス", Nalati: "ナラティ", Hailar: "ハイラル", "Mergel River": "モルゲル川", Erguna: "アルグン", Manzhouli: "満洲里",
  "Stone Forest": "石林", Jianshui: "建水", Yuanyang: "元陽", Shenzhen: "深圳", "Science and Technology Museum": "科学技術館", Huaqiangbei: "華強北", "Yangtze River": "長江", Turpan: "トルファン", "Shangri-La": "シャングリラ", Longji: "龍脊", "Hong Kong": "香港", Yangtze: "長江",
  Yabuli: "ヤブリ", "Snow Town": "雪郷", "Changbai Mountain": "長白山", Mohe: "漠河", Beihong: "北紅村", "Arctic Village": "北極村", "Wanda Resort": "ワンダリゾート", Tongli: "同里", Wulingyuan: "武陵源", "Glass Bridge": "ガラス橋",
};
const firstSentence = (text: string) => text.split("。")[0] + (text.includes("。") ? "。" : "");
export function getJapanesePublishedTourCatalog(): readonly PublishedPrivateTourCatalogItem[] {
  const japanese = new Map(getJapaneseTourCatalog().map(tour => [tour.slug, tour]));
  const products = getPublishedPrivateTourCatalog("en").map(source => {
    const tour = japanese.get(source.slug);
    if (!tour) throw new Error(`Missing Japanese catalogue tour: ${source.slug}`);
    const starting = getPrivateTourStartingPrice(tour);
    const two = getPrivateTourTwoTravellerPrice(tour);
    const href = japaneseTourEntryHref(tour);
    const route = source.comparison.route.split(" · ").map(place => {
      if (!places[place]) throw new Error(`Missing Japanese catalogue place: ${place}`);
      return places[place];
    }).join(" · ");
    const validityNote = source.slug === "harbin-winter-5-day-private-tour"
      ? "2027年1月6日〜2月5日の日曜〜木曜到着が対象です。祝休日を除き、主要な氷の施設の営業開始後に適用されます。"
      : source.slug === "zhangjiajie-4-day-private-tour"
        ? "掲載料金の対象期間は2026年9月6日〜12月30日（中国時間）です。ご希望の日程で改めて確認します。" : undefined;
    return {
      ...source, title: tour.title, description: tour.metadataDescription, href: tour.path, startingPriceHref: href,
      image: { ...source.image, alt: tour.heroImage.alt },
      comparison: { route, appeal: firstSentence(tour.lede), pace: firstSentence(tour.hotelNote), fit: firstSentence(tour.summary), highlights: tour.highlights },
      startingPrice: starting ? { ...starting, ...(validityNote ? { validityNote } : {}) } : null,
      twoTravellerPrice: two ? { amount: two.amount, currency: two.currency, formatted: two.formatted } : undefined,
      guideLanguage: getJapaneseGuideLanguageLabel(tour.slug),
    };
  });
  return [...products, {
    id: terracottaHalfDaySlug, slug: terracottaHalfDaySlug, source: "structured-tour", title: japaneseHalfDayCopy.title,
    description: japaneseHalfDayCopy.description, days: 0.5, nights: 0, href: japaneseHalfDayPath, startingPriceHref: japaneseHalfDayPath,
    paths: { en: `/tours/${terracottaHalfDaySlug}/`, zh: `/zh/tours/${terracottaHalfDaySlug}/`, ko: `/ko/tours/${terracottaHalfDaySlug}/` },
    image: { ...terracottaHalfDayImage, alt: japaneseHalfDayCopy.heroAlt },
    comparison: { route: "西安 · 兵馬俑", appeal: "専用車でホテルから往復し、英語ガイドと兵馬俑をじっくり見学します。", pace: "ホテル往復で約5〜6時間。博物館では約2時間半〜3時間を過ごします。", fit: "西安滞在中の半日を、兵馬俑の見学に充てたい方に。", highlights: ["専用車でホテル往復", "博物館内の英語ガイド", "入場券の予約"] },
    startingPrice: null, hasServiceChoice: false, guideLanguage: "館内の英語ガイド込み。日本語ガイドは別途お見積もり。", shoppingStops: false, dateModified: products[0].dateModified,
  }];
}
