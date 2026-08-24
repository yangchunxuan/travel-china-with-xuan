import Link from "next/link";
import { Fragment } from "react";
import {
  getSearchCollection,
  getSearchCollectionPath,
  searchCollections,
  type SearchCollectionId,
} from "../lib/searchCollectionI18n";
import {
  absoluteManifestAlternates,
  getSearchCollectionEntry,
  getSearchCollectionGuides,
  getSearchCollectionLanguagePaths,
} from "../lib/searchPlatformManifest";
import {
  getSearchPlatformCopy,
  getSearchSectionPath,
} from "../lib/searchPlatformI18n";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getHomegroundNavigationModel } from "../lib/homegroundNavigationModel";
import {
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./SearchPlatformHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const dateLocales: Record<HomegroundLocale, string> = {
  en: "en-GB",
  zh: "zh-CN",
  ko: "ko-KR",
};

const chineseCityCollectionTitle = "从街道和日常空间理解一座中国城市";
const chineseCityCollectionTitleSegments = [
  "从街道和",
  "日常空间",
  "理解一座",
  "中国城市",
] as const;

function renderCollectionTitle(title: string, locale: HomegroundLocale) {
  if (locale !== "zh" || title !== chineseCityCollectionTitle) return title;

  return chineseCityCollectionTitleSegments.map((segment, index) => (
    <Fragment key={segment}>
      <span className={styles.titleSegment}>{segment}</span>
      {index < chineseCityCollectionTitleSegments.length - 1 ? <wbr /> : null}
    </Fragment>
  ));
}

const labels = {
  en: {
    breadcrumb: "Breadcrumb",
    collection: "Focused collection",
    solves: "Use this collection to",
    count: (count: number) => `${count} published guide${count === 1 ? "" : "s"}`,
    all: "All guides in this collection",
    nearby: "Related collections",
    open: "Open guide",
    updated: "Updated",
    cityDirectoryTitle: "Looking for a city overview?",
    cityDirectoryBody: "The Destinations directory owns the complete city hubs: nights, stay areas, arrival points and sensible next stops.",
    cityDirectoryAction: "View all destinations",
  },
  zh: {
    breadcrumb: "当前位置",
    collection: "专题集合",
    solves: "这个集合帮助你",
    count: (count: number) => `${count} 篇已发布指南`,
    all: "本集合全部指南",
    nearby: "相关专题",
    open: "打开指南",
    updated: "更新于",
    cityDirectoryTitle: "想先看一座城市的完整总览？",
    cityDirectoryBody: "“目的地”目录统一收录城市 Hub：停留晚数、住宿区域、进出门户与合理的下一站。",
    cityDirectoryAction: "查看全部目的地",
  },
  ko: {
    breadcrumb: "현재 위치",
    collection: "주제별 모음",
    solves: "이 모음에서 할 수 있는 일",
    count: (count: number) => `공개 가이드 ${count}편`,
    all: "이 주제의 전체 가이드",
    nearby: "관련 주제",
    open: "가이드 열기",
    updated: "업데이트",
    cityDirectoryTitle: "도시 전체 개요를 찾고 있나요?",
    cityDirectoryBody: "여행지 디렉터리의 도시 허브에서 숙박일, 숙소 지역, 도착 지점과 다음 도시를 한 번에 확인할 수 있습니다.",
    cityDirectoryAction: "전체 여행지 보기",
  },
} as const;

function formatDate(value: string, locale: HomegroundLocale) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function jsonLd(collectionId: SearchCollectionId, locale: HomegroundLocale) {
  const collection = getSearchCollection(collectionId);
  const entry = getSearchCollectionEntry(collectionId, locale);
  const guides = getSearchCollectionGuides(collectionId, locale);
  const copy = getSearchPlatformCopy(locale);
  const sectionCopy = copy.sections[collection.section];
  const home = getHomegroundCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, home.path);
  const canonicalUrl = `${SITE_URL}${entry.canonicalPath}`;
  const sectionUrl = `${SITE_URL}${getSearchSectionPath(collection.section, locale)}`;
  const listId = `${canonicalUrl}#guides`;
  const parentNavigationId =
    collection.section === "services"
      ? "studio"
      : collection.section === "explore"
        ? "destinations"
        : "guides";
  const parent = navigation.items.find((item) => item.id === parentNavigationId);
  if (!parent) throw new Error(`Missing ${parentNavigationId} navigation item.`);
  const parentIsSection = collection.section === "explore";
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: home.navigation.homeLabel, item: `${SITE_URL}${home.path}` },
    { "@type": "ListItem", position: 2, name: parent.label, item: `${SITE_URL}${parent.href}` },
    ...(!parentIsSection
      ? [{ "@type": "ListItem", position: 3, name: sectionCopy.navLabel, item: sectionUrl }]
      : []),
    {
      "@type": "ListItem",
      position: parentIsSection ? 3 : 4,
      name: entry.h1,
      item: canonicalUrl,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: entry.h1,
        description: entry.description,
        inLanguage: home.htmlLang,
        isPartOf: { "@id": `${sectionUrl}#webpage` },
        mainEntity: { "@id": listId },
        sameAs: Object.values(absoluteManifestAlternates(entry)),
      },
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
      {
        "@type": "ItemList",
        "@id": listId,
        numberOfItems: guides.length,
        itemListElement: guides.map(({ guide }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: guide.canonicalUrl,
          name: guide.headline,
        })),
      },
    ],
  };
}

