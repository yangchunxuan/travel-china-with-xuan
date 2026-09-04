import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getGuideEntry,
  getGuideLanguagePaths,
  type GuideEntry,
} from "../../lib/guideRegistry";
import {
  getGuideCollectionId,
  getSearchCollection,
  getSearchCollectionPath,
} from "../../lib/searchCollectionI18n";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../../lib/homegroundI18n";
import { getHomegroundNavigationModel } from "../../lib/homegroundNavigationModel";
import {
  getPublishedSearchCollectionEntry,
} from "../../lib/searchPlatformManifest";
import {
  getSearchPlatformCopy,
  getSearchSectionPath,
} from "../../lib/searchPlatformI18n";
import type { StructuredPageBody } from "../../lib/content-system/page-body";
import { HomegroundFooter } from "../HomegroundFooter";
import { HomegroundHeader } from "../HomegroundHeader";
import { PageFamilyRenderer } from "./PageFamilyRenderer";
import { EditorialByline } from "../EditorialByline";
import { GuideCtaLink } from "../GuideCtaLink";
import homeStyles from "../HomegroundHomePage.module.css";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
} from "../../lib/editorialIdentity";
import { getDestinationHubsForGuide } from "../../lib/destinationHubs";
import styles from "./EditorialGuidePage.module.css";
import {
  getAuthorizedGuideServiceCta,
  getExistingContentCommercialCopy,
  getGuidePublishedRouteLinks,
} from "../../lib/existingContentCommercialLinks";

const SITE_URL = "https://homegroundchina.com";

const zhHeadingSegments: Readonly<Record<string, readonly string[]>> = {
  "foreigners-china-hotel": [
    "外国人可以",
    "入住中国",
    "任何酒店吗？",
    "预订、住宿登记",
    "与被拒后的处理",
  ],
};

const ui = {
  en: {
    skip: "Skip to the article",
    breadcrumb: "Breadcrumb",
    home: "Home",
    guides: "Travel guides",
    reviewed: "Reviewed",
    ctaLabel: "Plan with a local team",
    ctaTitle: "Tell us the trip you are considering.",
    ctaBody:
      "Share your dates, group size and rough budget. A real person will help you work out a sensible route and the support you actually need.",
    ctaButton: "Start my trip brief",
  },
  zh: {
    skip: "跳到文章正文",
    breadcrumb: "当前位置",
    home: "首页",
    guides: "旅行指南",
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
    guides: "실용 가이드",
    reviewed: "자료 확인",
    ctaLabel: "현지 팀과 여행 설계",
    ctaTitle: "생각 중인 중국 여행을 알려 주세요.",
    ctaBody:
      "여행 날짜, 인원, 대략적인 예산을 남기면 실제 담당자가 무리 없는 동선과 필요한 지원 범위를 함께 정리합니다.",
    ctaButton: "여행 브리프 시작하기",
  },
} as const;

