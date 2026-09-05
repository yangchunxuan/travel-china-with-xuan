import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import {
  localizePrivateTourProduct,
  type LocalizedPrivateTourProduct,
  type PrivateTourLocale,
  type PrivateTourProduct,
} from "../lib/privateTourProducts";
import {
  getLocalizedPrivateTourPhotoCredits,
  privateTourPhotoCreditCopy,
} from "../lib/privateTourPhotoCredits";
import { PrivateTourSelectionProvider, SelectedPrivateTourCta, SelectedPrivateTourEmailLink } from "./PrivateTourSelection";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import { PrivateTourMotion } from "./PrivateTourMotion";
import { ZhangjiajieTourComparisonLink } from "./ZhangjiajieTourComparisonLink";
import {
  buildPrivateTourInquiryHref,
  buildPrivateTourMailtoHref,
  getPrivateTourInquiryContext,
} from "../lib/privateTourInquiryContext";
import {
  ShanghaiJiangnanHeroDeck,
  ShanghaiJiangnanPriceConsole,
  ShanghaiJiangnanRouteExplorer,
} from "./ShanghaiJiangnanImagineInteractive";
import styles from "./ShanghaiJiangnanImaginePage.module.css";
import {
  getExistingContentCommercialCopy,
  getProductPlanningContext,
} from "../lib/existingContentCommercialLinks";

export const SHANGHAI_JIANGNAN_TOUR_SLUG =
  "shanghai-suzhou-hangzhou-6-day-private-tour";

const beforeYouChooseTitle: Record<PrivateTourLocale, string> = {
  en: "Before you choose",
  zh: "选择这条路线前",
  ko: "이 일정을 선택하기 전에",
};

const jiangnanPageCopy: Record<
  PrivateTourLocale,
  {
    htmlLang: string;
    skipLink: string;
    breadcrumbLabel: string;
    homeLabel: string;
    productLabel: string;
    heroMeta: string;
    heroPromise: string;
    facts: readonly { label: string; value: string }[];
    overviewEyebrow: string;
    overviewTitle: string;
    overviewBody: string;
    routeEyebrow: string;
    routeTitle: string;
    routeBody: string;
    serviceEyebrow: string;
    serviceTitle: string;
    serviceBody: string;
    hotelTitle: string;
    transportTitle: string;
    scopeEyebrow: string;
    scopeTitle: string;
    exclusionsTitle: string;
    confirmedTitle: string;
    confirmations: readonly string[];
    finalEyebrow: string;
    finalTitle: string;
    finalBody: string;
    contact: string;
    email: string;
  }
