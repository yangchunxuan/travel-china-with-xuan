import type {
  LocalizedStringList,
  LocalizedText,
  LocalizedValue,
  PrivateTourDay,
  PrivateTourFact,
  PrivateTourFaqItem,
  PrivateTourImage,
  PrivateTourPackage,
  PrivateTourPriceTier,
  PrivateTourProduct,
  PrivateTourRouteMediaGroup,
} from "./privateTourProducts";
import type { PrivateTourPhotoCredit } from "./privateTourPhotoCredits";

// Northeast China winter routes for the 2026–27 season.
//
// The driver handles travel logistics and speaks English (owner confirmation,
// 2026-09-30), but is not a licensed guide and does not provide commentary
// inside scenic areas. Site-wide conversion supplies USD and KRW displays.

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });
const lists = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
): LocalizedStringList => ({ en, zh, ko });
const day = (
  dayNumber: number,
  title: LocalizedText,
  description: LocalizedText,
): PrivateTourDay => ({ day: dayNumber, title, description });
const faq = (question: LocalizedText, answer: LocalizedText): PrivateTourFaqItem => ({ question, answer });
const facts = (
  en: readonly PrivateTourFact[],
  zh: readonly PrivateTourFact[],
  ko: readonly PrivateTourFact[],
): LocalizedValue<readonly PrivateTourFact[]> => ({ en, zh, ko });
const fact = (label: string, value: string): PrivateTourFact => ({ label, value });

// The template's structural field; shopping policy is confirmed in the quote.
const servicePolicy = Object.freeze({
  shoppingStops: false,
  addedServicesRequirePriorAgreement: true,
} as const);

const PUBLISHED = "2026-10-09";

type SeasonPrices = readonly [twoTravellers: number, fourTravellers: number, sixTravellers: number, eightTravellers: number];

const tiers = (prices: SeasonPrices): readonly PrivateTourPriceTier[] =>
  ([2, 4, 6, 8] as const).map((travelers, index) => ({
    travelers,
    cnyPerPerson: prices[index],
  }));

const seasonPackages = (low: SeasonPrices, peak: SeasonPrices): readonly PrivateTourPackage[] => [
  {
    id: "low-season",
    guideMode: "standard",
    label: l("Low season · 10 Nov–19 Dec / 15 Feb–10 Mar", "淡季 · 11月10日–12月19日 / 2月15日–3月10日", "비수기 · 11월 10일~12월 19일 / 2월 15일~3월 10일"),
    summary: l(
      "Departures 10 November–19 December 2026 or 15 February–10 March 2027. Your own vehicle and driver, twin-share reference hotels, and the named inclusions on this page. We check ski slopes and snow attractions for your dates before payment.",
      "2026 年 11 月 10 日至 12 月 19 日，或 2027 年 2 月 15 日至 3 月 10 日出发。含私车和司机、双人同住的参考酒店，以及本页列明项目。雪场和冰雪景点的开放日期，付款前按你的日期核对。",
      "2026년 11월 10일~12월 19일 또는 2027년 2월 15일~3월 10일 출발입니다. 일행 전용 차량과 운전기사, 성인 2명 1실 기준 참고 호텔 및 이 페이지에 적힌 포함 항목으로 구성됩니다. 스키장과 빙설 명소의 운영 기간은 결제 전에 확인합니다.",
    ),
    prices: tiers(low),
  },
  {
    id: "peak-season",
    guideMode: "standard",
    label: l("Peak season · 20 Dec–14 Feb", "旺季 · 12月20日–2月14日", "성수기 · 12월 20일~2월 14일"),
    summary: l(
      "Departures 20 December 2026–14 February 2027. The same service scope applies; we confirm hotels, vehicle and winter attractions for your dates before payment.",
      "2026 年 12 月 20 日至 2027 年 2 月 14 日出发。服务内容与淡季相同；付款前确认酒店、车辆和冬季项目在出行日期的安排。",
      "2026년 12월 20일~2027년 2월 14일 출발입니다. 서비스 범위는 비수기와 같으며, 결제 전 호텔·차량·겨울 명소 운영을 확인합니다.",
    ),
    prices: tiers(peak),
  },
];

const harbinImages = "/images/tours/harbin-winter-5-day-private-tour";
const changbaishanImages = "/images/tours/changbaishan-yanji-winter-6-day-private-tour";

const image = (
  src: string,
  alt: LocalizedText,
  caption: LocalizedText,
  width = 1600,
  height = 1000,
  objectPosition = "50% 50%",
): PrivateTourImage => ({ src, width, height, objectPosition, alt, caption });

const routePhoto = (
  dayNumber: number,
  ...variants: readonly { label: LocalizedText; image: PrivateTourImage }[]
): PrivateTourRouteMediaGroup => ({ day: dayNumber, variants });

const snowTownHero = image(
  "/images/tours/northeast-winter-2026-27/snow-town-morning-1600.webp",
  l(
    "Snow-covered wooden houses and red lanterns in China Snow Town",
    "中国雪乡覆雪的木屋和红灯笼",
    "중국 설향의 눈 덮인 목조 가옥과 붉은 등불",
  ),
  l(
    "China Snow Town, photographed in February 2010. Snow depth and village facilities vary on your date.",
    "2010 年 2 月拍摄的中国雪乡；积雪深度和村内设施以出行时为准。",
    "2010년 2월에 촬영한 중국 설향입니다. 적설량과 마을 시설은 여행 날짜에 따라 달라집니다.",
  ),
);

const beijiVillageHero = image(
  "/images/tours/northeast-winter-2026-27/beiji-village-night-1600.webp",
  l(
    "A snow-covered wooden house at night in Beiji Village, Mohe",
    "漠河北极村夜晚覆雪的木屋",
    "모허 북극촌의 밤, 눈 덮인 목조 가옥",
  ),
  l(
    "A winter night in Beiji Village; this historic photo does not show current accommodation or weather.",
    "北极村冬夜旧照；不代表如今的住宿条件或出行当天的天气。",
    "북극촌의 과거 겨울밤 사진입니다. 현재 숙소 상태나 여행 당일 날씨를 나타내지는 않습니다.",
  ),
);

const centralStreet = {
  label: l("Central Street", "中央大街", "중앙대가"),
  image: image(
    `${harbinImages}/central-street-winter-1600.jpg`,
    l("Snowy Central Street in Harbin in 2018", "2018 年雪中的哈尔滨中央大街", "2018년 눈 내린 하얼빈 중앙대가"),
    l(
      "Central Street in Harbin, photographed in January 2018; snow and crowds vary on the day.",
      "2018 年 1 月拍摄的哈尔滨中央大街；有没有雪、人多不多，以当天为准。",
      "2018년 1월에 촬영한 하얼빈 중앙대가입니다. 눈과 인파는 당일 상황에 따라 다릅니다.",
    ),
  ),
};

const iceSlide = {
  label: l("Ice and Snow World", "冰雪大世界", "빙설대세계"),
  image: image(
    `${harbinImages}/ice-slide-1600.webp`,
    l("Ice slide at Harbin Ice and Snow World in 2026", "2026 年哈尔滨冰雪大世界冰滑梯", "2026년 하얼빈 빙설대세계 얼음 미끄럼틀"),
    l(
      "The Ice and Snow World ice-slide area in 2026; opening, facilities and activities vary by season.",
      "2026 年冰雪大世界冰滑梯区实景；开放时间、设施与项目以当季为准。",
      "2026년 빙설대세계 얼음 미끄럼틀 구역입니다. 개장, 시설과 체험은 시즌별로 달라집니다.",
    ),
  ),
};

const harbinStation = (caption: LocalizedText, label: LocalizedText) => ({
  label,
  image: image(
    `${harbinImages}/departure-harbin-station-1600.webp`,
    l(
      "The symmetrical train shed and platforms inside Harbin Railway Station",
      "哈尔滨站内对称展开的站台与拱形雨棚",
      "하얼빈역 내부의 대칭형 승강장과 아치형 지붕",
    ),
    caption,
  ),
});

const sophiaExterior = {
  label: l("Saint Sophia Cathedral", "圣索菲亚教堂", "성 소피아 성당"),
  image: image(
    `${harbinImages}/gallery-sophia-2026-1600.webp`,
    l(
      "The complete Saint Sophia Cathedral exterior in central Harbin",
      "哈尔滨市中心完整可见的圣索菲亚教堂外观",
      "하얼빈 도심에서 온전히 보이는 성 소피아 성당 외관",
    ),
    l(
      "Saint Sophia Cathedral in Harbin; snow, lighting and interior access vary on your travel date.",
      "哈尔滨圣索菲亚教堂；有没有雪、是否亮灯、内部是否开放，以出行当天为准。",
      "하얼빈 성 소피아 성당입니다. 눈, 조명과 내부 개방 여부는 여행 당일 상황에 따라 다릅니다.",
    ),
  ),
};

// ---------------------------------------------------------------------------
// Shared copy
// ---------------------------------------------------------------------------

const driverGuideFaq = faq(
  l(
    "What does the driver-guide do?",
    "司机兼向导负责什么？",
    "운전기사 겸 안내인은 무엇을 하나요?",
  ),
  l(
    "Your driver speaks English and helps with timings, transfers and city stops. The driver is not a licensed tour guide and does not provide scenic-area commentary. At large sites you explore independently and meet the driver afterwards. Ski instruction, if part of the confirmed package, is provided by the resort's instructors.",
    "司机会说中文和英语，负责行程时间、各站接送和市区游览的衔接。司机不是持证导游，不提供景区讲解；大型景区内自行游玩，结束后与司机会合。若确认的滑雪套餐包含教学，由雪场教练负责。",
    "운전기사는 영어로 소통하며 시간 조율, 이동 및 시내 방문을 돕습니다. 공인 관광 가이드는 아니며 관광지 해설은 제공하지 않습니다. 넓은 관광지는 자유롭게 둘러본 뒤 운전기사와 다시 만납니다. 확정된 스키 패키지에 강습이 포함된다면 스키장 강사가 맡습니다. 한국어 안내는 포함되지 않습니다.",
  ),
);

const priceFaq = faq(
  l(
    "Which price applies to my dates and group?",
    "我的日期和人数适用哪个价格？",
    "내 날짜와 인원에는 어떤 요금이 적용되나요?",
  ),
  l(
    "The published season runs 10 November 2026–10 March 2027: low season is 10 November–19 December and 15 February–10 March; peak season is 20 December–14 February. Prices are per person for 2, 4, 6 or 8 travellers, with two adults sharing a room. Other group sizes, children's prices and single-room supplements are quoted separately; you receive the final total in writing before payment.",
    "本季报价适用 2026 年 11 月 10 日至 2027 年 3 月 10 日：11 月 10 日至 12 月 19 日、2 月 15 日至 3 月 10 日为淡季；12 月 20 日至次年 2 月 14 日为旺季。页面为 2、4、6 或 8 人同行时的每人价，按两位成人同住一间计算。其他人数、儿童价和单房差另行报价，付款前书面确认最终总价。",
    "이 요금은 2026년 11월 10일~2027년 3월 10일에 적용됩니다. 비수기는 11월 10일~12월 19일과 2월 15일~3월 10일, 성수기는 12월 20일~2월 14일입니다. 표시는 2·4·6·8명 기준 1인 요금이며 성인 2명 1실 기준입니다. 그 외 인원, 아동 요금과 1인실 추가금은 따로 견적을 드리고 최종 총액을 결제 전에 서면으로 확인합니다.",
  ),
);