function structuredData(
  guide: ReturnType<typeof getGuideEntry>,
  locale: HomegroundLocale,
  body: StructuredPageBody,
) {
  const copy = ui[locale];
  const sources = body.blocks.flatMap((block) =>
    block.type === "sources" ? block.items.map((item) => item.url) : [],
  );
  const homePath = getHomegroundCopy(locale).path;
  const homeCopy = getHomegroundCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, homePath);
  const collectionId = getGuideCollectionId(guide);
  const collection = getSearchCollection(collectionId);
  const platformCopy = getSearchPlatformCopy(locale);
  const sectionCopy = platformCopy.sections[collection.section];
  const sectionPath = getSearchSectionPath(collection.section, locale);
  const collectionPath = getSearchCollectionPath(collection, locale);
  const publishedCollectionEntry = getPublishedSearchCollectionEntry(
    collectionId,
    locale,
  );
  const parentNavigationId =
    collection.section === "explore"
      ? "destinations"
      : collection.section === "services"
        ? "studio"
        : "guides";
  const parent = navigation.items.find((item) => item.id === parentNavigationId);
  if (!parent) throw new Error(`Missing ${parentNavigationId} navigation item.`);
  const visibleAncestors = [
    { name: copy.home, path: homePath },
    { name: parent.label, path: parent.href },
    ...(collection.section !== "explore"
      ? [{ name: sectionCopy.navLabel, path: sectionPath }]
      : []),
    ...(publishedCollectionEntry
      ? [{ name: collection.locales[locale].label, path: collectionPath }]
      : []),
  ];
  const inLanguage = locale === "zh" ? "zh-Hans" : locale;

  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema(locale),
      {
        "@type": "Article",
        "@id": `${guide.canonicalUrl}#article`,
        url: guide.canonicalUrl,
        headline: guide.headline,
        description: guide.description,
        image: {
          "@type": "ImageObject",
          url: guide.heroImageUrl,
          width: guide.imageWidth,
          height: guide.imageHeight,
        },
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        reviewedBy: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
        mainEntityOfPage: guide.canonicalUrl,
        ...(sources.length > 0 ? { citation: sources } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          ...visibleAncestors.map((ancestor, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: ancestor.name,
            item: `${SITE_URL}${ancestor.path}`,
          })),
          {
            "@type": "ListItem",
            position: visibleAncestors.length + 1,
            name: guide.navTitle,
            item: guide.canonicalUrl,
          },
        ],
      },
    ],
  };
}

