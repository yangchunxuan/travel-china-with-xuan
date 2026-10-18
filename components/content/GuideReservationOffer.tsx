import { Fragment } from "react";
import type { GuideReservationOffer as Offer } from "../../lib/guideReservationOffers";
import type { HomegroundLocale } from "../../lib/homegroundI18n";
import { GuideCtaLink } from "../GuideCtaLink";
import cardStyles from "./GuideReservationCta.module.css";
import styles from "./GuideReservationOffer.module.css";

/**
 * The attraction reservation service offered inside a guide that is not about
 * one bookable attraction, set like the guide booking card (GuideReservationCta):
 * hairlines, serif title, the fee in large figures, one way forward.
 *
 * "card" adds example attractions, each opening the request form with that
 * attraction ticked. "line" is a single sentence and link for a second,
 * contextual mention on a guide that already carries the booking card.
 */
export function GuideReservationOffer({ guideId, locale, offer }: { guideId: string; locale: HomegroundLocale; offer: Offer }) {
  if (offer.variant === "line") {
    return (
      <aside aria-label={offer.label} className={styles.line} data-guide-reservation-offer={guideId} data-similarity-ignore>
        <p className={styles.lineText}>
          <strong>{offer.title}</strong> {offer.body} <span className={styles.lineFee}>{offer.fee} {offer.feeUnit}.</span>
        </p>
        <GuideCtaLink className={styles.lineAction} guideId={guideId} href={offer.href} locale={locale} position="inline">
          {offer.action}
        </GuideCtaLink>
      </aside>
    );
  }
  return (
    <aside aria-label={offer.label} className={cardStyles.card} data-guide-reservation-offer={guideId} data-similarity-ignore>
      <p className={cardStyles.label}>{offer.label}</p>
      <p className={cardStyles.title}>{offer.title}</p>
      <p className={cardStyles.fee}><span className={cardStyles.feeAmount}>{offer.fee}</span> <span className={cardStyles.feeUnit}>{offer.feeUnit}</span></p>
      <p className={cardStyles.body}>{offer.body}</p>
      {offer.examples.length ? (
        <p className={styles.examples}>
          <span className={styles.examplesLabel}>Attractions we can book</span>{" "}
          {/* The dot stays with the name before it, so no line starts with "·". */}
          {offer.examples.map((example, index, all) => (
            <Fragment key={example.attractionId}>
              <span className={styles.exampleItem}>
                <GuideCtaLink className={styles.example} guideId={guideId} href={example.href} locale={locale} position="inline">
                  {example.label}
                </GuideCtaLink>
                {index < all.length - 1 ? <span aria-hidden="true" className={styles.dot}> ·</span> : null}
              </span>
              {index < all.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
      ) : null}
      <GuideCtaLink className={cardStyles.action} guideId={guideId} href={offer.href} locale={locale} position="inline">
        {offer.action}
      </GuideCtaLink>
      {offer.smallPrint.length ? <p className={cardStyles.disclosure}>{offer.smallPrint.join(" ")}</p> : null}
    </aside>
  );
}
