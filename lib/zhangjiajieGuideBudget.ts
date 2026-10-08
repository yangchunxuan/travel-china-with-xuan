import type { HomegroundLocale } from "./homegroundI18n";
import { getLocalizedPrivateTourProduct, getPrivateTourPaths } from "./privateTourProducts";
import { getZhangjiajiePrivateTourPublicPricing } from "./zhangjiajiePrivateTourPreview";
import { formatPrivateGuidePrice, privateGuideHours, privateGuidePeakPrice, privateGuideRates, privateGuideServicePath } from "./privateGuideServices";
import { zhangjiajieTourComparisonHref } from "./zhangjiajieTourComparison";

const l = (en: string, zh: string, ko: string) => ({ en, zh, ko });

const copy = {
  eyebrow: l("Budget & service", "预算与服务", "예산과 서비스"),
  title: l("What does a Zhangjiajie trip cost?", "张家界旅行需要多少预算？", "장가계 여행 비용은 얼마나 들까요?"),
  intro: l(
    "Choose who arranges the trip before comparing prices. A guide's daily fee and a tour's per-person price cover different things; neither is the complete cost of an independent trip.",
    "先选谁来安排旅行，再比较价格。导游按天收费，套餐按人收费，包含项目不同；这两个数字都不能直接当作自由行的完整预算。",
    "누가 여행을 준비할지 먼저 정한 뒤 가격을 비교하세요. 가이드의 하루 요금과 투어의 1인 요금은 포함 범위가 다릅니다. 어느 쪽도 자유여행 전체 예산을 뜻하지 않습니다.",
  ),
  services: [
    {
      id: "independent",
      title: l("Arrange it yourself", "自己安排自由行", "직접 준비하는 자유여행"),
      body: l(
        "Book your own rooms, transfers and tickets. Add park lifts, cableways, meals and any onward travel to your budget. Your total depends on the travel dates, room choices and the exact sights you book.",
        "自行预订住宿、接送和门票，把景区电梯、索道、餐食及后续交通也算进预算。总费用取决于出行日期、房间选择和实际预订的景点。",
        "숙소·이동·입장권을 직접 예약하고, 공원 엘리베이터·케이블카·식사와 다음 도시 이동비도 예산에 더하세요. 총비용은 여행 날짜·객실 선택·실제 예약 관광지에 따라 달라집니다.",
      ),
      action: l("Choose your sightseeing days", "先确定完整游览日", "온전한 관광일 정하기"),
    },
    {
      id: "guide",
      title: l("Hire only an English-speaking guide", "只请英文导游", "한국어 가이드만 이용하기"),
      body: l(
        "Keep your own hotel and transport bookings. The daily rate covers one guide; guest tickets, transport, meals, overtime and any guide-related expenses are confirmed separately.",
        "保留你自己预订的酒店和交通。日费对应一位导游；游客门票、车辆、餐食、超时及导游相关费用需要分别确认。",
        "직접 예약한 숙소와 교통은 그대로 두고 가이드만 이용할 수 있습니다. 하루 요금은 가이드 1명 기준이며, 여행자 입장권·차량·식사·초과 시간과 가이드 관련 경비는 별도로 확인합니다.",
      ),
      action: l("Check the guide service & request a quote", "查看导游服务并询价", "가이드 서비스 확인·견적 문의"),
    },
    {
      id: "package",
      title: l("Book a private-tour package", "选择私家团套餐", "프라이빗 투어 이용하기"),
      body: l(
        "Rooms, private transport, listed admission tickets and guide coverage are arranged to the published route. Check the exact included days and optional costs below; guide service is not continuous throughout every tour.",
        "按公布路线安排住宿、专车、所列门票和指定日期的导游。下面分别列出包含范围和自费项目；套餐并不代表每天、全时段都有导游。",
        "공개 일정에 따라 숙소·전용 차량·명시된 입장권과 지정일 가이드를 준비합니다. 아래에서 포함 날짜와 별도 비용을 확인하세요. 모든 날짜에 종일 가이드가 있는 것은 아닙니다.",
      ),
      action: l("Compare the three routes", "比较三条路线", "세 가지 일정 비교하기"),
    },
  ],
  standardRate: l("Standard reference", "常规参考价", "일반 참고 요금"),
  guideUnit: l(`per guide / day · up to ${privateGuideHours} hours`, `每位导游／天 · 最多${privateGuideHours}小时`, `가이드 1명 / 하루 · 최대 ${privateGuideHours}시간`),
  peak: l("Peak-date reference", "旺季日期参考价", "성수기 날짜 참고 요금"),
  guideConfirmation: l("Confirm the rate, group size and route for your date.", "适用价格、同行人数和路线按日期确认。", "날짜에 적용되는 요금·인원·일정을 확인해 주세요."),
  pricesTitle: l("Three published packages, with their service boundaries", "三条现有套餐，价格与服务范围一起看", "세 가지 공개 상품의 요금과 포함 범위"),
  priceBasis: l("Each amount is per adult, for the group size shown. These are package days, including arrival and departure; use the full sightseeing-day plans above to compare the time on the ground.", "以下均为对应人数下的每位成人参考价。套餐天数包含抵达与离开日；实际游览时间请对照上面的完整游览日方案。", "아래 금액은 표시된 인원으로 여행할 때의 성인 1인 참고 요금입니다. 상품 일수에는 도착·출발일도 포함됩니다. 실제 관광 시간은 위의 온전한 관광일 계획과 비교하세요."),
  two: l("2 adults · per person", "2位成人出行 · 每人", "성인 2명 여행 · 1인"),
  four: l("4 adults · per person", "4位成人出行 · 每人", "성인 4명 여행 · 1인"),
  stay: l("Stay", "住宿", "숙박"),
  guide: l("Guide", "导游", "가이드"),
  tickets: l("Tickets & transfers", "门票与交通", "입장권과 이동"),
  extra: l("Check separately", "另行确认", "별도 확인"),
  routeAction: l("View this route & request a quote", "查看这条路线并询价", "일정 확인·견적 문의"),
  finalNote: l(
    "Reference prices do not confirm availability. Give us your dates, adult and child counts, room needs and chosen sights; we confirm hotels, beds, transport, tickets, guide coverage, payment currency and the final total in writing. Children, single rooms, upgrades and changes outside a route's included weather backup need a separate quote.",
    "参考价不代表当前可订。请提供日期、成人与儿童人数、用房需求和想去的景点；具体酒店、床型、交通、门票、导游范围、付款币种及最终总价会书面确认。儿童、单房、升级及已含天气备选之外的行程调整另行报价。",
    "참고 요금이 현재 예약 가능 여부를 보장하지는 않습니다. 날짜·성인 및 아동 인원·객실 필요·희망 관광지를 알려 주세요. 호텔·침대·교통·입장권·가이드 범위·결제 통화·최종 총액을 서면으로 확인합니다. 아동·1인실·업그레이드와 포함된 날씨 대안 외의 일정 변경은 별도 견적입니다.",
  ),
};

