import { getPrivateTourSceneMode, privateTourSceneAssets, privateTourSceneMediaBySlug } from "./privateTourSceneMedia";

export type JapanesePrivateTourSceneCopy = Readonly<{
  label: string;
  alt: string;
  caption: string;
}>;

type JapaneseSceneSubject = Readonly<{ label: string; alt: string }>;
const subject = (label: string, alt: string): JapaneseSceneSubject => ({ label, alt });

// These subjects describe the exact, previously reviewed source photograph.
// They do not inherit another day's sightseeing or service promises.
const subjects: Readonly<Record<string, JapaneseSceneSubject>> = {
  "added-volga": subject("冬のヴォルガ・マナー", "ヴォルガ・マナーに再建された聖ニコライの建物と雪景色"),
  "added-zhenyuan": subject("鎮遠古城の川辺", "鎮遠古城の川辺"),
  "added-chengqi": subject("承啓楼", "承啓楼"),
  "added-xidi": subject("西逓の古村", "西逓古村の入口"),
  "added-chengkan": subject("呈坎の古村", "呈坎の古村"),
  "added-sanqingshan": subject("三清山", "三清山"),
  "added-shangrao": subject("上饒駅", "上饒駅"),
  "added-changbai": subject("長白山の冬景色", "和平スキー場付近から望む長白山の冬景色"),
  "added-zhengzhou": subject("鄭州の街並み", "鄭州の街並み"),
  "added-whitehorse": subject("洛陽の白馬寺", "洛陽の白馬寺"),
  "added-dam": subject("三峡ダム", "三峡ダム"),
  "added-datong": subject("大同の城壁", "大同の城壁"),
  "added-taiyuan": subject("太原の汾河公園", "太原の汾河公園"),
  "added-jinci": subject("晋祠", "晋祠の橋と古建築"),
  "added-hailar": subject("ハイラルの街並み", "ハイラルの街並み"),
  "added-genhe": subject("根河の森林風景", "根河付近の大興安嶺の川と森林"),
  "added-manzhouli": subject("満洲里の街並み", "満洲里の街並み"),
  "added-hulun": subject("呼倫湖", "呼倫湖"),
  "added-gorge": subject("虎跳峡", "虎跳峡"),
  "added-songzanlin": subject("松賛林寺", "周囲の山々を背にした松賛林寺"),
  "added-jiaohe": subject("トルファンの交河故城", "トルファン近郊に残る交河故城の土の遺構"),
  "added-tianchi": subject("天山天池", "新疆・天山天池の湖水と山々"),
  "added-urumqi": subject("紅山から望むウルムチ", "紅山から望むウルムチ"),
  "beijing-city": subject("北京の街並み", "夜の北京の高架道路と現代的な高層ビル群"),
  "beijing-departure": subject("北京の街並み", "北京の歴史的な屋根と、その向こうに見える現代のCBD"),
  "forbidden-city": subject("故宮", "北京の故宮にある赤い宮殿の回廊"),
  "forbidden-tower": subject("故宮の角楼", "夕暮れの堀に映る故宮の角楼"),
  "temple-heaven": subject("天壇", "2024年9月、青空の下に立つ北京の天壇祈年殿"),
  "summer-palace": subject("頤和園", "頤和園の十七孔橋"),
  "great-wall": subject("長城の風景", "北京北部の山の稜線に続く、修復された長城"),
  "xian-city": subject("西安の街並み", "西安城壁の上に広がる歩行路"),
  "xian-wall": subject("西安城壁", "西安城壁の城楼"),
  "terracotta": subject("兵馬俑", "臨潼の兵馬俑一号坑に並ぶ陶製の兵士たち"),
  "xian-food": subject("西安の旧市街", "西安の回民街の商店と行き交う人々"),
  "chengdu-city": subject("成都の街並み", "成都中心部の錦江と屋根のある橋"),
  "chengdu-departure": subject("成都の街並み", "夜の成都IFSと市中心部を行き交う車"),
  "panda": subject("成都パンダ基地", "成都ジャイアントパンダ繁育研究基地のパンダ"),
  "teahouse": subject("成都の茶館", "成都の街角にある静かな茶館のテラス"),
  "sanxingdui": subject("三星堆博物館", "三星堆博物館の新館外観と入口前の広場"),
  "leshan": subject("楽山大仏", "楽山大仏"),
  "chongqing-city": subject("重慶の川沿い", "嘉陵江沿いに灯る洪崖洞と川に架かる大橋"),
  "chongqing-sunset": subject("重慶の街並み", "夕暮れ時、川の対岸に広がる重慶の街並み"),
  "liziba": subject("李子壩のモノレール", "重慶軌道交通2号線の列車が通る李子壩駅と、上下に広がる建物や道路"),
  "wulong": subject("天生三橋", "武隆の天生三橋に広がるカルスト地形"),
  "wulong-meadow": subject("仙女山", "武隆・仙女山の草原"),
  "cruise-ship": subject("長江クルーズ船", "長江を航行するクルーズ船の一例"),
  "qutang": subject("瞿塘峡", "長江の瞿塘峡"),
  "wu-gorge": subject("巫峡", "船から眺める長江の巫峡"),
  "guilin-city": subject("桂林の街並み", "桂林の市街地と周囲のカルストの山々"),
  "guilin-pagodas": subject("桂林の湖畔", "夕暮れの湖に映る桂林の日月双塔"),
  "li-river": subject("漓江クルーズ", "漓江のカルストの山々の間を進む遊覧船"),
  "yulong": subject("遇龍河の田園", "陽朔のカルストの山々を背景に広がる竹いかだ、田畑と川面"),
  "longji": subject("龍脊の棚田", "黄金色の龍脊の棚田と村落"),
  "shanghai-arrival": subject("上海の街並み", "朝の静かな外灘の遊歩道と黄浦江"),
  "shanghai-skyline": subject("上海のスカイライン", "夕日を浴びる上海タワーと上海環球金融中心"),
  "shanghai-bund": subject("外灘", "上海の外灘に並ぶ歴史的建築"),
  "shanghai-night": subject("上海の夜景", "黄浦江の両岸に灯る上海の高層ビル群"),
  "shanghai-departure": subject("上海の街並み", "上海の高層ビル群を望む水辺の遊歩道"),
  "yu-garden": subject("豫園", "豫園の伝統的な建物と池"),
  "french-concession": subject("旧フランス租界の街並み", "2013年に撮影された上海・延慶路の木陰の街並み"),
  "disney": subject("上海ディズニーランド", "上海ディズニーランドのエンチャンテッド・ストーリーブック・キャッスル"),
  "suzhou-garden": subject("拙政園", "蘇州の拙政園の亭、回廊と池"),
  "pingjiang": subject("平江路", "平江路の石橋、運河と白壁の民家"),
  "hangzhou-lake": subject("西湖", "杭州の西湖の岸辺に立つ亭"),
  "hangzhou-tea": subject("杭州の茶畑", "梅家塢の古木の下を通る石畳の道と茶畑"),
  "lingyin": subject("飛来峰", "霊隠寺近くの飛来峰の岩壁に刻まれた仏教彫刻"),
  "zhangjiajie-peaks": subject("武陵源の峰林", "張家界・武陵源の砂岩の峰々"),
  "zhangjiajie-tianzi": subject("天子山", "天子山に重なり合う砂岩の峰々を見下ろす景色"),
  "tianmen": subject("天門山", "天門山の天門洞へ続く長い階段"),
  "fenghuang": subject("鳳凰古城", "鳳凰古城の虹橋の入口"),
  "fenghuang-river": subject("鳳凰の沱江", "鳳凰の沱江で飛び石を渡る人々"),
  "kunming": subject("昆明の翠湖", "昆明の翠湖"),
  "stone-forest": subject("石林", "水面に映る石林の岩柱"),
  "dali-erhai": subject("洱海", "大理の洱海の湖の景色"),
  "xizhou": subject("喜洲", "白族の村、喜洲の牌坊"),
  "lijiang": subject("麗江古城", "麗江古城に連なる屋根"),
  "jade-dragon": subject("玉龍雪山", "雲南省の玉龍雪山"),
  "xijiang": subject("西江苗寨", "山の斜面に広がる西江のミャオ族の村"),
  "xiamen": subject("厦門の鼓浪嶼", "厦門の鼓浪嶼の街区と屋根を見下ろす景色"),
  "quanzhou": subject("泉州の開元寺", "泉州の開元寺の双塔"),
  "shantou": subject("汕頭の旧市街", "汕頭の歴史地区に並ぶ騎楼の街並み"),
  "chaozhou-street": subject("潮州の旧市街", "潮州古城の牌坊街"),
  "guangzhou": subject("広州の街並み", "夜の広州タワーと珠江"),
  "qinghui": subject("清暉園", "順徳の清暉園"),
  "huangshan": subject("黄山", "黄山の花崗岩の峰々"),
  "jingdezhen": subject("景徳鎮御窯博物館", "景徳鎮御窯博物館"),
  "wangxian": subject("望仙谷", "日暮れ時の望仙谷"),
  "yanji-night": subject("延吉の夜景", "夜の延吉の街並み"),
  "yanji-signs": subject("延吉の街並み", "延辺大学周辺の朝鮮語と中国語の看板"),
  "shaolin": subject("少林寺", "少林寺の建物"),
  "pingyao": subject("平遥古城", "平遥古城を見下ろす景色"),
  "zhangye": subject("張掖丹霞", "張掖の七彩丹霞"),
  "jiayuguan": subject("嘉峪関", "嘉峪関の関城"),
  "dunhuang": subject("鳴沙山と月牙泉", "鳴沙山と月牙泉"),
  "mogao": subject("莫高窟の外観", "莫高窟の崖面と洞窟の入口"),
  "sayram": subject("賽里木湖", "新疆の賽里木湖"),
  "nalati": subject("那拉提草原", "那拉提の草原"),
  "yining": subject("伊寧のイリ川", "伊寧を流れるイリ川"),
  "jianshui": subject("建水の孔子廟", "建水の孔子廟"),
  "yuanyang": subject("元陽の棚田", "2007年12月に撮影された元陽の棚田"),
  "shenzhen": subject("深圳の福田地区", "深圳の福田地区の高層ビル群"),
  "shenzhen-museum": subject("深圳科学技術館", "深圳科学技術館の内部"),
  "hong-kong": subject("香港の港", "ビクトリア・ハーバー沿いに広がる香港の高層ビル群"),
  "jiuzhaigou-preview": subject("九寨溝", "九寨溝の五花海"),
  "dazu": subject("大足石刻", "大足・宝頂山の石刻"),
  "guiyang": subject("貴陽の街並み", "貴陽の南明河のほとりにある甲秀楼"),
};

