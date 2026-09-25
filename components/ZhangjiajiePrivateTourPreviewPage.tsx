import { TourWhatsAppLink } from "./TourWhatsAppLink";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, CircleAlert } from "lucide-react";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { GuideCtaLink } from "./GuideCtaLink";
import { TourPriceScope } from "./TourPriceScope";
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
import {
  getExistingContentCommercialCopy,
  getProductPlanningContext,
} from "../lib/existingContentCommercialLinks";

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
  const commercialCopy = getExistingContentCommercialCopy(locale);
  const planningContext = getProductPlanningContext(
    "zhangjiajie-4-day-private-tour",
    locale,
  );
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
  const publishedPricing = getZhangjiajiePrivateTourPublicPricing(locale);
  const publicPricing = {
    ...publishedPricing,
    tiers: publishedPricing.tiers.map((tier) => ({
      ...tier,
      ...(published
        ? {
            sixPersonInquiryHref: buildPrivateTourInquiryHref(
              homePath,
              inquiryContext.slug,
              "private_tour",
              { packageId: tier.id, travelers: 6 },
            ),
          }
        : {}),
    })),
  };
  const publicPriceCopy = {
    checkingPrice: copy.checkingPrice,
    expiredPrice: copy.expiredPrice,
    featured: copy.featured,
    fromLabel: copy.fromLabel,
    perPerson: copy.perPerson,
    regularLabel: copy.regularLabel,
    baseGroupLabel: copy.baseGroupLabel,
    sixPersonLabel: copy.sixPersonLabel,
    sixPersonInquiryLabel: copy.sixPersonInquiryLabel,
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
                ? "장가계를 처음 찾는 여행자"
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
          {
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            url: pageUrl,
            inLanguage: copy.htmlLang,
            isPartOf: { "@id": `${pageUrl}#webpage` },
            mainEntity: copy.faqItems.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
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
          ? "장가계 국가삼림공원의 사암 절벽을 따라 솟은 백룡엘리베이터"
          : "The Bailong Elevator rising against a sandstone cliff in Zhangjiajie National Forest Park",
      caption: isZh
        ? "百龙天梯 · 第2天"
        : isKo
          ? "백룡엘리베이터 · 2일 차"
          : "Bailong Elevator · Day 2",
      src: "/product-previews/zhangjiajie-4-day-private-tour/route/day-2-bailong-elevator.jpg",
    },
    3: {
      alt: isZh
        ? "游客正在跨越张家界大峡谷玻璃桥"
        : isKo
          ? "장가계 대협곡 유리다리를 건너는 방문객들"
          : "Visitors crossing the Zhangjiajie Grand Canyon Glass Bridge",
      caption: isZh
        ? "张家界大峡谷玻璃桥 · 第3天"
        : isKo
          ? "장가계 대협곡 유리다리 · 3일 차"
          : "Zhangjiajie Grand Canyon Glass Bridge · Day 3",
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
    },
    4: {
      alt: isZh
        ? "天门山上天梯尽头的天门洞"
        : isKo
          ? "천문산 계단 위쪽의 천문동"
          : "Tianmen Cave above the stairway at Tianmen Mountain",
      caption: isZh
        ? "天门洞与上天梯 · 第4天"
        : isKo
          ? "천문동과 이어지는 계단 · 4일 차"
          : "Tianmen Cave and its stairway · Day 4",
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/tianmen-cave-and-stairs.jpg",
    },
  };
  const accommodationSummaries = {
    en: {
      "city-candidate-01":
        "A bright twin room in a practical city stay. The exact property, room and view are confirmed for your dates.",
      "premium-villa":
        "Chosen for extra space to unwind after the mountains; this living room shows the feel. The exact accommodation and room allocation are confirmed for your dates.",
      "signature-villa":
        "These candidate photos show design-led rooms, a glass dining terrace and lounge spaces. The exact property and room are confirmed for your dates; tell us which features matter most to you.",
    },
    zh: {
      "city-candidate-01":
        "实用的市区住宿，照片是其中一间明亮的双床房。具体酒店、房型和窗景按你的日期确认。",
      "premium-villa":
        "看完山回来想要更宽敞的空间放松，就选这一档；照片里的客厅展示的就是这种空间感。具体住处和分房按你的日期确认。",
      "signature-villa":
        "这组候选住宿照片展示了设计感客房、玻璃景观餐厅和休息区。具体住处和房型按你的日期确认；告诉我们你最在意哪些。",
    },
    ko: {
      "city-candidate-01":
        "밝은 트윈룸 사진으로 보여 드리는 실용적인 시내 숙소입니다. 정확한 숙소, 객실과 전망은 여행 날짜에 맞춰 확정합니다.",
      "premium-villa":
        "산에서 돌아와 넉넉한 공간에서 쉬고 싶은 분께 맞는 숙소로, 사진은 그 공간감을 보여 주는 거실입니다. 정확한 숙소와 객실 배정은 여행 날짜에 맞춰 확정합니다.",
      "signature-villa":
        "이 후보 숙소 사진은 디자인이 돋보이는 객실, 유리 다이닝 테라스와 휴식 공간을 보여 줍니다. 실제 숙소와 객실은 여행 날짜에 맞춰 확정하니, 중요하게 생각하는 요소를 알려 주세요.",
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
      className={`${localeStyles.root} hg-locale-root ${editorialStyles.pageRoot} ${styles.previewRoot}`}
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
                {published ? (
                  <GuideCtaLink className={styles.inquiryAction} guideId="zhangjiajie-4-day-private-tour" href={inquiryHref} locale={locale} position="header">
                    {isZh ? "查询我出行日期的价格" : isKo ? "내 여행 날짜로 요금 확인하기" : "Check prices for my dates"}
                    <ArrowRight aria-hidden="true" size={18} />
                  </GuideCtaLink>
                ) : null}
                {published ? <TourWhatsAppLink locale={locale} slug="zhangjiajie-4-day-private-tour" /> : null}
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
                      ? "햇빛을 받은 장가계 국가삼림공원의 사암 봉우리와 깊은 숲속 계곡"
                      : "Sunlit sandstone pillars and deep forested ravines in Zhangjiajie National Forest Park"
                }
                fetchPriority="high"
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
                        <figcaption>
                          {locale === "zh"
                            ? "住宿参考照片"
                            : locale === "ko"
                              ? "숙소 참고 사진"
                              : "Accommodation reference"}
                          {" · "}
                          {photo.caption}
                        </figcaption>
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
            <TourPriceScope route="zhangjiajie" locale={locale} detailsHref="#scope-title" />
            {published ? (
              <GuideCtaLink className={styles.inquiryAction} guideId="zhangjiajie-4-day-private-tour" href={inquiryHref} locale={locale} position="inline">
                {isZh ? "查询我出行日期的价格" : isKo ? "내 여행 날짜로 요금 확인하기" : "Check prices for my dates"}
                <ArrowRight aria-hidden="true" size={18} />
              </GuideCtaLink>
            ) : null}
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

          {published ? (
            <section
              className={styles.contentSection}
              aria-labelledby="destination-planning-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionEyebrow}>{commercialCopy.productLabel}</p>
                <h2 id="destination-planning-title">{commercialCopy.productTitle}</h2>
                <p>{commercialCopy.productBody}</p>
              </div>
              <div className={`${styles.scopeGrid} ${styles.planningLinks}`}>
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
              </div>
            </section>
          ) : null}

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
