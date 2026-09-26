import type { PrivateTourProduct } from "./privateTourProducts";
import pricing from "../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json";
import source from "../content/product-previews/zhangjiajie-4-day-private-tour/product.json";

// The legacy four-day tour is not in privateTourProducts. This Japanese-only
// adapter keeps its approved itinerary and stay-tier prices in their original
// source files while presenting them through the same product-page layout.
const l = (value: string) => ({ en: value, zh: value, ko: value });
const image = (src: string, alt: string, caption: string, width: number, height: number) => ({
  src, alt: l(alt), caption: l(caption), width, height,
});

const stays = [
  {
    id: "selected-city-stay",
    en: "Selected City Stay",
    ja: "市内ホテル",
    enSummary: "A practical city base; the exact hotel and room are checked for your dates.",
    jaSummary: "市内のホテルを利用するプラン。宿泊先と客室は日程に合わせて事前に確認します。",
  },
  {
    id: "spacious-premium-stay",
    en: "Spacious Premium Stay",
    ja: "ゆとりのある上級宿泊",
    enSummary: "A roomier stay; the exact property and room allocation are checked for your dates.",
    jaSummary: "より広い客室で過ごすプラン。宿泊先と客室の割り当ては日程に合わせて確認します。",
  },
  {
    id: "distinctive-mountain-stay",
    en: "Distinctive Mountain Stay",
    ja: "山の景色を楽しむ宿泊",
    enSummary: "A distinctive mountain setting; the exact property and room are checked before payment.",
    jaSummary: "山の景色や宿の個性を楽しむプラン。宿泊先と客室はお支払い前に確認します。",
  },
] as const;

const sourcePhotos = {
  hero: image(
    "/product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg",
    "Sunlit sandstone pillars in Zhangjiajie National Forest Park",
    "Zhangjiajie National Forest Park",
    1920, 1280,
  ),
  gallery: [
    image(
      "/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
      "Visitors crossing the Zhangjiajie Grand Canyon Glass Bridge",
      "Grand Canyon Glass Bridge",
      1280, 1600,
    ),
    image(
      "/product-previews/zhangjiajie-4-day-private-tour/hero/tianmen-cave-and-stairs.jpg",
      "Tianmen Cave above the stairway at Tianmen Mountain",
      "Tianmen Mountain",
      1280, 1600,
    ),
  ],
};

export const japaneseLegacyZhangjiajieProduct: PrivateTourProduct = {
  id: "japanese-zhangjiajie-4-day-tour",
  slug: "zhangjiajie-4-day-private-tour",
  days: source.duration.days,
  nights: source.duration.nights,
  servicePolicy: { shoppingStops: false, addedServicesRequirePriorAgreement: true },
  title: l(source.title.en),
  eyebrow: l("Three landscapes, four days"),
  lede: l(source.short_description.en),
  summary: l("One arrival day and three distinct sightseeing days in Zhangjiajie, with a choice of three accommodation tiers."),
  highlights: {
    en: ["Zhangjiajie National Forest Park", "Grand Canyon Glass Bridge", "Tianmen Mountain", "Three accommodation tiers"],
    zh: ["张家界国家森林公园", "大峡谷玻璃桥", "天门山", "三档住宿选择"],
    ko: ["장가계 국가삼림공원", "대협곡 유리다리", "천문산", "세 가지 숙박 등급"],
  },
  itinerary: source.route.map((day) => ({
    day: day.day,
    title: { en: day.title_en, zh: day.title_zh, ko: day.title_ko },
    description: { en: day.summary_en, zh: day.summary_zh, ko: day.summary_ko },
  })),
  hotelNote: l("Three nights in the selected stay tier. The exact hotel, room type, breakfast and availability are confirmed in writing before payment."),
  serviceNote: l("Private local vehicle and agreed transfers. Two days of English-speaking guide service are included in the published price; guide arrangements for the other sightseeing day are confirmed in writing."),
  exclusions: {
    en: [
      "Travel to and from Zhangjiajie",
      "Lunches, dinners and personal expenses; breakfast is confirmed with the hotel",
      "VIP access, bungee jumping, zip lines, shows and other optional activities",
      "Single-room, child and vehicle-upgrade differences",
      "Personal travel insurance",
    ],
    zh: ["往返张家界的大交通", "午晚餐及个人消费；早餐按酒店确认", "VIP通道、蹦极、滑索、演出等自选项目", "单房差、儿童差价和车型升级", "个人旅行保险"],
    ko: ["장가계 왕복 교통편", "중식·석식 및 개인 경비; 조식은 숙소와 확인", "VIP 통로·번지점프·집라인·공연 등 선택 활동", "1인실·아동·차량 업그레이드 차액", "개인 여행자 보험"],
  },
  bookingNote: l(pricing.public_notes.en),
  heroImage: sourcePhotos.hero,
  gallery: sourcePhotos.gallery,
  routeMedia: [
    { day: 1, variants: [{ label: l("Arrival and hotel"), image: image("/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg", "Twin room in a candidate city hotel", "Candidate city accommodation", 1016, 782) }] },
    { day: 2, variants: [{ label: l("Forest Park"), image: image("/product-previews/zhangjiajie-4-day-private-tour/route/day-2-bailong-elevator.jpg", "Bailong Elevator beside the sandstone cliffs", "Bailong Elevator", 1280, 1600) }] },
    { day: 3, variants: [{ label: l("Grand Canyon"), image: sourcePhotos.gallery[0] }] },
    { day: 4, variants: [{ label: l("Tianmen Mountain"), image: sourcePhotos.gallery[1] }] },
  ],
  // Source prices expire on 30 September 2026. A statically exported new
  // locale would keep those numbers visible after that date, so request a
  // date-specific quote instead of publishing a soon-stale offer.
  packages: stays.map((stay) => ({
    id: stay.id,
    guideMode: "standard" as const,
    label: l(stay.en),
    summary: l(stay.enSummary),
    quoteOnly: true,
    prices: [],
  })),
  datePublished: pricing.valid_from,
  dateModified: "2026-09-23",
  lastReviewed: "2026-09-23",
};

