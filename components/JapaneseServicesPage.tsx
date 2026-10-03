import Image from "next/image";
import Link from "next/link";
import { destinationHubRegistry } from "../lib/destinationHubs";
import {
  japaneseGeneralContactHrefs,
  japaneseLanguagePaths,
  japaneseSite,
} from "../lib/japaneseSite";
import { JapaneseContactPanel } from "./JapaneseContactPanel";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import localeStyles from "./LocaleRoot.module.css";
import { PointerSpotlight } from "./motion/PointerSpotlight";
import styles from "./TravelServicesHubPage.module.css";
import { KeepWords } from "./text/KeepWords";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";

const SITE_URL = "https://homegroundchina.com";

export const japaneseServicesCopy = {
  metadata: {
    title: "旅のサポートとサービス内容 | Homeground China",
    description:
      "プライベートガイド、送迎、ホテル選び、ルートの組み立てから旅全体のサポートまで。Homeground China が日本語でお手伝いできることと、進め方をご案内します。",
  },
  hero: {
    eyebrow: "ガイド・送迎・旅のサポート",
    title: "旅の質を左右するところに、現地の力を。",
    description:
      "プライベートガイド、送迎、ホテル選び、ルートの組み立て、旅全体のサポートまで。ご要望を伺ったうえで、必要なお手伝いを組み合わせます。",
    scopeTitle: "現地のサポートが必要なのは、どこでしょう？",
    scope: [
      "手配が難しい一日だけ、プライベートガイドがほしい",
      "送迎やホテル、予約のサポートで不安を減らしたい",
      "旅全体を一人の担当者にまとめてほしい",
    ],
  },
  choices: {
    eyebrow: "わかっていることから始める",
    title: "サービスの名前ではなく、必要な手助けから選ぶ。",
    body: "公開中のプライベートツアーを比べることも、旅行の時期や人数、必要な手配をお知らせいただくこともできます。ご提供できる内容と旅行のお見積もりは、ご予約の前に確定します。",
  },
  cards: [
    {
      id: "tours",
      eyebrow: "公開中のツアー",
      title: "プライベートツアーを比べる",
      body: "日ごとの実際の行程、公開料金、含まれるもの、予約の条件を確かめてから、日程に合うかどうかを判断できます。",
      action: "ツアー一覧を見る",
      href: japaneseSite.tours,
    },
    {
      id: "support",
      eyebrow: "現地での手配まで",
      title: "旅全体のサポート",
      body: "計画に合わせて、ホテル、入場券、送迎、現地での手配までをつなげます。私たちが担当する範囲は、始める前に書面でご案内します。",
      action: "日本語で相談する",
      href: japaneseSite.contact,
    },
  ],
  method: {
    eyebrow: "どのように判断するか",
    title: "ご相談の前に、計画の進め方を知る。",
    body: "Homeground は、有料の作業を始める前に、お客様ご自身で手配を続けてよい部分、改めて確認が必要な部分、私たちが責任を持つ部分をご説明します。",
    guideNote:
      "ご相談は日本語で承ります。日本語ガイドをご希望の場合も、お気軽にお知らせください。上海・蘇州・杭州を巡る6日間のプライベートツアーは、日本語ガイドを含む公開料金です。そのほかのコースでは、日本語ガイドを手配できるかどうかと料金を、日程と人数に合わせて確認し、お見積もりします。",
    studioAction: "チームと進め方を見る",
    exploreAction: "目的地から旅を探す",
  },
} as const;

function cardImage(id: "tours" | "support") {
  if (id === "tours") {
    const hub = destinationHubRegistry.find((entry) => entry.id === "zhangjiajie");
    if (!hub) throw new Error("Missing Zhangjiajie destination hub.");
    return {
      src: hub.heroImagePath,
      width: hub.imageWidth,
      height: hub.imageHeight,
      alt: "張家界国家森林公園の砂岩の峰々のあいだを流れる霧",
      position: "50% 50%",
    };
  }
  return {
    src: "/images/guides/kevin-preparation/kevin-guiding-1080.jpg",
    width: 1080,
    height: 1440,
    alt: "山の景勝地でお客様と話す Kevin（お客様の顔はプライバシー保護のためぼかしています）",
    position: "50% 38%",
  };
}

