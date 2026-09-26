import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { JapanesePilotShell } from "../../../../../components/JapanesePilotShell";
import {
  JapaneseJiangnanFinalActions,
  JapaneseJiangnanPriceConsole,
  JapaneseTourSelectionBoundary,
} from "../../../../../components/JapaneseJiangnanInteraction";
import {
  ShanghaiJiangnanHeroDeck,
  ShanghaiJiangnanRouteExplorer,
} from "../../../../../components/ShanghaiJiangnanImagineInteractive";
import { PrivateTourMotion } from "../../../../../components/PrivateTourMotion";
import styles from "../../../../../components/ShanghaiJiangnanImaginePage.module.css";
import jaStyles from "../../../../../components/JapaneseJiangnanPage.module.css";
import { jaPilot, jaPilotTourAlternates } from "../../../../../lib/jaPilot";
import { jaPilotCopy } from "../../../../../lib/jaPilotCopy";
import { getLocalizedPrivateTourPhotoCredits } from "../../../../../lib/privateTourPhotoCredits";
import {
  getPrivateTourProduct,
  localizePrivateTourProduct,
  type LocalizedPrivateTourProduct,
} from "../../../../../lib/privateTourProducts";

const copy = jaPilotCopy.tour;
const product = getPrivateTourProduct(jaPilot.tourSlug);
if (!product) throw new Error("Japanese pilot tour source is missing");
const offer = product.packages.find((item) => item.id === "standard-guided");
if (!offer || offer.prices.map((row) => row.travelers).join(",") !== "2,4,6") {
  throw new Error("Japanese pilot price tiers changed");
}
const prices = offer.prices.map((row) => ({
  travelers: row.travelers as 2 | 4 | 6,
  cnyPerPerson: row.cnyPerPerson,
}));

const english = localizePrivateTourProduct(product, "en");
const tour: LocalizedPrivateTourProduct = {
  ...english,
  title: copy.title,
  lede: copy.lede,
  itinerary: copy.days.map((day, index) => ({
    day: index + 1,
    title: day.title.split("｜")[1] ?? day.title,
    description: day.body,
  })),
  heroImage: {
    ...english.heroImage,
    alt: copy.photos.deck[0].alt,
    caption: copy.photos.deck[0].caption,
  },
  gallery: english.gallery.map((image, index) => ({
    ...image,
    alt: copy.photos.deck[index + 1]?.alt ?? image.alt,
    caption: copy.photos.deck[index + 1]?.caption ?? image.caption,
  })),
  routeMedia: english.routeMedia.map((group) => ({
    ...group,
    variants: group.variants.map((variant) => {
      const photo = copy.photos.route[group.day - 1];
      return {
        ...variant,
        label: photo?.label ?? variant.label,
        image: {
          ...variant.image,
          alt: photo?.alt ?? variant.image.alt,
          caption: photo?.caption ?? variant.image.caption,
        },
      };
    }),
  })),
};

const photoCredits = getLocalizedPrivateTourPhotoCredits(product.slug, "en");
const creditSubjects = ["蘇州・盤門", "蘇州・平江路", "杭州東駅"];
const photoCopy = {
  nextPhoto: "次の旅の写真を表示",
  routeLabel: "日付を選ぶと旅の写真が切り替わります",
  routeScenes: "その日の風景",
  dayUnit: "日目",
};

export const metadata: Metadata = {
  title: "上海・蘇州・杭州6日間｜日本語ガイド付きプライベートツアー | Homeground China",
  description: "上海2泊・蘇州1泊・杭州2泊。日本語ガイドによる4日間の観光と都市間の移動を含む6日間のプライベートツアー。",
  alternates: { canonical: jaPilot.tour, languages: jaPilotTourAlternates() },
  openGraph: {
    title: copy.title,
    description: copy.lede,
    type: "website",
    locale: "ja_JP",
    url: jaPilot.tour,
    images: [{ url: product.heroImage.src, width: product.heroImage.width, height: product.heroImage.height, alt: copy.photos.deck[0].alt }],
  },
  robots: { index: true, follow: true },
};