const routes = [
  {
    slug: "zhangjiajie-4-day-private-tour",
    title: l("Classic · 4 days / 3 nights", "经典线 · 4天3晚", "클래식 · 3박 4일"),
    stay: l("3 nights; selected city-hotel tier, two adults sharing one room. Room, beds and breakfast confirmed in writing.", "3晚精选市区酒店档，两位成人同住一间房；具体房间、床型和早餐书面确认。", "시내 호텔 기본 등급 3박, 성인 2명 1실 기준입니다. 객실·침대·조식은 서면으로 확인합니다."),
    guide: l("English-speaking guide on Days 2–3. Day 4 includes private transport; an English-speaking guide costs extra.", "第2、3天含英文导游。第4天含专车，英文导游不在基础价内。", "2·3일 차 영어 가이드 포함. 4일 차는 전용 차량 포함이며 영어 가이드는 기본 요금 밖입니다."),
    tickets: l("Private arrival/departure transfers; adult tickets and standard scenic transport listed in your confirmation. Day 3 chooses Huanglong Cave or Baofeng Lake.", "含私人抵达与离开接送；成人门票与标准景区交通以确认清单为准。第3天黄龙洞或宝峰湖二选一。", "전용 도착·출발 이동 포함. 성인 입장권과 기본 관광지 교통은 확인서의 목록을 따릅니다. 3일 차는 황룡동 또는 보봉호 중 하나입니다."),
    extra: l("Flights and intercity trains; unlisted meals, optional visits, hotel upgrades, single rooms and additional guide service.", "航班与城际列车；未列出的餐食、自选景点、住宿升级、单房及额外导游服务。", "항공편·도시 간 철도, 명시되지 않은 식사·선택 관광·숙소 업그레이드·1인실·추가 가이드 서비스."),
  },
  {
    slug: "zhangjiajie-forest-4-day-private-tour",
    title: l("Forest & Tianmen · 4 days / 3 nights", "森林与天门山 · 4天3晚", "삼림공원·천문산 · 3박 4일"),
    stay: l("3 nights at one Wulingyuan villa or four-star hotel; twin sharing with breakfast.", "武陵源同一家别墅或四星酒店连住3晚，双人同住，含早餐。", "무릉원 빌라 또는 4성급 호텔 한 곳에서 3박, 2인 1실·조식 포함."),
    guide: l("English-speaking guide for all of Day 2 and daytime on Day 3. A 72 Wonder Tower on-site guide is extra.", "第2天全天、第3天白天含英文导游；七十二奇楼现场导游另付。", "2일 차 종일·3일 차 주간 한국어 가이드 포함. 72기루 현장 가이드는 별도 비용입니다."),
    tickets: l("Private vehicle, Forest Park admission and eco-shuttles, Tianmen admission and cableway, ordinary Wonder Tower night entry. The published Tianmen-to-Baofeng weather backup has no extra charge.", "含专车、森林公园门票与环保车、天门山门票与索道、奇楼普通夜间门票；预设天气备选天门山改宝峰湖不加价。", "전용 차량·삼림공원 입장권 및 셔틀·천문산 입장권 및 케이블카·72기루 일반 야간 입장 포함. 정해진 천문산→보봉호 날씨 대안에는 추가 요금이 없습니다."),
    extra: l("Flights and intercity trains; Bailong Elevator, park cableways and Ten-Mile Gallery mini-train; an optional Day 4 cave/lake visit and unlisted meals. These reference prices are for non-holiday dates; confirm holiday departures separately.", "航班与城际列车；百龙天梯、公园内索道、十里画廊小火车；第4天自选洞穴或湖泊及未列出的餐食。参考价适用于非节假日，节假日出行另行确认。", "항공편·도시 간 철도, 백룡 엘리베이터·공원 내 케이블카·십리화랑 미니열차, 4일 차 선택 동굴·호수와 명시되지 않은 식사. 비공휴일 참고 요금이며 공휴일 출발은 별도 확인합니다."),
  },
  {
    slug: "zhangjiajie-furong-fenghuang-7-day-private-tour",
    title: l("Forest, Furong & Fenghuang · 7 days / 6 nights", "森林、芙蓉与凤凰 · 7天6晚", "삼림공원·부용진·봉황 · 6박 7일"),
    stay: l("6 nights with breakfast: Wulingyuan 3, Furong 1, Fenghuang 2. Room count, beds and supplements confirmed in writing.", "含早餐的6晚：武陵源3晚、芙蓉1晚、凤凰2晚。房间数量、床型和补差书面确认。", "조식 포함 6박: 무릉원 3박·부용진 1박·봉황 2박. 객실 수·침대·추가 요금은 서면으로 확인합니다."),
    guide: l("English-speaking guide on Days 2–5. Day 6 is free time without a vehicle or guide; Day 7 is a driver-only station transfer.", "第2至5天含英文导游；第6天自由活动，无车无导游；第7天由司机送站，不含导游。", "2~5일 차 한국어 가이드 포함. 6일 차는 차량·가이드 없는 자유시간이며, 7일 차는 기사만 동행하는 역 이동입니다."),
    tickets: l("Scheduled private transfers, Forest Park admission and eco-shuttles, Ten-Mile Gallery mini-train, ordinary Wonder Tower night entry and first Furong admission. No Tianmen or Grand Canyon Glass Bridge.", "含所列私人接送、森林公园门票与环保车、十里画廊小火车、奇楼普通夜间门票及芙蓉首次入场。不含天门山或大峡谷玻璃桥。", "명시된 전용 이동·삼림공원 입장 및 셔틀·십리화랑 미니열차·72기루 일반 야간 입장·부용진 첫 입장 포함. 천문산·대협곡 유리다리는 포함되지 않습니다."),
    extra: l("Unlisted lifts, cableways, trains and meals; flights, intercity rail, room upgrades and single-room supplements.", "未列出的电梯、索道、小火车及餐食；航班、城际列车、房间升级和单房差。", "명시되지 않은 엘리베이터·케이블카·열차·식사, 항공편·도시 간 철도·객실 업그레이드·1인실 차액."),
  },
] as const;