const notStatedFaq = faq(
  l(
    "Are meals and airport transfers included?",
    "包含餐食和接送机吗？",
    "식사와 공항 픽업·샌딩이 포함되나요?",
  ),
  l(
    "The admission tickets named in the service section are included. Meals and airport or station transfers are confirmed, along with any additional tickets and cancellation terms, in writing before payment.",
    "服务内容列明的门票已包含。餐食、机场或车站接送、额外门票及取消条款，付款前会逐项书面确认。",
    "서비스 항목에 명시된 입장권은 포함됩니다. 식사, 공항·역 이동, 추가 입장권 및 취소 규정은 결제 전에 서면으로 확인합니다.",
  ),
);

const sleeperTrainFaq = (dayNights: LocalizedText) => faq(
  l(
    "What are the two sleeper-train nights like?",
    "两晚卧铺夜车是什么安排？",
    "침대열차 2박은 어떻게 진행되나요?",
  ),
  l(
    `Two nights are spent on overnight trains between Harbin and Mohe (${dayNights.en}), in hard-sleeper (硬卧) berths. Berths are allocated at random, so your group may be given upper, middle or lower berths and may not be side by side. There is no hotel on those two nights. If you need a different arrangement, ask before payment.`,
    `有两晚在哈尔滨与漠河之间的夜车上度过（${dayNights.zh}），铺位为硬卧。铺位随机分配，可能是上铺、中铺或下铺，同行人也不一定挨在一起。这两晚不住酒店。如需其他安排，请在付款前提出。`,
    `2박은 하얼빈과 모허 사이를 오가는 야간열차의 경와(硬卧, 일반 침대칸)에서 보냅니다(${dayNights.ko}). 침대는 무작위로 배정되어 상단·중단·하단 어느 자리든 될 수 있고, 일행이 나란히 배정되지 않을 수도 있습니다. 이 2박은 호텔 숙박이 아닙니다. 다른 조건이 필요하면 결제 전에 알려 주세요.`,
  ),
);

const coldWeatherNote = l(
  "Northeast China in winter can fall below −20°C, so bring professional cold-weather clothing, insulated snow boots, gloves and face protection. Snow, road closures and operator decisions can shorten or reorder outdoor stops.",
  "东北冬季可能出现 −20°C 以下严寒，请准备专业防寒服、保暖雪地靴、手套和面部防护。降雪、封路或运营方决定，都可能让室外项目缩短或调整顺序。",
  "중국 동북의 겨울은 영하 20°C 아래로 내려갈 수 있습니다. 전문 방한복, 보온 방한화, 장갑과 얼굴 보호 장비를 준비하세요. 눈, 도로 통제나 운영자의 결정에 따라 야외 일정이 줄거나 순서가 바뀔 수 있습니다.",
);

const bookingNote = l(
  `${coldWeatherNote.en} The starting prices shown are per person for 2, 4, 6 or 8 travellers sharing twin rooms, on departures 10 November 2026–10 March 2027 only. Ice attractions, ski areas and weather-sensitive activities are checked for your dates before payment. Other group sizes, children's prices, single rooms and cancellation terms are confirmed in your written quote.`,
  `${coldWeatherNote.zh}页面所示起价为 2、4、6 或 8 人同行、两人同住一间时的每人价，仅适用于 2026 年 11 月 10 日至 2027 年 3 月 10 日出发。冰雪景点、雪场及受天气影响的项目，付款前按你的日期核对。其他人数、儿童价、单房和取消条款，以书面报价确认为准。`,
  `${coldWeatherNote.ko} 표시된 시작가는 2·4·6·8명, 성인 2명 1실 기준 1인 요금이며 2026년 11월 10일~2027년 3월 10일 출발에만 적용됩니다. 빙설 명소, 스키장 및 날씨에 좌우되는 활동은 결제 전에 확인합니다. 그 외 인원, 아동 요금, 1인실과 취소 규정은 서면 견적에서 확정합니다.`,
);

const exclusions = (
  extraEn: readonly string[],
  extraZh: readonly string[],
  extraKo: readonly string[],
) => lists(
  [
    "Meals, arrival and departure transfers, and transport to the starting city or onward from the ending city: confirm the scope and price in your written quote",
    "Any admission or optional activity beyond the named inclusions: confirm in your written quote",
    ...extraEn,
    "Children's prices, single-room supplements and cancellation terms: quoted separately before payment",
  ],
  [
    "餐食、抵离接送及往返行程起终点的交通：服务范围和价格以书面报价确认为准",
    "已列明项目以外的门票和自选活动：以书面报价确认为准",
    ...extraZh,
    "儿童价、单房差与取消条款：付款前另行书面确认",
  ],
  [
    "식사, 도착·출발 이동 및 코스 출발지·종료지까지의 교통: 범위와 요금은 서면 견적에서 확인",
    "명시된 포함 항목 이외의 입장권과 선택 활동: 서면 견적에서 확인",
    ...extraKo,
    "아동 요금, 1인실 추가금과 취소 규정: 결제 전에 별도 서면 확인",
  ],
);

const iceWorldOpeningFaq = faq(
  l(
    "What if Ice and Snow World is not open on my dates?",
    "如果出行时冰雪大世界还没开放怎么办？",
    "여행 날짜에 빙설대세계가 개장하지 않았다면 어떻게 되나요?",
  ),
  l(
    "The 2026–27 opening date has not been confirmed. For departures before the official opening, the visit and ticket cannot be assumed; we agree a revised itinerary and price in writing before payment.",
    "2026–27 雪季的开放日期尚未确定。若出行时尚未正式开放，不能默认包含入园和门票；付款前会书面确认调整后的行程与价格。",
    "2026~27 시즌 개장일은 아직 확정되지 않았습니다. 공식 개장 전 출발이라면 방문과 입장권을 보장할 수 없으며, 결제 전에 변경 일정과 요금을 서면으로 합의합니다.",
  ),
);

const serviceNote = (inclusions: LocalizedText) => l(
  `Included: a private vehicle sized to your group (5-seat SUV for 2, 7-seat van for 4, or 9-seat van for 6–8); an English-speaking driver who handles logistics but is not a licensed guide and gives no scenic-area commentary; twin-share reference hotels; ${inclusions.en}; and travel accident insurance with CNY 800,000 stated cover. The driver's meals and lodging allowance are included. Meals, airport and station transfers, and any tickets not named here are confirmed in your written quote.`,
  `包含：按人数安排的私车（2 人用 5 座 SUV、4 人用 7 座商务车、6–8 人用 9 座商务车）；会说中文和英语、负责行程衔接的司机（非持证导游，不提供景区讲解）；双人同住的参考酒店；${inclusions.zh}；以及保额为 80 万元的旅游意外保险。司机食宿补贴已包含。餐食、机场和车站接送及未列明的门票，付款前在书面报价中确认。`,
  `포함: 인원에 맞춘 전용 차량(2명 5인승 SUV, 4명 7인승 차량, 6~8명 9인승 차량), 영어로 소통하며 이동을 돕는 운전기사(공인 가이드가 아니며 관광지 해설은 제공하지 않음), 성인 2명 1실 기준 참고 호텔, ${inclusions.ko}, 80만 위안 보장의 여행 상해보험. 운전기사 식사·숙박 비용도 포함됩니다. 식사, 공항·역 이동 및 여기에 적히지 않은 입장권은 서면 견적에서 확인합니다.`,
);

const yabuliSkiPackage = l(
  "Harbin Ice and Snow World and Snow Town tickets, plus the Yabuli ski package (ski time, equipment and any instruction as stated in your written confirmation)",
  "哈尔滨冰雪大世界和雪乡门票，以及亚布力滑雪套票（时长、雪具和是否含教练以书面确认为准）",
  "하얼빈 빙설대세계와 설향 입장권, 야부리 스키 패키지(시간·장비·강습 포함 여부는 서면 확인서 기준)",
);

const yabuliChangbaiTickets = l(
  "Harbin Ice and Snow World, Snow Town, Changbai Mountain North Slope and Xueling tickets, plus the Yabuli ski package (ski time, equipment and any instruction as stated in your written confirmation)",
  "哈尔滨冰雪大世界、雪乡、长白山北坡和雪岭门票，以及亚布力滑雪套票（时长、雪具和是否含教练以书面确认为准）",
  "하얼빈 빙설대세계·설향·백두산 북파·쉐링 입장권, 야부리 스키 패키지(시간·장비·강습 포함 여부는 서면 확인서 기준)",
);

const servicePrices = {
  en: "2, 4, 6 or 8 travellers · two seasons",
  zh: "2、4、6、8 人 · 淡旺季两档",
  ko: "2·4·6·8명 · 비수기/성수기",
} as const;

// Days 1–4 are shared by the Harbin–Yabuli–Snow Town routes.
const arriveHarbin = day(
  1,
  l("Arrive in Harbin", "抵达哈尔滨", "하얼빈 도착"),
  l(
    "Arrive in Harbin and check in to your reference hotel. Airport or station transfers are included only if your written quote lists them. No sightseeing is planned today; overnight in Harbin.",
    "抵达哈尔滨，入住参考酒店。接机或接站是否包含，以书面报价为准。当天不安排游览，住哈尔滨。",
    "하얼빈에 도착해 참고 호텔에 체크인합니다. 공항·역 픽업은 서면 견적에 적힌 경우에만 포함됩니다. 이날은 관광 일정이 없으며 하얼빈에서 숙박합니다.",
  ),
);

const harbinIceDay = day(
  2,
  l("Central Street and Ice and Snow World", "中央大街与冰雪大世界", "중앙대가와 빙설대세계"),
  l(
    "Walk Central Street, then visit Harbin Ice and Snow World with admission included when open. Explore independently and meet the driver afterwards. Before its official opening, we reconfirm the itinerary and price in writing before payment. Overnight in Harbin.",
    "逛中央大街后，在冰雪大世界正式开放时入园游玩，门票包含在内；园区内自行游玩，结束后与司机会合。若出行时尚未开放，付款前会书面确认调整后的行程与价格。住哈尔滨。",
    "중앙대가를 걷고 빙설대세계가 개장했다면 포함된 입장권으로 방문합니다. 공원 안은 자유롭게 둘러본 뒤 운전기사와 만납니다. 공식 개장 전 출발은 결제 전에 일정과 요금을 다시 서면 확인합니다. 하얼빈에서 숙박합니다.",
  ),
);

const yabuliDay = day(
  3,
  l("Ski day at Yabuli", "亚布力滑雪", "야부리 스키"),
  l(
    "Drive to Yabuli for a day of skiing. The Yabuli ski package is included; ski time, equipment and instruction are as stated in your written confirmation. Overnight at Yabuli.",
    "驱车前往亚布力滑雪。含亚布力滑雪套餐，滑雪时长、雪具和教练以书面确认为准。住亚布力。",
    "차량으로 야부리에 가서 하루 스키를 탑니다. 야부리 스키 패키지가 포함되며, 스키 시간, 장비와 강습은 서면 확인서에 적힌 내용을 따릅니다. 야부리에서 숙박합니다.",
  ),
);

const snowTownDay = day(
  4,
  l(
    "Ten-mile Ice and Snow Gallery to Snow Town",
    "经十里冰雪画廊前往雪乡",
    "십리 빙설화랑을 지나 설향으로",
  ),
  l(
    "Travel from Yabuli past the Ten-mile Ice and Snow Gallery (十里冰雪画廊) to Snow Town (雪乡). Overnight in the Snow Town area.",
    "从亚布力出发，途经十里冰雪画廊前往雪乡。住雪乡一带。",
    "야부리를 출발해 십리 빙설화랑(十里冰雪画廊)을 지나 설향(雪乡)으로 갑니다. 설향 일대에서 숙박합니다.",
  ),
);

const harbinSnowTownRoutePhotos = [
  routePhoto(2, centralStreet, iceSlide),
] as const;

