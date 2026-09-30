import Link from "next/link";
import type { HomegroundLocale } from "../lib/homegroundI18n";

const copy = {
  en: {
    classic: {
      intro:
        " If you would rather spend a full day in the Forest Park, see Tianmen Mountain and stay all three nights in one villa or 4-star hotel—without the Glass Bridge—compare the",
      label: "Zhangjiajie Forest 4-day fixed route",
    },
    forest: {
      intro:
        " If you would also like the Grand Canyon Glass Bridge and the Bailong Elevator, compare the",
      label: "classic Zhangjiajie 4-day private tour",
    },
  },
  zh: {
    classic: {
      intro:
        "如果更想在森林公园玩一整天、上天门山，三晚住同一处别墅或四星酒店，不去大峡谷玻璃桥，可以比较",
      label: "张家界森林公园 4 天固定路线",
    },
    forest: {
      intro: "如果还想去大峡谷玻璃桥、坐百龙天梯，可以比较",
      label: "张家界 4 天经典私家游",
    },
  },
  ko: {
    classic: {
      intro:
        " 국립삼림공원 종일 관광과 천문산, 빌라 또는 4성급 호텔 한 곳에서의 3박이 더 맞고 유리다리는 빼도 괜찮다면",
      label: "장가계 국립삼림공원 4일 고정 코스",
    },
    forest: {
      intro:
        " 대협곡 유리다리와 백룡 엘리베이터도 원한다면",
      label: "장가계 4일 클래식 프라이빗 투어",
    },
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
} as const;

export function ZhangjiajieTourComparisonLink({
  currentRoute,
  locale,
}: {
  currentRoute: "classic" | "forest";
  locale: HomegroundLocale;
}) {
  const targetRoute = currentRoute === "classic" ? "forest" : "classic";
  const localized = copy[locale][currentRoute];

  return (
    <>
      {localized.intro}
      {locale === "zh" ? "" : " "}
      <Link href={paths[targetRoute][locale]}>{localized.label}</Link>
      {locale === "zh" ? "。" : locale === "ko" ? "도 함께 비교해 보세요." : "."}
    </>
  );
}
