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
import {
  getSearchPlatformCopy,
  getSearchSectionPath,
} from "../../lib/searchPlatformI18n";
import type { StructuredPageBody } from "../../lib/content-system/page-body";
import { HomegroundFooter } from "../HomegroundFooter";
import { HomegroundHeader } from "../HomegroundHeader";
import { PageFamilyRenderer } from "./PageFamilyRenderer";
import { EditorialByline } from "../EditorialByline";
import homeStyles from "../HomegroundHomePage.module.css";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
} from "../../lib/editorialIdentity";
import styles from "./EditorialGuidePage.module.css";

const SITE_URL = "https://homegroundchina.com";

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
    guides: "여행 가이드",
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
  const guidesPath = `${homePath}guides/`;
  const collectionId = getGuideCollectionId(guide);
  const collection = getSearchCollection(collectionId);
  const platformCopy = getSearchPlatformCopy(locale);
  const sectionCopy = platformCopy.sections[collection.section];
  const sectionPath = getSearchSectionPath(collection.section, locale);
  const collectionPath = getSearchCollectionPath(collection, locale);
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
          {
            "@type": "ListItem",
            position: 1,
            name: copy.home,
            item: `${SITE_URL}${homePath}`,
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
            name: sectionCopy.navLabel,
            item: `${SITE_URL}${sectionPath}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: collection.locales[locale].label,
            item: `${SITE_URL}${collectionPath}`,
          },
          {
            "@type": "ListItem",
            position: 5,
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
  const guidesPath = `${homeCopy.path}guides/`;
  const collectionId = getGuideCollectionId(guide);
  const collection = getSearchCollection(collectionId);
  const platformCopy = getSearchPlatformCopy(locale);
  const sectionCopy = platformCopy.sections[collection.section];
  const sectionPath = getSearchSectionPath(collection.section, locale);
  const collectionPath = getSearchCollectionPath(collection, locale);
  const date = new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${guide.sourceReviewedDate}T00:00:00.000Z`));
  const schema = structuredData(guide, locale, body);
  const sectionLabel = entry.search
    ? getSearchPlatformCopy(locale).sections[entry.search.section].navLabel
    : guide.format.replaceAll("-", " ");

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
        pageContext="guide"
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
                <li><span aria-hidden="true">/</span><Link href={guidesPath}>{copy.guides}</Link></li>
                <li><span aria-hidden="true">/</span><Link href={sectionPath}>{sectionCopy.navLabel}</Link></li>
                <li><span aria-hidden="true">/</span><Link href={collectionPath}>{collection.locales[locale].label}</Link></li>
                <li aria-current="page"><span aria-hidden="true">/</span>{guide.navTitle}</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>
              <span>{sectionLabel}</span>
              <span>{copy.reviewed} {date}</span>
            </p>
            <h1>{guide.headline}</h1>
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

      <HomegroundFooter locale={locale} pageContext="guide" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
