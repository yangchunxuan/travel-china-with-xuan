"use client";

import { Mail, MessageCircle } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { openJapaneseContact, japaneseDirectWhatsAppEnabled } from "../lib/japaneseContactFlow";
import { KeepWords } from "./text/KeepWords";
import styles from "./JapaneseContactPanel.module.css";

/**
 * Japanese consultation panel. The primary action opens the saved inquiry
 * flow; its mailto href remains a real no-JavaScript fallback.
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
        <a className={styles.primary} href={emailHref} onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
          if (openJapaneseContact({ whatsappHref, emailHref })) event.preventDefault();
        }}>
          <Mail aria-hidden="true" size={18} />
          <span>相談・見積もりを送る</span>
        </a>
        {japaneseDirectWhatsAppEnabled() ? <a className={styles.secondary} href={whatsappHref} rel="noopener noreferrer" target="_blank">
          <MessageCircle aria-hidden="true" size={18} />
          <span>WhatsAppで相談する</span>
        </a> : null}
      </div>
      <p className={styles.note}>
        サイト内のフォームは、保存できた場合に受付番号を表示します。外部の連絡アプリは下書きが開くだけです。
      </p>
      <p className={styles.note}>
        メールアプリが開かない場合は、
        <a href={`mailto:${homegroundBusiness.serviceEmail}`}>{homegroundBusiness.serviceEmail}</a>
        宛てに直接お送りください。ご相談は無料です。料金が発生するのは、内容と金額を書面でご確認・ご同意いただいた後です。
      </p>
    </div>
  );
}
