import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, CircleAlert } from "lucide-react";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import { GuideCtaLink } from "./GuideCtaLink";
import { ZhangjiajiePrivateTourPriceWindow } from "./ZhangjiajiePrivateTourPriceWindow";
import editorialStyles from "./content/EditorialGuidePage.module.css";
import {
  getZhangjiajiePrivateTourPublicPricing,
  productPreviewCopy,
  type ProductPreviewLocale,
  zhangjiajiePrivateTourPaths,
  zhangjiajiePrivateTourPreviewPaths,
  zhangjiajiePrivateTourProduct,
} from "../lib/zhangjiajiePrivateTourPreview";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import styles from "./ZhangjiajiePrivateTourPreviewPage.module.css";
import {
  buildPrivateTourInquiryHref,
  getPrivateTourInquiryContext,
} from "../lib/privateTourInquiryContext";
import { getLegacySystemContentLifecycle } from "../lib/legacySystemContentLifecycle";
import { ZhangjiajieTourComparisonLink } from "./ZhangjiajieTourComparisonLink";

const photoCreditCopy = {
  en: {
    title: "Photo credits",
    local:
      "All photographs were selected from the Homeground project library and authorised by the site owner for this website. Only routine cropping, resizing and format conversion were applied.",
  },
  zh: {
    title: "图片来源与授权",
    local:
      "全部照片由网站负责人从 Homeground 项目素材库选用并授权用于本站，仅做常规裁切、缩放和格式转换。",
  },
  ko: {
    title: "사진 출처 및 라이선스",
    local:
      "모든 사진은 사이트 소유자가 Homeground 프로젝트 자료실에서 선택해 이 웹사이트 사용을 승인했습니다. 일반적인 자르기, 크기 조정과 형식 변환만 적용했습니다.",
  },
} as const;

