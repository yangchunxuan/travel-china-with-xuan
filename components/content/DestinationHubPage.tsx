import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import {
  getDestinationHubEntry,
  getDestinationHubLanguagePaths,
  type DestinationHubId,
} from "../../lib/destinationHubs";
import { getGuideEntry } from "../../lib/guideRegistry";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../../lib/homegroundI18n";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../../lib/editorialIdentity";
import { getSearchPlatformCopy, getSearchSectionPath } from "../../lib/searchPlatformI18n";
import type { StructuredPageBody } from "../../lib/content-system/page-body";
import {
  projectDestinationOpening,
  projectDestinationOverview,
  projectDestinationStayExample,
} from "../../lib/destinationOverviewProjection";
import { HomegroundFooter } from "../HomegroundFooter";
import { HomegroundHeader } from "../HomegroundHeader";
import { PageFamilyRenderer } from "./PageFamilyRenderer";
import { EditorialByline } from "../EditorialByline";
import { AnimatedHeadline } from "../motion/AnimatedHeadline";
import { ReadingProgress } from "../motion/ReadingProgress";
import localeStyles from "../LocaleRoot.module.css";
import styles from "./EditorialGuidePage.module.css";
import destinationStyles from "./DestinationHubPage.module.css";
import { DestinationGeographyDiagram } from "./DestinationGeographyDiagram";
import {
  getDestinationPublishedRouteLinks,
  getExistingContentCommercialCopy,
} from "../../lib/existingContentCommercialLinks";
import {
  attractionReservationCityIds,
  attractionReservationPath,
  type AttractionReservationCityId,
} from "../../lib/attractionReservations";
import { fillReservationCopy, getAttractionReservationCopy } from "../../lib/attractionReservationsI18n";
import { cityPageV2 } from "../../lib/cityPage";
import { getCityOpening, getCityOverviewCards } from "../../lib/cityOverview";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog";
import { sights, sightsPath } from "../../lib/sights";
import { getSightsCopy } from "../../lib/sightsI18n";
import { travelInspirationThemePath, travelInspirationThemes } from "../../lib/travelInspiration";
import { getTravelInspirationCopy } from "../../lib/travelInspirationI18n";
import { PlanTile, ServiceRows, TourCard } from "../DestinationParts";
import { PhotoCreditLine, TourPhotoCredits } from "../PhotoCredits";
import { privateGuideCities } from "../../lib/privateGuideServices";
import type { HomegroundSubmenuId } from "../../lib/homegroundNavigationModel";
import { SightCard, SightPhotoCredits } from "../SightsPages";
import { KeepWords } from "../text/KeepWords";
import inspirationStyles from "../TravelInspiration.module.css";
import sightStyles from "../SightsPages.module.css";

const SITE_URL = "https://homegroundchina.com";
const overviewSignalIds = ["nights", "stay", "gateway", "next"] as const;

const zhHeadingSegments = {
  beijing: ["北京：", "故宫、长城", "和胡同，", "留足四五晚"],
  shanghai: ["上海：", "外滩夜景、", "老弄堂", "和摩天楼，", "留足四晚"],
  xian: ["西安：", "兵马俑、古城墙", "和回民街，", "留足三晚"],
  chengdu: ["成都：", "熊猫、茶馆", "和火锅，", "留足三晚"],
  guangzhou: ["广州：", "早茶、老街", "和珠江，", "留足三晚"],
  hangzhou: ["杭州：", "西湖、灵隐", "和龙井茶园，", "住上两晚"],
  zhangjiajie: ["张家界：", "云雾里的石柱，", "留足四五晚"],
  chongqing: ["重庆：", "爬坡上坎、", "两江夜色，", "留足三晚"],
} as const satisfies Record<DestinationHubId, readonly string[]>;

/** Korean object particle after a name: 을 after a final consonant (베이징을), 를 after a vowel (상하이를). */
function koObject(word: string) {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return `${word}${code >= 0 && code < 11172 && code % 28 !== 0 ? "을" : "를"}`;
}

