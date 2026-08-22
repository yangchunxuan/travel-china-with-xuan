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
import { HomegroundFooter } from "../HomegroundFooter";
import { HomegroundHeader } from "../HomegroundHeader";
import { PageFamilyRenderer } from "./PageFamilyRenderer";
import { EditorialByline } from "../EditorialByline";
import homeStyles from "../HomegroundHomePage.module.css";
import styles from "./EditorialGuidePage.module.css";
import { DestinationGeographyDiagram } from "./DestinationGeographyDiagram";

const SITE_URL = "https://homegroundchina.com";

const zhHeadingSegments = {
  beijing: ["北京旅行指南：", "先分配", "完整的一天，", "再安排景点"],
  shanghai: ["上海旅行指南：", "先算", "完整游览日，", "再决定", "住哪一岸"],
  xian: ["西安旅行指南：", "住几晚、", "以哪里为基地、", "下一站去哪"],
  chengdu: ["成都旅行指南：", "先把城市", "住稳，", "再搭四川路线"],
  guangzhou: ["广州旅行指南：", "住几晚、", "住哪个区、", "走哪个门户"],
  hangzhou: ["杭州旅行指南：", "先决定一日往返，", "还是把杭州真正住下来"],
  zhangjiajie: ["张家界旅行指南：", "先分清市区、", "武陵源和不同山岳系统"],
  chongqing: ["重庆旅行指南：", "选对住宿基地、", "车站和停留晚数"],
} as const satisfies Record<DestinationHubId, readonly string[]>;

const ui = {
  en: {
    skip: "Skip to the guide",
    breadcrumb: "Breadcrumb",
    home: "Home",
    guides: "Travel guides",
    eyebrow: "Destination hub",
    reviewed: "Reviewed",
    ctaLabel: "Plan with a local team",
    ctaTitle: "Tell us the trip you are considering.",
    ctaBody:
      "Share your dates, group size and rough budget. A real person will help you work out a sensible route and the support you actually need.",
    ctaButton: "Start my trip brief",
  },
  zh: {
    skip: "跳到正文",
    breadcrumb: "当前位置",
    home: "首页",
    guides: "旅行指南",
    eyebrow: "城市总览",
    reviewed: "资料核对",
    ctaLabel: "和本地团队一起规划",
    ctaTitle: "告诉我们你正在考虑的旅行。",
    ctaBody:
      "留下日期、人数和大致预算。真人规划师会帮你判断合理路线，以及这趟旅行真正需要哪些支持。",
    ctaButton: "开始填写旅行简报",
  },
  ko: {
    skip: "본문으로 이동",
    breadcrumb: "현재 위치",
    home: "홈",
    guides: "여행 가이드",
    eyebrow: "도시 허브",
    reviewed: "자료 확인",
    ctaLabel: "현지 팀과 여행 설계",
    ctaTitle: "생각 중인 중국 여행을 알려 주세요.",
    ctaBody:
      "여행 날짜, 인원, 대략적인 예산을 남기면 실제 담당자가 무리 없는 동선과 필요한 지원 범위를 함께 정리합니다.",
    ctaButton: "여행 브리프 시작하기",
  },
} as const;

/**
 * The diagram belongs after the opening argument but before the decision
 * tables. Splitting on the second level-2 heading keeps that position without
 * a second source of truth about block order.
 */
function diagramSplitIndex(body: StructuredPageBody) {
  let seen = 0;
  for (const [index, block] of body.blocks.entries()) {
    if (block.type === "heading" && block.level === 2) {
      seen += 1;
      if (seen === 2) return index;
    }
  }
  return body.blocks.length;
}

function structuredData(
  hub: ReturnType<typeof getDestinationHubEntry>,
  locale: HomegroundLocale,
  body: StructuredPageBody,
) {
  const copy = ui[locale];
  const homeCopy = getHomegroundCopy(locale);
  const platformCopy = getSearchPlatformCopy(locale);
  const guidesPath = `${homeCopy.path}guides/`;
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
        itemListElement: hub.supportGuideIds.map((guideId, index) => {
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
            name: copy.guides,
            item: `${SITE_URL}${guidesPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: platformCopy.sections.explore.navLabel,
            item: `${SITE_URL}${explorePath}`,
          },
          {
            "@type": "ListItem",
            position: 4,
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
  const guidesPath = `${homeCopy.path}guides/`;
  const explorePath = getSearchSectionPath("explore", locale);
  const splitIndex = diagramSplitIndex(body);
  const openingBody: StructuredPageBody = {
    schemaVersion: body.schemaVersion,
    blocks: body.blocks.slice(0, splitIndex),
  };
  const remainingBody: StructuredPageBody = {
    schemaVersion: body.schemaVersion,
    blocks: body.blocks.slice(splitIndex),
  };
  const date = new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${hub.sourceReviewedDate}T00:00:00.000Z`));
  const schema = structuredData(hub, locale, body);
  const titleSegments = locale === "zh" ? zhHeadingSegments[hubId] : null;

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.pageRoot}`}
      data-homeground-locale={locale}
      lang={homeCopy.htmlLang}
    >
      <a className={styles.skipLink} href="#destination-hub-body">
        {copy.skip}
      </a>

      <HomegroundHeader
        languagePaths={getDestinationHubLanguagePaths(hubId)}
        locale={locale}
        pageContext="content"
      />

      <main>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
              <ol>
                <li>
                  <Link href={homeCopy.path}>{copy.home}</Link>
                </li>
                <li>
                  <span aria-hidden="true">/</span>
                  <Link href={guidesPath}>{copy.guides}</Link>
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

          <figure className={styles.heroFigure}>
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

        <article className={styles.article} data-content-body id="destination-hub-body">
          <PageFamilyRenderer body={openingBody} />
          <DestinationGeographyDiagram
            copy={hub.geography}
            locale={locale}
            nodes={hub.geometry}
          />
          {remainingBody.blocks.length > 0 ? (
            <PageFamilyRenderer body={remainingBody} />
          ) : null}
        </article>

        <aside className={styles.cta} data-similarity-ignore>
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

      <HomegroundFooter locale={locale} pageContext="content" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
