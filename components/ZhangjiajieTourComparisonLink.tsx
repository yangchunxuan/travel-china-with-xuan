import Link from "next/link";
import type { HomegroundLocale } from "../lib/homegroundI18n";

const copy = {
  en: {
    classic: {
      intro:
        " If a lower-budget fixed route with two walking days and one villa base suits you better—and you are willing to leave out the Glass Bridge, Tianmen Mountain, cable cars and elevators—compare the",
      label: "Zhangjiajie Forest 4-day fixed route",
    },
    forest: {
      intro:
        " If you would rather include Bailong Elevator, the Glass Bridge and Tianmen Mountain, compare the",
      label: "classic Zhangjiajie 4-day private tour",
    },
  },
  zh: {
    classic: {
      intro:
        "如果更看重预算、两天徒步和三晚同住一处别墅，并愿意不去大峡谷玻璃桥、天门山，也不坐索道和电梯，可以比较",
      label: "张家界森林公园 4 天固定路线",
    },
    forest: {
      intro: "如果更想体验百龙天梯、玻璃桥和天门山，可以比较",
      label: "张家界 4 天经典私家游",
    },
  },
  ko: {
    classic: {
      intro:
        " 더 낮은 예산, 이틀간의 도보 일정과 한 빌라 3박이 더 중요하고 유리다리·톈먼산·케이블카·엘리베이터를 제외해도 괜찮다면",
      label: "장자제 국립삼림공원 4일 고정 코스",
    },
    forest: {
      intro:
        " 백룡 엘리베이터, 유리다리와 톈먼산을 포함한 대표 코스를 원한다면",
      label: "장자제 4일 클래식 프라이빗 투어",
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
      {localized.intro} <Link href={paths[targetRoute][locale]}>{localized.label}</Link>
      {locale === "zh" ? "。" : locale === "ko" ? "도 함께 비교해 보세요." : "."}
    </>
  );
}