const ui = {
  en: {
    skip: "Skip to the guide",
    breadcrumb: "Breadcrumb",
    home: "Home",
    eyebrow: "Destination hub",
    reviewed: "Reviewed",
    ctaLabel: "Plan with a local team",
    ctaTitle: "Tell us the trip you are considering.",
    ctaBody:
      "Share your dates, group size and rough budget. A real person will help you work out a sensible route and the support you actually need.",
    ctaButton: "Start my trip brief",
    whatLabel: "Must-See Sights",
    whatTitle: (city: string) => `What to see in ${city}`,
    whatBody: "Open one for why it is worth the trip and how to visit; the four decisions below show how to fit them into your days.",
    themeLink: (name: string) => `Trip ideas: ${name}`,
    toursLabel: "Private tours",
    toursTitle: (city: string) => `Private tours that include ${city}`,
    allTours: "All private tours",
    toursBody: "Ready-made routes with their itinerary and price on each page. Just your group, on your dates.",
    bandTitle: "Hand us the whole trip, or just part of it.",
    bandTitleTrip: "Hand us the whole trip.",
    bandBodyTrip: "A real person replies, working from your dates and group size.",
    bandBody: "A real person replies to each request, working from your dates and group size.",
    v2Eyebrow: "City guide",
    v2DecisionsTitle: "Understand the city, then plan the details.",
    v2DecisionsBody: "How many nights, which area to stay in, how to arrive and leave, where to go next. How to book each part is in Travel Advice.",
    v2DetailedAnswers: (city: string) => `More on ${city}`,
    v2DetailedAnswersBody: "From where to stay to getting in and out of the city, one guide for each question.",
    v2EvidenceBody: "The facts on this page come from the official and primary sources below. Opening times and rules change, so check them again before you go.",
    decisionsLabel: "Four city decisions",
    decisionsTitle: "Understand the city before solving the details.",
    decisionsBody: "This page owns the broad shape: how long to stay, where to base, which gateway matters and what should come next. Booking steps and recovery advice live in the focused Travel Advice below.",
    adviceAction: "Search Travel Advice",
    signalLabels: { nights: "Time", stay: "Stay base", gateway: "Gateways", next: "Next place" },
    detailedAnswersLabel: "Deeper answers",
    detailedAnswers: "Detailed answers connected to this city",
    detailedAnswersBody: "These narrower guides own the single-task detail. The city hub keeps their relationship to the whole stay visible.",
    evidenceSummary: "Sources and review record",
    evidenceReviewed: "Facts reviewed",
    evidenceBody: "This compact overview is projected from Homeground's full city research. The cited official and primary sources remain attached so time-sensitive claims can be checked again before travel.",
  },
  zh: {
    skip: "跳到正文",
    breadcrumb: "当前位置",
    home: "首页",
    eyebrow: "城市总览",
    reviewed: "资料核对",
    ctaLabel: "和本地团队一起规划",
    ctaTitle: "告诉我们你正在考虑的旅行。",
    ctaBody:
      "留下日期、人数和大致预算。真人规划师会帮你判断合理路线，以及这趟旅行真正需要哪些支持。",
    ctaButton: "开始填写旅行简报",
    whatLabel: "必去景点",
    whatTitle: (city: string) => `${city}必去的几个地方`,
    whatBody: "点进去看为什么值得去、怎么去；怎么排进行程，看下面的四个决定。",
    themeLink: (name: string) => `旅行灵感：${name}`,
    toursLabel: "私家团",
    toursTitle: (city: string) => `包含${city}的私家团`,
    allTours: "全部私家团",
    toursBody: "现成路线，行程和价格写在各自的路线页上；只接待你们一行人，出发日期你们定。",
    bandTitle: "整趟交给我们，或只交一部分。",
    bandTitleTrip: "把整趟旅行交给我们。",
    bandBodyTrip: "真人回复，按你们的日期和人数来安排。",
    bandBody: "每一项都由真人回复，按你们的日期和人数来安排。",
    v2Eyebrow: "城市指南",
    v2DecisionsTitle: "先看懂这座城市，再安排细节。",
    v2DecisionsBody: "住几晚、住在哪一区、从哪里进出、下一站去哪；具体怎么预订，看实用指南。",
    v2DetailedAnswers: (city: string) => `${city}的具体问题`,
    v2DetailedAnswersBody: "从住哪里到怎么进出城，一篇讲清一件事。",
    v2EvidenceBody: "本页信息来自下面的官方与一手来源。开放时间和规定会变，出发前请再核对一次。",
    decisionsLabel: "四个城市决定",
    decisionsTitle: "先看懂这座城市，再处理执行细节。",
    decisionsBody: "本页只负责整座城市的形状：住多久、以哪里为基地、哪个进出门户重要、下一站接哪里。预订步骤与失败补救交给下方的专题实用指南。",
    adviceAction: "搜索实用指南",
    signalLabels: { nights: "停留时间", stay: "住宿基地", gateway: "进出门户", next: "下一站" },
    detailedAnswersLabel: "深入答案",
    detailedAnswers: "与这座城市直接相关的深入答案",
    detailedAnswersBody: "以下专题指南负责单一问题的细节；城市 Hub 负责说明它们怎样共同影响整段停留。",
    evidenceSummary: "来源与核对记录",
    evidenceReviewed: "资料核对日期",
    evidenceBody: "这份精简城市总览来自 Homeground 的完整城市研究。官方与一手来源继续保留，便于在出发前重新核对可能变化的信息。",
  },
  ko: {
    skip: "본문으로 이동",
    breadcrumb: "현재 위치",
    home: "홈",
    eyebrow: "도시 허브",
    reviewed: "자료 확인",
    ctaLabel: "현지 팀과 여행 설계",
    ctaTitle: "생각 중인 중국 여행을 알려 주세요.",
    ctaBody:
      "여행 날짜, 인원, 대략적인 예산을 남기면 실제 담당자가 무리 없는 동선과 필요한 지원 범위를 함께 정리합니다.",
    ctaButton: "여행 브리프 시작하기",
    whatLabel: "꼭 가볼 명소",
    whatTitle: (city: string) => `${city}에서 꼭 가볼 곳`,
    whatBody: "누르면 가 볼 만한 이유와 방문 방법을 볼 수 있습니다. 일정에 어떻게 넣을지는 아래 네 가지 판단을 참고하세요.",
    themeLink: (name: string) => `테마 여행: ${name}`,
    toursLabel: "프라이빗 투어",
    // "프라이빗 투어" stays on one line.
    toursTitle: (city: string) => `${koObject(city)} 포함한 프라이빗${String.fromCharCode(0xa0)}투어`,
    allTours: "프라이빗 투어 전체 보기",
    toursBody: "일정과 가격을 공개한 코스입니다. 우리 일행만, 원하는 날짜에 다닙니다.",
    bandTitle: "전체 여행도, 일부만도 맡기실 수 있습니다.",
    bandTitleTrip: "전체 여행을 맡겨 주세요.",
    bandBodyTrip: "실제 담당자가 날짜와 인원에 맞춰 답해 드립니다.",
    bandBody: "어느 쪽이든 실제 담당자가 날짜와 인원에 맞춰 답해 드립니다.",
    v2Eyebrow: "도시 가이드",
    v2DecisionsTitle: "도시의 구조를 먼저 보고, 세부 일정을 정하세요.",
    v2DecisionsBody: "몇 박을 할지, 어느 지역에 묵을지, 어디로 들어오고 나갈지, 다음엔 어디로 갈지. 예약 방법은 실용 가이드에서 확인하세요.",
    v2DetailedAnswers: (city: string) => `${city} 더 알아보기`,
    v2DetailedAnswersBody: "숙소부터 오가는 교통까지, 질문 하나에 한 편씩 정리했습니다.",
    v2EvidenceBody: "이 페이지의 정보는 아래 공식·1차 출처를 바탕으로 했습니다. 운영 시간과 규정은 바뀔 수 있으니 출발 전에 다시 확인하세요.",
    decisionsLabel: "도시를 정하는 네 가지 판단",
    decisionsTitle: "세부 예약보다 도시의 구조를 먼저 이해하세요.",
    decisionsBody: "이 페이지는 체류 기간, 숙소 거점, 주요 관문과 다음 도시라는 큰 틀만 맡습니다. 예약 절차와 문제 해결은 아래의 실용 가이드에서 확인하세요.",
    adviceAction: "실용 가이드 검색",
    signalLabels: { nights: "체류 시간", stay: "숙소 거점", gateway: "관문", next: "다음 도시" },
    detailedAnswersLabel: "더 깊은 답변",
    detailedAnswers: "이 도시와 연결된 세부 답변",
    detailedAnswersBody: "아래 전문 가이드는 한 가지 과제의 세부 내용을 맡고, 도시 허브는 전체 체류와의 관계를 보여 줍니다.",
    evidenceSummary: "출처 및 검토 기록",
    evidenceReviewed: "자료 검토일",
    evidenceBody: "이 간결한 도시 개요는 Homeground의 전체 도시 조사를 바탕으로 구성했습니다. 출발 전에 변동 가능성이 있는 정보를 다시 확인할 수 있도록 공식·1차 출처를 함께 제공합니다.",
  },
} as const;

