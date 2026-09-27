import type { Metadata } from "next";
import Image from "next/image";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "../../../../../components/JapaneseTourChrome";
import styles from "../../../../../components/JapanesePilot.module.css";
import {
  jaPilot,
  jaPilotEmailHref,
  jaPilotGuideAlternates,
  jaPilotWhatsAppHref,
} from "../../../../../lib/jaPilot";
import { jaPilotCopy } from "../../../../../lib/jaPilotCopy";
import { japaneseDraftNote, japaneseLanguagePaths } from "../../../../../lib/japaneseSite";
import { KeepWords } from "../../../../../components/text/KeepWords";
import { JapaneseGuideContactLink } from "../../../../../components/JapaneseGuideContactLink";

const copy = jaPilotCopy.guide;
const image = "/images/guides/shanghai-hangzhou-transport-route/hero-1600.webp";

export const metadata: Metadata = {
  title: "上海から杭州への行き方｜高速鉄道の駅と日帰り・宿泊 | Homeground China",
  description: "上海から杭州へ日帰りか宿泊か。上海虹橋・上海駅と杭州の到着駅を、ホテルから観光地までの移動を含めて比べます。",
  alternates: { canonical: jaPilot.guide, languages: jaPilotGuideAlternates() },
  openGraph: { title: copy.title, description: copy.lede, type: "article", locale: "ja_JP", url: jaPilot.guide, images: [{ url: image, width: 1600, height: 1000, alt: "杭州東駅の構内" }] },
  robots: { index: true, follow: true },
};

export default function JapaneseShanghaiHangzhouGuide() {
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main">本文へ移動</a>
      <JapaneseSiteHeader
        contactHref="#contact"
        currentPath={jaPilot.guide}
        languagePaths={japaneseLanguagePaths(`/guides/${jaPilot.guideId}/`, jaPilot.guide)}
      />
      <main id="main">
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title}><KeepWords locale="ja" text={copy.title} /></h1>
          <p className={styles.lede}>{copy.lede}</p>
        </header>
        <figure>
          <Image className={styles.heroImage} src={image} alt="杭州東駅の構内" width={1600} height={1000} priority sizes="(max-width: 1200px) 100vw, 1200px" />
          <figcaption className={styles.imageCaption}>写真：<a href="https://commons.wikimedia.org/wiki/File:Hangzhou_East_railway_station_interior.jpg">Staeiou / Wikimedia Commons</a>、<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>。写真をトリミングしWebP形式に変換。</figcaption>
        </figure>

        <section className={styles.section} aria-labelledby="decision">
          <h2 id="decision"><KeepWords locale="ja" text={copy.compareTitle} /></h2>
          <div className={styles.cards}>
            {copy.compare.map((item) => <article className={styles.card} key={item.label}><h3><KeepWords locale="ja" text={item.label} /></h3><p>{item.body}</p></article>)}
          </div>
        </section>

        {copy.sections.map((section, index) => (
          <section className={styles.section} aria-labelledby={`section-${index}`} key={section.title}>
            <h2 id={`section-${index}`}><KeepWords locale="ja" text={section.title} /></h2><p>{section.body}</p>
            {index === 5 ? <a className={styles.cardLink} href={jaPilot.tour}>上海・蘇州・杭州6日間の行程を見る →</a> : null}
          </section>
        ))}

        <section className={styles.section} aria-labelledby="sources">
          <h2 id="sources"><KeepWords locale="ja" text={copy.sourceTitle} /></h2>
          <ul className={styles.sourceList}>{copy.sources.map((source) => <li key={source.url}><a href={source.url} rel="noopener noreferrer">{source.label}</a></li>)}</ul>
          <p>列車の時刻・空席・運賃は日付で変わります。予約前に12306で確認してください。</p>
        </section>

        <section className={styles.cta} id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title"><KeepWords locale="ja" text={copy.ctaTitle} /></h2><p>{copy.ctaBody}</p>
          <div className={styles.ctaLinks}>
            <JapaneseGuideContactLink className={styles.buttonPrimary} emailHref={jaPilotEmailHref("guide")} whatsappHref={jaPilotWhatsAppHref("guide")}>{copy.ctaLabel}</JapaneseGuideContactLink>
            <a className={styles.buttonSecondary} href={jaPilotEmailHref("guide")}>メールで相談する</a>
          </div>
          <p className={styles.imageCaption}>{japaneseDraftNote}</p>
          <p className={styles.imageCaption}><a href={jaPilot.privacy}>お問い合わせと個人情報について</a></p>
        </section>
      </div>
      </main>
      <JapaneseSiteFooter currentPath={jaPilot.guide} />
    </div>
  );
}
