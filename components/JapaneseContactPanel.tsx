import { Mail, MessageCircle } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { japaneseDraftNote } from "../lib/japaneseSite";
import { KeepWords } from "./text/KeepWords";
import styles from "./JapaneseContactPanel.module.css";

/**
 * Japanese consultation panel. Both buttons open a pre-filled draft in the
 * traveller's own WhatsApp or mail app; nothing is sent until they send it.
 */
export function JapaneseContactPanel({
  title,
  body,
  whatsappHref,
  emailHref,
  headingId,
  tone = "light",
}: {
  title: string;
  body: string;
  whatsappHref: string;
  emailHref: string;
  headingId: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={styles.panel} data-tone={tone}>
      <h3 className={styles.title} id={headingId}>
        <KeepWords locale="ja" text={title} />
      </h3>
      <p className={styles.body}>{body}</p>
      <div className={styles.actions}>
        <a className={styles.primary} href={whatsappHref} rel="noopener noreferrer" target="_blank">
          <MessageCircle aria-hidden="true" size={18} />
          <span>WhatsAppで相談する</span>
        </a>
        <a className={styles.secondary} href={emailHref}>
          <Mail aria-hidden="true" size={18} />
          <span>メールで相談する</span>
        </a>
      </div>
      <p className={styles.note}>
        {japaneseDraftNote}
      </p>
      <p className={styles.note}>
        メールアプリが開かない場合は、
        <a href={`mailto:${homegroundBusiness.serviceEmail}`}>{homegroundBusiness.serviceEmail}</a>
        宛てに直接お送りください。ご相談は無料です。料金が発生するのは、内容と金額を書面でご確認・ご同意いただいた後です。
      </p>
    </div>
  );
}
