import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Beijing in Japanese, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "北京旅行ガイド：4〜5泊の日程と宿泊エリア",
  h1: "北京：宮殿、万里の長城、胡同をめぐる4〜5泊",
  description:
    "北京には4〜5泊を。故宮、万里の長城、胡同をめぐる旅に向けて、宿泊エリア、使う空港と駅、次の行き先を紹介します。",
  summary:
    "天安門から北へ故宮を抜け、景山に登ると、黄金色の瓦屋根が眼下一面に広がります。もう一日は郊外の山の尾根に続く万里の長城にあて、夜は鼓楼周辺の胡同を歩きながら食事を楽しみましょう。北京の大きな見どころは、それぞれ半日から丸一日かかります。4〜5泊あれば、急がずにしっかり観光できる日が3〜4日取れます。",
  heroAlt: "胡同の灰色の瓦屋根の上にそびえる北京の鼓楼と鐘楼。右手には人通りの多い路地が見える。",
  heroCaption:
    "鼓楼と鐘楼のふもとから、灰色の瓦屋根の胡同が四方に広がります。夕方に訪れて路地で食事をし、数分歩いて什刹海の湖へ向かいましょう。",
  geography: {
    title: "北京の見どころは5つの方向に分かれる",
    caption: "縮尺は実際と異なります。同じ方向にある見どころは同じ日に回れます。万里の長城は、それだけで丸一日必要です。",
    legend: {
      core: "市中心部",
      cluster: "半日以上",
      outside: "丸一日",
      gateway: "空港",
    },
    nodes: {
      axis: { label: "天安門・故宮・景山", note: "丸一日。南から北へ歩いて回る" },
      south: { label: "前門・天壇", note: "半日から丸一日" },
      northwest: { label: "頤和園・北西部", note: "最低でも半日、たいていほぼ一日がかり" },
      gulou: { label: "鼓楼・什刹海", note: "胡同の散策と夕食" },
      chaoyang: { label: "朝陽・CBD", note: "夕食や夜の街歩き。深夜に着いた後も便利" },
      wall: { label: "万里の長城", note: "往復で丸一日。ほかの予定は入れない" },
      pek: { label: "PEK", note: "北東。空港線で東直門へ" },
      pkx: { label: "PKX", note: "はるか南。空港線で草橋へ" },
    },
  },
  overview: {
    nights: {
      answer: "4〜5泊あれば、丸一日使える日が3〜4日取れます。",
      detail:
        "到着日と出発日は、ほとんど移動で終わります。3泊でも故宮と万里の長城は回れますが、たいてい頤和園が外れ、予約が取れなかったときに振り替える予備の日もありません。",
    },
    stay: {
      answer: "初めてなら、王府井か東単のあたりに泊まりましょう。",
      detail:
        "故宮に近く、地下鉄があらゆる方向へ延び、夕食の店にも困りません。胡同の四合院ホテルに泊まるなら鼓楼や什刹海の周辺で探しましょう。ただし、エレベーターがあるか、車が入口まで入れるかを先に確認してください。",
    },
    gateway: {
      answer: "切符に書かれた空港と駅を確かめてから、ホテルを予約しましょう。",
      detail:
        "北京には首都空港と大興空港の2つの空港と、8つの主要な鉄道駅があり、どれも互いに遠く離れています。首都空港に夜遅く着くなら、最初の夜は東直門の近くに泊まりましょう。上海行きの列車は北京南駅から、西安行きは北京西駅から出ることが多くなっています。出発の日には、大きな観光地の予定を入れないでください。",
    },
    next: {
      answer: "最も自然な次の目的地は西安、いちばん対照的なのは上海です。",
      detail:
        "高速鉄道で西安へ向かえば、兵馬俑と古い城壁が待っています。上海では、古都の代わりに高層ビルの街並みが広がります。時間があれば、北京・西安・上海を高速鉄道で一本の線のようにつなげられます。",
    },
  },
  opening: {
    heading: "初めての中国旅行の多くが北京から始まる理由",
    paragraphs: [
      "ひとつの街に、皇帝の宮殿、万里の長城、胡同の路地、ガラス張りの高層ビルがそろっています。朝は皇帝たちが暮らした中庭を歩き、夕食は胡同でとり、夜は国貿や三里屯のあたりで今の北京を楽しむこともできます。",
      "ここから旅を始めることには、もうひとつ利点があります。同じホテルに数日泊まるうちに時差ぼけから回復し、パスポートでの観光地の予約、地下鉄の乗り方、大きな観光地の中でどれだけ歩くかなど、中国の旅の勝手が現地でわかってきます。その後の都市は、ぐっと楽に感じられるはずです。逆に北京を最後にするなら、別の都市からの到着、万里の長城の一日、早朝の国際線を立て続けに組まないでください。ひとつ遅れが出れば、その後の予定がすべて崩れてしまいます。",
    ],
  },
  sources: {
    "https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251229_4374283.html": {
      publisher: "北京市政府",
      label: "通州駅開業後の北京の「8駅・2空港」の交通拠点体系",
    },
    "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202512/t20251231_4381067.html": {
      publisher: "北京市政府",
      label: "北京通州駅が2025年12月30日に旅客営業を開始",
    },
    "https://english.beijing.gov.cn/livinginbeijing/transportation/airport/202005/t20200516_1899219.html": {
      publisher: "北京市政府",
      label: "三元橋と東直門を経由する首都空港線のルート",
    },
    "https://english.beijing.gov.cn/travellinginbeijing/transportation/airport/202005/t20200516_1899220.html": {
      publisher: "北京市政府",
      label: "草橋へ向かう大興空港線のルート",
    },
  },
  guides: {
    "china-10-day-itinerary": "10日間で巡る中国",
    "beijing-where-to-stay-first-trip": "初めての北京、どのエリアに泊まる？",
    "beijing-courtyard-hotel-or-modern-hotel": "四合院ホテルか、近代的なホテルか",
    "which-beijing-railway-station": "北京のどの駅を使う？",
    "beijing-south-station-to-capital-or-daxing-airport": "北京南駅から首都空港・大興空港へ",
    "great-wall-section-selector-from-beijing": "万里の長城、どの区間へ行く？",
  },
};

export default content;
