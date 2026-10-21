"use client";

import { JapaneseContactPanel } from "./JapaneseContactPanel";
import routeStyles from "./RouteFinder.module.css";
import styles from "./HomegroundHomePage.module.css";

/**
 * The homepage contact section in the English homepage's contact-only shell
 * (as FrenchHomeContact), holding the Japanese panel: its button opens the
 * Japanese inquiry form, so Japanese inquiries are sent as before.
 */
export function JapaneseHomeContact({ emailHref, whatsappHref }: { emailHref: string; whatsappHref: string }) {
  return <section
    id="route-finder"
    className={`${routeStyles.finder} ${routeStyles.heroVariant}`}
    aria-labelledby="planning-intent-title"
    data-planning-view="intent"
    data-contact-only=""
  >
    <div className={`${styles.intentView} ${styles.intentViewContactOnly}`} data-planning-view="intent">
      <header className={styles.intentHeader} id="planner-contact">
        <h2 id="planning-intent-title" tabIndex={-1}>WhatsApp またはメールで相談する</h2>
      </header>
      <div id="contact">
        <JapaneseContactPanel
          body="旅行予定の時期、人数、気になる都市やツアーをお知らせください。日本語で12時間以内にご返信します。日本語ガイドの手配もご相談いただけます（料金はコースごとにご案内します）。"
          emailHref={emailHref} headingId="ja-home-contact-title" title="日本語で旅の相談をする" whatsappHref={whatsappHref}
        />
      </div>
    </div>
  </section>;
}