export function ZhangjiajiePrivateTourPreviewPage({
  locale,
  published = false,
}: {
  locale: ProductPreviewLocale;
  published?: boolean;
}) {
  const copy = productPreviewCopy[locale];
  const photoCopy = photoCreditCopy[locale];
  const product = zhangjiajiePrivateTourProduct;
  const isZh = locale === "zh";
  const isKo = locale === "ko";
  const homePath = locale === "en" ? "/" : `/${locale}/`;
  const tourHubPath = `${homePath}tours/`;
  const tourHubLabel = isZh
    ? "私家团"
    : isKo
      ? "프라이빗 투어"
      : "Private tours";
  const languagePaths = published
    ? zhangjiajiePrivateTourPaths
    : zhangjiajiePrivateTourPreviewPaths;
  const inquiryContext = getPrivateTourInquiryContext(
    "zhangjiajie-4-day-private-tour",
    locale,
  );
  if (!inquiryContext) {
    throw new Error("Missing controlled Zhangjiajie inquiry context.");
  }
  const inquiryHref = buildPrivateTourInquiryHref(
    homePath,
    inquiryContext.slug,
    published ? "private_tour" : "product_preview",
  );
  const publicPricing = getZhangjiajiePrivateTourPublicPricing(locale);
  const publicPriceCopy = {
    checkingPrice: copy.checkingPrice,
    expiredPrice: copy.expiredPrice,
    featured: copy.featured,
    fromLabel: copy.fromLabel,
    perPerson: copy.perPerson,
    regularLabel: copy.regularLabel,
    exactStayNote: copy.exactStayNote,
    validThrough: copy.validThrough,
  };
  const canonicalPath = languagePaths[locale];
  const pageUrl = `https://homegroundchina.com${canonicalPath}`;
  const lifecycle = getLegacySystemContentLifecycle(
    "zhangjiajie-4-day-private-tour",
  );
  const structuredData = published
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: copy.metadataTitle,
            description: copy.metadataDescription,
            inLanguage: copy.htmlLang,
            datePublished: lifecycle.datePublished,
            dateModified: lifecycle.dateModified,
            isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
            mainEntity: { "@id": `${pageUrl}#tour` },
          },
          {
            "@type": "TouristTrip",
            "@id": `${pageUrl}#tour`,
            name: copy.heroTitle,
            description: copy.heroLede,
            url: pageUrl,
            image:
              "https://homegroundchina.com/product-previews/zhangjiajie-4-day-private-tour/hero/forest-pillars-og-1200.jpg",
            touristType: isZh
              ? "张家界首次到访旅客"
              : isKo
                ? "장자제를 처음 찾는 여행자"
                : "First-time Zhangjiajie visitors",
            provider: {
              "@id": EDITORIAL_ORGANIZATION_ID,
            },
            itinerary: {
              "@type": "ItemList",
              numberOfItems: product.route.length,
              itemListElement: product.route.map((day, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: isZh ? day.title_zh : isKo ? day.title_ko : day.title_en,
                description: copy.daySummaries[index],
              })),
            },
          },
          editorialWebsiteSchema(),
          editorialOrganizationSchema(),
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
                name: tourHubLabel,
                item: `https://homegroundchina.com${tourHubPath}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: copy.previewBreadcrumb,
                item: pageUrl,
              },
            ],
          },
        ],
      }
    : null;
  const routePhotos: Partial<
    Record<
      number,
      {
        alt: string;
        caption: string;
        credit?: {
          author: string;
          license: string;
          licenseHref: string;
          sourceHref: string;
        };
        src: string;
      }
    >
  > = {
    2: {
      alt: isZh
        ? "百龙天梯沿张家界国家森林公园的砂岩崖壁升起"
        : isKo
          ? "장자제 국가삼림공원의 사암 절벽을 따라 솟은 바이룽 엘리베이터"
          : "The Bailong Elevator rising against a sandstone cliff in Zhangjiajie National Forest Park",
      caption: isZh
        ? "百龙天梯 · 第2天进山路线实景参考"
        : isKo
          ? "바이룽 엘리베이터 · 2일 차 산악 일정 현장 참고"
          : "Bailong Elevator · Day 2 route reference",
      src: "/product-previews/zhangjiajie-4-day-private-tour/route/day-2-bailong-elevator.jpg",
    },
    3: {
      alt: isZh
        ? "游客正在跨越张家界大峡谷玻璃桥"
        : isKo
          ? "장자제 대협곡 유리다리를 건너는 방문객들"
          : "Visitors crossing the Zhangjiajie Grand Canyon Glass Bridge",
      caption: isZh
        ? "张家界大峡谷玻璃桥 · 第3天实景参考"
        : isKo
          ? "장자제 대협곡 유리다리 · 3일 차 현장 참고"
          : "Zhangjiajie Grand Canyon Glass Bridge · Day 3 reference",
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
    },
    4: {
      alt: isZh
        ? "天门山上天梯尽头的天门洞"
        : isKo
          ? "톈먼산 계단 위쪽의 톈먼동"
          : "Tianmen Cave above the stairway at Tianmen Mountain",
      caption: isZh
        ? "天门洞与上天梯 · 第4天实景参考"
        : isKo
          ? "톈먼동과 이어지는 계단 · 4일 차 현장 참고"
          : "Tianmen Cave and its stairway approach · Day 4 reference",
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/tianmen-cave-and-stairs.jpg",
    },
  };
  const accommodationSummaries = {
    en: {
      "city-candidate-01":
        "A bright twin-room reference for the practical city-stay tier. The exact property, room and outlook are confirmed for the travel dates.",
      "premium-villa":
        "One strong living-room reference shows the extra space expected from this tier. The exact accommodation and room allocation are confirmed for the travel dates.",
      "signature-villa":
        "A selected set of room, bathroom and shared-space references conveys the character of this more distinctive stay without implying that every feature belongs to one bookable room.",
    },
    zh: {
      "city-candidate-01":
        "这张明亮的双床房照片用于说明实用型市区住宿档；具体酒店、房型和窗景会按实际日期确认。",
      "premium-villa":
        "保留一张质感较好的客厅照片，用于说明这一档应有的空间感；具体住宿和房间分配按实际日期确认。",
      "signature-villa":
        "精选的客房、浴室与公共空间照片用于呈现更具特色的住宿氛围，不代表所有设施都属于同一间可预订客房。",
    },
    ko: {
      "city-candidate-01":
        "밝은 트윈룸 사진 한 장으로 실용적인 시내 숙박 등급을 보여 줍니다. 실제 숙소, 객실과 전망은 여행 날짜에 맞춰 확정합니다.",
      "premium-villa":
        "공간감이 잘 드러나는 거실 사진 한 장만 남겼습니다. 실제 숙소와 객실 배정은 여행 날짜에 맞춰 확정합니다.",
      "signature-villa":
        "선별한 객실, 욕실과 공용 공간 사진으로 개성 있는 숙박 분위기를 보여 주되, 모든 요소가 하나의 예약 가능한 객실에 속한다고 의미하지는 않습니다.",
    },
  } as const;
  const safeAccommodationImages = new Set([
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-fireplace-room.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
    "/product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
  ]);
  const accommodationOptions = copy.accommodationOptions
    .filter((option) => option.id !== "city-candidate-02")
    .map((option) => ({
      ...option,
      images: option.images.filter((photo) =>
        safeAccommodationImages.has(photo.src),
      ),
      summary:
        accommodationSummaries[locale][
          option.id as keyof (typeof accommodationSummaries)[typeof locale]
        ] ?? option.summary,
    }))
    .filter((option) => option.images.length > 0);

  return (
    <div
      className={`${homeStyles.localeRoot} ${editorialStyles.pageRoot} ${styles.previewRoot}`}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={editorialStyles.skipLink} href="#tour-details">
        {copy.skipLink}
      </a>
      {!published ? (
        <div className={styles.previewBar} role="status">
          <CircleAlert aria-hidden="true" size={17} />
          <span>{copy.previewLabel}</span>
        </div>
      ) : null}
      <HomegroundHeader
        languagePaths={languagePaths}
        locale={locale}
        pageContext={published ? "tour" : "guide"}
        plannerHrefOverride={published ? inquiryHref : undefined}
      />

      <main id="tour-details">
        <section
          className={`${editorialStyles.hero} ${styles.hero}`}
          aria-labelledby="product-title"
        >
          <div className={editorialStyles.heroCopy}>
            <nav
              className={editorialStyles.breadcrumb}
              aria-label={copy.breadcrumbLabel}
            >
              <ol>
                <li>
                  <Link href={homePath}>{copy.homeLabel}</Link>
                  <span aria-hidden="true">/</span>
                </li>
                {published ? (
                  <li>
                    <Link href={tourHubPath}>{tourHubLabel}</Link>
                    <span aria-hidden="true">/</span>
                  </li>
                ) : null}
                <li aria-current="page">{copy.previewBreadcrumb}</li>
              </ol>
            </nav>
            <p className={editorialStyles.eyebrow}>
              <span>{copy.eyebrow}</span>
            </p>
            <h1 id="product-title">{copy.heroTitle}</h1>
            <p className={`${editorialStyles.dek} ${styles.heroLede}`}>
              {copy.heroLede}
            </p>
            <div className={styles.heroDecisionBar}>
              <div>
                <p>{copy.pricesEyebrow}</p>
                <ZhangjiajiePrivateTourPriceWindow
                  copy={publicPriceCopy}
                  locale={locale}
                  pricing={publicPricing}
                  variant="summary"
                />
              </div>
              <div>
                <a className={styles.priceJump} href="#prices-title">
                  {copy.pricesTitle}
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
                <a className={styles.articleJump} href="#four-day-route">
                  {copy.secondaryCta}
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
              </div>
            </div>
          </div>

          <figure
            className={`${editorialStyles.heroFigure} ${styles.heroFigure}`}
          >
            <div className={styles.heroImage}>
              <Image
                alt={
                  isZh
                    ? "阳光照亮张家界国家森林公园的砂岩峰柱与深谷"
                    : isKo
                      ? "햇빛을 받은 장자제 국가삼림공원의 사암 봉우리와 깊은 숲속 계곡"
                      : "Sunlit sandstone pillars and deep forested ravines in Zhangjiajie National Forest Park"
                }
                fill
                priority
                sizes="(max-width: 860px) 100vw, 42vw"
                src="/product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg"
              />
            </div>
            <figcaption>{copy.heroImageCaption}</figcaption>
          </figure>
        </section>

        <article className={`${editorialStyles.article} ${styles.article}`}>
          <section
            className={styles.contentSection}
            aria-labelledby="why-private-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.whyEyebrow}</p>
              <h2 id="why-private-title">{copy.whyTitle}</h2>
              <p>{copy.whyIntro}</p>
            </div>
            <div className={styles.benefitGrid}>
              {copy.benefits.map(([heading, body], index) => (
                <section className={styles.benefitCard} key={heading}>
                  <span>0{index + 1}</span>
                  <h3>{heading}</h3>
                  <p>{body}</p>
                </section>
              ))}
            </div>
          </section>

          <section
            className={styles.contentSection}
            id="four-day-route"
            aria-labelledby="route-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.routeEyebrow}</p>
              <h2 id="route-title">{copy.routeTitle}</h2>
            </div>
            <ol className={styles.routeList}>
              {product.route.map((day, index) => {
                const routePhoto = routePhotos[day.day];

                return (
                  <li key={day.day}>
                    <div className={styles.dayMarker}>
                      {isKo ? null : <span>{isZh ? "第" : "Day"}</span>}
                      <strong>{day.day}</strong>
                      {isZh ? (
                        <span>天</span>
                      ) : isKo ? (
                        <span>일 차</span>
                      ) : null}
                    </div>
                    <div
                      className={`${styles.dayCopy} ${
                        routePhoto ? styles.dayCopyWithImage : ""
                      }`}
                    >
                      <div>
                        <h3>
                          {isZh
                            ? day.title_zh
                            : isKo
                              ? day.title_ko
                              : day.title_en}
                        </h3>
                        <span className={styles.dayStatus}>
                          {day.guide_planned
                            ? copy.guideLabel
                            : copy.arrivalLabel}
                        </span>
                      </div>
                      <p>{copy.daySummaries[index]}</p>
                      {routePhoto ? (
                        <figure className={styles.dayFigure}>
                          <div className={styles.dayFigureMedia}>
                            <Image
                              alt={routePhoto.alt}
                              fill
                              sizes="(max-width: 680px) 82vw, 17rem"
                              src={routePhoto.src}
                            />
                          </div>
                          <figcaption>
                            <span>{routePhoto.caption}</span>
                            {routePhoto.credit ? (
                              <span className={styles.dayFigureCredit}>
                                {isZh ? "图片：" : isKo ? "사진: " : "Photo: "}
                                <a href={routePhoto.credit.sourceHref}>
                                  {routePhoto.credit.author}
                                </a>
                                {" · "}
                                <a
                                  href={routePhoto.credit.licenseHref}
                                  rel="license"
                                >
                                  {routePhoto.credit.license}
                                </a>
                                {isZh
                                  ? " · 已裁切"
                                  : isKo
                                    ? " · 일부 잘라냄"
                                    : " · cropped"}
                              </span>
                            ) : null}
                          </figcaption>
                        </figure>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <section
            className={styles.contentSection}
            aria-labelledby="stays-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.staysEyebrow}</p>
              <h2 id="stays-title">{copy.staysTitle}</h2>
              <p>{copy.staysIntro}</p>
            </div>
            <aside className={styles.stayChoiceNote}>
              <Check aria-hidden="true" size={20} />
              <div>
                <h3>{copy.otherStaysTitle}</h3>
                <p>{copy.otherStaysBody}</p>
              </div>
            </aside>
            <div className={styles.stayGrid}>
              {accommodationOptions.map((option) => (
                <section className={styles.stayCard} key={option.id}>
                  <div className={styles.stayHeading}>
                    <div>
                      <p>{option.label}</p>
                      <h3>{option.name}</h3>
                    </div>
                    <strong>{option.price}</strong>
                  </div>
                  <p className={styles.staySummary}>{option.summary}</p>
                  <div className={styles.stayGallery}>
                    {option.images.map((photo) => (
                      <figure key={photo.src}>
                        <Image
                          alt={photo.alt}
                          className={styles.stayImage}
                          height={photo.height}
                          sizes="(max-width: 540px) 92vw, (max-width: 1100px) 44vw, 36vw"
                          src={photo.src}
                          width={photo.width}
                        />
                        <figcaption>{photo.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section
            className={styles.contentSection}
            aria-labelledby="prices-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.pricesEyebrow}</p>
              <h2 id="prices-title">{copy.pricesTitle}</h2>
              <p>{copy.pricesIntro}</p>
            </div>
            <ZhangjiajiePrivateTourPriceWindow
              copy={publicPriceCopy}
              locale={locale}
              pricing={publicPricing}
            />
          </section>

          <section
            className={styles.contentSection}
            aria-labelledby="faq-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.faqEyebrow}</p>
              <h2 id="faq-title">{copy.faqTitle}</h2>
            </div>
            <dl className={styles.faqList}>
              {copy.faqItems.map(([question, answer]) => (
                <div key={question}>
                  <dt>{question}</dt>
                  <dd>{answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className={styles.contentSection}
            aria-labelledby="scope-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.scopeEyebrow}</p>
              <h2 id="scope-title">{copy.scopeTitle}</h2>
            </div>
            <div className={styles.scopeGrid}>
              <section>
                <h3>{copy.plannedTitle}</h3>
                <ul>
                  {copy.plannedItems.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>{copy.excludedTitle}</h3>
                <ul>
                  {copy.excludedItems.map((item) => (
                    <li key={item}>
                      <span className={styles.listDash} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <p className={styles.scopeNote}>
              {copy.confirmationNote}
              {published ? (
                <ZhangjiajieTourComparisonLink
                  currentRoute="classic"
                  locale={locale}
                />
              ) : null}
            </p>
          </section>

          <section
            className={styles.contentSection}
            aria-labelledby="payment-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.paymentEyebrow}</p>
              <h2 id="payment-title">{copy.paymentTitle}</h2>
            </div>
            <ol className={styles.paymentSteps}>
              {copy.paymentSteps.map(([number, heading, body]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{heading}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <details className={styles.sources}>
            <summary>{copy.sourcesTitle}</summary>
            <ul>
              {copy.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.label}
                  </a>
                  <span>{source.publisher}</span>
                </li>
              ))}
            </ul>
          </details>

          <details className={styles.sources}>
            <summary>{photoCopy.title}</summary>
            <ul>
              <li>
                <span>{photoCopy.local}</span>
              </li>
            </ul>
          </details>
        </article>

        <aside
          className={`${editorialStyles.cta} ${styles.finalCta}`}
          aria-labelledby="final-cta-title"
        >
          <div>
            <p className={editorialStyles.ctaLabel}>{copy.finalEyebrow}</p>
            <h2 id="final-cta-title">{copy.finalTitle}</h2>
            <p>{copy.finalBody}</p>
          </div>
          <GuideCtaLink
            guideId={
              published
                ? "zhangjiajie-4-day-private-tour"
                : "zhangjiajie-4-day-private-tour-preview"
            }
            href={inquiryHref}
            locale={locale}
            position="footer"
          >
            {copy.finalCtaLabel}
            <ArrowRight aria-hidden="true" size={20} />
          </GuideCtaLink>
        </aside>
      </main>

      <HomegroundFooter
        locale={locale}
        pageContext={published ? "tour" : "content"}
      />
      {structuredData ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}
    </div>
  );
}
