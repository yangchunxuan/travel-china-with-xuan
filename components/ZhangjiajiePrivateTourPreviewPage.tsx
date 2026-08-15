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
  productPreviewCopy,
  type ProductPreviewLocale,
  zhangjiajiePrivateTourPreviewPaths,
  zhangjiajiePrivateTourProduct,
} from "../lib/zhangjiajiePrivateTourPreview";
import styles from "./ZhangjiajiePrivateTourPreviewPage.module.css";

export function ZhangjiajiePrivateTourPreviewPage({
  locale,
}: {
  locale: ProductPreviewLocale;
}) {
  const copy = productPreviewCopy[locale];
  const product = zhangjiajiePrivateTourProduct;
  const isZh = locale === "zh";
  const homePath = isZh ? "/zh/" : "/";
  const inquiryHref = `${homePath}?utm_source=product_preview&utm_medium=website&utm_campaign=zhangjiajie_4d3n#planner-contact`;
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
    1: {
      alt: isZh
        ? "张家界荷花国际机场停机坪上的客机与登机桥，远处可见天门山"
        : "Passenger aircraft and boarding bridges at Zhangjiajie Hehua International Airport, with Tianmen Mountain beyond the apron",
      caption: isZh
        ? "张家界荷花国际机场 · 第1天抵达节点参考（照片不代表私人接站服务）"
        : "Zhangjiajie Hehua International Airport · Day 1 arrival reference (the photograph does not depict the private transfer)",
      credit: {
        author: "Martin Lewison",
        license: "CC BY-SA 2.0",
        licenseHref: "https://creativecommons.org/licenses/by-sa/2.0/",
        sourceHref:
          "https://commons.wikimedia.org/wiki/File:Zhangjiajie_Airport_(27796134377).jpg",
      },
      src: "/product-previews/zhangjiajie-4-day-private-tour/route/day-1-hehua-airport.jpg",
    },
    2: {
      alt: isZh
        ? "百龙天梯沿张家界国家森林公园的砂岩崖壁升起"
        : "The Bailong Elevator rising against a sandstone cliff in Zhangjiajie National Forest Park",
      caption: isZh
        ? "百龙天梯 · 第2天进山路线实景参考"
        : "Bailong Elevator · Day 2 route reference",
      src: "/product-previews/zhangjiajie-4-day-private-tour/route/day-2-bailong-elevator.jpg",
    },
    3: {
      alt: isZh
        ? "游客正在跨越张家界大峡谷玻璃桥"
        : "Visitors crossing the Zhangjiajie Grand Canyon Glass Bridge",
      caption: isZh
        ? "张家界大峡谷玻璃桥 · 第3天实景参考"
        : "Zhangjiajie Grand Canyon Glass Bridge · Day 3 reference",
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
    },
    4: {
      alt: isZh
        ? "天门山上天梯尽头的天门洞"
        : "Tianmen Cave above the stairway at Tianmen Mountain",
      caption: isZh
        ? "天门洞与上天梯 · 第4天实景参考"
        : "Tianmen Cave and its stairway approach · Day 4 reference",
      src: "/product-previews/zhangjiajie-4-day-private-tour/hero/tianmen-cave-and-stairs.jpg",
    },
  };

  return (
    <div
      className={`${homeStyles.localeRoot} ${editorialStyles.pageRoot} ${styles.previewRoot}`}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={editorialStyles.skipLink} href="#tour-details">
        {copy.skipLink}
      </a>
      <div className={styles.previewBar} role="status">
        <CircleAlert aria-hidden="true" size={17} />
        <span>{copy.previewLabel}</span>
      </div>
      <HomegroundHeader
        languagePaths={{
          en: zhangjiajiePrivateTourPreviewPaths.en,
          zh: zhangjiajiePrivateTourPreviewPaths.zh,
        }}
        locale={locale}
        pageContext="guide"
      />

      <main id="tour-details">
        <section
          className={`${editorialStyles.hero} ${styles.hero}`}
          aria-labelledby="product-title"
        >
          <div className={editorialStyles.heroCopy}>
            <nav className={editorialStyles.breadcrumb} aria-label={copy.breadcrumbLabel}>
              <ol>
                <li>
                  <Link href={homePath}>{copy.homeLabel}</Link>
                  <span aria-hidden="true">/</span>
                </li>
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
            <a className={styles.articleJump} href="#four-day-route">
              {copy.secondaryCta}
              <ArrowDown aria-hidden="true" size={18} />
            </a>
          </div>

          <figure className={`${editorialStyles.heroFigure} ${styles.heroFigure}`}>
            <div className={styles.heroImage}>
              <Image
                alt={
                  isZh
                    ? "阳光照亮张家界国家森林公园的砂岩峰柱与深谷"
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
          <section className={styles.contentSection} aria-labelledby="why-private-title">
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
                      <span>{isZh ? "第" : "Day"}</span>
                      <strong>{day.day}</strong>
                      {isZh ? <span>天</span> : null}
                    </div>
                    <div
                      className={`${styles.dayCopy} ${
                        routePhoto ? styles.dayCopyWithImage : ""
                      }`}
                    >
                      <div>
                        <h3>{isZh ? day.title_zh : day.title_en}</h3>
                        <span className={styles.dayStatus}>
                          {day.guide_planned ? copy.guideLabel : copy.arrivalLabel}
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
                                {isZh ? "图片：" : "Photo: "}
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
                                {isZh ? " · 已裁切" : " · cropped"}
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

          <section className={styles.contentSection} aria-labelledby="stays-title">
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
            <p className={styles.previewAssetNote}>
              <CircleAlert aria-hidden="true" size={18} />
              <span>{copy.previewAssetNote}</span>
            </p>
            <div className={styles.stayGrid}>
              {copy.accommodationOptions.map((option) => (
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

          <section className={styles.contentSection} aria-labelledby="prices-title">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.pricesEyebrow}</p>
              <h2 id="prices-title">{copy.pricesTitle}</h2>
              <p>{copy.pricesIntro}</p>
            </div>
            <ZhangjiajiePrivateTourPriceWindow locale={locale} />
          </section>

          <section className={styles.contentSection} aria-labelledby="faq-title">
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

          <section className={styles.contentSection} aria-labelledby="scope-title">
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
            <p className={styles.scopeNote}>{copy.confirmationNote}</p>
          </section>

          <section className={styles.contentSection} aria-labelledby="payment-title">
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
        </article>

        <aside className={`${editorialStyles.cta} ${styles.finalCta}`} aria-labelledby="final-cta-title">
          <div>
            <p className={editorialStyles.ctaLabel}>{copy.finalEyebrow}</p>
            <h2 id="final-cta-title">{copy.finalTitle}</h2>
            <p>{copy.finalBody}</p>
          </div>
          <GuideCtaLink
            guideId="zhangjiajie-4-day-private-tour-preview"
            href={inquiryHref}
            locale={locale}
            position="footer"
          >
            {copy.finalCtaLabel}
            <ArrowRight aria-hidden="true" size={20} />
          </GuideCtaLink>
        </aside>
      </main>

      <HomegroundFooter locale={locale} pageContext="content" />
    </div>
  );
}
