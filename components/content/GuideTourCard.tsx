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
    <aside className={styles.card} aria-label={card.label} data-guide-tour-card={card.productId} data-similarity-ignore>
      <div className={styles.media}>
        <img
          alt={card.image.alt}
          decoding="async"
          height={card.image.height}
          loading="lazy"
          sizes="(max-width: 700px) 100vw, 320px"
          src={card.image.src}
          srcSet={card.image.srcSet}
          style={card.image.objectPosition ? { objectPosition: card.image.objectPosition } : undefined}
          width={card.image.width}
        />
      </div>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{card.eyebrow}</p>
        <p className={styles.hook}>{card.hook}</p>
        <p className={styles.title}>{card.title}</p>
        <p className={styles.appeal}>{card.appeal}</p>
        <p className={styles.price}>
          <strong>{card.priceFrom}</strong>
          <span>{card.priceBasis}</span>
        </p>
        <GuideCtaLink className={styles.action} guideId={guideId} href={card.href} locale={locale} position="inline">
          {card.action}
          <ArrowRight aria-hidden="true" size={18} />
        </GuideCtaLink>
      </div>
    </aside>
  );
}
