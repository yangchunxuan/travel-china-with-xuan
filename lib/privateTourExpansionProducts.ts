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
  "We provide your private transport, any listed guide service, transfers, admissions and accommodation only as named in your written booking confirmation. No shopping stops.",
  "私车、导游服务、接送、门票和住宿，只按书面确认单上写明的内容提供，无购物店安排。",
  "전용 차량, 가이드 서비스, 이동, 입장권과 숙박은 서면 예약 확인서에 적힌 내용대로만 제공합니다. 쇼핑 일정은 없습니다.",
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
      "午餐、晚餐和饮料，行程逐日写明的餐食除外",
      "综合国际旅行保险、签证、司导小费及个人消费",
      "单房差、房型升级及节假日附加费",
      "确认行程之后新增的活动或服务",
      ...extraZh,
    ],
    [
      "국제선 항공편 및 서면 확인서에 명시되지 않은 교통",
      "중식·석식·음료(일정에 따로 적힌 식사는 제외)",
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
    "Three nights in Chengdu and two near Jiuzhaigou, with breakfast, high-speed rail, private station and scenic-area transfers and guided touring.",
    "成都 3 晚、九寨沟 2 晚，均含早餐。高铁和车站、景区接驳一并安排，核心景点按私家团的节奏游览。",
    "청두 3박과 주자이거우 인근 2박, 조식, 열차와 역·관광지 이동, 가이드 관광을 함께 담은 프라이빗 일정입니다.",
  ),
  highlights: lists(
    [
      "Early Panda Base visit",
      "A full day in Jiuzhaigou",
      "Huanglong, paced for the altitude",
      "Train, then a private vehicle for the last leg",
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
        "Our driver meets you at the airport or station in Chengdu and takes you to your hotel. There is no fixed sightseeing today, leaving room for any delays and check-in.",
        "司机在成都机场或车站接你，专车送到酒店。当天不安排固定景点，为航班或列车可能的延误和入住留出时间。",
        "기사가 청두 공항이나 역에서 맞이해 호텔까지 모셔다 드립니다. 이날은 고정 관광을 넣지 않아 지연이나 체크인에 여유를 둘 수 있습니다.",
      ),
    ),
    day(
      2,
      l("Train to Huanglongjiuzhai, then drive to Jiuzhaigou", "高铁到黄龙九寨站，再乘车去九寨沟", "황룽주자이역행 열차 후 주자이거우 이동"),
      l(
        "Take the high-speed train to Huanglongjiuzhai station, where your local guide and driver meet you and take you by private vehicle to your Jiuzhaigou hotel. The rest of the day is for resting and getting used to the altitude.",
        "乘高铁到黄龙九寨站，当地导游和司机接站，专车送你到九寨沟酒店。余下时间好好休息，适应海拔。",
        "고속철도로 황룽주자이역에 도착하면 현지 가이드와 기사가 맞이해 전용 차량으로 주자이거우 호텔까지 모셔다 드립니다. 남은 시간은 쉬면서 고도에 적응합니다.",
      ),
    ),
    day(
      3,
      l("A full day in Jiuzhaigou", "九寨沟完整一日", "주자이거우 종일"),
      l(
        "Spend the day in Jiuzhaigou's open valleys, on the scenic buses and paths running that day. Your guide plans the exact route around the weather, crowd controls, your energy and what is open on the day.",
        "把完整一天留给九寨沟，坐当天运行的景区车，走开放的步道。具体怎么走，导游会看天气、客流、你的体力和当日开放情况来安排。",
        "주자이거우에서 하루를 보냅니다. 당일 운행하는 관광지 버스와 개방된 길로 다니며, 구체적인 동선은 가이드가 날씨, 혼잡도, 체력, 당일 개방 상태를 보고 정합니다.",
      ),
    ),
    day(
      4,
      l("Huanglong and return to Chengdu", "黄龙与返回成都", "황룽 후 청두 귀환"),
      l(
        "When the road and site are open, drive to Huanglong, ride the uphill cable car as planned and walk down at a pace that suits the altitude. Then on to Huanglongjiuzhai station for your train back to Chengdu.",
        "道路和景区开放时前往黄龙，按安排乘上行索道，再根据高海拔情况步行下山。之后去黄龙九寨站，乘高铁回成都。",
        "도로와 관광지가 운영할 때 황룽으로 가서 예약된 상행 케이블카로 올라간 뒤 고도에 맞춰 걸어 내려옵니다. 이후 황룽주자이역에서 열차로 청두에 돌아갑니다.",
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
        "Start early at Chengdu Panda Base, then on to Wenshu Temple, People's Park and Jinli Old Street. The listed lunch is included; how active the pandas are can vary.",
        "一早去成都大熊猫基地，之后逛文殊院、人民公园和锦里古街。含行程所列午餐；熊猫活不活跃，要看当天情况。",
        "이른 시간에 청두 판다기지를 방문한 뒤 문수원, 인민공원, 진리거리를 둘러봅니다. 일정에 적힌 중식이 포함되며, 판다가 얼마나 활발한지는 그날그날 다를 수 있습니다.",
      ),
    ),
    day(
      6,
      l("Depart Chengdu", "成都送站", "청두 출발"),
      l(
        "After check-out, a private vehicle takes you to the airport or railway station in Chengdu. There is no fixed sightseeing on departure day.",
        "退房后专车送你去成都机场或车站。返程这天不安排固定游览。",
        "체크아웃 후 전용 차량으로 청두 공항이나 역까지 모셔다 드립니다. 출발일에는 고정 관광 일정이 없습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five nights with breakfast, based on twin sharing: three in Chengdu and two near Jiuzhaigou. We confirm the four-star standard, exact hotels, room type and single supplement with you in writing.",
    "共 5 晚，含早餐，按两人同住一间计：成都 3 晚、九寨沟 2 晚。4 星标准、具体酒店、房型和单房差，付款前都会书面发给你确认。",
    "조식 포함 5박, 2인 1실 기준으로 청두 3박과 주자이거우 인근 2박입니다. 4성급 기준, 정확한 호텔·객실 유형·1인실 추가금은 결제 전에 서면으로 보내 드립니다.",
  ),
  serviceNote: l(
    "The tour includes a private English-speaking guide and driver, airport or station transfers, round-trip second-class high-speed rail, listed admissions and scenic buses, an uphill Huanglong cable car and the Day 5 lunch. We confirm final train times, hotels and any weather alternative with you in writing.",
    "行程包含私人英语导游和司机、机场或车站接送、往返高铁二等座、所列门票和景区车、黄龙上行索道，以及第 5 天午餐。最终车次、酒店和天气备用方案，付款前会书面发给你确认。",
    "영어 전용 가이드와 기사, 공항·역 이동, 왕복 고속철도 2등석, 명시된 입장권과 관광지 버스, 황룽 상행 케이블카, 5일 차 중식이 포함됩니다. 최종 열차 시간, 호텔, 날씨에 따른 대체 일정은 서면으로 보내 드립니다.",
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
    "The published per-person starting prices apply to 2 or 6 travellers sharing twin rooms in the stated low-season conditions.",
    "页面所示每人起价分别适用于 2 人或 6 人同行、淡季双人同住。",
    "표시된 1인 시작가는 비수기 2인 1실 조건에서 2명 또는 6명 여행에 적용됩니다.",
  ),
  faq: [{
    question: l(
      "What if our train to Huanglongjiuzhai Station is delayed?",
      "去黄龙九寨站的高铁晚点，接站车会一直等吗？",
      "황룽주자이역행 열차가 늦으면 픽업 차량이 계속 기다리나요?",
    ),
    answer: l(
      "The private transfer is planned around the train in your written itinerary; unlimited waiting is not included automatically. Before payment, we confirm the station and meeting point, and record any agreed waiting or changed-train terms in writing. If your train is delayed, contact us so we can check the revised pickup and agree any extra cost before arranging it.",
      "接站私车按书面行程中的车次安排，不默认无限等候。付款前，我们会确认车站与会合地点，并把商定的等候或改签处理写入确认单。若列车晚点，请及时联系我方；我们核对新的接车安排，如有额外费用，会先征得你同意。",
      "역 픽업 차량은 서면 일정의 열차에 맞춰 준비하며 무제한 대기는 자동으로 포함되지 않습니다. 결제 전에 역과 만남 장소를 확인하고, 합의한 대기·열차 변경 조건을 서면에 적습니다. 지연되면 연락해 주세요. 새 픽업 가능 여부를 확인하고 추가 비용이 있다면 먼저 동의를 구합니다.",
    ),
  }],
  heroImage: image(
    chengduJiuzhaigouSlug,
    "hero.webp",
    1600,
    1064,
    l("Five Flower Lake in Jiuzhaigou", "九寨沟五花海", "주자이거우 오화해"),
    l(
      "A full day for Jiuzhaigou, on the routes open that day.",
      "为九寨沟留出完整一天，具体游线看当天开放情况。",
      "주자이거우에 하루를 비워 두고, 동선은 당일 개방 상태에 따라 정합니다.",
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
        "Your trip begins in Chengdu; how active the pandas are depends on the time and conditions.",
        "行程从成都开始；熊猫是否活跃，要看时间和现场情况。",
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
          "Your Huanglong visit depends on the weather, access and altitude.",
          "黄龙游览要看天气、道路开放情况和海拔。",
          "황룽 일정은 날씨, 접근 상황과 고도의 영향을 받습니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 9067, usdPerPerson: 1395, publishedPrice: { currency: "USD", amountPerPerson: 1395 } },
      { travelers: 6, cnyPerPerson: 8867, publishedPrice: { currency: "USD", amountPerPerson: 1365 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-26",
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
    "Seven nights: two in Kunming, three in Dali and two in Lijiang. The starting price for six travellers is CNY 5,680 for land arrangements; we confirm the exact hotels, rooms and breakfast before you pay.",
    "共住 7 晚：昆明 2 晚、大理 3 晚、丽江 2 晚。6 人同行的当地行程起价为 CNY 5,680；具体酒店、房型和早餐，付款前会书面发给你确认。",
    "쿤밍 2박, 다리 3박, 리장 2박으로 총 7박입니다. 현지 일정 시작가는 6명 기준 CNY 5,680이며, 호텔, 객실과 조식은 결제 전에 서면으로 보내 드립니다.",
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
        "Our driver meets you at Kunming airport or station and takes you to your hotel. No fixed sightseeing is planned, so the rest of the day is yours.",
        "司机在昆明机场或车站接你，乘私车送你到酒店。当天不安排固定游览，可以轻松入住。",
        "기사가 쿤밍 공항이나 역에서 맞이해 호텔까지 모셔다 드립니다. 이날은 고정 관광 일정이 없으니 편하게 쉬세요.",
      ),
    ),
    day(
      2,
      l("Flowers, wetland and rail to Dali", "花市、湿地与动车前往大理", "꽃시장·습지 후 다리 이동"),
      l(
        "Visit Dounan Flower Market and Laoyuhe Wetland, then take the high-speed train to Dali and settle in near Erhai.",
        "游览斗南花市和捞鱼河湿地，之后乘动车去大理，入住洱海周边的酒店。",
        "더우난 꽃시장과 라오위허 습지를 둘러본 뒤 고속철도로 다리에 가서 얼하이 인근에서 숙박합니다.",
      ),
    ),
    day(
      3,
      l("Erhai sunrise, Xizhou and tie-dye", "洱海日出、喜洲与扎染", "얼하이 일출·시저우·염색"),
      l(
        "Start at Longkan Pier, continue along Erhai's S-bend, then visit Xizhou Old Town for the Bai tie-dye experience on your itinerary.",
        "从龙龛码头的日出开始，沿洱海 S 湾继续游览，再到喜洲古镇体验行程中的白族扎染。",
        "룽칸 부두에서 일출을 본 뒤 얼하이 S자 만을 따라가고, 시저우 고성에서 일정에 있는 바이족 염색 체험을 합니다.",
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
        "Walk Dali Old Town, continue to Ideal Garden, then keep the late afternoon for the Yunxiang Mountain sunset plan.",
        "慢游大理古城，随后前往理想邦，傍晚留给云想山的日落行程。",
        "다리고성을 둘러보고 리샹방으로 이동한 뒤, 늦은 오후에는 윈샹산 일몰 일정이 이어집니다.",
      ),
    ),
    day(
      5,
      l("Dali to Lijiang via wetlands and valley", "大理经湿地与山谷前往丽江", "다리에서 습지와 계곡을 거쳐 리장으로"),
      l(
        "Your private transfer takes you to Lijiang, with stops at Houniaowan Wetland and Tinghua Valley before you check in.",
        "专车送你前往丽江，途中游览候鸟湾湿地和听花谷，之后入住丽江酒店。",
        "전용 차량으로 리장에 가는 길에 허우냐오완 습지와 팅화 계곡을 들르고, 이어서 호텔에 체크인합니다.",
      ),
    ),
    day(
      6,
      l("Yunshanping, Blue Moon Valley and Shuhe", "云杉坪、蓝月谷与束河", "윈산핑·남월곡·수허"),
      l(
        "Ride the scenic transport named in your confirmation to Yunshanping and Blue Moon Valley, then finish in Shuhe Old Town. We check access, visibility and altitude suitability for your travel date.",
        "按确认的方案游云杉坪和蓝月谷，最后到束河古镇收尾。开放情况、能见度和高海拔适应性，我们会按你的出行日期核对。",
        "확정된 관광 교통으로 윈산핑과 남월곡을 둘러보고 수허고성에서 일정을 마칩니다. 개방 여부, 시야와 고도 적합성은 여행 날짜 기준으로 확인합니다.",
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
        "Visit Baisha Old Town and Yuhu Village below the snow mountain, then take the train back to Kunming for your final night.",
        "游览白沙古镇和雪山脚下的玉湖村，之后乘动车回昆明，住最后一晚。",
        "바이샤고성과 설산 아래 위후촌을 둘러본 뒤 열차로 쿤밍에 돌아가 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      8,
      l("Depart Kunming", "昆明离开", "쿤밍 출발"),
      l(
        "There is no fixed sightseeing today; your private transfer takes you to Kunming airport or railway station.",
        "当天不安排固定景点，私车按你的航班或车次送你去昆明机场或车站。",
        "이날은 고정 관광 없이 여유 있게 준비하시고, 전용 차량으로 쿤밍 공항이나 역까지 이동합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Seven nights on the published route: two in Kunming, three in Dali and two in Lijiang. The published price is a reference for land arrangements; you get the hotel grade, room type, breakfast and single supplement in writing.",
    "按这条路线共住 7 晚：昆明 2 晚、大理 3 晚、丽江 2 晚。页面价格是当地行程的参考价；酒店等级、房型、早餐和单房差，都会书面发给你确认。",
    "이 동선은 총 7박으로 쿤밍 2박, 다리 3박, 리장 2박입니다. 표시 금액은 현지 일정 참고가이며, 호텔 등급, 객실, 조식과 1인실 추가금은 서면으로 보내 드립니다.",
  ),
  serviceNote: l(
    "CNY 5,680 is the six-traveller benchmark for land arrangements on the published core route. Your written quote sets out the hotel and breakfast scope, Kunming–Dali and Lijiang–Kunming rail, private vehicles, driver-guide or guide language, insurance, admissions and each listed local experience.",
    "CNY 5,680 是 6 人走公开核心路线时的当地安排基准价。书面报价会逐项写清酒店与早餐范围、昆明—大理及丽江—昆明动车、私车、司机兼向导或导游语言、保险、门票和所列体验。",
    "CNY 5,680은 6명이 공개 핵심 동선으로 여행할 때의 현지 일정 기준가입니다. 서면 견적에는 호텔·조식 범위, 쿤밍-다리와 리장-쿤밍 열차, 전용 차량, 기사 겸 가이드 또는 가이드 언어, 보험, 입장권과 체험을 적어 드립니다.",
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
  faq: [{
    question: l(
      "Does this eight-day Yunnan tour include Shangri-La, and where does it end?",
      "这条云南 8 天团包含香格里拉吗？从哪里离开？",
      "이 8일 윈난 여행에 샹그릴라가 포함되나요? 어디서 끝나나요?",
    ),
    answer: l(
      "No. This route visits Kunming, Dali and Lijiang, returns by train to Kunming on Day 7 and departs from Kunming on Day 8. Shangri-La is not included. If you want to add it or depart from Lijiang, ask us for a separately checked route and quote before booking.",
      "不包含。公开路线游览昆明、大理和丽江，第 7 天乘动车回昆明，第 8 天从昆明离开。香格里拉不在其中；若想加上它，或从丽江离开，请在预订前让我们核对交通并另行报价。",
      "아니요. 공개 일정은 쿤밍·다리·리장을 방문한 뒤 7일 차에 열차로 쿤밍에 돌아와 8일 차에 쿤밍에서 출발합니다. 샹그릴라는 포함되지 않습니다. 샹그릴라를 추가하거나 리장에서 출발하려면 예약 전에 별도 동선과 견적을 요청해 주세요.",
    ),
  }],
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
        "在大理有时间去洱海边和喜洲走走。",
        "다리에서는 얼하이와 시저우를 둘러볼 시간이 있습니다.",
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
          "Day 4 leaves time for Dali Old Town before the sunset stop.",
          "第 4 天在日落行程之前，留出时间逛大理古城。",
          "4일 차에는 일몰 일정 전에 다리고성을 둘러볼 시간이 있습니다.",
        ),
      ),
    ),
  ],
  packages: [standardPackage([{ travelers: 6, cnyPerPerson: 5680, publishedPrice: { currency: "CNY", amountPerPerson: 5680 } }])],
  datePublished: PUBLISHED,
  dateModified: "2026-09-26",
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
    "Six nights with breakfast in Guiyang, Huangguoshu or Anshun, Libo, Xijiang and Zhenyuan, with private road transport and the listed admissions included.",
    "在贵阳、黄果树或安顺、荔波、西江和镇远共住 6 晚，均含早餐；跨区移动全程私车，核心门票和景区车按确认单安排。",
    "구이양, 황궈수 또는 안순, 리보, 시장, 전위안에서 조식 포함 6박을 하고, 전용 차량으로 이동합니다. 입장권은 확인서에 적힌 대로 포함됩니다.",
  ),
  highlights: lists(
    [
      "Huangguoshu Waterfall",
      "Small Seven Holes' water-and-forest route",
      "Two nights in Xijiang, with one cultural activity",
      "Zhenyuan's riverside lanes and night view",
      "Private long-distance transfers with rest stops",
    ],
    [
      "黄果树瀑布",
      "小七孔水森林游线",
      "西江连住两晚，含一项苗族文化体验",
      "镇远河畔街巷与夜景",
      "带休息时间的跨区私车",
    ],
    [
      "황궈수폭포",
      "소칠공의 물과 숲 동선",
      "시장 2박과 먀오족 문화 체험 한 가지",
      "전위안 강변 골목과 야경",
      "휴식을 포함한 장거리 전용 차량 이동",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Guiyang", "抵达贵阳", "구이양 도착"),
      l(
        "Our driver meets you at the airport or station in Guiyang and takes you to your hotel. No sightseeing is planned today, so you can settle in.",
        "司机在贵阳机场或车站接你，专车送到酒店。当天不安排游览，好好入住休息。",
        "기사가 구이양 공항이나 역에서 맞이해 호텔까지 모셔다 드립니다. 이날은 관광 일정이 없으니 편하게 체크인하세요.",
      ),
    ),
    day(
      2,
      l("Huangguoshu Waterfall", "黄果树瀑布", "황궈수폭포"),
      l(
        "Travel to Huangguoshu and explore on the scenic transport and paths open that day, then stay in Anshun or near the scenic area. Water volume and path access vary.",
        "前往黄果树，坐当天运行的景区车、走开放的步道游览，之后入住安顺或景区附近。水量和步道开放情况会有变化。",
        "황궈수로 이동해 그날 운행하는 관광지 차량과 개방된 탐방로로 둘러본 뒤, 안순이나 관광지 인근에서 묵습니다. 수량과 탐방로 개방 여부는 달라질 수 있습니다.",
      ),
    ),
    day(
      3,
      l("Libo and Small Seven Holes", "荔波与小七孔", "리보와 소칠공"),
      l(
        "Continue by private vehicle to Libo for Small Seven Holes. Your route is mostly downhill, on open trails and scenic buses; exact stops depend on the day's operation.",
        "乘专车前往荔波，游览小七孔。为你安排的路线以顺势下行为主，走当天开放的步道，搭乘景区车；具体点位视现场运营而定。",
        "전용 차량으로 리보에 가서 소칠공을 둘러봅니다. 동선은 완만한 내리막 위주이며, 개방된 길과 관광지 버스를 이용합니다. 세부 방문지는 당일 운영에 따라 달라집니다.",
      ),
    ),
    day(
      4,
      l("Libo to Xijiang", "荔波前往西江苗寨", "리보에서 시장으로"),
      l(
        "Travel by private vehicle to Xijiang Miao Village, go in with your entry ticket and scenic transport, and spend the first of two nights in the village.",
        "专车前往西江苗寨，凭门票搭乘景区车进寨，在苗寨内或附近入住，开始连住两晚。",
        "전용 차량으로 시장 먀오족 마을에 가서 입장권과 관광지 차량으로 마을에 들어갑니다. 마을 안이나 인근에서 2박 중 첫 밤을 묵습니다.",
      ),
    ),
    day(
      5,
      l("Xijiang Miao heritage", "西江苗族文化", "시장 먀오족 문화"),
      l(
        "A full day in Xijiang: a guided village walk, a museum visit and one silverwork or batik experience arranged in advance, then a second night here.",
        "一整天留给西江：导游带你走村寨、参观博物馆，再做一项提前定好的银饰或蜡染体验，并在西江住第二晚。",
        "하루를 온전히 시장에서 보냅니다. 가이드와 마을을 걷고 박물관을 본 뒤, 미리 정해 둔 은공예나 납염 체험 한 가지를 하고 시장에서 두 번째 밤을 묵습니다.",
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
        "Drive to Zhenyuan for the old riverside lanes, the historic sites in your plan and the evening atmosphere on the Wuyang River. A river cruise is included only if your confirmation names it.",
        "专车前往镇远，逛河畔老街，游览行程中列出的历史景点，感受舞阳河夜景；游船只在确认单写明时才包含。",
        "전용 차량으로 전위안에 가서 강변 옛 골목과 일정에 있는 유적을 둘러보고, 우양강의 저녁 풍경을 즐깁니다. 유람선은 확인서에 적혀 있을 때만 포함됩니다.",
      ),
    ),
    day(
      7,
      l("Zhenyuan to Guiyang for departure", "镇远返回贵阳送站", "전위안에서 구이양으로 출발"),
      l(
        "After a gentle morning, your private vehicle takes you from Zhenyuan to Guiyang airport or railway station. Your departure time needs to leave enough room for the road journey.",
        "上午轻松度过，之后专车从镇远送你到贵阳机场或车站。返程时间要给公路转场留足余量。",
        "여유로운 아침을 보낸 뒤 전용 차량으로 전위안에서 구이양 공항이나 역까지 모셔다 드립니다. 출발 시간은 도로 이동 시간을 충분히 두고 잡아야 합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Six nights with breakfast, based on twin sharing: one in Guiyang, one near Huangguoshu or in Anshun, one in Libo, two in Xijiang and one in Zhenyuan. Local boutique stays may differ from city four-star hotels.",
    "共住 6 晚，含早餐，默认两人同住：贵阳 1 晚、黄果树附近或安顺 1 晚、荔波 1 晚、西江 2 晚、镇远 1 晚。当地精品客栈的设施可能和城市 4 星酒店不太一样。",
    "조식 포함 6박, 2인 1실 기준으로 구이양 1박, 황궈수 인근 또는 안순 1박, 리보 1박, 시장 2박, 전위안 1박입니다. 현지 부티크 숙소는 도시 4성급 호텔과 시설이 다를 수 있습니다.",
  ),
  serviceNote: l(
    "Your trip includes a licensed private English-speaking guide and a dedicated driver throughout, private airport or station transfers, the listed admissions and scenic transport, daily bottled water and basic China-based travel accident insurance. Where available, the same guide stays with you from start to finish; we confirm this before payment.",
    "行程包含全程持证私人英语导游和专属司机、机场或车站接送、所列门票和景区交通、每日瓶装水，以及中国境内基础旅游意外险。排期允许时，由同一位导游全程陪你，付款前跟你确认。",
    "전 일정 자격 있는 영어 전용 가이드와 전담 기사, 공항·역 이동, 명시된 입장권과 관광지 교통, 생수, 중국 내 기본 여행상해보험이 포함됩니다. 가능하면 같은 가이드가 처음부터 끝까지 함께하며, 결제 전에 확정해 드립니다.",
  ),
  exclusions: commonExclusions(
    [
      "FAST, Fanjingshan, Big Seven Holes and unlisted performances",
      "Optional night tours or private home visits",
    ],
    ["FAST、梵净山、大七孔及未列演出", "未列明的夜游或私人家访"],
    [
      "FAST, 판징산, 대칠공, 일정에 없는 공연",
      "일정에 없는 야간 관광이나 개인 가정 방문",
    ],
  ),
  bookingNote: pricingBookingNote(
    "The published per-person starting prices apply to 2 or 6 adults sharing twin rooms in the stated low-season conditions.",
    "页面所示每人起价分别适用于 2 人或 6 人同行、淡季双人同住。",
    "표시된 1인 시작가는 비수기 2인 1실 조건에서 2명 또는 6명 여행에 적용됩니다.",
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
      "Your stay in the village comes with one cultural activity.",
      "苗寨停留期间含一项文化体验。",
      "마을에 머무는 동안 문화 체험 한 가지가 포함됩니다.",
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
          "After the drive to Libo, explore Small Seven Holes along the route open that day.",
          "抵达荔波后按当天开放路线游览小七孔。",
          "리보 도착 후 당일 개방 동선에 맞춰 소칠공을 둘러봅니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 12272, usdPerPerson: 1888, publishedPrice: { currency: "USD", amountPerPerson: 1888 } },
      { travelers: 6, cnyPerPerson: 12072, publishedPrice: { currency: "USD", amountPerPerson: 1858 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-23",
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
    "Five nights with breakfast in four-star-standard hotels across Xiamen, Nanjing, Anxi and Quanzhou, plus a private English guide, vehicle, admissions, tea tasting and four listed lunches.",
    "在厦门、南靖、安溪和泉州共住 5 晚 4 星标准酒店，含早餐；另含私人英语导游、专车、所列门票、品茶体验和行程中的 4 顿午餐。",
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
        "Your guide and driver meet you at the airport. Take the reserved ferry to Gulangyu, explore the car-free lanes and the museum named in your confirmation, then return to your Xiamen hotel.",
        "厦门机场接机后，乘预约好的船班前往鼓浪屿，步行游览街巷和确认单上列明的博物馆，再返回厦门酒店。",
        "샤먼 공항에서 가이드와 기사가 맞이합니다. 예약된 배편으로 구랑위에 들어가 차 없는 골목과 확인서에 적힌 박물관을 둘러본 뒤 샤먼 호텔로 돌아옵니다.",
      ),
    ),
    day(
      2,
      l("Chengqi Lou and overnight in Nanjing", "承启楼与南靖住宿", "청치러우와 난징 숙박"),
      l(
        "Drive into the tulou region to visit Chengqi Lou in Yongding and the round and square earth buildings named in your confirmation, then continue to your Nanjing hotel. Breakfast and lunch are included.",
        "乘私车进入土楼区域，游览永定承启楼及确认单列明的圆形、方形土楼，再前往南靖酒店入住；当天含早餐与午餐。",
        "전용 차량으로 토루 지역에 들어가 융딩 청치러우와 확인서에 적힌 원형·사각형 토루를 본 뒤 난징 호텔에 숙박합니다. 조식과 중식이 포함됩니다.",
      ),
    ),
    day(
      3,
      l("Tianluokeng and Anxi tea", "田螺坑与安溪茶园", "톈뤄컹과 안시 차"),
      l(
        "Visit the Tianluokeng tulou cluster, then continue to an Anxi tea plantation for a tea tasting (included) and a night in Anxi. Breakfast and lunch are included.",
        "游览田螺坑土楼群，再到安溪茶园品茶（已含），当晚住安溪；当天含早餐与午餐。",
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
        "Visit Quanzhou Maritime Museum, then return to Xiamen by private vehicle for the Xiamen University and seaside-promenade route. Your last night is in Xiamen. Breakfast and lunch are included.",
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
        "A private vehicle takes you from your Xiamen hotel to the airport; the pickup time is based on your flight.",
        "专车从厦门酒店送你去机场，接送时间按航班安排。",
        "샤먼 호텔에서 전용 차량으로 공항까지 모셔다 드리며, 픽업 시간은 항공편에 맞춥니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five nights with breakfast in four-star-standard hotels, based on two sharing a room: two in Xiamen and one each in Nanjing, Anxi and Quanzhou. You get the exact hotels and room types in writing; the published single supplement is USD 380.",
    "共住 5 晚 4 星标准酒店，含早餐，按两人同住一间计：厦门 2 晚，南靖、安溪、泉州各 1 晚。具体酒店和房型会书面发给你确认；公开单房差为 USD 380。",
    "4성급 기준 호텔에서 조식 포함 5박을 하며 2인 1실 기준입니다. 샤먼 2박, 난징·안시·취안저우 각 1박이며, 정확한 호텔과 객실은 서면으로 보내 드립니다. 공개 1인실 추가금은 USD 380입니다.",
  ),
  serviceNote: l(
    "The tour includes a private English-speaking guide, private driver and air-conditioned vehicle, airport transfers, all listed admissions, the Gulangyu ferry, the Anxi tea visit and tasting, breakfasts and the four lunches named on Days 2–5.",
    "行程包含私人英语导游、私人司机与空调车辆、机场接送、所列全部门票、鼓浪屿船票、安溪茶园与品茶、每日早餐，以及第 2—5 天的 4 顿午餐。",
    "투어에는 영어 전용 가이드, 전용 기사와 차량, 공항 이동, 명시된 모든 입장권, 구랑위 배편, 안시 차밭과 시음, 매일 조식, 2~5일 차 중식 4회가 포함됩니다.",
  ),
  exclusions: commonExclusions(
    [
      "Unlisted tulou interiors and optional experiences",
      "Meals not named in the final itinerary",
    ],
    ["未列明的土楼内部与自选体验", "最终行程未列明的餐食"],
    ["일정에 적히지 않은 토루 내부와 선택 체험", "최종 일정에 적히지 않은 식사"],
  ),
  bookingNote: pricingBookingNote(
    "The published 2- and 6-traveller per-person starting prices use twin sharing. We confirm the exact total before payment; any single-room supplement is separate.",
    "页面列出的 2 人和 6 人每人起价按双人同住计算；准确总价会在付款前确认，单房差另计。",
    "표시된 2명·6명 기준 1인 시작가는 2인 1실 조건입니다. 정확한 총액은 결제 전 확인하며 1인실 추가금은 별도입니다.",
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
      "You cross to Gulangyu by reserved ferry and explore the island on foot.",
      "乘预约好的船上鼓浪屿，岛上步行游览。",
      "예약된 배편으로 구랑위에 건너가 걸어서 둘러봅니다.",
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
        "The route links Yongding's Chengqi Lou area with Nanjing's Tianluokeng cluster; entry inside individual buildings can vary.",
        "路线串起永定承启楼一带和南靖田螺坑土楼群；不一定每座楼都能进去参观。",
        "융딩 청치러우 일대와 난징 톈뤄컹 토루 군락을 함께 둘러봅니다. 내부 입장 가능 여부는 건물마다 다를 수 있습니다.",
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
          "Day 4 is for Quanzhou's old city and maritime heritage, before you head back to Xiamen.",
          "第 4 天集中游览泉州古城与海丝文化，第二天返回厦门。",
          "4일 차에 취안저우 고성과 해상 문화유산을 본 뒤 다음 날 샤먼으로 돌아갑니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 9743, usdPerPerson: 1499, publishedPrice: { currency: "USD", amountPerPerson: 1499 } },
      { travelers: 6, cnyPerPerson: 9543, publishedPrice: { currency: "USD", amountPerPerson: 1469 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-23",
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
    "Stay a night on Nan'ao and a night in Chaozhou, travelling by private vehicle, with local tips on what to eat; meals themselves are paid separately.",
    "南澳与潮州各住一晚，私车串起海岸、古城与开埠街区；向导会帮你选吃什么，餐费自理。",
    "난아오와 차오저우에서 각각 1박하며 전용 차량으로 해안, 고성과 개항 거리를 잇습니다. 가이드가 식당 고르는 것을 도와 드리며, 식비는 별도입니다.",
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
      "One Chaoshan cultural activity",
      "Shantou's historic port district",
    ],
    [
      "南澳海岸与岛上住宿",
      "潮州古城与广济桥周边",
      "一项潮汕文化体验",
      "汕头开埠街区",
    ],
    [
      "난아오 해안과 섬 숙박",
      "차오저우 고성과 광지교 일대",
      "차오산 문화 체험 한 가지",
      "산터우 개항 역사 지구",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Shantou", "抵达汕头", "산터우 도착"),
      l(
        "Our driver meets you at the station or airport and takes you to your hotel in Shantou. There is no set sightseeing today.",
        "司机在车站或机场接你，专车送到汕头酒店；当天不安排固定游览。",
        "기사가 역이나 공항에서 맞이해 산터우 호텔까지 모셔다 드립니다. 이날은 정해진 관광 일정이 없습니다.",
      ),
    ),
    day(
      2,
      l("Nan'ao coast", "南澳海岸", "난아오 해안"),
      l(
        "Cross Nan'ao Bridge to Changshanwei Lighthouse, Qing'ao Bay, the Tropic of Cancer gate and the listed fish-raft experience, then stay in the Nan'ao sea-view room set out in your written confirmation. Heading out to sea depends on weather and permission.",
        "经南澳大桥前往长山尾灯塔、青澳湾与北回归线自然之门，参加所列鱼排体验，随后入住南澳海景房（以书面确认单为准）。能否出海，要看天气和运营许可。",
        "난아오대교를 건너 창산웨이 등대, 칭아오만과 북회귀선 자연의 문을 보고 명시된 양식장 체험을 한 뒤, 서면 확인서에 적힌 난아오 바다 전망 객실에 숙박합니다. 출항은 날씨와 허가에 따라 달라집니다.",
      ),
    ),
    day(
      3,
      l("Chaozhou Old City", "潮州古城", "차오저우 고성"),
      l(
        "Explore Paifang Street, Jiadi Lane, Guangji Bridge, Kaiyuan Temple, Hanwen Temple and the Thai Buddhist Temple, then join the kung-fu tea or cultural performance set out in your written confirmation, and stay in Chaozhou.",
        "游牌坊街、甲第巷、广济桥、开元寺、韩文公祠与泰佛殿，再参加工夫茶或文化表演（以确认单为准），当晚住潮州。",
        "패방가, 자디샹, 광지교, 개원사, 한원공사와 태불전을 둘러본 뒤 확인서에 적힌 공부차 또는 문화 공연 일정에 참여하고 차오저우에 숙박합니다.",
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
        "Leave time for breakfast or a snack stop at your own cost, with local tips if service hours allow, then transfer to your departure point.",
        "留出自由觅食的时间，餐费自理；如服务时段允许，向导可以给你一些本地建议。随后送往离境地点。",
        "아침이나 간식을 자유롭게 즐길 시간을 두며 식비는 각자 부담입니다. 서비스 시간이 허용하면 현지 추천도 받을 수 있습니다. 이후 출발 지점으로 이동합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in Ctrip 4-Diamond-standard hotels with breakfast, based on twin sharing, including one on Nan'ao and one in Chaozhou. Your written confirmation shows the exact hotel, room type, single supplement and whether your Nan'ao room has a direct sea view.",
    "共 4 晚携程 4 钻标准含早，默认双人同住，其中南澳 1 晚、潮州 1 晚。具体酒店、房型、单房差，以及南澳房间是不是正面海景，都会书面写明发给你。",
    "조식 포함 중국 씨트립 4다이아 기준 4박, 2인 1실이며 난아오 1박과 차오저우 1박을 포함합니다. 정확한 호텔, 객실 유형, 1인실 추가금, 난아오 객실의 정면 바다 전망 여부는 서면으로 보내 드립니다.",
  ),
  serviceNote: l(
    "Included: one private vehicle with bridge tolls and parking, airport or station transfers, the listed admissions and fish-raft or cultural experiences, daily bottled water and basic China-based travel accident insurance. Your quote spells out guide language, service days and vehicle class.",
    "包含一单一车及路桥停车费、机场或车站接送、所列门票与鱼排或文化体验、每日瓶装水及中国境内基础旅游意外险；导游语言、服务日与车型会在报价里另外写明。",
    "전용 차량 한 대와 통행료·주차, 공항·역 이동, 명시된 입장권과 양식장 또는 문화 체험, 생수 및 중국 내 기본 여행상해보험이 포함됩니다. 가이드 언어, 서비스일과 차량은 견적에 따로 적어 드립니다.",
  ),
  exclusions: commonExclusions(
    [
      "All food purchases and restaurant bills",
      "Boat, fish-raft or performance activities not in your written confirmation",
    ],
    ["全部餐饮采购与餐厅账单", "确认单以外的出海、鱼排或演出活动"],
    ["모든 음식 구매와 식당 비용", "확인서에 없는 출항·양식장·공연 체험"],
  ),
  bookingNote: pricingBookingNote(
    "The prices shown above are per person for groups of 2, 4 or 6 travellers. We still confirm the room plan and vehicle class before sending the final total.",
    "上方分别列出 2 人、4 人和 6 人同行的每人起价；最终总价仍按房间数与车型确认。",
    "위 가격은 2명·4명·6명 그룹의 1인 시작가입니다. 최종 총액은 객실 구성과 차량 등급을 확인한 뒤 안내합니다.",
  ),
  heroImage: image(
    chaoshanSlug,
    "hero.webp",
    1600,
    1221,
    l("Guangji Bridge in Chaozhou", "潮州广济桥", "차오저우 광지교"),
    l(
      "Bridge admission or an exterior view—your confirmation shows which is included.",
      "包含登桥票还是外观游览，确认单上会写清楚。",
      "다리 입장과 외관 관람 중 어느 쪽이 포함되는지는 확인서에 적어 드립니다.",
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
        "Nan'ao coast · the island day depends on weather and safe operating conditions",
        "南澳海岸 · 岛上行程要看天气和安全运营条件",
        "난아오 해안 · 섬 일정은 날씨와 안전 운영 조건에 따라 달라집니다",
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
        "Paifang Street · the Chaozhou day pairs the old city with one cultural activity",
        "牌坊街 · 潮州这一天，古城之外再加一项文化体验",
        "패방가 · 차오저우 일정은 고성 관광에 문화 체험 한 가지를 더합니다",
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
      { travelers: 6, cnyPerPerson: 1620, publishedPrice: { currency: "USD", amountPerPerson: 250 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-23",
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
    "Travel from Chengdu to Chongqing by high-speed rail, with a focused day in Leshan, a night in Wulong and a final day trip to the Dazu Rock Carvings.",
    "从成都坐高铁到重庆，乐山用一天看重点，武隆住一晚，最后以大足石刻一日游收尾，串起西南文化主线。",
    "청두에서 충칭까지 고속열차로 이어지는 여정에 러산 하루, 우룽 1박, 대족석각 당일 여행을 담았습니다.",
  ),
  summary: l(
    "Eight-day Chengdu, Leshan, Chongqing and Wulong private tour with seven breakfast-included nights, local transport, train and guided sightseeing.",
    "共 7 晚 4 星标准含早，各地私车出行，成都—重庆坐二等座高铁，四地重点景点由导游带你游览。",
    "조식 포함 4성급 기준 7박, 지역별 전용 차량, 청두-충칭 2등석 열차와 네 지역 가이드 관광이 포함됩니다.",
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
        "Our driver meets you at the airport or station and takes you to your Chengdu hotel. There is no fixed sightseeing today.",
        "司机在成都机场或车站接你，专车送到酒店。当天不安排固定游览。",
        "기사가 청두 공항이나 역에서 맞이해 호텔까지 모셔다 드립니다. 이날은 정해진 관광 일정이 없습니다.",
      ),
    ),
    day(
      2,
      l("Pandas and Chengdu life", "熊猫与成都生活", "판다와 청두의 일상"),
      l(
        "Visit Chengdu Panda Base early, followed by one city-life experience set out in your confirmation. Which pandas you see, and how active they are, can vary.",
        "早场游览成都大熊猫基地，之后安排一项确认单上写明的城市生活体验。能看到哪只熊猫、熊猫是否活跃，要看当天情况。",
        "이른 시간에 판다기지를 둘러본 뒤, 확인서에 적힌 생활 문화 체험 한 가지를 합니다. 어떤 판다를 볼지, 판다가 얼마나 활발할지는 그날 상황에 따라 다를 수 있습니다.",
      ),
    ),
    day(
      3,
      l("Leshan day trip", "乐山一日", "러산 당일 여행"),
      l(
        "Your private vehicle takes you to Leshan to see the Giant Buddha on the land route or by boat, whichever your confirmation names—we can't promise both. River and path access depend on operating conditions.",
        "专车送你去乐山，按确认单上的方式看大佛：走登山游线或坐游船观佛，两种不一定都能安排。水路和步道能否通行，要看运营情况。",
        "전용 차량으로 러산에 가서, 확인서에 적힌 대로 육로 코스나 유람선으로 대불을 봅니다. 두 방식을 모두 한다고 약속드리지는 않으며, 수로와 길 이용은 운영 상황에 따라 달라집니다.",
      ),
    ),
    day(
      4,
      l("Train to Chongqing", "高铁前往重庆", "열차로 충칭 이동"),
      l(
        "Take the second-class high-speed train to Chongqing, with transfers at both stations. After check-in, head out to a selected Chongqing night view if timing and local conditions allow.",
        "坐二等座高铁去重庆，两头车站接送按订单安排。入住后，如果时间和现场条件允许，去看一处重点夜景。",
        "2등석 고속열차로 충칭에 가며, 양쪽 역 이동도 포함됩니다. 체크인 후 시간과 현지 상황이 맞으면 대표 야경 한 곳을 보러 갑니다.",
      ),
    ),
    day(
      5,
      l("Three Natural Bridges", "武隆天生三桥", "우룽 천생삼교"),
      l(
        "Travel to Wulong and visit the Three Natural Bridges, using the scenic transport and lifts named in your confirmation that are running on the day. Overnight in Wulong.",
        "前往武隆，使用确认单列明且当天运行的景区车与电梯游览天生三桥，当晚住武隆。",
        "우룽으로 이동해 천생삼교를 둘러봅니다. 관광지 차량과 엘리베이터는 확인서에 적힌 것 중 당일 운영하는 것을 이용하며, 이날은 우룽에서 숙박합니다.",
      ),
    ),
    day(
      6,
      l(
        "A lighter Wulong morning",
        "武隆轻松游，返回重庆",
        "가벼운 우룽 일정 후 충칭 귀환",
      ),
      l(
        "Choose one light Wulong activity for the season, as set out in your confirmation, then return to Chongqing by private vehicle. We don't squeeze in another major sight when time is short.",
        "按季节选一项确认单上的武隆轻松活动，然后专车返回重庆。时间不够时，不会再硬塞一处大型景区。",
        "계절에 맞는 가벼운 우룽 체험 한 가지를 확인서에 적힌 대로 한 뒤, 전용 차량으로 충칭에 돌아갑니다. 시간이 부족할 때는 큰 관광지를 무리하게 더 넣지 않습니다.",
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
        "Your private vehicle takes you from Chongqing to the Dazu Rock Carvings sites in your confirmation. Visit with your English-speaking guide and return to your Chongqing hotel the same day.",
        "专车从重庆出发，前往确认单上的大足石刻景区，英语导游带你游览，当天回重庆酒店。",
        "충칭에서 전용 차량으로 확인서에 적힌 대족석각 관광지에 가서 영어 가이드와 함께 둘러보고, 당일 충칭 호텔로 돌아옵니다.",
      ),
    ),
    day(
      8,
      l("Depart Chongqing", "重庆送站", "충칭 출발"),
      l(
        "Your private vehicle takes you to the Chongqing airport or railway station. There is no fixed sightseeing today.",
        "专车送你去重庆机场或车站，当天不安排固定游览。",
        "전용 차량으로 충칭 공항이나 역까지 모셔다 드립니다. 이날은 정해진 관광 일정이 없습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Seven four-star-standard nights with breakfast, based on twin sharing. You get the exact hotels, including where you stay in Wulong, plus taxes, room type and single supplement in writing.",
    "共 7 晚 4 星标准含早，默认两人同住一间，武隆住在哪里也会写明。具体酒店、税费、房型和单房差，都会书面发给你确认。",
    "조식 포함 4성급 기준 7박, 2인 1실입니다. 호텔과 우룽 숙박 위치, 세금, 객실 유형, 1인실 추가금은 서면으로 보내 드립니다.",
  ),
  serviceNote: l(
    "Your tour includes private transport, twin-share four-star-standard hotels with breakfast and tax, the listed admissions and scenic transfers, second-class Chengdu–Chongqing rail, private English-speaking guide service, basic China-based travel and health insurance and 24/7 local support. Every paid Wulong and Dazu item is named in your written confirmation.",
    "行程包含全程私车、4 星标准双人同住房含早及税费、所列门票与景区接驳、成都—重庆二等座高铁、私人英语导游、中国境内基础旅游与健康保险及 24/7 当地支持；武隆和大足的付费项目会逐项写进确认单。",
    "이 투어에는 전용 교통, 4성급 기준 2인 1실 숙박과 조식·세금, 명시된 입장권과 관광지 이동, 청두-충칭 2등석 열차, 영어 전용 가이드, 중국 내 기본 여행·건강보험 및 24시간 현지 지원이 포함됩니다. 우룽과 대족의 유료 항목은 확인서에 항목별로 적어 드립니다.",
  ),
  exclusions: commonExclusions(
    [
      "Unlisted Wulong attractions and Chongqing paid activities",
    ],
    ["未列明的武隆景点与重庆付费活动"],
    ["명시되지 않은 우룽 관광지와 충칭 유료 체험"],
  ),
  bookingNote: pricingBookingNote(
    "The published per-person starting prices apply to 2 or 6 travellers; the single-room supplement and other group sizes require a separate quote.",
    "页面所示每人起价适用于 2 人或 6 人同行；单房差与其他人数需单独询价。",
    "표시된 1인 시작가는 2명 또는 6명 기준이며 1인실 추가금과 다른 인원은 별도 견적입니다.",
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
      "The night view we choose depends on your arrival time, local access and crowds.",
      "具体去哪处夜景，要看抵达时间、现场开放和客流情况。",
      "야경 장소는 도착 시간, 현장 접근과 혼잡 상황을 보고 정합니다.",
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
        "Your route begins in Chengdu; how active the pandas are can vary.",
        "行程从成都开始；熊猫活不活跃，要看当天情况。",
        "여정은 청두에서 시작하며, 판다 활동은 날마다 다를 수 있습니다.",
      ),
    ),
    image(
      chengduChongqingSlug,
      "gallery-2.webp",
      1600,
      1200,
      l("Leshan Giant Buddha", "乐山大佛", "러산대불"),
      l(
        "Your confirmation names the land route or the boat view; we can't promise both.",
        "确认单会写明走登山游线还是坐游船，两种不一定都能安排。",
        "육로와 유람선 중 어느 쪽인지 확인서에 적어 드리며, 둘 다 한다고 약속드리지는 않습니다.",
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
          "We check which paths, lifts and scenic transport are open on your travel date.",
          "我们会按你的出行日期，核对步道、电梯和景区车是否开放。",
          "여행 날짜에 맞춰 탐방로, 엘리베이터와 관광지 차량 운영 여부를 확인합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 9880, usdPerPerson: 1520, publishedPrice: { currency: "USD", amountPerPerson: 1520 } },
      { travelers: 6, cnyPerPerson: 9680, publishedPrice: { currency: "USD", amountPerPerson: 1490 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-23",
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
      "Lion dance, martial arts or craft culture, as booked",
    ],
    [
      "广州新旧城区",
      "顺德园林与美食街区",
      "佛山祖庙",
      "醒狮、武术或手艺文化，按预订安排",
    ],
    [
      "광저우 신구 도심",
      "순더 정원과 음식 거리",
      "포산조묘",
      "예약된 사자춤·무술·공예 문화",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Guangzhou", "抵达广州", "광저우 도착"),
      l(
        "Our driver meets you at the airport or station and takes you to your Guangzhou hotel. There is no fixed sightseeing today.",
        "司机在广州机场或车站接你，私车送你到酒店。当天不安排固定游览。",
        "기사가 광저우 공항이나 역에서 맞이해 호텔까지 모셔다 드립니다. 이날은 정해진 관광 일정이 없습니다.",
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
        "Visit Qinghui Garden, Happy Coast and Huagai Road. You choose and pay for local dishes yourself; your guide or driver-guide can help with recommendations and ordering.",
        "游览清晖园、欢乐海岸与华盖路。吃什么当地菜由你自己选、自己付；向导或司机兼向导可以帮你推荐和点菜。",
        "청회원, 해피코스트와 화가이루를 둘러봅니다. 현지 음식은 원하는 대로 골라 직접 결제하시며, 가이드 또는 기사 겸 가이드가 추천과 주문을 도와 드릴 수 있습니다.",
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
        "Visit Foshan Ancestral Temple for the lion-dance or martial-arts performance on your booking, walk Lingnan Tiandi and continue to Nanfeng Ancient Kiln. Show times depend on the day's schedule.",
        "游览佛山祖庙，观看所订的醒狮或武术表演，再逛岭南天地，然后前往南风古灶。演出时间以当天安排为准。",
        "포산조묘에서 예약된 사자춤 또는 무술 공연을 보고, 링난톈디를 거닌 뒤 남풍고조로 갑니다. 공연 시간은 당일 일정에 따라 달라질 수 있습니다.",
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
        "Visit Shamian and Beijing Road, then transfer to the airport or station. If you leave early, the order may change or the time at each stop may be shorter.",
        "游览沙面和北京路，之后送你去机场或车站。如果出发时间较早，两处的顺序或停留时间会相应调整。",
        "사몐과 베이징루를 둘러본 뒤 공항이나 역으로 모셔다 드립니다. 출발이 이르면 방문 순서나 머무는 시간을 조정합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four breakfast-included nights in the same Ctrip 4-Diamond-standard Guangzhou hotel, based on twin sharing. We confirm the exact hotel, location, room type and single supplement with you before payment.",
    "广州同一家携程 4 钻标准酒店连住 4 晚含早，默认双人同住。具体酒店、位置、房型和单房差，付款前都会跟你确认。",
    "광저우의 같은 중국 씨트립 4다이아 기준 호텔에서 조식 포함 4박, 2인 1실입니다. 정확한 호텔, 위치, 객실 유형과 1인실 추가금은 결제 전에 확인해 드립니다.",
  ),
  serviceNote: l(
    "This package includes one private vehicle, airport transfers, four breakfast-included nights in the same Guangzhou hotel, Qinghui Garden, Foshan Ancestral Temple, Nanfeng Ancient Kiln, the lion-dance performance as booked, bottled water and basic local travel accident insurance. We confirm guide language and service days with you separately; lunch and dinner are not included.",
    "这个套餐包含一辆专属用车、机场接送、广州同一家酒店 4 晚含早、清晖园、佛山祖庙、南风古灶、所订的醒狮表演、瓶装水和当地基础旅游意外险。导游语言和服务日会另外跟你确认；午餐、晚餐不含。",
    "이 패키지에는 전용 차량 1대, 공항 이동, 광저우 한 호텔 조식 포함 4박, 청회원·포산조묘·남풍고조, 예약된 사자춤 공연, 생수와 현지 기본 여행 상해보험이 포함됩니다. 가이드 언어와 서비스일은 따로 확인해 드리며, 중식과 석식은 포함되지 않습니다.",
  ),
  exclusions: commonExclusions(
    [
      "All restaurant bills and food purchases",
      "Canton Tower admission and Pearl River cruise, unless listed in your booking",
    ],
    ["全部餐厅账单与食物采购", "未列明的广州塔登塔与珠江夜游"],
    ["모든 식당 비용과 음식 구매", "예약에 명시되지 않은 광저우타워 입장과 주강 유람선"],
  ),
  bookingNote: pricingBookingNote(
    "The prices shown above are per person for groups of 2, 4 or 6 travellers. We still confirm rooms and vehicle class before sending the final total.",
    "上方分别列出 2 人、4 人和 6 人同行的每人起价；最终总价仍按房间与车型确认。",
    "위 가격은 2명·4명·6명 그룹의 1인 시작가입니다. 최종 총액은 객실과 차량 등급을 확인한 뒤 안내합니다.",
  ),
  faq: [{
    question: l(
      "Does this tour include Shenzhen, Hong Kong or Macau?",
      "这条团包含深圳、香港或澳门吗？",
      "이 투어에 선전·홍콩·마카오가 포함되나요?",
    ),
    answer: l(
      "No. The five days stay in mainland Guangdong: four nights in Guangzhou, with day trips to Shunde and Foshan. The listed arrival and departure transfers are at the confirmed Guangzhou airport or station, not a border crossing. Shenzhen, Hong Kong, Macau and cross-border transfers need a separately checked route and quote.",
      "不包含。这 5 天都在广东境内：广州连住 4 晚，顺德和佛山各走日游。已列接送是在确认的广州机场或车站，不含口岸接送。深圳、香港、澳门及跨境接送，都要另核对路线并报价。",
      "포함되지 않습니다. 이 5일 일정은 중국 본토 광둥성에서 진행되며 광저우 4박과 순더·포산 당일 여행으로 구성됩니다. 기본 픽업·샌딩은 확정된 광저우 공항 또는 역 기준이고 국경 이동은 포함되지 않습니다. 선전·홍콩·마카오와 국경 이동은 별도 동선과 견적이 필요합니다.",
    ),
  }],
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
      "Guangzhou's skyline; tower admission is separate unless your booking includes it.",
      "广州城市天际线；登塔不含在内，订单写明的除外。",
      "광저우 스카이라인 · 타워 입장은 예약에 넣은 경우가 아니면 별도입니다.",
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
        "광저우 일정에서는 골라 둔 역사 건축과 현대 도시를 함께 둘러봅니다.",
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
        "顺德这一天，看园林，吃什么自己选。",
        "순더에서는 정원을 둘러보고, 먹을 음식은 자유롭게 고릅니다.",
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
          "For your Foshan day, we confirm the exact performance and craft stop in advance.",
          "佛山这一天的具体演出和手艺点，我们会提前跟你确认。",
          "포산 일정의 공연과 공예 장소는 미리 확정해 드립니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 2, cnyPerPerson: 4095, usdPerPerson: 630, publishedPrice: { currency: "USD", amountPerPerson: 630 } },
      { travelers: 4, cnyPerPerson: 3185, usdPerPerson: 490, publishedPrice: { currency: "USD", amountPerPerson: 490 } },
      { travelers: 6, cnyPerPerson: 2985, publishedPrice: { currency: "USD", amountPerPerson: 460 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-26",
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
      "借助索道的山上路线",
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
        "Our driver meets you at Huangshan North station or the airport and takes you to your hotel at the foot of the mountain. We add a light visit to Tunxi only if your arrival time allows.",
        "司机在黄山北站或机场接你，专车送到山下酒店。只有抵达时间来得及，才会加一段轻松的屯溪游览。",
        "기사가 황산북역이나 공항에서 맞이해 산 아래 호텔까지 모셔다 드립니다. 도착 시간에 여유가 있을 때만 툰시를 가볍게 둘러봅니다.",
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
        "Take the scenic bus and uphill cableway, then follow a route planned around your walking ability and open paths. You stay at the named hotel on the mountain.",
        "乘景区车和上行索道，再根据你的步行能力和开放的步道安排山上路线，之后入住山上指定的酒店。",
        "관광지 버스와 상행 케이블카를 이용해 오른 뒤, 보행 능력과 열려 있는 길에 맞춰 산악 동선을 걷고 산 위 지정 호텔에서 숙박합니다.",
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
        "You try for sunrise at a viewpoint only if the weather, access and how you feel allow. Then take the downhill cableway and continue to Hongcun for a slower afternoon. Sunrise and the sea of clouds depend on the day.",
        "只有天气、景区开放和身体状况都允许，才去日出观景点；之后坐下行索道下山，下午慢慢逛宏村。日出和云海要看当天情况。",
        "날씨, 접근 여건, 몸 상태가 허락할 때만 일출 전망대에 가 봅니다. 이어 하행 케이블카로 내려와 오후에는 홍춘을 천천히 둘러봅니다. 일출과 운해를 볼 수 있을지는 그날 상황에 따라 다릅니다.",
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
        "Explore Xidi, Nanping and Guanlu with your private guide, then continue to Tangmo for the fourth night. The exact walking order depends on opening times and local access.",
        "私家导游陪你游览西递、南屏和关麓，之后前往唐模住第 4 晚。具体先走哪里，按开放时间和当地通行情况来定。",
        "전용 가이드와 함께 서제, 난핑, 관루를 둘러본 뒤 탕모로 가서 네 번째 밤을 보냅니다. 어디부터 걸을지는 운영 시간과 현지 통행 상황을 보고 정합니다.",
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
        "Continue through Tangmo and Chengkan, then visit the Tangyue Memorial Archways and Bao Garden before your private transfer to Huangshan North station or the airport.",
        "继续游览唐模和呈坎，再去棠樾牌坊群和鲍家花园，之后专车送你到黄山北站或机场。",
        "탕모와 정감을 둘러보고 탕웨 패방군과 포가화원을 방문한 뒤 전용 차량으로 황산북역이나 공항까지 모셔다 드립니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights with breakfast, based on twin sharing: one below Huangshan, one at a named hotel on the mountain, one in Hongcun and one in Tangmo. You get the hotel grade, room type, luggage handling on the mountain and the single supplement in writing.",
    "共 4 晚含早，按两人同住一间计：黄山山下、山上指定酒店、宏村和唐模各住 1 晚。酒店等级、房型、山上行李怎么处理和单房差，都会书面发给你确认。",
    "조식 포함 4박, 2인 1실 기준으로 황산 아래, 산 위 지정 호텔, 홍춘, 탕모에서 각 1박합니다. 호텔 등급, 객실, 산 위 짐 처리 방법과 1인실 추가 요금은 서면으로 보내 드립니다.",
  ),
  serviceNote: l(
    "The published package includes a private English-speaking guide, private vehicle, all listed admissions, breakfast and lunch on Days 2–5. Your confirmation lists scenic buses, uphill and downhill cableways and mountain luggage handling separately. Cableways cut the climbing but not the stairs, and seasonal sections may close.",
    "页面所示套餐包含私家英语导游、专属用车、所列景点门票、酒店早餐及第 2—5 天午餐。景区车、上下行索道和山上行李处理，会在确认单里逐项单独列明。索道能减少爬坡，但台阶还是要走；季节性区域可能关闭。",
    "공개된 패키지에는 영어 전용 가이드, 전용 차량, 명시된 모든 입장권, 조식과 2~5일 차 중식이 포함됩니다. 관광지 버스, 상·하행 케이블카, 산 위 짐 처리는 확인서에 따로 적어 드립니다. 케이블카로 오르막은 줄어도 계단은 남으며, 계절 구간은 닫힐 수 있습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Porter service, and any luggage transfer not in your confirmation",
      "Dinner and meals not specifically listed",
    ],
    ["确认单以外的行李搬运与挑夫服务", "晚餐及未明确列出的餐食"],
    ["확인서에 없는 짐 운반 서비스", "석식과 명시되지 않은 식사"],
  ),
  bookingNote: pricingBookingNote(
    "The 4- and 6-traveller per-person starting prices are shown above. Other group sizes need a quote; we reconfirm rooms, dates and vehicle before booking.",
    "上方列出 4 人和 6 人同行的每人起价。其他人数需单独询价；预订前仍须重新确认房间、日期与车型。",
    "위에는 4명과 6명 기준 1인 시작가가 표시됩니다. 다른 인원은 별도 견적이며 예약 전 객실, 날짜와 차량을 다시 확인합니다.",
  ),
  heroImage: image(
    huangshanSlug,
    "hero.webp",
    1920,
    1440,
    l("Granite peaks of Huangshan", "黄山花岗岩峰林", "황산 화강암 봉우리"),
    l(
      "Weather and seasonal access shape the mountain route.",
      "山上怎么走，要看天气和当季开放情况。",
      "산악 동선은 날씨와 계절별 개방 상황에 따라 달라집니다.",
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
        "After the descent, you have a slower afternoon in Hongcun.",
        "下山后，留一个下午慢慢逛宏村。",
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
          "Which viewpoints you visit depends on the route being open and suitable.",
          "去哪些观景点，要看游线是否开放、是否适合你。",
          "어느 전망지에 갈지는 동선 개방 여부와 여행객에게 맞는지를 보고 정합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage([
      { travelers: 4, cnyPerPerson: 4998, usdPerPerson: 769, publishedPrice: { currency: "USD", amountPerPerson: 769 } },
      { travelers: 6, cnyPerPerson: 4798, publishedPrice: { currency: "USD", amountPerPerson: 740 } },
    ]),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-23",
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
      "Hands-on ceramic making",
      "Two nights among Wuyuan villages",
      "Sanqingshan and Wangxian Valley",
    ],
    [
      "景德镇御窑与陶瓷内容",
      "亲手体验陶瓷制作",
      "婺源村落连住两晚",
      "三清山与望仙谷夜景",
    ],
    [
      "징더전 가마와 도자기 박물관",
      "직접 해 보는 도자기 만들기",
      "우위안 마을에서 2박",
      "삼청산과 왕셴구 야경",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Jingdezhen", "抵达景德镇", "징더전 도착"),
      l(
        "Your private guide and driver meet you at the station, then you start the Jingdezhen ceramic route set out in your written confirmation. Taoxichuan is added only when your arrival time and its opening hours allow.",
        "私家导游和司机在车站接你，随后按书面确认单开始景德镇陶瓷路线。只有抵达时间和开放时段都允许时，才会加上陶溪川。",
        "전용 가이드와 기사가 역에서 맞이하고, 서면 확인서에 적힌 징더전 도자 일정을 시작합니다. 도착 시간과 운영 시간이 허락할 때만 타오시촨을 추가합니다.",
      ),
    ),
    day(
      2,
      l(
        "Jingdezhen ceramics, then Wuyuan",
        "景德镇陶瓷，再去婺源",
        "징더전 도자 일정 후 우위안",
      ),
      l(
        "Finish the museum, kiln and ceramic-making stops, then travel by private vehicle to Wuyuan for the first of two nights there. Before you book, we confirm the materials and what happens to your finished piece.",
        "参观博物馆和窑址、完成陶瓷制作体验后，乘专车前往婺源，入住两晚中的第 1 晚。材料和成品怎么处理，预订前都会写清楚。",
        "박물관, 가마, 도자기 제작 체험을 마친 뒤 전용 차량으로 우위안에 가서 2박 중 첫날 밤을 보냅니다. 재료와 완성품 처리 방식은 예약 전에 확인해 드립니다.",
      ),
    ),
    day(
      3,
      l("Wuyuan village day", "婺源村落一日", "우위안 마을 하루"),
      l(
        "Explore the Wuyuan villages on the route in your written confirmation, rather than trying to fit every village into one day. Cableways and seasonal scenery depend on the final route and actual conditions.",
        "按确认单上的婺源村落路线游览，不把所有村子都压进同一天。索道和季节景观，要看最终路线和实际情况。",
        "확인서에 적힌 우위안 마을 동선을 따라 둘러보며, 모든 마을을 하루에 몰아넣지 않습니다. 케이블카와 계절 풍경은 최종 동선과 실제 상황에 따라 달라질 수 있습니다.",
      ),
    ),
    day(
      4,
      l("Sanqingshan mountain day", "三清山山岳一日", "삼청산 산악 일정"),
      l(
        "Travel to Sanqingshan for the cableway-assisted mountain route in your written confirmation, then stay near the mountain. The exact viewpoints depend on the weather, which trails are open and how much walking suits you.",
        "前往三清山，按确认单走索道辅助的山岳路线，之后入住山下或周边酒店。具体能到哪些观景点，要看天气、步道开放情况和你的步行能力。",
        "삼청산으로 이동해 확인서에 적힌 케이블카 이용 산악 동선을 둘러본 뒤 산 인근에 숙박합니다. 어느 전망지까지 갈지는 날씨, 개방 구간, 걸으실 수 있는 정도에 따라 달라집니다.",
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
        "Leave the Sanqingshan area for Wangxian Valley and enter in the afternoon-to-evening window on your ticket, then stay inside the scenic area or nearby, as booked. Expect a developed scenic area with a night-time experience, not an untouched ancient village.",
        "从三清山周边前往望仙谷，按确认的票种，把下午到亮灯时段留给这里，之后入住订好的景区内或附近住宿。说实话，这是商业化的夜游景区，不是原生态古村。",
        "삼청산 지역에서 왕셴구로 이동해 예약된 오후-저녁 입장 시간에 둘러본 뒤, 관광지 안 또는 인근의 예약 숙소에서 숙박합니다. 이곳은 옛 모습 그대로의 고촌이 아니라 개발된 야간 관광지입니다.",
      ),
    ),
    day(
      6,
      l("Depart from Shangrao", "送上饶站", "상라오역 출발"),
      l(
        "Your private vehicle takes you to Shangrao station. We add a light stop only when your train time leaves a safe margin.",
        "专车送你去上饶站。只有车次时间留得出充足余量，才会加一个轻松的小活动。",
        "전용 차량으로 상라오역까지 모셔다 드립니다. 열차 시간까지 충분한 여유가 있을 때만 가벼운 방문을 추가합니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five breakfast-included nights based on twin sharing: one in Jingdezhen, two in Wuyuan, one near Sanqingshan and one inside or near Wangxian Valley. You get the hotel grade, room type, exact locations and single supplement in writing.",
    "共 5 晚含早，默认双人同住：景德镇 1 晚、婺源 2 晚、三清山周边 1 晚、望仙谷内或附近 1 晚。酒店等级、房型、具体位置和单房差，都会书面发给你确认。",
    "조식 포함 5박, 2인 1실 기준으로 징더전 1박, 우위안 2박, 삼청산 인근 1박, 왕셴구 안 또는 인근 1박입니다. 호텔 등급, 객실, 정확한 위치와 1인실 추가금은 서면으로 보내 드립니다.",
  ),
  serviceNote: l(
    "The package includes a private English-speaking guide, private vehicle, hotel breakfast, listed admissions, the ceramic experience and basic local travel accident insurance. Your written confirmation sets out the Wuyuan route, Sanqingshan ticket and cableways, Wangxian admission, studio materials and what happens to your finished piece.",
    "套餐包含私家英语导游、专属用车、酒店早餐、所列门票、陶瓷体验和当地基础旅游意外险。婺源路线、三清山门票与索道、望仙谷门票、工作室材料，以及陶瓷成品怎么处理，都会在确认单上写清楚。",
    "패키지에는 영어 전용 가이드, 전용 차량, 호텔 조식, 명시된 입장권, 도자기 체험과 현지 기본 여행 상해보험이 포함됩니다. 우위안 동선, 삼청산 입장권과 케이블카, 왕셴구 입장, 공방 재료와 완성품 처리 방식은 확인서에 적어 드립니다.",
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
      "From afternoon into the evening lights, in a developed scenic area.",
      "从下午游览到亮灯时段，这里是商业化景区。",
      "개발된 관광지로, 오후부터 저녁 조명이 켜질 때까지 둘러봅니다.",
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
        "Your first two days centre on Jingdezhen, including a genuine half-day making session.",
        "前两天以景德镇为主，并留出真正的半天动手制作。",
        "징더전에서 2박하며, 그중 반나절은 직접 만들어 보는 시간입니다.",
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
          "Seasonal displays vary; the route focuses on one village instead of rushing through several.",
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
    "冬季限定路线，天气备用方案提前写清",
    "겨울 한정 코스, 날씨 대체 일정도 미리 마련",
  ),
  lede: l(
    "Start with a beginner ski lesson, head for the North Slope when the weather allows, then finish among Yanji's markets and neighbourhoods. We confirm each snow activity and language arrangement separately.",
    "先上一节初学滑雪课，天气允许时前往北坡，最后逛延吉的市场和街区。每项雪上活动和语言服务，我们都会单独确认。",
    "초급 스키 수업으로 시작해 날씨가 허락하면 북파에 가고, 옌지의 시장과 거리로 여정을 마무리합니다. 설상 체험과 언어 서비스는 항목별로 따로 확인해 드립니다.",
  ),
  summary: l(
    "Six-day Changbaishan and Yanji winter private tour with five breakfast-included nights, snow activities and winter-equipped road transfers.",
    "共 5 晚冬季含早：长白山度假区 2 晚、北坡周边或二道白河 1 晚、延吉 2 晚，并安排适合冬季路况的私车。",
    "조식 포함 겨울 5박으로 창바이산 리조트 2박, 북파 인근 또는 얼다오바이허 1박, 옌지 2박과 겨울 도로에 맞는 전용 차량으로 구성됩니다.",
  ),
  highlights: lists(
    [
      "Beginner ski lesson",
      "North Slope day, weather permitting",
      "One seasonal snow or rime activity",
      "Yanji markets and Korean-Chinese culture",
    ],
    [
      "初学滑雪课",
      "北坡机会日，视天气而定",
      "一项季节性雪地或雾凇活动",
      "延吉市场与朝鲜族文化",
    ],
    [
      "초급 스키 수업",
      "날씨를 보고 가는 북파 일정",
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
        "Your winter-equipped vehicle meets you at Changbaishan airport or station and takes you to the resort hotel. The day is yours to settle in and check your clothing and equipment.",
        "冬季车辆在长白山机场或车站接你，送你到度假区酒店。当天主要是入住、适应天气和检查装备。",
        "창바이산 공항이나 역에서 겨울 장비를 갖춘 차량을 만나 리조트 호텔로 이동합니다. 이날은 날씨에 적응하고 복장과 장비를 점검하는 데 시간을 씁니다.",
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
        "Take one age-appropriate beginner lesson, then spend the rest of the time at your family's pace. Your confirmation lists the lift ticket, ski or snowboard equipment, helmet, instructor language, duration and eligible ages separately.",
        "先上一节适龄的初学课，其余时间按你们一家的节奏自由活动。雪票、双板或单板雪具、头盔、教练语言、时长和适用年龄，确认单上都会分别写明。",
        "연령에 맞는 초급 강습을 한 번 받고, 남은 시간은 가족의 속도대로 보냅니다. 리프트권, 스키 또는 보드 장비, 헬멧, 강습 언어, 시간과 연령은 확인서에 항목별로 적어 드립니다.",
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
        "We set out for the North Slope only when the roads and scenic area are open, and whether Tianchi is visible depends on the day. If wind, snow or closures shut the route, we switch to the alternative agreed in advance. Tonight you stay near the North Slope or in Erdaobaihe.",
        "只在道路和景区开放时前往北坡；能否看到天池，要看当天情况。如遇风雪或封闭，就改走提前确认的备用方案。当晚住北坡周边或二道白河。",
        "도로와 관광지가 운영할 때만 북파를 방문합니다. 천지를 볼 수 있을지는 당일 상황에 따라 다릅니다. 강풍, 폭설 또는 통제로 길이 막히면 미리 합의한 대체 일정으로 진행합니다. 숙박은 북파 인근 또는 얼다오바이허입니다.",
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
        "Pick a rime drift or a safer snow activity, only when the season and safety conditions allow, then continue to Yanji by winter-equipped private vehicle. You get the activity's age requirement, duration and cancellation rule in writing.",
        "季节和安全条件都满足时，才选择雾凇漂流或更安全的雪地活动，之后乘冬季车辆前往延吉。活动的年龄要求、时长和取消规则，都会书面写明。",
        "계절과 안전 조건이 맞을 때만 상고대 래프팅이나 더 안전한 설상 활동을 고르고, 겨울 장비를 갖춘 차량으로 옌지에 갑니다. 체험 연령, 시간과 취소 규정은 서면으로 보내 드립니다.",
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
        "Visit the morning market or a local market, one Korean-Chinese cultural venue and selected city streets. Meals stay flexible and at your own cost, with guidance available if you'd like it.",
        "游览水上市场或本地市场、一处朝鲜族文化点和城市街区。吃什么由你们自由选择，费用自理，向导可以帮忙。",
        "아침 시장이나 현지 시장, 조선족 문화 장소 한 곳과 도시 거리를 둘러봅니다. 식사는 자유롭게 고르고 비용은 직접 내시며, 가이드가 도와 드릴 수 있습니다.",
      ),
    ),
    day(
      6,
      l("Depart Yanji", "延吉送机或送站", "옌지 출발"),
      l(
        "Your private vehicle takes you to Yanji airport or station. There is no fixed sightseeing today.",
        "专车送你去延吉机场或车站，当天不安排固定游览。",
        "전용 차량으로 옌지 공항이나 역까지 모셔다 드립니다. 이날은 고정 관광 일정이 없습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five nights with breakfast, based on twin sharing: two at a named Changbaishan resort hotel, one near the North Slope or in Erdaobaihe, and two in Yanji. We send you the brand, room type, breakfast, hot-spring access and single supplement in writing.",
    "共 5 晚含早，按双人同住计：长白山度假区指定品牌酒店 2 晚、北坡周边或二道白河 1 晚、延吉 2 晚。酒店品牌、房型、早餐、温泉权益和单房差，都会书面发给你确认。",
    "조식 포함 5박, 2인 1실 기준입니다. 지정 창바이산 리조트 2박, 북파 인근 또는 얼다오바이허 1박, 옌지 2박으로 묵습니다. 브랜드, 객실, 조식, 온천 이용과 1인실 추가금은 서면으로 보내 드립니다.",
  ),
  serviceNote: l(
    "We cost the English-guide days and the ski instructor's language once your group is confirmed. Your confirmation then lists each item: winter vehicle safety equipment, airport transfer, resort–North Slope–Yanji transport, North Slope admission and scenic buses, lift ticket, equipment, helmet, lesson, hot spring, drift or snow activity, and the cancellation rule for each. A general 'unlimited skiing' label does not by itself mean any of these are included.",
    "英语导游服务日与雪场教练语言，会在确认同行信息后核算。确认单会逐项写明：冬季车型安全配置、机场接机、度假区—北坡—延吉用车、北坡门票与景区车、雪票、雪具、头盔、课程、温泉、漂流或雪地活动，以及各项取消规则。“无限滑雪”这类概括说法，不代表以上项目都自动包含。",
    "영어 가이드 일정과 스키 강습 언어는 일행을 확인한 뒤 비용을 산정합니다. 확인서에는 겨울 차량 안전 장비, 공항 이동, 리조트-북파-옌지 차량, 북파 입장·관광지 버스, 리프트권, 장비, 헬멧, 강습, 온천, 래프팅 또는 설상 체험과 각 취소 규정을 하나하나 적어 드립니다. '무제한 스키' 같은 표현만으로 이 항목들이 모두 포함되는 것은 아닙니다.",
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
      "Tianchi · visibility varies from day to day",
      "天池 · 能否看到，要看当天情况",
      "천지 · 볼 수 있을지는 당일 상황에 따라 다름",
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
          "Yanji's streets show the city's Korean-Chinese culture, while meals stay your own choice.",
          "延吉街区里能看到朝鲜族文化，吃什么由你自己选。",
          "옌지 거리에서 조선족 문화를 만나고, 식사는 자유롭게 고릅니다.",
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
