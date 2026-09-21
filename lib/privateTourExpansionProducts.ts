import type {
  LocalizedStringList,
  LocalizedText,
  PrivateTourDay,
  PrivateTourImage,
  PrivateTourPriceTier,
  PrivateTourProduct,
  PrivateTourRouteMediaGroup,
} from "./privateTourProducts";

const l = (en: string, zh: string, ko: string): LocalizedText => ({
  en,
  zh,
  ko,
});

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

const image = (
  slug: string,
  file:
    | "hero.webp"
    | "gallery-1.webp"
    | "gallery-2.webp"
    | `route-day-${number}.webp`,
  width: number,
  height: number,
  alt: LocalizedText,
  caption: LocalizedText,
  objectPosition = "50% 50%",
): PrivateTourImage => ({
  src: `/images/tours/${slug}/${file}`,
  width,
  height,
  objectPosition,
  alt,
  caption,
});

const routeMedia = (
  dayNumber: number,
  label: LocalizedText,
  routeImage: PrivateTourImage,
): PrivateTourRouteMediaGroup => ({
  day: dayNumber,
  variants: [{ label, image: routeImage }],
});

const servicePolicy = Object.freeze({
  shoppingStops: false,
  addedServicesRequirePriorAgreement: true,
} as const);

const PUBLISHED = "2026-09-21";
const MODIFIED = "2026-09-21";

const packageLabel = l(
  "Private tour package",
  "私家团标准版",
  "프라이빗 투어 패키지",
);

const packageSummary = l(
  "Private transport, any listed guide service, transfers, admissions and accommodation are supplied only as named in the written booking confirmation. No shopping stops.",
  "私车、导游服务、接送、门票与住宿只按书面确认单列明范围提供，无购物店安排。",
  "전용 차량, 가이드 서비스, 이동, 입장권과 숙박은 서면 예약 확인서에 명시된 범위로만 제공되며 쇼핑 일정은 없습니다.",
);

const standardPackage = (
  prices: readonly PrivateTourPriceTier[],
  id = "standard-guided",
) => ({
  id,
  guideMode: "standard" as const,
  label: packageLabel,
  summary: packageSummary,
  ...(prices.length === 0 ? { quoteOnly: true as const } : {}),
  prices,
});

const pricingBookingNote = (
  availableEn: string,
  availableZh: string,
  availableKo: string,
) =>
  l(
    `${availableEn} Each published amount is a per-person starting price for the stated group size and base scope; unlisted group sizes are on request. Send dates, rooming, arrival details and luggage count. We will confirm hotels, transport, guide coverage, seasonal supplements and the final total in writing before payment.`,
    `${availableZh} 页面数字为对应人数与基础服务范围的每人起价，未列人数须询价。请提供日期、房间配置、到离信息和行李数量；我们会在付款前书面确认酒店、交通、导游覆盖、旺季附加费与最终总价。`,
    `${availableKo} 표시 금액은 명시된 인원과 기본 서비스 범위에 적용되는 1인 시작가이며, 표시되지 않은 인원은 별도 견적입니다. 날짜, 객실 구성, 도착·출발 정보와 수하물 수량을 보내 주시면 결제 전에 호텔, 교통, 가이드 범위, 성수기 추가금과 최종 총액을 서면으로 확인합니다.`,
  );

const quoteBookingNote = (
  availableEn: string,
  availableZh: string,
  availableKo: string,
) =>
  l(
    `${availableEn} Send dates, rooming, arrival details and luggage count. We will confirm hotels, transport, guide coverage, seasonal supplements and the final total in writing before payment.`,
    `${availableZh} 请提供日期、房间配置、到离信息和行李数量；我们会在付款前书面确认酒店、交通、导游覆盖、旺季附加费与最终总价。`,
    `${availableKo} 날짜, 객실 구성, 도착·출발 정보와 수하물 수량을 보내 주시면 결제 전에 호텔, 교통, 가이드 범위, 성수기 추가금과 최종 총액을 서면으로 확인합니다.`,
  );

const commonExclusions = (
  extraEn: readonly string[],
  extraZh: readonly string[],
  extraKo: readonly string[],
) =>
  lists(
    [
      "International flights and any transport not named in the written confirmation",
      "Lunches, dinners and drinks unless a specific meal is listed",
      "Comprehensive international travel insurance, visas, tips and personal expenses",
      "Single-room supplements, room upgrades and holiday surcharges",
      "Activities or extra service added after confirmation",
      ...extraEn,
    ],
    [
      "国际机票及书面确认单未列明的交通",
      "午餐、晚餐和饮料，逐日明确列出的餐食除外",
      "综合国际旅行保险、签证、司导小费及个人消费",
      "单房差、房型升级及节假日附加费",
      "确认行程之后新增的活动或服务",
      ...extraZh,
    ],
    [
      "국제선 항공편 및 서면 확인서에 명시되지 않은 교통",
      "일정에 특정 식사가 명시된 경우를 제외한 중식·석식·음료",
      "종합 국제 여행자 보험, 비자, 기사·가이드 팁 및 개인 경비",
      "1인실 추가금, 객실 업그레이드 및 공휴일 추가금",
      "확정 후 추가하는 체험 또는 서비스",
      ...extraKo,
    ],
  );