const pageUrl = `https://homegroundchina.com${jaPilot.tour}`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: copy.title,
      description: copy.lede,
      inLanguage: "ja",
      datePublished: product.datePublished,
      dateModified: product.dateModified,
      mainEntity: { "@id": `${pageUrl}#tour` },
    },
    {
      "@type": "TouristTrip",
      "@id": `${pageUrl}#tour`,
      url: pageUrl,
      name: copy.title,
      description: copy.lede,
      image: `https://homegroundchina.com${product.heroImage.src}`,
      provider: { "@type": "Organization", "@id": "https://homegroundchina.com/#organization", name: "Homeground China" },
      itinerary: {
        "@type": "ItemList",
        numberOfItems: tour.itinerary.length,
        itemListElement: tour.itinerary.map((day) => ({
          "@type": "ListItem",
          position: day.day,
          name: day.title,
          description: day.description,
        })),
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "CNY",
        lowPrice: Math.min(...prices.map((price) => price.cnyPerPerson)),
        highPrice: Math.max(...prices.map((price) => price.cnyPerPerson)),
        offerCount: prices.length,
        url: pageUrl,
        offers: prices.map((price) => ({
          "@type": "Offer",
          name: `${price.travelers}名で参加・1名あたり`,
          priceCurrency: "CNY",
          price: price.cnyPerPerson,
          url: pageUrl,
        })),
      },
    },
  ],
};

