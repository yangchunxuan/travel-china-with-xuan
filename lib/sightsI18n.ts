import type { HomegroundLocale } from "./homegroundI18n";
import type { SightId } from "./sights";

export interface SightsCopy {
  hub: {
    metadata: { title: string; description: string };
    h1: string;
    /** {count} sights we book of {total}. */
    lede: string;
    cityLink: string;
    /** The accessible name of the row of city links. */
    byCity: string;
  };
  page: {
    bookingTitle: string;
    /** The sight's own writing (lib/sightStories.ts). */
    story: { whyTitle: string; highlightsTitle: string; fitTitle: string; time: string; when: string; pair: string; skip: string; faqTitle: string; sourcesTitle: string };
    bookingNote: string;
    guideLink: string;
    reserve: string;
    /** On each booking card we can book. */
    reserveThis: string;
    /** {fee} is the service fee in the page's currency. */
    reserveNote: string;
    /** When the rules leave every booking field open. */
    openAll: string;
    /** The hero button of a sight we do not book. */
    seeTours: string;
    toursTitle: string;
    /** {city} is the city name. */
    sameCity: string;
    /** When the city has no other sight: its neighbours, or the best-known sights. */
    nearby: string;
    more: string;
    allSights: string;
    /** The fields the rules leave open, as plain topics. */
    openTopics: { release: string; passport: string; realName: string; price: string };
    /** A sight free to walk into, whose extras need booking: jump to them. */
    extras: string;
  };
  ctaTitle: string;
  /** {fee} is the service fee in the page's currency. */
  ctaBody: string;
  /** The closing band of a sight we do not book. */
  guidedTitle: string;
  guidedBody: string;
  /** Under an openly licensed photo: "Photo: {author}, {license}". */
  photo: string;
  /** After the licences: the photos were cropped or resized. */
  edited: string;
  /** The hero note when the entry itself is free but must be booked. {fee} is the service fee. */
  reserveNoteFree: string;
  /** The closing band of a bookable sight in a city without our guides. {fee} is the service fee. */
  ctaBodyNoGuide: string;
  /** The closing band of a sight in a city without our guides: only the whole trip. */
  tripOnlyBody: string;
  /** A sight with nothing to book, no tour and no guide: the hero's way on. */
  planWithUs: string;
  /** Before the credits of the photos in a grid or strip. */
  photos: string;
  sights: Readonly<Record<SightId, { name: string; line: string }>>;
}

