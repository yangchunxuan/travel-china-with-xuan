import { ArrowRight } from "lucide-react";
import type { HomegroundLocale } from "../../lib/homegroundI18n";
import { getGuideServiceCta } from "../../lib/privateGuideServiceCta";
import { GuideCtaLink } from "../GuideCtaLink";
import styles from "./GuideReservationCta.module.css";

/**
 * "Add a guide in this city" under a guide about one city's sights, opening
 * the private guide service at that city's rate. It shares the reservation
 * offer's quiet card style and never replaces the guide's inline tour card.
 */
export function GuideServiceCta({
  guideId,
  locale,
  position = "footer",
}: {
  guideId: string;
  locale: HomegroundLocale;
  /** "inline" when it sits inside the article, after the guide's own content. */
  position?: "inline" | "footer";
}) {
  const cta = getGuideServiceCta(guideId, locale);
  if (!cta) return null;
  return (
    <aside aria-label={cta.label} className={styles.card} data-guide-service-cta={cta.city} data-similarity-ignore>
      <p className={styles.label}>{cta.label}</p>
      <p className={styles.title}>{cta.title}</p>
      <p className={styles.body}>{cta.body}</p>
      <GuideCtaLink className={styles.action} guideId={guideId} href={cta.href} locale={locale} position={position}>
        {cta.action}
        <ArrowRight aria-hidden="true" size={18} />
      </GuideCtaLink>
    </aside>
  );
}
