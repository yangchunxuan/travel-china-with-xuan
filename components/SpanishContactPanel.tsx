import { Mail, MessageCircle } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { spanishDraftNote } from "../lib/spanishSite";
import styles from "./JapaneseContactPanel.module.css";

/**
 * Spanish enquiry panel. On a phone both actions open a draft in WhatsApp or
 * the mail app; on a computer the contact card answers them, as it does on
 * the main site (SpanishContactHost).
 */
export function SpanishContactPanel({
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
      <h3 className={styles.title} id={headingId}>{title}</h3>
      <p className={styles.body}>{body}</p>
      <div className={styles.actions}>
        <a className={styles.primary} href={whatsappHref} rel="noopener noreferrer" target="_blank">
          <MessageCircle aria-hidden="true" size={18} />
          <span>Escribir por WhatsApp</span>
        </a>
        <a className={styles.secondary} href={emailHref}>
          <Mail aria-hidden="true" size={18} />
          <span>Escribir por correo</span>
        </a>
      </div>
      <p className={styles.note}>{spanishDraftNote}</p>
      <p className={styles.note}>
        Puede escribirnos en español a{" "}
        <a href={`mailto:${homegroundBusiness.serviceEmail}`}>{homegroundBusiness.serviceEmail}</a>.
        La consulta es gratuita: solo se paga después de recibir y aceptar por escrito el contenido y el precio del viaje.
      </p>
    </div>
  );
}
