'use client';

import { HomepageQuickContact } from './HomepageQuickContact';
import { spanishHomepagePlanningCopy } from '../lib/spanishHomeCopy';
import { spanishContactEdition } from '../lib/spanishContactEdition';
import routeStyles from './RouteFinder.module.css';
import styles from './HomegroundHomePage.module.css';

/** The same contact-only shell shown by the original homepage's RouteFinder. */
export function SpanishHomeContact() {
  return <section
    id="route-finder"
    className={`${routeStyles.finder} ${routeStyles.heroVariant}`}
    aria-labelledby="planning-intent-title"
    data-planning-view="intent"
    data-contact-only=""
  >
    <p className={routeStyles.srOnly} aria-live="polite" aria-atomic="true" />
    <div className={`${styles.intentView} ${styles.intentViewContactOnly}`} data-planning-view="intent">
      <header className={styles.intentHeader} id="planner-contact">
        <h2 id="planning-intent-title" tabIndex={-1}>{spanishHomepagePlanningCopy.contactPanelLabel}</h2>
      </header>
      <HomepageQuickContact locale="en" copy={spanishHomepagePlanningCopy} variant="hero" edition={spanishContactEdition} />
    </div>
  </section>;
}
