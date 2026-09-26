import type { Metadata } from "next";
import Image from "next/image";
import { JapanesePilotShell } from "../../../../../components/JapanesePilotShell";
import styles from "../../../../../components/JapanesePilot.module.css";
import {
  jaPilot,
  jaPilotEmailHref,
  jaPilotTourAlternates,
  jaPilotWhatsAppHref,
} from "../../../../../lib/jaPilot";
import { jaPilotCopy } from "../../../../../lib/jaPilotCopy";
import { getPrivateTourProduct } from "../../../../../lib/privateTourProducts";

const copy = jaPilotCopy.tour;
const product = getPrivateTourProduct(jaPilot.tourSlug);

if (!product) throw new Error("Japanese pilot tour source is missing");
const offer = product.packages.find((item) => item.id === "standard-guided");
if (!offer || offer.prices.length !== 3) throw new Error("Japanese pilot price tiers changed");

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
    images: [{ url: product.heroImage.src, width: product.heroImage.width, height: product.heroImage.height, alt: "上海の街並みと黄浦江越しの高層ビル群" }],
  },
  robots: { index: true, follow: true },
};

const number = new Intl.NumberFormat("ja-JP");

export default function JapaneseJiangnanTour() {
  return (
    <JapanesePilotShell current="tour">
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title}>{copy.headline}</h1>
          <p className={styles.lede}>{copy.lede}</p>
        </header>
        <figure>
          <Image className={styles.heroImage} src={product.heroImage.src} alt="上海の歴史的な街並みと黄浦江の向こうに広がる陸家嘴" width={product.heroImage.width} height={product.heroImage.height} priority sizes="(max-width: 1200px) 100vw, 1200px" />
          <figcaption className={styles.imageCaption}>上海から始まり、蘇州を経て杭州で終わる旅</figcaption>
        </figure>

        <section className={styles.section} aria-labelledby="fit">
          <h2 id="fit">{copy.fitTitle}</h2>
          <p>{copy.fit}</p>
          <a className={styles.cardLink} href={jaPilot.guide}>都市間の移動を先に確認する →</a>
        </section>

        <section className={styles.section} aria-labelledby="route">
          <p className={styles.eyebrow}>DAY BY DAY</p>
          <h2 id="route">6日間の行程</h2>
          <ol className={styles.dayList}>
            {copy.days.map((day) => <li key={day.title}><div><h3>{day.title}</h3><p>{day.body}</p></div></li>)}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="price">
          <h2 id="price">{copy.priceTitle}</h2>
          <p>{copy.guideNote}</p>
          <div className={styles.priceGrid}>
            {offer.prices.map((tier) => (
              <div className={styles.priceCard} key={tier.travelers}>
                <span>{tier.travelers}名で参加</span>
                <strong>CNY {number.format(tier.cnyPerPerson)}</strong>
                <span>1名あたり・日本語ガイド込み</span>
              </div>
            ))}
          </div>
          <p>{copy.priceNote}</p>
        </section>

        <section className={`${styles.section} ${styles.split}`} aria-label="料金の対象範囲">
          <div><h2>{copy.includedTitle}</h2><ul className={styles.bulletList}>{copy.included.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h2>{copy.excludedTitle}</h2><ul className={styles.bulletList}>{copy.excluded.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>

        <section className={styles.section} aria-labelledby="confirm">
          <h2 id="confirm">予約前に確認すること</h2>
          <ul className={styles.bulletList}>{copy.notes.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className={styles.cta} id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">{copy.ctaTitle}</h2><p>{copy.ctaBody}</p>
          <div className={styles.ctaLinks}>
            <a className={styles.buttonPrimary} href={jaPilotWhatsAppHref("tour")} target="_blank" rel="noopener noreferrer">{copy.ctaLabel} · WhatsApp</a>
            <a className={styles.buttonSecondary} href={jaPilotEmailHref("tour")}>メールで相談する</a>
          </div>
          <p className={styles.imageCaption}><a href={jaPilot.privacy}>お問い合わせと個人情報について</a></p>
        </section>
      </div>
    </JapanesePilotShell>
  );
}
