import type { HomegroundLocale } from "../lib/homegroundI18n";
import styles from "./TourPriceScope.module.css";

const labels = {
  en: { title: "Price essentials", included: "Included", separate: "Budget separately", confirm: "Confirm before payment", details: "See the full inclusions and exclusions" },
  zh: { title: "费用要点", included: "已含", separate: "另做预算", confirm: "付款前确认", details: "查看完整费用范围" },
  ko: { title: "요금 핵심 안내", included: "포함", separate: "별도 예산", confirm: "결제 전 확인", details: "전체 포함·불포함 사항 보기" },
};

// Condensed from the published product's hotel, service and exclusion notes.
// These summaries do not establish new hotel, vehicle or guide commitments.
const scope = {
  beijing: {
    en: {
      included: "4 hotel nights, twin sharing and breakfast · Ctrip 4-Diamond rating · airport transfers and private vehicles on Days 2–4.",
      separate: "Flights, lunches and dinners · Great Wall cable car, slide rail and shuttle · Daxing Airport (PKX) transfer difference.",
      confirm: "Exact hotel, rooms, vehicle and luggage capacity · successful real-name reservations for Tiananmen and the Forbidden City.",
    },
    zh: {
      included: "4 晚携程 4 钻酒店，两人一间含早；接送机及 D2–D4 私车。",
      separate: "机票、午晚餐；长城缆车、滑车与摆渡车；大兴机场（PKX）接送差价。",
      confirm: "具体酒店、房间、车型与行李容量；天安门和故宫须实名预约成功。",
    },
    ko: {
      included: "씨트립 4다이아 호텔 4박, 2인 1실·조식 · 공항 이동과 D2~D4 전용 차량.",
      separate: "항공권, 중식·석식 · 만리장성 케이블카·슬라이드 레일·셔틀 · 다싱공항(PKX) 이동 차액.",
      confirm: "숙소·객실·차량·수하물 적재량 · 톈안먼광장과 자금성 실명 예약 확정 여부.",
    },
  },
  zhangjiajie: {
    en: {
      included: "3 nights in your chosen stay tier · private local transport and agreed transfers · guide on Days 2–4 · adult admissions and standard scenic transport listed in the confirmation.",
      separate: "Travel to and from Zhangjiajie, lunches and dinners, optional activities · single-room, child, guide-language and vehicle-upgrade differences.",
      confirm: "Exact property and room, breakfast, vehicle and guide language—including any English-guide supplement. Stay photos show candidates; your room is confirmed for your dates.",
    },
    zh: {
      included: "所选档位住宿 3 晚；当地私车及约定接送；D2–D4 导游；确认单列明的成人门票与标准景交。",
      separate: "往返张家界大交通、午晚餐、自选项目；单房、儿童、导游语种和车型升级差价。",
      confirm: "具体住宿、房型、早餐、车辆和导游语种（含英语服务差价）。照片为候选住宿参考，实际房间按日期确认。",
    },
    ko: {
      included: "선택한 숙소 등급 3박 · 현지 전용 차량과 합의된 이동 · D2~D4 가이드 · 확인서에 명시된 성인 입장권과 기본 관광지 교통.",
      separate: "장자제 왕복 교통, 중식·석식, 선택 활동 · 1인실·아동·가이드 언어·차량 업그레이드 차액.",
      confirm: "실제 숙소·객실·조식·차량·가이드 언어와 영어 가이드 추가금. 사진은 후보 숙소 참고용이며 객실은 여행 날짜에 맞춰 확정합니다.",
    },
  },
} as const;

export function TourPriceScope({ route, locale, detailsHref }: {
  route: keyof typeof scope;
  locale: HomegroundLocale;
  detailsHref: string;
}) {
  const copy = labels[locale];
  const content = scope[route][locale];
  return (
    <div className={styles.scope}>
      <dl aria-label={copy.title}>
        {(["included", "separate", "confirm"] as const).map((key) => (
          <div key={key}>
            <dt>{copy[key]}</dt>
            <dd>{content[key]}</dd>
          </div>
        ))}
      </dl>
      <a href={detailsHref}>{copy.details}</a>
    </div>
  );
}
