import { privateTourAdditionalMediaBySlug } from "./privateTourPhotoAdditions";

type JapanesePhotoCopy = Readonly<{
  label: string;
  alt: string;
  caption: string;
}>;

type PhotoEntry = JapanesePhotoCopy & Readonly<{ src: string }>;

const photo = (
  slug: string,
  day: number,
  label: string,
  alt: string,
  caption: string,
  file = "route-day-" + day + ".webp",
): PhotoEntry => ({
  src: "/images/tours/" + slug + "/" + file,
  label,
  alt,
  caption,
});

const extra = (
  slug: string,
  day: number,
  label: string,
  alt: string,
  caption: string,
): PhotoEntry => photo(slug, day, label, alt, caption, "route-day-" + day + "-extra.webp");

/** Japanese copy for the added photographs only, keyed by their exact image path. */
const additions: readonly PhotoEntry[] = [
  photo(
    "chengdu-jiuzhaigou-huanglong-6-day-private-tour", 3,
    "九寨溝・長海", "九寨溝の長海",
    "九寨溝の長海。水位や水の色は季節によって変わります。",
  ),
  photo(
    "guizhou-huangguoshu-libo-miao-7-day-private-tour", 2,
    "黄果樹瀑布", "貴州省の黄果樹瀑布",
    "黄果樹瀑布。水量は季節や天候によって変わります。",
    "route-day-2-huangguoshu.webp",
  ),
  photo(
    "xiamen-tulou-quanzhou-6-day-private-tour", 3,
    "田螺坑土楼群", "福建省の田螺坑土楼群",
    "田螺坑土楼群。見学ルートと展望地点は当日の開放状況によります。",
  ),
  photo(
    "chaozhou-shantou-nanao-5-day-private-tour", 3,
    "広済橋", "潮州の広済橋",
    "潮州の広済橋。開放状況と橋を渡れるかどうかは旅行日に確認します。",
    "route-day-3-guangji.webp",
  ),
  photo(
    "luoyang-dengfeng-kaifeng-6-day-private-tour", 4,
    "龍門石窟", "洛陽の龍門石窟の仏像",
    "洛陽の龍門石窟。短い写真撮影だけで終わらないよう、見学時間を設けています。",
  ),
  photo(
    "datong-pingyao-6-day-private-tour", 2,
    "雲崗石窟", "大同近郊の雲崗石窟の彫像",
    "大同近郊の雲崗石窟。個々の洞窟の公開状況は変わる場合があります。",
  ),
  photo(
    "xinjiang-ili-sayram-8-day-private-tour", 2,
    "賽里木湖", "新疆の賽里木湖",
    "西へ向かう道中の賽里木湖。景色と道路の通行状況は季節によって変わります。",
  ),
  photo(
    "hulunbuir-7-day-private-tour", 2,
    "フルンボイル草原", "フルンボイルの広い草原",
    "フルンボイルの草原。草の色と天候は旅行時期によって変わります。",
  ),
  photo(
    "kunming-jianshui-yuanyang-6-day-private-tour", 4,
    "元陽の棚田", "元陽のハニ族の棚田",
    "元陽のハニ族の棚田。水面、色合い、見通しは季節によって変わります。",
  ),
  photo(
    "shenzhen-family-tech-4-day-private-tour", 1,
    "深圳の街並み", "深圳の都市景観",
    "到着地の深圳を紹介する街の写真です。空港やホテルの写真ではありません。",
  ),
  extra(
    "beijing-xian-shanghai-12-day-private-tour", 7,
    "西安城壁", "西安城壁の街並み",
    "西安城壁と旧市街の様子。歩く距離は皆さまのペースに合わせて調整します。",
  ),
  extra(
    "beijing-xian-guilin-shanghai-10-day-private-tour", 7,
    "漓江", "桂林近郊の漓江とカルストの山々",
    "漓江の景色。船の航路と川の状況は旅行日に確認します。",
  ),
  extra(
    "chengdu-chongqing-8-day-private-tour", 1,
    "成都の街並み", "2017年に撮影された成都の都市景観",
    "2017年に撮影された成都の街。到着地を紹介する写真で、空港やホテルではありません。",
  ),
  extra(
    "kunming-dali-lijiang-8-day-private-tour", 6,
    "束河古鎮", "麗江近郊の束河古鎮の入口",
    "麗江近郊の束河古鎮。この日に立ち寄る場所の一つです。",
  ),
  extra(
    "guangzhou-shunde-foshan-5-day-private-tour", 2,
    "花城広場", "広州の花城広場",
    "広州市内を巡る日に訪ねる花城広場です。",
  ),
  extra(
    "xiamen-tulou-quanzhou-6-day-private-tour", 1,
    "鼓浪嶼", "厦門の鼓浪嶼",
    "厦門の鼓浪嶼。当日の島への訪問は到着時刻とフェリーの空席状況によります。",
  ),
  extra(
    "chaozhou-shantou-nanao-5-day-private-tour", 2,
    "南澳島", "南澳島の長山尾灯台と南澳大橋",
    "南澳島の長山尾灯台と大橋。海辺の様子は天候によって変わります。",
  ),
  extra(
    "huangshan-hongcun-huizhou-5-day-private-tour", 3,
    "宏村", "宏村の池と伝統的な村の建物",
    "黄山から下りた後に立ち寄る宏村。滞在時間は山上での見学と移動のペースに合わせます。",
  ),
  extra(
    "jingdezhen-wuyuan-wangxian-6-day-private-tour", 2,
    "景徳鎮の陶磁器", "景徳鎮の伝統的な磁器窯",
    "景徳鎮の伝統的な磁器窯。訪問する工房は旅行前に確認します。",
  ),
  extra(
    "changbaishan-yanji-winter-6-day-private-tour", 3,
    "長白山の天池", "雪に囲まれた長白山の天池",
    "冬の長白山・天池。立ち入りと見通しは天候次第で、見られることを保証するものではありません。",
  ),
  extra(
    "beijing-xian-guilin-hong-kong-10-day-private-tour", 9,
    "香港の街並み", "港のそばに広がる香港の街並み",
    "鉄道で香港に到着する日の街の写真です。列車や駅を写したものではありません。",
  ),
  photo(
    "harbin-winter-5-day-private-tour", 1,
    "ハルビンの街並み", "2018年、雪のハルビン中央大街",
    "2018年に撮影されたハルビンの街。到着日の観光予定はなく、積雪も当日の天候によります。",
    "central-street-winter-1600.jpg",
  ),
  photo(
    "harbin-winter-5-day-private-tour", 4,
    "氷雪大世界", "2026年のハルビン氷雪大世界の氷の滑り台",
    "2026年の氷雪大世界の滑り台エリア。開園期間、施設、体験内容はシーズンによって変わります。",
    "ice-slide-1600.webp",
  ),
  extra(
    "shanghai-disneyland-5-day-private-tour", 4,
    "上海の旧フランス租界", "2013年に撮影された上海・延慶路の並木道",
    "2013年に撮影された上海・延慶路の街並み。ディズニーランドではなく市内の写真です。",
  ),
  extra(
    "zhangye-jiayuguan-dunhuang-7-day-private-tour", 5,
    "莫高窟の外観", "莫高窟の崖面と洞窟の入口",
    "莫高窟の外観。洞窟内部の見学は確定した入場券と現地の規則によります。",
  ),
  extra(
    "chongqing-yangtze-cruise-6-day-private-tour", 5,
    "巫峡", "船から見た長江の巫峡",
    "長江の巫峡。天候、水位、船の航路は選ぶクルーズ便によって変わります。",
  ),
  extra(
    "xian-terracotta-warriors-5-day-private-tour", 4,
    "小雁塔", "西安博物院のエリアにある小雁塔",
    "2011年に撮影された小雁塔。入場できるかどうかは旅行日に確認します。",
  ),
  extra(
    "chongqing-wulong-5-day-private-tour", 4,
    "仙女山（選択肢）", "武隆・仙女山の草原",
    "仙女山は4日目に選べる景色の一例です。仙女山と芙蓉洞のどちらを含めるかは、書面の確認書に明記します。",
  ),
  extra(
    "guilin-yangshuo-5-day-private-tour", 5,
    "桂林の街並み", "桂林市街と周囲のカルストの山々",
    "出発日の桂林を紹介する写真です。5日目に観光地への立ち寄りは予定していません。",
  ),
  extra(
    "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour", 2,
    "景山から見た故宮", "景山から見下ろした故宮",
    "この行程で訪ねる北京の故宮を景山から撮影。入場状況、天候、訪問順は旅行日に確認します。",
  ),
  extra(
    "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour", 8,
    "成都パンダ基地のジャイアントパンダ", "成都パンダ基地のジャイアントパンダ",
    "成都パンダ基地の写真です。動物の見え方や見学できる範囲は当日の状況によります。",
  ),
  extra(
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour", 7,
    "武陵源の峰林", "張家界・武陵源の砂岩の峰々",
    "張家界の武陵源の風景。展望や通行できる場所は天候と現地の開放状況によります。",
  ),
  extra(
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour", 10,
    "漓江のカルスト景観", "漓江沿いのカルストの山々",
    "桂林・漓江の写真。船の運航と川の状況は旅行日に確認します。",
  ),
  extra(
    "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour", 12,
    "長江・瞿塘峡", "長江の瞿塘峡",
    "長江クルーズの瞿塘峡。天候、水位、船の実際の航路は選ぶ便によります。",
  ),
  extra(
    "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour", 2,
    "景山から見た故宮", "景山から見下ろした故宮",
    "北京の故宮を景山から撮影。入場状況、天候、訪問順は旅行日に確認します。",
  ),
  extra(
    "beijing-xian-silk-road-15-day-private-tour", 9,
    "莫高窟の外観", "莫高窟の崖面と洞窟の入口",
    "莫高窟の外観。内部見学は確定した入場券と現地の規則によります。",
  ),
  extra(
    "beijing-xian-silk-road-15-day-small-group-tour", 9,
    "莫高窟の外観", "莫高窟の崖面と洞窟の入口",
    "莫高窟の外観。内部見学は確定した入場券と現地の規則によります。",
  ),
  extra(
    "beijing-xian-yunnan-14-day-private-tour", 10,
    "玉龍雪山", "雲南省の玉龍雪山",
    "麗江近郊の玉龍雪山。山の見え方や景区内の移動は天候と当日の運行状況によります。",
  ),
  extra(
    "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour", 8,
    "宏村", "安徽省の宏村の村並み",
    "黄山エリアで訪ねる宏村。見学できる場所と当日の順序は旅行日に確認します。",
  ),
  extra(
    "china-grand-tour-21-day-private-tour", 13,
    "武陵源の峰林", "張家界・武陵源の砂岩の峰々",
    "張家界の武陵源の風景。展望や通行できる場所は天候と現地の開放状況によります。",
  ),
  extra(
    "beijing-hangzhou-suzhou-shanghai-11-day-private-tour", 6,
    "杭州・西湖の断橋", "杭州の西湖にある断橋",
    "杭州の西湖にある断橋。湖畔の見え方と訪問順は旅行日の状況によります。",
  ),
  extra(
    "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour", 7,
    "鳳凰古城の虹橋入口", "鳳凰古城の虹橋付近の入口",
    "湖南省・鳳凰古城の虹橋付近。見学できる場所や訪問順は旅行日に確認します。",
  ),
  extra(
    "beijing-xian-shanghai-8-day-private-tour", 2,
    "景山から見た故宮", "景山から見下ろした故宮",
    "北京の故宮を景山から撮影。入場状況、天候、訪問順は旅行日に確認します。",
  ),
  extra(
    "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour", 8,
    "長江・瞿塘峡", "長江の瞿塘峡",
    "長江クルーズの瞿塘峡。天候、水位、船の実際の航路は選ぶ便によります。",
  ),
];

const entries = Object.fromEntries(additions.map(({ src, label, alt, caption }) => [
  src, { label, alt, caption },
])) as Record<string, JapanesePhotoCopy>;
const sourcePaths = Object.values(privateTourAdditionalMediaBySlug).flatMap((groups) =>
  groups.flatMap((group) => group.variants.map((variant) => variant.image.src))
);

if (
  additions.length !== sourcePaths.length ||
  Object.keys(entries).length !== additions.length ||
  sourcePaths.some((src) => !entries[src])
) {
  throw new Error("Japanese copy must cover every added private-tour photo exactly once");
}

export const japanesePrivateTourPhotoAdditionsBySrc: Readonly<
  Record<string, JapanesePhotoCopy>
> = Object.freeze(entries);
