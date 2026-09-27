import { japaneseGeneralContactHrefs, japaneseLanguagePaths, japaneseSite } from "../lib/japaneseSite";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import { JapaneseContactPanel } from "./JapaneseContactPanel";
import styles from "./NotFoundPage.module.css";
import { KeepWords } from "./text/KeepWords";

export const japaneseNotFoundPath = "/ja/404/";

/**
 * Japanese 404. GitHub Pages serves the one root 404.html for every unmatched
 * path; that page sends /ja/ addresses here (see NotFoundPage).
 */
export function JapaneseNotFoundPage() {
  const contact = japaneseGeneralContactHrefs(japaneseSite.home);
  return (
    <div className={styles.root} lang="ja">
      <a className={styles.skipLink} href="#not-found-content">
        本文へ移動
      </a>
      <JapaneseSiteHeader
        contactHref={japaneseSite.contact}
        currentPath={japaneseNotFoundPath}
        languagePaths={japaneseLanguagePaths("/", japaneseSite.home)}
      />
      <main className={styles.main} id="not-found-content">
        <p className={styles.eyebrow}>ページが見つかりません · 404</p>
        <h1 className={styles.title}><KeepWords locale="ja" text="お探しのページは見つかりませんでした。" /></h1>
        <p className={styles.lead}>
          ページが移動または削除されたか、URL が古い可能性があります。ツアー一覧や目的地のページから、もう一度お探しください。見つからない場合は、日本語でお問い合わせいただけます。
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href={japaneseSite.tours}>
            ツアー一覧を見る
          </a>
          <a className={styles.secondary} href={japaneseSite.explore}>
            目的地から探す
          </a>
          <a className={styles.secondary} href={japaneseSite.home}>
            ホームへ戻る
          </a>
        </div>
        <JapaneseContactPanel
          body="お探しのツアーや行き先がわからないときは、日本語でお問い合わせください。"
          emailHref={contact.email}
          headingId="ja-not-found-contact-title"
          title="WhatsApp・メールで相談"
          whatsappHref={contact.whatsapp}
        />
      </main>
      <JapaneseSiteFooter currentPath={japaneseNotFoundPath} />
    </div>
  );
}
