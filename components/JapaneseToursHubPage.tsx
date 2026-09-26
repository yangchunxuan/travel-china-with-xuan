import Link from "next/link";
import { JapaneseTourFooter, JapaneseTourHeader } from "./JapaneseTourChrome";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { japaneseLegacyZhangjiajieCopy, japaneseLegacyZhangjiajieProduct } from "../lib/japaneseLegacyZhangjiajieProduct";
import { localizeJapanesePrivateTourProduct } from "../lib/localizeJapanesePrivateTourProduct";
import { getPrivateTourStartingPrice } from "../lib/privateTourStartingPrice";
import { privateTourProducts } from "../lib/privateTourProducts";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./PrivateToursHubPage.module.css";

const site = "https://homegroundchina.com";

export function JapaneseToursHubPage() {
  const tours = [
    ...privateTourProducts.map((product) => localizeJapanesePrivateTourProduct(product)),
    localizeJapanesePrivateTourProduct(japaneseLegacyZhangjiajieProduct, japaneseLegacyZhangjiajieCopy),
  ];
  const contactHref = `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent("日本語で中国旅行を相談")}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site}/ja/tours/#webpage`,
    url: `${site}/ja/tours/`,
    name: "中国ツアー一覧 | Homeground China",
    inLanguage: "ja",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tours.length,
      itemListElement: tours.map((tour, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tour.title,
        url: `${site}${tour.path}`,
      })),
    },
  };

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.toursPage}`} data-homeground-locale="ja" lang="ja">
      <a className={localeStyles.skipLink} href="#private-tours-main">ツアー一覧へ移動</a>
      <JapaneseTourHeader tourSlug={null} />
      <main id="private-tours-main" tabIndex={-1}>
        <header className={styles.hero}>
          <nav aria-label="パンくずリスト" className={styles.breadcrumb}>
            <ol>
              <li><Link href="/ja/">ホーム</Link></li>
              <li aria-current="page">中国ツアー一覧</li>
            </ol>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{tours.length}コースから探す中国の旅</p>
              <h1>旅の行き先を<br />見つける。</h1>
            </div>
            <div className={styles.heroAside}>
              <p>都市、自然、文化を巡るプライベートツアーと、出発日指定の少人数グループ。各ページで日程、サービス内容、公開料金または見積もり条件をご確認いただけます。</p>
              <a className={styles.heroAction} href="#tour-quick-compare-title">全コースを見る <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </header>

        <section aria-labelledby="tour-quick-compare-title" className={styles.quickCompare}>
          <div className={styles.quickIntro}>
            <div>
              <p className={styles.eyebrow}>ツアー一覧</p>
              <h2 id="tour-quick-compare-title">行程を比べて選ぶ。</h2>
            </div>
            <div className={styles.priceContext}>
              <p>料金は各ツアーページに記載の人数・プランを基準にご確認ください。掲載料金のないコースは旅行日程と人数に合わせてお見積もりします。</p>
            </div>
          </div>
          <ul className={styles.quickList}>
            {tours.map((tour) => {
              const starting = getPrivateTourStartingPrice(tour);
              return (
                <li className={styles.quickItem} key={tour.slug}>
                  <Link className={styles.quickLink} href={tour.path}>
                    <figure className={styles.quickImage}>
                      <img
                        alt={tour.heroImage.alt}
                        decoding="async"
                        height={tour.heroImage.height}
                        loading="lazy"
                        src={tour.heroImage.src}
                        style={{ objectPosition: tour.heroImage.objectPosition }}
                        width={tour.heroImage.width}
                      />
                    </figure>
                    <div className={styles.quickIdentity}>
                      <p>{tour.tourFormat === "small-group" ? "出発日指定の少人数グループ" : "プライベートツアー"}</p>
                      <h3>{tour.title}</h3>
                      <p className={styles.quickAppeal}>{tour.lede}</p>
                    </div>
                    <p className={styles.quickFacts}>
                      {starting ? <>
                        <span className={styles.priceLabel}>掲載料金の目安</span>
                        <strong>{starting.formatted}</strong>
                        <span>{tour.tourFormat === "small-group" ? "2名1室・1名あたり" : `${starting.selection.travelers}名参加時・1名あたり`}</span>
                        <span className={styles.priceService}>{starting.serviceLabel}</span>
                      </> : <>
                        <strong>日程に合わせてお見積もり</strong>
                        <span>人数・お部屋・プランを確認してご案内</span>
                      </>}
                    </p>
                    <div className={styles.quickMeta}>
                      <dl className={styles.quickDetails}>
                        <div><dt>日数</dt><dd>{tour.days}日間・{tour.nights}泊</dd></div>
                      </dl>
                    </div>
                    <span className={styles.quickAction}>
                      <span>{tour.days}日間</span>
                      <span>行程を見る <span aria-hidden="true">→</span></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.finalSection} id="contact">
          <div className={styles.finalInner}>
            <div>
              <p className={styles.finalEyebrow}>旅について相談する</p>
              <h2>行きたい場所が決まりましたか？</h2>
            </div>
            <div>
              <p>気になるコースと旅行日程、人数をお知らせください。日本語でご案内します。</p>
              <a className={styles.finalAction} href={contactHref}>メールで相談する <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>
      <JapaneseTourFooter tourSlug={null} />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </div>
  );
}