const bySource = new Map<string, { id: string; subject: JapaneseSceneSubject }>();
for (const [id, asset] of Object.entries(privateTourSceneAssets)) {
  const copy = subjects[id];
  if (!copy) throw new Error(`Japanese scene subject is missing: ${id}`);
  if (bySource.has(asset.image.src)) throw new Error(`Japanese scene source is ambiguous: ${asset.image.src}`);
  bySource.set(asset.image.src, { id, subject: copy });
}

function captionFor(id: string, copy: JapaneseSceneSubject, mode: "scene" | "preview" | "option"): string {
  if (id === "added-changbai") {
    return "長白山の冬景色｜実際のスキー場は旅行日程に合わせて確認";
  }
  if (id === "great-wall") {
    return "北京近郊の長城の風景";
  }
  if (id === "cruise-ship") {
    return "長江クルーズ船の一例｜実際の船はご予約の航期で確認";
  }
  if (mode === "preview") {
    return `${copy.alt}｜目的地の風景`;
  }
  if (mode === "option") {
    return `${copy.alt}｜行程の選択肢`;
  }
  return copy.alt;
}

type JapaneseSceneGroup = Readonly<{
  day: number;
  variants: readonly (JapanesePrivateTourSceneCopy & Readonly<{ src: string }>)[];
}>;

