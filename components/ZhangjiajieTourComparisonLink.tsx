import Link from "next/link";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import styles from "./ZhangjiajieTourComparisonLink.module.css";

const routes = ["classic", "forest", "ancientTowns"] as const;
type ZhangjiajieComparisonRoute = (typeof routes)[number];

const copy = {
  en: {
    title: "Glass Bridge, one stay base, or ancient towns?",
    intro: "The two four-day routes start and finish in Zhangjiajie. Seven days continues to Furong Town and Fenghuang and ends at Fenghuang Ancient City Railway Station. A return to Zhangjiajie needs its route and quote agreed in writing before payment.",
    current: "You’re viewing this route",
    headings: ["Classic · 4 days", "Forest · 4 days", "Furong & Fenghuang · 7 days"],
    rows: [
      ["Sightseeing time", "3 sightseeing days, Days 2–4; the last day is checked against your departure.", "2 full sightseeing days, Days 2–3; Day 2 is roughly 10–11 hours door to door, including a Golden Whip Stream walk. Arrival and departure are separate.", "2 full Forest Park days, then towns on Days 4–5 and a free day in Fenghuang on Day 6."],
      ["Glass Bridge & Tianmen", "Grand Canyon Glass Bridge on Day 3; Tianmen Mountain on Day 4.", "No Grand Canyon Glass Bridge. Tianmen Mountain on Day 3, or Baofeng Lake in bad weather.", "Neither the Grand Canyon Glass Bridge nor Tianmen Mountain is in the published route."],
      ["Forest Park transport", "The route uses the Bailong Elevator and a park cableway; included ticket items are confirmed in writing.", "Park shuttles included; the Bailong Elevator, park cableways and Ten-Mile Gallery mini-train are optional extras.", "Park shuttles and Ten-Mile Gallery mini-train included; unlisted cableways and the Bailong Elevator are extra."],
      ["Stay bases", "3 nights in your chosen city, premium or mountain stay tier; the exact property is confirmed for your dates.", "3 nights in one Wulingyuan base: the designated villa or a 4-star hotel.", "Wulingyuan 3 nights · Furong Town 1 night · Fenghuang 2 nights."],
      ["Ancient towns", "Furong Town and Fenghuang are outside this four-day route.", "Furong Town and Fenghuang are outside this four-day route.", "Overnight in Furong Town, then two nights in Fenghuang."],
      ["Guide coverage", "English-speaking guide on Days 2 and 3; Day 4 English guide is outside the base price.", "English-speaking guide on Day 2 and Day 3 daytime; 72 Wonder Tower is self-guided.", "English-speaking guide on Days 2–5; Day 6 is free time without a guide or vehicle."],
    ],
    boundary: "Forest is a fixed route: its only planned weather change is Tianmen Mountain to Baofeng Lake at no extra charge. A Day 4 morning addition for a late departure needs a separate quote before booking.",
  },
  zh: {
    title: "玻璃桥、连住一地，还是加上古镇？",
    intro: "两条四天路线均在张家界抵达和离开。七天路线继续去芙蓉镇和凤凰古城，标准送站在凤凰古城站结束；若想送回张家界，须在付款前书面确认路线及报价。",
    current: "你正在看的路线",
    headings: ["经典 · 4 天", "Forest · 4 天", "芙蓉镇与凤凰 · 7 天"],
    rows: [
      ["观光时间", "D2–D4 共 3 个观光日；最后一天须按离开班次核对。", "D2–D3 为 2 个完整观光日；D2 门到门约 10–11 小时，含金鞭溪步行。抵达与离开日另安排。", "森林公园 2 个完整观光日，D4–D5 游古镇，D6 在凤凰自由活动。"],
      ["玻璃桥与天门山", "D3 大峡谷玻璃桥；D4 天门山。", "不含大峡谷玻璃桥。D3 天门山，天气不好改游宝峰湖。", "已公布路线不含大峡谷玻璃桥和天门山。"],
      ["森林公园交通", "路线安排百龙天梯与园内索道；具体已含票种写入确认方案。", "含环保车；百龙天梯、园内索道和十里画廊小火车为自选自费。", "含环保车与十里画廊小火车；未列索道和百龙天梯另计。"],
      ["住宿基地", "3 晚可选城市、宽敞高阶或特色山景住宿档；具体酒店按日期确认。", "武陵源同一基地连住 3 晚：指定别墅或四星酒店。", "武陵源 3 晚 · 芙蓉镇 1 晚 · 凤凰 2 晚。"],
      ["古镇", "这条四天路线不含芙蓉镇与凤凰。", "这条四天路线不含芙蓉镇与凤凰。", "芙蓉镇住一晚，再在凤凰连住两晚。"],
      ["导游范围", "第2、3天含英文导游；第4天基础价不含英文导游。", "D2 全天及 D3 白天含英语导游；七十二奇楼夜场为自由游览。", "D2–D5 含英语导游；D6 为不含车导的自由活动。"],
    ],
    boundary: "Forest 为固定路线，唯一计划内的天气替换是天门山改游宝峰湖，不另外收费。晚班离开时若想加 D4 上午游览，须在预订前单独报价。",
  },
  ko: {
    title: "유리다리, 한 숙소, 아니면 고성까지?",
    intro: "두 4일 코스는 장가계에서 시작하고 끝납니다. 7일 코스는 부용진과 봉황고성으로 이어지며 기본 이동은 봉황고성역에서 끝납니다. 장가계로 돌아가려면 결제 전에 이동 계획과 견적을 서면으로 확정해야 합니다.",
    current: "현재 보고 있는 코스",
    headings: ["클래식 · 4일", "Forest · 4일", "부용진·봉황 · 7일"],
    rows: [
      ["관광 시간", "D2~D4 관광 3일. 마지막 날은 출발편 시간과 함께 확인합니다.", "D2~D3 온전한 관광 2일. D2는 숙소 출발부터 귀환까지 약 10~11시간이며 금편계 걷기가 포함됩니다. 도착일과 출발일은 따로 둡니다.", "국가삼림공원 종일 2일, D4~D5 고성 관광, D6 봉황 자유 일정."],
      ["유리다리·천문산", "D3 대협곡 유리다리, D4 천문산.", "대협곡 유리다리는 제외됩니다. D3 천문산, 악천후 시 보봉호로 변경합니다.", "공개된 코스에는 대협곡 유리다리와 천문산이 없습니다."],
      ["삼림공원 교통", "백룡 엘리베이터와 공원 케이블카를 이용하는 코스. 포함 입장권은 서면으로 확인합니다.", "관광 셔틀 포함. 백룡 엘리베이터, 공원 케이블카와 십리화랑 미니 열차는 선택·별도 결제.", "관광 셔틀과 십리화랑 미니 열차 포함. 명시되지 않은 케이블카와 백룡 엘리베이터는 별도."],
      ["숙박 거점", "시내, 넓은 프리미엄, 개성 있는 산 전망 숙소 등급 중 선택해 3박. 최종 숙소는 날짜별로 확인합니다.", "무릉원 한 곳에서 3박: 지정 빌라 또는 4성급 호텔.", "무릉원 3박 · 부용진 1박 · 봉황 2박."],
      ["고성", "이 4일 코스에는 부용진과 봉황이 없습니다.", "이 4일 코스에는 부용진과 봉황이 없습니다.", "부용진 1박 후 봉황에서 2박."],
      ["가이드 범위", "2·3일 차 영어 가이드 포함. 4일 차 영어 가이드는 기본 요금 불포함.", "D2 종일과 D3 주간 한국어 가이드 포함. 72기루 야간 관람은 자유 일정.", "D2~D5 한국어 가이드 포함. D6는 차량과 가이드가 없는 자유 일정."],
    ],
    boundary: "Forest는 고정 코스입니다. 계획된 날씨 대안은 천문산 대신 보봉호를 추가 요금 없이 방문하는 것입니다. 늦게 출발해 D4 오전 관광을 추가하려면 예약 전에 별도 견적을 확인해야 합니다.",
  },
} as const;

