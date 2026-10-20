import type { DestinationsHubEditionCopy } from "./destinationsHubEditions";

/**
 * The destinations hub (/ja/explore/, components/DestinationsHubPage.tsx) in
 * Japanese: the English hub's words, translated as for French, German,
 * Spanish and Arabic (lib/destinationsHubEditions.ts), with every number as
 * the English states it. Kept in a Japanese-only file so its text stays out of
 * the Chinese serif font subset.
 *
 * The page keeps its existing Japanese title. The city comparisons are the
 * words the Japanese hub already used, and each photo's text is the Japanese
 * city page's own hero alt (a test keeps them equal).
 */
export const japaneseDestinationsHubCopy: DestinationsHubEditionCopy = {
  metadata: { title: "中国の旅行先を比べる：8都市とツアー" },
  section: {
    eyebrow: "中国の旅行先を比べる",
    title: "中国で訪れたい、おすすめの旅行先。",
    description:
      "拠点となる8つの都市について、どんな旅に向いているか、どのくらいの日数をとればよいか、より大きなルートの中でどんな役割を担えるかを比べられます。",
    scopeTitle: "決めたいことは何ですか？",
    scope: [
      "どの都市を旅に入れるべきか",
      "何泊して、どこを拠点にするか",
      "どこから入り、どこから出て、次にどこへ行くか",
    ],
  },
  cityEyebrow: "都市ガイド",
  cityTitle: "ルートを組む前に、8つの都市を比べる。",
  cityIntroduction: (count) =>
    `この${count}都市のガイドで、旅との相性、必要な日数、ルートでの役割を比べられます。ガイドを開くと、宿泊エリア、到着する空港や駅、主な見どころ、次に向かいやすい目的地がわかります。`,
  cityCount: (count) => `${count}都市のガイドを公開中`,
  bestForLabel: "向いている旅",
  stayLabel: "滞在の目安",
  routeRoleLabel: "ルートの役割",
  cityComparisons: {
    beijing: {
      bestFor: "初めての中国旅行、歴代王朝の都の歴史、万里の長城",
      stay: "4〜5泊",
      routeRole: "北の玄関口。西安や南へ向かう旅の起点に向く",
    },
    shanghai: {
      bestFor: "現代の中国、街歩き、長江デルタ",
      stay: "丸一日の市内観光を3日",
      routeRole: "国際線の玄関口。旅の始まりにも締めくくりにも使いやすい",
    },
    xian: {
      bestFor: "古都の歴史、兵馬俑、城壁",
      stay: "3泊（華山に登るなら4泊）",
      routeRole: "華北と西南のあいだに入れやすい、歴史を集中して見る都市",
    },
    chengdu: {
      bestFor: "パンダ、四川料理、ゆったり過ごせる街の拠点",
      stay: "市内は2〜3泊（四川の各地へ足を延ばすなら、さらに長めに）",
      routeRole: "四川の奥へ向かう旅の、西南の拠点",
    },
    guangzhou: {
      bestFor: "広東料理、嶺南文化、活気ある南の都市",
      stay: "2〜3泊",
      routeRole: "珠江デルタへの南の玄関口",
    },
    hangzhou: {
      bestFor: "西湖、茶畑の風景、旅のペースを変えるひと休み",
      stay: "日帰り、または2泊",
      routeRole: "上海から無理なく延ばせる行き先。慌ただしい「ついで」にしない",
    },
    zhangjiajie: {
      bestFor: "砂岩の峰々、森の散策、山の絶景",
      stay: "丸一日の観光を3日",
      routeRole: "専用の日程と拠点が必要な山岳エリア",
    },
    chongqing: {
      bestFor: "坂の多い巨大都市、夜景、刺激的な郷土料理",
      stay: "3泊",
      routeRole: "西南の玄関口。武隆は別の延長日程として組む",
    },
  },
  cityImageAlt: {
    beijing: "胡同の灰色の瓦屋根の上にそびえる北京の鼓楼と鐘楼。右手には人通りの多い路地が見える。",
    shanghai: "夕暮れの蘇州河に架かる2本の橋。手前に浦西の古い建物、奥に東方明珠タワーと上海タワーが見える。",
    xian: "深い青の夕空を背に、金色にライトアップされた西安の鐘楼。手前を行き交う車のライトが光の筋を描いている。",
    chengdu: "成都・人民公園の茶館で、赤い提灯が下がる屋根付きの木造のあずまやの下、竹の椅子に座ってお茶を飲む人々。",
    guangzhou: "泮渓酒家の丸テーブルに並ぶ、蒸籠に入った点心、赤い腸粉、急須、真鍮のやかん、籐で編んだ保温ポット。",
    hangzhou: "霧と木々に覆われた山のふもと、杭州の西湖を渡る小舟。",
    zhangjiajie: "張家界国家森林公園で、頂に木々をいただく灰色と黄褐色の高い砂岩の柱。その間を白い霧が漂っている。",
    chongqing: "夕暮れの嘉陵江越しに見る渝中のスカイライン。右手には赤くライトアップされた千厮門大橋。",
  },
  openCity: "都市ガイドを読む",
  winterGuideLabel: "12月、1月、2月に旅行しますか？冬の旅行先を比べる",
  scaleEyebrow: "場所の種類から探す",
  scaleTitle: "都市名の先にあるものを見る。",
  scaleIntroduction:
    "問いが地理に関わるときは、これらの場所の一覧を使ってください。どの地域か、どんなタイプの都市か、どの見どころや風景をルートに入れるかを考えられます。",
  openScale: "場所を見る",
  collections: {
    "explore-regions-provinces": {
      label: "地域と省",
      description: "地域ごとの風景、省ごとの個性、複数の都市にまたがる地理を、旅程に組み込む前に解説します。",
    },
    "explore-cities-neighborhoods": {
      label: "都市と地区",
      description: "街のつくり、地区ごとの個性、日々の暮らしの公共空間。有名な見どころのチェックリストだけではありません。",
    },
    "explore-attractions-nature-heritage": {
      label: "見どころ、自然、遺産",
      description: "遺産、博物館、風景を、その意味、予約の条件、無理のない見学の順序から解説します。",
    },
  },
  handoffEyebrow: "場所とは別の疑問ですか？",
  handoffTitle: "場所ではなく答えが必要なときは、実用ガイドへ。",
  handoffBody:
    "入国のルール、支払い、交通、ホテル選び、旅行の時期は、検索できる実用ガイドにまとめています。公開中の旅程は、プライベートツアーでご覧いただけます。",
  guidesAction: "実用ガイドを見る",
  toursAction: "プライベートツアーを比べる",
};