> = {
  en: {
    htmlLang: "en",
    skipLink: "Skip to the tour details",
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    productLabel: "Private tours",
    heroMeta: "6 DAYS / 5 NIGHTS · PRIVATE TOUR · NO SHOPPING",
    heroPromise: "Three cities. One unhurried route.",
    facts: [
      { label: "Route", value: "Shanghai → Suzhou → Hangzhou" },
      { label: "Guided touring", value: "Days 2–5" },
      { label: "Stay", value: "5 nights · breakfast included" },
      { label: "Public prices", value: "2 or 4 travellers" },
    ],
    overviewEyebrow: "The shape of the journey",
    overviewTitle: "Shanghai, Suzhou and Hangzhou each get their own pace.",
    overviewBody:
      "The route moves in one direction. Arrival and departure days protect the four core touring days, while luggage and intercity transport are handled as part of the same journey.",
    routeEyebrow: "Day by day",
    routeTitle: "One direction, no backtracking.",
    routeBody:
      "Enter through Shanghai, continue through Suzhou and finish in Hangzhou. Arrival and departure stay unhurried, leaving four complete touring days at the centre of the journey.",
    serviceEyebrow: "Travel made seamless",
    serviceTitle: "Hotels, guides and transfers work together.",
    serviceBody:
      "Your hotel level, guided days, transfers and principal admissions are planned together. We check availability for your dates before payment.",
    hotelTitle: "Stay",
    transportTitle: "Guide, transport and admissions",
    scopeEyebrow: "Clear before payment",
    scopeTitle: "What is separate—and what your written quote will confirm.",
    exclusionsTitle: "Not included",
    confirmedTitle: "Confirmed in writing",
    confirmations: [
      "Your dates, arrival and departure details",
      "The hotel, room arrangement and vehicle for the actual group",
      "Bookable admissions and the final total before payment",
    ],
    finalEyebrow: "Make this six-day journey yours",
    finalTitle: "Ready to shape this route around your trip?",
    finalBody:
      "Share your dates, group size and what matters most to you. We will start with this route and work from there.",
    contact: "Request your tailored proposal",
    email: "Email us",
  },
  zh: {
    htmlLang: "zh-Hans",
    skipLink: "跳到产品详情",
    breadcrumbLabel: "面包屑导航",
    homeLabel: "首页",
    productLabel: "私家团产品",
    heroMeta: "6 天 5 晚 · 私家团 · 全程不进购物店",
    heroPromise: "江南三城，一路向前，不走回头路。",
    facts: [
      { label: "路线", value: "上海 → 苏州 → 杭州" },
      { label: "导游", value: "第 2–5 天英语导游" },
      { label: "住宿", value: "5 晚 · 含早餐" },
      { label: "公开报价", value: "2 人或 4 人" },
    ],
    overviewEyebrow: "这条路线的价值",
    overviewTitle: "上海、苏州、杭州，各自都有完整的节奏。",
    overviewBody:
      "路线按一个方向推进。抵达与返程日为四个核心游览日留足余量，跨城交通和行李衔接也放在同一套安排里处理。",
    routeEyebrow: "每日安排",
    routeTitle: "一路向前，不走回头路。",
    routeBody:
      "从上海进入，经苏州一路前往杭州。抵达与返程日留出余量，把四个完整游览日留在旅程中间。",
    serviceEyebrow: "服务标准",
    serviceTitle: "抵达之前，住宿、用车和游览已经接顺。",
    serviceBody:
      "酒店等级、导游天数、接送、跨城交通和主要门票组成同一套产品。付款前会按真实日期逐项核对可订情况。",
    hotelTitle: "住宿",
    transportTitle: "导游、交通与门票",
    scopeEyebrow: "付款前看清楚",
    scopeTitle: "哪些另计，哪些会写进你的最终确认方案。",
    exclusionsTitle: "不包含",
    confirmedTitle: "书面确认",
    confirmations: [
      "真实出行日期及到离航班或车次",
      "具体酒店、房型与适合实际人数和行李的车辆",
      "可订门票及付款前的最终总金额",
    ],
    finalEyebrow: "把这六天变成你的旅行",
    finalTitle: "想按你的日期走这条路线吗？",
    finalBody:
      "告诉我们日期、人数和最在意的体验，我们就从这条路线开始调整。",
    contact: "获取你的专属方案",
    email: "发送邮件",
  },
  ko: {
    htmlLang: "ko",
    skipLink: "투어 상세로 이동",
    breadcrumbLabel: "현재 위치",
    homeLabel: "홈",
    productLabel: "프라이빗 투어",
    heroMeta: "5박 6일 · 프라이빗 투어 · 쇼핑 일정 없음",
    heroPromise: "세 도시를 한 방향으로, 서두르지 않게.",
    facts: [
      { label: "동선", value: "상하이 → 쑤저우 → 항저우" },
      { label: "가이드", value: "2–5일차 영어 가이드" },
      { label: "숙박", value: "5박 · 조식 포함" },
      { label: "공개 가격", value: "2명 또는 4명" },
    ],
    overviewEyebrow: "여정의 구조",
    overviewTitle: "세 도시의 매력을 서두르지 않고 이어 갑니다.",
    overviewBody:
      "한 방향으로 이동하며 도착일과 출발일에는 여유를 둡니다. 나머지 4일은 핵심 관광에 집중하고, 도시 간 이동은 실제 일행과 수하물에 맞춰 준비합니다.",
    routeEyebrow: "날짜별 일정",
    routeTitle: "되돌아가지 않는 한 방향 여정.",
    routeBody:
      "상하이에서 시작해 쑤저우를 거쳐 항저우에서 마칩니다. 도착일과 출발일에는 여유를 두고, 중간 4일은 온전히 관광에 씁니다.",
    serviceEyebrow: "서비스 기준",
    serviceTitle: "도착 전에 숙박과 이동, 관광을 하나로 연결합니다.",
    serviceBody:
      "호텔 등급, 가이드 동행일, 픽업·샌딩, 도시 간 이동과 주요 입장권을 하나의 상품으로 구성합니다. 결제 전 실제 날짜의 예약 가능 여부를 확인합니다.",
    hotelTitle: "숙박",
    transportTitle: "가이드, 이동과 입장권",
    scopeEyebrow: "결제 전 확인",
    scopeTitle: "별도 비용과 결제 전에 확인할 내용을 살펴보세요.",
    exclusionsTitle: "불포함",
    confirmedTitle: "결제 전 서면 확인",
    confirmations: [
      "실제 여행 날짜와 도착·출발편 정보",
      "이용 가능한 호텔과 객실 구성, 인원·수하물에 맞는 차량",
      "예약 가능한 입장권과 결제 전 최종 총액",
    ],
    finalEyebrow: "이 6일 여정을 나의 여행으로",
    finalTitle: "내 날짜에 맞춰 이 여정을 만들어 볼까요?",
    finalBody:
      "날짜와 인원, 가장 기대하는 경험을 알려 주시면 이 일정을 바탕으로 함께 조정합니다.",
    contact: "맞춤 제안 요청하기",
    email: "이메일 보내기",
  },
};