const paths = {
  classic: {
    en: "/tours/zhangjiajie-4-day-private-tour/",
    zh: "/zh/tours/zhangjiajie-4-day-private-tour/",
    ko: "/ko/tours/zhangjiajie-4-day-private-tour/",
  },
  forest: {
    en: "/tours/zhangjiajie-forest-4-day-private-tour/",
    zh: "/zh/tours/zhangjiajie-forest-4-day-private-tour/",
    ko: "/ko/tours/zhangjiajie-forest-4-day-private-tour/",
  },
  ancientTowns: {
    en: "/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
    zh: "/zh/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
    ko: "/ko/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/",
  },
} as const;

export function ZhangjiajieTourComparisonLink({
  currentRoute,
  locale,
}: {
  currentRoute: ZhangjiajieComparisonRoute;
  locale: HomegroundLocale;
}) {
  const text = copy[locale];

  return (
    <aside className={styles.comparison} aria-labelledby="zhangjiajie-route-comparison-title">
      <header className={styles.heading}>
        <h3 id="zhangjiajie-route-comparison-title">{text.title}</h3>
        <p>{text.intro}</p>
      </header>
      <div className={styles.routes}>
        {routes.map((route, index) => (
          <article className={styles.route} key={route}>
            <header>
              <h4>{route === currentRoute ? text.headings[index] : <Link href={paths[route][locale]}>{text.headings[index]}</Link>}</h4>
              {route === currentRoute ? <p className={styles.current}>{text.current}</p> : null}
            </header>
            <dl className={styles.facts}>
              {text.rows.map((row) => (
                <div key={row[0]}>
                  <dt>{row[0]}</dt>
                  <dd>{row[index + 1]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <p className={styles.boundary}>{text.boundary}</p>
    </aside>
  );
}
