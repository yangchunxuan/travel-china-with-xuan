import {
  attractionReservationHref,
  attractionReservationServiceFeeCny,
  formatAttractionReservationFee,
  type AttractionReservationRule,
} from "../../lib/attractionReservations";
import { fillReservationCopy, getAttractionReservationCopy } from "../../lib/attractionReservationsI18n";
import { getGuideReservationCtaWording } from "../../lib/guideReservationOffers";
import type { HomegroundLocale } from "../../lib/homegroundI18n";
import { GuideCtaLink } from "../GuideCtaLink";
import styles from "./GuideReservationCta.module.css";

/**
 * "We can book this for you" under an attraction guide whose attraction the
 * reservation service covers. It is not the guide's inline sales card
 * (data-guide-tour-card): that card stays the guide's one product link, and
 * this aside opens the service page with the attraction preselected. A rule's
 * `disclosure` (what we do there, such as booking on the official channel
 * with no resale or mark-up) is always shown beside the offer. Both bodies
 * state the booking guarantee's lead time. The body
 * promises a booking in the traveller's own passport name only where the
 * source guide confirms the official system accepts passports; otherwise it
 * says we check that before payment.
 *
 * Set as the full-trip page is: no box, no pill, no icon. Hairlines above and
 * below, the fee in large serif figures, and one way forward marked by a thin
 * arrow; the disclosure follows as small print.
 */
export function GuideReservationCta({
  guideId,
  locale,
  rule,
  position = "footer",
}: {
  guideId: string;
  locale: HomegroundLocale;
  rule: AttractionReservationRule;
  /** "inline" when it sits inside the article after the first section. */
  position?: "inline" | "footer";
}) {
  const copy = getAttractionReservationCopy(locale).guideCta;
  const values = {
    attraction: rule.name[locale],
    fee: formatAttractionReservationFee(attractionReservationServiceFeeCny, locale),
  };
  // A few English guides word the same offer for their own readers; the fee, link and small print stay shared.
  const wording = getGuideReservationCtaWording(guideId, locale, rule);
  return (
    <aside aria-label={copy.label} className={styles.card} data-guide-reservation-cta={rule.id} data-similarity-ignore>
      <p className={styles.label}>{copy.label}</p>
      <p className={styles.title}>{wording?.title ?? fillReservationCopy(copy.title, values)}</p>
      <p className={styles.fee}><span className={styles.feeAmount}>{values.fee}</span> <span className={styles.feeUnit}>{wording?.feeUnit ?? copy.feeUnit}</span></p>
      <p className={styles.body}>{wording?.body ?? fillReservationCopy(rule.passportAccepted === true ? copy.body : copy.bodyPassportUnchecked, values)}</p>
      <GuideCtaLink className={styles.action} guideId={guideId} href={attractionReservationHref(locale, rule.id)} locale={locale} position={position}>
        {wording?.action ?? copy.action}
      </GuideCtaLink>
      {rule.disclosure ? <p className={styles.disclosure}>{rule.disclosure[locale]}</p> : null}
    </aside>
  );
}
