import { getNewsletterEndpoint } from "../lib/newsletter";
import { japanesePrivacyCopy } from "../lib/japanesePrivacyCopy";
import { japaneseLanguagePaths, japaneseSite } from "../lib/japaneseSite";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import styles from "./HomegroundPrivacyPage.module.css";
import { KeepWords } from "./text/KeepWords";

/** Japanese wording of the site-wide newsletter notice; shown only when the newsletter is enabled. */
const newsletterNotice = {
  title: "旅のニュースレター（メール配信）",
  body: "ご自身で購読を申し込まれた場合、メールアドレス、表示言語、お申し込みいただいたページ、配信への同意の記録を保存します。これらは旅行のお問い合わせとは別に管理します。Cookie の設定を選んだだけでメール配信に登録されることはなく、購読はメールで確認手続きを終えた時点で始まります。",
  service: "購読者の情報は Supabase に保存し、確認メールは Resend を通じて送信します。これらの情報は、ニュースレターの配信と購読設定の管理に使います。確認ページや配信停止ページを開いただけでは購読の状態は変わらず、ページ内のボタンを押した時点で反映されます。これらのページでは、任意の分析や広告効果の測定は行いません。",
  retention: "確認が済んでいないお申し込みは7日後に削除します。配信停止から30日後に、メールアドレスとお名前を購読者の記録から削除します。ただし、配信停止のご意思を守るため、保護されたメールアドレスのハッシュ値と同意の履歴は残します。購読中の記録は購読を続けている間保持し、確認メールの送信記録は最長30日間保持します。配信停止はメール内のリンクから行えるほか、削除のご依頼もお問い合わせで承ります。",
  storage: "ブラウザには、ニュースレターの案内が繰り返し表示されないようにするための表示設定を保存します。メールアドレスは含まれず、分析や広告の追跡を有効にするものではありません。",
} as const;

export function JapanesePrivacyPage() {
  const copy = japanesePrivacyCopy;
  return (
    <div className={styles.localeRoot} data-privacy-locale="ja" lang="ja">
      <a className={styles.skipLink} href="#privacy-content">
        {copy.skipLink}
      </a>

      <JapaneseSiteHeader
        contactHref={japaneseSite.contact}
        currentPath={japaneseSite.privacy}
        languagePaths={japaneseLanguagePaths("/privacy/", japaneseSite.privacy)}
      />

      <main id="privacy-content">
        <section className={styles.hero} aria-labelledby="privacy-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 id="privacy-title"><KeepWords locale="ja" text={copy.hero.title} /></h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            <p className={styles.reviewed}>
              <span>{copy.hero.reviewedLabel}</span>
              <strong>{copy.hero.reviewedValue}</strong>
            </p>
          </div>

          <aside className={styles.releaseBlock} aria-labelledby="release-title">
            <p className={styles.statusLabel}>{copy.status.eyebrow}</p>
            <h2 id="release-title"><KeepWords locale="ja" text={copy.status.title} /></h2>
            <p>{copy.status.body}</p>
            <h3><KeepWords locale="ja" text={copy.status.blockersTitle} /></h3>
            <ul>
              {copy.status.blockers.map((blocker) => (
                <li key={blocker}>{blocker}</li>
              ))}
            </ul>
          </aside>
        </section>

        <article className={styles.notice}>
          {getNewsletterEndpoint() ? (
            <section className={styles.section} aria-labelledby="newsletter-privacy-title">
              <header className={styles.sectionHeading}>
                <h2 id="newsletter-privacy-title"><KeepWords locale="ja" text={newsletterNotice.title} /></h2>
              </header>
              <p>{newsletterNotice.body}</p>
              <p>{newsletterNotice.service}</p>
              <p>{newsletterNotice.retention}</p>
              <p>{newsletterNotice.storage}</p>
            </section>
          ) : null}

          <section className={styles.currentFlow} aria-labelledby="current-flow-title">
            <h2 id="current-flow-title"><KeepWords locale="ja" text={copy.currentFlow.title} /></h2>
            <div>
              {copy.currentFlow.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="collection-title">
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.collection.eyebrow}</p>
              <h2 id="collection-title"><KeepWords locale="ja" text={copy.collection.title} /></h2>
              <p>{copy.collection.intro}</p>
            </header>
            <div className={styles.itemGrid}>
              {copy.collection.items.map((item) => (
                <article className={styles.itemCard} key={item.name}>
                  <p className={styles.stage}>{item.stage}</p>
                  <h3><KeepWords locale="ja" text={item.name} /></h3>
                  <p>{item.purpose}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="providers-title">
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.providers.eyebrow}</p>
              <h2 id="providers-title"><KeepWords locale="ja" text={copy.providers.title} /></h2>
              <p>{copy.providers.intro}</p>
            </header>
            <dl className={styles.configurationList}>
              {copy.providers.rows.map((row) => (
                <div key={row.label}>
                  <dt><KeepWords locale="ja" text={row.label} /></dt>
                  <dd>
                    <code>{row.value}</code>
                    <p>{row.detail}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.section} aria-labelledby="configuration-title">
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.configuration.eyebrow}</p>
              <h2 id="configuration-title"><KeepWords locale="ja" text={copy.configuration.title} /></h2>
              <p>{copy.configuration.intro}</p>
            </header>
            <dl className={styles.configurationList}>
              {copy.configuration.rows.map((row) => (
                <div key={row.label}>
                  <dt><KeepWords locale="ja" text={row.label} /></dt>
                  <dd>
                    <code>{row.value}</code>
                    <p>{row.detail}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.section} aria-labelledby="choices-title">
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.choices.eyebrow}</p>
              <h2 id="choices-title"><KeepWords locale="ja" text={copy.choices.title} /></h2>
              {copy.choices.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </header>
            <ul className={styles.choiceList}>
              {copy.choices.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.contact} aria-labelledby="contact-title">
            <div>
              <p className={styles.eyebrow}>{copy.contact.eyebrow}</p>
              <h2 id="contact-title"><KeepWords locale="ja" text={copy.contact.title} /></h2>
              <p>{copy.contact.body}</p>
            </div>
            <dl>
              <div>
                <dt>{copy.contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${copy.contact.emailPlaceholder}`}>
                    <code>{copy.contact.emailPlaceholder}</code>
                  </a>
                </dd>
              </div>
              <div>
                <dt>{copy.contact.addressLabel}</dt>
                <dd>
                  <code lang="zh-Hans">{copy.contact.addressPlaceholder}</code>
                </dd>
              </div>
            </dl>
          </section>
        </article>
      </main>

      <JapaneseSiteFooter currentPath={japaneseSite.privacy} />
    </div>
  );
}
