import type { Metadata } from "next";
import Image from "next/image";
import { JapanesePilotShell } from "../../../components/JapanesePilotShell";
import { jaPilot } from "../../../lib/jaPilot";
import { jaPilotCopy } from "../../../lib/jaPilotCopy";
import { getPrivateTourProduct } from "../../../lib/privateTourProducts";
import { privateTourProducts } from "../../../lib/privateTourProducts";
import styles from "../../../components/JapanesePilot.module.css";

const copy = jaPilotCopy.home;

export const metadata: Metadata = {
  title: "日本語で探す中国ツアー | Homeground China",
  description: "中国各地のプライベートツアーと出発日指定の少人数グループを日本語でご案内。日程、サービス内容、料金条件を比較できます。",
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
          <div className={`${styles.cards} ${styles.homeCards}`}>
            <article className={styles.card}>
              <h2>{copy.catalogTitle}</h2><p>{copy.catalogSummary}</p>
              <a className={styles.cardLink} href="/ja/tours/">{privateTourProducts.length + 1}コースを見る →</a>
            </article>
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
