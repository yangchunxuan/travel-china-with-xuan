import type { DestinationHubId } from "./destinationHubs";
import type { JapaneseCatalogTour } from "./japaneseTourCatalog";

/**
 * Japanese copy for /ja/explore/. City facts and summaries follow the English
 * destination hubs (lib/destinationHubs.ts summaries and the comparisons in
 * lib/destinationsHubI18n.ts); nothing is added beyond them. The full city
 * guides are published in English, Chinese and Korean only, so this page
 * carries the summary and hands readers to the Japanese tour pages.
 */
export interface JapaneseExploreCity {
  readonly name: string;
  readonly bestFor: string;
  readonly stay: string;
  readonly routeRole: string;
  readonly summary: string;
  readonly heroAlt: string;
}

export const japaneseExploreCities: Readonly<Record<DestinationHubId, JapaneseExploreCity>> = {
  beijing: {
    name: "北京",
    bestFor: "初めての中国旅行、歴代王朝の都の歴史、万里の長城",
    stay: "4〜5泊",
    routeRole: "北の玄関口。西安や南へ向かう旅の起点に向く",
    summary:
      "北京は一つの市の中に、かつての皇城、現代の政治の中心、胡同の街並み、広大な庭園、2つの空港と8つの主要な鉄道駅を抱えています。4〜5泊で丸一日の観光を3〜4日確保し、宿泊エリアは評判よりも先に「そこを拠点に何をするか」で選びます。万里の長城へ行く日と帰りの列車に乗る日は、同じ日に重ねないのが基本です。",
    heroAlt: "北側から見た故宮の屋根と、その先に広がる北京の中心部",
  },
  shanghai: {
    name: "上海",
    bestFor: "現代の中国、街歩き、長江デルタ",
    stay: "丸一日の市内観光を3日",
    routeRole: "国際線の玄関口。旅の始まりにも締めくくりにも使いやすい",
    summary:
      "上海は国際線の玄関口であり、街そのものにも数日かけて楽しむ価値があります。長江デルタで最も便利な交通拠点でもあります。初めての旅なら、丸一日の市内観光を3日取るのがバランスのよい滞在です。フライトや展示会の都合がなければ浦西の中心部を拠点にし、ディズニーランドや長江デルタの周辺都市は「午後のおまけ」ではなく、別の1日として組みます。",
    heroAlt: "手前に浦西の屋根、奥に浦東・陸家嘴の高層ビル群が見える夕暮れの上海",
  },
  xian: {
    name: "西安",
    bestFor: "古都の歴史、兵馬俑、城壁",
    stay: "3泊（華山に登るなら4泊）",
    routeRole: "華北と西南のあいだに入れやすい、歴史を集中して見る都市",
    summary:
      "西安は、古い広場の周りに名所が並ぶだけの街ではありません。城壁に囲まれた中心部、博物館と仏塔が集まる南部、臨潼の陵墓エリア、そして華山は、それぞれ別の1日が必要な行き先です。通常は3泊で丸一日を2日確保し、1日を臨潼、もう1日を市内にあてます。華山を加えるなら、現実的には4泊が必要です。",
    heroAlt: "夕暮れの西安の南門と城壁。大通りが北の鐘楼へ延び、その先に現代の街並みが広がる",
  },
  chengdu: {
    name: "成都",
    bestFor: "パンダ、四川料理、ゆったり過ごせる街の拠点",
    stay: "市内は2〜3泊（四川の各地へ足を延ばすなら、さらに長めに）",
    routeRole: "四川の奥へ向かう旅の、西南の拠点",
    summary:
      "成都には3つの役割があります。北京・西安・上海のあとで旅のペースを落とす街、初めてパンダに会いに行くのに最も便利な大都市の拠点、そして四川をめぐる大きな旅への入口です。市内は2〜3泊で回れます。都江堰、三星堆、楽山、九寨溝はそれぞれ別方向の行き先で、中心部のホテルから長距離を往復するのではなく、それぞれに専用の日程や宿泊を用意する必要があります。",
    heroAlt: "成都・人民公園の伝統的な茶館で、屋根の下の竹の椅子に座ってお茶を飲む人々",
  },
  guangzhou: {
    name: "広州",
    bestFor: "広東料理、嶺南文化、活気ある南の都市",
    stay: "2〜3泊",
    routeRole: "珠江デルタへの南の玄関口",
    summary:
      "広州は国際線の到着都市であり、嶺南の都市文化の中心であり、珠江デルタの鉄道の要でもあります。2泊なら旧市街をしっかり歩く1日が取れ、3泊あれば茘湾の旧市街と珠江沿いの新しい中心軸の両方を回れます。空港のターミナル、鉄道駅、ホテルのエリアは似た名前でも別の場所なので、ひとつながりの組み合わせとして一緒に選ぶ必要があります。",
    heroAlt: "広州・陳家祠の正殿。屋根の棟に沿って彫刻の装飾が並ぶ",
  },
  hangzhou: {
    name: "杭州",
    bestFor: "西湖、茶畑の風景、旅のペースを変えるひと休み",
    stay: "日帰り、または2泊",
    routeRole: "上海から無理なく延ばせる行き先。慌ただしい「ついで」にしない",
    summary:
      "杭州は、上海の隣にある「湖を見るだけの立ち寄り先」ではありません。西湖は東岸で市街地と接し、霊隠寺と龍井は西の山あいにあり、京杭大運河は北へ延び、良渚は郊外で別の1日が必要な遺跡です。よく絞った日帰りでも西湖の魅力はわかりますが、2泊あれば湖と山と地元の朝の時間を両立でき、3泊目で別のエリアへ足を延ばす余裕が生まれます。",
    heroAlt: "霧のかかる山のふもと、杭州の西湖を渡る小舟",
  },
  zhangjiajie: {
    name: "張家界",
    bestFor: "砂岩の峰々、森の散策、山の絶景",
    stay: "丸一日の観光を3日",
    routeRole: "専用の日程と拠点が必要な山岳エリア",
    summary:
      "張家界という名前は、市街地の玄関口と、入口を共有しないいくつかの山のエリアをまとめて指しています。初めての旅では丸一日の観光がたいてい3日必要で、宿泊拠点をどこにするかを、しっかり決めておく必要があります。市街地は天門山、空港、鉄道駅に近く、武陵源に泊まれば国家森林公園に朝早く入れます。大峡谷と鳳凰古城は空いた時間に寄る場所ではなく、それぞれ別にルートを決める行き先です。",
    heroAlt: "張家界国家森林公園の砂岩の柱のあいだを流れる霧",
  },
  chongqing: {
    name: "重慶",
    bestFor: "坂の多い巨大都市、夜景、刺激的な郷土料理",
    stay: "3泊",
    routeRole: "西南の玄関口。武隆は別の延長日程として組む",
    summary:
      "重慶は2つの川が交わる坂の多い巨大都市で、遠く離れた自然遺産や文化遺産まで含む広い直轄市でもあります。初めての旅では、丸一日の市内観光を2日取るために3泊が必要なことがほとんどです。宿泊エリアは「どの朝の予定を無理なく迎えられるか」で選び、切符に書かれた駅名は正確に確かめ、武隆や大足は市内の観光地の一つではなく、専用の延長日程として組みます。",
    heroAlt: "川の上に層をなして立ち上がる、重慶・渝中の密集した建物",
  },
};