function getVisibleHubSources(body: StructuredPageBody) {
  const seen = new Set<string>();
  return body.blocks
    .flatMap((block) => (block.type === "sources" ? block.items : []))
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .slice(0, 4);
}

function structuredData(
  hub: ReturnType<typeof getDestinationHubEntry>,
  locale: HomegroundLocale,
  body: StructuredPageBody,
) {
  const copy = ui[locale];
  const homeCopy = getHomegroundCopy(locale);
  const platformCopy = getSearchPlatformCopy(locale);
  const explorePath = getSearchSectionPath("explore", locale);
  const sources = body.blocks.flatMap((block) =>
    block.type === "sources" ? block.items.map((item) => item.url) : [],
  );
  const faqItems = body.blocks.flatMap((block) =>
    block.type === "faq" ? block.items : [],
  );
  const inLanguage = locale === "zh" ? "zh-Hans" : locale;

  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialOrganizationSchema(),
      editorialWebsiteSchema(),
      {
        "@type": "Place",
        "@id": `${hub.canonicalUrl}#place`,
        name: hub.navTitle,
        description: hub.summary,
      },
      {
        "@type": "CollectionPage",
        "@id": `${hub.canonicalUrl}#page`,
        url: hub.canonicalUrl,
        name: hub.h1,
        description: hub.description,
        about: { "@id": `${hub.canonicalUrl}#place` },
        inLanguage,
        datePublished: hub.datePublished,
        dateModified: hub.dateModified,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: hub.heroImageUrl,
          width: hub.imageWidth,
          height: hub.imageHeight,
        },
        ...(sources.length > 0 ? { citation: sources } : {}),
      },
      ...(faqItems.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${hub.canonicalUrl}#faq`,
              url: hub.canonicalUrl,
              inLanguage,
              isPartOf: { "@id": `${hub.canonicalUrl}#page` },
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
      {
        "@type": "ItemList",
        "@id": `${hub.canonicalUrl}#owners`,
        itemListElement: hub.supportGuideIds.slice(0, 6).map((guideId, index) => {
          const guide = getGuideEntry(guideId, locale);
          return {
            "@type": "ListItem",
            position: index + 1,
            name: guide.navTitle,
            url: guide.canonicalUrl,
          };
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.home,
            item: `${SITE_URL}${homeCopy.path}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: platformCopy.sections.explore.navLabel,
            item: `${SITE_URL}${explorePath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: hub.navTitle,
            item: hub.canonicalUrl,
          },
        ],
      },
    ],
  };
}

