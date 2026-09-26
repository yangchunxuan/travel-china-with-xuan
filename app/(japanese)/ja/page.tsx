import type { Metadata } from "next";
import Image from "next/image";
import { JapanesePilotShell } from "../../../components/JapanesePilotShell";
import { jaPilot } from "../../../lib/jaPilot";
import { jaPilotCopy } from "../../../lib/jaPilotCopy";
import { getPrivateTourProduct } from "../../../lib/privateTourProducts";
import styles from "../../../components/JapanesePilot.module.css";

const copy = jaPilotCopy.home;

export const metadata: Metadata = {
  title: "日本語で相談できる中国プライベート旅行 | Homeground China",
  description: "上海・蘇州・杭州6日間のプライベートツアーと、上海から杭州への移動ガイド。日本語でご相談いただけます。",
  alternates: { canonical: jaPilot.home },
  robots: { index: false, follow: true },
};

export default function JapaneseHome() {
  const image = getPrivateTourProduct(jaPilot.tourSlug)?.heroImage;
  return (
    <JapanesePilotShell current="home">
      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.lede}>{copy.intro}</p>
        </section>
        {image ? <Image className={styles.heroImage} src={image.src} alt="上海の街並みと黄浦江を挟んだ高層ビル群" width={image.width} height={image.height} priority sizes="(max-width: 1200px) 100vw, 1200px" /> : null}
        <section className={styles.section} aria-label="日本語で読める旅の情報">
          <div className={styles.cards}>
            <article className={styles.card}>
              <h2>{copy.guideTitle}</h2><p>{copy.guideSummary}</p>
              <a className={styles.cardLink} href={jaPilot.guide}>移動ガイドを見る →</a>
            </article>
            <article className={styles.card}>
              <h2>{copy.tourTitle}</h2><p>{copy.tourSummary}</p>
              <a className={styles.cardLink} href={jaPilot.tour}>6日間の行程を見る →</a>
            </article>
          </div>
        </section>
      </div>
    </JapanesePilotShell>
  );
}
