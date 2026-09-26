"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { buildPrivateTourDetailHref, getPrivateTourInquirySelection, type PrivateTourInquirySlug } from "../lib/privateTourInquiryContext";
import { usePrivateTourSelection } from "./PrivateTourSelection";
import styles from "./ShanghaiJiangnanImaginePage.module.css";

const copy = {
  en: {
    title: "One hotel or three cities?",
    intro: "Choose the shape of your trip first. Both are private tours for your own party, with no shopping stops.",
    headings: ["Compare", "5 days · Shanghai & Suzhou", "6 days · Shanghai, Suzhou & Hangzhou"],
    rows: [
      ["Best fit", "Keep one hotel; visit Suzhou for the day", "Stay in each city; finish in Hangzhou"],
      ["Nights", "Shanghai 4", "Shanghai 2 · Suzhou 1 · Hangzhou 2"],
      ["Touring days", "3 full days", "4 days"],
      ["Intercity travel", "Return high-speed rail + private transfers", "Usually rail for 2–3; vehicle for 4–9, confirmed for luggage"],
      ["Departure", "Shanghai airport", "Hangzhou airport or station"],
    ],
    view: "View this itinerary", current: "You’re viewing this tour",
    trust: "Know who you are booking with.", business: "Company & travel-agency licence", terms: "Booking terms",
    trustBody: "Before payment, your written proposal confirms the itinerary, rooms, transport, inclusions, total and cancellation terms. An enquiry is free and does not commit you to a booking.",
  },
  zh: {
    title: "连住一家酒店，还是住遍江南三城？",
    intro: "先选适合你的旅行方式。两条都是只接待同行亲友的私家团，全程不进购物店。",
    headings: ["怎么选", "5 天 · 上海与苏州", "6 天 · 上海、苏州与杭州"],
    rows: [
      ["适合", "不换酒店，苏州当天往返", "每城住一住，从杭州离开"],
      ["住宿", "上海 4 晚", "上海 2 晚 · 苏州 1 晚 · 杭州 2 晚"],
      ["游览日", "3 个完整游览日", "4 个游览日"],
      ["跨城", "高铁往返及两端私车接驳", "2–3 人通常高铁；4–9 人通常包车，按行李确认"],
      ["返程接送", "上海机场", "杭州机场或车站"],
    ],
    view: "查看这条行程", current: "你正在看的路线",
    trust: "预订之前，信息清楚。", business: "公司信息与旅行社资质", terms: "预订条款",
    trustBody: "付款前，书面方案会确认行程、房型、交通、包含项目、总价与取消条件。咨询免费，不等于确认预订。",
  },
  ko: {
    title: "한 호텔에 머물까요, 세 도시에서 숙박할까요?",
    intro: "먼저 여행 방식을 골라보세요. 두 일정 모두 우리 일행만의 프라이빗 투어이며 쇼핑 일정이 없습니다.",
    headings: ["비교", "5일 · 상하이와 쑤저우", "6일 · 상하이·쑤저우·항저우"],
    rows: [
      ["추천 기준", "호텔 이동 없이 쑤저우 당일 여행", "각 도시에서 숙박, 항저우에서 출발"],
      ["숙박", "상하이 4박", "상하이 2박 · 쑤저우 1박 · 항저우 2박"],
      ["관광일", "온전한 관광 3일", "관광 4일"],
      ["도시 간 이동", "왕복 고속철도와 양쪽 전용 픽업", "보통 2–3명 열차, 4–9명 차량; 수하물 확인 후 확정"],
      ["마지막 샌딩", "상하이 공항", "항저우 공항 또는 역"],
    ],
    view: "이 일정 보기", current: "현재 보고 있는 일정",
    trust: "예약 전에 확인하세요.", business: "회사 정보와 여행사 허가", terms: "예약 약관",
    trustBody: "결제 전 서면 제안서에 일정, 객실, 이동, 포함 항목, 총액과 취소 조건을 확인합니다. 문의는 무료이며 문의만으로 예약이 확정되지는 않습니다.",
  },
} as const;

const slugs = ["shanghai-suzhou-5-day-private-tour", "shanghai-suzhou-hangzhou-6-day-private-tour"] as const;

type JapaneseComparisonCopy = Readonly<{
  title: string;
  intro: string;
  headings: readonly string[];
  rows: readonly (readonly string[])[];
  view: string;
  current: string;
}>;

function ComparisonTourLink({ locale, slug, children }: { locale: HomegroundLocale | "ja"; slug: PrivateTourInquirySlug; children: ReactNode }) {
  const current = usePrivateTourSelection();
  const path = `${locale === "en" || locale === "ja" ? "" : `/${locale}`}/tours/${slug}/`;
  const targetSelection = current && getPrivateTourInquirySelection(slug, current.selection.packageId, current.selection.travelers);
  const href = targetSelection ? buildPrivateTourDetailHref(path, slug, targetSelection) : path;
  return <Link href={href} hrefLang={locale === "ja" ? "en" : undefined}>{children}</Link>;
}

export function JiangnanTourComparison({ locale, currentSlug, japaneseCopy }: { locale: HomegroundLocale | "ja"; currentSlug: string; japaneseCopy?: JapaneseComparisonCopy }) {
  const text = locale === "ja" ? japaneseCopy : copy[locale];
  if (!text) throw new Error("Japanese comparison copy is required");
  return <section className={styles.section} aria-labelledby="jiangnan-comparison-title">
    <div className={styles.sectionInner}>
      <div className={`${styles.sectionHeading} ${styles.faqHeading}`}>
        <h2 id="jiangnan-comparison-title">{text.title}</h2>
        <p>{text.intro}</p>
      </div>
      <table className={styles.comparisonTable}>
        <caption className={styles.visuallyHidden}>{text.title}</caption>
        <thead><tr>{text.headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{text.rows.map(([label, five, six]) => <tr key={label}><th scope="row">{label}</th><td>{five}</td><td>{six}</td></tr>)}</tbody>
        <tfoot><tr><td /><td>{currentSlug === slugs[0] ? text.current : <ComparisonTourLink locale={locale} slug={slugs[0]}>{text.view}</ComparisonTourLink>}</td><td>{currentSlug === slugs[1] ? text.current : <ComparisonTourLink locale={locale} slug={slugs[1]}>{text.view}</ComparisonTourLink>}</td></tr></tfoot>
      </table>
    </div>
  </section>;
}

export function JiangnanBookingTrust({ locale, japaneseCopy }: { locale: HomegroundLocale | "ja"; japaneseCopy?: Readonly<{ trust: string; trustBody: string; business: string; terms: string }> }) {
  const text = locale === "ja" ? japaneseCopy : copy[locale];
  if (!text) throw new Error("Japanese booking copy is required");
  const prefix = locale === "en" || locale === "ja" ? "" : `/${locale}`;
  return <div className={styles.bookingTrust}>
    <h3>{text.trust}</h3>
    <p>{text.trustBody}</p>
    <p><Link href={`${prefix}/business-information/#travel-agency-credentials`} hrefLang={locale === "ja" ? "en" : undefined}>{text.business}</Link><span aria-hidden="true"> · </span><Link href={`${prefix}/terms/`} hrefLang={locale === "ja" ? "en" : undefined}>{text.terms}</Link></p>
  </div>;
}