/** Only these exact tour/day/source combinations authorize an added variant. */
export const japanesePrivateTourSceneMediaBySlug: Readonly<Record<string, readonly JapaneseSceneGroup[]>> = Object.freeze(
  Object.fromEntries(Object.entries(privateTourSceneMediaBySlug).map(([slug, groups]) => [
    slug,
    groups.map((group) => ({
      day: group.day,
      variants: group.variants.map((variant) => {
        const source = bySource.get(variant.image.src);
        if (!source) throw new Error(`Japanese scene image is unregistered: ${slug}/${group.day}/${variant.image.src}`);
        const mode = getPrivateTourSceneMode(slug, group.day, variant.image.src);
        if (!mode) throw new Error(`Japanese scene mode is unregistered: ${slug}/${group.day}/${variant.image.src}`);
        return {
          src: variant.image.src,
          label: source.subject.label,
          alt: source.subject.alt,
          caption: captionFor(source.id, source.subject, mode),
        };
      }),
    })),
  ])),
);

export function getJapanesePrivateTourSceneCopy(
  slug: string,
  day: number,
  src: string,
): JapanesePrivateTourSceneCopy | undefined {
  return japanesePrivateTourSceneMediaBySlug[slug]?.find((group) => group.day === day)?.variants.find((variant) => variant.src === src);
}
