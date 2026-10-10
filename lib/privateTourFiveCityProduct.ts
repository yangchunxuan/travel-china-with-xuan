import type {
  LocalizedStringList,
  LocalizedText,
  PrivateTourDay,
  PrivateTourImage,
  PrivateTourProduct,
  PrivateTourRouteMediaGroup,
} from "./privateTourProducts";
import type { PrivateTourPhotoCredit } from "./privateTourPhotoCredits";

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });
const lists = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
): LocalizedStringList => ({ en, zh, ko });
const day = (
  number: number,
  title: LocalizedText,
  description: LocalizedText,
): PrivateTourDay => ({ day: number, title, description });
const image = (
  src: string,
  width: number,
  height: number,
  alt: LocalizedText,
  caption: LocalizedText,
): PrivateTourImage => ({ src, width, height, objectPosition: "50% 50%", alt, caption });
const scene = (label: LocalizedText, photo: PrivateTourImage) => ({ label, image: photo });
const routePhoto = (
  number: number,
  ...variants: ReturnType<typeof scene>[]
): PrivateTourRouteMediaGroup => ({ day: number, variants });

const slug = "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour";

const wallPhoto = image(
  "/images/guides/beijing-to-mutianyu-great-wall-transfer/hero-1600.webp",
  1600,
  1000,
  l(
    "Visitors walking on the Mutianyu section of the Great Wall.",
    "游客走在慕田峪长城的城墙上。",
    "무톈위 만리장성 성벽을 걷는 방문객들.",
  ),
  l(
    "Mutianyu, about ninety minutes north of Beijing.",
    "慕田峪，在北京以北约一个半小时车程。",
    "베이징에서 북쪽으로 약 한 시간 반, 무톈위.",
  ),
);
const warriorsPhoto = image(
  "/images/guides/terracotta-warriors-without-tour/hero-1600.webp",
  1600,
  1000,
  l(
    "Rows of Terracotta Warriors in Pit 1 near Xi'an.",
    "西安附近兵马俑一号坑中的陶俑队列。",
    "시안 근교 병마용 1호 갱의 도용 행렬.",
  ),
  l("Pit 1 of the Terracotta Warriors.", "兵马俑一号坑。", "병마용 1호 갱."),
);
const liRiverPhoto = image(
  "/images/tours/guilin-yangshuo-5-day-private-tour/li-river-cruise-1600.webp",
  1600,
  1000,
  l(
    "A cruise boat on the Li River between karst peaks.",
    "漓江喀斯特山峰间的游船。",
    "카르스트 봉우리 사이 이강의 유람선.",
  ),
  l(
    "About four hours on the river, lunch on board.",
    "在江上约四个小时，午餐在船上。",
    "강 위에서 약 네 시간, 점심은 배에서.",
  ),
);
const bundPhoto = image(
  "/images/tours/photo-quality-20261004/bund.webp",
  3200,
  2400,
  l(
    "The domed former HSBC building and the Custom House clock tower on the Bund.",
    "外滩的原汇丰银行大楼穹顶与海关钟楼。",
    "와이탄의 옛 HSBC 건물 돔과 세관 시계탑.",
  ),
  l(
    "Old banks on one side of the river, Lujiazui on the other.",
    "江这边是老银行，对岸是陆家嘴。",
    "강 이쪽은 옛 은행들, 건너편은 루자쭈이.",
  ),
);
const beijingNightPhoto = image(
  "/images/tours/beijing-highlights-5-day-private-tour/arrival-beijing-city-1600.webp",
  1600,
  1000,
  l(
    "Beijing's elevated roads and skyline after dark.",
    "夜色中北京的立交桥与高楼。",
    "밤의 베이징 고가도로와 고층 빌딩.",
  ),
  l(
    "First night in Beijing: your guide is at the airport when you land.",
    "北京第一晚：落地时导游已在机场等你。",
    "베이징 첫날 밤, 도착하면 가이드가 공항에서 기다립니다.",
  ),
);
const mutianyuRidgePhoto = image(
  "/images/tours/photo-quality-20261004/wall.webp",
  3200,
  2133,
  l(
    "The Great Wall at Mutianyu climbing a wooded ridge in autumn.",
    "秋天的慕田峪长城沿山脊而上。",
    "가을 능선을 따라 오르는 무톈위 만리장성.",
  ),
  l(
    "Up by cable car, along the ridge on foot, down by cable car.",
    "缆车上去，沿山脊步行，再坐缆车下来。",
    "케이블카로 올라가 능선을 걷고, 케이블카로 내려옵니다.",
  ),
);
const forbiddenCityPhoto = image(
  "/images/tours/beijing-highlights-5-day-private-tour/forbidden-city-corridor-1600.webp",
  1600,
  1000,
  l(
    "A red corridor with painted beams inside the Forbidden City.",
    "故宫里一条红墙彩绘的长廊。",
    "자금성 안 단청이 칠해진 붉은 회랑.",
  ),
  l(
    "About three hours inside with your guide, on tickets booked in your passport names.",
    "导游陪你在里面看大约三个小时，门票已用护照实名预约。",
    "여권 이름으로 예약한 입장권으로, 가이드와 약 세 시간을 봅니다.",
  ),
);
const templeOfHeavenPhoto = image(
  "/images/tours/beijing-highlights-5-day-private-tour/temple-of-heaven-2024-1600.webp",
  1600,
  1000,
  l(
    "The Hall of Prayer for Good Harvests at the Temple of Heaven.",
    "天坛祈年殿。",
    "천단 기년전.",
  ),
  l(
    "Where emperors prayed for good harvests.",
    "皇帝祈求五谷丰登的地方。",
    "황제가 풍년을 빌던 곳.",
  ),
);
const xianWallPhoto = image(
  "/images/tours/xian-terracotta-warriors-5-day-private-tour/arrival-city-wall-1600.webp",
  1600,
  1000,
  l(
    "A gate tower and red lanterns on top of Xi'an City Wall.",
    "西安城墙上的城楼与红灯笼。",
    "시안 성벽 위의 누각과 홍등.",
  ),
  l(
    "Walk on top of the Ming wall that still rings the old city.",
    "走在至今仍环绕老城的明代城墙上。",
    "지금도 옛 도심을 두르고 있는 명대 성벽 위를 걷습니다.",
  ),
);
const muslimQuarterPhoto = image(
  "/images/tours/xian-terracotta-warriors-5-day-private-tour/gallery-muslim-quarter-1600.webp",
  1600,
  1000,
  l(
    "Food stalls and signs along a street in Xi'an's Muslim Quarter.",
    "西安回民街的小吃招牌与街道。",
    "시안 회민거리의 먹거리 간판과 거리.",
  ),
  l(
    "Reach it at dusk, when the food stalls are busiest.",
    "傍晚来，正是小吃摊最热闹的时候。",
    "노점이 가장 북적이는 해 질 무렵에 갑니다.",
  ),
);
const terracottaFacesPhoto = image(
  "/images/tours/photo-quality-20261004/terracotta.webp",
  3200,
  2133,
  l(
    "Close-up of terracotta warriors and horses in Pit 1.",
    "一号坑中兵马俑与陶马的近景。",
    "1호 갱 병마용과 도기 말의 근경.",
  ),
  l(
    "Life-size, rank after rank, and no two faces alike.",
    "真人大小，一排接一排，每张脸都不一样。",
    "실물 크기로 줄지어 선 병사들, 얼굴은 하나하나 다릅니다.",
  ),
);
const goosePagodaPhoto = image(
  "/images/tours/photo-quality-20261004/dayanta.webp",
  2560,
  1920,
  l("The Big Wild Goose Pagoda in Xi'an.", "西安大雁塔。", "시안 대안탑."),
  l(
    "A Tang-dynasty pagoda in the grounds of Da Ci'en Temple.",
    "大慈恩寺里的唐代古塔。",
    "대자은사 경내의 당나라 탑.",
  ),
);
const chengduEveningPhoto = image(
  "/images/tours/photo-quality-20261004/jinjiang.webp",
  3200,
  2133,
  l(
    "Anshun Bridge lit up over the Jin River in Chengdu at night.",
    "夜里亮灯的成都锦江安顺廊桥。",
    "밤에 불 밝힌 청두 진강의 안순랑교.",
  ),
  l(
    "Chengdu by evening: a driver meets your train.",
    "傍晚到成都，司机在出站口接你。",
    "저녁에 청두 도착, 기사가 역에서 맞이합니다.",
  ),
);
const pandaPhoto = image(
  "/images/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/route-day-8.webp",
  1600,
  1000,
  l("A giant panda eating bamboo.", "正在吃竹子的大熊猫。", "대나무를 먹는 자이언트판다."),
  l(
    "Go early: by afternoon most of them are asleep.",
    "要早去，到了下午大多都睡了。",
    "일찍 가야 합니다. 오후가 되면 대부분 잠듭니다.",
  ),
);
const teahousePhoto = image(
  "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/gallery-teahouse-1600.webp",
  1600,
  1000,
  l(
    "A teahouse terrace with a round table in a Chengdu lane.",
    "成都巷子里一处摆着圆桌的茶馆露台。",
    "청두 골목 찻집의 둥근 탁자가 놓인 테라스.",
  ),
  l("Tea, the Chengdu way: slowly.", "成都人喝茶，就是慢慢喝。", "청두식으로 차를 마십니다. 천천히."),
);
const chengduCentrePhoto = image(
  "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/departure-chengdu-1600.webp",
  1600,
  1000,
  l(
    "Chengdu IFS and evening traffic in the city centre.",
    "成都市中心的 IFS 与傍晚车流。",
    "청두 도심의 IFS와 저녁 차량 행렬.",
  ),
  l(
    "The city centre on your last Chengdu morning, before the flight to Guilin.",
    "飞桂林之前，成都最后一个上午在市中心。",
    "계림으로 떠나기 전 청두 도심에서 보내는 마지막 오전.",
  ),
);
const yangshuoPhoto = image(
  "/images/tours/guilin-yangshuo-5-day-private-tour/yulong-countryside-1600.webp",
  1600,
  1000,
  l(
    "A bamboo raft and fields beneath Yangshuo's karst hills.",
    "阳朔喀斯特山下的竹筏与田野。",
    "양삭 카르스트 산 아래 대나무 뗏목과 들판.",
  ),
  l("The countryside around Yangshuo.", "阳朔周边的田园。", "양삭 주변의 시골 풍경."),
);
const elephantTrunkPhoto = image(
  "/images/tours/guilin-yangshuo-5-day-private-tour/elephant-trunk-hill-1600.webp",
  1600,
  1000,
  l("Elephant Trunk Hill on the river in Guilin.", "桂林江边的象鼻山。", "계림 강가의 상비산."),
  l("The symbol of the city.", "桂林的城市象征。", "계림의 상징."),
);
const pagodasPhoto = image(
  "/images/tours/guilin-yangshuo-5-day-private-tour/gallery-sun-moon-towers-1600.webp",
  1600,
  1000,
  l(
    "The Sun and Moon Pagodas reflected in a lake at sunset.",
    "日落时倒映在湖中的日月双塔。",
    "해 질 녘 호수에 비친 일월쌍탑.",
  ),
  l(
    "Walk the lakes as the pagodas light up at dusk.",
    "傍晚沿湖散步，看双塔亮灯。",
    "해 질 무렵 호숫가를 걸으며 탑에 불이 켜지는 것을 봅니다.",
  ),
);
const yuGardenPhoto = image(
  "/images/tours/shanghai-disneyland-5-day-private-tour/route-day-3.webp",
  1600,
  1068,
  l(
    "Traditional buildings and a pond in Yu Garden.",
    "豫园的传统建筑与池塘。",
    "예원의 전통 건축과 연못.",
  ),
  l("Go early, before the crowds.", "早点去，赶在人多之前。", "사람이 몰리기 전에 일찍 갑니다."),
);
const frenchConcessionPhoto = image(
  "/images/tours/shanghai-disneyland-5-day-private-tour/route-day-4-extra.webp",
  1600,
  1000,
  l(
    "Plane trees and old houses on Yanqing Road in the former French Concession, photographed in 2013.",
    "原法租界延庆路的梧桐与老房子（2013 年摄）。",
    "옛 프랑스 조계지 옌칭루의 플라타너스와 옛집(2013년 촬영).",
  ),
  l(
    "An afternoon under the plane trees, ending at Xintiandi.",
    "下午在梧桐树下走，最后到新天地。",
    "플라타너스 아래에서 오후를 보내고 신톈디에서 마칩니다.",
  ),
);
const departurePhoto = image(
  "/images/tours/shanghai-suzhou-5-day-private-tour/departure-shanghai-1600.webp",
  1600,
  1000,
  l(
    "A quiet riverside terrace facing Shanghai's skyline.",
    "面对上海天际线的安静江边平台。",
    "상하이 스카이라인을 마주한 조용한 강변 테라스.",
  ),
  l(
    "Departure day is the airport transfer only.",
    "离开当天只送机。",
    "출발일은 공항 이동만 있습니다.",
  ),
);

