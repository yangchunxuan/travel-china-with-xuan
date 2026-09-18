import { ArrowRight } from "lucide-react";
import type { HomegroundLocale } from "../../lib/homegroundI18n";
import type { GuideTourCardData } from "../../lib/guideTourCard";
import { GuideCtaLink } from "../GuideCtaLink";
import styles from "./GuideTourCard.module.css";

export function GuideTourCard({
  card,
  guideId,
  locale,
}: {
  card: GuideTourCardData;
  guideId: string;
  locale: HomegroundLocale;
}) {
  return (
    <aside
      aria-label={card.label}
      className={styles.card}
      data-guide-cta-kind={card.kind}
      data-guide-tour-card={card.ctaId}
      data-similarity-ignore
    >
      <div className={styles.media}>
        <img
          alt={card.image.alt}
          decoding="async"
          height={card.image.height}
          loading="lazy"
          sizes="(min-width: 39rem) 11rem, (min-width: 30rem) 28vw, 8rem"
          src={card.image.src}
          srcSet={card.image.srcSet}
          width={card.image.width}
        />
      </div>
      <div className={styles.copy}>
        <p className={styles.title}>{card.title}</p>
        {card.note ? <p className={styles.note}>{card.note}</p> : null}
        <GuideCtaLink className={styles.action} guideId={guideId} href={card.href} locale={locale} position="inline">
          {card.action}
          <ArrowRight aria-hidden="true" size={18} />
        </GuideCtaLink>
      </div>
    </aside>
  );
}