const copy: Record<HomegroundLocale, SightsCopy> = {
  en: {
    hub: {
      metadata: {
        title: "Must-See Sights in China, City by City, with Booking Help",
        description:
          "China's must-see sights by city, from the Great Wall to the Li River: why each is worth the trip, how booking works, and the private tours and booking help we offer.",
      },
      h1: "Must-See Sights",
      lede: "China's must-see sights, city by city. Most need a real-name booking in advance; we can book {count} of these {total} in your own passport name.",
      cityLink: "About the city",
      byCity: "By city",
    },
    page: {
      bookingTitle: "Booking at a glance",
      story: { whyTitle: "Why it's worth the trip", highlightsTitle: "Don't miss", fitTitle: "Fitting it in", time: "Time to give it", when: "When to go", pair: "Pair it with", skip: "Who can skip it", faqTitle: "Questions travellers ask", sourcesTitle: "Sources" },
      bookingNote: "From our attraction-booking rules.",
      guideLink: "Full guide",
      reserve: "Book it with us",
      reserveThis: "Book this with us",
      reserveNote: "{fee} per person per sight, plus the ticket at face value.",
      openAll: "Release times, passport use and prices are confirmed for your date when you ask, in writing before you pay.",
      seeTours: "See tours that include it",
      toursTitle: "Private tours that include it",
      sameCity: "More in {city}",
      nearby: "Nearby",
      more: "More must-see sights",
      allSights: "All must-see sights",
      openTopics: { release: "when tickets open", passport: "passport use", realName: "real-name rules", price: "ticket price" },
      extras: "What needs booking",
    },
    ctaTitle: "Rather not deal with bookings?",
    ctaBody: "Attraction booking is {fee} per person per sight, plus any ticket at face value. Or add a private guide, or hand us the whole trip.",
    guidedTitle: "Want us to arrange it?",
    guidedBody: "Book a private English-speaking guide, or hand us the whole trip.",
    photo: "Photo",
    photos: "Photos",
    edited: "cropped and resized",
    reserveNoteFree: "{fee} per person per sight. Entry itself is free but needs a real-name booking.",
    tripOnlyBody: "Hand us the whole trip and we will fit it in.",
    ctaBodyNoGuide: "Attraction booking is {fee} per person per sight, plus any ticket at face value. Or hand us the whole trip.",
    planWithUs: "Fit it into a trip planned for you",
    sights: {
      "forbidden-city": { name: "The Forbidden City", line: "The Ming and Qing imperial palace, at the centre of Beijing" },
      "great-wall": { name: "The Great Wall", line: "A day out from Beijing, at Badaling or Mutianyu" },
      "temple-of-heaven": { name: "Temple of Heaven", line: "Where Ming and Qing emperors prayed for good harvests" },
      "summer-palace": { name: "Summer Palace", line: "An imperial garden of lake, hill and long corridor" },
      "national-museum": { name: "National Museum of China", line: "Ancient China from prehistory to the Qing, on Tiananmen Square" },
      "terracotta-warriors": { name: "Terracotta Warriors", line: "The buried army of China's first emperor" },
      "xian-city-wall": { name: "Xi'an City Wall", line: "Walk a stretch on top, or cycle the whole loop" },
      "shaanxi-history-museum": { name: "Shaanxi History Museum", line: "Treasures from the Zhou to the Tang, and Tang tomb murals" },
      "shanghai-museum-east": { name: "Shanghai Museum East", line: "The Shanghai Museum's new building in Pudong" },
      "humble-administrators-garden": { name: "Humble Administrator's Garden", line: "Suzhou's largest surviving classical garden, a World Heritage site" },
      liangzhu: { name: "Liangzhu Ancient City", line: "A city built over 5,000 years ago, a World Heritage site" },
      "chengdu-panda-base": { name: "Chengdu Panda Base", line: "Go at opening time, when the pandas are usually most active" },
      sanxingdui: { name: "Sanxingdui Museum", line: "Bronze masks and sacred trees from ancient Shu, over 3,000 years old" },
      "li-river": { name: "Li River", line: "Karst peaks by boat, from Guilin to Yangshuo" },
      "jade-dragon-snow-mountain": { name: "Jade Dragon Snow Mountain", line: "The snow peak above Lijiang, up by cable car" },
      "zhangjiajie-forest-park": { name: "Zhangjiajie National Forest Park", line: "Sandstone pillars at Yuanjiajie and Tianzi Mountain" },
      "the-bund": { name: "The Bund", line: "A riverfront of early-20th-century banks and hotels, facing the Pudong skyline" },
      "shanghai-tower": { name: "Shanghai Tower", line: "China's tallest building, with a 118th-floor deck over Lujiazui" },
      "west-lake": { name: "West Lake", line: "Causeways, pagodas and lotus ponds, on foot at dawn or from a boat" },
      "lingyin": { name: "Lingyin Temple and Feilai Peak", line: "A temple nearly 1,700 years old, beside cliffs carved with Buddhas" },
      "leshan-giant-buddha": { name: "Leshan Giant Buddha", line: "A 71-metre Buddha cut into a river cliff, a day out from Chengdu" },
      "hongyadong": { name: "Hongyadong", line: "Stilt-house-style buildings stacked up a Jialing River cliff, lit after dark" },
      "wulong": { name: "Wulong Karst", line: "Three natural bridges in a deep gorge, a long day or a night from Chongqing" },
      "dazu-rock-carvings": { name: "Dazu Rock Carvings", line: "Mostly Buddhist cliff carvings from the Tang to the Song, a World Heritage site" },
      "tianmen-mountain": { name: "Tianmen Mountain", line: "A cable car from the city, cliff walkways and the stairs to Heaven's Gate" },
      "zhangjiajie-grand-canyon": { name: "Zhangjiajie Grand Canyon", line: "Cross the glass bridge, then walk down beside the canyon stream" },
      "chen-clan-hall": { name: "Chen Clan Ancestral Hall", line: "A Qing clan academy known for Lingnan carving in wood, brick and stone" },
      "canton-tower": { name: "Canton Tower", line: "The Pearl River landmark, best seen lit up at night" },
      "shamian": { name: "Shamian Island", line: "Colonial-era buildings and banyan trees on a quiet river island" },
    },
  },
  zh: {
    hub: {
      metadata: {
        title: "中国必去景点：长城、故宫、兵马俑等，按城市看、可代预约",
        description: "按城市整理的中国必去景点，从长城到漓江：为什么值得去、怎么预约，以及景点代预约服务和包含这些景点的私家团。",
      },
      h1: "必去景点",
      lede: "按城市排好的必去景点。大多数要提前实名预约；这 {total} 处里有 {count} 处，我们可以用你本人的护照帮你约。",
      cityLink: "了解这座城市",
      byCity: "按城市",
    },
    page: {
      bookingTitle: "预约要点",
      story: { whyTitle: "为什么值得去", highlightsTitle: "别错过", fitTitle: "怎么排进行程", time: "要留多久", when: "什么时候去", pair: "顺路去哪", skip: "谁可以不去", faqTitle: "常见问题", sourcesTitle: "资料来源" },
      bookingNote: "以下来自我们的景点代预约规则。",
      guideLink: "完整攻略",
      reserve: "我们帮你约",
      reserveThis: "预约这个景点",
      reserveNote: "每人每个景点服务费 {fee}，另付门票原价。",
      openAll: "放票时间、能否用护照和票价，咨询时按你的日期确认，付款前书面写清楚。",
      seeTours: "看包含这里的私家团",
      toursTitle: "包含这里的私家团",
      sameCity: "{city}还有这些",
      nearby: "附近还有这些",
      more: "更多必去景点",
      allSights: "全部必去景点",
      openTopics: { release: "放票时间", passport: "护照能否使用", realName: "是否实名", price: "票价" },
      extras: "需要另约的项目",
    },
    ctaTitle: "不想自己抢票？",
    ctaBody: "景点代预约每人每个景点 {fee}，门票（如有）按原价另付；也可以加上导游，或者把整趟旅行交给我们。",
    guidedTitle: "想让我们来安排？",
    guidedBody: "可以请私人英文导游带你玩，或者把整趟旅行交给我们。",
    photo: "图片",
    photos: "图片来源",
    edited: "已裁切、缩放",
    reserveNoteFree: "每人每个景点服务费 {fee}；景区本身免费，但须实名预约。",
    tripOnlyBody: "把整趟旅行交给我们，我们把它排进行程。",
    ctaBodyNoGuide: "景点代预约每人每个景点 {fee}，门票（如有）按原价另付；也可以把整趟旅行交给我们。",
    planWithUs: "让我们把它排进行程",
    sights: {
      "forbidden-city": { name: "故宫", line: "明清两代的皇宫，北京城的中心" },
      "great-wall": { name: "长城", line: "从北京出发玩一天，八达岭或慕田峪" },
      "temple-of-heaven": { name: "天坛", line: "明清皇帝祭天祈谷的地方" },
      "summer-palace": { name: "颐和园", line: "皇家园林，昆明湖、万寿山和长廊" },
      "national-museum": { name: "中国国家博物馆", line: "天安门广场东侧，从远古讲到明清" },
      "terracotta-warriors": { name: "兵马俑", line: "秦始皇陵的地下军阵" },
      "xian-city-wall": { name: "西安城墙", line: "在城墙上走一段，或者骑车绕一圈" },
      "shaanxi-history-museum": { name: "陕西历史博物馆", line: "周秦汉唐的文物，还有唐代壁画" },
      "shanghai-museum-east": { name: "上海博物馆东馆", line: "上海博物馆在浦东的新馆" },
      "humble-administrators-garden": { name: "拙政园", line: "苏州现存最大的古典园林，世界遗产" },
      liangzhu: { name: "良渚古城遗址", line: "五千多年前的古城，世界遗产" },
      "chengdu-panda-base": { name: "成都大熊猫基地", line: "开园就去，熊猫通常这时最活跃" },
      sanxingdui: { name: "三星堆博物馆", line: "青铜面具和神树，三千多年前的古蜀" },
      "li-river": { name: "漓江", line: "坐船看喀斯特山水，从桂林到阳朔" },
      "jade-dragon-snow-mountain": { name: "玉龙雪山", line: "丽江城外的雪山，坐索道上山" },
      "zhangjiajie-forest-park": { name: "张家界国家森林公园", line: "砂岩峰林，袁家界和天子山" },
      "the-bund": { name: "外滩", line: "黄浦江边的万国建筑，对岸就是陆家嘴" },
      "shanghai-tower": { name: "上海中心", line: "中国第一高楼，118 层观景台俯瞰陆家嘴" },
      "west-lake": { name: "西湖", line: "苏堤、雷峰塔和荷塘，清晨步行或坐船看" },
      "lingyin": { name: "灵隐寺与飞来峰", line: "千年古刹，旁边的石壁上刻满佛像" },
      "leshan-giant-buddha": { name: "乐山大佛", line: "江边崖壁上凿出的 71 米大佛，从成都出发玩一天" },
      "hongyadong": { name: "洪崖洞", line: "嘉陵江崖壁上的吊脚楼式建筑群，入夜亮灯" },
      "wulong": { name: "武隆天生三桥", line: "深谷上三座天然石桥，从重庆去要一整天或住一晚" },
      "dazu-rock-carvings": { name: "大足石刻", line: "唐宋时期的摩崖造像，世界遗产" },
      "tianmen-mountain": { name: "天门山", line: "从市区坐索道上山，走悬崖栈道，再到天门洞" },
      "zhangjiajie-grand-canyon": { name: "张家界大峡谷", line: "走玻璃桥过峡谷，再下到谷底沿溪流走" },
      "chen-clan-hall": { name: "陈家祠", line: "清代宗祠书院，岭南木雕、砖雕、石雕的代表" },
      "canton-tower": { name: "广州塔", line: "珠江边的地标，夜里亮灯最好看" },
      "shamian": { name: "沙面", line: "珠江边的老洋楼和大榕树，闹中取静" },
    },
  },
  ko: {
    hub: {
      metadata: {
        title: "중국 꼭 가볼 명소: 만리장성·자금성·병마용, 예약 방법까지",
        description: "만리장성부터 이강까지 도시별 중국 꼭 가볼 명소. 가 볼 만한 이유와 예약 방법, 예약 대행과 프라이빗 투어를 함께 소개합니다.",
      },
      h1: "꼭 가볼 명소",
      lede: "도시별로 정리한 꼭 가볼 명소입니다. 대부분 사전 실명 예약이 필요하며, 이 {total}곳 중 {count}곳은 여권 실명으로 대신 예약해 드립니다.",
      cityLink: "도시 보기",
      byCity: "도시별",
    },
    page: {
      bookingTitle: "예약 안내",
      story: { whyTitle: "가볼 만한 이유", highlightsTitle: "놓치지 마세요", fitTitle: "일정 짜기", time: "소요 시간", when: "가기 좋은 때", pair: "함께 가기 좋은 곳", skip: "건너뛰어도 되는 경우", faqTitle: "자주 묻는 질문", sourcesTitle: "참고 자료" },
      bookingNote: "관광지 예약 대행 기준입니다.",
      guideLink: "실용 가이드 보기",
      reserve: "예약 대행 문의",
      reserveThis: "이곳 예약 대행 문의",
      reserveNote: "1인 1곳당 수수료 {fee}, 입장권은 정가로 별도입니다.",
      openAll: "예약 오픈 시간, 여권 사용 여부, 가격은 문의하실 때 여행 날짜 기준으로 확인해 결제 전에 서면으로 안내합니다.",
      seeTours: "포함된 투어 보기",
      toursTitle: "이곳을 포함한 프라이빗 투어",
      sameCity: "{city}의 다른 명소",
      nearby: "가까운 명소",
      more: "다른 꼭 가볼 명소",
      allSights: "꼭 가볼 명소 전체",
      openTopics: { release: "예약 오픈 시간", passport: "여권 사용 여부", realName: "실명 여부", price: "입장료" },
      extras: "별도 예약 항목",
    },
    ctaTitle: "예약이 번거로우신가요?",
    ctaBody: "관광지 예약 대행은 1인 1곳당 {fee}이며, 입장권이 있으면 정가로 별도입니다. 가이드를 붙이거나 전체 여행을 맡기셔도 됩니다.",
    guidedTitle: "직접 준비하기 번거로우신가요?",
    guidedBody: "프라이빗 영어 가이드를 예약하거나 전체 여행을 맡기실 수 있습니다.",
    photo: "사진",
    photos: "사진 출처",
    edited: "자르기·크기 조정",
    reserveNoteFree: "1인 1곳당 수수료는 {fee}이며, 입장은 무료지만 실명 예약이 필요합니다.",
    tripOnlyBody: "전체 여행을 맡기시면 이곳도 일정에 넣어 드립니다.",
    ctaBodyNoGuide: "관광지 예약 대행은 1인 1곳당 {fee}이며, 입장권이 있으면 정가로 별도입니다. 전체 여행을 맡기셔도 됩니다.",
    planWithUs: "맞춤 일정에 넣기",
    sights: {
      "forbidden-city": { name: "자금성", line: "명·청 시대의 황궁, 베이징의 중심" },
      "great-wall": { name: "만리장성", line: "베이징에서 하루, 팔달령 또는 무톈위" },
      "temple-of-heaven": { name: "천단", line: "명·청 황제가 하늘에 제사하고 풍년을 빌던 제단" },
      "summer-palace": { name: "이화원", line: "곤명호와 만수산, 긴 회랑의 황실 정원" },
      "national-museum": { name: "중국 국가박물관", line: "톈안먼 광장 동쪽, 선사부터 명·청까지의 중국사" },
      "terracotta-warriors": { name: "병마용", line: "진시황릉을 지키는 지하 군대" },
      "xian-city-wall": { name: "시안 성벽", line: "성벽 위를 걷거나 자전거로 한 바퀴" },
      "shaanxi-history-museum": { name: "산시역사박물관", line: "주·진·한·당의 유물과 당대 벽화" },
      "shanghai-museum-east": { name: "상하이박물관 동관", line: "푸둥에 새로 문을 연 상하이박물관" },
      "humble-administrators-garden": { name: "졸정원", line: "쑤저우에 현존하는 최대 고전 정원, 세계유산" },
      liangzhu: { name: "량주 고성 유적", line: "5천여 년 전의 고대 도시, 세계유산" },
      "chengdu-panda-base": { name: "청두 판다기지", line: "개장 직후가 판다가 보통 가장 활발한 시간" },
      sanxingdui: { name: "싼싱두이박물관", line: "3천여 년 전 고촉 문명의 청동 가면과 청동 나무" },
      "li-river": { name: "이강", line: "카르스트 봉우리 사이를 배로, 계림에서 양삭까지" },
      "jade-dragon-snow-mountain": { name: "옥룡설산", line: "리장 근교의 설산, 케이블카로 올라가는 곳" },
      "zhangjiajie-forest-park": { name: "장가계 국가삼림공원", line: "원가계·천자산의 기암 봉우리" },
      "the-bund": { name: "와이탄", line: "황푸강변의 근대 건축 거리, 맞은편이 루자쭈이" },
      "shanghai-tower": { name: "상하이 타워", line: "중국에서 가장 높은 빌딩, 118층에서 루자쭈이를 내려다보는 곳" },
      "west-lake": { name: "서호", line: "둑길과 탑, 연꽃밭을 이른 아침에 걷거나 배로 둘러보는 호수" },
      "lingyin": { name: "영은사와 비래봉", line: "불상이 새겨진 절벽 옆의 천년 사찰" },
      "leshan-giant-buddha": { name: "낙산대불", line: "강가 절벽에 새긴 71m 대불, 청두에서 당일치기" },
      "hongyadong": { name: "홍야동", line: "자링강 절벽을 따라 층층이 지은 조각루 양식 건물, 밤에 불이 켜지는 곳" },
      "wulong": { name: "우롱 천생삼교", line: "깊은 협곡 위 세 개의 천연 돌다리, 충칭에서 하루 또는 1박" },
      "dazu-rock-carvings": { name: "대족석각", line: "당·송대의 마애불, 세계유산" },
      "tianmen-mountain": { name: "천문산", line: "시내에서 케이블카로 올라 절벽 잔도와 천문동까지" },
      "zhangjiajie-grand-canyon": { name: "장가계 대협곡", line: "유리다리를 건너 계곡물을 따라 내려가는 길" },
      "chen-clan-hall": { name: "진가사", line: "나무·벽돌·돌 조각이 뛰어난 청대 가문 사당" },
      "canton-tower": { name: "광저우 타워", line: "주강변의 랜드마크, 야경이 가장 아름다운 곳" },
      "shamian": { name: "사면도", line: "강 위 작은 섬의 근대 건물과 반얀나무, 도심 속 조용한 곳" },
    },
  },
};

/**
 * Names in the Chinese lines that the word segmenter would split across a
 * line (八|达|岭); KeepWords keeps each whole on these pages only.
 */
export const sightsKeepWords = ["八达岭", "慕田峪", "袁家界", "天子山", "昆明湖", "万寿山", "回民街", "秦始皇陵", "喀斯特", "浦东", "古蜀", "明清", "陆家嘴", "雷峰塔", "吊脚楼", "嘉陵江", "天门洞", "玻璃桥", "摩崖", "岭南", "入夜亮灯", "岭南木雕、砖雕、石雕的代表", "从成都出发玩一天", "从重庆去要一整天或住一晚", "再到天门洞", "但须实名预约", "排进行程"] as const;

export function getSightsCopy(locale: HomegroundLocale): SightsCopy {
  return copy[locale];
}

export function fillSightsCopy(text: string, values: Readonly<Record<string, string>>) {
  return text.replace(/\{(\w+)\}/gu, (match, key: string) => values[key] ?? match);
}