export function SearchCollectionHubPage({
  collectionId,
  locale = "en",
}: {
  collectionId: SearchCollectionId;
  locale?: HomegroundLocale;
}) {
  const collection = getSearchCollection(collectionId);
  const collectionCopy = collection.locales[locale];
  const home = getHomegroundCopy(locale);
  const platform = getSearchPlatformCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, home.path);
  const sectionCopy = platform.sections[collection.section];
  const ui = labels[locale];
  const guides = getSearchCollectionGuides(collectionId, locale);
  const siblings = searchCollections.filter((candidate) => {
    if (candidate.section !== collection.section || candidate.id === collection.id) {
      return false;
    }
    const candidateEntry = getSearchCollectionEntry(candidate.id, locale);
    return (
      candidateEntry.status === "published" &&
      candidateEntry.indexability.index &&
      getSearchCollectionGuides(candidate.id, locale).length > 0
    );
  });
  const schema = jsonLd(collectionId, locale);
  const pageContext =
    collection.section === "explore"
      ? "destination"
      : collection.section === "services"
        ? "services"
        : collection.section === "plan"
          ? "plan"
          : "guides";
  const parentNavigationId =
    collection.section === "services"
      ? "studio"
      : collection.section === "explore"
        ? "destinations"
        : "guides";
  const parent = navigation.items.find((item) => item.id === parentNavigationId);
  if (!parent) throw new Error(`Missing ${parentNavigationId} navigation item.`);

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.hubPage}`}
      data-homeground-locale={locale}
      lang={home.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#collection-main">{home.skipLink}</a>
      <HomegroundHeader
        languagePaths={getSearchCollectionLanguagePaths(collectionId)}
        locale={locale}
        pageContext={pageContext}
      />

      <main id="collection-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label={ui.breadcrumb}>
                <ol>
                  <li><Link href={home.path}>{home.navigation.homeLabel}</Link></li>
                  <li><span aria-hidden="true">/</span><Link href={parent.href}>{parent.label}</Link></li>
                  {collection.section !== "explore" ? (
                    <li><span aria-hidden="true">/</span><Link href={getSearchSectionPath(collection.section, locale)}>{sectionCopy.navLabel}</Link></li>
                  ) : null}
                  <li aria-current="page"><span aria-hidden="true">/</span>{collectionCopy.label}</li>
                </ol>
              </nav>
              <p className={styles.eyebrow}>{ui.collection}</p>
              <h1
                className={locale === "zh" ? styles.segmentedTitle : undefined}
                id="collection-title"
              >
                {renderCollectionTitle(collectionCopy.title, locale)}
              </h1>
              <p className={styles.lede}>{collectionCopy.description}</p>
            </div>
            <aside className={styles.scope} aria-labelledby="collection-scope-title">
              <p id="collection-scope-title">{ui.solves}</p>
              <ul>
                {sectionCopy.scope.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p>{ui.count(guides.length)}</p>
            </aside>
          </div>
        </header>

        {collectionId === "explore-cities-neighborhoods" ? (
          <aside className={styles.directoryHandoff}>
            <div>
              <p className={styles.eyebrow}>{sectionCopy.navLabel}</p>
              <h2>{ui.cityDirectoryTitle}</h2>
            </div>
            <div>
              <p>{ui.cityDirectoryBody}</p>
              <Link href={getSearchSectionPath("explore", locale)}>
                {ui.cityDirectoryAction}<span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        ) : null}

        <section className={styles.collection} aria-labelledby="collection-guides-title">
          <div className={styles.collectionHeading}>
            <div>
              <p className={styles.eyebrow}>{sectionCopy.shortLabel}</p>
              <h2 id="collection-guides-title">{ui.all}</h2>
            </div>
            <p className={styles.collectionSummary}>{collectionCopy.description}</p>
          </div>

          {guides.length > 0 ? (
            <ol className={styles.guideGrid}>
              {guides.map(({ guide, manifest }, index) => (
                <li className={index === 0 ? styles.leadGuide : undefined} key={manifest.contentId}>
                  <article className={styles.guideCard}>
                    <Link href={manifest.path}>
                      <figure>
                        <img
                          alt={guide.cardImageAlt}
                          decoding="async"
                          height={guide.cardImageHeight}
                          loading="lazy"
                          src={guide.cardImagePath}
                          width={guide.cardImageWidth}
                        />
                      </figure>
                      <div className={styles.guideBody}>
                        <p className={styles.guideMeta}>
                          <span>{collectionCopy.label}</span><span aria-hidden="true">·</span>
                          <time dateTime={manifest.dates.dateModified ?? undefined}>
                            {ui.updated} {formatDate(manifest.dates.dateModified ?? "2026-08-13", locale)}
                          </time>
                        </p>
                        <h3>{manifest.h1}</h3>
                        <p>{manifest.description}</p>
                        <span className={styles.openGuide}>{ui.open}<span aria-hidden="true">→</span></span>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.eyebrow}>{platform.currentSectionLabel}</p>
              <h2>{platform.emptyTitle}</h2>
              <p>{platform.emptyBody}</p>
              <Link href={getSearchSectionPath(collection.section, locale)}>{sectionCopy.navLabel}</Link>
            </div>
          )}
        </section>

        {siblings.length > 0 ? (
        <section className={styles.platformMap} aria-labelledby="collection-related-title">
          <div className={styles.platformMapIntro}>
            <p className={styles.eyebrow}>{sectionCopy.eyebrow}</p>
            <h2 id="collection-related-title">{ui.nearby}</h2>
            <p>{sectionCopy.description}</p>
          </div>
          <ul>
            {siblings.map((sibling) => (
              <li key={sibling.id}>
                <Link href={getSearchCollectionPath(sibling, locale)}>
                  <span>{sibling.locales[locale].label}</span>
                  <small>{sibling.locales[locale].description}</small>
                  <b aria-hidden="true">↗</b>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        ) : null}

        <section className={styles.cta} aria-labelledby="collection-cta-title">
          <div><p className={styles.eyebrow}>Homeground</p><h2 id="collection-cta-title">{platform.nextTitle}</h2></div>
          <div><p>{platform.nextBody}</p><div className={styles.ctaActions}>
            <a className={styles.primaryAction} href={`${home.path}#planner-contact`}>{platform.tripBriefLabel}<span aria-hidden="true">→</span></a>
            <Link className={styles.secondaryAction} href={getSearchSectionPath(collection.section, locale)}>{sectionCopy.navLabel}</Link>
          </div></div>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext={pageContext} />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </div>
  );
}