export function getZhangjiajieGuideBudget(locale: HomegroundLocale) {
  const classic = getZhangjiajiePrivateTourPublicPricing(locale);
  const cityTier = classic.tiers.find((tier) => tier.id === "selected-city-stay");
  if (!cityTier) throw new Error("Missing approved classic city-stay price");
  const localizedCopy = Object.fromEntries(
    Object.entries(copy).filter(([key]) => key !== "services").map(([key, value]) => [key, (value as ReturnType<typeof l>)[locale]]),
  ) as Record<Exclude<keyof typeof copy, "services">, string>;
  return {
    ...localizedCopy,
    services: copy.services.map((service) => ({
      id: service.id, title: service.title[locale], body: service.body[locale], action: service.action[locale],
      href: service.id === "independent" ? "#itinerary-3-days" : service.id === "guide" ? `${privateGuideServicePath[locale]}#guide-enquiry` : zhangjiajieTourComparisonHref(locale),
    })),
    guidePrice: formatPrivateGuidePrice(privateGuideRates.zhangjiajie.standardCny, locale),
    guidePeakPrice: privateGuidePeakPrice("zhangjiajie", locale),
    currencyNote: classic.currencyNote,
    routes: routes.map((route, index) => {
      const product = index === 0 ? undefined : getLocalizedPrivateTourProduct(route.slug, locale);
      const packageId = index === 1 ? "fixed-route-english-guided" : "standard-guided";
      const rows = product?.packages.find((tourPackage) => tourPackage.id === packageId)?.rows;
      const priceFor = (adults: 2 | 4) => {
        if (index === 0) return cityTier.formattedPrice;
        const row = rows?.find((row) => row.travelers === adults);
        if (!row) throw new Error(`Missing ${adults}-adult published price for ${route.slug}`);
        return row.formatted;
      };
      return {
        slug: route.slug, title: route.title[locale], stay: route.stay[locale], guide: route.guide[locale], tickets: route.tickets[locale], extra: route.extra[locale],
        href: getPrivateTourPaths(route.slug)[locale], twoPrice: priceFor(2), fourPrice: priceFor(4),
        validity: index === 0 ? {
          from: classic.validFrom, until: classic.validUntil, fromLabel: classic.validFromLabel, untilLabel: classic.validUntilLabel,
          label: l("Classic reference-price window; other dates need a fresh quote.", "经典线参考价有效期；其他日期需重新报价。", "클래식 참고 요금 적용 기간. 그 외 날짜는 새 견적이 필요합니다.")[locale],
        } : undefined,
      };
    }),
  };
}