/**
 * A public route based on a date-specific private-group plan. Both choices are
 * quoted afresh, so the client's negotiated fare is never a website price.
 */
export const fiveCityPrivateTour: PrivateTourProduct = {
  id: "private-tour-beijing-xian-chengdu-guilin-shanghai-13d12n",
  slug,
  days: 13,
  nights: 12,
  routePhotoFallback: false,
  servicePolicy: {
    shoppingStops: false,
    addedServicesRequirePriorAgreement: true,
  },
  includesDomesticFlights: true,
  facts: {
    en: [
      { label: "Route", value: "Beijing · Xi'an · Chengdu · Guilin · Shanghai" },
      { label: "Travel", value: "2 high-speed trains + 2 domestic flights" },
      { label: "Stay", value: "12 nights · our 4-star hotels or your own" },
      { label: "Price", value: "Quoted for your dates and group" },
    ],
    zh: [
      { label: "路线", value: "北京 · 西安 · 成都 · 桂林 · 上海" },
      { label: "城际交通", value: "2 段高铁 + 2 段国内航班" },
      { label: "住宿", value: "12 晚 · 四星酒店或自己订" },
      { label: "价格", value: "按日期与人数报价" },
    ],
    ko: [
      { label: "동선", value: "베이징 · 시안 · 청두 · 계림 · 상하이" },
      { label: "도시간 이동", value: "고속철도 2회 + 국내선 2회" },
      { label: "숙박", value: "12박 · 4성급 호텔 또는 직접 예약" },
      { label: "가격", value: "날짜와 인원별 견적" },
    ],
  },
  title: l(
    "Beijing, Xi'an, Chengdu, Guilin & Shanghai: 13-Day Private Tour",
    "北京·西安·成都·桂林·上海 13 天 12 晚私家团",
    "베이징·시안·청두·계림·상하이 13일 프라이빗 투어",
  ),
  metadataTitle: l(
    "13-Day China Private Tour | Beijing, Xi'an, Chengdu, Guilin & Shanghai",
    "北京西安成都桂林上海 13 天私家团｜长城到外滩",
    "중국 13일 프라이빗 투어｜베이징·시안·청두·계림·상하이",
  ),
  metadataDescription: l(
    "13-day private China tour: Mutianyu Great Wall, Forbidden City, Terracotta Warriors, Chengdu pandas, the Li River and Shanghai. Hotels optional, quoted by date.",
    "13 天私家团走北京、西安、成都、桂林、上海：慕田峪长城、故宫、兵马俑、熊猫、漓江与外滩。可含四星酒店或自己订，按日期报价。",
    "무톈위 만리장성, 자금성, 병마용, 청두 판다, 이강과 상하이를 잇는 13일 프라이빗 투어. 호텔 포함 또는 직접 예약, 날짜별 견적.",
  ),
  eyebrow: l(
    "Five cities in 13 days, from the Great Wall to the Bund",
    "13 天走五城，从长城到外滩",
    "13일 동안 다섯 도시, 만리장성에서 와이탄까지",
  ),
  lede: l(
    "Ride the cable car up to the Great Wall at Mutianyu. Look down on the first emperor's army in Xi'an. Reach the panda base early, while the pandas are still awake. Spend four hours on the Li River among the hills on the back of the 20-yuan note, then finish on the Bund. Twelve nights, in our 4-star hotels or your own.",
    "坐缆车上慕田峪长城；在西安俯看秦始皇的军阵；一早赶到熊猫基地，趁熊猫还醒着；在漓江上坐四个小时船，穿过印在 20 元人民币背面的山水；最后走上外滩。12 晚住我们安排的四星酒店，也可以自己订。",
    "케이블카를 타고 무톈위 만리장성에 오릅니다. 시안에서는 진시황의 군대를 내려다보고, 청두에서는 판다가 깨어 있는 이른 아침에 판다 기지에 닿습니다. 20위안 지폐 뒷면에 그려진 산수 사이로 이강을 네 시간 내려간 뒤, 마지막은 와이탄입니다. 12박은 저희가 고른 4성급 호텔이나 직접 예약한 숙소에서 묵습니다.",
  ),
  summary: l(
    "Three nights in Beijing, two in Xi'an, two in Chengdu, three in Guilin and two in Shanghai. Two second-class high-speed trains and two economy flights with a checked bag, an English-speaking local guide on every sightseeing day, a private vehicle, the named admissions and eight lunches. Hotels are optional; the total is confirmed in writing before payment.",
    "北京 3 晚、西安 2 晚、成都 2 晚、桂林 3 晚、上海 2 晚。两段高铁二等座、两段含托运行李的国内经济舱航班，每个游览日都有当地英语导游和专车，含列明门票与 8 顿午餐。酒店可含可不含，总价付款前书面确认。",
    "베이징 3박, 시안 2박, 청두 2박, 계림 3박, 상하이 2박. 고속철도 2등석 2회와 위탁 수하물이 포함된 국내선 이코노미 2회, 관광일마다 현지 영어 가이드와 전용차, 명시된 입장권과 점심 8회가 들어갑니다. 호텔은 선택이며 총액은 결제 전에 서면으로 확정합니다.",
  ),
  highlights: lists(
    [
      "The Great Wall at Mutianyu, by cable car up and down",
      "The Terracotta Warriors, then the Big Wild Goose Pagoda",
      "Pandas first thing in the morning, tea in People's Park after lunch",
      "Four hours on the Li River to Yangshuo, then the Bund to finish",
    ],
    [
      "慕田峪长城，缆车上、缆车下",
      "兵马俑，再去大雁塔",
      "一早看熊猫，午后在人民公园喝茶",
      "漓江上四个小时到阳朔，最后走外滩",
    ],
    [
      "케이블카로 오르내리는 무톈위 만리장성",
      "병마용, 그리고 대안탑",
      "아침 일찍 판다, 점심 뒤에는 인민공원에서 차 한잔",
      "이강 네 시간 뱃길로 양삭까지, 마지막은 와이탄",
    ],
  ),
  itinerary: [
    day(1,
      l("Arrive in Beijing", "抵达北京", "베이징 도착"),
      l(
        "Whichever Beijing airport you land at, your guide is waiting at the exit and the car takes you to your hotel. Nothing else is planned: sleep off the flight, or take a first walk around the neighbourhood.",
        "无论你降落在北京哪个机场，导游都在出口等你，专车送你去酒店。这一天不排别的：倒倒时差，或者在酒店附近先随便走走。",
        "베이징 어느 공항에 내리시든 가이드가 출구에서 기다리고, 전용차가 호텔까지 모십니다. 이날은 다른 일정이 없습니다. 시차에 적응하거나 호텔 근처를 가볍게 걸어 보세요.",
      ),
    ),
    day(2,
      l("The Great Wall at Mutianyu", "慕田峪长城", "무톈위 만리장성"),
      l(
        "About ninety minutes north of the city, the wall at Mutianyu follows the ridge from one watchtower to the next. The cable car takes you up; walk the restored section at your own pace, then ride back down. Lunch is near the wall. On the way back into Beijing, a short stop at the Olympic Park to see the Bird's Nest and the Water Cube from outside.",
        "往北开车约一个半小时到慕田峪，城墙顺着山脊，从一座敌楼连到下一座。坐缆车上去，在修复过的城墙上按自己的节奏走，再坐缆车下来。午餐在长城附近。回城路上在奥林匹克公园停一下，从外面看鸟巢和水立方。",
        "시내에서 북쪽으로 약 한 시간 반, 무톈위의 성벽은 능선을 따라 망루에서 망루로 이어집니다. 케이블카로 올라가 복원된 성벽을 원하는 속도로 걷고, 다시 케이블카로 내려옵니다. 점심은 장성 근처에서 합니다. 시내로 돌아오는 길에 올림픽공원에 잠시 들러 냐오차오와 수이리팡을 밖에서 봅니다.",
      ),
    ),
    day(3,
      l("Tiananmen, the Forbidden City and the Temple of Heaven", "天安门、故宫与天坛", "천안문·자금성·천단"),
      l(
        "Cross Tiananmen Square and walk into the Forbidden City, home of the Ming and Qing emperors, for about three hours with your guide. Tickets are booked ahead in your passport names. After lunch, the Temple of Heaven, where emperors prayed for good harvests and where Beijingers still come to exercise, play cards and sing. Peking duck for dinner is your choice; we are happy to book the table.",
        "穿过天安门广场，走进明清两代皇帝住过的故宫，导游陪你看大约三个小时，门票提前用护照实名预约好。午饭后去天坛：皇帝在这里祈求五谷丰登，今天的北京人在这里锻炼、打牌、唱歌。晚上想吃北京烤鸭，费用自理，我们可以帮你订位。",
        "천안문광장을 지나 명·청 황제들이 살던 자금성으로 들어가 가이드와 약 세 시간을 봅니다. 입장권은 여권 이름으로 미리 예약합니다. 점심 뒤에는 천단으로 갑니다. 황제가 풍년을 빌던 곳이고, 지금은 베이징 사람들이 운동하고 카드놀이를 하고 노래하는 곳입니다. 저녁에 베이징 오리구이를 원하시면 비용은 개별 부담이며 예약은 저희가 도와드립니다.",
      ),
    ),
    day(4,
      l("Fast train to Xi'an", "高铁去西安", "고속철도로 시안"),
      l(
        "An early high-speed train covers Beijing to Xi'an in about four hours, and your Xi'an guide meets you at the station. After lunch, walk on top of the Ming-dynasty City Wall, which still rings the old city, and reach the Muslim Quarter at dusk, when the food stalls are at their busiest. Dinner there is yours to choose.",
        "一早坐高铁，大约四个小时从北京到西安，西安导游在车站接你。午饭后登上明代城墙，它至今仍完整地围着老城；傍晚走进回民街，正是小吃摊最热闹的时候。晚饭在那里自己挑。",
        "아침 일찍 고속철도로 약 네 시간이면 시안에 닿고, 시안 가이드가 역에서 맞이합니다. 점심 뒤 지금도 옛 도심을 온전히 두르고 있는 명대 성벽 위를 걷고, 해 질 무렵 노점이 가장 북적일 때 회민거리에 들어갑니다. 저녁은 그곳에서 직접 골라 드세요.",
      ),
    ),
    day(5,
      l("The Terracotta Warriors and the Big Wild Goose Pagoda", "兵马俑与大雁塔", "병마용과 대안탑"),
      l(
        "About an hour east of the city, walk the pits where the first emperor's army was found: rank after rank of life-size soldiers, no two faces alike. The site shuttle and audio headsets are included. After lunch, the Big Wild Goose Pagoda, built in the Tang dynasty, in the grounds of Da Ci'en Temple; the ticket covers the grounds, not the climb inside. The evening is free.",
        "往东约一小时到兵马俑。沿着坑边走，看秦始皇的军阵一排接一排，真人大小，每张脸都不一样。景区接驳车和讲解耳机已含。午饭后去大慈恩寺里的唐代大雁塔，门票含寺院，不含登塔。晚上自由。",
        "동쪽으로 약 한 시간, 진시황의 군대가 발견된 갱을 따라 걷습니다. 실물 크기의 병사들이 줄지어 서 있고 얼굴은 하나하나 다릅니다. 셔틀과 오디오 헤드셋이 포함됩니다. 점심 뒤에는 대자은사 경내의 당나라 탑 대안탑을 봅니다. 입장권은 경내 관람이며 탑 내부는 오르지 않습니다. 저녁은 자유입니다.",
      ),
    ),
    day(6,
      l("A free morning, then the train to Chengdu", "自由上午，高铁去成都", "자유로운 오전, 열차로 청두"),
      l(
        "Sleep in, or go back to the wall or the Muslim Quarter on your own. Lunch is yours. In the afternoon the driver takes you to Xi'an North for the high-speed train to Chengdu, about four hours, and another driver is waiting when you arrive.",
        "睡个好觉，或者自己再去城墙、回民街转转，午饭自理。下午司机送你到西安北站，坐高铁约四个小时到成都，另一位司机在出站口等你。",
        "늦잠을 자거나 성벽과 회민거리를 혼자 다시 둘러보세요. 점심은 개별 부담입니다. 오후에 기사가 시안북역으로 모시고, 고속철도로 약 네 시간이면 청두입니다. 도착하면 다른 기사가 기다립니다.",
      ),
    ),
    day(7,
      l("Pandas, Kuanzhai Alley and a Chengdu teahouse", "熊猫、宽窄巷子与成都茶馆", "판다, 관착항자, 청두 찻집"),
      l(
        "Be at the Giant Panda Base early, when the pandas are eating and moving about; by afternoon most of them are asleep. The park shuttle is included. After lunch, the restored lanes of Kuanzhai Alley, then tea the Chengdu way in People's Park, where locals play mahjong and dance. Sichuan opera with its face-changing act is an evening option at your own cost.",
        "早早到熊猫基地，这时熊猫正在吃竹子、四处走动；到了下午，大多数都睡了。园内观光车已含。午饭后逛修复过的宽窄巷子，再到人民公园像成都人那样喝茶，旁边有人打麻将、跳舞。晚上可以自费看川剧变脸。",
        "판다가 대나무를 먹고 돌아다니는 이른 시간에 판다 기지에 닿습니다. 오후가 되면 대부분 잠듭니다. 경내 셔틀이 포함됩니다. 점심 뒤 복원된 관착항자 골목을 걷고, 인민공원에서 청두 사람들처럼 차를 마십니다. 옆에서는 마작을 하고 춤을 춥니다. 저녁 쓰촨 오페라 변검 공연은 개별 부담 선택 일정입니다.",
      ),
    ),
    day(8,
      l("Chengdu's centre, then fly to Guilin", "成都市中心，飞往桂林", "청두 도심, 계림행 항공편"),
      l(
        "A slow morning in the centre: Taikoo Li, the old Daci Temple right beside it, and the giant panda climbing the IFS building on Chunxi Road. In the afternoon, transfer to the airport for the economy flight to Guilin, about an hour and a half; a driver meets you on arrival.",
        "上午慢慢逛市中心：太古里、紧挨着它的老寺大慈寺，还有春熙路上那只爬在 IFS 楼外墙上的大熊猫。下午去机场，坐经济舱飞桂林，约一个半小时，落地有司机接你。",
        "오전은 도심을 천천히 걷습니다. 타이쿠리, 바로 옆 오래된 사찰 다츠사, 그리고 춘시루 IFS 건물 외벽을 오르는 대형 판다. 오후에 공항으로 이동해 이코노미 항공편으로 약 한 시간 반 날아 계림에 도착하면 기사가 맞이합니다.",
      ),
    ),
    day(9,
      l("The Li River to Yangshuo", "漓江到阳朔", "이강을 따라 양삭으로"),
      l(
        "About four hours on a three-star cruise boat through the limestone hills printed on the back of the 20-yuan note, with lunch on board. From Yangshuo, drive through the countryside to Moon Hill, then walk West Street before the drive back to Guilin, about ninety minutes.",
        "坐三星游船在漓江上走大约四个小时，两岸就是印在 20 元人民币背面的石灰岩山峰，午餐在船上。到了阳朔，专车穿过田野去月亮山，再到西街走走，然后开车约一个半小时回桂林。",
        "3성급 유람선을 타고 약 네 시간, 20위안 지폐 뒷면에 그려진 석회암 봉우리 사이를 지나며 점심은 배에서 합니다. 양삭에서는 전용차로 들판을 지나 월량산에 가고 서가를 걸은 뒤 약 한 시간 반 차로 계림에 돌아옵니다.",
      ),
    ),
    day(10,
      l("Reed Flute Cave, Elephant Trunk Hill and the lakes", "芦笛岩、象鼻山与湖边", "노적암, 상비산과 호숫가"),
      l(
        "An easier day after the river. Reed Flute Cave in the morning, lunch, then Elephant Trunk Hill, the symbol of the city. Finish with a walk along the lakes as the Sun and Moon Pagodas light up at dusk; you see them from outside.",
        "漓江之后，节奏放慢一天。上午游芦笛岩，午饭后去桂林的城市象征象鼻山，傍晚沿湖散步，看日月双塔亮灯；双塔只在外面看。",
        "강 위의 하루 다음에는 여유로운 하루입니다. 오전에 노적암, 점심 뒤에는 도시의 상징 상비산, 해 질 무렵에는 호숫가를 걸으며 불이 켜지는 일월쌍탑을 봅니다. 탑은 밖에서 감상합니다.",
      ),
    ),
    day(11,
      l("Fly to Shanghai and walk the Bund", "飞上海，走外滩", "상하이로 날아가 와이탄으로"),
      l(
        "Fly to Shanghai, about two hours. Your guide meets you and takes you to the Bund, where the old banks and trading houses face the towers of Lujiazui across the river, then along Nanjing Road. The evening is yours.",
        "飞往上海，约两个小时。导游接机后带你去外滩：江这边是老银行和洋行大楼，对岸是陆家嘴的高楼；再走南京路。晚上自由安排。",
        "약 두 시간 비행으로 상하이에 갑니다. 가이드가 공항에서 맞이해 와이탄으로 안내합니다. 강 이쪽에는 옛 은행과 무역회사 건물이, 건너편에는 루자쭈이의 고층 빌딩이 마주 섭니다. 이어 난징루를 걷고, 저녁은 자유입니다.",
      ),
    ),
    day(12,
      l("Yu Garden and the former French Concession", "豫园与原法租界", "예원과 옛 프랑스 조계지"),
      l(
        "Go early to Yu Garden, a Ming-dynasty classical garden, and the lanes of the City God Temple around it, before the crowds. After lunch, the plane-tree streets of the former French Concession, Wukang Road and Anfu Road, ending at Xintiandi.",
        "一早去明代园林豫园和周边城隍庙的街巷，赶在人多之前。午饭后走原法租界的梧桐街道，武康路、安福路，最后到新天地。",
        "사람이 몰리기 전 아침 일찍 명대 정원 예원과 주변 성황묘 골목에 갑니다. 점심 뒤에는 플라타너스가 늘어선 옛 프랑스 조계지의 우캉루와 안푸루를 걷고 신톈디에서 마칩니다.",
      ),
    ),
    day(13,
      l("Depart Shanghai", "上海送机", "상하이 출발"),
      l(
        "The driver takes you to the airport in time for your flight. If you chose our hotels, breakfast is at the hotel. Departure day is the transfer only.",
        "司机按你的航班时间送你去机场。选了我们安排的酒店，早餐在酒店吃。这天只送机，不排景点。",
        "기사가 항공편 시간에 맞춰 공항으로 모십니다. 저희 호텔을 선택하셨다면 조식은 호텔에서 드십니다. 이날은 공항 이동만 있습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Twelve nights in central 4-star hotels (four diamonds on Trip.com), with breakfast every morning: three in central Beijing, two inside Xi'an's old city wall, two in central Chengdu, three in central Guilin and two in central Shanghai. We send the hotel names and room types for your approval before you pay a deposit. Prefer to book your own? Choose the without-hotels option: you book and pay for the twelve nights and breakfasts, and we plan the pickups around your addresses.",
    "12 晚住市中心的四星酒店（携程四钻标准），每天含早：北京市中心 3 晚、西安老城墙内 2 晚、成都市中心 2 晚、桂林市中心 3 晚、上海市中心 2 晚。付定金前，我们把酒店名和房型发给你确认。想自己订酒店？选「自行预订酒店」：12 晚住宿和早餐你自己订、自己付，我们按你的地址安排接送。",
    "도심의 4성급 호텔(트립닷컴 4다이아 기준)에서 조식 포함 12박: 베이징 도심 3박, 시안 옛 성벽 안 2박, 청두 도심 2박, 계림 도심 3박, 상하이 도심 2박입니다. 계약금을 내시기 전에 호텔 이름과 객실 유형을 보내 확인받습니다. 직접 예약하고 싶으시면 '호텔 개별 예약'을 고르세요. 12박과 조식은 직접 예약·결제하시고, 픽업은 숙소 주소에 맞춰 계획합니다.",
  ),
  serviceNote: l(
    "A private vehicle sized to your group in every city, an English-speaking local guide on every sightseeing day, and a driver on the transfer-only legs. Two second-class high-speed trains and two economy flights with a checked bag, all booked by us in your passport names. Every admission on the plan, eight lunches (Days 2, 3, 4, 5, 7, 9, 10 and 12), travel accident insurance while you tour in China, and one WhatsApp contact before and during the trip. No shopping stops: no factory visits and no sales talks anywhere on the route. A tour escort who travels with you from Beijing to Shanghai can be added at extra cost.",
    "每座城市一辆按人数安排的专车，每个游览日一位当地英语导游，纯接送的路段由司机负责。两段高铁二等座、两段含托运行李的国内经济舱航班，全部由我们用你的护照实名预订。行程所列门票全含，8 顿午餐（第 2、3、4、5、7、9、10、12 天），在中国游览期间的旅游意外险，从出发前到旅行结束都有一位 WhatsApp 联系人。无购物店安排：全程不去工厂，也没有推销。如需一位领队从北京陪到上海，可另外加。",
    "도시마다 인원에 맞춘 전용차, 관광일마다 현지 영어 가이드, 이동만 있는 구간은 기사가 맡습니다. 고속철도 2등석 2회와 위탁 수하물이 포함된 국내선 이코노미 2회는 모두 저희가 여권 이름으로 예약합니다. 일정에 있는 입장권 전부, 점심 8회(2·3·4·5·7·9·10·12일차), 중국 여행 중 여행자 상해보험, 출발 전부터 여행 끝까지 WhatsApp 담당자 한 명이 포함됩니다. 쇼핑 일정은 없습니다. 공장 방문도, 판매 설명도 없습니다. 베이징부터 상하이까지 함께 다니는 인솔자는 추가 비용으로 붙일 수 있습니다.",
  ),
  exclusions: lists(
    [
      "International flights to and from China",
      "Dinners, drinks and lunches other than the eight specified days",
      "Tips, visas, personal medical/cancellation insurance and personal spending",
      "Single-room supplements and optional evening shows or meals",
      "All hotels and hotel breakfasts in the without-hotels option",
      "Anything added outside the confirmed itinerary",
    ],
    [
      "往返中国的国际航班",
      "晚餐、饮料及上述 8 天以外的午餐",
      "司导小费、签证、个人医疗及取消保障保险和个人消费",
      "单房差以及自选的夜间演出或餐食",
      "不含酒店方案中的全部住宿与酒店早餐",
      "最终确认行程以外新增的服务",
    ],
    [
      "중국 왕복 국제선 항공편",
      "저녁 식사·음료 및 명시된 8일 외의 점심",
      "팁·비자·개인 의료 및 취소 보험·개인 경비",
      "1인실 추가금과 선택 저녁 공연·식사",
      "호텔 제외 상품의 모든 숙박과 호텔 조식",
      "확정 일정 밖에 추가하는 서비스",
    ],
  ),
  bookingNote: l(
    "This route is quoted for your dates. Send your travel dates, group size, rooms, arrival and departure flights, luggage, and whether you want our hotels. We check every hotel or pickup address, guide, vehicle, ticket and seat, then send the total and the booking terms in writing before any deposit. An inquiry does not hold flights, trains or timed tickets.",
    "本线路按日期报价。请告诉我们出行日期、人数、房间、到离航班、行李件数，以及要不要含酒店。我们逐项核对酒店或接送地址、导游、用车、门票和座位，再在收定金前书面发给你总价和预订条款。咨询本身不会占住机票、火车票或实名预约门票。",
    "이 여행은 날짜에 맞춰 견적을 드립니다. 여행 날짜, 인원, 객실, 도착·출발 항공편, 수하물, 저희 호텔 포함 여부를 알려 주세요. 호텔 또는 픽업 주소, 가이드, 차량, 입장권과 좌석을 하나하나 확인한 뒤 계약금 전에 총액과 예약 조건을 서면으로 보내 드립니다. 문의만으로 항공편·열차·시간 지정 입장권이 확보되지는 않습니다.",
  ),
  faq: [
    {
      question: l("Why is there no fixed price on this page?", "为什么这页没有固定价格？", "왜 이 페이지에 고정 가격이 없나요?"),
      answer: l(
        "Two flights, two trains and up to twelve hotel nights change price with your dates, and the vehicle and guide cost depends on how many of you travel. So we price your actual dates and group, with or without our hotels, and send the total in writing before you pay anything.",
        "两段航班、两段高铁和最多 12 晚酒店的价格随日期变，车和导游的费用又随人数变。所以我们按你的实际日期和人数报价，含不含酒店都算，付任何钱之前先把总价书面发给你。",
        "항공편 2회, 열차 2회, 최대 12박의 호텔 가격은 날짜에 따라 달라지고 차량과 가이드 비용은 인원에 따라 달라집니다. 그래서 실제 날짜와 인원으로, 호텔 포함·불포함 모두 견적을 내고 어떤 비용도 받기 전에 총액을 서면으로 보내 드립니다.",
      ),
    },
    {
      question: l("What changes if we book our own hotels?", "如果我们自己订酒店，有什么不同？", "호텔을 직접 예약하면 무엇이 달라지나요?"),
      answer: l(
        "Only the hotels and breakfasts come out. The route, guides, vehicles, trains, flights, tickets and eight lunches stay in. Send us your addresses before we price the transfers; a hotel well outside the centre can change the quote.",
        "只拿掉酒店和早餐，行程、导游、用车、高铁、航班、门票和 8 顿午餐都不变。报接送价之前请把酒店地址发给我们；离市中心太远的酒店可能影响报价。",
        "호텔과 조식만 빠지고 일정, 가이드, 차량, 열차, 항공편, 입장권과 점심 8회는 그대로입니다. 이동 요금을 정하기 전에 숙소 주소를 보내 주세요. 도심에서 많이 떨어진 숙소라면 견적이 달라질 수 있습니다.",
      ),
    },
    {
      question: l("Which meals and tickets are included?", "具体包含哪几顿饭和哪些门票？", "어떤 식사와 입장권이 포함되나요?"),
      answer: l(
        "Lunch is included on Days 2, 3, 4, 5, 7, 9, 10 and 12; Day 9 lunch is on the Li River boat. The named admissions include Mutianyu with return cable car and shuttle, Forbidden City, Temple of Heaven, Xi'an City Wall, Terracotta Warriors with shuttle and headsets, Big Wild Goose Pagoda grounds, Panda Base with shuttle, Li River cruise, Moon Hill, Reed Flute Cave and Yu Garden. Sun and Moon Pagodas are seen from outside; dinners and other lunches are separate.",
        "含第 2、3、4、5、7、9、10、12 天午餐；第 9 天为漓江船餐。所列门票含慕田峪及往返缆车、接驳车，故宫、天坛、西安城墙、兵马俑及接驳车和讲解耳机、大雁塔院区、熊猫基地及接驳车、漓江游船、月亮山、芦笛岩和豫园。日月双塔从外面看；晚餐及其余午餐另计。",
        "2·3·4·5·7·9·10·12일차 점심이 포함되며 9일차는 이강 선상 식사입니다. 명시된 입장권에는 무톈위 왕복 케이블카·셔틀, 자금성, 천단, 시안 성벽, 병마용 셔틀·헤드셋, 대안탑 경내, 판다 기지 셔틀, 이강 유람선, 월량산, 노적암과 예원이 들어갑니다. 일월쌍탑은 외관을 보며 저녁과 다른 점심은 별도입니다.",
      ),
    },
    {
      question: l("What happens if the Li River is low?", "漓江水位低怎么办？", "이강 수위가 낮으면 어떻게 되나요?"),
      answer: l(
        "In dry winters the operator sometimes shortens the cruise to a round trip on the middle stretch from Yangdi, which keeps the best-known scenery. We check the water a few days before; if that happens, we drive you on to Yangshuo, and Moon Hill and West Street stay in the plan.",
        "冬季枯水时，船方有时会把航程改成从杨堤出发的中段往返，最有名的那段山水仍在其中。我们开船前几天会核对水位；真改了，就开车送你继续去阳朔，月亮山和西街照常游览。",
        "겨울 갈수기에는 운영사가 가장 잘 알려진 풍경이 있는 양디 출발 중간 구간 왕복으로 유람선을 줄이기도 합니다. 출항 며칠 전에 수위를 확인하고, 그렇게 되면 차로 양삭까지 모시며 월량산과 서가 일정은 그대로 갑니다.",
      ),
    },
    {
      question: l("Will one person travel with us the whole way?", "会有一个人全程陪着我们吗？", "한 사람이 처음부터 끝까지 함께하나요?"),
      answer: l(
        "Each city has its own English-speaking guide for the sightseeing days, and drivers handle the transfer-only legs, so you always have someone who knows that city. If you would like one escort to travel with you from Beijing to Shanghai as well, we can add it to your quote.",
        "每座城市的游览日由当地英语导游陪同，纯接送的路段由司机负责，所以你身边总有熟悉那座城市的人。如果还想要一位领队从北京一路陪到上海，我们可以加进报价。",
        "관광일에는 도시마다 현지 영어 가이드가, 이동만 있는 구간은 기사가 맡으니 늘 그 도시를 잘 아는 사람이 곁에 있습니다. 베이징부터 상하이까지 함께 다니는 인솔자도 원하시면 견적에 넣어 드립니다.",
      ),
    },
  ],
  heroImage: wallPhoto,
  gallery: [warriorsPhoto, liRiverPhoto, bundPhoto],
  routeMedia: [
    routePhoto(1, scene(l("Beijing", "北京", "베이징"), beijingNightPhoto)),
    routePhoto(2, scene(l("Mutianyu Great Wall", "慕田峪长城", "무톈위 만리장성"), mutianyuRidgePhoto)),
    routePhoto(3,
      scene(l("Forbidden City", "故宫", "자금성"), forbiddenCityPhoto),
      scene(l("Temple of Heaven", "天坛", "천단"), templeOfHeavenPhoto),
    ),
    routePhoto(4,
      scene(l("Xi'an City Wall", "西安城墙", "시안 성벽"), xianWallPhoto),
      scene(l("Muslim Quarter", "回民街", "회민거리"), muslimQuarterPhoto),
    ),
    routePhoto(5,
      scene(l("Terracotta Warriors", "兵马俑", "병마용"), terracottaFacesPhoto),
      scene(l("Big Wild Goose Pagoda", "大雁塔", "대안탑"), goosePagodaPhoto),
    ),
    routePhoto(6, scene(l("Chengdu", "成都", "청두"), chengduEveningPhoto)),
    routePhoto(7,
      scene(l("Giant Panda Base", "大熊猫基地", "판다 기지"), pandaPhoto),
      scene(l("Teahouse", "茶馆", "찻집"), teahousePhoto),
    ),
    routePhoto(8, scene(l("Chunxi Road", "春熙路", "춘시루"), chengduCentrePhoto)),
    routePhoto(9,
      scene(l("Li River", "漓江", "이강"), liRiverPhoto),
      scene(l("Yangshuo countryside", "阳朔田园", "양삭 시골"), yangshuoPhoto),
    ),
    routePhoto(10,
      scene(l("Elephant Trunk Hill", "象鼻山", "상비산"), elephantTrunkPhoto),
      scene(l("Sun and Moon Pagodas", "日月双塔", "일월쌍탑"), pagodasPhoto),
    ),
    routePhoto(11, scene(l("The Bund", "外滩", "와이탄"), bundPhoto)),
    routePhoto(12,
      scene(l("Yu Garden", "豫园", "예원"), yuGardenPhoto),
      scene(l("Former French Concession", "原法租界", "옛 프랑스 조계지"), frenchConcessionPhoto),
    ),
    routePhoto(13, scene(l("Departure", "送机", "출발"), departurePhoto)),
  ],
  packages: [
    {
      id: "with-hotels",
      guideMode: "standard",
      label: l("With hotels and breakfast", "含酒店与早餐", "호텔·조식 포함"),
      summary: l(
        "Twelve nights in central 4-star hotels with breakfast, plus the private guides and vehicles, two trains, two flights, the admissions and eight lunches. Hotel names and the total are confirmed in your written quote.",
        "12 晚市中心四星酒店含早，加上私家导游与专车、两段高铁、两段航班、门票和 8 顿午餐。酒店名与总价在书面报价中确认。",
        "도심 4성급 호텔 조식 포함 12박에 전용 가이드·차량, 열차 2회, 항공편 2회, 입장권과 점심 8회가 포함됩니다. 호텔 이름과 총액은 서면 견적에서 확정합니다.",
      ),
      quoteOnly: true,
      prices: [],
    },
    {
      id: "without-hotels",
      guideMode: "standard",
      label: l("Arrange your own hotels", "自行预订酒店", "호텔 개별 예약"),
      summary: l(
        "Everything else stays the same: guides, vehicles, trains, flights, admissions and eight lunches. You book and pay for the twelve hotel nights and breakfasts; pickups and the total are confirmed in your written quote.",
        "其余全部不变：导游、专车、高铁、航班、门票和 8 顿午餐。12 晚酒店和早餐由你自己订、自己付；接送安排和总价在书面报价中确认。",
        "가이드, 차량, 열차, 항공편, 입장권, 점심 8회는 그대로입니다. 호텔 12박과 조식은 직접 예약·결제하시고, 픽업과 총액은 서면 견적에서 확정합니다.",
      ),
      quoteOnly: true,
      prices: [],
    },
  ],
  datePublished: "2026-10-09",
  dateModified: "2026-10-10",
  lastReviewed: "2026-10-10",
};

const credit = (
  subject: LocalizedText,
  author: string,
  sourceUrl: string,
  licenseLabel: string,
  licenseUrl: string,
): PrivateTourPhotoCredit => ({ subject, author, sourceUrl, licenseLabel, licenseUrl });

/** Credits for every licensed photo on this page; owner-library photos need none. */
export const fiveCityPrivateTourPhotoCreditsBySlug: Readonly<
  Record<string, readonly PrivateTourPhotoCredit[]>
> = {
  [slug]: [
    credit(
      l("Mutianyu Great Wall", "慕田峪长城", "무톈위 만리장성"),
      "Lloyd Tudor",
      "https://commons.wikimedia.org/wiki/File:The_Mutianyu_section_of_the_Great_Wall_of_China.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/",
    ),
    credit(
      l("Great Wall at Mutianyu in autumn", "秋天的慕田峪长城", "가을의 무톈위 만리장성"),
      "Francesco Bini",
      "https://commons.wikimedia.org/wiki/File:Mutianyu,_grande_muraglia_cinese,_veduta_(autunno_2024)_11.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/",
    ),
    credit(
      l("Temple of Heaven", "北京天坛", "베이징 천단"),
      "xiquinhosilva / Xiquinho Silva",
      "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven_-_Hall_of_Prayer_for_Good_Harvests_01.jpg",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/",
    ),
    credit(
      l("Terracotta Army Pit 1", "兵马俑一号坑", "병마용 1호 갱"),
      "BrokenSphere",
      "https://commons.wikimedia.org/wiki/File:Terracotta_Army_Pit_1.JPG",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/",
    ),
    credit(
      l("Terracotta warriors, Pit 1", "兵马俑一号坑近景", "병마용 1호 갱 근경"),
      "Gary Todd from Xinzheng, China",
      "https://commons.wikimedia.org/wiki/File:Qin_Terracotta_Army,_Pit_1_(9895750725).jpg",
      "CC0",
      "https://creativecommons.org/publicdomain/zero/1.0/",
    ),
    credit(
      l("Big Wild Goose Pagoda", "大雁塔", "대안탑"),
      "颐园新居",
      "https://commons.wikimedia.org/wiki/File:Giant_Wild_Goose_Pagoda_20140502.JPG",
      "CC BY-SA 3.0",
      "https://creativecommons.org/licenses/by-sa/3.0/",
    ),
    credit(
      l("Anshun Bridge, Chengdu", "成都安顺廊桥", "청두 안순랑교"),
      "tyrosin",
      "https://commons.wikimedia.org/wiki/File:Anshun_Bridge_Chengdu.jpg",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/",
    ),
    credit(
      l("The Bund, Shanghai", "上海外滩", "상하이 와이탄"),
      "Another Believer",
      "https://commons.wikimedia.org/wiki/File:The_Bund,_Shanghai,_China_(December_2015)_-_11.JPG",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/",
    ),
    credit(
      l("Yu Garden", "豫园", "예원"),
      "King of Hearts",
      "https://commons.wikimedia.org/wiki/File:Yu_Garden_Shanghai_November_2017_002.jpg",
      "CC BY-SA 4.0",
      "https://creativecommons.org/licenses/by-sa/4.0/",
    ),
    credit(
      l("Former French Concession", "原法租界街区", "옛 프랑스 조계 거리"),
      "Fabio Achilli",
      "https://commons.wikimedia.org/wiki/File:French_Concession,_Shanghai,_China_(9740638438).jpg",
      "CC BY 2.0",
      "https://creativecommons.org/licenses/by/2.0/",
    ),
  ],
};