type ImaginePageCopy = (typeof jiangnanPageCopy)[PrivateTourLocale];

function buildGenericPageCopy(
  product: LocalizedPrivateTourProduct,
): ImaginePageCopy {
  if (product.locale === "zh") {
    return {
      htmlLang: "zh-Hans",
      skipLink: "跳到产品详情",
      breadcrumbLabel: "面包屑导航",
      homeLabel: "首页",
      productLabel: "私家团产品",
      heroMeta: `${product.days} 天 ${product.nights} 晚 · 私家团 · 全程不进购物店`,
      heroPromise: product.eyebrow,
      facts: [
        { label: "行程", value: `${product.days} 天 ${product.nights} 晚` },
        { label: "游览", value: "逐日写明导游与用车安排" },
        { label: "住宿", value: `${product.nights} 晚 · 含早餐` },
        { label: "公开报价", value: "2 人或 4 人" },
      ],
      overviewEyebrow: "这条路线的价值",
      overviewTitle: product.eyebrow,
      overviewBody: product.summary,
      routeEyebrow: "每日安排",
      routeTitle: "每天怎么走，完整写清楚。",
      routeBody:
        "抵达、核心游览与返程逐日展开。开放时间、实名门票和当地情况可能调整先后顺序；重要内容需要调整时，我们会与你沟通。",
      serviceEyebrow: "服务标准",
      serviceTitle: "抵达之前，住宿、用车和游览已经接顺。",
      serviceBody:
        "酒店等级、导游天数、接送、行程交通和主要门票组成同一套产品。付款前会按真实日期逐项核对可订情况。",
      hotelTitle: "住宿",
      transportTitle: "导游、交通与门票",
      scopeEyebrow: "付款前看清楚",
      scopeTitle: "哪些另计，哪些会写进你的最终确认方案。",
      exclusionsTitle: "不包含",
      confirmedTitle: "书面确认",
      confirmations: [
        "真实出行日期及到离航班或车次",
        "具体酒店、房型与适合实际人数和行李的车辆",
        "可订门票及付款前的最终总金额",
      ],
      finalEyebrow: "把这条路线变成你的旅行",
      finalTitle: "想按你的日期走这条路线吗？",
      finalBody:
        "告诉我们日期、人数和最在意的体验，我们就从这条路线开始调整。",
      contact: "获取你的专属方案",
      email: "发送邮件",
    };
  }

  if (product.locale === "ko") {
    return {
      htmlLang: "ko",
      skipLink: "투어 상세로 이동",
      breadcrumbLabel: "현재 위치",
      homeLabel: "홈",
      productLabel: "프라이빗 투어",
      heroMeta: `${product.nights}박 ${product.days}일 · 프라이빗 투어 · 쇼핑 일정 없음`,
      heroPromise: product.eyebrow,
      facts: [
        { label: "일정", value: `${product.nights}박 ${product.days}일` },
        { label: "관광", value: "일자별 가이드와 차량 안내" },
        { label: "숙박", value: `${product.nights}박 · 조식 포함` },
        { label: "공개 가격", value: "2명 또는 4명" },
      ],
      overviewEyebrow: "여정의 가치",
      overviewTitle: product.eyebrow,
      overviewBody: product.summary,
      routeEyebrow: "날짜별 일정",
      routeTitle: "날짜별 이동과 관광을 한눈에 보여 드립니다.",
      routeBody:
        "도착, 핵심 관광과 출발 일정을 날짜별로 확인할 수 있습니다. 운영 시간, 이름을 등록해야 하는 입장권과 현지 상황에 따라 순서는 달라질 수 있습니다. 중요한 내용이 달라져야 할 때는 고객과 상의합니다.",
      serviceEyebrow: "서비스 기준",
      serviceTitle: "도착 전에 숙박과 이동, 관광을 하나로 연결합니다.",
      serviceBody:
        "호텔 등급, 가이드 동행일, 픽업·샌딩, 일정 내 이동과 주요 입장권을 하나의 상품으로 구성합니다. 결제 전 실제 날짜의 예약 가능 여부를 확인합니다.",
      hotelTitle: "숙박",
      transportTitle: "가이드, 이동과 입장권",
      scopeEyebrow: "결제 전 확인",
      scopeTitle: "별도 비용과 결제 전에 확인할 내용을 살펴보세요.",
      exclusionsTitle: "불포함",
      confirmedTitle: "결제 전 서면 확인",
      confirmations: [
        "실제 여행 날짜와 도착·출발편 정보",
        "이용 가능한 호텔과 객실 구성, 인원·수하물에 맞는 차량",
        "예약 가능한 입장권과 결제 전 최종 총액",
      ],
      finalEyebrow: "이 여정을 나의 여행으로",
      finalTitle: "내 날짜에 맞춰 이 여정을 만들어 볼까요?",
      finalBody:
        "날짜와 인원, 가장 기대하는 경험을 알려 주시면 이 일정을 바탕으로 함께 조정합니다.",
      contact: "맞춤 제안 요청하기",
      email: "이메일 보내기",
    };
  }

  return {
    htmlLang: "en",
    skipLink: "Skip to the tour details",
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    productLabel: "Private tours",
    heroMeta: `${product.days} DAYS / ${product.nights} NIGHTS · PRIVATE TOUR · NO SHOPPING`,
    heroPromise: product.eyebrow,
    facts: [
      {
        label: "Journey",
        value: `${product.days} days / ${product.nights} nights`,
      },
      { label: "Touring", value: "Guide and vehicle details shown day by day" },
      { label: "Stay", value: `${product.nights} nights · breakfast included` },
      { label: "Public prices", value: "2 or 4 travellers" },
    ],
    overviewEyebrow: "The shape of the journey",
    overviewTitle: product.eyebrow,
    overviewBody: product.summary,
    routeEyebrow: "Day by day",
    routeTitle: "See how each day unfolds.",
    routeBody:
      "Arrival, core touring and departure are shown day by day. Opening hours, named-entry tickets and local conditions may change the order. If anything important needs to change, we discuss it with you.",
    serviceEyebrow: "Travel made seamless",
    serviceTitle: "Hotels, guides and transfers work together.",
    serviceBody:
      "Your hotel level, guided days, transfers, route transport and principal admissions are planned together. We check availability for your dates before payment.",
    hotelTitle: "Stay",
    transportTitle: "Guide, transport and admissions",
    scopeEyebrow: "Clear before payment",
    scopeTitle: "What is separate—and what your written quote will confirm.",
    exclusionsTitle: "Not included",
    confirmedTitle: "Confirmed in writing",
    confirmations: [
      "Your dates, arrival and departure details",
      "The hotel, room arrangement and vehicle for the actual group",
      "Bookable admissions and the final total before payment",
    ],
    finalEyebrow: "Make this journey yours",
    finalTitle: "Ready to shape this route around your trip?",
    finalBody:
      "Share your dates, group size and what matters most to you. We will start with this route and work from there.",
    contact: "Request your tailored proposal",
    email: "Email us",
  };
}

