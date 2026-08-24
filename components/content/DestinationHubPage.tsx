import Image from "next/image";
import Link from "next/link";
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
} from "../../lib/destinationOverviewProjection";
import { HomegroundFooter } from "../HomegroundFooter";
import { HomegroundHeader } from "../HomegroundHeader";
import { PageFamilyRenderer } from "./PageFamilyRenderer";
import { EditorialByline } from "../EditorialByline";
import homeStyles from "../HomegroundHomePage.module.css";
import styles from "./EditorialGuidePage.module.css";
import destinationStyles from "./DestinationHubPage.module.css";
import { DestinationGeographyDiagram } from "./DestinationGeographyDiagram";

const SITE_URL = "https://homegroundchina.com";

const zhHeadingSegments = {
  beijing: ["北京：", "先分配", "完整的一天，", "再安排景点"],
  shanghai: ["上海：", "先算", "完整游览日，", "再决定", "住哪一岸"],
  xian: ["西安：", "住几晚、", "以哪里为基地、", "下一站去哪"],
  chengdu: ["成都：", "先把城市", "住稳，", "再搭四川路线"],
  guangzhou: ["广州：", "住几晚、", "住哪个区、", "走哪个门户"],
  hangzhou: ["杭州：", "先决定一日往返，", "还是把杭州真正住下来"],
  zhangjiajie: ["张家界：", "先分清市区、", "武陵源和不同山岳系统"],
  chongqing: ["重庆：", "选对住宿基地、", "车站和停留晚数"],
} as const satisfies Record<DestinationHubId, readonly string[]>;

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
  const ownerGuideIds = hub.supportGuideIds.slice(0, 6);
  const visibleSources = getVisibleHubSources(body);
  const date = new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${hub.sourceReviewedDate}T00:00:00.000Z`));
  const schema = structuredData(hub, locale, body);
  const titleSegments = locale === "zh" ? zhHeadingSegments[hubId] : null;

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.pageRoot} ${destinationStyles.destinationRoot}`}
      data-homeground-locale={locale}
      lang={homeCopy.htmlLang}
    >
      <a className={styles.skipLink} href="#destination-hub-body">
        {copy.skip}
      </a>

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
              <span>{copy.eyebrow}</span>
              <span>
                {copy.reviewed} {date}
              </span>
            </p>
            <h1>
              {titleSegments ? (
                titleSegments.map((segment, index) => (
                  <span className={styles.keepTogether} key={`${segment}-${index}`}>
                    {segment}
                  </span>
                ))
              ) : (
                hub.h1
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
            <figcaption className={styles.heroCredit}>{hub.heroCaption}</figcaption>
          </figure>
        </header>

        <article
          className={`${styles.article} ${destinationStyles.destinationArticle}`}
          data-content-body
          id="destination-hub-body"
        >
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
        </article>

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
