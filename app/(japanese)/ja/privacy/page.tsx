import type { Metadata } from "next";
import { JapanesePilotShell } from "../../../../components/JapanesePilotShell";
import { jaPilot } from "../../../../lib/jaPilot";
import { jaPilotCopy } from "../../../../lib/jaPilotCopy";
import styles from "../../../../components/JapanesePilot.module.css";

export const metadata: Metadata = {
  title: "お問い合わせと個人情報 | Homeground China",
  description: jaPilotCopy.privacy.body,
  alternates: { canonical: jaPilot.privacy },
  robots: { index: false, follow: true },
};

export default function JapanesePrivacy() {
  return (
    <JapanesePilotShell current="privacy">
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{jaPilotCopy.privacy.title}</h1>
          <p className={styles.lede}>{jaPilotCopy.privacy.body}</p>
        </section>
        <section className={styles.section}>
          <h2>お問い合わせ方法</h2>
          <p>この日本語ページには入力フォームはありません。WhatsAppまたはメールのリンクを開き、送信内容をご確認ください。WhatsAppで送信する情報には、WhatsAppのプライバシーポリシーも適用されます。</p>
          <p>当サイトの詳しいプライバシー通知は、現在<a href="/privacy/" hrefLang="en">英語版</a>でご覧いただけます。ご不明な点は<a href="mailto:hello@homegroundchina.com">hello@homegroundchina.com</a>まで日本語でお問い合わせください。</p>
        </section>
      </div>
    </JapanesePilotShell>
  );
}
