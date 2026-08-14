import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, CircleAlert } from "lucide-react";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import { ZhangjiajiePrivateTourPriceWindow } from "./ZhangjiajiePrivateTourPriceWindow";
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
  const description = isZh
    ? product.short_description["zh-CN"]
    : product.short_description.en;

  return (
    <div className={styles.localeRoot} lang={copy.htmlLang}>
      <a className={styles.skipLink} href="#tour-details">
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
        pageContext="content"
      />

      <main id="tour-details">
        <section className={styles.hero} aria-labelledby="product-title">
          <div className={styles.heroMedia}>
            <Image
              alt={
                isZh
                  ? "云雾中的张家界砂岩峰林"
                  : "Zhangjiajie sandstone peaks rising through mist"
              }
              fill
              priority
              sizes="100vw"
              src="/images/hero-zhangjiajie.jpg"
            />
            <div className={styles.heroScrim} />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id="product-title">
                {isZh ? (
                  <>
                    张家界<span className={styles.nowrap}>4天3晚</span>私家定制
                  </>
                ) : (
                  <>
                    Zhangjiajie <span className={styles.nowrap}>4-Day</span>{" "}
                    Private Tour
                  </>
                )}
              </h1>
              <p className={styles.heroLede}>{description}</p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href={inquiryHref}>
                  {copy.primaryCta}
                  <ArrowRight aria-hidden="true" size={19} />
                </Link>
                <a className={styles.secondaryButton} href="#four-day-route">
                  {copy.secondaryCta}
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
              </div>
            </div>
            <aside className={styles.heroPanel} aria-label={copy.priceBasis}>
              <ZhangjiajiePrivateTourPriceWindow locale={locale} mode="hero" />
              <p>{copy.priceBasis}</p>
              <time dateTime="2026-08-31">{copy.validThrough}</time>
              <span>{copy.heroNote}</span>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="why-private-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>{copy.whyEyebrow}</p>
            <h2 id="why-private-title">{copy.whyTitle}</h2>
            <p>{copy.whyIntro}</p>
          </div>
          <div className={styles.benefitGrid}>
            {copy.benefits.map(([heading, body], index) => (
              <article className={styles.benefitCard} key={heading}>
                <span>0{index + 1}</span>
                <h3>{heading}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.routeSection}`}
          id="four-day-route"
          aria-labelledby="route-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>{copy.routeEyebrow}</p>
            <h2 id="route-title">{copy.routeTitle}</h2>
          </div>
          <ol className={styles.routeList}>
            {product.route.map((day, index) => (
              <li key={day.day}>
                <div className={styles.dayMarker}>
                  <span>{isZh ? "第" : "Day"}</span>
                  <strong>{day.day}</strong>
                  {isZh ? <span>天</span> : null}
                </div>
                <div className={styles.dayCopy}>
                  <div>
                    <h3>{isZh ? day.title_zh : day.title_en}</h3>
                    <span className={styles.dayStatus}>
                      {day.guide_planned ? copy.guideLabel : copy.arrivalLabel}
                    </span>
                  </div>
                  <p>{copy.daySummaries[index]}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="prices-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>{copy.pricesEyebrow}</p>
            <h2 id="prices-title">{copy.pricesTitle}</h2>
            <p>{copy.pricesIntro}</p>
          </div>
          <ZhangjiajiePrivateTourPriceWindow locale={locale} mode="tiers" />
        </section>

        <section
          className={`${styles.section} ${styles.scopeSection}`}
          aria-labelledby="scope-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>{copy.scopeEyebrow}</p>
            <h2 id="scope-title">{copy.scopeTitle}</h2>
          </div>
          <div className={styles.scopeGrid}>
            <article>
              <h3>{copy.plannedTitle}</h3>
              <ul>
                {copy.plannedItems.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article>
              <h3>{copy.excludedTitle}</h3>
              <ul>
                {copy.excludedItems.map((item) => (
                  <li key={item}>
                    <span className={styles.listDash} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className={styles.scopeNote}>{copy.confirmationNote}</p>
        </section>

        <section className={styles.section} aria-labelledby="payment-title">
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

        <section className={styles.finalCta} aria-labelledby="final-cta-title">
          <div>
            <p className={styles.sectionEyebrow}>{copy.eyebrow}</p>
            <h2 id="final-cta-title">{copy.finalTitle}</h2>
            <p>{copy.finalBody}</p>
          </div>
          <Link className={styles.finalButton} href={inquiryHref}>
            {copy.primaryCta}
            <ArrowRight aria-hidden="true" size={20} />
          </Link>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="content" />
    </div>
  );
}
