import Image from "next/image";
import Link from "next/link";
import { JapaneseContactPanel } from "./JapaneseContactPanel";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import localeStyles from "./LocaleRoot.module.css";
import { KeepWords } from "./text/KeepWords";
import { jaPilot } from "../lib/jaPilot";
import { jaPilotCopy } from "../lib/jaPilotCopy";
import {
  japaneseGeneralContactHrefs,
  japaneseLanguagePaths,
  japaneseSite,
} from "../lib/japaneseSite";
import styles from "./GuidesHubPage.module.css";
import jaStyles from "./JapaneseGuidesHubPage.module.css";

const guide = jaPilotCopy.guide;
const image = "/images/guides/shanghai-hangzhou-transport-route/hero-1600.webp";
const contact = japaneseGeneralContactHrefs(japaneseSite.guides);
const url = `https://homegroundchina.com${japaneseSite.guides}`;

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${url}#webpage`,
  url,
  name: "中国旅行の実用ガイド",
  inLanguage: "ja",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 1,
    itemListElement: [{
      "@type": "ListItem",
      position: 1,
      name: guide.title,
      url: `https://homegroundchina.com${jaPilot.guide}`,
    }],
  },
};

export function JapaneseGuidesHubPage() {
  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.guidesPage}`} data-homeground-locale="ja" lang="ja">
      <a className={localeStyles.skipLink} href="#guides-main">本文へ移動</a>
      <JapaneseSiteHeader
        contactHref="#contact"
        currentPath={japaneseSite.guides}
        languagePaths={japaneseLanguagePaths("/guides/", japaneseSite.guides)}
      />
      <main id="guides-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroTopline}>
            <p className={styles.eyebrow}>Homeground China · 旅の準備</p>
          </div>
          <div className={styles.heroGrid}>
            <h1><KeepWords locale="ja" text="中国旅行の実用ガイド" /></h1>
            <p>駅の選び方や移動の組み立て方を、旅行者の目線で確認できます。日本語のガイドは現在1本公開しています。</p>
          </div>
        </header>

        <section className={styles.catalog} id="guide-list" aria-labelledby="guides-catalog-title">
          <div className={styles.catalogIntro}>
            <div>
              <p className={styles.eyebrow}>日本語の記事</p>
              <h2 id="guides-catalog-title"><KeepWords locale="ja" text="移動を決める前に、駅の先まで。" /></h2>
            </div>
            <div className={styles.catalogSummary}>
              <p>上海から杭州へ向かうとき、列車の所要時間だけでなく、ホテルから駅、到着駅から目的地までの移動も比べます。</p>
              <p className={styles.guideCount}>公開中：1本</p>
            </div>
          </div>
          <ol className={styles.guideGrid}>
            <li className={`${styles.guideSlot} ${styles.guideSlotLead}`}>
              <article>
                <Link className={styles.guideLink} href={jaPilot.guide}>
                  <figure className={styles.guideImage}>
                    <Image src={image} alt="杭州東駅の構内" width={1600} height={1000} sizes="(max-width: 53rem) 100vw, 55vw" />
                  </figure>
                  <div className={styles.guideBody}>
                    <p className={styles.guideMeta}>上海 · 杭州 · 移動</p>
                    <h3><KeepWords locale="ja" text={guide.title} /></h3>
                    <p className={styles.guideDescription}>{guide.lede}</p>
                    <span className={styles.readGuide}>ガイドを見る <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </article>
            </li>
          </ol>
          <p className={jaStyles.photoCredit}>写真：<a href="https://commons.wikimedia.org/wiki/File:Hangzhou_East_railway_station_interior.jpg">Staeiou / Wikimedia Commons</a>、<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>。トリミング・WebP変換済み。</p>
          <p className={jaStyles.otherLanguages}>ほかの実用ガイドは、<Link href="/guides/" hrefLang="en" lang="en">English guides</Link> でご覧いただけます。</p>
        </section>

        <section className={styles.cta} id="contact" aria-labelledby="guide-contact-title">
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>ガイドの次に</p>
            <div className={styles.ctaGrid}>
              <div>
                <h2 id="guide-contact-title"><KeepWords locale="ja" text="旅程も一緒に考えます。" /></h2>
                <p>行き先や旅行時期が決まっていたら、人数とあわせてお知らせください。</p>
                <Link className={styles.ctaAction} href={japaneseSite.tours}>日本語のツアー一覧を見る <span aria-hidden="true">→</span></Link>
              </div>
              <JapaneseContactPanel
                title="日本語で旅を相談する"
                body="日付や移動の組み方について、まだ決めきっていない段階でもご相談いただけます。"
                emailHref={contact.email}
                headingId="ja-guide-contact-panel-title"
                whatsappHref={contact.whatsapp}
              />
            </div>
          </div>
        </section>
      </main>
      <JapaneseSiteFooter currentPath={japaneseSite.guides} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
