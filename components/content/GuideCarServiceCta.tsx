import { ArrowRight } from "lucide-react";
import type { HomegroundLocale } from "../../lib/homegroundI18n";
import { getPrivateCarServiceCta } from "../../lib/privateCarServiceCta";
import { GuideCtaLink } from "../GuideCtaLink";
import styles from "./GuideReservationCta.module.css";

export function GuideCarServiceCta({ guideId, locale }: { guideId: string; locale: HomegroundLocale }) {
  const cta = getPrivateCarServiceCta(guideId, locale);
  if (!cta) return null;
  return (
    <aside aria-label={cta.label} className={styles.card} data-guide-car-service-cta="" data-similarity-ignore>
      <p className={styles.label}>{cta.label}</p>
      <p className={styles.title}>{cta.title}</p>
      <p className={styles.body}>{cta.body}</p>
      <GuideCtaLink className={styles.action} guideId={guideId} href={cta.href} locale={locale} position="inline">
        {cta.action}<ArrowRight aria-hidden="true" size={18} />
      </GuideCtaLink>
    </aside>
  );
}
