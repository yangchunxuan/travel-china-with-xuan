import Link from "next/link";
import { JapaneseTourFooter, JapaneseTourHeader } from "./JapaneseTourChrome";
import { japaneseGeneralContactHrefs, japaneseSite } from "../lib/japaneseSite";
import { JapaneseContactPanel } from "./JapaneseContactPanel";
import { getJapaneseTourCatalog } from "../lib/japaneseTourCatalog";
import { JapaneseTourQuickCard } from "./JapaneseTourQuickCard";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./PrivateToursHubPage.module.css";
import { KeepWords } from "./text/KeepWords";

const site = "https://homegroundchina.com";

export function JapaneseToursHubPage() {
  const tours = getJapaneseTourCatalog();
  const contact = japaneseGeneralContactHrefs(japaneseSite.tours);
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
              <h2 id="tour-quick-compare-title"><KeepWords locale="ja" text="行程を比べて選ぶ。" /></h2>
            </div>
            <div className={styles.priceContext}>
              <p>料金は各ツアーページに記載の人数・プランを基準にご確認ください。掲載料金のないコースは旅行日程と人数に合わせてお見積もりします。</p>
            </div>
          </div>
          <ul className={styles.quickList}>
            {tours.map((tour) => <JapaneseTourQuickCard key={tour.slug} tour={tour} />)}
          </ul>
        </section>

        <section className={styles.finalSection} id="contact">
          <div className={styles.finalInner}>
            <div>
              <p className={styles.finalEyebrow}>旅について相談する</p>
              <h2><KeepWords locale="ja" text="行きたい場所が決まりましたか？" /></h2>
            </div>
            {/* Wrapped so the tile's `div:last-child > p` rule leaves the panel's own text alone. */}
            <div>
              <JapaneseContactPanel
                body="気になるコースと旅行の時期、人数をお知らせください。日本語でご案内します。まだコースが決まっていなくてもかまいません。"
                emailHref={contact.email}
                headingId="ja-tours-contact-title"
                title="日本語で旅を相談する"
                whatsappHref={contact.whatsapp}
              />
            </div>
          </div>
        </section>
      </main>
      <JapaneseTourFooter tourSlug={null} />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </div>
  );
}