export function EditorialGuidePage({
  entry,
  locale,
  body,
}: {
  entry: GuideEntry;
  locale: HomegroundLocale;
  body: StructuredPageBody;
}) {
  const guide = getGuideEntry(entry.id, locale);
  const copy = ui[locale];
  const homeCopy = getHomegroundCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, homeCopy.path);
  const collectionId = getGuideCollectionId(guide);
  const collection = getSearchCollection(collectionId);
  const platformCopy = getSearchPlatformCopy(locale);
  const sectionCopy = platformCopy.sections[collection.section];
  const sectionPath = getSearchSectionPath(collection.section, locale);
  const collectionPath = getSearchCollectionPath(collection, locale);
  const publishedCollectionEntry = getPublishedSearchCollectionEntry(
    collectionId,
    locale,
  );
  const parentNavigationId =
    collection.section === "explore"
      ? "destinations"
      : collection.section === "services"
        ? "studio"
        : "guides";
  const parent = navigation.items.find((item) => item.id === parentNavigationId);
  if (!parent) throw new Error(`Missing ${parentNavigationId} navigation item.`);
  const pageContext =
    collection.section === "explore"
      ? "destination"
      : collection.section === "services"
        ? "services"
        : "guide";
  const date = new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${guide.sourceReviewedDate}T00:00:00.000Z`));
  const schema = structuredData(guide, locale, body);
  const sectionLabel = entry.search
    ? getSearchPlatformCopy(locale).sections[entry.search.section].navLabel
    : guide.format.replaceAll("-", " ");
  const titleSegments = locale === "zh" ? zhHeadingSegments[guide.id] : null;
  const plannerHref = `${homeCopy.path}?utm_source=editorial_guide&utm_medium=owned&utm_campaign=trip_conversation&utm_content=${guide.id}#planner-contact`;
  const relatedDestinations = getDestinationHubsForGuide(guide.id, locale);
  const publishedRouteLinks = getGuidePublishedRouteLinks(guide.id, locale);
  const commercialCopy = getExistingContentCommercialCopy(locale);
  const serviceCta = getAuthorizedGuideServiceCta(guide.id, locale);
  const relatedDestinationCopy =
    locale === "zh"
      ? { label: "相关目的地", title: "把这个答案放回具体城市。" }
      : locale === "ko"
        ? { label: "관련 여행지", title: "이 답을 실제 도시 동선에 연결하세요." }
        : { label: "Related destinations", title: "Put this answer back into a real city stay." };

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.pageRoot}`}
      data-homeground-locale={locale}
      lang={homeCopy.htmlLang}
    >
      <a className={styles.skipLink} href="#editorial-guide-body">
        {copy.skip}
      </a>

      <HomegroundHeader
        guideId={guide.id}
        languagePaths={getGuideLanguagePaths(guide.id)}
        locale={locale}
        pageContext={pageContext}
      />

      <main>
        <header
          className={styles.hero}
          data-hero-kind={
            guide.id === "china-public-holidays-travel-calendar"
              ? "information"
              : undefined
          }
        >
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
              <ol>
                <li><Link href={homeCopy.path}>{copy.home}</Link></li>
                <li><span aria-hidden="true">/</span><Link href={parent.href}>{parent.label}</Link></li>
                {collection.section !== "explore" ? (
                  <li><span aria-hidden="true">/</span><Link href={sectionPath}>{sectionCopy.navLabel}</Link></li>
                ) : null}
                {publishedCollectionEntry ? (
                  <li><span aria-hidden="true">/</span><Link href={collectionPath}>{collection.locales[locale].label}</Link></li>
                ) : null}
                <li aria-current="page"><span aria-hidden="true">/</span>{guide.navTitle}</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>
              <span>{sectionLabel}</span>
              <span>{copy.reviewed} {date}</span>
            </p>
            <h1>
              {titleSegments
                ? titleSegments.map((segment, index) => (
                    <span
                      className={styles.keepTogether}
                      key={`${segment}-${index}`}
                    >
                      {segment}
                    </span>
                  ))
                : guide.headline}
            </h1>
            <p className={styles.dek}>{guide.description}</p>
            <EditorialByline locale={locale} reviewedAt={guide.sourceReviewedDate} />
          </div>

          <figure className={styles.heroFigure}>
            <Image
              alt={guide.heroAlt}
              fetchPriority="high"
              height={guide.imageHeight}
              priority
              sizes="(max-width: 860px) 100vw, 44vw"
              src={guide.heroImagePath}
              width={guide.imageWidth}
            />
            {guide.heroCredit ? (
              <figcaption className={styles.heroCredit}>
                <span>{guide.heroCredit.text}</span>{" "}
                <a href={guide.heroCredit.sourceUrl}>{guide.heroCredit.sourceLabel}</a>
                <span aria-hidden="true"> · </span>
                <a href={guide.heroCredit.licenseUrl}>{guide.heroCredit.licenseLabel}</a>
              </figcaption>
            ) : null}
          </figure>
        </header>

        <article
          className={styles.article}
          data-content-body
          id="editorial-guide-body"
        >
          <PageFamilyRenderer body={body} />
        </article>

        {relatedDestinations.length > 0 ? (
          <aside className={styles.relatedDestinations}>
            <div><p>{relatedDestinationCopy.label}</p><h2>{relatedDestinationCopy.title}</h2></div>
            <ul>{relatedDestinations.map((destination) => <li key={destination.id}><Link href={destination.canonicalPath}>{destination.navTitle}<span aria-hidden="true">→</span></Link></li>)}</ul>
          </aside>
        ) : null}

        {publishedRouteLinks.length > 0 ? (
          <aside className={styles.relatedDestinations}>
            <div>
              <p>{commercialCopy.guideLabel}</p>
              <h2>{commercialCopy.guideTitle}</h2>
            </div>
            <ul>
              {publishedRouteLinks.map((route) => (
                <li key={route.id}>
                  <Link href={route.href}>
                    {route.label}<span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <aside className={styles.cta} data-similarity-ignore>
          <div>
            <p className={styles.ctaLabel}>
              {serviceCta?.label ?? copy.ctaLabel}
            </p>
            <h2>{serviceCta?.title ?? copy.ctaTitle}</h2>
            <p>{serviceCta?.body ?? copy.ctaBody}</p>
          </div>
          <GuideCtaLink
            guideId={guide.id}
            href={serviceCta?.href ?? plannerHref}
            locale={locale}
            position="footer"
          >
            {serviceCta?.button ?? copy.ctaButton}
            <ArrowRight aria-hidden="true" size={18} />
          </GuideCtaLink>
        </aside>
      </main>

      <HomegroundFooter locale={locale} pageContext={pageContext} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