export const japaneseLegacyZhangjiajieCopy = {
  title: "張家界4日間｜奇岩の峰林・ガラス橋・天門山",
  metadataTitle: "張家界4日間プライベートツアー｜行程と宿泊プラン",
  metadataDescription: "張家界国家森林公園、大峡谷のガラス橋、天門山を巡る4日間。宿泊は3プランから選択。出発日ごとの空室と料金は予約前に書面で確認します。",
  eyebrow: "3泊4日・張家界プライベートツアー",
  lede: "初日は到着と休息に充て、2日目から国家森林公園、大峡谷、天門山をそれぞれ巡ります。最終日は天門山の入場時刻と出発便を照らし合わせて行程を組みます。",
  summary: "到着日を含む4日間で張家界の三つの景観を訪ねます。宿泊は市内ホテル、ゆとりのある上級宿泊、山の景色を楽しむ宿泊から選べます。",
  highlights: ["張家界国家森林公園の砂岩峰林", "大峡谷のガラス橋", "天門山", "3種類の宿泊プラン"],
  itinerary: [
    { title: "張家界に到着", description: "空港または鉄道駅でドライバーがお迎えし、荷物とともにホテルへお送りします。初日はガイド付き観光を入れず、到着後の休息に充てます。" },
    { title: "国家森林公園：袁家界・天子山", description: "ガイドと専用車で張家界国家森林公園へ。百龍エレベーター、袁家界、天子山とロープウェイを、当日の運行状況に応じた順序で巡り、専用車でホテルに戻ります。" },
    { title: "大峡谷のガラス橋と洞窟または湖", description: "ガイドと専用車で大峡谷のガラス橋へ。その後は黄龍洞または宝峰湖のいずれか一か所を訪れます。含まれる訪問先はお支払い前の書面で確認します。" },
    { title: "天門山を訪ねて出発", description: "チェックアウト後、荷物を専用車に載せ、予約できたA・B・Cいずれかのコースで天門山へ。終了後、空港または駅へお送りします。入場時刻と便の間に十分な余裕がある場合に限り、同日に組み合わせます。" },
  ],
  hotelNote: "選んだ宿泊プランで3泊します。具体的なホテル、客室、朝食、空室状況は、お支払い前に書面で確認します。掲載写真は候補の参考です。",
  serviceNote: "現地の専用車と合意した範囲の送迎を手配します。基本プランには英語ガイド2日分が含まれます。もう1日のガイド手配と、日本語ガイドをご希望の場合の対応・料金は、日程に合わせて書面で確認します。",
  exclusions: [
    "張家界までの往復交通費",
    "昼食・夕食と個人的な支出。朝食の有無は宿泊先ごとに確認します",
    "VIP通路、バンジージャンプ、ジップライン、ショーなどの任意の体験",
    "一人部屋、子ども料金、車両アップグレードに伴う差額",
    "個人の海外旅行保険",
  ],
  bookingNote: "料金は旅行日・人数・宿泊プランに合わせて個別にお見積もりします。宿泊先、部屋数、朝食、車両、最終総額はお支払い前に書面で確認します。",
  faq: [
    { question: "張家界は4日間で回れますか？", answer: "初日を到着に充て、国家森林公園、大峡谷、天門山にそれぞれ1日を使う初回訪問なら可能です。周辺をすべて急がず巡るには、さらに日数が必要です。" },
    { question: "大峡谷のガラス橋と天門山のガラスの遊歩道は同じ場所ですか？", answer: "別の場所です。大峡谷のガラス橋と天門山のガラスの遊歩道は異なる日に訪れます。" },
    { question: "天門山は帰りの飛行機や列車の前に訪れられますか？", answer: "予約できる入場時刻と出発便を照らし合わせ、安全な余裕がある場合に限ります。早い便や遅い入場枠では同日訪問を勧めません。" },
  ],
  heroImage: { alt: "張家界国家森林公園の日差しを受けた砂岩の峰", caption: "張家界国家森林公園の峰林" },
  gallery: [
    { alt: "張家界大峡谷のガラス橋を渡る人々", caption: "大峡谷のガラス橋" },
    { alt: "天門山の階段の上に開く天門洞", caption: "天門山と天門洞" },
  ],
  routeMedia: [
    { day: 1, variants: [{ label: "到着と宿泊", alt: "市内ホテル候補のツインルーム", caption: "宿泊候補の参考写真" }] },
    { day: 2, variants: [{ label: "国家森林公園", alt: "砂岩の崖に沿って立つ百龍エレベーター", caption: "百龍エレベーター" }] },
    { day: 3, variants: [{ label: "大峡谷", alt: "張家界大峡谷のガラス橋を渡る人々", caption: "大峡谷のガラス橋" }] },
    { day: 4, variants: [{ label: "天門山", alt: "天門山の階段の上に開く天門洞", caption: "天門山と天門洞" }] },
  ],
  packages: stays.map((stay) => ({ id: stay.id, label: stay.ja, summary: stay.jaSummary })),
} as const;