const harbinSnowTownCredits: readonly PrivateTourPhotoCredit[] = [
  {
    subject: l("Harbin Ice and Snow World", "哈尔滨冰雪大世界", "하얼빈 빙설대세계"),
    author: "Garosio33",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Harbin_Ice_%26_Snow_Festival_2026.jpg",
    licenseLabel: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    subject: l("Ice and Snow World ice slide", "冰雪大世界冰滑梯", "빙설대세계 얼음 미끄럼틀"),
    author: "Garosio33",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Harbin_Ice_%26_Snow_Festival_2026_-_Ice_slide.jpg",
    licenseLabel: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    subject: l("Central Street, Harbin", "哈尔滨中央大街", "하얼빈 중앙대가"),
    author: "Yan Enming",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Central_Street_(Zhongyang_Dajie),_Harbin_16.jpg",
    licenseLabel: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
];

const harbinStationCredit: PrivateTourPhotoCredit = {
  subject: l("Harbin Railway Station", "哈尔滨站", "하얼빈역"),
  author: "Jonashtand",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:201907_Harbin_Railway_Station_07.jpg",
  licenseLabel: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
};

// ---------------------------------------------------------------------------
// 1. Harbin, Yabuli & Snow Town — 6 days / 5 nights
// ---------------------------------------------------------------------------

const snowTownSlug = "harbin-yabuli-snow-town-6-day-private-tour";
const harbinYabuliSnowTown: PrivateTourProduct = {
  id: "private-tour-harbin-yabuli-snow-town-6d5n",
  slug: snowTownSlug,
  days: 6,
  nights: 5,
  routePhotoFallback: false,
  servicePolicy,
  title: l(
    "Harbin, Yabuli & Snow Town: 6-Day Winter Private Tour",
    "哈尔滨·亚布力·雪乡 6 天 5 晚冬季私家团",
    "하얼빈·야부리·설향 6일 겨울 프라이빗 투어",
  ),
  metadataDescription: l(
    "Six-day private winter route: Harbin Ice and Snow World, a Yabuli ski day and Snow Town, with five hotel nights, a private vehicle and a driver-guide.",
    "6 天冬季私家路线：哈尔滨冰雪大世界、亚布力滑雪和雪乡，住 5 晚酒店、不坐夜车，私车和司机兼向导只服务你们一行。",
    "6일 겨울 프라이빗 코스: 하얼빈 빙설대세계, 야부리 스키, 설향. 호텔 5박, 야간열차 없음, 전용 차량과 운전기사 겸 안내인.",
  ),
  eyebrow: l(
    "Ice, skiing and Snow Town in a short trip",
    "用较短的天数看冰雪、滑雪和雪乡",
    "짧은 일정으로 빙설, 스키, 설향까지",
  ),
  lede: l(
    "Start with Central Street and Harbin Ice and Snow World, ski a day at Yabuli, then continue past the Ten-mile Ice and Snow Gallery to Snow Town. Five hotel nights and no night trains, with a private vehicle and a driver-guide for your party.",
    "先逛中央大街和哈尔滨冰雪大世界，再到亚布力滑雪一天，之后经十里冰雪画廊前往雪乡。全程住 5 晚酒店、不坐夜车，私车和司机兼向导只服务你们一行。",
    "중앙대가와 하얼빈 빙설대세계를 먼저 보고, 야부리에서 하루 스키를 탄 뒤 십리 빙설화랑을 지나 설향으로 갑니다. 호텔 5박에 야간열차가 없으며, 일행 전용 차량과 운전기사 겸 안내인이 함께합니다.",
  ),
  summary: l(
    "Six days and five hotel nights: two in Harbin, one at Yabuli, one in the Snow Town area and a final night in Harbin. Suited to first-time visitors to Northeast China who want Harbin's ice scenery, a ski day and Snow Town in a short trip.",
    "6 天住 5 晚酒店：哈尔滨 2 晚、亚布力 1 晚、雪乡一带 1 晚，最后回哈尔滨住 1 晚。适合第一次来东北、想在较短行程里看哈尔滨冰雪、滑一天雪并去雪乡的旅客。",
    "6일 동안 호텔 5박: 하얼빈 2박, 야부리 1박, 설향 일대 1박, 마지막으로 하얼빈 1박입니다. 처음 중국 동북을 찾아 짧은 일정에 하얼빈 빙설 풍경, 스키 하루, 설향을 모두 보고 싶은 분께 맞습니다.",
  ),
  facts: facts(
    [
      fact("Route", "Harbin → Yabuli → Snow Town → Harbin"),
      fact("Nights", "5 hotel nights · no night trains"),
      fact("Service", "Private vehicle · driver (not a licensed guide)"),
      fact("Prices", servicePrices.en),
    ],
    [
      fact("路线", "哈尔滨 → 亚布力 → 雪乡 → 哈尔滨"),
      fact("住宿", "5 晚酒店 · 不坐夜车"),
      fact("服务", "私车 · 司机接待（非持证导游）"),
      fact("价格", servicePrices.zh),
    ],
    [
      fact("동선", "하얼빈 → 야부리 → 설향 → 하얼빈"),
      fact("숙박", "호텔 5박 · 야간열차 없음"),
      fact("서비스", "전용 차량 · 운전기사(공인 가이드 아님)"),
      fact("요금", servicePrices.ko),
    ],
  ),
  highlights: lists(
    [
      "Central Street and Harbin Ice and Snow World",
      "A ski day at Yabuli",
      "The Ten-mile Ice and Snow Gallery on the way to Snow Town",
      "A night in the Snow Town area",
    ],
    ["中央大街与哈尔滨冰雪大世界", "亚布力滑雪一天", "途经十里冰雪画廊前往雪乡", "在雪乡一带住一晚"],
    ["중앙대가와 하얼빈 빙설대세계", "야부리 스키 하루", "설향 가는 길의 십리 빙설화랑", "설향 일대 1박"],
  ),
  itinerary: [
    arriveHarbin,
    harbinIceDay,
    yabuliDay,
    snowTownDay,
    day(
      5,
      l("Back to Harbin", "返回哈尔滨", "하얼빈으로 복귀"),
      l(
        "Drive from Snow Town back to Harbin. Overnight in Harbin.",
        "从雪乡驱车返回哈尔滨。住哈尔滨。",
        "설향에서 차량으로 하얼빈에 돌아옵니다. 하얼빈에서 숙박합니다.",
      ),
    ),
    day(
      6,
      l("Depart Harbin", "哈尔滨返程", "하얼빈 출발"),
      l(
        "Check out and depart from Harbin. A transfer to the airport or station is included only if your written quote lists it.",
        "退房后从哈尔滨返程。送机或送站是否包含，以书面报价为准。",
        "체크아웃 후 하얼빈에서 출발합니다. 공항·역 샌딩은 서면 견적에 적힌 경우에만 포함됩니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five hotel nights and no night trains: two in Harbin, one at Yabuli, one in the Snow Town area and one more in Harbin. Prices are based on reference hotels with two adults sharing one room; the hotels are named in your written confirmation, and single rooms are quoted separately.",
    "共 5 晚酒店、不坐夜车：哈尔滨 2 晚、亚布力 1 晚、雪乡一带 1 晚，再回哈尔滨住 1 晚。价格按参考酒店、两位成人同住一间计算；具体酒店写在书面确认单上，单住另行报价。",
    "호텔 5박, 야간열차 없음: 하얼빈 2박, 야부리 1박, 설향 일대 1박, 다시 하얼빈 1박입니다. 요금은 참고 호텔 성인 2명 1실 기준이며, 호텔 이름은 서면 확인서에 적어 드리고 1인실은 따로 견적을 드립니다.",
  ),
  serviceNote: serviceNote(yabuliSkiPackage),
  exclusions: exclusions(
    ["Extra Yabuli ski time, equipment or instruction beyond the included package: confirm any added price before payment"],
    ["亚布力套餐以外的滑雪时长、雪具或教练：如需增加，付款前确认差价"],
    ["포함된 야부리 패키지를 넘는 스키 시간·장비·강습: 추가 요금을 결제 전에 확인"],
  ),
  bookingNote,
  faq: [
    faq(
      l(
        "How does this route compare with the other Northeast winter routes?",
        "这条路线和其他东北冬季路线有什么不同？",
        "다른 동북 겨울 코스와 무엇이 다른가요?",
      ),
      l(
        "This is the easiest introduction: five hotel nights and no night trains. The 8-day version adds Changbai Mountain and Yanji but has a long transfer on Day 5. The Mohe routes reach China's far north but include two nights on sleeper trains.",
        "这是最轻松的入门路线：住 5 晚酒店，不坐夜车。8 天版本加上长白山和延吉，但第 5 天是长途转场日。漠河路线能去到中国最北端，但要坐两晚卧铺夜车。",
        "가장 무난한 입문 코스로, 호텔 5박에 야간열차가 없습니다. 8일 코스는 백두산과 연길을 더하지만 5일차에 장거리 이동이 있습니다. 모허 코스는 중국 최북단까지 가는 대신 침대열차 2박이 포함됩니다.",
      ),
    ),
    driverGuideFaq,
    faq(
      l("What does the Yabuli ski package include?", "亚布力滑雪套餐包含什么？", "야부리 스키 패키지에는 무엇이 포함되나요?"),
      l(
        "The package is included in the price, but its ski time, equipment and instruction are not fixed on this page. We state them in your written confirmation before you pay; anything beyond that package is extra.",
        "滑雪套餐已含在价格里，但滑雪时长、雪具和教练本页没有写定，付款前会在书面确认单上写明；超出套餐的部分另计。",
        "스키 패키지는 요금에 포함되지만, 스키 시간, 장비와 강습은 이 페이지에서 확정하지 않습니다. 결제 전 서면 확인서에 적어 드리며, 패키지를 넘는 부분은 별도입니다.",
      ),
    ),
    iceWorldOpeningFaq,
    priceFaq,
    notStatedFaq,
  ],
  heroImage: snowTownHero,
  gallery: [],
  routeMedia: [
    ...harbinSnowTownRoutePhotos,
    routePhoto(
      6,
      harbinStation(
        l(
          "Harbin Railway Station; if you fly out, you leave from the airport instead.",
          "照片为哈尔滨站；如坐飞机返程，则从机场出发。",
          "사진은 하얼빈역입니다. 항공편으로 떠나시면 공항에서 출발합니다.",
        ),
        l("Depart Harbin", "哈尔滨返程", "하얼빈 출발"),
      ),
    ),
  ],
  packages: seasonPackages([5600, 4900, 4600, 4300], [7200, 6300, 6000, 5700]),
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

// ---------------------------------------------------------------------------
// 2. Harbin, Yabuli, Snow Town, Changbai Mountain & Yanji — 8 days / 7 nights
// ---------------------------------------------------------------------------

const changbaiSlug = "harbin-snow-town-changbaishan-yanji-8-day-private-tour";
const harbinSnowTownChangbaishanYanji: PrivateTourProduct = {
  id: "private-tour-harbin-snow-town-changbaishan-yanji-8d7n",
  slug: changbaiSlug,
  days: 8,
  nights: 7,
  routePhotoFallback: false,
  servicePolicy,
  title: l(
    "Harbin, Yabuli, Snow Town, Changbai Mountain & Yanji: 8-Day Winter Private Tour",
    "哈尔滨·亚布力·雪乡·长白山·延吉 8 天 7 晚冬季私家团",
    "하얼빈·야부리·설향·백두산·연길 8일 겨울 프라이빗 투어",
  ),
  metadataTitle: l(
    "Harbin, Snow Town, Changbai Mountain & Yanji: 8-Day Winter Private Tour",
    "哈尔滨·亚布力·雪乡·长白山·延吉 8 天 7 晚冬季私家团",
    "하얼빈·야부리·설향·백두산·연길 8일 겨울 프라이빗 투어",
  ),
  metadataDescription: l(
    "Eight-day private winter route from Harbin via Yabuli and Snow Town to Changbai Mountain's North Slope and Yanji, with seven hotel nights and a driver-guide.",
    "8 天冬季私家路线：哈尔滨、亚布力、雪乡，再到长白山北坡和延吉，住 7 晚酒店，私车和司机兼向导只服务你们一行。",
    "8일 겨울 프라이빗 코스: 하얼빈, 야부리, 설향을 거쳐 백두산 북파와 연길까지. 호텔 7박, 전용 차량과 운전기사 겸 안내인.",
  ),
  eyebrow: l(
    "Snow Town and Changbai Mountain in one winter trip",
    "一次冬季旅行，串起雪乡和长白山",
    "한 번의 겨울 여행으로 설향과 백두산까지",
  ),
  lede: l(
    "Follow the Harbin, Yabuli and Snow Town days, then cross to Changbai Mountain's North Slope and finish in Yanji. Seven hotel nights and no night trains, but Day 5 is a long transfer from Snow Town to Erdaobaihe.",
    "前四天走哈尔滨、亚布力和雪乡，之后转往长白山北坡，最后在延吉结束。全程住 7 晚酒店、不坐夜车，但第 5 天从雪乡到二道白河是长途转场。",
    "하얼빈, 야부리, 설향 일정을 지나 백두산 북파로 넘어가고 연길에서 마칩니다. 호텔 7박에 야간열차는 없지만, 5일차는 설향에서 이도백하까지 장거리 이동일입니다.",
  ),
  summary: l(
    "Eight days and seven hotel nights across Heilongjiang and Jilin: Harbin's ice scenery, a Yabuli ski day, Snow Town, Changbai Mountain's North Slope and Yanji. It covers more than the 6-day route, at the cost of one long road day.",
    "8 天住 7 晚酒店，横跨黑龙江和吉林：哈尔滨冰雪、亚布力滑雪、雪乡、长白山北坡和延吉。比 6 天路线走得更多，代价是有一天长途坐车。",
    "8일 동안 호텔 7박으로 헤이룽장성과 지린성을 잇습니다. 하얼빈 빙설 풍경, 야부리 스키, 설향, 백두산 북파와 연길까지 돌아봅니다. 6일 코스보다 많이 보는 대신 장거리 이동일이 하루 있습니다.",
  ),
  facts: facts(
    [
      fact("Route", "Harbin → Yabuli → Snow Town → Changbai Mountain → Yanji"),
      fact("Nights", "7 hotel nights · long transfer on Day 5"),
      fact("Service", "Private vehicle · driver (not a licensed guide)"),
      fact("Prices", servicePrices.en),
    ],
    [
      fact("路线", "哈尔滨 → 亚布力 → 雪乡 → 长白山 → 延吉"),
      fact("住宿", "7 晚酒店 · 第 5 天长途转场"),
      fact("服务", "私车 · 司机接待（非持证导游）"),
      fact("价格", servicePrices.zh),
    ],
    [
      fact("동선", "하얼빈 → 야부리 → 설향 → 백두산 → 연길"),
      fact("숙박", "호텔 7박 · 5일차 장거리 이동"),
      fact("서비스", "전용 차량 · 운전기사(공인 가이드 아님)"),
      fact("요금", servicePrices.ko),
    ],
  ),
  highlights: lists(
    [
      "Central Street and Harbin Ice and Snow World",
      "A ski day at Yabuli and a night in the Snow Town area",
      "Changbai Mountain's North Slope",
      "Via Xueling to Yanji",
    ],
    ["中央大街与哈尔滨冰雪大世界", "亚布力滑雪，并在雪乡一带住一晚", "长白山北坡", "经雪岭前往延吉"],
    ["중앙대가와 하얼빈 빙설대세계", "야부리 스키와 설향 일대 1박", "백두산 북파", "쉐링을 지나 연길로"],
  ),
  itinerary: [
    arriveHarbin,
    harbinIceDay,
    yabuliDay,
    snowTownDay,
    day(
      5,
      l(
        "Long transfer: Snow Town to Erdaobaihe via Jingpo Lake",
        "长途转场：雪乡经镜泊湖到二道白河",
        "장거리 이동: 설향에서 징포호를 지나 이도백하로",
      ),
      l(
        "A long day on the road: drive from Snow Town, passing Jingpo Lake, to Erdaobaihe near Changbai Mountain. Jingpo Lake is a stop on the way, not a paid visit; its admission is not included. Overnight in Erdaobaihe.",
        "这一天大部分时间在路上：从雪乡出发，途经镜泊湖，前往长白山脚下的二道白河。镜泊湖只是途经停留，不含门票，不安排入园游览。住二道白河。",
        "하루 대부분을 차에서 보내는 이동일입니다. 설향을 출발해 징포호를 지나 백두산 아래 이도백하로 갑니다. 징포호는 지나가며 잠시 들르는 곳으로 입장 관람이 아니며, 입장료는 포함되지 않습니다. 이도백하에서 숙박합니다.",
      ),
    ),
    day(
      6,
      l("Changbai Mountain North Slope", "长白山北坡", "백두산 북파"),
      l(
        "Visit the North Slope of Changbai Mountain when the roads and scenic area are open. North Slope admission is included; scenic-area transport is confirmed in your written quote. Weather decides access and whether Tianchi is visible. Return to Erdaobaihe for the night; the exact hotel is named in your confirmation.",
        "道路和景区开放时游览长白山北坡，北坡门票已包含；景区交通车以书面报价为准。能否上山、能否看到天池，取决于当天天气。当晚返回二道白河住宿，具体酒店写在确认单上。",
        "도로와 관광지가 운영할 때 백두산 북파를 방문하며 입장권은 포함됩니다. 관광지 셔틀버스는 서면 견적에서 확인합니다. 입장 가능 여부와 천지 전망은 날씨에 좌우됩니다. 저녁에는 이도백하로 돌아와 숙박하며 정확한 호텔은 확인서에 적어 드립니다.",
      ),
    ),
    day(
      7,
      l("Via Xueling to Yanji", "经雪岭前往延吉", "쉐링을 지나 연길로"),
      l(
        "Travel via Xueling (雪岭) to Yanji. Overnight in Yanji.",
        "经雪岭前往延吉。住延吉。",
        "쉐링(雪岭)을 지나 연길로 갑니다. 연길에서 숙박합니다.",
      ),
    ),
    day(
      8,
      l("Depart Yanji", "延吉返程", "연길 출발"),
      l(
        "Check out and depart from Yanji. A transfer to the airport or station is included only if your written quote lists it.",
        "退房后从延吉返程。送机或送站是否包含，以书面报价为准。",
        "체크아웃 후 연길에서 출발합니다. 공항·역 샌딩은 서면 견적에 적힌 경우에만 포함됩니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Seven hotel nights and no night trains: two in Harbin, one at Yabuli, one in the Snow Town area, two in Erdaobaihe and one in Yanji. Prices are based on reference hotels with two adults sharing one room; exact hotels are named in your written confirmation, and single rooms are quoted separately.",
    "共 7 晚酒店、不坐夜车：哈尔滨 2 晚、亚布力 1 晚、雪乡一带 1 晚、二道白河 2 晚、延吉 1 晚。价格按参考酒店、两位成人同住一间计算；具体酒店写在书面确认单上，单住另行报价。",
    "호텔 7박, 야간열차 없음: 하얼빈 2박, 야부리 1박, 설향 일대 1박, 이도백하 2박, 연길 1박입니다. 요금은 참고 호텔 성인 2명 1실 기준이며, 실제 호텔은 서면 확인서에 적어 드리고 1인실은 따로 견적을 드립니다.",
  ),
  serviceNote: serviceNote(yabuliChangbaiTickets),
  exclusions: exclusions(
    [
      "An optional paid visit inside Jingpo Lake, which the route otherwise passes by: confirm separately before payment",
      "Extra Yabuli ski time, equipment or instruction beyond the included package: confirm any added price before payment",
    ],
    ["如想入园游览途经的镜泊湖，付款前另行确认安排和费用", "亚布力套餐以外的滑雪时长、雪具或教练：如需增加，付款前确认差价"],
    ["경유지 징포호 내부에 유료로 방문하려면 결제 전에 일정과 요금 확인", "포함된 야부리 패키지를 넘는 스키 시간·장비·강습: 추가 요금을 결제 전에 확인"],
  ),
  bookingNote,
  faq: [
    faq(
      l(
        "How does this route compare with the other Northeast winter routes?",
        "这条路线和其他东北冬季路线有什么不同？",
        "다른 동북 겨울 코스와 무엇이 다른가요?",
      ),
      l(
        "It adds Changbai Mountain and Yanji to the 6-day Harbin, Yabuli and Snow Town route, with seven hotel nights and no night trains. The trade-off is Day 5, a long road transfer. If you want an easier trip, the 6-day route covers Harbin, Yabuli and Snow Town only.",
        "它在 6 天哈尔滨·亚布力·雪乡路线上加了长白山和延吉，住 7 晚酒店、不坐夜车。代价是第 5 天的长途转场。想走得轻松些，可以选只去哈尔滨、亚布力和雪乡的 6 天路线。",
        "6일 하얼빈·야부리·설향 코스에 백두산과 연길을 더했으며, 호텔 7박에 야간열차가 없습니다. 대신 5일차에 장거리 이동이 있습니다. 더 여유로운 여행을 원하면 하얼빈, 야부리, 설향만 도는 6일 코스가 맞습니다.",
      ),
    ),
    faq(
      l("How long is the Day 5 transfer?", "第 5 天的转场有多长？", "5일차 이동은 얼마나 긴가요?"),
      l(
        "Plan for most of the day in the vehicle, from Snow Town past Jingpo Lake to Erdaobaihe near Changbai Mountain; snow and winter roads can make it longer. Jingpo Lake is a stop on the way, and its admission is not included.",
        "这一天大部分时间都在车上：从雪乡经镜泊湖，到长白山脚下的二道白河；遇上降雪和冬季路况，用时可能更长。镜泊湖只是途经停留，不含门票。",
        "설향에서 징포호를 지나 백두산 아래 이도백하까지, 하루 대부분을 차에서 보낸다고 생각하세요. 눈과 겨울 도로 상황에 따라 더 오래 걸릴 수 있습니다. 징포호는 지나가며 들르는 곳이며 입장료는 포함되지 않습니다.",
      ),
    ),
    driverGuideFaq,
    faq(
      l(
        "Is the Changbai Mountain North Slope visit guaranteed?",
        "一定能上长白山北坡吗？",
        "백두산 북파는 꼭 갈 수 있나요?",
      ),
      l(
        "No. Access depends on the weather and roads, and Tianchi may not be visible even when the scenic area is open. North Slope admission is included; any scenic-area transport is confirmed in your written quote.",
        "不能保证。要看当天的天气和路况；即使景区开放，也不一定看得到天池。北坡门票已包含，景区交通车以书面报价为准。",
        "아니요. 입장은 날씨와 도로 상황에 달려 있으며, 관광지가 개방해도 천지가 보이지 않을 수 있습니다. 북파 입장권은 포함되고 관광지 셔틀버스는 서면 견적에서 확인합니다.",
      ),
    ),
    iceWorldOpeningFaq,
    priceFaq,
    notStatedFaq,
  ],
  heroImage: iceSlide.image,
  gallery: [],
  routeMedia: [
    ...harbinSnowTownRoutePhotos,
    routePhoto(6, {
      label: l("Changbai Mountain Tianchi", "长白山天池", "백두산 천지"),
      image: image(
        `${changbaishanImages}/route-day-3-extra.webp`,
        l("Snow around Heaven Lake on Changbaishan", "长白山积雪环绕的天池", "눈에 둘러싸인 백두산 천지"),
        l(
          "Changbai Mountain Tianchi in winter. Access and visibility depend on the weather and cannot be guaranteed.",
          "长白山冬季天池实景；能否进入、能见度均取决于天气，不保证看到。",
          "겨울 백두산 천지입니다. 입장과 시야는 날씨에 좌우되며 볼 수 있다고 보장할 수 없습니다.",
        ),
      ),
    }),
    routePhoto(7, {
      label: l("Yanji at night", "延吉夜景", "연길 야경"),
      image: image(
        `${changbaishanImages}/gallery-1.webp`,
        l("Yanji city lights at night", "延吉城市夜景", "연길 야경"),
        l(
          "Yanji at night; you stay one night here before departing.",
          "延吉夜景；返程前在这里住一晚。",
          "연길의 밤 풍경입니다. 출발 전 이곳에서 1박합니다.",
        ),
        1920,
        1235,
      ),
    }),
  ],
  packages: seasonPackages([7700, 6600, 6200, 5700], [10200, 8900, 8400, 8000]),
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

// ---------------------------------------------------------------------------
// 3. Harbin, Mohe, Beihong Village & Arctic Village — 7 days / 6 nights
// ---------------------------------------------------------------------------

const moheSlug = "harbin-mohe-arctic-village-7-day-private-tour";
const harbinMoheArcticVillage: PrivateTourProduct = {
  id: "private-tour-harbin-mohe-arctic-village-7d6n",
  slug: moheSlug,
  days: 7,
  nights: 6,
  routePhotoFallback: false,
  servicePolicy,
  title: l(
    "Harbin, Mohe, Beihong & Arctic Village: 7-Day Winter Private Tour",
    "哈尔滨·漠河·北红村·北极村 7 天 6 晚冬季私家团",
    "하얼빈·모허·베이훙촌·북극촌 7일 겨울 프라이빗 투어",
  ),
  metadataDescription: l(
    "Seven-day private winter route from Harbin to Mohe, Beihong Village and Arctic Village: four hotel nights plus two hard-sleeper train nights, driver-guide.",
    "7 天冬季私家路线：哈尔滨到漠河、北红村和北极村，4 晚酒店加 2 晚硬卧夜车（铺位随机），私车和司机兼向导。",
    "7일 겨울 프라이빗 코스: 하얼빈에서 모허, 베이훙촌, 북극촌까지. 호텔 4박과 침대열차 2박(침대 무작위 배정), 운전기사 겸 안내인.",
  ),
  eyebrow: l(
    "China's far north, with two nights on sleeper trains",
    "去中国最北端，含两晚卧铺夜车",
    "중국 최북단으로, 침대열차 2박 포함",
  ),
  lede: l(
    "Two days in Harbin, then an overnight train to Mohe for the birch forest, the First Bend of the Heilongjiang, Beihong Village and Arctic Village. Accommodation is four hotel nights plus two nights in hard-sleeper train berths, allocated at random.",
    "先在哈尔滨两天，再坐夜车去漠河，看北方林海、龙江第一湾、北红村和北极村。住宿为 4 晚酒店加 2 晚硬卧夜车，铺位随机分配。",
    "하얼빈에서 이틀을 보낸 뒤 야간열차로 모허에 가서 자작나무 숲, 헤이룽장 제1만, 베이훙촌과 북극촌을 돌아봅니다. 숙박은 호텔 4박과 경와(일반 침대칸) 야간열차 2박이며, 침대는 무작위로 배정됩니다.",
  ),
  summary: l(
    "Seven days: four hotel nights (two in Harbin, two in the far north) and two nights on hard-sleeper trains between Harbin and Mohe, with berths allocated at random. Includes one beginner-slope ski session. Choose it for the far north, not for comfort on the move.",
    "7 天行程：4 晚酒店（哈尔滨 2 晚、最北端 2 晚）加 2 晚往返哈尔滨与漠河的硬卧夜车，铺位随机分配。含一次初级道滑雪。适合想去中国最北端、能接受夜车的旅客。",
    "7일 일정: 호텔 4박(하얼빈 2박, 최북단 2박)과 하얼빈–모허 왕복 경와 야간열차 2박이며, 침대는 무작위로 배정됩니다. 초급 코스 스키 1회가 포함됩니다. 이동의 편안함보다 중국 최북단을 원하는 분께 맞습니다.",
  ),
  facts: facts(
    [
      fact("Route", "Harbin → Mohe → Beihong Village → Arctic Village → Harbin"),
      fact("Nights", "4 hotel nights + 2 hard-sleeper train nights"),
      fact("Service", "Private vehicle · driver (not a licensed guide)"),
      fact("Prices", servicePrices.en),
    ],
    [
      fact("路线", "哈尔滨 → 漠河 → 北红村 → 北极村 → 哈尔滨"),
      fact("住宿", "4 晚酒店 + 2 晚硬卧夜车"),
      fact("服务", "私车 · 司机接待（非持证导游）"),
      fact("价格", servicePrices.zh),
    ],
    [
      fact("동선", "하얼빈 → 모허 → 베이훙촌 → 북극촌 → 하얼빈"),
      fact("숙박", "호텔 4박 + 경와 야간열차 2박"),
      fact("서비스", "전용 차량 · 운전기사(공인 가이드 아님)"),
      fact("요금", servicePrices.ko),
    ],
  ),
  highlights: lists(
    [
      "Central Street and Harbin Ice and Snow World when open",
      "Siberian Tiger Park and Saint Sophia Cathedral",
      "Birch forest and the First Bend of the Heilongjiang",
      "Beihong Village, the reindeer park and Christmas Village",
      "Arctic Village, a beginner-slope ski session and the northernmost post office",
    ],
    [
      "中央大街与开放期间的哈尔滨冰雪大世界",
      "虎园与圣索菲亚教堂",
      "北方林海与龙江第一湾",
      "北红村、驯鹿园与圣诞村",
      "北极村、初级道滑雪与最北邮局",
    ],
    [
      "중앙대가와 개장 시 하얼빈 빙설대세계",
      "시베리아 호랑이 공원과 성 소피아 성당",
      "자작나무 숲과 헤이룽장 제1만",
      "베이훙촌, 순록 공원과 크리스마스 마을",
      "북극촌, 초급 코스 스키와 중국 최북단 우체국",
    ],
  ),
  itinerary: [
    arriveHarbin,
    harbinIceDay,
    day(
      3,
      l(
        "Siberian Tiger Park, Saint Sophia and the night train",
        "虎园、圣索菲亚教堂与夜车",
        "시베리아 호랑이 공원, 성 소피아 성당과 야간열차",
      ),
      l(
        "Stop at Siberian Tiger Park and Saint Sophia Cathedral, then board the evening sleeper train to Mohe. Tiger Park admission is not among the named tickets and is confirmed in your written quote. Tonight is in a randomly allocated hard-sleeper berth, with no hotel.",
        "前往虎园和圣索菲亚教堂，傍晚坐卧铺夜车前往漠河。虎园门票不在已列明门票中，是否入园以书面报价为准。当晚睡随机分配的硬卧铺位，不住酒店。",
        "시베리아 호랑이 공원과 성 소피아 성당에 들른 뒤 저녁 침대열차로 모허에 갑니다. 호랑이 공원 입장권은 명시된 포함 항목에 없어 서면 견적에서 확인합니다. 이날 밤은 무작위 배정 경와 침대에서 보내며 호텔은 없습니다.",
      ),
    ),
    day(
      4,
      l(
        "Birch forest, First Bend of the Heilongjiang and Beihong Village",
        "北方林海、龙江第一湾与北红村",
        "자작나무 숲, 헤이룽장 제1만과 베이훙촌",
      ),
      l(
        "Arrive in Mohe on the overnight train. Visit a birch forest, the First Bend of the Heilongjiang (龙江第一湾) and the Wusuli shoal (乌苏里浅滩), then continue to Beihong Village. Your hotel is named in your confirmation.",
        "坐夜车抵达漠河。游览北方林海（成片的白色树干树林）、龙江第一湾和乌苏里浅滩，之后前往北红村。当晚酒店写在确认单上。",
        "야간열차로 모허에 도착합니다. 자작나무 숲, 헤이룽장 제1만(龙江第一湾)과 우쑤리 여울(乌苏里浅滩)을 둘러본 뒤 베이훙촌으로 갑니다. 이날 호텔은 확인서에 적어 드립니다.",
      ),
    ),
    day(
      5,
      l(
        "Reindeer park, Christmas Village, Arctic Village and beginner skiing",
        "驯鹿园、圣诞村、北极村与初级道滑雪",
        "순록 공원, 크리스마스 마을, 북극촌과 초급 스키",
      ),
      l(
        "Visit the reindeer park, Christmas Village and Arctic Village (北极村). One beginner-slope ski session is included; ski time and equipment are stated in your written confirmation. Your hotel is named in your confirmation.",
        "游览驯鹿园、圣诞村和北极村。含一次初级道滑雪，滑雪时长和雪具以书面确认为准。当晚酒店写在确认单上。",
        "순록 공원, 크리스마스 마을과 북극촌(北极村)을 방문합니다. 초급 코스 스키 1회가 포함되며, 스키 시간과 장비는 서면 확인서에 적힌 내용을 따릅니다. 이날 호텔은 확인서에 적어 드립니다.",
      ),
    ),
    day(
      6,
      l(
        "Northernmost post office and the night train back",
        "最北邮局与返程夜车",
        "최북단 우체국과 돌아가는 야간열차",
      ),
      l(
        "See China's northernmost post office and the other stops in your written itinerary, then board the evening sleeper train back to Harbin. Tonight is in a hard-sleeper berth, allocated at random; there is no hotel.",
        "参观中国最北邮局和书面行程中的其他停留点，傍晚坐卧铺夜车返回哈尔滨。当晚睡硬卧，铺位随机分配，不住酒店。",
        "중국 최북단 우체국과 서면 일정의 다른 장소를 둘러본 뒤 저녁 침대열차로 하얼빈에 돌아갑니다. 이날 밤은 무작위로 배정되는 경와 침대에서 보내며 호텔 숙박은 없습니다.",
      ),
    ),
    day(
      7,
      l("Arrive in Harbin and depart", "抵达哈尔滨后返程", "하얼빈 도착 후 출발"),
      l(
        "The train arrives in Harbin and you continue to your onward flight or train; allow a buffer between the two. A station-to-airport transfer is included only if your written quote lists it.",
        "夜车抵达哈尔滨后，继续你的返程航班或火车，两者之间请预留余量。车站到机场的接送是否包含，以书面报价为准。",
        "열차가 하얼빈에 도착하면 이어서 귀국 항공편이나 기차를 타러 갑니다. 두 일정 사이에 여유를 두세요. 역에서 공항까지의 이동은 서면 견적에 적힌 경우에만 포함됩니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four hotel nights and two sleeper-train nights: Harbin on Days 1 and 2, and far-north hotels on Days 4 and 5 (named in your confirmation). Days 3 and 6 are overnight hard-sleeper trains between Harbin and Mohe, with berths allocated at random. Hotel prices are based on two adults sharing one room; single rooms are quoted separately.",
    "4 晚酒店加 2 晚卧铺夜车：第 1、2 天住哈尔滨，第 4、5 天住最北端一带的酒店（写在确认单上）。第 3、6 天在哈尔滨与漠河之间的硬卧夜车上过夜，铺位随机分配。酒店按两位成人同住一间计算；单住另行报价。",
    "호텔 4박과 침대열차 2박: 1·2일차는 하얼빈, 4·5일차는 최북단 지역 호텔(확인서에 기재)입니다. 3·6일차는 하얼빈과 모허 사이 경와 야간열차에서 보내며 침대는 무작위로 배정됩니다. 호텔은 성인 2명 1실 기준이며 1인실은 따로 견적을 드립니다.",
  ),
  serviceNote: serviceNote(l(
    "round-trip Harbin–Mohe hard-sleeper train tickets (random berths); Harbin Ice and Snow World, First Bay of Heilongjiang, Reindeer Park, Christmas Village and Arctic Village tickets; and a beginner-slope ski session with poles, skis and boots (duration confirmed in writing)",
    "哈尔滨—漠河往返硬卧车票（铺位随机）；冰雪大世界、龙江第一湾、驯鹿园、圣诞村和北极村门票；以及一次含雪杖、雪板和雪鞋的初级道滑雪（时长书面确认）",
    "하얼빈–모허 왕복 경와열차표(침대 무작위 배정), 빙설대세계·헤이룽장 제1만·순록 공원·크리스마스 마을·북극촌 입장권, 폴·스키·부츠가 포함된 초급 코스 스키 1회(시간은 서면 확인)",
  )),
  exclusions: exclusions(
    ["Sleeper berths are assigned at random; ask before payment if a specific berth or upgrade is important"],
    ["硬卧铺位随机分配；如需指定铺位或升级，请在付款前提出"],
    ["침대는 무작위 배정됩니다. 자리 지정이나 업그레이드가 필요하면 결제 전에 문의하세요"],
  ),
  bookingNote,
  faq: [
    sleeperTrainFaq(l("Days 3 and 6", "第 3 天和第 6 天", "3일차와 6일차")),
    faq(
      l(
        "How does this route compare with the other Northeast winter routes?",
        "这条路线和其他东北冬季路线有什么不同？",
        "다른 동북 겨울 코스와 무엇이 다른가요?",
      ),
      l(
        "This is the far-north route: Harbin plus Mohe, Beihong Village and Arctic Village. The trade-off is two nights on hard-sleeper trains, and it has no Yabuli or Snow Town. The 9-day route combines those with Mohe, while the 6-day route is the easiest introduction, with no night trains.",
        "这是去最北端的路线：哈尔滨加漠河、北红村和北极村。代价是要坐两晚硬卧夜车，而且不去亚布力和雪乡。9 天路线把它们和漠河合在一起；6 天路线最轻松，不坐夜车。",
        "하얼빈과 모허, 베이훙촌, 북극촌을 도는 최북단 코스입니다. 대신 경와 야간열차 2박이 있고 야부리와 설향은 가지 않습니다. 9일 코스는 이 둘과 모허를 함께 도는 코스이고, 6일 코스는 야간열차 없이 가장 무난한 입문 코스입니다.",
      ),
    ),
    driverGuideFaq,
    faq(
      l("Is skiing included?", "包含滑雪吗？", "스키가 포함되나요?"),
      l(
        "Yes, one beginner-slope ski session on Day 5 includes poles, skis and boots. The duration and any other equipment or lesson are confirmed in writing before payment.",
        "包含，第 5 天有一次初级道滑雪，含雪杖、雪板和雪鞋。滑雪时长，以及其他雪具或教练安排，付款前书面确认。",
        "네, 5일차 초급 코스 스키 1회에 폴·스키·부츠가 포함됩니다. 이용 시간과 그 밖의 장비 또는 강습은 결제 전에 서면으로 확인합니다.",
      ),
    ),
    iceWorldOpeningFaq,
    priceFaq,
    notStatedFaq,
  ],
  heroImage: beijiVillageHero,
  gallery: [],
  routeMedia: [
    routePhoto(2, centralStreet, iceSlide),
    routePhoto(3, sophiaExterior),
    routePhoto(
      7,
      harbinStation(
        l(
          "Harbin Railway Station; your arrival station in Harbin is shown on your train ticket.",
          "照片为哈尔滨站；实际到达哪个车站，以车票为准。",
          "사진은 하얼빈역입니다. 실제 도착역은 기차표에 적힌 곳을 따릅니다.",
        ),
        l("Arrive in Harbin", "抵达哈尔滨", "하얼빈 도착"),
      ),
    ),
  ],
  packages: seasonPackages([5900, 4900, 4600, 4400], [7000, 5900, 5400, 5200]),
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

// ---------------------------------------------------------------------------
// 4. Harbin, Yabuli, Snow Town & Mohe — 9 days / 8 nights
// ---------------------------------------------------------------------------

const snowTownMoheSlug = "harbin-snow-town-mohe-9-day-private-tour";
const harbinSnowTownMohe: PrivateTourProduct = {
  id: "private-tour-harbin-snow-town-mohe-9d8n",
  slug: snowTownMoheSlug,
  days: 9,
  nights: 8,
  routePhotoFallback: false,
  servicePolicy,
  title: l(
    "Harbin, Yabuli, Snow Town & Mohe: 9-Day Winter Private Tour",
    "哈尔滨·亚布力·雪乡·漠河 9 天 8 晚冬季私家团",
    "하얼빈·야부리·설향·모허 9일 겨울 프라이빗 투어",
  ),
  metadataDescription: l(
    "Nine-day private winter route: Harbin, Yabuli, Snow Town, then Mohe and Arctic Village, with six hotel nights and two hard-sleeper train nights.",
    "9 天冬季私家路线：哈尔滨、亚布力、雪乡，再到漠河和北极村，6 晚酒店加 2 晚硬卧夜车（铺位随机），私车和司机兼向导。",
    "9일 겨울 프라이빗 코스: 하얼빈, 야부리, 설향에 이어 모허와 북극촌까지. 호텔 6박과 경와 야간열차 2박(침대 무작위 배정).",
  ),
  eyebrow: l(
    "The most complete Northeast winter route — and the longest",
    "东北冬季走得最全的路线，也是最长的一条",
    "동북 겨울을 가장 많이 도는, 가장 긴 코스",
  ),
  lede: l(
    "Harbin's ice scenery, a Yabuli ski day and Snow Town, then an overnight train to Mohe, Beihong Village and Arctic Village. Accommodation is six hotel nights plus two nights in hard-sleeper train berths, allocated at random.",
    "先看哈尔滨冰雪、到亚布力滑雪、去雪乡，再坐夜车前往漠河、北红村和北极村。住宿为 6 晚酒店加 2 晚硬卧夜车，铺位随机分配。",
    "하얼빈 빙설 풍경, 야부리 스키와 설향을 본 뒤 야간열차로 모허, 베이훙촌과 북극촌에 갑니다. 숙박은 호텔 6박과 경와 야간열차 2박이며, 침대는 무작위로 배정됩니다.",
  ),
  summary: l(
    "Nine days: six hotel nights (Harbin, Yabuli, the Snow Town area and two far-north nights) and two nights on hard-sleeper trains between Harbin and Mohe, with berths allocated at random. It covers the most of the five Northeast routes, but it is long.",
    "9 天行程：6 晚酒店（哈尔滨、亚布力、雪乡一带和最北端 2 晚）加 2 晚往返哈尔滨与漠河的硬卧夜车，铺位随机分配。五条东北路线里它走得最全，但行程也最长。",
    "9일 일정: 호텔 6박(하얼빈, 야부리, 설향 일대, 최북단 2박)과 하얼빈–모허 왕복 경와 야간열차 2박이며, 침대는 무작위로 배정됩니다. 다섯 가지 동북 코스 중 가장 많이 보지만 일정이 깁니다.",
  ),
  facts: facts(
    [
      fact("Route", "Harbin → Yabuli → Snow Town → Harbin → Mohe → Harbin"),
      fact("Nights", "6 hotel nights + 2 hard-sleeper train nights"),
      fact("Service", "Private vehicle · driver (not a licensed guide)"),
      fact("Prices", servicePrices.en),
    ],
    [
      fact("路线", "哈尔滨 → 亚布力 → 雪乡 → 哈尔滨 → 漠河 → 哈尔滨"),
      fact("住宿", "6 晚酒店 + 2 晚硬卧夜车"),
      fact("服务", "私车 · 司机接待（非持证导游）"),
      fact("价格", servicePrices.zh),
    ],
    [
      fact("동선", "하얼빈 → 야부리 → 설향 → 하얼빈 → 모허 → 하얼빈"),
      fact("숙박", "호텔 6박 + 경와 야간열차 2박"),
      fact("서비스", "전용 차량 · 운전기사(공인 가이드 아님)"),
      fact("요금", servicePrices.ko),
    ],
  ),
  highlights: lists(
    [
      "Central Street and Harbin Ice and Snow World",
      "A ski day at Yabuli and a night in the Snow Town area",
      "Mohe and Beihong Village",
      "The reindeer park, Christmas Village and Arctic Village",
    ],
    ["中央大街与哈尔滨冰雪大世界", "亚布力滑雪，并在雪乡一带住一晚", "漠河与北红村", "驯鹿园、圣诞村与北极村"],
    ["중앙대가와 하얼빈 빙설대세계", "야부리 스키와 설향 일대 1박", "모허와 베이훙촌", "순록 공원, 크리스마스 마을과 북극촌"],
  ),
  itinerary: [
    arriveHarbin,
    harbinIceDay,
    yabuliDay,
    snowTownDay,
    day(
      5,
      l("Back to Harbin and the night train", "返回哈尔滨，坐夜车北上", "하얼빈 복귀 후 야간열차"),
      l(
        "Drive from Snow Town back to Harbin, then board the evening sleeper train to Mohe. Tonight is in a hard-sleeper berth, allocated at random; there is no hotel.",
        "从雪乡驱车返回哈尔滨，傍晚坐卧铺夜车前往漠河。当晚睡硬卧，铺位随机分配，不住酒店。",
        "설향에서 차량으로 하얼빈에 돌아온 뒤 저녁 침대열차로 모허에 갑니다. 이날 밤은 무작위로 배정되는 경와 침대에서 보내며 호텔 숙박은 없습니다.",
      ),
    ),
    day(
      6,
      l("Arrive in Mohe", "抵达漠河", "모허 도착"),
      l(
        "Arrive in Mohe on the overnight train. Days 6 to 8 cover Mohe, Beihong Village, the reindeer park, Christmas Village and Arctic Village; the order of stops by day is set in your written itinerary. Your hotel is named in your confirmation.",
        "坐夜车抵达漠河。第 6 至 8 天游览漠河、北红村、驯鹿园、圣诞村和北极村，每天的先后顺序写在书面行程里。当晚酒店写在确认单上。",
        "야간열차로 모허에 도착합니다. 6~8일차에는 모허, 베이훙촌, 순록 공원, 크리스마스 마을과 북극촌을 둘러보며, 날짜별 방문 순서는 서면 일정에 적어 드립니다. 이날 호텔은 확인서에 적어 드립니다.",
      ),
    ),
    day(
      7,
      l(
        "Beihong Village, reindeer park, Christmas Village and Arctic Village",
        "北红村、驯鹿园、圣诞村与北极村",
        "베이훙촌, 순록 공원, 크리스마스 마을과 북극촌",
      ),
      l(
        "Continue through the far-north stops listed for Days 6 to 8 with your private vehicle and driver-guide. Your hotel is named in your confirmation.",
        "私车和司机兼向导陪同，继续游览第 6 至 8 天所列的最北端各站。当晚酒店写在确认单上。",
        "전용 차량과 운전기사 겸 안내인과 함께 6~8일차에 적힌 최북단 장소를 이어서 둘러봅니다. 이날 호텔은 확인서에 적어 드립니다.",
      ),
    ),
    day(
      8,
      l("Night train back to Harbin", "坐夜车返回哈尔滨", "야간열차로 하얼빈 복귀"),
      l(
        "Finish the remaining far-north stops, then board the evening sleeper train back to Harbin. Tonight is in a hard-sleeper berth, allocated at random; there is no hotel.",
        "走完剩下的最北端各站，傍晚坐卧铺夜车返回哈尔滨。当晚睡硬卧，铺位随机分配，不住酒店。",
        "남은 최북단 장소를 둘러본 뒤 저녁 침대열차로 하얼빈에 돌아갑니다. 이날 밤은 무작위로 배정되는 경와 침대에서 보내며 호텔 숙박은 없습니다.",
      ),
    ),
    day(
      9,
      l("Arrive in Harbin and depart", "抵达哈尔滨后返程", "하얼빈 도착 후 출발"),
      l(
        "The train arrives in Harbin and you continue to your onward flight or train; allow a buffer between the two. A station-to-airport transfer is included only if your written quote lists it.",
        "夜车抵达哈尔滨后，继续你的返程航班或火车，两者之间请预留余量。车站到机场的接送是否包含，以书面报价为准。",
        "열차가 하얼빈에 도착하면 이어서 귀국 항공편이나 기차를 타러 갑니다. 두 일정 사이에 여유를 두세요. 역에서 공항까지의 이동은 서면 견적에 적힌 경우에만 포함됩니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Six hotel nights and two sleeper-train nights: Harbin on Days 1 and 2, Yabuli on Day 3, the Snow Town area on Day 4 and far-north hotels on Days 6 and 7 (named in your confirmation). Days 5 and 8 are overnight hard-sleeper trains between Harbin and Mohe, with berths allocated at random. Hotel prices are based on two adults sharing one room; single rooms are quoted separately.",
    "6 晚酒店加 2 晚卧铺夜车：第 1、2 天住哈尔滨，第 3 天住亚布力，第 4 天住雪乡一带，第 6、7 天住最北端一带的酒店（写在确认单上）。第 5、8 天在哈尔滨与漠河之间的硬卧夜车上过夜，铺位随机分配。酒店按两位成人同住一间计算；单住另行报价。",
    "호텔 6박과 침대열차 2박: 1·2일차 하얼빈, 3일차 야부리, 4일차 설향 일대, 6·7일차 최북단 지역 호텔(확인서에 기재)입니다. 5·8일차는 하얼빈과 모허 사이 경와 야간열차에서 보내며 침대는 무작위로 배정됩니다. 호텔은 성인 2명 1실 기준이며 1인실은 따로 견적을 드립니다.",
  ),
  serviceNote: serviceNote(l(
    "round-trip Harbin–Mohe hard-sleeper train tickets (random berths); Harbin Ice and Snow World, Snow Town, First Bay of Heilongjiang, Reindeer Park, Christmas Village and Arctic Village tickets; the Yabuli ski package; and a beginner-slope ski session with poles, skis and boots (ski durations confirmed in writing)",
    "哈尔滨—漠河往返硬卧车票（铺位随机）；冰雪大世界、雪乡、龙江第一湾、驯鹿园、圣诞村和北极村门票；亚布力滑雪套票；以及一次含雪杖、雪板和雪鞋的初级道滑雪（滑雪时长书面确认）",
    "하얼빈–모허 왕복 경와열차표(침대 무작위 배정), 빙설대세계·설향·헤이룽장 제1만·순록 공원·크리스마스 마을·북극촌 입장권, 야부리 스키 패키지, 폴·스키·부츠가 포함된 초급 코스 스키 1회(시간은 서면 확인)",
  )),
  exclusions: exclusions(
    [
      "Extra Yabuli ski time, equipment or instruction beyond the included package: confirm any added price before payment",
      "Sleeper berths are assigned at random; ask before payment if a specific berth or upgrade is important",
    ],
    ["亚布力套餐以外的滑雪时长、雪具或教练：如需增加，付款前确认差价", "硬卧铺位随机分配；如需指定铺位或升级，请在付款前提出"],
    ["포함된 야부리 패키지를 넘는 스키 시간·장비·강습: 추가 요금을 결제 전에 확인", "침대는 무작위 배정됩니다. 자리 지정이나 업그레이드가 필요하면 결제 전에 문의하세요"],
  ),
  bookingNote,
  faq: [
    sleeperTrainFaq(l("Days 5 and 8", "第 5 天和第 8 天", "5일차와 8일차")),
    faq(
      l(
        "How does this route compare with the other Northeast winter routes?",
        "这条路线和其他东北冬季路线有什么不同？",
        "다른 동북 겨울 코스와 무엇이 다른가요?",
      ),
      l(
        "It covers the most — Harbin, Yabuli, Snow Town and Mohe — but it is the longest, with two nights on hard-sleeper trains. If that is too much, the 6-day route covers Harbin, Yabuli and Snow Town with hotels only, and the 7-day route focuses on Harbin and Mohe.",
        "它走得最全，哈尔滨、亚布力、雪乡和漠河都包含，但行程最长，还要坐两晚硬卧夜车。如果觉得太满，6 天路线只去哈尔滨、亚布力和雪乡，全程住酒店；7 天路线集中在哈尔滨和漠河。",
        "하얼빈, 야부리, 설향, 모허까지 가장 많이 돌지만, 일정이 가장 길고 경와 야간열차 2박이 있습니다. 부담스럽다면 호텔만 이용하며 하얼빈, 야부리, 설향을 도는 6일 코스나, 하얼빈과 모허에 집중하는 7일 코스가 있습니다.",
      ),
    ),
    driverGuideFaq,
    faq(
      l("Will we see the aurora?", "能看到极光吗？", "오로라를 볼 수 있나요?"),
      l(
        "Aurora sightings are not scheduled or guaranteed on this route. The trip is planned around Mohe, Beihong Village and Arctic Village in winter, not around aurora viewing.",
        "这条路线不安排、也不保证看到极光。行程围绕冬季的漠河、北红村和北极村安排，不以观赏极光为目的。",
        "이 코스에는 오로라 관측 일정이 없으며, 볼 수 있다고 보장하지 않습니다. 여행은 겨울의 모허, 베이훙촌과 북극촌을 중심으로 짜였으며 오로라 관측이 목적이 아닙니다.",
      ),
    ),
    iceWorldOpeningFaq,
    priceFaq,
    notStatedFaq,
  ],
  heroImage: image(
    `${harbinImages}/saint-sophia-winter-1600.jpg`,
    l(
      "Saint Sophia Cathedral and a snow-covered square in Harbin at night",
      "夜色中的哈尔滨圣索菲亚教堂与积雪广场",
      "밤의 하얼빈 성 소피아 성당과 눈 덮인 광장",
    ),
    l(
      "Saint Sophia Cathedral in Harbin, where this route starts, photographed in January 2018; lighting and snow vary.",
      "路线起点哈尔滨的圣索菲亚教堂，2018 年 1 月拍摄；灯光和积雪情况会变化。",
      "이 코스가 시작되는 하얼빈의 성 소피아 성당으로, 2018년 1월에 촬영했습니다. 조명과 눈 상태는 달라질 수 있습니다.",
    ),
  ),
  gallery: [],
  routeMedia: [
    ...harbinSnowTownRoutePhotos,
    routePhoto(
      5,
      harbinStation(
        l(
          "Harbin Railway Station; your departure station for the night train is shown on your ticket.",
          "照片为哈尔滨站；夜车实际从哪个车站出发，以车票为准。",
          "사진은 하얼빈역입니다. 야간열차의 실제 출발역은 기차표에 적힌 곳을 따릅니다.",
        ),
        l("Night train from Harbin", "哈尔滨夜车出发", "하얼빈에서 야간열차 출발"),
      ),
    ),
  ],
  packages: seasonPackages([8000, 6600, 6200, 5700], [9000, 7400, 6900, 6400]),
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

// ---------------------------------------------------------------------------
// 5. Yanji, Changbai Mountain & Wanda Resort — 6 days / 5 nights
// ---------------------------------------------------------------------------

const yanjiWandaSlug = "yanji-changbaishan-wanda-6-day-private-tour";
const yanjiChangbaishanWanda: PrivateTourProduct = {
  id: "private-tour-yanji-changbaishan-wanda-6d5n",
  slug: yanjiWandaSlug,
  days: 6,
  nights: 5,
  routePhotoFallback: false,
  servicePolicy,
  title: l(
    "Yanji, Changbai Mountain & Wanda Resort: 6-Day Winter Private Tour",
    "延吉·长白山·万达度假区 6 天 5 晚冬季私家团",
    "연길·백두산·완다 리조트 6일 겨울 프라이빗 투어",
  ),
  metadataDescription: l(
    "Six-day private tour from Yanji through Xueling and Changbai Mountain to Wanda Resort, with five hotel nights and conditional skiing.",
    "6 天冬季私家路线：从延吉经雪岭、长白山北坡到万达度假区，住 5 晚酒店；度假区滑雪体验依运营情况安排。",
    "6일 겨울 프라이빗 코스: 연길에서 쉐링과 백두산 북파를 거쳐 완다 리조트까지. 호텔 5박, 운영 상황에 따른 스키 체험.",
  ),
  eyebrow: l(
    "Snow landscapes, Changbai Mountain and time at a ski resort",
    "雪岭、长白山和度假区滑雪时光",
    "설경과 백두산, 스키 리조트에서 보내는 시간",
  ),
  lede: l(
    "Start in Yanji, cross snowy Xueling to Erdaobaihe, visit Changbai Mountain's North Slope when conditions allow, then spend two nights by Wanda Resort. The complimentary ski experience depends on resort operation and is confirmed before payment.",
    "从延吉出发，经雪岭到二道白河，天气允许时游览长白山北坡，最后在万达度假区一带住两晚。赠送的滑雪体验依雪场运营情况安排，付款前确认。",
    "연길에서 출발해 눈 덮인 쉐링을 지나 이도백하로 이동하고, 여건이 허락하면 백두산 북파를 방문합니다. 마지막 이틀은 완다 리조트 일대에서 보냅니다. 무료 스키 체험은 운영 상황에 따라 결제 전 확인합니다.",
  ),
  summary: l(
    "Six days and five hotel nights: one in Yanji, two in Erdaobaihe and two near Wanda Resort. Xueling and the North Slope have named admission tickets included. Weather and resort operation determine the mountain visit and ski experience.",
    "6 天住 5 晚酒店：延吉 1 晚、二道白河 2 晚、万达度假区一带 2 晚。含雪岭和长白山北坡门票；能否上山及滑雪体验安排，要看天气和雪场运营。",
    "6일 동안 호텔 5박: 연길 1박, 이도백하 2박, 완다 리조트 인근 2박입니다. 쉐링과 백두산 북파 입장권이 포함되며, 산행과 스키 체험은 날씨와 운영 상황에 따릅니다.",
  ),
  facts: facts(
    [
      fact("Route", "Yanji → Xueling → Changbai Mountain → Wanda Resort → Yanji"),
      fact("Nights", "5 hotel nights · no night trains"),
      fact("Service", "Private vehicle · driver"),
      fact("Prices", servicePrices.en),
    ],
    [
      fact("路线", "延吉 → 雪岭 → 长白山 → 万达度假区 → 延吉"),
      fact("住宿", "5 晚酒店 · 不坐夜车"),
      fact("服务", "私车 · 司机接待"),
      fact("价格", servicePrices.zh),
    ],
    [
      fact("동선", "연길 → 쉐링 → 백두산 → 완다 리조트 → 연길"),
      fact("숙박", "호텔 5박 · 야간열차 없음"),
      fact("서비스", "전용 차량 · 운전기사"),
      fact("요금", servicePrices.ko),
    ],
  ),
  highlights: lists(
    [
      "Xueling on the way from Yanji to Erdaobaihe",
      "Changbai Mountain North Slope, subject to weather",
      "Two nights in the Wanda Resort area",
      "A complimentary resort ski experience when operating",
    ],
    ["从延吉经雪岭到二道白河", "天气允许时游览长白山北坡", "万达度假区一带住两晚", "雪场运营时安排赠送滑雪体验"],
    ["연길에서 쉐링을 거쳐 이도백하로", "날씨가 허락하면 백두산 북파 방문", "완다 리조트 일대 2박", "운영 시 무료 리조트 스키 체험"],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Yanji", "抵达延吉", "연길 도착"),
      l(
        "Arrive in Yanji and check in. No fixed sightseeing is listed for today. Airport or station transfer is confirmed in your written quote; overnight in Yanji.",
        "抵达延吉后入住酒店。当天没有固定游览项目；接机或接站以书面报价为准，住延吉。",
        "연길에 도착해 호텔에 체크인합니다. 이날 정해진 관광 일정은 없으며 공항·역 픽업은 서면 견적에서 확인합니다. 연길에서 숙박합니다.",
      ),
    ),
    day(
      2,
      l("Xueling to Erdaobaihe", "经雪岭到二道白河", "쉐링을 지나 이도백하로"),
      l(
        "Travel from Yanji via Xueling to Erdaobaihe. Xueling admission is included; the order and time outdoors depend on winter roads and weather. Overnight in Erdaobaihe.",
        "从延吉经雪岭前往二道白河，雪岭门票已包含。冬季路况和天气会影响游览时间及先后顺序，住二道白河。",
        "연길에서 쉐링을 거쳐 이도백하로 이동합니다. 쉐링 입장권이 포함됩니다. 야외 체류 시간과 순서는 겨울 도로 및 날씨에 따라 달라질 수 있습니다. 이도백하에서 숙박합니다.",
      ),
    ),
    day(
      3,
      l("Changbai Mountain North Slope", "长白山北坡", "백두산 북파"),
      l(
        "Visit Changbai Mountain's North Slope if the road and scenic area are open. Admission is included; scenic-area transport is confirmed in the written quote. Tianchi visibility is weather-dependent. Return to Erdaobaihe for the night.",
        "道路和景区开放时游览长白山北坡，门票已包含；景区交通车以书面报价为准。能否看到天池取决于天气。返回二道白河住宿。",
        "도로와 관광지가 운영하면 백두산 북파를 방문합니다. 입장권은 포함되며 관광지 셔틀버스는 서면 견적에서 확인합니다. 천지 전망은 날씨에 달려 있습니다. 이도백하에서 숙박합니다.",
      ),
    ),
    day(
      4,
      l("To Wanda Resort", "前往万达度假区", "완다 리조트로 이동"),
      l(
        "Drive from Erdaobaihe to the Wanda Resort area and check in to your confirmed hotel. The written itinerary sets any activities for the afternoon; overnight by the resort.",
        "从二道白河前往万达度假区一带，入住确认单所列酒店。下午是否安排活动以书面行程为准，住度假区一带。",
        "이도백하에서 완다 리조트 일대로 이동해 확정된 호텔에 체크인합니다. 오후 활동은 서면 일정에서 확인하며 리조트 일대에서 숙박합니다.",
      ),
    ),
    day(
      5,
      l("Wanda ski experience", "万达滑雪体验", "완다 스키 체험"),
      l(
        "Spend the day in the Wanda Resort area. A complimentary ski experience is planned, subject to resort operation and snow conditions; ski duration and equipment are confirmed in writing before payment. Overnight by the resort.",
        "在万达度假区一带活动。计划安排赠送滑雪体验，须以雪场运营及雪况为准；滑雪时长和雪具内容，付款前书面确认。住度假区一带。",
        "완다 리조트 일대에서 하루를 보냅니다. 무료 스키 체험은 스키장 운영과 적설 상태에 따르며, 시간과 장비는 결제 전에 서면으로 확인합니다. 리조트 일대에서 숙박합니다.",
      ),
    ),
    day(
      6,
      l("Return to Yanji and depart", "返回延吉并返程", "연길로 돌아와 출발"),
      l(
        "Drive back to Yanji and continue your onward journey. Allow enough time between the road transfer and your flight or train; onward tickets and airport or station drop-off are confirmed in your quote.",
        "乘车返回延吉后返程。请在公路转场与航班或火车之间留足时间；返程车票和送机、送站安排，以书面报价为准。",
        "차량으로 연길에 돌아와 다음 여정을 이어갑니다. 이동과 항공편·열차 사이에 충분한 여유를 두세요. 이후 교통편과 공항·역 샌딩은 서면 견적에서 확인합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five twin-share hotel nights: Yanji on Day 1, Erdaobaihe on Days 2–3 and the Wanda Resort area on Days 4–5. The accommodation list contains alternatives, so your hotel names and room type are fixed in your written confirmation; single rooms are quoted separately.",
    "共 5 晚双人同住酒店：第 1 晚延吉，第 2–3 晚二道白河，第 4–5 晚万达度假区一带。参考酒店为备选名单，具体酒店和房型以书面确认单为准；单住另行报价。",
    "성인 2명 1실 기준 호텔 5박: 1일차 연길, 2~3일차 이도백하, 4~5일차 완다 리조트 일대입니다. 호텔 목록에는 대체 숙소가 있어 실제 호텔과 객실 유형은 서면 확인서에서 확정하며 1인실은 따로 견적을 드립니다.",
  ),
  serviceNote: serviceNote(l(
    "Xueling and Changbai Mountain North Slope admission tickets",
    "雪岭及长白山北坡门票",
    "쉐링과 백두산 북파 입장권",
  )),
  exclusions: exclusions(
    ["The complimentary Wanda ski experience and any extra time, equipment or instruction: confirm availability and scope in writing before payment"],
    ["赠送的万达滑雪体验及额外时长、雪具或教练：付款前书面确认可安排情况和范围"],
    ["무료 완다 스키 체험과 추가 시간·장비·강습: 결제 전에 가능 여부와 범위를 서면으로 확인"],
  ),
  bookingNote,
  faq: [
    driverGuideFaq,
    faq(
      l("Is the Wanda ski experience included?", "万达滑雪体验包含吗？", "완다 스키 체험이 포함되나요?"),
      l(
        "It is listed as a complimentary activity, subject to the resort operating on your dates and suitable snow conditions. We confirm the duration, equipment and any alternative in writing before payment.",
        "这项体验列为赠送项目，须以出行日期雪场开放及雪况合适为前提。付款前会书面确认时长、雪具及无法安排时的替代方式。",
        "무료 체험 항목이지만 여행 날짜에 스키장이 운영하고 적설 상태가 적합해야 합니다. 시간·장비·대체 일정은 결제 전에 서면으로 확인합니다.",
      ),
    ),
    faq(
      l("Can we definitely visit Tianchi?", "一定能看到天池吗？", "천지를 꼭 볼 수 있나요?"),
      l(
        "No. North Slope access depends on weather, roads and scenic-area operations; Tianchi can be hidden even when the area is open. North Slope admission is included, with scenic-area transport confirmed in the quote.",
        "不能保证。北坡能否开放取决于天气、道路和景区运营；即使开放，天池也可能看不见。北坡门票已包含，景区交通车以书面报价为准。",
        "보장할 수 없습니다. 북파 입장은 날씨·도로·관광지 운영에 달려 있고, 개방하더라도 천지가 보이지 않을 수 있습니다. 북파 입장권은 포함되며 셔틀버스는 서면 견적에서 확인합니다.",
      ),
    ),
    priceFaq,
    notStatedFaq,
  ],
  heroImage: image(
    `${changbaishanImages}/route-day-3-extra.webp`,
    l("Snow around Heaven Lake on Changbai Mountain", "长白山积雪环绕的天池", "눈에 둘러싸인 백두산 천지"),
    l(
      "Changbai Mountain Tianchi in winter. Access and visibility depend on weather; the photo does not guarantee this view on your date.",
      "长白山冬季天池实景。能否进入、能见度都取决于天气，照片不代表出行当天一定能看到。",
      "겨울 백두산 천지입니다. 입장과 시야는 날씨에 좌우되며 사진의 풍경을 여행 날짜에 보장하지 않습니다.",
    ),
  ),
  gallery: [],
  routeMedia: [
    routePhoto(1, {
      label: l("Yanji at night", "延吉夜景", "연길 야경"),
      image: image(
        `${changbaishanImages}/gallery-1.webp`,
        l("Yanji city lights at night", "延吉城市夜景", "연길 야경"),
        l("Yanji at night, the starting city for this route.", "路线起点延吉的夜景。", "이 코스의 출발지 연길 야경입니다."),
        1920,
        1235,
      ),
    }),
    routePhoto(3, {
      label: l("Changbai Mountain Tianchi", "长白山天池", "백두산 천지"),
      image: image(
        `${changbaishanImages}/hero.webp`,
        l("Tianchi crater lake on Changbai Mountain", "长白山天池", "백두산 천지"),
        l("Tianchi on Changbai Mountain; whether it is visible depends on the day.", "长白山天池；能否看到以当天情况为准。", "백두산 천지입니다. 전망은 당일 상황에 달려 있습니다."),
        1920,
        1440,
      ),
    }),
  ],
  packages: seasonPackages([5400, 4900, 4600, 4300], [7200, 6300, 6000, 5700]),
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

export const privateTourNortheastWinterProducts: readonly PrivateTourProduct[] =
  Object.freeze([
    harbinYabuliSnowTown,
    harbinSnowTownChangbaishanYanji,
    harbinMoheArcticVillage,
    harbinSnowTownMohe,
    yanjiChangbaishanWanda,
  ]);

export const privateTourNortheastWinterPreviewPhotoCreditsBySlug: Readonly<
  Record<string, readonly PrivateTourPhotoCredit[]>
> = Object.freeze({
  [snowTownSlug]: [
    ...harbinSnowTownCredits.slice(1),
    {
      subject: l("China Snow Town in winter", "冬季的中国雪乡", "겨울의 중국 설향"),
      author: "Chen Wu",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Morning_in_China_Snow_Town.jpg",
      licenseLabel: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    harbinStationCredit,
  ],
  [changbaiSlug]: [
    ...harbinSnowTownCredits.slice(1),
    {
      subject: l("Changbai Mountain Tianchi in winter", "长白山冬季天池", "겨울 백두산 천지"),
      author: "Charlie fong",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Heaven_Lake,_Changbai.jpg",
      licenseLabel: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Heaven_Lake,_Changbai.jpg#Licensing",
    },
    {
      subject: l("Yanji at night", "延吉夜景", "연길 야경"),
      author: "EditQ",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Yanji_at_night.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  ],
  [moheSlug]: [
    ...harbinSnowTownCredits.slice(1),
    {
      subject: l("Beiji Village in winter", "冬季的北极村", "겨울의 북극촌"),
      author: "funcn",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:%E5%8C%97%E6%9E%81%E6%9D%91%E7%9A%84%E7%AB%A5%E8%AF%9D%E4%B8%96%E7%95%8C_QQ696847_-_panoramio_(2).jpg",
      licenseLabel: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    },
    {
      subject: l("Saint Sophia Cathedral in winter", "冬季的圣索菲亚教堂", "겨울의 성 소피아 성당"),
      author: "Yan Enming",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Saint_Sophia_Cathedral,_Harbin_4.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    harbinStationCredit,
  ],
  [snowTownMoheSlug]: [
    ...harbinSnowTownCredits.slice(1),
    {
      subject: l("Saint Sophia Cathedral in winter", "冬季的圣索菲亚教堂", "겨울의 성 소피아 성당"),
      author: "Yan Enming",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Saint_Sophia_Cathedral,_Harbin_4.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    harbinStationCredit,
  ],
  [yanjiWandaSlug]: [
    {
      subject: l("Changbai Mountain Tianchi in winter", "长白山冬季天池", "겨울 백두산 천지"),
      author: "Charlie fong",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Heaven_Lake,_Changbai.jpg",
      licenseLabel: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Heaven_Lake,_Changbai.jpg#Licensing",
    },
    {
      subject: l("Heaven Lake, Changbai Mountain", "长白山天池", "백두산 천지"),
      author: "Wang65",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tianchi_Changbai.JPG",
      licenseLabel: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
    {
      subject: l("Yanji at night", "延吉夜景", "연길 야경"),
      author: "EditQ",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Yanji_at_night.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  ],
});