export function JapaneseServicesPage() {
  const copy = japaneseServicesCopy;
  const contact = japaneseGeneralContactHrefs(japaneseSite.services);
  const canonicalUrl = `${SITE_URL}${japaneseSite.services}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: copy.hero.title,
        description: copy.metadata.description,
        inLanguage: "ja",
        mainEntity: { "@id": `${canonicalUrl}#services` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}${japaneseSite.home}` },
          { "@type": "ListItem", position: 2, name: "サービス", item: canonicalUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#services`,
        numberOfItems: copy.cards.length,
        itemListElement: copy.cards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: card.title,
          url: `${SITE_URL}${card.href}`,
        })),
      },
    ],
  };

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale="ja" lang="ja">
      <a className={localeStyles.skipLink} href="#services-main">本文へ移動</a>
      <JapaneseSiteHeader
        contactHref="#contact"
        currentPath={japaneseSite.services}
        languagePaths={japaneseLanguagePaths("/services/", japaneseSite.services)}
      />
      <main id="services-main" tabIndex={-1}>
        <PointerSpotlight />
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="現在の位置">
              <ol>
                <li><Link href={japaneseSite.home}>ホーム</Link></li>
                <li aria-current="page"><span aria-hidden="true">/</span>サービス</li>
              </ol>
            </nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
                <h1><AnimatedHeadline locale="ja" text={copy.hero.title} /></h1>
                <p className={styles.lede}>{copy.hero.description}</p>
              </div>
              <aside className={styles.scope} aria-labelledby="services-scope-title">
                <p id="services-scope-title">{copy.hero.scopeTitle}</p>
                <ul>{copy.hero.scope.map((item) => <li key={item}>{item}</li>)}</ul>
              </aside>
            </div>
          </div>
        </header>

        <section className={styles.choices} aria-labelledby="service-choices-title">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.choices.eyebrow}</p>
              <h2 id="service-choices-title"><KeepWords locale="ja" text={copy.choices.title} /></h2>
            </div>
            <p>{copy.choices.body}</p>
          </div>
          <ol className={styles.cardGrid}>
            {copy.cards.map((card) => {
              const image = cardImage(card.id);
              return (
                <li key={card.id}>
                  <Link data-spotlight href={card.href}>
                    <figure className={styles.cardImage}>
                      <Image
                        alt={image.alt}
                        decoding="async"
                        height={image.height}
                        loading="lazy"
                        sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 80rem) calc((100vw - 4rem) / 2), 38rem"
                        src={image.src}
                        style={{ objectPosition: image.position }}
                        width={image.width}
                      />
                    </figure>
                    <div className={styles.cardBody}>
                      <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                      <h3><KeepWords locale="ja" text={card.title} /></h3>
                      <p className={styles.cardText}>{card.body}</p>
                      <span className={styles.action}>{card.action}<span aria-hidden="true">→</span></span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.method} aria-labelledby="service-method-title">
          <div>
            <p className={styles.eyebrow}>{copy.method.eyebrow}</p>
            <h2 id="service-method-title"><KeepWords locale="ja" text={copy.method.title} /></h2>
          </div>
          <div>
            <p>{copy.method.body}</p>
            <p>{copy.method.guideNote}</p>
            <div className={styles.methodLinks}>
              <Link href={japaneseSite.studio}>{copy.method.studioAction}<span aria-hidden="true">→</span></Link>
              <Link href={japaneseSite.explore}>{copy.method.exploreAction}</Link>
            </div>
          </div>
        </section>

        <section className={styles.method} aria-labelledby="ja-services-contact-title" id="contact">
          <div>
            <p className={styles.eyebrow}>日本語でのご相談</p>
            <h2><KeepWords locale="ja" text="まずは、旅の条件をお聞かせください。" /></h2>
          </div>
          <JapaneseContactPanel
            body="旅行の時期、人数、気になる都市や必要な手配をお知らせください。日本語でご返信します。"
            emailHref={contact.email}
            headingId="ja-services-contact-title"
            title="日本語で旅を相談する"
            whatsappHref={contact.whatsapp}
          />
        </section>
      </main>
      <JapaneseSiteFooter currentPath={japaneseSite.services} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
