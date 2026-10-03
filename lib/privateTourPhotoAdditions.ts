import type {
  LocalizedText,
  PrivateTourRouteMediaGroup,
} from "./privateTourProducts";
import type { PrivateTourPhotoCredit } from "./privateTourPhotoCredits";

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });

type Addition = Readonly<{
  slug: string;
  day: number;
  file?: string;
  label: LocalizedText;
  alt: LocalizedText;
  caption: LocalizedText;
  author: string;
  filePage: string;
  license: string;
  licenseUrl: string;
}>;

// File pages, hashes and crop details are recorded in the five
// docs/homeground-photo-additions-2026-09-28*.md batch records.
const additions: readonly Addition[] = [
  {
    slug: "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
    day: 3,
    label: l("Jiuzhaigou Long Lake", "九寨沟长海", "구채구 창하이"),
    alt: l("Long Lake in Jiuzhaigou", "九寨沟长海实景", "구채구 창하이 호수"),
    caption: l("Long Lake in Jiuzhaigou. Water and colours vary with the season.", "九寨沟长海实景；水位与颜色随季节变化。", "구채구 창하이의 모습입니다. 수위와 색은 계절에 따라 달라집니다."),
    author: "Suicasmo",
    filePage: "https://commons.wikimedia.org/wiki/File:Long_Lake_(Jiuzhaigou)_20260511-2.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "guizhou-huangguoshu-libo-miao-7-day-private-tour",
    day: 2,
    file: "route-day-2-huangguoshu.webp",
    label: l("Huangguoshu Waterfall", "黄果树瀑布", "황궈수 폭포"),
    alt: l("Huangguoshu Waterfall in Guizhou", "贵州黄果树瀑布", "구이저우 황궈수 폭포"),
    caption: l("Huangguoshu Waterfall. The water flow changes by season and weather.", "黄果树瀑布实景；水量随季节和天气变化。", "황궈수 폭포의 모습입니다. 수량은 계절과 날씨에 따라 달라집니다."),
    author: "Robinliu",
    filePage: "https://commons.wikimedia.org/wiki/File:Huangguoshu_Waterfall_-_Pixabay.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "xiamen-tulou-quanzhou-6-day-private-tour",
    day: 3,
    label: l("Tianluokeng Tulou", "田螺坑土楼", "톈뤄컹 토루"),
    alt: l("Tianluokeng Tulou cluster in Fujian", "福建田螺坑土楼群", "푸젠 톈뤄컹 토루 군락"),
    caption: l("The Tianluokeng Tulou cluster in Fujian; the route and viewpoints depend on access that day.", "福建田螺坑土楼群；具体游览路线和观景点以当天开放情况为准。", "푸젠 톈뤄컹 토루 군락입니다. 실제 동선과 전망대는 당일 출입 상황에 따릅니다."),
    author: "Motohiro Sunouchi",
    filePage: "https://commons.wikimedia.org/wiki/File:Tianluokeng_Tulou_cluster_DSC5269_(16013519850).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "chaozhou-shantou-nanao-5-day-private-tour",
    day: 3,
    file: "route-day-3-guangji.webp",
    label: l("Guangji Bridge", "广济桥", "광지교"),
    alt: l("Guangji Bridge in Chaozhou", "潮州广济桥", "차오저우 광지교"),
    caption: l("Guangji Bridge in Chaozhou; opening and bridge access are checked for the travel date.", "潮州广济桥实景；开放及上桥安排以出行日期确认。", "차오저우 광지교의 모습입니다. 개방과 통행은 여행 날짜에 확인합니다."),
    author: "Cynthia Yang, Gao",
    filePage: "https://commons.wikimedia.org/wiki/File:Mmexport1730939029039.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    slug: "luoyang-dengfeng-kaifeng-6-day-private-tour",
    day: 4,
    label: l("Longmen Grottoes", "龙门石窟", "룽먼 석굴"),
    alt: l("Carvings at Longmen Grottoes in Luoyang", "洛阳龙门石窟造像", "뤄양 룽먼 석굴 조각"),
    caption: l("Longmen Grottoes in Luoyang; the visit focuses on the grottoes rather than a quick photo stop.", "洛阳龙门石窟实景；这天为石窟留出主要游览时间。", "뤄양 룽먼 석굴의 모습입니다. 이날은 짧은 사진 정류장보다 석굴 관람에 시간을 둡니다."),
    author: "A1AA1A",
    filePage: "https://commons.wikimedia.org/wiki/File:龙门-Buddha.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "datong-pingyao-6-day-private-tour",
    day: 2,
    label: l("Yungang Grottoes", "云冈石窟", "윈강 석굴"),
    alt: l("Sculpture at Yungang Grottoes near Datong", "大同云冈石窟造像", "다퉁 인근 윈강 석굴 조각"),
    caption: l("Yungang Grottoes near Datong; actual access to individual caves may change.", "大同云冈石窟实景；具体洞窟开放情况可能变化。", "다퉁 인근 윈강 석굴입니다. 개별 동굴의 입장 가능 여부는 달라질 수 있습니다."),
    author: "Dudva",
    filePage: "https://commons.wikimedia.org/wiki/File:Yungang_Grottoes_03.2025._8.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "xinjiang-ili-sayram-8-day-private-tour",
    day: 2,
    label: l("Sayram Lake", "赛里木湖", "싸이리무호"),
    alt: l("Sayram Lake in Xinjiang", "新疆赛里木湖", "신장 싸이리무호"),
    caption: l("Sayram Lake on the way west; scenery and road access change with the season.", "西行路上的赛里木湖；景色与道路开放随季节变化。", "서쪽으로 가는 길의 싸이리무호입니다. 풍경과 도로 통행은 계절에 따라 달라집니다."),
    author: "Fumikas Sagisavas",
    filePage: "https://commons.wikimedia.org/wiki/File:Sayram_Lake_scenery.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "hulunbuir-7-day-private-tour",
    day: 2,
    label: l("Hulunbuir Grassland", "呼伦贝尔草原", "후룬베이얼 초원"),
    alt: l("Open grassland in Hulunbuir", "呼伦贝尔开阔草原", "후룬베이얼의 넓은 초원"),
    caption: l("Grassland scenery in Hulunbuir; vegetation and weather depend on the travel season.", "呼伦贝尔草原实景；草色和天气随出行季节变化。", "후룬베이얼 초원입니다. 풀빛과 날씨는 여행 시기에 따라 달라집니다."),
    author: "Sergio Tittarini",
    filePage: "https://commons.wikimedia.org/wiki/File:Hulunbuir_Grasslands,_Inner_Mongolia_-_9758628436.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "kunming-jianshui-yuanyang-6-day-private-tour",
    day: 4,
    label: l("Yuanyang Terraces", "元阳梯田", "위안양 다랑논"),
    alt: l("Hani rice terraces in Yuanyang", "元阳哈尼梯田", "위안양 하니 다랑논"),
    caption: l("Yuanyang's Hani terraces; water, colour and visibility change across the year.", "元阳哈尼梯田实景；水面、颜色和能见度全年都有变化。", "위안양 하니 다랑논입니다. 물, 색감, 가시거리는 연중 달라집니다."),
    author: "xiquinhosilva",
    filePage: "https://commons.wikimedia.org/wiki/File:Hani_Rice_Terraces_(53696483750).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "shenzhen-family-tech-4-day-private-tour",
    day: 1,
    label: l("Shenzhen", "深圳", "선전"),
    alt: l("Shenzhen city skyline", "深圳城市天际线", "선전 도시 스카이라인"),
    caption: l("A Shenzhen city view for the arrival day; this is not an airport or hotel photograph.", "抵达日的深圳城市实景；不是机场或酒店照片。", "도착일의 선전 시내 모습입니다. 공항이나 호텔 사진은 아닙니다."),
    author: "Renek78",
    filePage: "https://commons.wikimedia.org/wiki/File:02_View_from_Lianhuashan,_Shenzhen_in_2025.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "beijing-xian-shanghai-12-day-private-tour",
    day: 7,
    file: "route-day-7-extra.webp",
    label: l("Xi'an City Wall", "西安城墙", "시안 성벽"),
    alt: l("Xi'an City Wall", "西安城墙实景", "시안 성벽"),
    caption: l("Xi'an City Wall and old-city context; walking distance depends on your group's pace.", "西安城墙与古城区实景；步行长度按你们的节奏安排。", "시안 성벽과 옛 시가지입니다. 걷는 거리는 일행의 속도에 맞춥니다."),
    author: "H2v5o68z",
    filePage: "https://commons.wikimedia.org/wiki/File:City_wall_of_Xi'an.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "beijing-xian-guilin-shanghai-10-day-private-tour",
    day: 7,
    file: "route-day-7-extra.webp",
    label: l("Li River", "漓江", "이강"),
    alt: l("Li River karst scenery near Guilin", "桂林漓江喀斯特山水", "계림 이강의 카르스트 풍경"),
    caption: l("Li River scenery; the boat route and river conditions are confirmed for the date.", "漓江实景；船行路线与水情按出行日期确认。", "이강의 모습입니다. 유람선 구간과 강 상태는 여행 날짜에 확인합니다."),
    author: "xiquinhosilva",
    filePage: "https://commons.wikimedia.org/wiki/File:Guilin_Li_River.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "chengdu-chongqing-8-day-private-tour",
    day: 1,
    file: "route-day-1-extra.webp",
    label: l("Chengdu", "成都", "청두"),
    alt: l("Chengdu skyline photographed in 2017", "2017 年拍摄的成都天际线", "2017년에 촬영한 청두 스카이라인"),
    caption: l("A Chengdu city view photographed in 2017; it illustrates the arrival city, not the airport or hotel.", "2017 年成都城市实景，仅示抵达城市，不代表机场或酒店。", "2017년의 청두 시내 모습으로, 도착 도시를 보여줄 뿐 공항이나 호텔 사진은 아닙니다."),
    author: "George N",
    filePage: "https://commons.wikimedia.org/wiki/File:Chengdu_skyline_June_2017.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "kunming-dali-lijiang-8-day-private-tour",
    day: 6,
    file: "route-day-6-extra.webp",
    label: l("Shuhe Old Town", "束河古镇", "수허 고성"),
    alt: l("Entrance gate in Shuhe Old Town near Lijiang", "丽江束河古镇入口牌楼", "리장 수허 고성의 입구 문"),
    caption: l("Shuhe Old Town near Lijiang, one of the stops on this day.", "丽江束河古镇实景，是这一天的停留点之一。", "리장 근처 수허 고성입니다. 이날 들르는 장소 중 하나입니다."),
    author: "Gisling",
    filePage: "https://commons.wikimedia.org/wiki/File:丽江束河古镇.JPG",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
  },
  {
    slug: "guangzhou-shunde-foshan-5-day-private-tour",
    day: 2,
    file: "route-day-2-extra.webp",
    label: l("Huacheng Square", "花城广场", "화청 광장"),
    alt: l("Huacheng Square in Guangzhou", "广州花城广场", "광저우 화청 광장"),
    caption: l("Huacheng Square in Guangzhou, part of the city touring day.", "广州花城广场实景，安排在市区游览日。", "광저우 화청 광장으로, 시내 관광일에 방문합니다."),
    author: "xiquinhosilva",
    filePage: "https://commons.wikimedia.org/wiki/File:Huacheng_Square_02842-Guangzhou_(32544735560).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "xiamen-tulou-quanzhou-6-day-private-tour",
    day: 1,
    file: "route-day-1-extra.webp",
    label: l("Gulangyu", "鼓浪屿", "구랑위"),
    alt: l("Gulangyu island in Xiamen", "厦门鼓浪屿", "샤먼 구랑위 섬"),
    caption: l("Gulangyu in Xiamen; the island visit depends on arrival time and ferry availability.", "厦门鼓浪屿实景；能否当天登岛取决于抵达时间和轮渡船位。", "샤먼 구랑위의 모습입니다. 당일 방문은 도착 시간과 페리 좌석에 따릅니다."),
    author: "Jakob Montrasio",
    filePage: "https://commons.wikimedia.org/wiki/File:Gulangyu.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "chaozhou-shantou-nanao-5-day-private-tour",
    day: 2,
    file: "route-day-2-extra.webp",
    label: l("Nan'ao Island", "南澳岛", "남아오섬"),
    alt: l("Changshanwei Lighthouse and Nan'ao Bridge", "南澳岛长山尾灯塔与南澳大桥", "창산웨이 등대와 남아오 대교"),
    caption: l("Nan'ao Island's Changshanwei Lighthouse and bridge; coastal conditions vary with weather.", "南澳岛长山尾灯塔与南澳大桥实景；海边情况随天气变化。", "남아오섬의 창산웨이 등대와 다리입니다. 해안 상황은 날씨에 따라 달라집니다."),
    author: "Windmemories",
    filePage: "https://commons.wikimedia.org/wiki/File:20230205_Changshanwei_Lighthouse_and_Nan'ao_Bridge.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    slug: "huangshan-hongcun-huizhou-5-day-private-tour",
    day: 3,
    file: "route-day-3-extra.webp",
    label: l("Hongcun", "宏村", "홍춘"),
    alt: l("Traditional village buildings beside the pond in Hongcun", "宏村池塘与徽派建筑", "홍춘 연못과 전통 건축"),
    caption: l("Hongcun village after descending Huangshan; the time there follows the mountain and transfer pace.", "下黄山后前往宏村；停留时间按山上和转场节奏安排。", "황산에서 내려와 홍춘에 들릅니다. 체류 시간은 산행과 이동 속도에 맞춥니다."),
    author: "Tom Thai",
    filePage: "https://commons.wikimedia.org/wiki/File:Hongcun_village_in_China.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "jingdezhen-wuyuan-wangxian-6-day-private-tour",
    day: 2,
    file: "route-day-2-extra.webp",
    label: l("Jingdezhen ceramics", "景德镇制瓷", "징더전 도자기"),
    alt: l("Traditional porcelain kiln in Jingdezhen", "景德镇古窑制瓷窑门", "징더전 전통 도자기 가마"),
    caption: l("A traditional porcelain kiln in Jingdezhen; the specific workshop visit is confirmed before travel.", "景德镇传统瓷窑实景；实际参观的作坊在出行前确认。", "징더전 전통 도자기 가마입니다. 실제 방문 공방은 여행 전에 확인합니다."),
    author: "Liuxingy",
    filePage: "https://commons.wikimedia.org/wiki/File:景德镇古窑民俗博览区_古建筑与制造瓷器的窑_09.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    slug: "changbaishan-yanji-winter-6-day-private-tour",
    day: 3,
    file: "route-day-3-extra.webp",
    label: l("Changbaishan Tianchi", "长白山天池", "백두산 천지"),
    alt: l("Snow around Heaven Lake on Changbaishan", "长白山积雪环绕的天池", "눈에 둘러싸인 백두산 천지"),
    caption: l("Changbaishan Tianchi in winter. Access and visibility are weather-dependent and cannot be guaranteed.", "长白山冬季天池实景；能否进入、能见度均取决于天气，不保证看到。", "겨울 백두산 천지입니다. 입장과 시야는 날씨에 좌우되며 볼 수 있다고 보장할 수 없습니다."),
    author: "Charlie fong",
    filePage: "https://commons.wikimedia.org/wiki/File:Heaven_Lake,_Changbai.jpg",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/File:Heaven_Lake,_Changbai.jpg#Licensing",
  },
  {
    slug: "beijing-xian-guilin-hong-kong-10-day-private-tour",
    day: 9,
    file: "route-day-9-extra.webp",
    label: l("Hong Kong skyline", "香港天际线", "홍콩 스카이라인"),
    alt: l("Hong Kong skyline by the harbour", "维港旁的香港天际线", "항구 옆 홍콩 스카이라인"),
    caption: l("Hong Kong city view for the arrival by train; this does not depict the train or station.", "高铁抵港日的香港城市实景；不是列车或车站照片。", "고속철도 도착일의 홍콩 시내 모습으로, 열차나 역 사진은 아닙니다."),
    author: "Mustang Joe (Joe deSousa)",
    filePage: "https://commons.wikimedia.org/wiki/File:Hong_Kong_Skyline1.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "harbin-winter-5-day-private-tour",
    day: 1,
    file: "central-street-winter-1600.jpg",
    label: l("Harbin city preview", "哈尔滨城市预览", "하얼빈 시내 미리보기"),
    alt: l("Snowy Central Street in Harbin in 2018", "2018 年雪中的哈尔滨中央大街", "2018년 눈 내린 하얼빈 중앙대가"),
    caption: l("A 2018 Harbin city scene; arrival day has no fixed sightseeing, and snow conditions vary.", "2018 年哈尔滨城市实景；抵达日没有固定游览，是否有雪以当天为准。", "2018년 하얼빈 시내 모습입니다. 도착일에는 정해진 관광이 없으며 눈 상태는 당일에 따라 다릅니다."),
    author: "Yan Enming",
    filePage: "https://commons.wikimedia.org/wiki/File:Central_Street_(Zhongyang_Dajie),_Harbin_16.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    slug: "harbin-winter-5-day-private-tour",
    day: 4,
    file: "ice-slide-1600.webp",
    label: l("Ice and Snow World", "冰雪大世界", "빙설대세계"),
    alt: l("Ice slide at Harbin Ice and Snow World in 2026", "2026 年哈尔滨冰雪大世界冰滑梯", "2026년 하얼빈 빙설대세계 얼음 미끄럼틀"),
    caption: l("The Ice and Snow World ice-slide area in 2026; opening, facilities and activities vary by season.", "2026 年冰雪大世界冰滑梯区实景；开放时间、设施与项目以当季为准。", "2026년 빙설대세계 얼음 미끄럼틀 구역입니다. 개장, 시설과 체험은 시즌별로 달라집니다."),
    author: "Garosio33",
    filePage: "https://commons.wikimedia.org/wiki/File:Harbin_Ice_%26_Snow_Festival_2026_-_Ice_slide.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "shanghai-disneyland-5-day-private-tour",
    day: 4,
    file: "route-day-4-extra.webp",
    label: l("Former French Concession", "原法租界街区", "옛 프랑스 조계 거리"),
    alt: l("Tree-lined Yanqing Road in Shanghai's former French Concession, photographed in 2013", "2013 年拍摄的上海原法租界延庆路树荫街景", "2013년에 촬영한 상하이 옛 프랑스 조계 옌칭루 거리"),
    caption: l("Yanqing Road in Shanghai, photographed in 2013; this is a city neighbourhood scene, not Disneyland.", "2013 年拍摄的上海延庆路街景；这里是市区街巷，不是迪士尼乐园。", "2013년 상하이 옌칭루 거리입니다. 디즈니랜드가 아닌 도심 거리 모습입니다."),
    author: "Fabio Achilli",
    filePage: "https://commons.wikimedia.org/wiki/File:French_Concession,_Shanghai,_China_(9740638438).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "zhangye-jiayuguan-dunhuang-7-day-private-tour",
    day: 5,
    file: "route-day-5-extra.webp",
    label: l("Mogao Caves exterior", "莫高窟崖面外景", "막고굴 절벽 외관"),
    alt: l("Exterior cliff and cave entrances at the Mogao Caves", "莫高窟外部崖面与洞窟入口", "막고굴 외부 절벽과 석굴 입구"),
    caption: l("The exterior of the Mogao Caves; interior access follows the confirmed ticket and site rules.", "莫高窟崖面外景；洞窟内部参观按已确认门票与景区规定安排。", "막고굴 외관입니다. 내부 관람은 확정된 입장권과 현장 규정에 따릅니다."),
    author: "Tom Thai / eviltomthai",
    filePage: "https://commons.wikimedia.org/wiki/File:Mogao_Caves_Exterior_And_Chambers.jpeg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    slug: "chongqing-yangtze-cruise-6-day-private-tour",
    day: 5,
    file: "route-day-5-extra.webp",
    label: l("Wu Gorge", "巫峡", "무협"),
    alt: l("Wu Gorge seen from a boat on the Yangtze", "船上所见的长江巫峡", "배에서 본 장강 무협"),
    caption: l("Wu Gorge on the Yangtze; weather, water levels and the ship's exact route vary by sailing.", "长江巫峡实景；天气、水位与游轮实际航线以所选航次为准。", "장강 무협입니다. 날씨, 수위와 선박의 실제 항로는 운항일에 따라 달라집니다."),
    author: "Photnart",
    filePage: "https://commons.wikimedia.org/wiki/File:Wu_Gorge_on_Yangtze.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    slug: "xian-terracotta-warriors-5-day-private-tour",
    day: 4,
    file: "route-day-4-extra.webp",
    label: l("Small Wild Goose Pagoda", "小雁塔", "소안탑"),
    alt: l("Small Wild Goose Pagoda in Xi'an Museum's heritage area", "西安博物院园区内的小雁塔", "시안박물원 구역의 소안탑"),
    caption: l("Small Wild Goose Pagoda in the Xi'an Museum area, photographed in 2011; access is checked for the travel date.", "2011 年拍摄的西安博物院园区小雁塔；入园安排以出行日期确认。", "2011년에 촬영한 시안박물원 구역의 소안탑입니다. 입장 가능 여부는 여행 날짜에 확인합니다."),
    author: "Gary Todd",
    filePage: "https://commons.wikimedia.org/wiki/File:Xiaoyan_%22Little_Wild_Goose%22_Pagoda_%289911959443%29.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    slug: "chongqing-wulong-5-day-private-tour",
    day: 4,
    file: "route-day-4-extra.webp",
    label: l("Fairy Mountain option", "仙女山可选景观", "선녀산 선택 풍경"),
    alt: l("Meadow at Fairy Mountain in Wulong", "武隆仙女山草地", "우롱 선녀산 초원"),
    caption: l("Fairy Mountain shows one possible Day 4 landscape. Whether Fairy Mountain or Furong Cave is included will be stated in your written confirmation.", "仙女山是第 4 天可能看到的一种景观；实际包含仙女山还是芙蓉洞，以书面确认单为准。", "선녀산은 4일 차에 볼 수 있는 선택 풍경 중 하나입니다. 선녀산 또는 부용동 중 포함 장소는 서면 확인서에 명시합니다."),
    author: "杨志强Zhiqiang",
    filePage: "https://commons.wikimedia.org/wiki/File:重庆武隆仙女山_-_panoramio.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    slug: "guilin-yangshuo-5-day-private-tour",
    day: 5,
    file: "route-day-5-extra.webp",
    label: l("Guilin city view", "桂林城市景观", "계림 시내 풍경"),
    alt: l("Guilin city and surrounding karst hills", "桂林市区与周围喀斯特山峰", "계림 시내와 주변 카르스트 산봉우리"),
    caption: l("Guilin city view for departure-day context; no sightseeing stop is scheduled on Day 5.", "桂林返程日的城市实景；第 5 天不安排观光景点。", "계림 출발일의 시내 모습입니다. 5일 차에는 관광 정류장을 따로 배정하지 않습니다."),
    author: "Chlukoe",
    filePage: "https://commons.wikimedia.org/wiki/File:City_guilin_guangxi.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
];

const longHaulScene = (
  slug: string,
  day: number,
  label: LocalizedText,
  author: string,
  filePage: string,
  license: string,
  licenseUrl: string,
): Addition => ({
  slug,
  day,
  file: `route-day-${day}-extra.webp`,
  label,
  alt: label,
  caption: l(
    `${label.en} on this route. The photograph illustrates the place; access, weather and the final day order are confirmed for your dates.`,
    `路线中的${label.zh}实景。照片仅示地点，开放情况、天气和最终日期顺序按出行日期确认。`,
    `${label.ko}의 실제 풍경입니다. 사진은 장소를 보여주며 입장, 날씨와 최종 방문 순서는 여행 날짜에 확인합니다.`,
  ),
  author,
  filePage,
  license,
  licenseUrl,
});

const ccBy2 = "https://creativecommons.org/licenses/by/2.0/";
const ccBy3 = "https://creativecommons.org/licenses/by/3.0/";
const ccBy4 = "https://creativecommons.org/licenses/by/4.0/";
const ccBySa3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const ccBySa4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const cc0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const forbiddenCity = "https://commons.wikimedia.org/wiki/File:The_Forbidden_City_-_View_from_Coal_Hill.jpg";
const panda = "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg";
const wulingyuan = "https://commons.wikimedia.org/wiki/File:Wulingyuan,_Zhangjiajie,_Hunan_20230702.jpg";
const liRiver = "https://commons.wikimedia.org/wiki/File:Guilin_Li_River.jpg";
const qutang = "https://commons.wikimedia.org/wiki/File:Qutang_Gorge_on_Changjiang.jpg";
const mogao = "https://commons.wikimedia.org/wiki/File:Mogao_Caves_Exterior_And_Chambers.jpeg";
const jadeDragon = "https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg";
const hongcun = "https://commons.wikimedia.org/wiki/File:Hongcun_village_in_China.jpg";
const westLake = "https://commons.wikimedia.org/wiki/File:Broken_Bridge_(Hangzhou)_20250505.jpg";
const fenghuang = "https://commons.wikimedia.org/wiki/File:凤凰古城_2024-06-22_18.jpg";

const longHaulAdditions: readonly Addition[] = [
  longHaulScene("beijing-xian-chengdu-guilin-shanghai-14-day-private-tour", 2, l("Forbidden City seen from Jingshan", "从景山看故宫", "경산에서 본 자금성"), "Pixelflake", forbiddenCity, "CC BY-SA 3.0", ccBySa3),
  longHaulScene("beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour", 8, l("Giant panda at Chengdu Research Base", "成都熊猫基地内的大熊猫", "청두 판다 기지의 자이언트판다"), "George Lu", panda, "CC BY 2.0", ccBy2),
  longHaulScene("beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour", 7, l("Wulingyuan sandstone peaks", "武陵源峰林", "우링위안 사암 봉우리"), "颐园居", wulingyuan, "CC BY-SA 4.0", ccBySa4),
  longHaulScene("beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour", 10, l("Li River karst scenery", "漓江喀斯特山水", "이강 카르스트 풍경"), "xiquinhosilva", liRiver, "CC BY 2.0", ccBy2),
  longHaulScene("beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour", 12, l("Qutang Gorge on the Yangtze", "长江瞿塘峡", "장강 구당협"), "Tan Wei Liang Byorn", qutang, "CC BY 3.0", ccBy3),
  longHaulScene("beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour", 2, l("Forbidden City seen from Jingshan", "从景山看故宫", "경산에서 본 자금성"), "Pixelflake", forbiddenCity, "CC BY-SA 3.0", ccBySa3),
  longHaulScene("beijing-xian-silk-road-15-day-private-tour", 9, l("Mogao Caves exterior", "莫高窟崖面外景", "막고굴 절벽 외관"), "eviltomthai", mogao, "CC BY 2.0", ccBy2),
  longHaulScene("beijing-xian-silk-road-15-day-small-group-tour", 9, l("Mogao Caves exterior", "莫高窟崖面外景", "막고굴 절벽 외관"), "eviltomthai", mogao, "CC BY 2.0", ccBy2),
  longHaulScene("beijing-xian-yunnan-14-day-private-tour", 10, l("Jade Dragon Snow Mountain", "玉龙雪山", "옥룡설산"), "钉钉", jadeDragon, "CC BY-SA 4.0", ccBySa4),
  longHaulScene("beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour", 8, l("Hongcun village", "宏村", "홍춘"), "Tom Thai", hongcun, "CC BY 2.0", ccBy2),
  longHaulScene("china-grand-tour-21-day-private-tour", 13, l("Wulingyuan sandstone peaks", "武陵源峰林", "우링위안 사암 봉우리"), "颐园居", wulingyuan, "CC BY-SA 4.0", ccBySa4),
  longHaulScene("beijing-hangzhou-suzhou-shanghai-11-day-private-tour", 6, l("Broken Bridge at Hangzhou West Lake", "杭州西湖断桥", "항저우 서호 단교"), "Suicasmo", westLake, "CC0 1.0", cc0),
  longHaulScene("shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour", 7, l("Hongqiao entrance in Fenghuang Ancient Town", "凤凰古城虹桥入口", "봉황고성 홍교 입구"), "xiquinhosilva", fenghuang, "CC BY 4.0", ccBy4),
  longHaulScene("beijing-xian-shanghai-8-day-private-tour", 2, l("Forbidden City seen from Jingshan", "从景山看故宫", "경산에서 본 자금성"), "Pixelflake", forbiddenCity, "CC BY-SA 3.0", ccBySa3),
  longHaulScene("beijing-xian-yangtze-cruise-shanghai-12-day-private-tour", 8, l("Qutang Gorge on the Yangtze", "长江瞿塘峡", "장강 구당협"), "Tan Wei Liang Byorn", qutang, "CC BY 3.0", ccBy3),
];

const additionsBySlug = [...additions, ...longHaulAdditions].reduce<
  Record<string, Addition[]>
>((groups, item) => {
  (groups[item.slug] ??= []).push(item);
  return groups;
}, {});

export const privateTourAdditionalMediaBySlug: Readonly<
  Record<string, readonly PrivateTourRouteMediaGroup[]>
> = Object.freeze(Object.fromEntries(
  Object.entries(additionsBySlug).map(([slug, items]) => [
    slug,
    (items ?? []).map((item) => ({
      day: item.day,
      variants: [{
        label: item.label,
        image: {
          src: `/images/tours/${item.slug}/${item.file ?? `route-day-${item.day}.webp`}`,
          width: 1600,
          height: 1000,
          alt: item.alt,
          caption: item.caption,
        },
      }],
    })),
  ]),
));

export const privateTourAdditionalCreditsBySlug: Readonly<
  Record<string, readonly PrivateTourPhotoCredit[]>
> = Object.freeze(Object.fromEntries(
  Object.entries(additionsBySlug).map(([slug, items]) => [
    slug,
    (items ?? []).map((item) => ({
      subject: item.label,
      author: item.author,
      sourceUrl: item.filePage,
      licenseLabel: item.license,
      licenseUrl: item.licenseUrl,
    })),
  ]),
));