export function DestinationHubPage({
  body,
  hubId,
  locale,
}: {
  body: StructuredPageBody;
  hubId: DestinationHubId;
  locale: HomegroundLocale;
}) {
  const hub = getDestinationHubEntry(hubId, locale);
  const copy = ui[locale];
  const homeCopy = getHomegroundCopy(locale);
  const platformCopy = getSearchPlatformCopy(locale);
  const explorePath = getSearchSectionPath("explore", locale);
  const openingBody = projectDestinationOpening(body, hubId);
  const overviewSignals = projectDestinationOverview(body, hubId, locale);
  // A city with hand-written decisions shows those: one answer, then why.
  const overviewCards = getCityOverviewCards(hubId, locale);
  const cityOpening = getCityOpening(hubId, locale);
  const cityOpeningBody: StructuredPageBody | null = cityOpening
    ? {
        schemaVersion: body.schemaVersion,
        blocks: [
          { id: "city-opening-heading", type: "heading", level: 2, text: cityOpening.heading },
          ...cityOpening.paragraphs.map((text, index) => ({ id: `city-opening-${index + 1}`, type: "paragraph" as const, text })),
        ],
      }
    : null;
  const stayExample = projectDestinationStayExample(body, hubId);
  const dayTripLinks =
    hubId === "shanghai"
      ? body.blocks.find((block) => block.id === "delta-day-trip-links")
      : undefined;
  if (hubId === "shanghai" && dayTripLinks?.type !== "internal-links") {
    throw new Error("Shanghai destination day-trip links are missing.");
  }
  const ownerGuideIds = hub.supportGuideIds.slice(0, 6);
  const visibleSources = getVisibleHubSources(body);
  const date = new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${hub.sourceReviewedDate}T00:00:00.000Z`));
  const schema = structuredData(hub, locale, body);
  const titleSegments = locale === "zh" ? zhHeadingSegments[hubId] : null;
  const commercialCopy = getExistingContentCommercialCopy(locale);
  const publishedRouteLinks = getDestinationPublishedRouteLinks(hubId, locale);
  // The second version (Beijing first): what to do here, then tours and services as cards.
  const v2 = cityPageV2[hubId];
  const citySights = v2 ? sights.filter((sight) => sight.city === hubId) : [];
  const cityThemes = v2 ? travelInspirationThemes.filter((theme) => (theme.cityIds as readonly string[]).includes(hubId)) : [];
  const catalog = v2 ? getPublishedPrivateTourCatalog(locale) : [];
  const cityTours = (v2?.tourSlugs ?? []).map((slug) => {
    const tour = catalog.find((item) => item.slug === slug);
    if (!tour) throw new Error(`City page ${hubId} names an unpublished tour: ${slug}`);
    return tour;
  });
  const inspiration = getTravelInspirationCopy(locale);
  // Offer only what the city has: ticket booking in the booking-service cities, guides in four.
  const missingServices: HomegroundSubmenuId[] = [
    ...((attractionReservationCityIds as readonly string[]).includes(hubId) ? [] : ["attraction-tickets" as const]),
    ...((privateGuideCities as readonly string[]).includes(hubId) ? [] : ["english-guides" as const]),
  ];
  // Only the whole trip left to offer: the band says so instead of "or just part of it".
  const tripOnly = missingServices.length === 2;
  const sightsCopy = getSightsCopy(locale);
  // How many published tours pass through this city (by the city's Chinese name on each route line).
  const reservationLink = (attractionReservationCityIds as readonly string[]).includes(hubId)
    ? {
        href: `${attractionReservationPath[locale]}#city-${hubId}`,
        label: fillReservationCopy(getAttractionReservationCopy(locale).hubLink, {
          city: getAttractionReservationCopy(locale).cities[hubId as AttractionReservationCityId],
        }),
      }
    : null;

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.pageRoot} ${styles.grokGuide} ${destinationStyles.destinationRoot}`}
      data-homeground-locale={locale}
      lang={homeCopy.htmlLang}
    >
      <a className={styles.skipLink} href="#destination-hub-body">
        {copy.skip}
      </a>
      <ReadingProgress />

      <HomegroundHeader
        languagePaths={getDestinationHubLanguagePaths(hubId)}
        locale={locale}
        pageContext="destination"
      />

      <main>
        <header className={`${styles.hero} ${destinationStyles.destinationHero}`}>
          <div className={`${styles.heroCopy} ${destinationStyles.destinationHeroCopy}`}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
              <ol>
                <li>
                  <Link href={homeCopy.path}>{copy.home}</Link>
                </li>
                <li>
                  <span aria-hidden="true">/</span>
                  <Link href={explorePath}>
                    {platformCopy.sections.explore.navLabel}
                  </Link>
                </li>
                <li aria-current="page">
                  <span aria-hidden="true">/</span>
                  {hub.navTitle}
                </li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>
              <span>{v2 ? copy.v2Eyebrow : copy.eyebrow}</span>
              <span>
                {copy.reviewed} {date}
              </span>
            </p>
            <h1>
              {titleSegments ? (
                titleSegments.map((segment, index) => (
                  <span className={styles.keepTogether} key={`${segment}-${index}`} style={{ "--word-index": index } as CSSProperties}>
                    {segment}
                  </span>
                ))
              ) : (
                <AnimatedHeadline locale={locale} text={hub.h1} />
              )}
            </h1>
            <p className={styles.dek}>{hub.summary}</p>
            <EditorialByline locale={locale} reviewedAt={hub.sourceReviewedDate} />
          </div>

          <figure className={`${styles.heroFigure} ${destinationStyles.destinationHeroFigure}`}>
            <Image
              alt={hub.heroAlt}
              fetchPriority="high"
              height={hub.imageHeight}
              priority
              sizes="(max-width: 860px) 100vw, 44vw"
              src={hub.heroImagePath}
              width={hub.imageWidth}
            />
            <figcaption className={styles.heroCredit}>
              {hub.heroCaption}
              {hub.heroCredit ? <PhotoCreditLine className={destinationStyles.heroPhotoCredit} credit={hub.heroCredit} locale={locale} /> : null}
            </figcaption>
          </figure>
        </header>

        <article
          className={`${styles.article} ${destinationStyles.destinationArticle}`}
          data-content-body
          id="destination-hub-body"
        >
          {v2 ? (
            // The second version: what to see first, then the four decisions,
            // the map, the opening argument and the deeper answers; sources
            // close the reading and the tours lead into the one closing band.
            <>
              {citySights.length ? (
                <section aria-labelledby="destination-what-title" className={`${inspirationStyles.tokens} ${destinationStyles.cityWhat}`}>
                  <div className={destinationStyles.cityBlockHead}>
                    <p>{copy.whatLabel}</p>
                    <h2 id="destination-what-title"><KeepWords locale={locale} text={copy.whatTitle(hub.navTitle)} /></h2>
                    <p><KeepWords keep={["排进行程"]} locale={locale} text={copy.whatBody} /></p>
                  </div>
                  <ul className={`${sightStyles.sightGrid} ${destinationStyles.citySightGrid}`}>
                    {citySights.map((sight, index) => <SightCard hideCity index={index} key={sight.id} locale={locale} sight={sight} />)}
                  </ul>
                  <SightPhotoCredits items={citySights} locale={locale} />
                  <p className={destinationStyles.cityBlockLinks}>
                    <Link href={sightsPath[locale]}><span className={destinationStyles.cityLinkText}>{sightsCopy.page.allSights}</span><span aria-hidden="true">→</span></Link>
                    {cityThemes.map((theme) => (
                      <Link href={travelInspirationThemePath(theme.id, locale)} key={theme.id}>
                        <span className={destinationStyles.cityLinkText}>{copy.themeLink(inspiration.themes[theme.id].name)}</span><span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </p>
                </section>
              ) : null}
              <section className={destinationStyles.decisionIndex} aria-labelledby="destination-signals-title">
                <div className={destinationStyles.decisionIntro}>
                  <div>
                    <p>{copy.decisionsLabel}</p>
                    <h2 id="destination-signals-title"><KeepWords keep={["再安排细节"]} locale={locale} text={copy.v2DecisionsTitle} /></h2>
                    <p><KeepWords locale={locale} text={copy.v2DecisionsBody} /></p>
                  </div>
                  <Link href={`${homeCopy.path}guides/`}>
                    {copy.adviceAction}<span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className={destinationStyles.signalGrid}>
                  {overviewCards
                    ? overviewSignalIds.map((id, index) => (
                        <section className={`${destinationStyles.signalCard} ${destinationStyles.answerCard}`} key={id}>
                          <p>
                            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                            {copy.signalLabels[id]}
                          </p>
                          <h3>{overviewCards[id].answer}</h3>
                          <p>{overviewCards[id].detail}</p>
                        </section>
                      ))
                    : overviewSignals.map((signal, index) => (
                        <section className={destinationStyles.signalCard} key={signal.id}>
                          <p>
                            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                            {copy.signalLabels[signal.id]}
                          </p>
                          <h3>{signal.sourceHeading}</h3>
                          {signal.emphasis ? <strong>{signal.emphasis}</strong> : null}
                          <p>{signal.summary}</p>
                        </section>
                      ))}
                </div>
              </section>
              <DestinationGeographyDiagram
                copy={hub.geography}
                locale={locale}
                nodes={hub.geometry}
              />
              {cityOpeningBody ? (
                <div className={destinationStyles.destinationOpening}>
                  <PageFamilyRenderer body={cityOpeningBody} />
                </div>
              ) : openingBody.blocks.length > 0 ? (
                <div className={destinationStyles.destinationOpening}>
                  <PageFamilyRenderer body={openingBody} />
                </div>
              ) : null}
              {dayTripLinks ? (
                <div className={destinationStyles.dayTripLinks}>
                  <PageFamilyRenderer
                    body={{ schemaVersion: body.schemaVersion, blocks: [dayTripLinks] }}
                  />
                </div>
              ) : null}
              {stayExample.blocks.length > 0 ? (
                <section
                  className={destinationStyles.stayExample}
                  aria-labelledby={stayExample.blocks[0].id}
                >
                  <PageFamilyRenderer body={stayExample} />
                </section>
              ) : null}
              <section className={destinationStyles.ownerLinks} aria-labelledby="destination-owner-links-title">
                <div>
                  <p>{copy.detailedAnswersLabel}</p>
                  <h2 id="destination-owner-links-title"><KeepWords locale={locale} text={copy.v2DetailedAnswers(hub.navTitle)} /></h2>
                  <p><KeepWords locale={locale} text={copy.v2DetailedAnswersBody} /></p>
                </div>
                <ul>
                  {ownerGuideIds.map((guideId) => {
                    const guide = getGuideEntry(guideId, locale);
                    return <li key={guideId}><Link href={guide.canonicalPath}>{guide.navTitle}<span aria-hidden="true">→</span></Link></li>;
                  })}
                </ul>
              </section>
              {visibleSources.length > 0 ? (
                <aside
                  aria-labelledby="destination-evidence-title"
                  className={destinationStyles.evidencePanel}
                >
                  <header className={destinationStyles.evidenceHeader}>
                    <h2 id="destination-evidence-title">{copy.evidenceSummary}</h2>
                    <p>
                      {copy.evidenceReviewed}{" "}
                      <time dateTime={hub.sourceReviewedDate}>{date}</time>
                    </p>
                  </header>
                  <div className={destinationStyles.evidenceBody}>
                    <p>{copy.v2EvidenceBody}</p>
                    <ul>
                      {visibleSources.map((source) => (
                        <li key={source.url}>
                          <a href={source.url} rel="noreferrer">
                            {source.publisher ? `${source.publisher}: ` : ""}
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              ) : null}
              <section aria-labelledby="destination-published-routes-title" className={`${inspirationStyles.tokens} ${destinationStyles.cityTours}`}>
                <div className={destinationStyles.cityBlockHead}>
                  <p>{copy.toursLabel}</p>
                  <h2 id="destination-published-routes-title"><KeepWords locale={locale} text={copy.toursTitle(hub.navTitle)} /></h2>
                  <p><KeepWords locale={locale} text={copy.toursBody} /></p>
                </div>
                <ul className={inspirationStyles.tours}>
                  {cityTours.map((tour, index) => <TourCard index={index} key={tour.slug} locale={locale} tour={tour} />)}
                  {/* A row the city's tours do not fill ends with the way to a trip planned around you. */}
                  <PlanTile count={cityTours.length} locale={locale} />
                </ul>
                <TourPhotoCredits locale={locale} tours={cityTours} />
                <p className={destinationStyles.cityBlockLinks}>
                  <Link href={`${homeCopy.path}tours/`}><span className={destinationStyles.cityLinkText}>{copy.allTours}</span><span aria-hidden="true">→</span></Link>
                </p>
              </section>
            </>
          ) : (
            <>
              {openingBody.blocks.length > 0 ? (
                <div className={destinationStyles.destinationOpening}>
                  <PageFamilyRenderer body={openingBody} />
                </div>
              ) : null}
              <DestinationGeographyDiagram
                copy={hub.geography}
                locale={locale}
                nodes={hub.geometry}
              />
              <section className={destinationStyles.decisionIndex} aria-labelledby="destination-signals-title">
                <div className={destinationStyles.decisionIntro}>
                  <div>
                    <p>{copy.decisionsLabel}</p>
                    <h2 id="destination-signals-title">{copy.decisionsTitle}</h2>
                    <p>{copy.decisionsBody}</p>
                  </div>
                  <Link href={`${homeCopy.path}guides/`}>
                    {copy.adviceAction}<span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className={destinationStyles.signalGrid}>
                  {overviewSignals.map((signal, index) => (
                    <section className={destinationStyles.signalCard} key={signal.id}>
                      <p>
                        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        {copy.signalLabels[signal.id]}
                      </p>
                      <h3>{signal.sourceHeading}</h3>
                      {signal.emphasis ? <strong>{signal.emphasis}</strong> : null}
                      <p>{signal.summary}</p>
                    </section>
                  ))}
                </div>
              </section>
              {dayTripLinks ? (
                <div className={destinationStyles.dayTripLinks}>
                  <PageFamilyRenderer
                    body={{ schemaVersion: body.schemaVersion, blocks: [dayTripLinks] }}
                  />
                </div>
              ) : null}
              {stayExample.blocks.length > 0 ? (
                <section
                  className={destinationStyles.stayExample}
                  aria-labelledby={stayExample.blocks[0].id}
                >
                  <PageFamilyRenderer body={stayExample} />
                </section>
              ) : null}
              <section className={destinationStyles.ownerLinks} aria-labelledby="destination-owner-links-title">
                <div>
                  <p>{copy.detailedAnswersLabel}</p>
                  <h2 id="destination-owner-links-title">{copy.detailedAnswers}</h2>
                  <p>{copy.detailedAnswersBody}</p>
                </div>
                <ul>
                  {ownerGuideIds.map((guideId) => {
                    const guide = getGuideEntry(guideId, locale);
                    return <li key={guideId}><Link href={guide.canonicalPath}>{guide.navTitle}<span aria-hidden="true">→</span></Link></li>;
                  })}
                </ul>
              </section>
              <section
                className={destinationStyles.ownerLinks}
                aria-labelledby="destination-published-routes-title"
              >
                <div>
                  <p>{commercialCopy.hubLabel}</p>
                  <h2 id="destination-published-routes-title">
                    {commercialCopy.hubTitle}
                  </h2>
                  <p>{commercialCopy.hubBody}</p>
                </div>
                <ul>
                  {publishedRouteLinks.map((route) => (
                    <li key={route.id}>
                      <Link href={route.href}>
                        {route.label}<span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                  {reservationLink ? (
                    <li>
                      <Link href={reservationLink.href}>
                        {reservationLink.label}<span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </section>
              {visibleSources.length > 0 ? (
                <aside
                  aria-labelledby="destination-evidence-title"
                  className={destinationStyles.evidencePanel}
                >
                  <header className={destinationStyles.evidenceHeader}>
                    <h2 id="destination-evidence-title">{copy.evidenceSummary}</h2>
                    <p>
                      {copy.evidenceReviewed}{" "}
                      <time dateTime={hub.sourceReviewedDate}>{date}</time>
                    </p>
                  </header>
                  <div className={destinationStyles.evidenceBody}>
                    <p>{copy.evidenceBody}</p>
                    <ul>
                      {visibleSources.map((source) => (
                        <li key={source.url}>
                          <a href={source.url} rel="noreferrer">
                            {source.publisher ? `${source.publisher}: ` : ""}
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              ) : null}
            </>
          )}
        </article>

        {v2 ? (
          <section
            aria-labelledby="destination-band-title"
            className={`${inspirationStyles.tokens} ${inspirationStyles.cta} ${destinationStyles.cityBand}`}
            data-similarity-ignore
          >
            <div>
              <p className={destinationStyles.cityBandLabel}>{copy.ctaLabel}</p>
              <h2 id="destination-band-title"><KeepWords keep={["整趟交给我们，", "或只交一部分。"]} locale={locale} text={tripOnly ? copy.bandTitleTrip : copy.bandTitle} /></h2>
              <p><KeepWords locale={locale} text={tripOnly ? copy.bandBodyTrip : copy.bandBody} /></p>
            </div>
            <ServiceRows locale={locale} omit={missingServices} />
          </section>
        ) : (
          <aside
            className={`${styles.cta} ${destinationStyles.destinationCta}`}
            data-similarity-ignore
          >
            <div>
              <p className={styles.ctaLabel}>{copy.ctaLabel}</p>
              <h2>{copy.ctaTitle}</h2>
              <p>{copy.ctaBody}</p>
            </div>
            <Link href={`${homeCopy.path}#planner-contact`}>
              {copy.ctaButton}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </aside>
        )}
      </main>

      <HomegroundFooter locale={locale} pageContext="destination" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