function getPageCopy(product: LocalizedPrivateTourProduct): ImaginePageCopy {
  return product.slug === SHANGHAI_JIANGNAN_TOUR_SLUG
    ? jiangnanPageCopy[product.locale]
    : buildGenericPageCopy(product);
}

function schemaLanguage(locale: PrivateTourLocale) {
  return locale === "zh" ? "zh-Hans" : locale;
}

function displayTourTitle(title: string) {
  return title.replace(/(\d+)-Day/g, "$1‑Day");
}

export function ShanghaiJiangnanImaginePage({
  product,
  locale,
}: {
  product: PrivateTourProduct;
  locale: PrivateTourLocale;
}) {
  const localized = localizePrivateTourProduct(product, locale);
  const copy = getPageCopy(localized);
  const photoCreditCopy = privateTourPhotoCreditCopy[locale];
  const photoCredits = getLocalizedPrivateTourPhotoCredits(
    product.slug,
    locale,
  );
  const planningContext = getProductPlanningContext(
    product.slug as Parameters<typeof getProductPlanningContext>[0],
    locale,
  );
  const commercialCopy = getExistingContentCommercialCopy(locale);
  const homePath = locale === "en" ? "/" : `/${locale}/`;
  const tourHubPath = `${homePath}tours/`;
  const pageUrl = `https://homegroundchina.com${localized.path}`;
  const inquiryContext = getPrivateTourInquiryContext(product.slug, locale);
  if (!inquiryContext) {
    throw new Error(`Missing controlled inquiry context for ${product.slug}.`);
  }
  const inquiryHref = buildPrivateTourInquiryHref(
    homePath,
    inquiryContext.slug,
    "private_tour_product",
  );
  const rows = localized.packages.flatMap((tourPackage) => tourPackage.rows);
  const lowestRow = rows.reduce((lowest, row) =>
    row.amount < lowest.amount ? row : lowest,
  );
  const highestRow = rows.reduce((highest, row) =>
    row.amount > highest.amount ? row : highest,
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: localized.metadataTitle,
        description: localized.metadataDescription,
        inLanguage: schemaLanguage(locale),
        datePublished: localized.datePublished,
        dateModified: localized.dateModified,
        mainEntity: { "@id": localized.entityIds.product },
      },
      {
        "@type": "TouristTrip",
        "@id": localized.entityIds.product,
        name: localized.title,
        description: localized.summary,
        url: pageUrl,
        image: `https://homegroundchina.com${localized.heroImage.src}`,
        provider: {
          "@type": "Organization",
          "@id": "https://homegroundchina.com/#organization",
          name: "Homeground China",
          url: "https://homegroundchina.com/",
        },
        itinerary: {
          "@type": "ItemList",
          numberOfItems: localized.itinerary.length,
          itemListElement: localized.itinerary.map((day) => ({
            "@type": "ListItem",
            position: day.day,
            name: day.title,
            description: day.description,
          })),
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: lowestRow.currency,
          lowPrice: lowestRow.amount,
          highPrice: highestRow.amount,
          offerCount: rows.length,
          url: pageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.homeLabel,
            item: `https://homegroundchina.com${homePath}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.productLabel,
            item: `https://homegroundchina.com${tourHubPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: localized.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <PrivateTourSelectionProvider slug={inquiryContext.slug} initialPackageId={localized.packages[0].id}>
    <div
      className={`${homeStyles.localeRoot} ${styles.page}`}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#tour-details">
        {copy.skipLink}
      </a>
      <HomegroundHeader
        languagePaths={localized.paths}
        locale={locale}
        pageContext="tour"
        plannerHrefOverride={inquiryHref}
      />

      <main id="tour-details">
        <section aria-labelledby="product-title" className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <nav
                aria-label={copy.breadcrumbLabel}
                className={styles.breadcrumb}
              >
                <ol>
                  <li>
                    <Link href={homePath}>{copy.homeLabel}</Link>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li>
                    <Link href={tourHubPath}>{copy.productLabel}</Link>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li aria-current="page">{localized.title}</li>
                </ol>
              </nav>
              <p className={styles.heroMeta}>{copy.heroMeta}</p>
              <h1 id="product-title">{displayTourTitle(localized.title)}</h1>
              <p className={styles.heroPromise}>{copy.heroPromise}</p>
              <p className={styles.heroLede}>{localized.lede}</p>
            </div>
            <div className={styles.priceSlot}>
              <ShanghaiJiangnanPriceConsole
                inquiryHref={inquiryHref}
                product={localized}
              />
            </div>
            <ShanghaiJiangnanHeroDeck product={localized} />
          </div>
        </section>

        <dl className={styles.factsRail}>
          {copy.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <section className={styles.section} data-tour-reveal>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.overviewEyebrow}</p>
              <h2>{copy.overviewTitle}</h2>
              <p>{copy.overviewBody}</p>
            </div>
            <ol className={styles.highlightList}>
              {localized.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{highlight}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.routeSection}`}
          data-tour-reveal
        >
          <div className={styles.sectionInner}>
            <div className={`${styles.sectionHeading} ${styles.routeHeading}`}>
              <p className={styles.sectionEyebrow}>{copy.routeEyebrow}</p>
              <h2>{copy.routeTitle}</h2>
              <p>{copy.routeBody}</p>
            </div>
            <ShanghaiJiangnanRouteExplorer product={localized} />
          </div>
        </section>

        <section className={styles.section} data-tour-reveal>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.serviceEyebrow}</p>
              <h2>{copy.serviceTitle}</h2>
              <p>{copy.serviceBody}</p>
            </div>
            <div className={styles.serviceGrid}>
              <article>
                <span>01</span>
                <h3>{copy.hotelTitle}</h3>
                <p>{localized.hotelNote}</p>
              </article>
              <article>
                <span>02</span>
                <h3>{copy.transportTitle}</h3>
                <p>{localized.serviceNote}</p>
              </article>
            </div>
          </div>
        </section>

        {localized.faq?.length ? (
          <section
            className={styles.section}
            aria-labelledby="tour-choice-title"
          >
            <div className={styles.sectionInner}>
              <div className={`${styles.sectionHeading} ${styles.faqHeading}`}>
                <h2 id="tour-choice-title">{beforeYouChooseTitle[locale]}</h2>
              </div>
              <div className={`${styles.serviceGrid} ${styles.faqGrid}`}>
                {localized.faq.map((item) => (
                  <article key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section
          className={`${styles.section} ${styles.scopeSection}`}
          data-tour-reveal
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.scopeEyebrow}</p>
              <h2>{copy.scopeTitle}</h2>
              <p>
                {localized.bookingNote}
                {product.slug === "zhangjiajie-forest-4-day-private-tour" ? (
                  <ZhangjiajieTourComparisonLink
                    currentRoute="forest"
                    locale={locale}
                  />
                ) : null}
              </p>
            </div>
            <div className={styles.scopeGrid}>
              <section>
                <h3>{copy.exclusionsTitle}</h3>
                <ul>
                  {localized.exclusions.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>{copy.confirmedTitle}</h3>
                <ul>
                  {copy.confirmations.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" size={17} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </section>

        <section className={styles.section} data-tour-reveal>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{commercialCopy.productLabel}</p>
              <h2>{commercialCopy.productTitle}</h2>
              <p>{commercialCopy.productBody}</p>
            </div>
            <div className={`${styles.scopeGrid} ${styles.planningLinks}`}>
              {planningContext.destinations.length > 0 ? (
                <section>
                  <h3>{commercialCopy.destinations}</h3>
                  <ul>
                    {planningContext.destinations.map((link) => (
                      <li key={link.id}>
                        <Link href={link.href}>
                          <span>{link.label}</span>
                          <ArrowRight aria-hidden="true" size={17} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              <section>
                <h3>{commercialCopy.guides}</h3>
                <ul>
                  {planningContext.guides.map((link) => (
                    <li key={link.id}>
                      <Link href={link.href}>
                        <span>{link.label}</span>
                        <ArrowRight aria-hidden="true" size={17} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
              {planningContext.relatedProducts.length > 0 ? (
                <section>
                  <h3>{commercialCopy.related}</h3>
                  <ul>
                    {planningContext.relatedProducts.map((link) => (
                      <li key={link.id}>
                        <Link href={link.href}>
                          <span>{link.label}</span>
                          <ArrowRight aria-hidden="true" size={17} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.creditSection}`}>
          <div className={styles.sectionInner}>
            <details className={styles.photoCredits}>
              <summary>{photoCreditCopy.title}</summary>
              <div className={styles.photoCreditBody}>
                <p>{photoCreditCopy.intro}</p>
                {photoCredits.length > 0 ? (
                  <ul>
                    {photoCredits.map((item) => (
                      <li key={item.sourceUrl}>
                        <a
                          href={item.sourceUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {item.subject}
                        </a>
                        <span>
                          {photoCreditCopy.by} {item.author} ·{" "}
                          <a href={item.licenseUrl} rel="license">
                            {item.licenseLabel}
                          </a>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p>{photoCreditCopy.localNote}</p>
              </div>
            </details>
          </div>
        </section>

        <aside className={styles.finalCta} data-tour-reveal>
          <div className={styles.finalInner}>
            <div>
              <p className={styles.finalEyebrow}>{copy.finalEyebrow}</p>
              <h2>{copy.finalTitle}</h2>
              <p>{copy.finalBody}</p>
            </div>
            <div className={styles.finalActions}>
              <SelectedPrivateTourCta
                className={styles.finalPrimary}
                guideId={localized.id}
                href={inquiryHref}
                locale={locale}
                position="footer"
              >
                {copy.contact}
                <ArrowRight aria-hidden="true" size={18} />
              </SelectedPrivateTourCta>
              <SelectedPrivateTourEmailLink
                className={styles.finalEmail}
                email={homegroundBusiness.serviceEmail}
                locale={locale}
                href={buildPrivateTourMailtoHref(
                  homegroundBusiness.serviceEmail,
                  locale,
                  inquiryContext,
                )}
              >
                <Mail aria-hidden="true" size={16} />
                {copy.email}
              </SelectedPrivateTourEmailLink>
            </div>
          </div>
        </aside>
      </main>

      <HomegroundFooter locale={locale} pageContext="tour" />
      <PrivateTourMotion />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </div>
    </PrivateTourSelectionProvider>
  );
}
