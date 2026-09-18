import type { GuideId } from "../../lib/guideRegistry";
import type { HomegroundLocale } from "../../lib/homegroundI18n";
import { getGuideTourCard } from "../../lib/guideTourCard";
import { GuideTourCard } from "./GuideTourCard";
import styles from "./LegacyGuideTourCard.module.css";

/** Places the shared card inside hand-built guide pages without changing
 * their individual layout systems. */
export function LegacyGuideTourCard({
  guideId,
  locale,
}: {
  guideId: GuideId;
  locale: HomegroundLocale;
}) {
  return (
    <div className={styles.slot} data-guide-inline-sales-slot>
      <GuideTourCard
        card={getGuideTourCard(guideId, locale)}
        guideId={guideId}
        locale={locale}
      />
    </div>
  );
}