const chengduJiuzhaigouSlug = "chengdu-jiuzhaigou-huanglong-6-day-private-tour";
const chengduJiuzhaigou: PrivateTourProduct = {
  id: "private-tour-chengdu-jiuzhaigou-huanglong-6d5n",
  slug: chengduJiuzhaigouSlug,
  days: 6,
  nights: 5,
  servicePolicy,
  title: l(
    "Chengdu, Jiuzhaigou & Huanglong: 6-Day Private Tour",
    "成都·九寨沟·黄龙 6 天 5 晚私家团",
    "청두·주자이거우·황룽 6일 프라이빗 투어",
  ),
  eyebrow: l(
    "Jiuzhaigou first, Huanglong on the return, Chengdu last",
    "先九寨沟、返程游黄龙，最后完整看成都",
    "주자이거우부터, 귀환길 황룽, 마지막은 청두",
  ),
  lede: l(
    "Arrive in Chengdu, travel straight to Jiuzhaigou on Day 2, visit Huanglong on the return journey and keep a full final touring day for Chengdu's pandas and city life.",
    "抵达成都后，第 2 天直接乘高铁前往九寨沟；返程途中游黄龙，最后用完整一天看熊猫与成都生活。",
    "청두 도착 후 2일 차에 바로 주자이거우로 이동하고, 귀환길에 황룽을 방문한 뒤 마지막 종일 일정은 판다와 청두 도심에 씁니다.",
  ),
  summary: l(
    "Three nights in Chengdu and two near Jiuzhaigou, with breakfast, private station and scenic-area transfers, guided touring and the confirmed rail plan.",
    "成都 3 晚、九寨沟 2 晚含早，按确认方案安排高铁、车站与景区接驳，并以私家团节奏完成核心游览。",
    "청두 3박과 주자이거우 인근 2박에 조식, 확정된 열차와 역·관광지 이동, 가이드 관광을 포함하는 프라이빗 일정입니다.",
  ),
  highlights: lists(
    [
      "Early Panda Base visit",
      "A full day in Jiuzhaigou",
      "Huanglong with an altitude-aware pace",
      "Train plus private last-mile transfers",
    ],
    [
      "大熊猫基地早场",
      "九寨沟完整一日",
      "按高海拔情况调整黄龙节奏",
      "高铁与最后一段私车接驳",
    ],
    [
      "이른 판다기지 관람",
      "주자이거우 종일 일정",
      "고도를 고려한 황룽 일정",
      "열차와 전용 차량을 잇는 이동",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Chengdu", "抵达成都", "청두 도착"),
      l(
        "Meet the driver at the confirmed airport or station and transfer to the Chengdu hotel. No fixed sightseeing is planned, preserving time for delays and check-in.",
        "在已确认的成都机场或车站接站，私车送往成都酒店。当天不安排固定景点，为航班或列车波动与入住留出余量。",
        "확정된 청두 공항 또는 역에서 기사를 만나 호텔로 이동합니다. 지연과 체크인에 여유를 두기 위해 고정 관광은 넣지 않습니다.",
      ),
    ),
    day(
      2,
      l("Train north to Jiuzhaigou", "高铁进入川北", "열차로 주자이거우 이동"),
      l(
        "Take the confirmed high-speed train to Huanglongjiuzhai station, meet the local guide and driver, and continue by private vehicle to the Jiuzhaigou hotel. The remainder of the day is for rest and altitude adjustment.",
        "乘已确认高铁前往黄龙九寨站，由当地导游与司机接站，再乘私车前往九寨沟酒店；余下时间用于休息与适应海拔。",
        "확정된 고속철도로 황룽주자이역에 간 뒤 현지 가이드와 기사를 만나 전용 차량으로 주자이거우 호텔에 이동합니다. 남은 시간은 휴식과 고도 적응에 씁니다.",
      ),
    ),
    day(
      3,
      l("A full day in Jiuzhaigou", "九寨沟完整一日", "주자이거우 종일"),
      l(
        "Spend the day in Jiuzhaigou's open valleys using the operating scenic buses and paths. The guide adjusts the exact route to weather, crowd controls, energy and same-day access.",
        "把完整一天留给九寨沟，使用当天运行的景区车与开放步道；导游按天气、客流、体力与当日开放情况调整具体游线。",
        "운행 중인 관광지 버스와 개방된 길을 이용해 주자이거우에서 하루를 보내며 가이드가 날씨, 혼잡, 체력과 당일 개방 상태에 맞춰 동선을 조정합니다.",
      ),
    ),
    day(
      4,
      l("Huanglong and return to Chengdu", "黄龙与返回成都", "황룽 후 청두 귀환"),
      l(
        "Drive to Huanglong when the road and site operate, take the confirmed uphill cable car plan and walk down at an altitude-aware pace. Continue to Huanglongjiuzhai station for the confirmed train back to Chengdu.",
        "在道路与景区开放时前往黄龙，按确认方案乘上行索道并根据高海拔情况步行下山；随后前往黄龙九寨站，乘已确认高铁返回成都。",
        "도로와 관광지가 운영할 때 황룽으로 가서 확정된 상행 케이블카를 이용하고 고도에 맞춰 걸어 내려온 뒤 황룽주자이역에서 확정 열차로 청두에 돌아갑니다.",
      ),
    ),
    day(
      5,
      l(
        "Pandas and Chengdu life",
        "熊猫与成都生活",
        "판다와 청두의 일상",
      ),
      l(
        "Visit Chengdu Panda Base early, then continue to Wenshu Temple, People's Park and Jinli Old Street. The listed lunch is included; panda activity is never guaranteed.",
        "早场游览成都大熊猫基地，随后前往文殊院、人民公园与锦里古街；当天行程所列午餐包含，但不承诺熊猫固定活跃状态。",
        "이른 시간 청두 판다기지를 방문한 뒤 문수원, 인민공원과 진리거리를 둘러봅니다. 일정에 명시된 중식은 포함되며 판다의 활동 상태는 보장하지 않습니다.",
      ),
    ),
    day(
      6,
      l("Depart Chengdu", "成都送站", "청두 출발"),
      l(
        "Check out and transfer by private vehicle to the confirmed Chengdu airport or railway station. No sightseeing is fixed on departure day.",
        "退房后乘私车前往已确认的成都机场或车站。返程日不安排固定游览。",
        "체크아웃 후 전용 차량으로 확정된 청두 공항 또는 역에 이동하며 출발일에는 고정 관광이 없습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five breakfast-included nights based on twin sharing: three in Chengdu and two near Jiuzhaigou. The four-star standard, exact hotels, room type and single supplement must be confirmed in writing.",
    "共 5 晚含早，默认双人同住：成都 3 晚、九寨沟 2 晚。4 星标准、具体酒店、房型与单房差须在付款前书面确认。",
    "조식 포함 5박, 2인 1실 기준으로 청두 3박과 주자이거우 인근 2박입니다. 4성급 기준, 정확한 호텔·객실 유형·1인실 추가금은 결제 전 서면 확인합니다.",
  ),
  serviceNote: l(
    "The published scope includes private English-speaking guide and driver service, airport or station transfers, round-trip second-class high-speed rail, listed admissions and scenic buses, an uphill Huanglong cable car and the Day 5 lunch. Final train times, hotels and any weather alternative are confirmed in writing.",
    "公开范围包含私人英语导游与司机、机场或车站接送、往返二等座高铁、所列门票与景区车、黄龙上行索道，以及第 5 天午餐；最终班次、酒店与天气备用方案在付款前书面确认。",
    "공개 범위에는 영어 전용 가이드와 기사, 공항·역 이동, 왕복 고속철도 2등석, 명시된 입장권과 관광지 버스, 황룽 상행 케이블카 및 5일 차 중식이 포함됩니다. 최종 열차, 호텔과 날씨 대체 일정은 서면 확인합니다.",
  ),
  exclusions: commonExclusions(
    [
      "Meals inside Jiuzhaigou unless specifically confirmed",
      "Optional oxygen, porterage and medical costs",
    ],
    ["未明确确认的九寨沟景区内餐食", "自选氧气、行李搬运及医疗费用"],
    [
      "별도 확인되지 않은 주자이거우 내부 식사",
      "선택 산소용품, 짐 운반 및 의료비",
    ],
  ),
  bookingNote: pricingBookingNote(
    "The published USD 1,395 starting price applies to 2 travellers sharing a twin room in the stated low-season conditions.",
    "页面所示 USD 1,395/人起价适用于 2 位成人淡季双人同住。",
    "표시된 1인 USD 1,395 시작가는 성인 2명 비수기 2인 1실 조건에 적용됩니다.",
  ),
  heroImage: image(
    chengduJiuzhaigouSlug,
    "hero.webp",
    1600,
    1064,
    l("Five Flower Lake in Jiuzhaigou", "九寨沟五花海", "주자이거우 오화해"),
    l(
      "A full day is reserved for Jiuzhaigou, subject to open routes.",
      "为九寨沟留出完整一天，具体游线以当日开放为准。",
      "주자이거우에 하루를 배정하며 동선은 당일 개방 상태를 따릅니다.",
    ),
  ),
  gallery: [
    image(
      chengduJiuzhaigouSlug,
      "gallery-1.webp",
      1600,
      1067,
      l(
        "Giant panda at Chengdu Panda Base",
        "成都大熊猫基地内的大熊猫",
        "청두 판다기지의 자이언트판다",
      ),
      l(
        "The route begins in Chengdu; animal activity varies by time and conditions.",
        "路线从成都开始；熊猫活跃状态随时间和现场条件变化。",
        "여정은 청두에서 시작하며 판다의 활동은 시간과 현장 상황에 따라 달라집니다.",
      ),
    ),
  ],
  routeMedia: [
    routeMedia(
      5,
      l("Huanglong", "黄龙", "황룽"),
      image(
        chengduJiuzhaigouSlug,
        "route-day-2.webp",
        1600,
        1066,
        l("Colourful ponds in Huanglong", "黄龙彩池", "황룽의 다채로운 연못"),
        l(
          "Huanglong is weather-, access- and altitude-dependent.",
          "黄龙游览受天气、道路开放与高海拔条件影响。",
          "황룽 일정은 날씨, 접근 상황과 고도의 영향을 받습니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([{ travelers: 2, cnyPerPerson: 9067, usdPerPerson: 1395, publishedPrice: { currency: "USD", amountPerPerson: 1395 } }]),
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const yunnanSlug = "kunming-dali-lijiang-8-day-private-tour";
const yunnan: PrivateTourProduct = {
  id: "private-tour-kunming-dali-lijiang-8d7n",
  slug: yunnanSlug,
  days: 8,
  nights: 7,
  servicePolicy,
  title: l(
    "Kunming, Dali & Lijiang: 8-Day Private Tour",
    "昆明·大理·丽江 8 天 7 晚私家团",
    "쿤밍·다리·리장 8일 프라이빗 투어",
  ),
  eyebrow: l(
    "Kunming to Dali and Lijiang, then back for an easier departure",
    "昆明进，经大理与丽江，再回昆明从容返程",
    "쿤밍에서 다리와 리장을 거쳐 다시 쿤밍으로",
  ),
  lede: l(
    "Move west from Kunming to Dali and Lijiang for flower markets, Erhai mornings, Bai craft and one carefully paced snow-mountain day, then return by rail for a lower-stress departure.",
    "从昆明一路向西到大理与丽江，串联花市、洱海清晨、白族手作与一段从容的雪山体验，最后乘动车回昆明返程。",
    "쿤밍에서 다리와 리장으로 이동해 꽃시장, 얼하이의 아침, 바이족 공예와 여유 있는 설산 일정을 경험한 뒤 열차로 쿤밍에 돌아옵니다.",
  ),
  summary: l(
    "Seven nights: two in Kunming, three in Dali and two in Lijiang. The public CNY 5,680 figure is a six-traveller land-arrangement starting price; exact hotels, rooms and breakfast are confirmed before payment.",
    "共 7 晚：昆明 2 晚、大理 3 晚、丽江 2 晚。页面 CNY 5,680 为 6 人当地行程起价；具体酒店、房型与早餐在付款前书面确认。",
    "총 7박으로 쿤밍 2박, 다리 3박, 리장 2박입니다. 공개 CNY 5,680은 6명 기준 현지 일정 시작가이며 호텔, 객실과 조식은 결제 전 서면 확인합니다.",
  ),
  metadataDescription: l(
    "8-day Kunming, Dali and Lijiang private route from CNY 5,680 per person for 6 travellers. Hotel and service scope are confirmed before payment.",
    "昆明、大理、丽江 8 天私家路线，6 人 CNY 5,680/人起；酒店与服务范围在付款前确认。",
    "쿤밍·다리·리장 8일 프라이빗 일정. 6명 기준 1인 CNY 5,680부터이며 호텔과 서비스 범위는 결제 전 확인합니다.",
  ),
  highlights: lists(
    [
      "Dounan Flower Market and Dianchi wetland",
      "Erhai sunrise and Xizhou craft",
      "Dali Old Town and Yunxiang sunset",
      "Lijiang villages and a snow-mountain day",
    ],
    ["斗南花市与滇池湿地", "洱海日出与喜洲手作", "大理古城与云想山日落", "丽江村落与一日雪山"],
    [
      "더우난 꽃시장과 뎬츠 습지",
      "얼하이 일출과 시저우 공예",
      "다리고성과 윈샹산 일몰",
      "리장 마을과 설산 하루",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Kunming", "抵达昆明", "쿤밍 도착"),
      l(
        "Meet the driver at the confirmed airport or station and transfer to the Kunming hotel. No fixed sightseeing is planned.",
        "在已确认的昆明机场或车站接站，私车送往酒店；当天不安排固定游览。",
        "확정된 쿤밍 공항 또는 역에서 만나 호텔로 이동하며 고정 관광은 없습니다.",
      ),
    ),
    day(
      2,
      l("Flowers, wetland and rail to Dali", "花市、湿地与动车前往大理", "꽃시장·습지 후 다리 이동"),
      l(
        "Visit Dounan Flower Market and Laoyuhe Wetland, then take the confirmed high-speed train to Dali and settle in near Erhai.",
        "游览斗南花市与捞鱼河湿地，再乘已确认动车前往大理，入住洱海周边酒店。",
        "더우난 꽃시장과 라오위허 습지를 둘러본 뒤 확정 고속철도로 다리에 이동해 얼하이 인근에 숙박합니다.",
      ),
    ),
    day(
      3,
      l("Erhai sunrise, Xizhou and tie-dye", "洱海日出、喜洲与扎染", "얼하이 일출·시저우·염색"),
      l(
        "Begin at Longkan Pier, continue along Erhai's S-bend and visit Xizhou Old Town for the listed Bai tie-dye experience.",
        "从龙龛码头日出开始，继续游洱海 S 湾，再到喜洲古镇参加行程所列白族扎染体验。",
        "룽칸 부두 일출을 보고 얼하이 S자 만을 거쳐 시저우 고성에서 명시된 바이족 염색 체험을 합니다.",
      ),
    ),
    day(
      4,
      l(
        "Dali Old Town, Ideal Garden and sunset",
        "大理古城、理想邦与日落",
        "다리고성·리샹방·일몰",
      ),
      l(
        "Walk Dali Old Town, continue to Ideal Garden and reserve late afternoon for the confirmed Yunxiang Mountain sunset plan.",
        "慢游大理古城，随后前往理想邦，并把傍晚留给已确认的云想山日落行程。",
        "다리고성을 둘러보고 리샹방으로 이동한 뒤 늦은 오후에는 확정된 윈샹산 일몰 일정을 진행합니다.",
      ),
    ),
    day(
      5,
      l("Dali to Lijiang via wetlands and valley", "大理经湿地与山谷前往丽江", "다리에서 습지와 계곡을 거쳐 리장으로"),
      l(
        "Travel to Lijiang by the confirmed private transfer, stopping at Houniaowan Wetland and Tinghua Valley before checking in.",
        "按确认专车前往丽江，途中游候鸟湾湿地与听花谷，随后入住丽江酒店。",
        "확정된 전용 차량으로 리장에 이동하며 허우냐오완 습지와 팅화 계곡을 들른 뒤 호텔에 체크인합니다.",
      ),
    ),
    day(
      6,
      l("Yunshanping, Blue Moon Valley and Shuhe", "云杉坪、蓝月谷与束河", "윈산핑·남월곡·수허"),
      l(
        "Use the named scenic transport for Yunshanping and Blue Moon Valley, then finish in Shuhe Old Town. Access, visibility and altitude suitability are checked for the travel date.",
        "按确认方案游云杉坪与蓝月谷，再到束河古镇收尾；开放、能见度与高海拔适应性按真实日期核对。",
        "확정된 관광 교통으로 윈산핑과 남월곡을 보고 수허고성에서 마칩니다. 개방, 시야와 고도 적합성은 여행일에 확인합니다.",
      ),
    ),
    day(
      7,
      l(
        "Baisha, Yuhu Village and rail to Kunming",
        "白沙、玉湖村与动车返昆",
        "바이샤·위후촌 후 쿤밍 귀환",
      ),
      l(
        "Visit Baisha Old Town and Yuhu Village below the snow mountain, then take the confirmed train back to Kunming for the final night.",
        "游白沙古镇与雪山脚下的玉湖村，再乘已确认动车返回昆明，入住最后一晚。",
        "바이샤고성과 설산 아래 위후촌을 방문한 뒤 확정 열차로 쿤밍에 돌아가 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      8,
      l("Depart Kunming", "昆明离开", "쿤밍 출발"),
      l(
        "Wake without a fixed sightseeing stop and take the private transfer to the confirmed Kunming airport or railway station.",
        "当天不安排固定景点，按已确认航班或车次乘私车前往昆明机场或车站。",
        "고정 관광 없이 여유 있게 준비한 뒤 전용 차량으로 확정된 쿤밍 공항 또는 역에 이동합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Seven nights based on the published route: two in Kunming, three in Dali and two in Lijiang. The public figure is a land-arrangement reference; hotel grade, room type, breakfast and single supplement are confirmed in writing.",
    "按公开路线共住 7 晚：昆明 2 晚、大理 3 晚、丽江 2 晚。公开数字为当地行程参考；酒店等级、房型、早餐与单房差须书面确认。",
    "공개 동선 기준 총 7박으로 쿤밍 2박, 다리 3박, 리장 2박입니다. 공개 금액은 현지 일정 참고가이며 호텔 등급, 객실, 조식과 1인실 추가금은 서면 확인합니다.",
  ),
  serviceNote: l(
    "The CNY 5,680 benchmark covers the published core-route land arrangement for six travellers. The written quote identifies hotel and breakfast scope, Kunming–Dali and Lijiang–Kunming rail, private vehicles, driver-guide or guide language, insurance, admissions and each listed local experience.",
    "CNY 5,680 基准适用于 6 人公开核心路线的当地安排。书面报价会逐项写明酒店与早餐范围、昆明—大理及丽江—昆明动车、私车、司机兼向导或导游语言、保险、门票和所列体验。",
    "CNY 5,680 기준가는 6명 공개 핵심 동선의 현지 일정에 적용됩니다. 서면 견적에는 호텔·조식 범위, 쿤밍-다리와 리장-쿤밍 열차, 전용 차량, 기사 겸 가이드 또는 가이드 언어, 보험, 입장권과 체험을 명시합니다.",
  ),
  exclusions: commonExclusions(
    [
      "Any snow-mountain cableway or activity not named in the final confirmation",
      "Meals and purchases during village or food stops",
    ],
    ["最终确认单未列明的雪山索道或活动", "村落或美食停留中的餐费与采购"],
    [
      "최종 확인서에 없는 설산 케이블카 또는 체험",
      "마을·음식 일정의 식사비와 구매 비용",
    ],
  ),
  bookingNote: pricingBookingNote(
    "The published CNY 5,680 starting price applies to 6 travellers; groups of 2 or 4 require a separate quote.",
    "页面所示 CNY 5,680/人起价适用于 6 人同行；2 人与 4 人需单独询价。",
    "표시된 1인 CNY 5,680 시작가는 6명 기준이며 2명과 4명은 별도 견적입니다.",
  ),
  heroImage: image(
    yunnanSlug,
    "hero.webp",
    1600,
    747,
    l("Lijiang Old Town rooftops", "丽江古城屋顶", "리장고성 지붕"),
    l(
      "The route spends two nights in Lijiang before returning to Kunming by rail.",
      "路线在丽江连住两晚，再乘动车返回昆明。",
      "리장에서 2박한 뒤 열차로 쿤밍에 돌아옵니다.",
    ),
  ),
  gallery: [
    image(
      yunnanSlug,
      "gallery-1.webp",
      1600,
      1200,
      l("Erhai Lake near Dali", "大理洱海湖景", "다리 얼하이 풍경"),
      l(
        "The Dali stay leaves time for the lakeshore and Xizhou.",
        "大理停留为洱海与喜洲留出时间。",
        "다리 일정은 얼하이와 시저우를 위한 시간을 둡니다.",
      ),
    ),
  ],
  routeMedia: [
    routeMedia(
      4,
      l("Dali Old Town", "大理古城", "다리고성"),
      image(
        yunnanSlug,
        "route-day-4.webp",
        1600,
        1000,
        l("South Gate of Dali Old Town", "大理古城南门", "다리고성 남문"),
        l(
          "The fourth day keeps time for Dali Old Town before the confirmed sunset stop.",
          "第 4 天在已确认的日落行程前，为大理古城保留游览时间。",
          "4일 차에는 확정된 일몰 일정 전에 다리고성을 둘러볼 시간을 둡니다.",
        ),
      ),
    ),
  ],
  packages: [standardPackage([{ travelers: 6, cnyPerPerson: 5680, publishedPrice: { currency: "CNY", amountPerPerson: 5680 } }])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const guizhouSlug = "guizhou-huangguoshu-libo-miao-7-day-private-tour";
const guizhou: PrivateTourProduct = {
  id: "private-tour-guizhou-huangguoshu-libo-xijiang-7d6n",
  slug: guizhouSlug,
  days: 7,
  nights: 6,
  servicePolicy,
  title: l(
    "Guiyang, Huangguoshu, Libo, Xijiang & Zhenyuan: 7-Day Private Tour",
    "贵阳·黄果树·荔波·西江苗寨·镇远 7 天 6 晚私家团",
    "구이양·황궈수·리보·시장·전위안 7일 프라이빗 투어",
  ),
  eyebrow: l(
    "Waterfalls, karst water, Miao heritage and a riverside old town",
    "瀑布、喀斯特水景、苗族文化与河畔古城",
    "폭포, 카르스트 물길, 먀오족 문화와 강변 고성",
  ),
  lede: l(
    "Follow the seven-day route through Huangguoshu, Small Seven Holes, two nights in Xijiang and a final riverside stay in Zhenyuan before returning to Guiyang.",
    "按 7 天路线依次游览黄果树、小七孔，在西江苗寨连住两晚，再到镇远河畔住一晚后返回贵阳。",
    "황궈수와 소칠공을 지나 시장에서 2박하고 전위안 강변에서 마지막 1박을 한 뒤 구이양으로 돌아오는 7일 동선입니다.",
  ),
  summary: l(
    "Six breakfast-included nights in Guiyang, Huangguoshu or Anshun, Libo, Xijiang and Zhenyuan, with private road transport and confirmed admissions.",
    "贵阳、黄果树或安顺、荔波、西江与镇远共 6 晚含早，以私车完成跨区移动，并按确认单安排核心门票与景区车。",
    "구이양, 황궈수 또는 안순, 리보, 시장과 전위안에서 조식 포함 6박과 전용 차량 이동, 확정 입장권으로 구성됩니다.",
  ),
  highlights: lists(
    [
      "Huangguoshu Waterfall",
      "Small Seven Holes' water-and-forest route",
      "Two nights and one confirmed cultural activity in Xijiang",
      "Zhenyuan's riverside lanes and night view",
      "Private long-distance transfers with rest stops",
    ],
    [
      "黄果树瀑布",
      "小七孔水森林游线",
      "西江连住两晚与一项已确认的苗族文化体验",
      "镇远河畔街巷与夜景",
      "带休息时间的跨区私车",
    ],
    [
      "황궈수폭포",
      "소칠공의 물과 숲 동선",
      "시장 2박과 확정된 먀오족 문화 체험 한 가지",
      "전위안 강변 골목과 야경",
      "휴식을 포함한 장거리 전용 차량 이동",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Guiyang", "抵达贵阳", "구이양 도착"),
      l(
        "Meet the driver at the confirmed airport or station and transfer to the Guiyang hotel; no fixed sightseeing is planned.",
        "在已确认的贵阳机场或车站接站，私车送往酒店；当天不安排固定游览。",
        "확정된 구이양 공항 또는 역에서 만나 호텔로 이동하며 고정 관광은 없습니다.",
      ),
    ),
    day(
      2,
      l("Huangguoshu Waterfall", "黄果树瀑布", "황궈수폭포"),
      l(
        "Travel to Huangguoshu, use the operating scenic transport and open paths, then stay in Anshun or near the scenic area. Water volume and path access vary.",
        "前往黄果树，使用当天运行的景区车与开放步道，结束后入住安顺或景区附近。水量与步道开放情况会变化。",
        "황궈수로 이동해 운행 중인 관광지 차량과 개방된 길을 이용하고 안순 또는 관광지 인근에서 숙박합니다. 수량과 길 개방은 달라질 수 있습니다.",
      ),
    ),
    day(
      3,
      l("Libo and Small Seven Holes", "荔波与小七孔", "리보와 소칠공"),
      l(
        "Continue by private vehicle to Libo, then follow the confirmed mostly downhill Small Seven Holes route using open trails and scenic buses. Exact stops follow the day's operation.",
        "乘私车前往荔波，再按确认方案游览以顺势下行为主的小七孔路线，使用当天开放步道与景区车；具体点位以现场运营为准。",
        "전용 차량으로 리보에 이동한 뒤 확정된 완만한 하행 중심 소칠공 동선을 따릅니다. 개방된 길과 관광지 버스를 이용하며 세부 방문지는 당일 운영을 따릅니다.",
      ),
    ),
    day(
      4,
      l("Libo to Xijiang", "荔波前往西江苗寨", "리보에서 시장으로"),
      l(
        "Travel by private vehicle to Xijiang Miao Village, enter with the confirmed ticket and scenic transport, and stay in the village for the first of two nights.",
        "乘私车前往西江苗寨，使用确认的门票与景区车入园，并在苗寨内或附近入住，开始连续两晚停留。",
        "전용 차량으로 시장 먀오족 마을에 가서 확정된 입장권과 관광지 차량을 이용하고 마을 안 또는 인근에서 2박 중 첫날을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Xijiang Miao heritage", "西江苗族文化", "시장 먀오족 문화"),
      l(
        "Use the full day for a guided village walk, museum visit and one pre-confirmed silverwork or batik experience, then stay a second night in Xijiang.",
        "用完整一天安排村寨导览、博物馆与一项提前确认的银饰或蜡染体验，并在西江连住第二晚。",
        "마을 가이드 워크, 박물관과 사전 확정된 은공예 또는 납염 체험 한 가지에 하루를 쓰고 시장에서 두 번째 밤을 보냅니다.",
      ),
    ),
    day(
      6,
      l(
        "Xijiang to Zhenyuan",
        "西江前往镇远古城",
        "시장에서 전위안으로",
      ),
      l(
        "Drive to Zhenyuan for the old riverside lanes, the confirmed historic sites and the Wuyang River evening atmosphere. A river cruise is included only when named in the confirmation.",
        "乘私车前往镇远，游览河畔老街与确认单列明的历史景点，并感受舞阳河夜景；游船仅在确认单明确列出时包含。",
        "전용 차량으로 전위안에 이동해 강변 옛 골목과 확인서에 적힌 유적, 우양강의 저녁 풍경을 봅니다. 유람선은 확인서에 명시된 경우에만 포함됩니다.",
      ),
    ),
    day(
      7,
      l("Zhenyuan to Guiyang for departure", "镇远返回贵阳送站", "전위안에서 구이양으로 출발"),
      l(
        "After a gentle morning, transfer by private vehicle from Zhenyuan to the confirmed Guiyang airport or railway station. The departure time must allow for the road journey.",
        "上午轻松活动后，从镇远乘私车前往已确认的贵阳机场或车站；离境时间须为公路转场留足余量。",
        "여유로운 아침 뒤 전용 차량으로 전위안에서 확정된 구이양 공항 또는 역에 이동합니다. 출발 시간은 도로 이동 여유를 충분히 두어야 합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Six breakfast-included nights based on twin sharing: one in Guiyang, one near Huangguoshu or in Anshun, one in Libo, two in Xijiang and one in Zhenyuan. Local boutique properties may differ from city four-star hotels.",
    "共 6 晚含早，默认双人同住：贵阳 1 晚、黄果树附近或安顺 1 晚、荔波 1 晚、西江 2 晚、镇远 1 晚。当地精品客栈的硬件可能不同于城市 4 星酒店。",
    "조식 포함 6박, 2인 1실 기준으로 구이양 1박, 황궈수 인근 또는 안순 1박, 리보 1박, 시장 2박, 전위안 1박입니다. 현지 부티크 숙소는 도시 4성급 호텔과 시설이 다를 수 있습니다.",
  ),
  serviceNote: l(
    "The published scope includes a licensed private English-speaking guide and dedicated driver throughout, private airport or station transfers, the listed admissions and scenic transport, daily bottled water and basic China-based travel accident insurance. One-guide continuity is used when available and confirmed before payment.",
    "公开范围包含全程持证私人英语导游与专属司机、机场或车站接送、所列门票与景区交通、每日瓶装水及中国境内基础旅游意外险；如排期允许将由同一位导游全程服务，并在付款前确认。",
    "공개 범위에는 전 일정 자격 있는 영어 전용 가이드와 전담 기사, 공항·역 이동, 명시된 입장권과 관광지 교통, 생수 및 중국 내 기본 여행상해보험이 포함됩니다. 가능하면 동일 가이드가 동행하며 결제 전 확정합니다.",
  ),
  exclusions: commonExclusions(
    [
      "FAST, Fanjingshan, Big Seven Holes and unlisted performances",
      "Optional night tours or private home visits",
    ],
    ["FAST、梵净山、大七孔及未列演出", "未列明的夜游或私人家访"],
    [
      "FAST, 판징산, 대칠공과 미기재 공연",
      "미기재 야간 관광 또는 개인 가정 방문",
    ],
  ),
  bookingNote: pricingBookingNote(
    "The published USD 1,888 starting price applies to 2 adults sharing a twin room in the stated low-season conditions.",
    "页面所示 USD 1,888/人起价适用于 2 位成人淡季双人同住。",
    "표시된 1인 USD 1,888 시작가는 성인 2명 비수기 2인 1실 조건에 적용됩니다.",
  ),
  heroImage: image(
    guizhouSlug,
    "hero.webp",
    1600,
    1280,
    l(
      "Xijiang Miao Village on the hillside",
      "山坡上的西江苗寨",
      "산비탈의 시장 먀오족 마을",
    ),
    l(
      "The village stay is paired with one confirmed cultural activity.",
      "苗寨停留搭配一项已确认的文化体验。",
      "마을 체류에는 확정된 문화 체험 한 가지를 더합니다.",
    ),
  ),
  gallery: [
    image(
      guizhouSlug,
      "gallery-1.webp",
      859,
      1600,
      l("Huangguoshu Waterfall", "黄果树瀑布", "황궈수폭포"),
      l(
        "Water volume and access vary with weather and operating conditions.",
        "水量与开放范围随天气和运营情况变化。",
        "수량과 접근 범위는 날씨와 운영 상황에 따라 달라집니다.",
      ),
      "50% 40%",
    ),
  ],
  routeMedia: [
    routeMedia(
      3,
      l("Small Seven Holes", "小七孔", "소칠공"),
      image(
        guizhouSlug,
        "route-day-2.webp",
        1600,
        1200,
        l(
          "Ancient bridge in the Small Seven Holes scenic area",
          "小七孔景区古桥与水景",
          "소칠공 관광지의 고교와 물 풍경",
        ),
        l(
          "The open Small Seven Holes route is visited after the road transfer to Libo.",
          "抵达荔波后按当天开放路线游览小七孔。",
          "리보 도착 후 당일 개방 동선에 맞춰 소칠공을 둘러봅니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 12272, usdPerPerson: 1888, publishedPrice: { currency: "USD", amountPerPerson: 1888 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const fujianSlug = "xiamen-tulou-quanzhou-6-day-private-tour";
const fujian: PrivateTourProduct = {
  id: "private-tour-xiamen-tulou-quanzhou-6d5n",
  slug: fujianSlug,
  days: 6,
  nights: 5,
  servicePolicy,
  title: l(
    "Xiamen, Fujian Tulou, Anxi & Quanzhou: 6-Day Private Tour",
    "厦门·福建土楼·安溪·泉州 6 天 5 晚私家团",
    "샤먼·푸젠 토루·안시·취안저우 6일 프라이빗 투어",
  ),
  eyebrow: l(
    "Island lanes, two tulou areas, Anxi tea and maritime Quanzhou",
    "鼓浪屿街巷、两处土楼区域、安溪茶山与海丝泉州",
    "구랑위 골목, 두 토루 지역, 안시 차와 해상 실크로드 취안저우",
  ),
  lede: l(
    "Start with Gulangyu, continue through Yongding's Chengqi Lou and Nanjing's Tianluokeng area, stop for Anxi tea, then visit Quanzhou before returning to Xiamen for departure.",
    "先游鼓浪屿，再依次前往永定承启楼、南靖田螺坑一带、安溪茶园和泉州，最后返回厦门离境。",
    "구랑위에서 시작해 융딩 청치러우와 난징 톈뤄컹 일대, 안시 차밭, 취안저우를 거쳐 샤먼으로 돌아와 출발합니다.",
  ),
  summary: l(
    "Five four-star-standard nights with breakfast across Xiamen, Nanjing, Anxi and Quanzhou, plus a private English guide, vehicle, admissions, tea tasting and four listed lunches.",
    "厦门、南靖、安溪与泉州共 5 晚 4 星标准含早，并包含私人英语导游、专车、所列门票、品茶体验及 4 顿行程午餐。",
    "샤먼, 난징, 안시와 취안저우에서 4성급 기준 조식 포함 5박, 영어 전용 가이드, 차량, 명시된 입장권, 차 시음과 중식 4회가 포함됩니다.",
  ),
  metadataDescription: l(
    "6-day Xiamen, Fujian Tulou, Anxi and Quanzhou private tour with 4-star stays, English guide, private vehicle, admissions and four lunches.",
    "厦门、福建土楼、安溪与泉州 6 天私家团，含 4 星住宿、英语导游、专车、门票与 4 顿午餐。",
    "샤먼·푸젠 토루·안시·취안저우 6일 프라이빗 투어. 4성급 숙박, 영어 가이드, 전용 차량, 입장권과 중식 4회 포함.",
  ),
  highlights: lists(
    [
      "Gulangyu ferry and lanes",
      "Chengqi Lou and Tianluokeng tulou areas",
      "Anxi tea plantation and tasting",
      "Quanzhou's temples, old city and maritime heritage",
    ],
    [
      "鼓浪屿船票与街巷",
      "承启楼与田螺坑土楼区域",
      "安溪茶园与品茶体验",
      "泉州寺院、古城与海丝遗产",
    ],
    [
      "구랑위 배편과 골목",
      "청치러우와 톈뤄컹 토루 지역",
      "안시 차밭과 시음 체험",
      "취안저우 사원, 고성과 해상 문화유산",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Xiamen and visit Gulangyu", "抵达厦门与鼓浪屿", "샤먼 도착과 구랑위"),
      l(
        "Meet the guide and driver at the confirmed airport, use the reserved ferry to Gulangyu, and explore the car-free lanes and confirmed museum before returning to the Xiamen hotel.",
        "在已确认的厦门机场接站，按预约船班前往鼓浪屿，步行游览街巷与已确认的博物馆后返回厦门酒店。",
        "확정된 샤먼 공항에서 가이드와 기사를 만나 예약 배편으로 구랑위에 들어가 차량 없는 골목과 확정된 박물관을 둘러본 뒤 샤먼 호텔로 돌아옵니다.",
      ),
    ),
    day(
      2,
      l("Chengqi Lou and overnight in Nanjing", "承启楼与南靖住宿", "청치러우와 난징 숙박"),
      l(
        "Drive into the tulou region, visit Chengqi Lou in Yongding and the confirmed round-and-square earth buildings, then continue to the Nanjing hotel. Breakfast and lunch are included.",
        "乘私车进入土楼区域，游览永定承启楼及确认单列明的圆形、方形土楼，再前往南靖酒店入住；当天含早餐与午餐。",
        "전용 차량으로 토루 지역에 들어가 융딩 청치러우와 확인된 원형·사각형 토루를 본 뒤 난징 호텔에 숙박합니다. 조식과 중식이 포함됩니다.",
      ),
    ),
    day(
      3,
      l("Tianluokeng and Anxi tea", "田螺坑与安溪茶园", "톈뤄컹과 안시 차"),
      l(
        "Visit the Tianluokeng tulou cluster, then continue to an Anxi tea plantation for the included tasting experience and stay in Anxi. Breakfast and lunch are included.",
        "游览田螺坑土楼群，再前往安溪茶园参加包含的品茶体验，当晚住安溪；当天含早餐与午餐。",
        "톈뤄컹 토루 군락을 본 뒤 안시 차밭에서 포함된 시음 체험을 하고 안시에서 숙박합니다. 조식과 중식이 포함됩니다.",
      ),
    ),
    day(
      4,
      l("Anxi to Quanzhou", "安溪前往泉州", "안시에서 취안저우로"),
      l(
        "Drive to Quanzhou for Kaiyuan Temple, Qingjing Mosque and a guided old-city walk, then stay in Quanzhou. Breakfast and lunch are included.",
        "乘私车前往泉州，游览开元寺、清净寺并由导游带领步行古城，当晚住泉州；当天含早餐与午餐。",
        "전용 차량으로 취안저우에 가서 개원사, 청정사와 가이드 동행 고성 산책을 하고 취안저우에서 숙박합니다. 조식과 중식이 포함됩니다.",
      ),
    ),
    day(
      5,
      l("Quanzhou to Xiamen", "泉州返回厦门", "취안저우에서 샤먼으로"),
      l(
        "Visit Quanzhou Maritime Museum, return to Xiamen by private vehicle, then follow the Xiamen University and seaside-promenade route before the final Xiamen night. Breakfast and lunch are included.",
        "游览泉州海外交通史博物馆后乘私车返回厦门，再游览厦门大学与海滨步道，最后一晚住厦门；当天含早餐与午餐。",
        "취안저우 해외교통사박물관을 본 뒤 전용 차량으로 샤먼에 돌아와 샤먼대학과 해변 산책로를 둘러보고 마지막 밤을 보냅니다. 조식과 중식이 포함됩니다.",
      ),
    ),
    day(
      6,
      l(
        "Depart Xiamen",
        "厦门送机",
        "샤먼 출발",
      ),
      l(
        "Transfer by private vehicle from the Xiamen hotel to the confirmed airport. The pickup time follows the flight schedule.",
        "从厦门酒店乘私车送往已确认的机场，接送时间按航班安排。",
        "샤먼 호텔에서 전용 차량으로 확정된 공항에 이동하며 픽업 시간은 항공편에 맞춥니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five breakfast-included four-star-standard nights based on twin sharing: two in Xiamen and one each in Nanjing, Anxi and Quanzhou. Exact hotels and room types are confirmed in writing; the published single supplement is USD 380.",
    "共 5 晚 4 星标准含早，默认双人同住：厦门 2 晚，南靖、安溪、泉州各 1 晚。具体酒店与房型书面确认；公开单房差为 USD 380。",
    "조식 포함 4성급 기준 5박, 2인 1실이며 샤먼 2박, 난징·안시·취안저우 각 1박입니다. 호텔과 객실은 서면 확인하며 공개 1인실 추가금은 USD 380입니다.",
  ),
  serviceNote: l(
    "The published scope includes a private English-speaking guide, private driver and air-conditioned vehicle, airport transfers, all listed admissions, the Gulangyu ferry, Anxi tea visit and tasting, breakfasts and the four lunches named on Days 2–5.",
    "公开范围包含私人英语导游、私人司机与空调车辆、机场接送、所列全部门票、鼓浪屿船票、安溪茶园与品茶、每日早餐，以及第 2—5 天共 4 顿午餐。",
    "공개 범위에는 영어 전용 가이드, 전용 기사와 차량, 공항 이동, 명시된 모든 입장권, 구랑위 배편, 안시 차밭과 시음, 매일 조식 및 2~5일 차 중식 4회가 포함됩니다.",
  ),
  exclusions: commonExclusions(
    [
      "Unlisted tulou interiors and optional experiences",
      "Meals not named in the final itinerary",
    ],
    ["未列明的土楼内部与自选体验", "最终行程未列明的餐食"],
    ["미기재 토루 내부와 선택 체험", "최종 일정에 적히지 않은 식사"],
  ),
  bookingNote: pricingBookingNote(
    "The published USD 1,499 per-person reference uses double occupancy. The exact total for any group size is confirmed before payment; the single-room supplement is separate.",
    "页面所示 USD 1,499/人以双人同住为基础。任何人数的准确总价须在付款前确认，单房差另计。",
    "표시된 1인 USD 1,499는 2인 1실 기준입니다. 인원별 정확한 총액은 결제 전에 확인하며 1인실 추가금은 별도입니다.",
  ),
  heroImage: image(
    fujianSlug,
    "hero.webp",
    1600,
    1060,
    l(
      "Gulangyu waterfront in Xiamen",
      "厦门鼓浪屿滨水景观",
      "샤먼 구랑위 해안 풍경",
    ),
    l(
      "The island day uses a reserved ferry and walking route.",
      "鼓浪屿游览使用预约船票与步行路线。",
      "섬 일정은 예약 배편과 도보 동선을 이용합니다.",
    ),
  ),
  gallery: [
    image(
      fujianSlug,
      "gallery-1.webp",
      1600,
      1200,
      l(
        "Tianluokeng Tulou Cluster in Nanjing County",
        "南靖田螺坑土楼群",
        "난징현 톈뤄컹 토루 군락",
      ),
      l(
        "The route combines Yongding's Chengqi Lou area with Nanjing's Tianluokeng cluster without promising entry inside every building.",
        "路线串联永定承启楼一带与南靖田螺坑土楼群，但不承诺每座建筑都可入内。",
        "융딩 청치러우 일대와 난징 톈뤄컹 토루 군락을 잇되 모든 건물 내부 입장을 보장하지 않습니다.",
      ),
    ),
  ],
  routeMedia: [
    routeMedia(
      4,
      l("Quanzhou Kaiyuan Temple", "泉州开元寺", "취안저우 개원사"),
      image(
        fujianSlug,
        "route-day-2.webp",
        1600,
        1067,
        l(
          "Twin pagodas at Kaiyuan Temple in Quanzhou",
          "泉州开元寺双塔",
          "취안저우 개원사 쌍탑",
        ),
        l(
          "Quanzhou's old city and maritime heritage form the fourth day before the return to Xiamen.",
          "第 4 天集中游览泉州古城与海丝文化，再于次日返回厦门。",
          "4일 차에 취안저우 고성과 해상 문화유산을 본 뒤 다음 날 샤먼으로 돌아갑니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 9743, usdPerPerson: 1499, publishedPrice: { currency: "USD", amountPerPerson: 1499 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const chaoshanSlug = "chaozhou-shantou-nanao-5-day-private-tour";
const chaoshan: PrivateTourProduct = {
  id: "private-tour-shantou-nanao-chaozhou-5d4n",
  slug: chaoshanSlug,
  days: 5,
  nights: 4,
  servicePolicy,
  title: l(
    "Shantou, Nan'ao & Chaozhou: 5-Day Private Tour",
    "汕头·南澳·潮州 5 天 4 晚私家团",
    "산터우·난아오·차오저우 5일 프라이빗 투어",
  ),
  eyebrow: l(
    "Coast, arcade streets and food chosen locally",
    "海岛、骑楼街区与自由选择的潮汕味道",
    "섬 해안, 기루 거리와 현지에서 고르는 차오산 음식",
  ),
  lede: l(
    "Stay one night on Nan'ao and one in Chaozhou, with private road transport and local guidance for food choices while meal costs remain separate.",
    "南澳与潮州各住一晚，以私车串联海岸、古城与开埠街区；向导协助选餐，但餐费由客人自理。",
    "난아오와 차오저우에서 각각 1박하며 전용 차량으로 해안, 고성과 개항 거리를 잇습니다. 가이드가 식당 선택을 돕지만 식비는 별도입니다.",
  ),
  summary: l(
    "Four Ctrip 4-Diamond-standard nights with breakfast, one private vehicle per booking, the listed tickets and experiences, bottled water and basic China-based travel accident insurance.",
    "共 4 晚携程 4 钻标准含早，一单一车，并包含所列门票与体验、瓶装水及中国境内基础旅游意外险。",
    "중국 씨트립 4다이아 기준 조식 포함 4박, 예약당 전용 차량 한 대, 명시된 입장권과 체험, 생수 및 중국 내 기본 여행상해보험이 포함됩니다.",
  ),
  metadataDescription: l(
    "5-day Shantou, Nan'ao and Chaozhou private tour from USD 280 per person for groups of 4+, with 4-Diamond stays, private vehicle and admissions.",
    "汕头、南澳与潮州 5 天私家团，4 人及以上 USD 280/人起，含 4 钻住宿、专车与所列门票。",
    "산터우·난아오·차오저우 5일 프라이빗 투어. 4명 이상 1인 USD 280부터, 4다이아 숙박·전용 차량·입장권 포함.",
  ),
  highlights: lists(
    [
      "Nan'ao coast and island stay",
      "Chaozhou Old City and Guangji Bridge area",
      "One confirmed Chaoshan cultural activity",
      "Shantou's historic port district",
    ],
    [
      "南澳海岸与岛上住宿",
      "潮州古城与广济桥周边",
      "一项已确认的潮汕文化体验",
      "汕头开埠街区",
    ],
    [
      "난아오 해안과 섬 숙박",
      "차오저우 고성과 광지교 일대",
      "확정된 차오산 문화 체험 한 가지",
      "산터우 개항 역사 지구",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Shantou", "抵达汕头", "산터우 도착"),
      l(
        "Meet the driver at the confirmed station or airport and transfer to the Shantou hotel. No fixed sightseeing is planned.",
        "在已确认的车站或机场接站，私车送往汕头酒店；当天不安排固定游览。",
        "확정된 역 또는 공항에서 만나 산터우 호텔로 이동하며 고정 관광은 없습니다.",
      ),
    ),
    day(
      2,
      l("Nan'ao coast", "南澳海岸", "난아오 해안"),
      l(
        "Cross Nan'ao Bridge for Changshanwei Lighthouse, Qing'ao Bay, the Tropic of Cancer gate and the listed fish-raft experience, then stay in the confirmed Nan'ao sea-view room. Sea access depends on weather and permission.",
        "经南澳大桥前往长山尾灯塔、青澳湾与北回归线自然之门，参加所列鱼排体验，并入住已确认的南澳海景房；出海受天气与运营许可影响。",
        "난아오대교를 건너 창산웨이 등대, 칭아오만과 북회귀선 자연의 문을 보고 명시된 양식장 체험 후 확정된 난아오 바다 전망 객실에 숙박합니다. 출항은 날씨와 허가에 따릅니다.",
      ),
    ),
    day(
      3,
      l("Chaozhou Old City", "潮州古城", "차오저우 고성"),
      l(
        "Explore Paifang Street, Jiadi Lane, Guangji Bridge, Kaiyuan Temple, Hanwen Temple and the Thai Buddhist Temple, then join the confirmed kung-fu tea or cultural performance arrangement and stay in Chaozhou.",
        "游牌坊街、甲第巷、广济桥、开元寺、韩文公祠与泰佛殿，再参加确认的工夫茶或文化表演安排，当晚住潮州。",
        "패방가, 자디샹, 광지교, 개원사, 한원공사와 태불전을 둘러보고 확정된 공부차 또는 문화 공연 일정을 진행한 뒤 차오저우에 숙박합니다.",
      ),
    ),
    day(
      4,
      l(
        "Longhu, Shantou heritage and the island ferry",
        "龙湖古寨、汕头历史与妈屿轮渡",
        "룽후·산터우 유산·마위섬 페리",
      ),
      l(
        "Visit Longhu Ancient Village, Shipaotai Park and Shantou's Small Park arcade district, then continue to Ma Yu Island and the public-square ferry before returning to Shantou.",
        "游龙湖古寨、石炮台公园与汕头小公园骑楼街区，再前往妈屿岛并体验广场轮渡，最后返回汕头住宿。",
        "룽후 고촌, 스파오타이공원과 산터우 소공원 기루 거리를 본 뒤 마위섬과 광장 페리를 거쳐 산터우로 돌아옵니다.",
      ),
    ),
    day(
      5,
      l("Free food time and departure", "自由觅食与送站", "자유 식사 후 출발"),
      l(
        "Keep time for an independently paid breakfast or snack stop, with local suggestions if service hours allow, then transfer to the confirmed departure point.",
        "保留自由觅食时间；如服务时段允许，向导可提供本地建议，餐费自理。随后送往已确认的离境地点。",
        "자비로 즐기는 아침 또는 간식 시간을 두고 서비스 시간이 허용하면 현지 추천을 받은 뒤 확정된 출발 지점으로 이동합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four breakfast-included Ctrip 4-Diamond-standard nights based on twin sharing, including one on Nan'ao and one in Chaozhou. The exact hotel, room type, single supplement and whether a Nan'ao room has a direct sea view are confirmed in writing.",
    "共 4 晚携程 4 钻标准含早，默认双人同住，其中南澳 1 晚、潮州 1 晚。具体酒店、房型、单房差及南澳房间是否为正面海景须书面确认。",
    "조식 포함 중국 씨트립 4다이아 기준 4박, 2인 1실이며 난아오 1박과 차오저우 1박을 포함합니다. 정확한 호텔, 객실 유형, 1인실 추가금과 난아오 정면 바다 전망 여부는 서면 확인합니다.",
  ),
  serviceNote: l(
    "The published scope includes one private vehicle with bridge tolls and parking, airport or station transfers, the listed admissions and fish-raft or cultural experiences, daily bottled water and basic China-based travel accident insurance. The quote separately states guide language, service days and vehicle class.",
    "公开范围包含一单一车及路桥停车费、机场或车站接送、所列门票与鱼排或文化体验、每日瓶装水及中国境内基础旅游意外险；报价另行写明导游语言、服务日与车型。",
    "공개 범위에는 전용 차량 한 대와 통행료·주차, 공항·역 이동, 명시된 입장권과 양식장 또는 문화 체험, 생수 및 중국 내 기본 여행상해보험이 포함됩니다. 견적에는 가이드 언어, 서비스일과 차량을 별도로 명시합니다.",
  ),
  exclusions: commonExclusions(
    [
      "All food purchases and restaurant bills",
      "Unconfirmed boat, fish-raft or performance activities",
    ],
    ["全部餐饮采购与餐厅账单", "未确认的出海、鱼排或演出活动"],
    ["모든 음식 구매와 식당 비용", "미확정 출항·양식장·공연 체험"],
  ),
  bookingNote: pricingBookingNote(
    "The published starting price is USD 420 per person for groups under four and USD 280 per person for groups of four or more. The 6-traveller selector uses that same public 4+ bracket; the exact total still depends on rooms and vehicle class.",
    "页面所示起价为 4 人以下 USD 420/人、4 人及以上 USD 280/人。6 人选项沿用同一公开 4+ 档，准确总价仍按房间数与车型确认。",
    "공개 시작가는 4명 미만 1인 USD 420, 4명 이상 1인 USD 280입니다. 6명 선택은 같은 4명 이상 공개 구간을 사용하며 정확한 총액은 객실 수와 차량에 따라 확정합니다.",
  ),
  heroImage: image(
    chaoshanSlug,
    "hero.webp",
    1600,
    1221,
    l("Guangji Bridge in Chaozhou", "潮州广济桥", "차오저우 광지교"),
    l(
      "The confirmation states whether bridge admission or an exterior view is included.",
      "确认单明确包含登桥票还是外观游览。",
      "확인서에 다리 입장 또는 외관 관람 여부를 명시합니다.",
    ),
  ),
  gallery: [
    image(
      chaoshanSlug,
      "gallery-1.webp",
      1600,
      1066,
      l(
        "Nan'ao coastline, lighthouse and bridge",
        "南澳海岸、灯塔与跨海大桥",
        "난아오 해안, 등대와 해상대교",
      ),
      l(
        "The island day depends on weather and safe operating conditions.",
        "岛上游览受天气与安全运营条件影响。",
        "섬 일정은 날씨와 안전 운영 조건의 영향을 받습니다.",
      ),
    ),
    image(
      chaoshanSlug,
      "gallery-2.webp",
      1600,
      1066,
      l(
        "Paifang Street in Chaozhou Old City",
        "潮州古城牌坊街",
        "차오저우 고성 패방가",
      ),
      l(
        "The Chaozhou day combines the old city with one confirmed cultural activity.",
        "潮州一日把古城与一项已确认的文化体验结合。",
        "차오저우 일정은 고성과 확정된 문화 체험 한 가지를 결합합니다.",
      ),
    ),
  ],
  routeMedia: [
    routeMedia(
      4,
      l("Historic Shantou", "汕头开埠街区", "옛 산터우"),
      image(
        chaoshanSlug,
        "route-day-3.webp",
        1600,
        765,
        l(
          "Historic arcade streets in central Shantou",
          "汕头开埠区骑楼街景",
          "산터우 개항 지구 기루 거리",
        ),
        l(
          "The final full day returns to Shantou's historic port district.",
          "最后一个完整游览日回到汕头开埠街区。",
          "마지막 종일 일정은 산터우의 역사적 항구 지구로 돌아옵니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 2730, usdPerPerson: 420, publishedPrice: { currency: "USD", amountPerPerson: 420 } },
      { travelers: 4, cnyPerPerson: 1820, usdPerPerson: 280, publishedPrice: { currency: "USD", amountPerPerson: 280 } },
      { travelers: 6, cnyPerPerson: 1820, usdPerPerson: 280, publishedPrice: { currency: "USD", amountPerPerson: 280 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const chengduChongqingSlug = "chengdu-chongqing-8-day-private-tour";
const chengduChongqing: PrivateTourProduct = {
  id: "private-tour-chengdu-leshan-chongqing-wulong-8d7n",
  slug: chengduChongqingSlug,
  days: 8,
  nights: 7,
  servicePolicy,
  title: l(
    "Chengdu, Leshan, Chongqing, Wulong & Dazu: 8-Day Private Tour",
    "成都·乐山·重庆·武隆·大足 8 天 7 晚私家团",
    "청두·러산·충칭·우룽·대족 8일 프라이빗 투어",
  ),
  eyebrow: l(
    "Two cities, Leshan, Wulong karst and Dazu carvings",
    "双城、乐山、武隆喀斯特与大足石刻",
    "두 도시, 러산, 우룽 카르스트와 대족석각",
  ),
  lede: l(
    "Move from Chengdu to Chongqing by high-speed rail, with a focused Leshan day, an overnight Wulong section and a final day trip to Dazu Rock Carvings.",
    "从成都乘高铁前往重庆，安排乐山重点一日、武隆住宿段，并以大足石刻一日完成西南文化主线。",
    "청두에서 고속열차로 충칭에 이동해 러산 하루, 우룽 숙박 일정과 대족석각 당일 여행을 이어갑니다.",
  ),
  summary: l(
    "Eight-day Chengdu, Leshan, Chongqing and Wulong private tour with seven breakfast-included nights, local transport, train and guided sightseeing.",
    "共 7 晚 4 星标准含早，安排各地私车、已确认的成都—重庆二等座高铁与四地重点导游游览。",
    "조식 포함 4성급 기준 7박, 지역 전용 차량, 확정된 청두-충칭 2등석 열차와 네 지역 가이드 관광으로 구성됩니다.",
  ),
  highlights: lists(
    [
      "Chengdu Panda Base",
      "A focused Leshan day",
      "Chongqing night cityscape",
      "Wulong Three Natural Bridges and Dazu Rock Carvings",
    ],
    ["成都大熊猫基地", "乐山重点一日", "重庆城市夜景", "武隆天生三桥与大足石刻"],
    ["청두 판다기지", "러산 집중 일정", "충칭 야경", "우룽 천생삼교와 대족석각"],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Chengdu", "抵达成都", "청두 도착"),
      l(
        "Meet the driver at the confirmed airport or station and transfer to the Chengdu hotel; no fixed sightseeing is planned.",
        "在已确认的成都机场或车站接站，私车送往酒店；当天不安排固定游览。",
        "확정된 청두 공항 또는 역에서 만나 호텔로 이동하며 고정 관광은 없습니다.",
      ),
    ),
    day(
      2,
      l("Pandas and Chengdu life", "熊猫与成都生活", "판다와 청두의 일상"),
      l(
        "Visit Chengdu Panda Base early, then continue with one confirmed city-life experience. A specific panda or level of activity cannot be guaranteed.",
        "早场游览成都大熊猫基地，再安排一项已确认的城市生活体验；不承诺特定熊猫或固定活跃状态。",
        "이른 시간 판다기지를 방문한 뒤 확정된 생활 문화 체험 한 가지를 진행합니다. 특정 판다나 활동 수준은 보장할 수 없습니다.",
      ),
    ),
    day(
      3,
      l("Leshan day trip", "乐山一日", "러산 당일 여행"),
      l(
        "Travel by private vehicle to Leshan and follow the confirmed land route or boat-view plan. Combining both is not promised; river and path access depend on operating conditions.",
        "乘私车前往乐山，按确认方案选择登山游线或游船观佛；不承诺两种方式同时完成，水路与步道受运营情况影响。",
        "전용 차량으로 러산에 가서 확정된 육로 또는 유람선 관람 방식을 따릅니다. 두 방식을 모두 진행한다고 보장하지 않으며 수로와 길은 운영 상황에 따라 달라집니다.",
      ),
    ),
    day(
      4,
      l("Train to Chongqing", "高铁前往重庆", "열차로 충칭 이동"),
      l(
        "Take the confirmed second-class high-speed train to Chongqing with station transfers. After check-in, see a selected night cityscape if timing and local conditions allow.",
        "乘已确认的二等座高铁前往重庆，两端接送按订单安排。入住后如时间与现场条件允许，游览一处重点夜景。",
        "확정된 2등석 고속열차와 양쪽 역 이동으로 충칭에 갑니다. 체크인 후 시간과 현지 상황이 허용하면 대표 야경 한 곳을 봅니다.",
      ),
    ),
    day(
      5,
      l("Three Natural Bridges", "武隆天生三桥", "우룽 천생삼교"),
      l(
        "Travel to Wulong and visit Three Natural Bridges using the operating scenic transport and lifts named in the confirmation. Stay in Wulong.",
        "前往武隆，使用确认单列明且当天运行的景区车与电梯游览天生三桥，当晚住武隆。",
        "우룽으로 이동해 확인서에 명시되고 당일 운영하는 관광지 차량과 엘리베이터를 이용해 천생삼교를 둘러보고 우룽에서 숙박합니다.",
      ),
    ),
    day(
      6,
      l(
        "A lighter Wulong morning",
        "武隆轻量游与返回重庆",
        "가벼운 우룽 일정 후 충칭 귀환",
      ),
      l(
        "Choose one light Wulong activity confirmed for the season, then return to Chongqing by private vehicle. The day avoids stacking another major attraction without sufficient time.",
        "按季节选择一项已确认的武隆轻量活动，再乘私车返回重庆；不在时间不足时叠加另一处大型景区。",
        "계절에 맞춰 확정된 가벼운 우룽 체험 한 가지를 진행한 뒤 전용 차량으로 충칭에 돌아갑니다. 시간이 부족한 상태에서 대형 관광지를 더하지 않습니다.",
      ),
    ),
    day(
      7,
      l(
        "Dazu Rock Carvings day trip",
        "大足石刻一日",
        "대족석각 당일 여행",
      ),
      l(
        "Travel by private vehicle from Chongqing to the confirmed Dazu Rock Carvings sites, visit with the English-speaking guide and return to the Chongqing hotel the same day.",
        "从重庆乘私车前往已确认的大足石刻景区，由英语导游带领游览，当天返回重庆酒店。",
        "충칭에서 전용 차량으로 확정된 대족석각 관광지에 가서 영어 가이드와 관람한 뒤 당일 충칭 호텔로 돌아옵니다.",
      ),
    ),
    day(
      8,
      l("Depart Chongqing", "重庆送站", "충칭 출발"),
      l(
        "Transfer by private vehicle to the confirmed Chongqing airport or railway station; no fixed sightseeing is planned.",
        "乘私车送往已确认的重庆机场或车站；当天不安排固定游览。",
        "전용 차량으로 확정된 충칭 공항 또는 역에 이동하며 고정 관광은 없습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Seven breakfast-included four-star-standard nights based on twin sharing, including the confirmed Wulong location. Exact hotels, taxes, room type and single supplement are confirmed in writing.",
    "共 7 晚 4 星标准含早，默认双人同住，并写明武隆住宿位置。具体酒店、税费、房型与单房差须书面确认。",
    "조식 포함 4성급 기준 7박, 2인 1실이며 우룽 숙박 위치를 명시합니다. 호텔, 세금, 객실 유형과 1인실 추가금은 서면 확인합니다.",
  ),
  serviceNote: l(
    "The published scope includes private transport, twin-share four-star-standard hotels with breakfast and tax, the listed admissions and scenic transfers, second-class Chengdu–Chongqing rail, private English-speaking guide service, basic China-based travel and health insurance and 24/7 local support. The written confirmation names every paid Wulong and Dazu component.",
    "公开范围包含全程私车、4 星标准双人同住房含早及税费、所列门票与景区接驳、成都—重庆二等座高铁、私人英语导游、中国境内基础旅游与健康保险及 24/7 当地支持；武隆和大足的付费项目逐项写入确认单。",
    "공개 범위에는 전용 교통, 4성급 기준 2인 1실 숙박과 조식·세금, 명시된 입장권과 관광지 이동, 청두-충칭 2등석 열차, 영어 전용 가이드, 중국 내 기본 여행·건강보험 및 24시간 현지 지원이 포함됩니다. 우룽과 대족의 유료 항목은 확인서에 명시합니다.",
  ),
  exclusions: commonExclusions(
    [
      "Unlisted Wulong attractions and Chongqing paid activities",
    ],
    ["未列明的武隆景点与重庆付费活动"],
    ["미기재 우룽 관광지와 충칭 유료 체험"],
  ),
  bookingNote: pricingBookingNote(
    "The published USD 1,520 starting price applies to 2 travellers; the single-room supplement and other group sizes require a separate quote.",
    "页面所示 USD 1,520/人起价适用于 2 人同行；单房差与其他人数需单独询价。",
    "표시된 1인 USD 1,520 시작가는 2명 기준이며 1인실 추가금과 다른 인원은 별도 견적입니다.",
  ),
  heroImage: image(
    chengduChongqingSlug,
    "hero.webp",
    1600,
    900,
    l(
      "Hongya Cave and the Chongqing riverfront at night",
      "洪崖洞与重庆滨江夜景",
      "훙야둥과 충칭 강변 야경",
    ),
    l(
      "The selected night view follows arrival time, local access and crowd conditions.",
      "具体夜景点按抵达时间、现场开放与客流情况调整。",
      "야경 장소는 도착 시간, 현장 접근과 혼잡 상황에 따라 조정합니다.",
    ),
  ),
  gallery: [
    image(
      chengduChongqingSlug,
      "gallery-1.webp",
      1600,
      1200,
      l(
        "Giant panda at Chengdu Panda Base",
        "成都大熊猫基地内的大熊猫",
        "청두 판다기지의 자이언트판다",
      ),
      l(
        "The route begins in Chengdu; animal activity is not guaranteed.",
        "路线从成都开始；不承诺熊猫的固定活跃状态。",
        "여정은 청두에서 시작하며 판다 활동은 보장되지 않습니다.",
      ),
    ),
    image(
      chengduChongqingSlug,
      "gallery-2.webp",
      1600,
      1200,
      l("Leshan Giant Buddha", "乐山大佛", "러산대불"),
      l(
        "The final plan confirms a land visit or boat view without promising both.",
        "最终方案确认登山或游船其中一种，不承诺两者同时完成。",
        "최종 계획은 육로 또는 유람선 중 하나를 확정하며 둘 다 보장하지 않습니다.",
      ),
    ),
  ],
  routeMedia: [
    routeMedia(
      5,
      l("Three Natural Bridges", "武隆天生三桥", "우룽 천생삼교"),
      image(
        chengduChongqingSlug,
        "route-day-3.webp",
        1600,
        1200,
        l(
          "Three Natural Bridges in Wulong",
          "武隆天生三桥景区",
          "우룽 천생삼교",
        ),
        l(
          "Open paths, lifts and scenic transport are checked for the travel date.",
          "步道、电梯与景区车按出行日期核对开放情况。",
          "여행일에 길, 엘리베이터와 관광지 차량 운영을 확인합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([{ travelers: 2, cnyPerPerson: 9880, usdPerPerson: 1520, publishedPrice: { currency: "USD", amountPerPerson: 1520 } }]),
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const guangzhouSlug = "guangzhou-shunde-foshan-5-day-private-tour";
const guangzhou: PrivateTourProduct = {
  id: "private-tour-guangzhou-shunde-foshan-5d4n",
  slug: guangzhouSlug,
  days: 5,
  nights: 4,
  servicePolicy,
  title: l(
    "Guangzhou, Shunde & Foshan: 5-Day Private Tour",
    "广州·顺德·佛山 5 天 4 晚私家团",
    "광저우·순더·포산 5일 프라이빗 투어",
  ),
  eyebrow: l(
    "One Guangzhou hotel, two easy day trips",
    "广州同一酒店连住，轻松完成两次日游",
    "광저우 한 호텔에 머물며 떠나는 두 번의 당일 여행",
  ),
  lede: l(
    "Stay in one Guangzhou hotel while exploring the city's old and new quarters, choosing food freely in Shunde and seeing Foshan's martial and craft traditions.",
    "4 晚连住广州同一家酒店，游览城市新旧街区，在顺德自由选餐，再到佛山看武术、醒狮与岭南手艺。",
    "광저우 한 호텔에서 4박하며 신구 도심, 순더의 자유 식사와 포산의 무술·사자춤·링난 공예를 경험합니다.",
  ),
  summary: l(
    "Four breakfast-included nights in one Guangzhou hotel, with private arrival and departure transfers plus road day trips to Shunde and Foshan.",
    "广州同一家酒店 4 晚含早，含抵达与离开接送，以及顺德、佛山的私车日游。",
    "광저우 한 호텔에서 조식 포함 4박, 도착·출발 이동과 순더·포산 전용 차량 당일 여행으로 구성됩니다.",
  ),
  highlights: lists(
    [
      "Old and new Guangzhou",
      "Shunde garden and food streets",
      "Foshan Ancestral Temple",
      "Lion-dance, martial or craft culture as confirmed",
    ],
    [
      "广州新旧城区",
      "顺德园林与美食街区",
      "佛山祖庙",
      "按确认安排醒狮、武术或手工业文化",
    ],
    [
      "광저우 신구 도심",
      "순더 정원과 음식 거리",
      "포산조묘",
      "확정된 사자춤·무술·공예 문화",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Guangzhou", "抵达广州", "광저우 도착"),
      l(
        "Meet the driver at the confirmed airport or station and transfer to the Guangzhou hotel. No fixed sightseeing is planned.",
        "在已确认的广州机场或车站接站，私车送往酒店；当天不安排固定游览。",
        "확정된 광저우 공항 또는 역에서 만나 호텔로 이동하며 고정 관광은 없습니다.",
      ),
    ),
    day(
      2,
      l(
        "Huacheng Square, old Guangzhou and local streets",
        "花城广场、海心桥与广州老街",
        "화청광장, 하이신교와 광저우 옛 거리",
      ),
      l(
        "See Huacheng Square, cross Haixin Bridge and view Canton Tower from outside, then continue through Yongqingfang and Shangxiajiu. Canton Tower admission is not included.",
        "游览花城广场、步行海心桥并从外部看广州塔，再前往永庆坊与上下九。广州塔登塔不包含在内。",
        "화청광장과 하이신교를 걷고 광저우타워 외관을 본 뒤 융칭팡과 상샤주를 둘러봅니다. 광저우타워 입장은 포함되지 않습니다.",
      ),
    ),
    day(
      3,
      l(
        "Shunde gardens and food streets",
        "顺德园林、街区与自由餐饮",
        "순더 정원과 자유 식사",
      ),
      l(
        "Visit Qinghui Garden, Happy Coast and Huagai Road. Local dishes are chosen and paid for independently; the confirmed guide or driver-guide can help with recommendations and ordering.",
        "游览清晖园、欢乐海岸与华盖路。当地餐食由客人自由选择并自付；已确认的向导或司机兼向导可协助推荐与点菜。",
        "청회원, 해피코스트와 화가이루를 둘러봅니다. 현지 음식은 자유롭게 선택해 자비로 결제하며 확정된 가이드 또는 기사 겸 가이드가 추천과 주문을 도울 수 있습니다.",
      ),
    ),
    day(
      4,
      l(
        "Foshan martial and craft culture",
        "佛山武术、醒狮与岭南手艺",
        "포산 무술, 사자춤과 링난 공예",
      ),
      l(
        "Visit Foshan Ancestral Temple for the confirmed lion-dance or martial-arts performance, walk Lingnan Tiandi and continue to Nanfeng Ancient Kiln. Performance times remain subject to the day's schedule.",
        "游览佛山祖庙并观看已确认的醒狮或武术表演，步行岭南天地，再前往南风古灶。演出时段以当天安排为准。",
        "포산조묘에서 확정된 사자춤 또는 무술 공연을 보고 링난톈디를 걸은 뒤 남풍고조를 방문합니다. 공연 시간은 당일 일정에 따라 달라질 수 있습니다.",
      ),
    ),
    day(
      5,
      l(
        "Shamian, Beijing Road and departure",
        "沙面、北京路与送站",
        "사몐, 베이징루와 출발",
      ),
      l(
        "Visit Shamian and Beijing Road before transferring to the confirmed airport or station. The order or time spent at each stop may be shortened for an early departure.",
        "游览沙面与北京路后，送往已确认的机场或车站。如离境时间较早，两处顺序或停留时间会相应调整。",
        "사몐과 베이징루를 둘러본 뒤 확정된 공항 또는 역으로 이동합니다. 출발이 이른 경우 순서나 체류 시간을 조정합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four breakfast-included nights in the same Ctrip 4-Diamond-standard Guangzhou hotel, based on twin sharing. Exact hotel, location, room type and single supplement are confirmed before payment.",
    "广州同一家携程 4 钻标准酒店连住 4 晚含早，默认双人同住。具体酒店、位置、房型与单房差在付款前确认。",
    "광저우의 같은 중국 씨트립 4다이아 기준 호텔에서 조식 포함 4박, 2인 1실입니다. 호텔, 위치, 객실 유형과 1인실 추가금은 결제 전 확인합니다.",
  ),
  serviceNote: l(
    "The published package includes one private vehicle, airport transfers, four breakfast-included nights in the same Guangzhou hotel, Qinghui Garden, Foshan Ancestral Temple, Nanfeng Ancient Kiln, the confirmed lion-dance performance, bottled water and basic local travel accident insurance. Guide language and service days are confirmed separately; lunch and dinner are not included.",
    "公开套餐包含一辆专属用车、机场接送、广州同一家酒店 4 晚含早、清晖园、佛山祖庙、南风古灶、已确认的醒狮表演、瓶装水与当地基础旅游意外险。导游语言与服务日另行确认；午晚餐不包含。",
    "공개 패키지에는 전용 차량 1대, 공항 이동, 광저우 한 호텔 조식 포함 4박, 청회원·포산조묘·남풍고조, 확정된 사자춤 공연, 생수와 현지 기본 여행 상해보험이 포함됩니다. 가이드 언어와 서비스일은 별도 확인하며 중식과 석식은 포함되지 않습니다.",
  ),
  exclusions: commonExclusions(
    [
      "All restaurant bills and food purchases",
      "Canton Tower admission and Pearl River cruise unless named",
    ],
    ["全部餐厅账单与食物采购", "未列明的广州塔登塔与珠江夜游"],
    ["모든 식당 비용과 음식 구매", "미기재 광저우타워 입장과 주강 유람선"],
  ),
  bookingNote: pricingBookingNote(
    "The published starting price is USD 630 per person for groups under 4 and USD 490 per person for groups of 4 or more. The 6-traveller selector uses the same public 4+ bracket rather than a separate 6-person price; rooming and vehicle class are reconfirmed.",
    "页面所示起价为 4 人以下 USD 630/人，4 人及以上 USD 490/人。6 人选项沿用公开的“4 人及以上”档，并非独立的 6 人定价；房间与车型仍须重新确认。",
    "표시된 시작가는 4명 미만 1인 USD 630, 4명 이상 1인 USD 490입니다. 6명 선택은 별도 6인 가격이 아니라 공개된 4명 이상 구간을 사용하며 객실과 차량 등급을 다시 확인합니다.",
  ),
  heroImage: image(
    guangzhouSlug,
    "hero.webp",
    1589,
    1600,
    l(
      "Canton Tower and the Pearl River at night",
      "夜色中的广州塔与珠江",
      "밤의 광저우타워와 주강",
    ),
    l(
      "The skyline identifies Guangzhou; tower admission is separate unless confirmed.",
      "城市天际线用于识别广州；登塔仅在确认后包含。",
      "스카이라인은 광저우를 보여 주며 타워 입장은 확인된 경우에만 포함됩니다.",
    ),
    "50% 45%",
  ),
  gallery: [
    image(
      guangzhouSlug,
      "gallery-1.webp",
      1600,
      900,
      l("Chen Clan Ancestral Hall in Guangzhou", "广州陈家祠", "광저우 진가사"),
      l(
        "The Guangzhou day links selected historic architecture with the modern city.",
        "广州一日把精选历史建筑与现代城市串联起来。",
        "광저우 일정은 선별한 역사 건축과 현대 도시를 잇습니다.",
      ),
    ),
    image(
      guangzhouSlug,
      "gallery-2.webp",
      1600,
      1200,
      l("Qinghui Garden in Shunde", "顺德清晖园", "순더 청회원"),
      l(
        "The Shunde day pairs the garden with flexible food choices.",
        "顺德一日把园林与自由选餐结合。",
        "순더 일정은 정원과 자유로운 음식 선택을 결합합니다.",
      ),
    ),
  ],
  routeMedia: [
    routeMedia(
      4,
      l("Foshan Ancestral Temple", "佛山祖庙", "포산조묘"),
      image(
        guangzhouSlug,
        "route-day-3.webp",
        1600,
        1200,
        l("Foshan Ancestral Temple", "佛山祖庙", "포산조묘"),
        l(
          "The Foshan day confirms the exact performance and craft stop in advance.",
          "佛山一日提前确认具体演出与手工业点。",
          "포산 일정은 공연과 공예 장소를 미리 확정합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 4095, usdPerPerson: 630, publishedPrice: { currency: "USD", amountPerPerson: 630 } },
      { travelers: 4, cnyPerPerson: 3185, usdPerPerson: 490, publishedPrice: { currency: "USD", amountPerPerson: 490 } },
      { travelers: 6, cnyPerPerson: 3185, usdPerPerson: 490, publishedPrice: { currency: "USD", amountPerPerson: 490 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const huangshanSlug = "huangshan-hongcun-huizhou-5-day-private-tour";
const huangshan: PrivateTourProduct = {
  id: "private-tour-huangshan-hongcun-huizhou-5d4n",
  slug: huangshanSlug,
  days: 5,
  nights: 4,
  servicePolicy,
  title: l(
    "Huangshan, Hongcun & Huizhou: 5-Day Private Tour",
    "黄山·宏村·徽州 5 天 4 晚私家团",
    "황산·홍춘·후이저우 5일 프라이빗 투어",
  ),
  eyebrow: l(
    "One night on the mountain, then slower village time",
    "山上住一晚，再把古村看慢一点",
    "산 위 1박 후 고촌을 천천히",
  ),
  lede: l(
    "Stay one night on Huangshan, descend to Hongcun, then continue through Xidi, Nanping, Guanlu, Tangmo, Chengkan and the Tangyue archways on a private five-day route.",
    "黄山山上住一晚，下山后游宏村，再以私家路线串联西递、南屏、关麓、唐模、呈坎与棠樾牌坊群。",
    "황산 산 위에서 1박한 뒤 홍춘으로 내려와 서제, 난핑, 관루, 탕모, 정감과 탕웨 패방군을 잇는 5일 전용 일정입니다.",
  ),
  summary: l(
    "Four breakfast-included nights below Huangshan, on the mountain, in Hongcun and in Tangmo, with a private English-speaking guide, private vehicle, listed admissions and lunch on Days 2–5.",
    "共 4 晚含早：黄山山下、山上、宏村与唐模各 1 晚；包含英语导游、专属用车、所列门票及第 2—5 天午餐。",
    "조식 포함 4박으로 황산 아래, 산 위, 홍춘과 탕모에서 각 1박하며 영어 가이드, 전용 차량, 명시된 입장권과 2~5일 차 중식이 포함됩니다.",
  ),
  metadataDescription: l(
    "5-day Huangshan, Hongcun and Huizhou private tour from USD 769 per person for 4 travellers, with English guide, private vehicle, admissions and four lunches.",
    "黄山、宏村与徽州 5 天私家团，4 人 USD 769/人起，含英语导游、专车、门票与 4 顿午餐。",
    "황산·홍춘·후이저우 5일 프라이빗 투어. 4명 기준 1인 USD 769부터, 영어 가이드·전용 차량·입장권·중식 4회 포함.",
  ),
  highlights: lists(
    [
      "One night on Huangshan",
      "Cableway-assisted mountain route",
      "Hongcun, Xidi and quieter villages",
      "Tangmo, Chengkan and Tangyue archways",
    ],
    [
      "黄山山上住宿一晚",
      "索道辅助的山岳路线",
      "宏村、西递与较安静的古村",
      "唐模、呈坎与棠樾牌坊群",
    ],
    [
      "황산 산 위 1박",
      "케이블카를 이용한 산악 동선",
      "홍춘, 서제와 한적한 고촌",
      "탕모, 정감과 탕웨 패방군",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive below Huangshan", "抵达黄山山下", "황산 아래 도착"),
      l(
        "Meet the driver at Huangshan North station or the confirmed airport and transfer to the mountain-foot hotel. A light Tunxi visit is added only when arrival time allows.",
        "在黄山北站或已确认的机场接站，私车送往山下酒店。仅在抵达时间允许时增加屯溪轻量游览。",
        "황산북역 또는 확정된 공항에서 만나 산 아래 호텔로 이동합니다. 도착 시간이 허용할 때만 툰시를 가볍게 둘러봅니다.",
      ),
    ),
    day(
      2,
      l(
        "Cableway up and mountain stay",
        "索道上山与山上住宿",
        "케이블카로 올라 산 위 숙박",
      ),
      l(
        "Use the confirmed scenic bus and uphill cableway, then follow a mountain route matched to walking ability and open paths. Stay at the named mountain hotel.",
        "使用已确认的景区车与上行索道，再按步行能力与开放步道选择山上路线，入住已明确的山上酒店。",
        "확정된 관광지 버스와 상행 케이블카를 이용하고 보행 능력과 개방된 길에 맞춰 산악 동선을 진행한 뒤 지정 산 위 호텔에 숙박합니다.",
      ),
    ),
    day(
      3,
      l(
        "Optional sunrise, descent and Hongcun",
        "日出机会、下山与宏村",
        "일출 기회, 하산과 홍춘",
      ),
      l(
        "Attempt a sunrise viewpoint only if weather, access and personal condition allow, then use the confirmed downhill cableway and continue to Hongcun for a slower afternoon. Sunrise and cloud sea are not guaranteed.",
        "仅在天气、开放与身体情况允许时前往日出观景点，再使用已确认的下行索道，下午慢游宏村。不承诺日出或云海。",
        "날씨, 접근과 몸 상태가 허용할 때만 일출 전망을 시도하고 확정된 하행 케이블카로 내려와 오후에 홍춘을 천천히 둘러봅니다. 일출과 운해는 보장되지 않습니다.",
      ),
    ),
    day(
      4,
      l(
        "Xidi, Nanping and Guanlu, then Tangmo",
        "西递、南屏、关麓与唐模住宿",
        "서제, 난핑, 관루와 탕모 숙박",
      ),
      l(
        "Travel through Xidi, Nanping and Guanlu with the private guide, then continue to Tangmo for the fourth night. The exact walking order is adjusted to opening times and local access.",
        "由私家导游陪同游览西递、南屏与关麓，再前往唐模入住第 4 晚。具体步行顺序会按开放时间与当地通行情况调整。",
        "전용 가이드와 서제, 난핑과 관루를 둘러본 뒤 탕모로 이동해 네 번째 밤을 보냅니다. 보행 순서는 운영 시간과 현지 접근 상황에 맞춰 조정합니다.",
      ),
    ),
    day(
      5,
      l(
        "Tangmo, Chengkan, Tangyue archways and departure",
        "唐模、呈坎、棠樾牌坊群与送站",
        "탕모, 정감, 탕웨 패방군과 출발",
      ),
      l(
        "Continue through Tangmo and Chengkan, then visit the Tangyue Memorial Archways and Bao Garden before the private transfer to Huangshan North station or the confirmed airport.",
        "继续游览唐模与呈坎，再前往棠樾牌坊群和鲍家花园，之后乘私车送往黄山北站或已确认的机场。",
        "탕모와 정감을 둘러보고 탕웨 패방군과 포가화원을 방문한 뒤 전용 차량으로 황산북역 또는 확정된 공항에 이동합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four breakfast-included nights based on twin sharing: one below Huangshan, one at a named mountain hotel, one in Hongcun and one in Tangmo. Hotel grade, room type, mountain luggage handling and single supplement are confirmed in writing.",
    "共 4 晚含早，默认双人同住：黄山山下、明确命名的山上酒店、宏村与唐模各 1 晚。酒店等级、房型、山上行李处理与单房差须书面确认。",
    "조식 포함 4박, 2인 1실 기준으로 황산 아래, 지정 산 위 호텔, 홍춘과 탕모에서 각 1박합니다. 호텔 등급, 객실, 산 위 짐 처리와 1인실 추가금을 서면 확인합니다.",
  ),
  serviceNote: l(
    "The published package includes a private English-speaking guide, private vehicle, all listed admissions, breakfast and lunch on Days 2–5. The confirmation separately identifies scenic buses, uphill and downhill cableways and mountain luggage handling. Cableways reduce climbing but do not remove stairs; seasonal sections may close.",
    "公开套餐包含私家英语导游、专属用车、所列景点门票、酒店早餐及第 2—5 天午餐。景区车、上下行索道与山上行李处理在确认单中逐项列明。索道只能减少爬升，不能消除台阶；季节性区域可能关闭。",
    "공개 패키지에는 영어 전용 가이드, 전용 차량, 명시된 모든 입장권, 조식과 2~5일 차 중식이 포함됩니다. 관광지 버스, 상·하행 케이블카와 산 위 짐 처리는 확인서에 별도로 명시합니다. 케이블카도 계단을 없애지는 않으며 계절 구간은 폐쇄될 수 있습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Porter service and unconfirmed luggage transfer",
      "Dinner and meals not specifically listed",
    ],
    ["未确认的行李搬运与挑夫服务", "晚餐及未明确列出的餐食"],
    ["미확정 짐 운반 서비스", "석식과 미기재 식사"],
  ),
  bookingNote: pricingBookingNote(
    "The published USD 769 per-person starting price is the verified 4-traveller bracket. Other group sizes require a separate quote; exact rooming, travel date and vehicle are reconfirmed before booking.",
    "页面所示 USD 769/人起价是已核实的 4 人档。其他人数需单独询价；预订前仍须重新确认房间、日期与车型。",
    "표시된 1인 USD 769 시작가는 확인된 4명 기준입니다. 다른 인원은 별도 견적이며 예약 전 객실, 날짜와 차량을 다시 확인합니다.",
  ),
  heroImage: image(
    huangshanSlug,
    "hero.webp",
    1920,
    1440,
    l("Granite peaks of Huangshan", "黄山花岗岩峰林", "황산 화강암 봉우리"),
    l(
      "Weather and seasonal access shape the mountain route.",
      "山上路线受天气与季节开放情况影响。",
      "산악 동선은 날씨와 계절별 개방 상태의 영향을 받습니다.",
    ),
  ),
  gallery: [
    image(
      huangshanSlug,
      "gallery-1.webp",
      1487,
      991,
      l(
        "Hongcun village and its water landscape",
        "宏村与村中水景",
        "홍춘 마을과 수경",
      ),
      l(
        "The itinerary leaves a slower afternoon for Hongcun after descending.",
        "下山后为宏村留出一个节奏较慢的下午。",
        "하산 후 홍춘에서 여유로운 오후를 보냅니다.",
      ),
    ),
  ],
  routeMedia: [
    routeMedia(
      2,
      l("Huangshan mountain route", "黄山山上路线", "황산 산악 동선"),
      image(
        huangshanSlug,
        "route-day-2.webp",
        605,
        900,
        l("Greeting Pine on Huangshan", "黄山迎客松", "황산 영객송"),
        l(
          "Specific viewpoints are visited only when the route is open and suitable.",
          "仅在游线开放且适合客人时前往具体观景点。",
          "동선이 열려 있고 여행객에게 적합할 때만 특정 전망지를 방문합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([{ travelers: 4, cnyPerPerson: 4998, usdPerPerson: 769, publishedPrice: { currency: "USD", amountPerPerson: 769 } }]),
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const jiangxiSlug = "jingdezhen-wuyuan-wangxian-6-day-private-tour";
const jiangxi: PrivateTourProduct = {
  id: "private-tour-jingdezhen-wuyuan-wangxian-6d5n",
  slug: jiangxiSlug,
  days: 6,
  nights: 5,
  servicePolicy,
  title: l(
    "Jingdezhen, Wuyuan, Sanqingshan & Wangxian Valley: 6-Day Private Tour",
    "景德镇·婺源·三清山·望仙谷 6 天 5 晚私家团",
    "징더전·우위안·삼청산·왕셴구 6일 프라이빗 투어",
  ),
  eyebrow: l(
    "Make one ceramic piece, then slow down in the villages",
    "真正做一件瓷器，再把村落看慢一点",
    "도자기 한 점을 만들고 마을을 천천히",
  ),
  lede: l(
    "Move from Jingdezhen ceramics to two nights in Wuyuan, spend one day at Sanqingshan and finish in Wangxian Valley for the evening lights.",
    "从景德镇陶瓷文化出发，在婺源连住两晚，再用一天游三清山，最后前往望仙谷看傍晚与亮灯时段。",
    "징더전 도자 문화에서 시작해 우위안에서 2박하고 삼청산을 하루 둘러본 뒤 왕셴구의 저녁 조명으로 마칩니다.",
  ),
  summary: l(
    "Five breakfast-included nights: one in Jingdezhen, two in Wuyuan, one near Sanqingshan and one in or near Wangxian Valley, with a private English-speaking guide and vehicle through to Shangrao.",
    "共 5 晚含早：景德镇 1 晚、婺源 2 晚、三清山周边 1 晚、望仙谷内或附近 1 晚；英语导游与专属用车衔接至上饶。",
    "조식 포함 5박으로 징더전 1박, 우위안 2박, 삼청산 인근 1박, 왕셴구 안 또는 인근 1박이며 영어 가이드와 전용 차량이 상라오까지 동행합니다.",
  ),
  metadataDescription: l(
    "6-day Jingdezhen, Wuyuan, Sanqingshan and Wangxian Valley private tour with English guide, private vehicle, breakfast, admissions and ceramic experience.",
    "景德镇、婺源、三清山与望仙谷 6 天私家团，含英语导游、专车、早餐、门票与陶瓷体验。",
    "징더전·우위안·삼청산·왕셴구 6일 프라이빗 투어. 영어 가이드, 전용 차량, 조식, 입장권과 도자기 체험 포함.",
  ),
  highlights: lists(
    [
      "Jingdezhen museums and kilns",
      "A confirmed ceramic experience",
      "Two nights among Wuyuan villages",
      "Sanqingshan and Wangxian Valley",
    ],
    [
      "景德镇御窑与陶瓷内容",
      "已确认的陶瓷体验",
      "婺源村落连住两晚",
      "三清山与望仙谷夜景",
    ],
    [
      "징더전 가마와 도자기 박물관",
      "확정된 도자기 체험",
      "우위안 마을에서 2박",
      "삼청산과 왕셴구 야경",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Jingdezhen", "抵达景德镇", "징더전 도착"),
      l(
        "Meet the private guide and driver at the confirmed station, then begin the named Jingdezhen ceramic route. Taoxichuan is added only when the arrival time and opening hours allow.",
        "在已确认的车站与私家导游、司机会合，开始已列明的景德镇陶瓷路线。仅在抵达时间与开放时段允许时增加陶溪川。",
        "확정된 역에서 전용 가이드와 기사를 만나 명시된 징더전 도자 일정으로 시작합니다. 도착 시간과 운영 시간이 허용할 때만 타오시촨을 추가합니다.",
      ),
    ),
    day(
      2,
      l(
        "Jingdezhen ceramics, then Wuyuan",
        "景德镇陶瓷内容后前往婺源",
        "징더전 도자 일정 후 우위안",
      ),
      l(
        "Complete the confirmed museum, kiln and ceramic-making stops, then travel by private vehicle to Wuyuan for the first of two nights. Materials and the handling of the finished piece are confirmed before booking.",
        "完成已确认的博物馆、窑址与陶瓷制作体验，再乘私车前往婺源，入住两晚中的第 1 晚。材料与成品后续处理在预订前写清。",
        "확정된 박물관, 가마와 도자기 제작 체험을 마친 뒤 전용 차량으로 우위안에 이동해 2박 중 첫날을 보냅니다. 재료와 완성품 처리는 예약 전에 확인합니다.",
      ),
    ),
    day(
      3,
      l("Wuyuan village day", "婺源村落一日", "우위안 마을 하루"),
      l(
        "Follow the confirmed Wuyuan village route without trying to compress every village into one day. Cableways and seasonal scenery are described according to the final route and actual conditions.",
        "按确认单中的婺源村落路线游览，不把所有村落压进同一天。索道与季节景观以最终路线和实际情况为准。",
        "확인된 우위안 마을 동선을 따르며 모든 마을을 하루에 몰아넣지 않습니다. 케이블카와 계절 풍경은 최종 동선과 실제 상황에 따라 안내합니다.",
      ),
    ),
    day(
      4,
      l("Sanqingshan mountain day", "三清山山岳一日", "삼청산 산악 일정"),
      l(
        "Travel to Sanqingshan and follow the confirmed cableway-assisted mountain route, then stay near the mountain. Weather, open trails and walking ability determine the exact viewpoints.",
        "前往三清山，按确认单完成索道辅助的山岳路线，之后入住山下或周边酒店。具体观景点取决于天气、开放步道与步行能力。",
        "삼청산으로 이동해 확정된 케이블카 보조 산악 동선을 진행한 뒤 산 인근에 숙박합니다. 전망지는 날씨, 개방 구간과 보행 능력에 따라 달라집니다.",
      ),
    ),
    day(
      5,
      l(
        "Wangxian Valley into the evening",
        "望仙谷日落与亮灯时段",
        "왕셴구의 해 질 무렵과 조명",
      ),
      l(
        "Leave the Sanqingshan area for Wangxian Valley and keep the confirmed afternoon-to-evening entry window, then stay inside or nearby as booked. It is presented as a developed scenic night experience, not an untouched ancient village.",
        "从三清山周边前往望仙谷，按确认票种保留下午至亮灯时段，之后入住景区内或附近已确认的住宿。该地按商业化景区夜游如实介绍，不包装成原生态古村。",
        "삼청산 지역에서 왕셴구로 이동해 확정된 오후-저녁 입장 시간에 방문하고 예약에 따라 내부 또는 인근에 숙박합니다. 원형 고촌이 아니라 개발된 야간 관광지로 정확히 안내합니다.",
      ),
    ),
    day(
      6,
      l("Depart from Shangrao", "送上饶站", "상라오역 출발"),
      l(
        "Transfer by private vehicle to Shangrao station. A light stop is added only when the confirmed train time leaves a safe margin.",
        "乘私车送往上饶站；仅在已确认车次留有充足余量时增加轻量活动。",
        "전용 차량으로 상라오역에 이동하며 확정 열차까지 충분한 여유가 있을 때만 가벼운 방문을 추가합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five breakfast-included nights based on twin sharing: one in Jingdezhen, two in Wuyuan, one near Sanqingshan and one inside or near Wangxian Valley. Hotel grade, room type, exact locations and single supplement are confirmed in writing.",
    "共 5 晚含早，默认双人同住：景德镇 1 晚、婺源 2 晚、三清山周边 1 晚、望仙谷内或附近 1 晚。酒店等级、房型、具体位置与单房差须书面确认。",
    "조식 포함 5박, 2인 1실 기준으로 징더전 1박, 우위안 2박, 삼청산 인근 1박, 왕셴구 안 또는 인근 1박입니다. 호텔 등급, 객실, 정확한 위치와 1인실 추가금을 서면 확인합니다.",
  ),
  serviceNote: l(
    "The package includes a private English-speaking guide, private vehicle, hotel breakfast, listed admissions, the confirmed ceramic experience and basic local travel accident insurance. The confirmation names the Wuyuan route, Sanqingshan ticket and cableways, Wangxian admission, studio materials and what happens to the finished ceramic piece.",
    "套餐包含私家英语导游、专属用车、酒店早餐、所列门票、已确认的陶瓷体验与当地基础旅游意外险。确认单须写明婺源路线、三清山门票与索道、望仙谷门票、工作室材料及陶瓷成品的后续处理。",
    "패키지에는 영어 전용 가이드, 전용 차량, 호텔 조식, 명시된 입장권, 확정된 도자기 체험과 현지 기본 여행 상해보험이 포함됩니다. 확인서에는 우위안 동선, 삼청산 입장권과 케이블카, 왕셴구 입장, 공방 재료와 완성품 처리 방식을 명시합니다.",
  ),
  exclusions: commonExclusions(
    [
      "Ceramic firing, glazing, remake, packing or international shipping unless individually listed",
    ],
    ["未逐项列明的陶瓷烧制、上釉、失败重做、包装或国际邮寄"],
    [
      "개별 명시되지 않은 도자기 소성, 유약, 재제작, 포장 또는 국제 배송",
    ],
  ),
  bookingNote: quoteBookingNote(
    "Pricing is prepared after the travel dates, rooming and group size are confirmed, so this package is enquiry-only.",
    "本产品须先确认日期、房间配置与同行人数，再提供完整报价。",
    "이 상품은 날짜, 객실 구성과 인원을 확인한 뒤 전체 견적을 안내합니다.",
  ),
  heroImage: image(
    jiangxiSlug,
    "hero.webp",
    1920,
    1080,
    l("Wangxian Valley near sunset", "日落时分的望仙谷", "해 질 무렵 왕셴구"),
    l(
      "The visit is timed from afternoon into the developed scenic area's evening lights.",
      "游览从下午延续至商业化景区亮灯时段。",
      "오후부터 개발된 관광지의 저녁 조명 시간까지 방문합니다.",
    ),
  ),
  gallery: [
    image(
      jiangxiSlug,
      "gallery-1.webp",
      1920,
      2121,
      l(
        "Jingdezhen Imperial Kiln Museum",
        "景德镇御窑博物馆",
        "징더전 어요박물관",
      ),
      l(
        "Jingdezhen receives two nights and a genuine half-day making session.",
        "景德镇安排两晚，并留出真正的半天制作时间。",
        "징더전에 2박하며 실제 제작에 반나절을 배정합니다.",
      ),
      "50% 48%",
    ),
  ],
  routeMedia: [
    routeMedia(
      4,
      l("Huangling, Wuyuan", "婺源篁岭", "우위안 황링"),
      image(
        jiangxiSlug,
        "route-day-2.webp",
        1920,
        875,
        l(
          "Huangling village in Wuyuan",
          "婺源篁岭村落景观",
          "우위안 황링 마을 풍경",
        ),
        l(
          "Seasonal displays vary; the route chooses one village rather than rushing several.",
          "季节景观会变化；路线只选一座村落深入，不多点赶场。",
          "계절 풍경은 달라지며 여러 마을 대신 한 곳에 집중합니다.",
        ),
      ),
    ),
  ],
  packages: [standardPackage([])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const changbaishanSlug = "changbaishan-yanji-winter-6-day-private-tour";
const changbaishan: PrivateTourProduct = {
  id: "private-tour-changbaishan-yanji-winter-6d5n",
  slug: changbaishanSlug,
  days: 6,
  nights: 5,
  servicePolicy,
  title: l(
    "Changbaishan Resort, North Slope & Yanji: 6-Day Winter Private Tour",
    "长白山度假区·北坡·延吉 6 天 5 晚冬季私家团",
    "창바이산·북파·옌지 6일 겨울 프라이빗 투어",
  ),
  eyebrow: l(
    "A winter-only route with a built-in weather alternative",
    "冬季限定，并把天气备用方案提前写清",
    "겨울 한정, 날씨 대체 일정까지 미리",
  ),
  lede: l(
    "Combine a beginner ski lesson, a weather-dependent North Slope day and Yanji's markets and neighbourhoods, with every snow activity and language arrangement confirmed separately.",
    "把初学滑雪课、受天气影响的北坡机会日与延吉市场和街区串联起来；每项雪上活动与语言服务都单独确认。",
    "초급 스키 수업, 날씨에 좌우되는 북파 일정과 옌지 시장·거리를 잇고 설상 체험과 언어 서비스를 항목별로 확인합니다.",
  ),
  summary: l(
    "Six-day Changbaishan and Yanji winter private tour with five breakfast-included nights, snow activities and winter-equipped road transfers.",
    "共 5 晚冬季含早：长白山度假区 2 晚、北坡周边或二道白河 1 晚、延吉 2 晚，并安排适合冬季路况的私车。",
    "조식 포함 겨울 5박으로 창바이산 리조트 2박, 북파 인근 또는 얼다오바이허 1박, 옌지 2박과 겨울 도로에 맞는 전용 차량으로 구성됩니다.",
  ),
  highlights: lists(
    [
      "Beginner ski lesson",
      "A weather-dependent North Slope opportunity day",
      "One seasonal snow or rime activity",
      "Yanji markets and Korean-Chinese culture",
    ],
    [
      "初学滑雪课",
      "受天气影响的北坡机会日",
      "一项季节性雪地或雾凇活动",
      "延吉市场与朝鲜族文化",
    ],
    [
      "초급 스키 수업",
      "날씨에 따른 북파 기회일",
      "계절 설상 또는 상고대 체험 한 가지",
      "옌지 시장과 조선족 문화",
    ],
  ),
  itinerary: [
    day(
      1,
      l(
        "Arrive at Changbaishan resort",
        "抵达长白山度假区",
        "창바이산 리조트 도착",
      ),
      l(
        "Meet the winter-equipped vehicle at the confirmed Changbaishan airport or station and transfer to the resort hotel. Use the day to settle in and check clothing and equipment.",
        "在已确认的长白山机场或车站与冬季车辆会合，前往度假区酒店。当天以入住、适应天气与检查装备为主。",
        "확정된 창바이산 공항 또는 역에서 겨울 장비 차량을 만나 리조트 호텔로 이동하고 날씨 적응과 복장·장비 점검에 시간을 둡니다.",
      ),
    ),
    day(
      2,
      l(
        "Beginner ski lesson and free snow time",
        "初学滑雪课与自由玩雪",
        "초급 스키 수업과 자유 설상 시간",
      ),
      l(
        "Join one age-appropriate beginner lesson, then use the remaining time at a family pace. The confirmation separately lists lift ticket, ski or snowboard equipment, helmet, instructor language, duration and eligible ages.",
        "参加一节适龄初学课程，其余时间按家庭节奏自由活动。确认单须分别列明雪票、双板或单板雪具、头盔、教练语言、时长与适用年龄。",
        "연령에 맞는 초급 수업 한 회를 받고 남은 시간은 가족 속도에 맞춥니다. 확인서에는 리프트권, 스키 또는 보드 장비, 헬멧, 강습 언어, 시간과 연령을 따로 명시합니다.",
      ),
    ),
    day(
      3,
      l(
        "North Slope and Tianchi opportunity day",
        "北坡与天池机会日",
        "북파와 천지 기회일",
      ),
      l(
        "Attempt the North Slope only when roads and the scenic area operate. Tianchi visibility is never guaranteed; move to the pre-agreed alternative if wind, snow or access closes the route. Stay near the North Slope or Erdaobaihe.",
        "仅在道路与景区开放时前往北坡。绝不承诺看见天池；如遇风雪或封闭，则执行提前确认的备用方案。当晚住北坡周边或二道白河。",
        "도로와 관광지가 운영할 때만 북파를 방문합니다. 천지 관람은 보장하지 않으며 강풍, 폭설 또는 통제로 폐쇄되면 사전 합의한 대체 일정을 진행합니다. 북파 인근 또는 얼다오바이허에서 숙박합니다.",
      ),
    ),
    day(
      4,
      l(
        "Seasonal winter activity and Yanji",
        "季节活动与前往延吉",
        "계절 겨울 체험 후 옌지 이동",
      ),
      l(
        "Choose a rime-drift or safer snow activity only when seasonal and safety conditions are met, then travel by winter-equipped private vehicle to Yanji. The activity's age, duration and cancellation rule are confirmed in writing.",
        "仅在季节与安全条件满足时选择雾凇漂流或更安全的雪地活动，再乘冬季车辆前往延吉。活动年龄、时长与取消规则须书面确认。",
        "계절과 안전 조건을 충족할 때만 상고대 래프팅 또는 더 안전한 설상 활동을 선택하고 겨울 장비 차량으로 옌지에 이동합니다. 연령, 시간과 취소 규정을 서면 확인합니다.",
      ),
    ),
    day(
      5,
      l(
        "Yanji markets and neighbourhoods",
        "延吉市场、民俗与城市街区",
        "옌지 시장, 민속과 거리",
      ),
      l(
        "Visit the morning or local market, one confirmed Korean-Chinese cultural venue and selected city streets. Meals remain flexible and independently paid, with guidance available.",
        "游览水上市场或本地市场、一处已确认的朝鲜族文化点与城市街区。餐食保持自由选择并由客人自理，向导可协助。",
        "아침 또는 현지 시장, 확정된 조선족 문화 장소 한 곳과 도시 거리를 둘러봅니다. 식사는 자유롭게 선택하고 자비로 지불하며 가이드가 도울 수 있습니다.",
      ),
    ),
    day(
      6,
      l("Depart Yanji", "延吉送机或送站", "옌지 출발"),
      l(
        "Transfer by private vehicle to the confirmed Yanji airport or station. No fixed sightseeing is planned.",
        "乘私车送往已确认的延吉机场或车站；当天不安排固定游览。",
        "전용 차량으로 확정된 옌지 공항 또는 역에 이동하며 고정 관광은 없습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five breakfast-included nights based on twin sharing: two at a named Changbaishan resort hotel, one near the North Slope or in Erdaobaihe and two in Yanji. Brand, room type, breakfast, hot-spring access and single supplement are confirmed in writing.",
    "共 5 晚含早，默认双人同住：明确品牌的长白山度假区酒店 2 晚、北坡周边或二道白河 1 晚、延吉 2 晚。品牌、房型、早餐、温泉权益与单房差须书面确认。",
    "조식 포함 5박, 2인 1실 기준으로 지정 창바이산 리조트 2박, 북파 인근 또는 얼다오바이허 1박, 옌지 2박입니다. 브랜드, 객실, 조식, 온천 이용과 1인실 추가금을 서면 확인합니다.",
  ),
  serviceNote: l(
    "English-guide days and ski-instructor language are costed after the group is confirmed. The confirmation lists winter vehicle safety equipment, airport transfer, resort–North Slope–Yanji transport, North Slope admission and scenic buses, lift ticket, equipment, helmet, lesson, hot spring, drift or snow activity and each cancellation rule. No item is assumed from a general 'unlimited skiing' label.",
    "英语导游服务日与雪场教练语言会在确认同行信息后核算。确认单须逐项列明冬季车型安全配置、机场接机、度假区—北坡—延吉用车、北坡门票与景区车、雪票、雪具、头盔、课程、温泉、漂流或雪地活动，以及各项取消规则。“无限滑雪”等概括说法不自动代表以上项目全部包含。",
    "영어 가이드 일정과 스키 강습 언어는 일행을 확인한 뒤 산정합니다. 확인서에는 겨울 차량 안전 장비, 공항 이동, 리조트-북파-옌지 차량, 북파 입장·관광지 버스, 리프트권, 장비, 헬멧, 강습, 온천, 래프팅 또는 설상 체험과 각 취소 규정을 명시합니다. '무제한 스키' 같은 일반 표현만으로 모든 항목이 포함되지는 않습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Any snow activity, hot spring, equipment or lesson not individually named",
      "Cold-weather clothing and personal medical costs",
    ],
    ["未逐项列明的雪地活动、温泉、雪具或课程", "防寒服装与个人医疗费用"],
    [
      "개별 명시되지 않은 설상 활동, 온천, 장비 또는 강습",
      "방한복과 개인 의료비",
    ],
  ),
  bookingNote: quoteBookingNote(
    "Winter pricing is prepared after the dates, rooming, group size and snow activities are confirmed, so this package is enquiry-only.",
    "本冬季产品须先确认日期、房间配置、同行人数与雪地项目，再提供完整报价。",
    "이 겨울 상품은 날짜, 객실 구성, 인원과 설상 체험을 확인한 뒤 전체 견적을 안내합니다.",
  ),
  heroImage: image(
    changbaishanSlug,
    "hero.webp",
    1920,
    1440,
    l("Tianchi crater lake on Changbaishan", "长白山天池", "창바이산 천지"),
    l(
      "Tianchi is an opportunity, not a guaranteed view.",
      "天池是机会日目标，不承诺一定看见。",
      "천지는 기회일의 목표이며 관람을 보장하지 않습니다.",
    ),
  ),
  gallery: [
    image(
      changbaishanSlug,
      "gallery-1.webp",
      1920,
      1235,
      l("Yanji city lights at night", "延吉城市夜景", "옌지 야경"),
      l(
        "The route ends with two nights in Yanji.",
        "路线最后在延吉连住两晚。",
        "여정은 옌지 2박으로 마칩니다.",
      ),
    ),
  ],
  routeMedia: [
    routeMedia(
      5,
      l("Yanji neighbourhoods", "延吉城市街区", "옌지 거리"),
      image(
        changbaishanSlug,
        "route-day-2.webp",
        1920,
        1440,
        l(
          "Korean and Chinese signs near Yanbian University",
          "延边大学周边的朝鲜文与中文招牌",
          "연변대학교 인근의 한글과 중국어 간판",
        ),
        l(
          "Yanji's streets introduce the city's Korean-Chinese culture without turning the day into a fixed meal package.",
          "延吉街区呈现朝鲜族文化，餐食仍保持自由选择。",
          "옌지 거리는 조선족 문화를 보여 주며 식사는 자유롭게 선택합니다.",
        ),
      ),
    ),
  ],
  packages: [standardPackage([], "standard-guided-winter")],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

export const privateTourExpansionProducts: readonly PrivateTourProduct[] =
  Object.freeze([
    chengduJiuzhaigou,
    yunnan,
    guizhou,
    fujian,
    chaoshan,
    chengduChongqing,
    guangzhou,
    huangshan,
    jiangxi,
    changbaishan,
  ]);