export const japaneseExploreCopy = {
  metadata: {
    title: "中国の旅行先を比べる：8都市とツアー | Homeground China",
    description:
      "北京、上海、西安、成都、広州、杭州、張家界、重慶。各都市が向いている旅、滞在日数の目安、ルートの役割を比べ、その都市を訪れる日本語のツアーページから旅を選べます。",
  },
  breadcrumbLabel: "現在の位置",
  homeLabel: "ホーム",
  currentLabel: "目的地から探す",
  hero: {
    eyebrow: "中国の旅行先を比べる",
    title: "行き先から、旅を選ぶ。",
    description:
      "主要な8都市について、どんな旅に向いているか、何泊あればよいか、ルートの中でどんな役割を持つかを比べられます。気になる都市から、その都市を訪れるツアーへそのまま進めます。",
    scopeTitle: "決めたいことは何ですか？",
    scope: [
      "この都市を旅に入れるべきか",
      "何泊して、どこを拠点にするか",
      "どこから入り、どこから出て、次にどこへ行くか",
    ],
  },
  cities: {
    eyebrow: "8つの都市",
    title: "ルートを組む前に、8つの都市を比べる。",
    intro:
      "都市ごとに、向いている旅、滞在の目安、ルートの役割をまとめました。カードを選ぶと、その都市の要点と、その都市を訪れるツアーの一覧に移動します。",
    count: "8都市・日本語のツアーページ付き",
    bestForLabel: "向いている旅",
    stayLabel: "滞在の目安",
    routeRoleLabel: "ルートの役割",
    action: "この都市のツアーを見る",
  },
  citySection: {
    eyebrow: "この都市を訪れるツアー",
    tourCount: (count: number) => `${count}コース`,
    longRoutes: (count: number) => `この都市を通る周遊コース（${count}コース）`,
    guideNote:
      "この都市のくわしい旅行ガイド（宿泊エリア、空港・駅、主な見どころ）は、現在英語・中国語・韓国語で公開しています。",
    guideLink: "都市ガイド（英語）",
    backToCities: "都市の比較に戻る",
  },
  otherRegions: {
    eyebrow: "8都市以外の地域",
    title: "桂林、雲南、黄山、河西回廊、東北の冬など。",
    intro: "上の8都市を通らないコースです。地域ごとの旅は、それぞれのツアーページで日程と料金の条件をご確認ください。",
  },
  handoff: {
    eyebrow: "次のステップ",
    title: "行き先が決まっていなくても、相談できます。",
    body: "気になる都市、旅行の時期、人数をお知らせください。都市の組み合わせや日数も含めて、日本語でご案内します。",
    toursAction: "ツアー一覧を見る",
    contactTitle: "WhatsApp・メールで相談",
  },
} as const;

/**
 * Tours that visit each city. Slugs name the cities a route is built around;
 * the extra entries are routes whose day-by-day itinerary stays in a city its
 * slug does not name (the Yangtze cruises board in Chongqing, and the 21-day
 * grand tour).
 */
const extraCityTours: Partial<Record<DestinationHubId, readonly string[]>> = {
  beijing: ["china-grand-tour-21-day-private-tour"],
  shanghai: ["china-grand-tour-21-day-private-tour"],
  xian: ["china-grand-tour-21-day-private-tour"],
  chengdu: ["china-grand-tour-21-day-private-tour"],
  zhangjiajie: ["china-grand-tour-21-day-private-tour"],
  chongqing: [
    "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
    "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
    "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour",
    "china-grand-tour-21-day-private-tour",
  ],
};

export function japaneseToursForCity(
  city: DestinationHubId,
  tours: readonly JapaneseCatalogTour[],
): JapaneseCatalogTour[] {
  const extras = extraCityTours[city] ?? [];
  // Whole slug segments only: "wangxian" must not match "xian".
  return tours.filter((tour) => tour.slug.split("-").includes(city) || extras.includes(tour.slug));
}
