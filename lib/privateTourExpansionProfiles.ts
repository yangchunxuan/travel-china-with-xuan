import type { HomegroundLocale } from "./homegroundI18n";

export type PrivateTourExpansionLocalizedText = Readonly<Record<HomegroundLocale, string>>;

export interface ComparisonProfile {
  readonly route: PrivateTourExpansionLocalizedText;
  readonly appeal: PrivateTourExpansionLocalizedText;
  readonly pace: PrivateTourExpansionLocalizedText;
  readonly fit: PrivateTourExpansionLocalizedText;
}

const l = (
  en: string,
  zh: string,
  ko: string,
): PrivateTourExpansionLocalizedText => ({ en, zh, ko });

export const privateTourExpansionProfiles: Readonly<Record<string, ComparisonProfile>> = {
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": {
    route: l(
      "Chengdu · Jiuzhaigou · Huanglong",
      "成都 · 九寨沟 · 黄龙",
      "청두 · 주자이거우 · 황룽",
    ),
    appeal: l(
      "Travel north on Day 2, give Jiuzhaigou a full day, visit Huanglong on the return and finish with pandas and Chengdu city life.",
      "第 2 天进入川北，完整游九寨沟，返程途中游黄龙，最后用一天看熊猫与成都生活。",
      "2일 차에 북부 쓰촨으로 이동해 주자이거우를 종일 보고, 귀환길 황룽을 거쳐 판다와 청두 도심 일정으로 마칩니다.",
    ),
    pace: l(
      "Three nights in Chengdu and two in Jiuzhaigou, with Huanglong between the park stay and the return train.",
      "成都 3 晚、九寨沟 2 晚，黄龙安排在九寨沟住宿之后、返程高铁之前。",
      "청두 3박, 주자이거우 2박이며 황룽은 주자이거우 숙박 뒤 귀환 열차 전에 방문합니다.",
    ),
    fit: l(
      "Travellers who want pandas, Chengdu city life and Sichuan's mountain scenery in one route.",
      "想把熊猫、成都生活与川北山水一次走完的旅客。",
      "판다와 청두의 일상, 북부 쓰촨의 산악 풍경을 한 여정에서 보고 싶은 여행자.",
    ),
  },
  "kunming-dali-lijiang-8-day-private-tour": {
    route: l(
      "Kunming · Dali · Lijiang",
      "昆明 · 大理 · 丽江",
      "쿤밍 · 다리 · 리장",
    ),
    appeal: l(
      "Move from Kunming's flower market and wetland to Erhai, Dali and Lijiang, then return to Kunming by rail.",
      "从昆明花市与湿地出发，经洱海、大理和丽江，最后乘动车返回昆明。",
      "쿤밍 꽃시장과 습지에서 얼하이, 다리와 리장을 거쳐 열차로 쿤밍에 돌아옵니다.",
    ),
    pace: l(
      "Two nights in Kunming, three in Dali and two in Lijiang, with a final rail return to Kunming.",
      "昆明 2 晚、大理 3 晚、丽江 2 晚，最后乘动车返回昆明。",
      "쿤밍 2박, 다리 3박, 리장 2박 후 열차로 쿤밍에 돌아옵니다.",
    ),
    fit: l(
      "First-time Yunnan visitors who want stone landscapes, old towns and mountain scenery at a measured pace.",
      "第一次到云南，想从石林、古城一路看到雪山，又不想频繁折返的旅客。",
      "석림과 고성, 설산을 여유 있는 흐름으로 만나고 싶은 윈난 첫 방문자.",
    ),
  },
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": {
    route: l(
      "Guiyang · Huangguoshu · Libo · Xijiang · Zhenyuan",
      "贵阳 · 黄果树 · 荔波 · 西江 · 镇远",
      "구이양 · 황궈수 · 리보 · 시장 · 전위안",
    ),
    appeal: l(
      "Link Huangguoshu and Libo with two nights in Xijiang, then finish beside Zhenyuan's Wuyang River before returning to Guiyang.",
      "把黄果树与荔波、西江连住两晚和镇远舞阳河串成一条完整路线，再返回贵阳。",
      "황궈수와 리보, 시장 2박을 거쳐 전위안 우양강에서 마무리한 뒤 구이양으로 돌아옵니다.",
    ),
    pace: l(
      "One night each in Guiyang, Huangguoshu, Libo and Zhenyuan, plus two nights in Xijiang.",
      "贵阳、黄果树、荔波和镇远各住 1 晚，西江连住 2 晚。",
      "구이양, 황궈수, 리보와 전위안에서 각 1박, 시장에서 2박합니다.",
    ),
    fit: l(
      "Travellers drawn to waterfalls, karst scenery and a focused introduction to Guizhou's Miao culture.",
      "偏爱瀑布、喀斯特山水，也想集中了解贵州苗族文化的旅客。",
      "폭포와 카르스트 풍경, 구이저우 먀오족 문화를 함께 만나고 싶은 여행자.",
    ),
  },
  "xiamen-tulou-quanzhou-6-day-private-tour": {
    route: l(
      "Xiamen · Gulangyu · Yongding · Nanjing · Anxi · Quanzhou",
      "厦门 · 鼓浪屿 · 永定 · 南靖 · 安溪 · 泉州",
      "샤먼 · 구랑위 · 융딩 · 난징 · 안시 · 취안저우",
    ),
    appeal: l(
      "Begin on Gulangyu, connect Chengqi Lou and Tianluokeng with Anxi tea, then finish with Quanzhou's maritime heritage before returning to Xiamen.",
      "从鼓浪屿开始，串联承启楼、田螺坑与安溪茶园，再走进泉州海丝文化，最后返回厦门。",
      "구랑위에서 시작해 청치러우, 톈뤄컹과 안시 차밭을 잇고 취안저우의 해양 유산을 본 뒤 샤먼으로 돌아옵니다.",
    ),
    pace: l(
      "Two nights in Xiamen and one each in Nanjing, Anxi and Quanzhou, with four included lunches on the main touring days.",
      "厦门 2 晚，南靖、安溪、泉州各 1 晚；4 个主要游览日包含午餐。",
      "샤먼 2박, 난징·안시·취안저우 각 1박이며 주요 관광일 중식 4회가 포함됩니다.",
    ),
    fit: l(
      "Travellers interested in island streets, tulou architecture and the layered coastal history of southern Fujian.",
      "喜欢海岛街巷、土楼建筑与闽南海洋文化的旅客。",
      "섬의 골목과 토루 건축, 푸젠 남부의 해양 문화에 관심 있는 여행자.",
    ),
  },
  "chaozhou-shantou-nanao-5-day-private-tour": {
    route: l(
      "Shantou · Nan'ao Island · Chaozhou",
      "汕头 · 南澳岛 · 潮州",
      "산터우 · 난아오섬 · 차오저우",
    ),
    appeal: l(
      "Follow Nan'ao's coast, walk Chaozhou's historic streets and temples, then return through Longhu, old Shantou and Ma Yu Island.",
      "沿南澳海岸前行，完整游潮州古城与寺院，再经龙湖古寨、汕头开埠区和妈屿岛返回。",
      "난아오 해안, 차오저우의 옛 거리와 사원을 둘러본 뒤 룽후, 옛 산터우와 마위섬을 거쳐 돌아옵니다.",
    ),
    pace: l(
      "Two nights in Shantou with one each on Nan'ao and in Chaozhou, leaving time for independent food stops.",
      "汕头住 2 晚，南澳、潮州各住 1 晚，也为自由觅食留出时间。",
      "산터우 2박, 난아오와 차오저우에서 각각 1박하며 자유롭게 현지 음식을 즐길 시간도 둡니다.",
    ),
    fit: l(
      "Travellers who enjoy coastal drives, historic neighbourhoods and exploring Chaoshan food at their own pace.",
      "喜欢海岸风景、古城街区，也想按自己节奏探索潮汕美食的旅客。",
      "해안 풍경과 오래된 거리, 차오산 음식을 자기 속도로 즐기고 싶은 여행자.",
    ),
  },
  "chengdu-chongqing-8-day-private-tour": {
    route: l(
      "Chengdu · Leshan · Chongqing · Wulong · Dazu",
      "成都 · 乐山 · 重庆 · 武隆 · 大足",
      "청두 · 러산 · 충칭 · 우룽 · 대족",
    ),
    appeal: l(
      "Pair Chengdu and Leshan with Chongqing, an overnight Wulong section and a final day at Dazu Rock Carvings.",
      "把成都与乐山、重庆、武隆住宿段和大足石刻串成 8 天路线。",
      "청두와 러산, 충칭, 우룽 숙박 일정과 대족석각을 8일에 잇습니다.",
    ),
    pace: l(
      "Eight days across Chengdu, Chongqing and one Wulong stay, with two days for the mountain section.",
      "8 天走成都、重庆和武隆三地，其中武隆山地段留出两天。",
      "8일 동안 청두, 충칭, 우룽에 머물며 우룽 산악 구간에 이틀을 배정합니다.",
    ),
    fit: l(
      "Travellers who want Sichuan culture, a riverfront megacity and karst mountain scenery in one trip.",
      "想把巴蜀生活、重庆山城与喀斯特山地放进同一趟旅行的旅客。",
      "쓰촨의 생활 문화와 충칭의 산악 도시 풍경, 카르스트 산지를 한 번에 보고 싶은 여행자.",
    ),
  },
  "guangzhou-shunde-foshan-5-day-private-tour": {
    route: l(
      "Guangzhou · Shunde · Foshan",
      "广州 · 顺德 · 佛山",
      "광저우 · 순더 · 포산",
    ),
    appeal: l(
      "Explore old and new Guangzhou, then make separate day trips for Shunde's gardens and food streets and Foshan's Lingnan heritage.",
      "先看广州新旧城区，再分别用一天逛顺德园林与美食街区、了解佛山岭南文化。",
      "광저우의 옛 거리와 현대 도심을 보고, 순더의 정원과 먹거리 골목, 포산의 링난 문화를 각각 당일 일정으로 만납니다.",
    ),
    pace: l(
      "Four nights in one Guangzhou hotel, with Shunde and Foshan as day trips and no luggage moves.",
      "广州同一家酒店连住 4 晚，顺德、佛山当天往返，不用搬行李。",
      "광저우 한 호텔에서 4박하며 순더와 포산은 당일 일정으로 다녀와 짐을 옮기지 않습니다.",
    ),
    fit: l(
      "Travellers who want Lingnan streets, gardens and food discovery while keeping one hotel base.",
      "想住定一家酒店，集中感受岭南街区、园林与饮食文化的旅客。",
      "한 호텔에 머물며 링난의 거리와 정원, 음식 문화를 두루 경험하고 싶은 여행자.",
    ),
  },
  "huangshan-hongcun-huizhou-5-day-private-tour": {
    route: l(
      "Huangshan · Hongcun · Huizhou villages",
      "黄山 · 宏村 · 徽州古村",
      "황산 · 홍춘 · 후이저우 고촌",
    ),
    appeal: l(
      "Stay overnight on Huangshan, descend through Hongcun, then connect Xidi, Nanping, Guanlu, Tangmo, Chengkan and the Tangyue archways.",
      "在黄山山上住一晚，下山后经宏村，再串联西递、南屏、关麓、唐模、呈坎与棠樾牌坊群。",
      "황산 산 위에서 1박하고 홍춘으로 내려온 뒤 서제, 난핑, 관루, 탕모, 정감과 탕웨 패방군을 잇습니다.",
    ),
    pace: l(
      "One night each below Huangshan, on the mountain, in Hongcun and in Tangmo, with four touring lunches included.",
      "黄山山下、山上、宏村与唐模各住 1 晚，并包含 4 个游览日午餐。",
      "황산 아래, 산 위, 홍춘과 탕모에서 각 1박하며 관광일 중식 4회가 포함됩니다.",
    ),
    fit: l(
      "Travellers comfortable with mountain walking who also want time for Huizhou architecture and village life.",
      "能接受山地步行，也想慢慢看徽派建筑与古村生活的旅客。",
      "산길 걷기가 가능하고 후이저우 건축과 고촌의 일상도 천천히 보고 싶은 여행자.",
    ),
  },
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": {
    route: l(
      "Jingdezhen · Wuyuan · Sanqingshan · Wangxian Valley",
      "景德镇 · 婺源 · 三清山 · 望仙谷",
      "징더전 · 우위안 · 삼청산 · 왕셴구",
    ),
    appeal: l(
      "Begin with Jingdezhen ceramics, spend two nights among Wuyuan villages, cross Sanqingshan and finish in Wangxian Valley after dark.",
      "从景德镇陶瓷开始，在婺源村落连住两晚，再走三清山，最后进入望仙谷夜景时段。",
      "징더전 도자 문화로 시작해 우위안 마을에서 2박하고 삼청산을 거쳐 왕셴구 야경으로 마칩니다.",
    ),
    pace: l(
      "One night in Jingdezhen, two in Wuyuan, one near Sanqingshan and one in or near Wangxian Valley before Shangrao departure.",
      "景德镇 1 晚、婺源 2 晚、三清山周边 1 晚、望仙谷内或附近 1 晚，最后从上饶离开。",
      "징더전 1박, 우위안 2박, 삼청산 인근 1박, 왕셴구 안이나 인근 1박 후 상라오에서 출발합니다.",
    ),
    fit: l(
      "Travellers who want ceramics, Jiangxi villages, one full mountain day and an evening scenic stop in a single route.",
      "想把陶瓷、江西村落、一整天山岳路线与夜间景观放进同一趟旅行的旅客。",
      "도자기, 장시 마을, 하루 산악 일정과 저녁 풍경을 한 여정에 담고 싶은 여행자.",
    ),
  },
  "changbaishan-yanji-winter-6-day-private-tour": {
    route: l(
      "Changbaishan Resort · North Slope · Yanji",
      "长白山度假区 · 北坡 · 延吉",
      "창바이산 리조트 · 북파 · 옌지",
    ),
    appeal: l(
      "Begin with a beginner ski lesson and snow time at the resort, keep a weather-aware day for the North Slope, then continue to Yanji's markets and neighbourhoods.",
      "先在度假区体验初学滑雪与玩雪，再按天气安排北坡机会日，最后前往延吉逛市场和城市街区。",
      "리조트에서 초급 스키 수업과 눈놀이를 즐기고 날씨를 살펴 북파 일정을 진행한 뒤 옌지의 시장과 도심 거리를 둘러봅니다.",
    ),
    pace: l(
      "Two resort nights, one near the North Slope and two in Yanji, with room to adjust the winter sequence for conditions.",
      "度假区住 2 晚、北坡周边住 1 晚、延吉住 2 晚，并为冬季天气变化保留调序空间。",
      "리조트 2박, 북파 인근 1박, 옌지 2박으로 머물며 겨울 날씨에 따라 일정 순서를 조정할 여유를 둡니다.",
    ),
    fit: l(
      "Winter travellers prepared for severe cold who want snow activities, a Changbaishan nature day and Yanji city culture.",
      "能适应严寒天气，想兼顾玩雪、长白山自然景观与延吉城市文化的冬季旅客。",
      "매서운 추위에 대비해 눈 체험, 창바이산 자연 풍경과 옌지의 도시 문화를 함께 즐기고 싶은 겨울 여행자.",
    ),
  },
};