export default function JapaneseJiangnanTour() {
  return (
    <JapaneseTourSelectionBoundary>
      <JapanesePilotShell current="tour">
        <div className={`${styles.page} ${jaStyles.productPage}`} data-homeground-locale="ja" lang="ja">
          <section aria-labelledby="product-title" className={styles.hero}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <nav aria-label="現在の位置" className={styles.breadcrumb}>
                  <ol>
                    <li><Link href={jaPilot.home}>{copy.presentation.breadcrumbHome}</Link><span aria-hidden="true">/</span></li>
                    <li><Link href={jaPilot.home}>{copy.presentation.breadcrumbTours}</Link><span aria-hidden="true">/</span></li>
                    <li aria-current="page">{copy.title}</li>
                  </ol>
                </nav>
                <p className={styles.heroMeta}>{copy.presentation.heroMeta}</p>
                <h1 id="product-title">{copy.title}</h1>
                <p className={styles.heroPromise}>{copy.presentation.heroPromise}</p>
                <p className={styles.heroLede}>{copy.lede}</p>
              </div>
              <div className={styles.priceSlot}>
                <JapaneseJiangnanPriceConsole prices={prices} />
              </div>
              <ShanghaiJiangnanHeroDeck product={tour} photoCopy={photoCopy} />
            </div>
          </section>

          <dl className={styles.factsRail}>
            {copy.presentation.facts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}
          </dl>

          <section className={styles.section} data-tour-reveal>
            <div className={styles.sectionInner}>
              <div className={styles.sectionHeading}>
                <p className={styles.sectionEyebrow}>{copy.presentation.overviewEyebrow}</p>
                <h2>{copy.presentation.overviewTitle}</h2>
                <p>{copy.presentation.overviewBody}</p>
              </div>
              <ol className={styles.highlightList}>
                {copy.presentation.highlights.map((highlight, index) => (
                  <li key={highlight}><span>{String(index + 1).padStart(2, "0")}</span><h3>{highlight}</h3></li>
                ))}
              </ol>
            </div>
          </section>

          <section className={`${styles.section} ${styles.routeSection}`} data-tour-reveal>
            <div className={styles.sectionInner}>
              <div className={`${styles.sectionHeading} ${styles.routeHeading} ${jaStyles.routeHeading}`}>
                <p className={styles.sectionEyebrow}>{copy.presentation.routeEyebrow}</p>
                <h2>{copy.presentation.routeTitle}</h2>
                <p>{copy.presentation.routeBody}</p>
              </div>
              <ShanghaiJiangnanRouteExplorer product={tour} photoCopy={photoCopy} />
            </div>
          </section>

          <section className={styles.section} data-tour-reveal>
            <div className={styles.sectionInner}>
              <div className={styles.sectionHeading}>
                <p className={styles.sectionEyebrow}>{copy.presentation.serviceEyebrow}</p>
                <h2>{copy.presentation.serviceTitle}</h2>
                <p>{copy.presentation.serviceBody}</p>
              </div>
              <div className={styles.serviceGrid}>
                <article><span>01</span><h3>宿泊</h3><p>{copy.included[0]}</p></article>
                <article><span>02</span><h3>日本語ガイドと移動</h3><p>{copy.guideNote}</p></article>
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="before-choose-title">
            <div className={styles.sectionInner}>
              <div className={`${styles.sectionHeading} ${styles.faqHeading}`}>
                <h2 id="before-choose-title">{copy.presentation.beforeChooseTitle}</h2>
              </div>
              <div className={`${styles.serviceGrid} ${styles.faqGrid}`}>
                {copy.notes.map((note, index) => (
                  <article key={note}>
                    <h3>{copy.presentation.beforeChooseLabels[index]}</h3>
                    <p>{note}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.scopeSection}`} id="tour-price-details" data-tour-reveal>
            <div className={styles.sectionInner}>
              <div className={styles.sectionHeading}>
                <p className={styles.sectionEyebrow}>{copy.presentation.scopeEyebrow}</p>
                <h2>{copy.presentation.scopeTitle}</h2>
                <p>{copy.priceNote}</p>
              </div>
              <div className={styles.scopeGrid}>
                <section><h3>{copy.excludedTitle}</h3><ul>{copy.excluded.map((item) => <li key={item}><span aria-hidden="true">—</span><span>{item}</span></li>)}</ul></section>
                <section><h3>{copy.presentation.confirmedTitle}</h3><ul>{copy.presentation.confirmations.map((item) => <li key={item}><Check aria-hidden="true" size={17} /><span>{item}</span></li>)}</ul></section>
              </div>
            </div>
          </section>

          <section className={styles.section} data-tour-reveal>
            <div className={styles.sectionInner}>
              <div className={styles.sectionHeading}>
                <p className={styles.sectionEyebrow}>旅の準備に役立つ情報</p>
                <h2>都市間の移動も、旅の一部として考える。</h2>
                <p>駅から駅だけでなく、ホテルからの出発、荷物、観光後の移動まで確認できます。</p>
              </div>
              <div className={`${styles.scopeGrid} ${styles.planningLinks}`}>
                <section><h3>移動ガイド</h3><ul><li><Link href={jaPilot.guide}><span>上海から杭州への行き方</span><ArrowRight aria-hidden="true" size={17} /></Link></li></ul></section>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.creditSection}`}>
            <div className={styles.sectionInner}>
              <details className={styles.photoCredits}>
                <summary>{copy.presentation.photoCreditsTitle}</summary>
                <div className={styles.photoCreditBody}>
                  <p>掲載写真は元の写真をトリミングし、WebP形式に変換したものを含みます。</p>
                  <ul>
                    {photoCredits.map((credit, index) => (
                      <li key={credit.sourceUrl}>
                        <a href={credit.sourceUrl} rel="noreferrer" target="_blank">{creditSubjects[index] ?? credit.subject}</a>
                        <span>撮影：{credit.author} · <a href={credit.licenseUrl} rel="license">{credit.licenseLabel}</a></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </section>

          <aside className={styles.finalCta} id="contact" data-tour-reveal>
            <div className={styles.finalInner}>
              <div>
                <p className={styles.finalEyebrow}>あなただけの6日間に</p>
                <h2>{copy.ctaTitle}</h2>
                <p>{copy.ctaBody}</p>
              </div>
              <JapaneseJiangnanFinalActions />
            </div>
            <div className={jaStyles.privacyLink}><a href={jaPilot.privacy}>お問い合わせと個人情報について</a></div>
          </aside>

          <PrivateTourMotion />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        </div>
      </JapanesePilotShell>
    </JapaneseTourSelectionBoundary>
  );
}
